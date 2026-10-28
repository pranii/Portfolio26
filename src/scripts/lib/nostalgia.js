/**
 * Nostalgia is a Portal — die Installation im Browser.
 *
 * In der Galerie stehen zwei Roehrenmonitore an den Ausgaengen des
 * Aufzugs, und zwei TouchDesigner-Projekte lesen die Koerperhaltung aus.
 * Hier macht MediaPipe dieselbe Arbeit, und es sind dieselben zwei
 * Fenster:
 *
 *   EBENEN   Wer im Bild ist, sieht beide Ebenen zugleich — links die
 *            eine, rechts die andere. Wohin man sich stellt, entscheidet,
 *            welche von beiden traegt.
 *   WISCHEN  Ein Satz liegt unter Nebel. Die Hand wischt ihn frei, und
 *            der Nebel zieht wieder zu.
 *
 * Gezeichnet wird nur mit Farben, nie mit dem Kamerabild: Das Bild wird
 * in grobe Felder zerlegt und in zwei Kanaele versetzt — der RGB-Versatz
 * der Installation. Man sieht, was das Programm sieht, und niemanden
 * wiedererkennbar.
 *
 * Nichts laeuft von selbst. Die Kamera geht erst nach einem Klick an,
 * das Bild bleibt im Geraet, und ohne Kamera laeuft dasselbe als
 * Vorfuehrung mit einer gerechneten Figur.
 */

/** Die Rechenteile von MediaPipe — gross, deshalb vom CDN und erst bei Bedarf. */
const WASM = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.1.1/wasm';
const MODELL =
  'https://storage.googleapis.com/mediapipe-models/pose_landmarker/' +
  'pose_landmarker_lite/float16/1/pose_landmarker_lite.task';

/** Punkte im Koerpermodell, die hier gebraucht werden. */
const SCHULTER_LINKS = 11;
const SCHULTER_RECHTS = 12;
const HAND_LINKS = 15;
const HAND_RECHTS = 16;
const HUEFTE_LINKS = 23;
const HUEFTE_RECHTS = 24;

/** Die Welt der Roehre: Grund, die beiden Kanaele, ein mattes Weiss. */
const GRUND = '#0a0b0e';
const EBENE_A = '#28d6ff';
const EBENE_B = '#ff3ea5';
const MATT = '#d8d4c8';

/** Der eine Bildschirm, auf dem beide Ebenen uebereinanderliegen. */
const SCHIRM = { x: 10, y: 12, b: 300, h: 112 };

/**
 * Wie grob das Bild wird. Weit weg sind die Felder gross, beim
 * Naeherkommen werden sie kleiner — das Bild loest sich auf, waehrend
 * man darauf zugeht.
 */
const FELD_FERN = 20;
const FELD_NAH = 3;

/** Das Raster des Nebels im zweiten Fenster. */
const NEBEL = { spalte: 10, breite: 32, hoehe: 18 };

/**
 * Baut beide Fenster auf.
 * @param {HTMLElement} wurzel  Der Block mit Startleiste und beiden Fenstern
 * @param {(fenster: string, text: string) => void} melde
 * @param {Record<string, any>} worte  Beschriftungen aus der Sprachdatei
 * @returns {Promise<{pause: (ruht: boolean) => void}>}
 */
export async function startNostalgia(wurzel, melde = () => {}, worte = {}) {
  const video = wurzel.querySelector('[data-rolle="video"]');
  const schirmEbenen = wurzel.querySelector('[data-rolle="ebenen"]');
  const schirmWischen = wurzel.querySelector('[data-rolle="wischen"]');
  const knopfKamera = wurzel.querySelector('[data-rolle="kamera"]');
  const knopfDemo = wurzel.querySelector('[data-rolle="demo"]');
  const anzeigen = {
    imbild: wurzel.querySelector('[data-wert="imbild"]'),
    abstand: wurzel.querySelector('[data-wert="abstand"]'),
    aufloesung: wurzel.querySelector('[data-wert="aufloesung"]'),
  };

  const stiftEbenen = schirmEbenen.getContext('2d');
  const stiftWischen = schirmWischen.getContext('2d');
  stiftEbenen.imageSmoothingEnabled = false;
  stiftWischen.imageSmoothingEnabled = false;

  // Das Kamerabild wird einmal klein gerechnet; aus diesem Raster kommen
  // alle Farbfelder. Groesser braucht es nie zu sein.
  const raster = document.createElement('canvas');
  const stiftRaster = raster.getContext('2d', { willReadFrequently: true });

  // Die Kantenlaenge eines Felds und damit die Groesse des Rasters
  // aendert sich mit dem Abstand — neu gesetzt wird nur, wenn sie
  // wirklich springt.
  let feld = FELD_FERN;
  function setzeFeld(neu) {
    if (neu === feld && raster.width) return;
    feld = neu;
    raster.width = Math.ceil(SCHIRM.b / neu);
    raster.height = Math.ceil(SCHIRM.h / neu);
  }
  setzeFeld(FELD_FERN);

  let betrieb = 'aus'; // aus | kamera | demo
  let strom = null;
  let erkenner = null;
  let letzteZeit = -1;
  let ruht = false;
  let uhr = 0;

  /** Was das Programm gerade liest — die Werte unter dem linken Fenster. */
  const koerper = { imBild: false, position: 0.5, naehe: 0, haende: [] };

  // Der Nebel: 1 ist dicht, 0 ist frei gewischt.
  const nebel = new Float32Array(NEBEL.breite * NEBEL.hoehe).fill(1);
  let snippet = 0;
  let freiSeit = 0;

  // ------------------------------------------------------------ Erkennung

  /** Laedt MediaPipe. Erst hier, und nur einmal. */
  async function ladeErkenner() {
    if (erkenner) return erkenner;
    const { FilesetResolver, PoseLandmarker } = await import('@mediapipe/tasks-vision');
    const teile = await FilesetResolver.forVisionTasks(WASM);
    erkenner = await PoseLandmarker.createFromOptions(teile, {
      baseOptions: { modelAssetPath: MODELL, delegate: 'GPU' },
      runningMode: 'VIDEO',
      numPoses: 1,
    });
    return erkenner;
  }

  /** Liest aus den Punkten die drei Werte, auf die es ankommt. */
  function lies(punkte) {
    const sichtbar = (punkt) => punkt && (punkt.visibility ?? 1) > 0.5;

    const schultern = [punkte[SCHULTER_LINKS], punkte[SCHULTER_RECHTS]].filter(sichtbar);
    const huefte = [punkte[HUEFTE_LINKS], punkte[HUEFTE_RECHTS]].filter(sichtbar);
    const rumpf = [...schultern, ...huefte];

    if (!rumpf.length) {
      koerper.imBild = false;
      koerper.haende = [];
      return;
    }

    koerper.imBild = true;

    // Gespiegelt, damit die Bewegung im Bild der eigenen entspricht.
    const mitte = rumpf.reduce((summe, punkt) => summe + (1 - punkt.x), 0) / rumpf.length;
    koerper.position += (mitte - koerper.position) * 0.25;

    // Schulterbreite als Mass fuer die Naehe: nah heisst breit.
    if (schultern.length === 2) {
      const breite = Math.abs(schultern[0].x - schultern[1].x);
      const naehe = Math.max(0, Math.min(1, (breite - 0.12) / 0.3));
      koerper.naehe += (naehe - koerper.naehe) * 0.2;
    }

    koerper.haende = [punkte[HAND_LINKS], punkte[HAND_RECHTS]]
      .filter(sichtbar)
      .map((punkt) => ({ x: 1 - punkt.x, y: punkt.y }));
  }

  /** Die Vorfuehrung ohne Kamera: eine gerechnete Figur, die hin und her geht. */
  function gerechnet(zeit) {
    koerper.imBild = true;
    koerper.position = 0.5 + Math.sin(zeit / 3200) * 0.42;
    koerper.naehe = 0.45 + Math.sin(zeit / 5100) * 0.35;
    koerper.haende = [
      {
        x: 0.5 + Math.cos(zeit / 1500) * 0.42,
        y: 0.5 + Math.sin(zeit / 2400) * 0.34,
      },
    ];
  }

  // ------------------------------------------------------------- Fenster 1

  /** Rauschen, wenn niemand im Bild ist. */
  function static_(staerke) {
    for (let y = 0; y < SCHIRM.h; y += feld) {
      for (let x = 0; x < SCHIRM.b; x += feld) {
        if (Math.random() > staerke) continue;
        stiftEbenen.fillStyle = MATT;
        stiftEbenen.globalAlpha = Math.random() * 0.18;
        stiftEbenen.fillRect(SCHIRM.x + x, SCHIRM.y + y, feld, feld);
      }
    }
    stiftEbenen.globalAlpha = 1;
  }

  /**
   * Eine Ebene: das Raster als Farbfelder, um ein Feld versetzt. Die
   * beiden Ebenen liegen uebereinander, deshalb bleiben an den Raendern
   * die Farbsaeume stehen — der RGB-Versatz der Installation.
   */
  function zeichneEbene(farbe, versatz, bild) {
    const spalten = raster.width;
    const zeilen = raster.height;

    stiftEbenen.fillStyle = farbe;
    for (let zy = 0; zy < zeilen; zy += 1) {
      for (let zx = 0; zx < spalten; zx += 1) {
        const quelle = Math.min(spalten - 1, Math.max(0, zx + versatz));
        const i = (zy * spalten + quelle) * 4;
        // Helligkeit, grob gewichtet wie das Auge sie sieht.
        const hell = (bild[i] * 0.3 + bild[i + 1] * 0.59 + bild[i + 2] * 0.11) / 255;
        if (hell < 0.18) continue;
        stiftEbenen.globalAlpha = Math.min(1, hell * 1.15);
        stiftEbenen.fillRect(SCHIRM.x + zx * feld, SCHIRM.y + zy * feld, feld, feld);
      }
    }
    stiftEbenen.globalAlpha = 1;
  }

  /** Waagerechte Linien ueber alles — so sieht eine Roehre aus. */
  function zeilen() {
    stiftEbenen.fillStyle = GRUND;
    stiftEbenen.globalAlpha = 0.35;
    for (let y = 0; y < SCHIRM.h; y += 2) {
      stiftEbenen.fillRect(SCHIRM.x, SCHIRM.y + y, SCHIRM.b, 1);
    }
    stiftEbenen.globalAlpha = 1;
  }

  function zeichneEbenen(bild) {
    stiftEbenen.fillStyle = GRUND;
    stiftEbenen.fillRect(0, 0, schirmEbenen.width, schirmEbenen.height);

    // Die beiden Kanaele addieren sich: wo beide liegen, wird es weiss,
    // an den Raendern bleiben die Farbsaeume stehen.
    stiftEbenen.globalCompositeOperation = 'lighter';

    if (koerper.imBild && bild) {
      zeichneEbene(EBENE_A, -1, bild);
      zeichneEbene(EBENE_B, 1, bild);
    }
    static_(koerper.imBild ? 0.015 : 0.08);

    stiftEbenen.globalCompositeOperation = 'source-over';

    zeilen();
    stiftEbenen.strokeStyle = MATT;
    stiftEbenen.globalAlpha = 0.5;
    stiftEbenen.lineWidth = 2;
    stiftEbenen.strokeRect(SCHIRM.x - 1, SCHIRM.y - 1, SCHIRM.b + 2, SCHIRM.h + 2);
    stiftEbenen.globalAlpha = 1;
  }

  // ------------------------------------------------------------- Fenster 2

  /** Die Hand wischt: alle Felder im Umkreis werden frei. */
  function wische(hand) {
    const mx = hand.x * NEBEL.breite;
    const my = hand.y * NEBEL.hoehe;
    // Eine Hand deckt mehr ab als einen Punkt — sonst legt man den Satz
    // nie frei, bevor der Nebel wieder zuzieht.
    const umkreis = 4.2;

    for (let y = 0; y < NEBEL.hoehe; y += 1) {
      for (let x = 0; x < NEBEL.breite; x += 1) {
        const weite = Math.hypot(x + 0.5 - mx, y + 0.5 - my);
        if (weite > umkreis) continue;
        const i = y * NEBEL.breite + x;
        nebel[i] = Math.min(nebel[i], weite / umkreis);
      }
    }
  }

  function zeichneWischen(dt) {
    const satz = worte.snippets?.[snippet] ?? '';

    stiftWischen.fillStyle = GRUND;
    stiftWischen.fillRect(0, 0, schirmWischen.width, schirmWischen.height);

    // Der Satz liegt zuunterst und wird vom Nebel verdeckt.
    stiftWischen.fillStyle = MATT;
    stiftWischen.font = '19px "VT323", ui-monospace, monospace';
    stiftWischen.textAlign = 'center';
    stiftWischen.textBaseline = 'middle';
    umbrich(satz, schirmWischen.width - 48).forEach((zeile, i, alle) => {
      const y = schirmWischen.height / 2 + (i - (alle.length - 1) / 2) * 24;
      stiftWischen.fillText(zeile, schirmWischen.width / 2, y);
    });

    // Der Nebel: grobe Felder, abwechselnd in den beiden Kanaelen.
    let offen = 0;
    for (let y = 0; y < NEBEL.hoehe; y += 1) {
      for (let x = 0; x < NEBEL.breite; x += 1) {
        const i = y * NEBEL.breite + x;
        if (nebel[i] < 0.5) offen += 1;
        // Der Nebel zieht von selbst wieder zu.
        nebel[i] = Math.min(1, nebel[i] + dt * 0.16);
        if (nebel[i] <= 0.02) continue;

        stiftWischen.globalAlpha = nebel[i];
        stiftWischen.fillStyle = (x + y + Math.floor(uhr / 160)) % 7 === 0 ? EBENE_A : GRUND;
        stiftWischen.fillRect(x * NEBEL.spalte, y * NEBEL.spalte, NEBEL.spalte, NEBEL.spalte);
      }
    }
    stiftWischen.globalAlpha = 1;

    // Ist genug frei, bleibt der Satz einen Moment stehen und zerfaellt
    // dann zum naechsten — "Textfragmente erscheinen und zerfallen wieder".
    const anteil = offen / (NEBEL.breite * NEBEL.hoehe);
    if (anteil > 0.3) {
      freiSeit += dt;
      if (freiSeit > 1.4) {
        snippet = (snippet + 1) % Math.max(1, worte.snippets?.length ?? 1);
        nebel.fill(1);
        freiSeit = 0;
      }
    } else {
      freiSeit = 0;
    }

    return anteil;
  }

  /** Bricht einen Satz so um, dass er in die Breite passt. */
  function umbrich(satz, breite) {
    const zeilen = [];
    let laufend = '';
    for (const wort of satz.split(' ')) {
      const versuch = laufend ? `${laufend} ${wort}` : wort;
      if (stiftWischen.measureText(versuch).width > breite && laufend) {
        zeilen.push(laufend);
        laufend = wort;
      } else {
        laufend = versuch;
      }
    }
    if (laufend) zeilen.push(laufend);
    return zeilen;
  }

  // ----------------------------------------------------------------- Lauf

  function zeigeWerte() {
    if (anzeigen.imbild) anzeigen.imbild.dataset.an = koerper.imBild ? 'ja' : 'nein';
    if (anzeigen.abstand) {
      // Voll heisst nah: Der Balken waechst, waehrend man herangeht.
      anzeigen.abstand.style.setProperty('--anteil', `${Math.round(koerper.naehe * 100)}%`);
    }
    if (anzeigen.aufloesung) {
      anzeigen.aufloesung.textContent = `${feld} px`;
    }
  }

  function bild(jetzt) {
    requestAnimationFrame(bild);
    if (ruht || betrieb === 'aus') return;

    const dt = Math.min(0.05, (jetzt - uhr) / 1000) || 0;
    uhr = jetzt;

    let felder = null;

    if (betrieb === 'demo') {
      gerechnet(jetzt);
      felder = gerechnetesBild(jetzt);
    } else if (video.readyState >= 2) {
      if (video.currentTime !== letzteZeit) {
        letzteZeit = video.currentTime;
        try {
          const ergebnis = erkenner.detectForVideo(video, jetzt);
          const punkte = ergebnis?.landmarks?.[0];
          if (punkte) lies(punkte);
          else {
            koerper.imBild = false;
            koerper.haende = [];
          }
        } catch {
          // Ein ausgefallenes Bild ist kein Grund, alles anzuhalten.
        }
      }
      felder = kamerabild();
    }

    // Je naeher, desto feiner — das Bild loest sich beim Herangehen auf.
    setzeFeld(Math.round(FELD_FERN + (FELD_NAH - FELD_FERN) * koerper.naehe));
    zeichneEbenen(felder);
    koerper.haende.forEach(wische);
    const offen = zeichneWischen(dt);
    zeigeWerte();

    melde('ebenen', koerper.imBild ? worte.erkannt : worte.niemand);
    melde('wischen', worte.wischen?.replace('{n}', Math.round(offen * 100)) ?? '');
  }

  /** Das Kamerabild klein gerechnet und gespiegelt. */
  function kamerabild() {
    stiftRaster.save();
    stiftRaster.translate(raster.width, 0);
    stiftRaster.scale(-1, 1);
    stiftRaster.drawImage(video, 0, 0, raster.width, raster.height);
    stiftRaster.restore();
    return stiftRaster.getImageData(0, 0, raster.width, raster.height).data;
  }

  /** Dasselbe Raster ohne Kamera: eine helle Flaeche, wo die Figur steht. */
  function gerechnetesBild(zeit) {
    stiftRaster.fillStyle = '#000';
    stiftRaster.fillRect(0, 0, raster.width, raster.height);

    const mx = koerper.position * raster.width;
    const breite = 2 + koerper.naehe * 5;
    const hoehe = raster.height * (0.4 + koerper.naehe * 0.5);
    const oben = raster.height - hoehe;

    stiftRaster.fillStyle = '#fff';
    stiftRaster.fillRect(mx - breite, oben, breite * 2, hoehe);
    stiftRaster.fillRect(mx - breite * 0.6, oben - breite * 1.2, breite * 1.2, breite * 1.2);

    // Ein wenig Unruhe, damit es nicht wie ein Standbild aussieht.
    for (let i = 0; i < 24; i += 1) {
      stiftRaster.globalAlpha = 0.5;
      stiftRaster.fillRect(
        Math.floor(Math.random() * raster.width),
        Math.floor((Math.sin(zeit / 400 + i) * 0.5 + 0.5) * raster.height),
        1,
        1,
      );
    }
    stiftRaster.globalAlpha = 1;

    return stiftRaster.getImageData(0, 0, raster.width, raster.height).data;
  }

  // ------------------------------------------------------------- Bedienung

  function beschrifte() {
    knopfKamera.textContent = betrieb === 'kamera' ? worte.kameraaus : worte.kameraan;
    knopfDemo.textContent = betrieb === 'demo' ? worte.demoaus : worte.demo;
    knopfKamera.setAttribute('aria-pressed', String(betrieb === 'kamera'));
    knopfDemo.setAttribute('aria-pressed', String(betrieb === 'demo'));
  }

  function halt() {
    betrieb = 'aus';
    strom?.getTracks().forEach((spur) => spur.stop());
    strom = null;
    video.srcObject = null;
    koerper.imBild = false;
    koerper.haende = [];
    nebel.fill(1);
    beschrifte();
    zeigeWerte();
    zeichneEbenen(null);
    zeichneWischen(0);
    melde('ebenen', worte.aus);
    melde('wischen', worte.aus);
  }

  async function starteKamera() {
    if (betrieb === 'kamera') {
      halt();
      return;
    }

    melde('ebenen', worte.laedt);
    melde('wischen', worte.laedt);
    knopfKamera.disabled = true;

    try {
      strom = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: 'user' },
        audio: false,
      });
      video.srcObject = strom;
      await video.play();
      await ladeErkenner();
      betrieb = 'kamera';
      letzteZeit = -1;
      melde('ebenen', worte.bereit);
    } catch (fehler) {
      strom?.getTracks().forEach((spur) => spur.stop());
      strom = null;
      betrieb = 'aus';
      const verweigert = fehler?.name === 'NotAllowedError' || fehler?.name === 'SecurityError';
      melde('ebenen', verweigert ? worte.verweigert : worte.fehler);
      melde('wischen', worte.aus);
    } finally {
      knopfKamera.disabled = false;
      beschrifte();
    }
  }

  function starteDemo() {
    if (betrieb === 'demo') {
      halt();
      return;
    }
    strom?.getTracks().forEach((spur) => spur.stop());
    strom = null;
    video.srcObject = null;
    betrieb = 'demo';
    nebel.fill(1);
    beschrifte();
    melde('ebenen', worte.bereit);
  }

  knopfKamera.addEventListener('click', starteKamera);
  knopfDemo.addEventListener('click', starteDemo);

  // Mit der Maus oder dem Finger laesst sich der Nebel auch von Hand
  // wegwischen — ohne Kamera und auf jedem Geraet.
  let wischt = false;
  const stelle = (ereignis) => {
    const feld = schirmWischen.getBoundingClientRect();
    return {
      x: (ereignis.clientX - feld.left) / feld.width,
      y: (ereignis.clientY - feld.top) / feld.height,
    };
  };

  schirmWischen.addEventListener('pointerdown', (ereignis) => {
    ereignis.preventDefault();
    schirmWischen.setPointerCapture(ereignis.pointerId);
    wischt = true;
    wische(stelle(ereignis));
  });
  schirmWischen.addEventListener('pointermove', (ereignis) => {
    if (wischt) wische(stelle(ereignis));
  });
  const loslassen = () => {
    wischt = false;
  };
  schirmWischen.addEventListener('pointerup', loslassen);
  schirmWischen.addEventListener('pointercancel', loslassen);

  // Wird die Seite verlassen, geht die Kamera aus — ohne Ausnahme.
  window.addEventListener('pagehide', () => strom?.getTracks().forEach((spur) => spur.stop()));

  beschrifte();
  zeichneEbenen(null);
  zeichneWischen(0);
  melde('ebenen', worte.aus);
  melde('wischen', worte.aus);
  requestAnimationFrame((jetzt) => {
    uhr = jetzt;
    requestAnimationFrame(bild);
  });

  return {
    /** Ausser Sicht wird nicht gerechnet. Die Kamera stoppt der Knopf. */
    pause(soll) {
      ruht = soll;
    },
  };
}
