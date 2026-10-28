/**
 * Inner Flow — die beiden Messfenster aus dem Projekt.
 *
 * Der echte Prototyp lief lokal in Python: DeepFace auf dem Kamerabild,
 * librosa und ein SVM auf dem Mikrofon, beides im Sekundentakt in eine
 * SQLite-Datenbank. Hier laeuft dasselbe Prinzip im Browser — oben der
 * Eingang, darunter eine Liste, die alle 0,4 Sekunden misst und immer
 * nur die letzten beiden Eintraege zeigt.
 *
 * Gemessen wird, was im Bericht steht: aus dem Gesicht Valenz, Arousal
 * und Dominanz nach dem PAD-Modell, aus der Stimme Lautstaerke (RMS),
 * Grundfrequenz und Nulldurchgangsrate. Unter der Stilleschwelle wird
 * nichts bewertet — im Projekt hat das Modell Stille sonst als "happy"
 * gelesen.
 *
 * Nichts davon verlaesst das Geraet, und nichts laeuft ohne Klick.
 */

const WASM = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.1.1/wasm';
const MODELL =
  'https://storage.googleapis.com/mediapipe-models/face_landmarker/' +
  'face_landmarker/float16/1/face_landmarker.task';

/** Messabstand in Millisekunden — so oft notiert die Liste. */
const TAKT = 400;

/** Unter dieser Lautstaerke gilt es als Stille und wird nicht bewertet. */
const STILLE_DB = -45;

const esc = (text) =>
  String(text).replace(
    /[&<>"]/g,
    (zeichen) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[zeichen],
  );

/** -1 bis +1 mit Vorzeichen und Komma, so wie im Bericht. */
const achse = (wert) => {
  const gerundet = Math.max(-1, Math.min(1, wert)).toFixed(1).replace('.', ',');
  return wert > 0.05 ? `+${gerundet}` : gerundet;
};

const uhrzeit = () => {
  const jetzt = new Date();
  const zwei = (n) => String(n).padStart(2, '0');
  return `${zwei(jetzt.getHours())}:${zwei(jetzt.getMinutes())}:${zwei(jetzt.getSeconds())},${Math.floor(
    jetzt.getMilliseconds() / 100,
  )}`;
};

/**
 * Startet beide Fenster.
 * @param {HTMLElement} wurzel
 * @param {(fenster: string, text: string) => void} melde
 * @param {Record<string, string>} worte
 */
export async function startInnerFlow(wurzel, melde = () => {}, worte = {}) {
  const video = wurzel.querySelector('[data-rolle="if-video"]');
  const leinwand = wurzel.querySelector('[data-rolle="if-gesicht"]');
  const pegel = wurzel.querySelector('[data-rolle="if-pegel"]');
  const listeMimik = wurzel.querySelector('[data-rolle="if-liste-mimik"]');
  const listeStimme = wurzel.querySelector('[data-rolle="if-liste-stimme"]');
  const knopfKamera = wurzel.querySelector('[data-rolle="if-kamera"]');
  const knopfMikro = wurzel.querySelector('[data-rolle="if-mikro"]');

  const stift = leinwand.getContext('2d');
  const stiftPegel = pegel.getContext('2d');

  let kameraStrom = null;
  let mikroStrom = null;
  let erkenner = null;
  let hof = null;
  let messer = null;
  let puffer = null;
  let ruht = false;
  let letzteBild = -1;
  let letzteNotiz = 0;

  // Die letzten beiden Eintraege je Liste — mehr zeigt das Fenster nicht.
  const eintraege = { mimik: [], stimme: [] };

  function notiere(welche, zeilen) {
    const liste = welche === 'mimik' ? listeMimik : listeStimme;
    eintraege[welche].unshift(zeilen);
    eintraege[welche].length = Math.min(eintraege[welche].length, 2);

    liste.innerHTML = eintraege[welche]
      .map(
        (eintrag, i) => `
        <li class="if-zeile${i === 0 ? ' is-neu' : ''}">
          <span class="if-zeit">${esc(eintrag.zeit)}</span>
          <span class="if-wert">${esc(eintrag.label)}</span>
          <span class="if-achsen">${esc(eintrag.achsen)}</span>
        </li>`,
      )
      .join('');
  }

  // ───────────────────────────────────────────────────────── Mimik

  async function ladeErkenner() {
    if (erkenner) return erkenner;
    const { FilesetResolver, FaceLandmarker } = await import('@mediapipe/tasks-vision');
    const teile = await FilesetResolver.forVisionTasks(WASM);
    erkenner = await FaceLandmarker.createFromOptions(teile, {
      baseOptions: { modelAssetPath: MODELL, delegate: 'GPU' },
      runningMode: 'VIDEO',
      numFaces: 1,
      outputFaceBlendshapes: true,
    });
    return erkenner;
  }

  /** Sucht einen Gesichtszug heraus; fehlt er, ist er null. */
  const zug = (formen, name) => formen.find((f) => f.categoryName === name)?.score ?? 0;

  /**
   * Rechnet die Gesichtszuege auf die drei Achsen des PAD-Modells —
   * dieselbe Zuordnung wie in der Tabelle des Projektberichts.
   */
  function lies(formen) {
    const laecheln = (zug(formen, 'mouthSmileLeft') + zug(formen, 'mouthSmileRight')) / 2;
    const mundwinkel = (zug(formen, 'mouthFrownLeft') + zug(formen, 'mouthFrownRight')) / 2;
    const brauenRunter = (zug(formen, 'browDownLeft') + zug(formen, 'browDownRight')) / 2;
    const brauenHoch = (zug(formen, 'browOuterUpLeft') + zug(formen, 'browOuterUpRight')) / 2;
    const augenWeit = (zug(formen, 'eyeWideLeft') + zug(formen, 'eyeWideRight')) / 2;
    const kiefer = zug(formen, 'jawOpen');

    const valenz = laecheln * 1.6 - mundwinkel * 1.6 - brauenRunter * 0.8;
    const arousal = augenWeit * 1.2 + kiefer * 0.9 + brauenHoch * 0.8 + brauenRunter * 0.5 - 0.15;
    const dominanz = brauenRunter * 1.1 - brauenHoch * 0.9 - mundwinkel * 0.6;

    // Das Label ist die naechstliegende der Kategorien, die auch DeepFace
    // kennt — es steht hier als Anhaltspunkt, nicht als Befund.
    let label = worte.neutral ?? 'neutral';
    if (valenz > 0.3) label = worte.froh ?? 'froh';
    else if (valenz < -0.25 && dominanz > 0.1) label = worte.aerger ?? 'Ärger';
    else if (valenz < -0.25) label = worte.traurig ?? 'traurig';
    else if (arousal > 0.45) label = worte.ueberrascht ?? 'überrascht';

    return { valenz, arousal, dominanz, label };
  }

  function zeichneGesicht(punkte) {
    const b = leinwand.width;
    const h = leinwand.height;
    stift.clearRect(0, 0, b, h);
    if (!punkte) return;

    stift.fillStyle = '#28d6ff';
    for (const punkt of punkte) {
      // Gespiegelt, damit die Bewegung der eigenen entspricht.
      stift.fillRect((1 - punkt.x) * b - 1, punkt.y * h - 1, 2, 2);
    }
  }

  async function starteKamera() {
    if (kameraStrom) {
      kameraStrom.getTracks().forEach((spur) => spur.stop());
      kameraStrom = null;
      video.srcObject = null;
      zeichneGesicht(null);
      knopfKamera.textContent = worte.kameraan;
      knopfKamera.setAttribute('aria-pressed', 'false');
      melde('mimik', worte.aus);
      return;
    }

    knopfKamera.disabled = true;
    melde('mimik', worte.laedt);
    try {
      kameraStrom = await navigator.mediaDevices.getUserMedia({
        video: { width: 480, height: 360, facingMode: 'user' },
        audio: false,
      });
      video.srcObject = kameraStrom;
      await video.play();
      await ladeErkenner();
      knopfKamera.textContent = worte.kameraaus;
      knopfKamera.setAttribute('aria-pressed', 'true');
      melde('mimik', worte.misst);
    } catch (fehler) {
      kameraStrom?.getTracks().forEach((spur) => spur.stop());
      kameraStrom = null;
      melde('mimik', fehler?.name === 'NotAllowedError' ? worte.verweigert : worte.fehler);
    } finally {
      knopfKamera.disabled = false;
    }
  }

  // ──────────────────────────────────────────────────────── Stimme

  async function starteMikro() {
    if (mikroStrom) {
      mikroStrom.getTracks().forEach((spur) => spur.stop());
      mikroStrom = null;
      messer = null;
      stiftPegel.clearRect(0, 0, pegel.width, pegel.height);
      knopfMikro.textContent = worte.mikroan;
      knopfMikro.setAttribute('aria-pressed', 'false');
      melde('stimme', worte.aus);
      return;
    }

    knopfMikro.disabled = true;
    melde('stimme', worte.laedt);
    try {
      mikroStrom = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      const Klasse = window.AudioContext ?? window.webkitAudioContext;
      hof ??= new Klasse();
      if (hof.state === 'suspended') await hof.resume();

      const quelle = hof.createMediaStreamSource(mikroStrom);
      messer = hof.createAnalyser();
      messer.fftSize = 2048;
      quelle.connect(messer);
      puffer = new Float32Array(messer.fftSize);

      knopfMikro.textContent = worte.mikroaus;
      knopfMikro.setAttribute('aria-pressed', 'true');
      melde('stimme', worte.misst);
    } catch (fehler) {
      mikroStrom?.getTracks().forEach((spur) => spur.stop());
      mikroStrom = null;
      melde('stimme', fehler?.name === 'NotAllowedError' ? worte.verweigert : worte.fehler);
    } finally {
      knopfMikro.disabled = false;
    }
  }

  /** Lautstaerke als Effektivwert, in Dezibel. */
  function lautstaerke() {
    let summe = 0;
    for (const wert of puffer) summe += wert * wert;
    const rms = Math.sqrt(summe / puffer.length);
    return { rms, db: 20 * Math.log10(rms + 1e-9) };
  }

  /** Wie oft das Signal die Nulllinie kreuzt — ein Mass fuer Schaerfe. */
  function nulldurchgaenge() {
    let anzahl = 0;
    for (let i = 1; i < puffer.length; i += 1) {
      if (puffer[i - 1] < 0 !== puffer[i] < 0) anzahl += 1;
    }
    return anzahl / puffer.length;
  }

  /** Grundfrequenz ueber die Autokorrelation — grob, aber ehrlich. */
  function grundfrequenz() {
    const n = puffer.length;
    let bestesMass = 0;
    let besteVerschiebung = -1;

    const tiefste = Math.floor(hof.sampleRate / 400);
    const hoechste = Math.floor(hof.sampleRate / 70);

    for (let v = tiefste; v < Math.min(hoechste, n / 2); v += 1) {
      let mass = 0;
      for (let i = 0; i < n - v; i += 1) mass += puffer[i] * puffer[i + v];
      if (mass > bestesMass) {
        bestesMass = mass;
        besteVerschiebung = v;
      }
    }

    return besteVerschiebung > 0 ? hof.sampleRate / besteVerschiebung : 0;
  }

  function zeichnePegel(db) {
    const b = pegel.width;
    const h = pegel.height;
    stiftPegel.clearRect(0, 0, b, h);

    // Die Welle selbst, grob abgetastet
    stiftPegel.strokeStyle = '#ff3ea5';
    stiftPegel.lineWidth = 2;
    stiftPegel.beginPath();
    const schritt = Math.floor(puffer.length / b) || 1;
    for (let x = 0; x < b; x += 1) {
      const wert = puffer[x * schritt] ?? 0;
      const y = h / 2 - wert * h * 0.45;
      if (x === 0) stiftPegel.moveTo(x, y);
      else stiftPegel.lineTo(x, y);
    }
    stiftPegel.stroke();

    // Die Stilleschwelle als Linie
    stiftPegel.strokeStyle = '#6f737e';
    stiftPegel.lineWidth = 1;
    stiftPegel.setLineDash([4, 4]);
    const anteil = Math.max(0, Math.min(1, (db - STILLE_DB) / -STILLE_DB));
    stiftPegel.beginPath();
    stiftPegel.moveTo(0, h - anteil * h);
    stiftPegel.lineTo(b, h - anteil * h);
    stiftPegel.stroke();
    stiftPegel.setLineDash([]);
  }

  // ─────────────────────────────────────────────────────────── Lauf

  function bild(jetzt) {
    requestAnimationFrame(bild);
    if (ruht) return;

    let mimik = null;

    if (kameraStrom && erkenner && video.readyState >= 2 && video.currentTime !== letzteBild) {
      letzteBild = video.currentTime;
      try {
        const ergebnis = erkenner.detectForVideo(video, jetzt);
        const formen = ergebnis?.faceBlendshapes?.[0]?.categories;
        zeichneGesicht(ergebnis?.faceLandmarks?.[0] ?? null);
        if (formen?.length) mimik = lies(formen);
      } catch {
        // Ein ausgefallenes Bild haelt die Messung nicht an.
      }
    }

    let stimme = null;
    if (messer) {
      messer.getFloatTimeDomainData(puffer);
      const { db } = lautstaerke();
      zeichnePegel(db);
      if (db > STILLE_DB) {
        const f0 = grundfrequenz();
        const zcr = nulldurchgaenge();
        // Laut, hoch und scharf heisst angespannt — die Zuordnung aus
        // der Tabelle im Bericht.
        const arousal =
          Math.max(0, Math.min(1, (db + 45) / 35)) * 0.8 +
          Math.max(0, Math.min(1, (f0 - 90) / 180)) * 0.6 +
          Math.max(0, Math.min(1, zcr / 0.2)) * 0.4 -
          0.9;
        stimme = { db, f0, zcr, arousal };
      } else {
        stimme = { still: true };
      }
    }

    // Notiert wird im festen Takt, nicht bei jedem Bild.
    if (jetzt - letzteNotiz < TAKT) return;
    letzteNotiz = jetzt;
    const zeit = uhrzeit();

    if (mimik) {
      notiere('mimik', {
        zeit,
        label: mimik.label,
        achsen: `V ${achse(mimik.valenz)} · A ${achse(mimik.arousal)} · D ${achse(mimik.dominanz)}`,
      });
    } else if (kameraStrom) {
      notiere('mimik', { zeit, label: worte.keingesicht, achsen: '—' });
    }

    if (stimme?.still) {
      notiere('stimme', { zeit, label: worte.stille, achsen: '—' });
    } else if (stimme) {
      notiere('stimme', {
        zeit,
        label: `A ${achse(stimme.arousal)}`,
        achsen: `${Math.round(stimme.db)} dB · ${Math.round(stimme.f0)} Hz · ZCR ${stimme.zcr.toFixed(2).replace('.', ',')}`,
      });
    }
  }

  knopfKamera.addEventListener('click', starteKamera);
  knopfMikro.addEventListener('click', starteMikro);
  window.addEventListener('pagehide', () => {
    kameraStrom?.getTracks().forEach((spur) => spur.stop());
    mikroStrom?.getTracks().forEach((spur) => spur.stop());
  });

  melde('mimik', worte.aus);
  melde('stimme', worte.aus);
  requestAnimationFrame(bild);

  return {
    pause(soll) {
      ruht = soll;
    },
  };
}
