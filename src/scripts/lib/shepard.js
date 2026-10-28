/**
 * Multi Shepard — der Vorlesungssaal zum Durchlaufen.
 *
 * Die Installation steht in einem Hoersaal: Der Ton laeuft schon, bevor
 * jemand hereinkommt, und links fuehrt der einzige Weg durch den Raum.
 * Auf Rat von Prof. Norbert Schnell wurde alles auf drei Parameter
 * eingedampft — Geschwindigkeit, Richtung und Lautstaerke. Genau diese
 * drei steuert man hier, indem man die Figur durch den Grundriss schiebt.
 *
 * Der Klang ist derselbe wie in der Installation: elf Oszillatoren im
 * Oktavabstand von 20 Hz bis 20.480 Hz, darueber eine Huellkurve, die
 * die Raender unhoerbar macht. Deshalb scheint die Tonhoehe endlos zu
 * steigen, ohne je irgendwo anzukommen.
 *
 * Nichts klingt von selbst: Ton gibt es erst nach einem Klick auf den
 * Schalter — im Browser Vorschrift und hier auch Anstand.
 */

/** Elf Oktaven, 20 Hz bis 20.480 Hz — wie im Aufbau. */
const OKTAVEN = 11;
const GRUNDTON = 20;

/** Oktaven je Sekunde bei vollem Tempo. */
const TEMPO = 0.45;

/** Der Grundriss in Pixeln. Bewusst klein — hier wird nicht geglaettet. */
const BREITE = 240;
const HOEHE = 200;

/** Der Gang links, die Reihen rechts, vorne die Leinwand. */
const GANG = { x: 10, y: 8, b: 44, h: 162 };
const VORNE = { x: 10, y: 146, b: 220, h: 24 };
const LEINWAND = { x: 74, y: 178, b: 92, h: 12 };
const BOXEN = [
  { x: 46, y: 176, b: 14, h: 16 },
  { x: 180, y: 176, b: 14, h: 16 },
];

/** Sieben Sitzreihen, die alles ausser dem Gang versperren. */
const REIHEN = [26, 44, 62, 80, 98, 116, 134];

/**
 * Startet die Simulation in `wurzel`.
 * @param {HTMLElement} wurzel
 * @param {(text: string) => void} melde  Schreibt in die Statuszeile
 * @param {{bewegung: string, halt: string, an: string, aus: string}} worte
 * @returns {{pause: (ruht: boolean) => void}}
 */
export function startShepard(wurzel, melde = () => {}, worte = {}) {
  const leinwand = wurzel.querySelector('[data-rolle="saal"]');
  const schalter = wurzel.querySelector('[data-rolle="shepard-ton"]');
  const anzeigen = {
    tempo: wurzel.querySelector('[data-wert="tempo"]'),
    richtung: wurzel.querySelector('[data-wert="richtung"]'),
    laut: wurzel.querySelector('[data-wert="laut"]'),
  };

  const stift = leinwand.getContext('2d');
  stift.imageSmoothingEnabled = false;

  // Die Figur steht am Eingang oben links im Gang.
  const figur = { x: 30, y: 16, vx: 0, vy: 0, schritt: 0 };
  const tasten = new Set();
  let ziel = null; // Punkt, auf den der Finger zeigt
  let phase = 0; // Lage im Oktavband, 0 bis 1
  let ruht = false;
  let letzte = 0;

  // ---------------------------------------------------------------- Klang

  let hof = null;
  let summe = null;
  let stimmen = [];
  let klingt = false;

  function baueKlang() {
    const Klasse = window.AudioContext ?? window.webkitAudioContext;
    if (!Klasse) return false;

    hof ??= new Klasse();
    if (hof.state === 'suspended') hof.resume();
    if (stimmen.length) return true;

    summe = hof.createGain();
    summe.gain.value = 0;
    summe.connect(hof.destination);

    stimmen = Array.from({ length: OKTAVEN }, () => {
      const schwinger = hof.createOscillator();
      const regler = hof.createGain();
      // Sinus: Beim Shepard-Ton zaehlt nur die Oktavleiter, Obertoene
      // wuerden die Taeuschung zerstoeren.
      schwinger.type = 'sine';
      regler.gain.value = 0;
      schwinger.connect(regler).connect(summe);
      schwinger.start();
      return { schwinger, regler };
    });

    return true;
  }

  /**
   * Huellkurve ueber das Oktavband: in der Mitte laut, an beiden Raendern
   * still. Nur dadurch merkt das Ohr nicht, wann ein Ton verschwindet und
   * am anderen Ende wieder auftaucht.
   */
  const huelle = (anteil) => 0.5 - 0.5 * Math.cos(2 * Math.PI * anteil);

  function stimme(lautstaerke) {
    if (!klingt || !stimmen.length) return;

    for (let k = 0; k < OKTAVEN; k += 1) {
      const lage = k + phase;
      const { schwinger, regler } = stimmen[k];
      schwinger.frequency.setTargetAtTime(GRUNDTON * 2 ** lage, hof.currentTime, 0.01);
      regler.gain.setTargetAtTime(huelle(lage / OKTAVEN) / OKTAVEN, hof.currentTime, 0.02);
    }

    summe.gain.setTargetAtTime(lautstaerke * 0.5, hof.currentTime, 0.05);
  }

  function schalteTon(an) {
    if (an && !baueKlang()) {
      melde(worte.keinton ?? 'Kein Ton möglich');
      return;
    }

    klingt = an;
    schalter.setAttribute('aria-pressed', String(an));
    schalter.textContent = an ? worte.aus : worte.an;

    if (!an && summe) summe.gain.setTargetAtTime(0, hof.currentTime, 0.05);
    melde(an ? worte.laeuft : worte.still);
  }

  schalter.addEventListener('click', () => schalteTon(!klingt));

  // ------------------------------------------------------------- Bewegung

  /** Steht dieser Punkt auf begehbarem Boden? */
  function begehbar(x, y) {
    const drin = (feld) =>
      x >= feld.x && x <= feld.x + feld.b && y >= feld.y && y <= feld.y + feld.h;
    return drin(GANG) || drin(VORNE);
  }

  function bewege(dt) {
    let dx = 0;
    let dy = 0;

    if (tasten.has('links')) dx -= 1;
    if (tasten.has('rechts')) dx += 1;
    if (tasten.has('hoch')) dy -= 1;
    if (tasten.has('runter')) dy += 1;

    if (!dx && !dy && ziel) {
      const ax = ziel.x - figur.x;
      const ay = ziel.y - figur.y;
      const weite = Math.hypot(ax, ay);
      if (weite > 2) {
        dx = ax / weite;
        dy = ay / weite;
      }
    }

    const laenge = Math.hypot(dx, dy) || 1;
    const schnelligkeit = 46; // Pixel je Sekunde, ungefaehr Schrittgeschwindigkeit
    const nx = figur.x + (dx / laenge) * schnelligkeit * dt;
    const ny = figur.y + (dy / laenge) * schnelligkeit * dt;

    // Jede Achse fuer sich, damit man an einer Wand entlanggleiten kann.
    const vorherX = figur.x;
    const vorherY = figur.y;
    if (begehbar(nx, figur.y)) figur.x = nx;
    if (begehbar(figur.x, ny)) figur.y = ny;

    figur.vx = dt > 0 ? (figur.x - vorherX) / dt : 0;
    figur.vy = dt > 0 ? (figur.y - vorherY) / dt : 0;
    figur.schritt += Math.hypot(figur.x - vorherX, figur.y - vorherY);
  }

  // ------------------------------------------------------------ Parameter

  /** Die drei Werte, auf die die Installation heruntergebrochen wurde. */
  function parameter() {
    const schnell = Math.min(1, Math.hypot(figur.vx, figur.vy) / 46);

    // Nach vorne heisst aufwaerts: Die Eskalation gehoert zum Weg hinunter
    // in den Saal, nicht zum Rueckweg.
    const richtung = Math.abs(figur.vy) < 1 ? 0 : Math.sign(figur.vy);

    // Lautstaerke aus dem Abstand zur naeheren Box.
    const abstand = Math.min(
      ...BOXEN.map((box) =>
        Math.hypot(figur.x - (box.x + box.b / 2), figur.y - (box.y + box.h / 2)),
      ),
    );
    const laut = Math.max(0.25, 1 - abstand / 190);

    return { schnell, richtung, laut };
  }

  // -------------------------------------------------------------- Zeichnen

  function farbe(name, ausweich) {
    const wert = getComputedStyle(leinwand).getPropertyValue(name).trim();
    return wert || ausweich;
  }

  /** "#c6e173" oder "rgb(198 225 115)" als drei Zahlen — sonst nichts. */
  function kanaele(wert) {
    const kurz = wert.match(/^#([0-9a-f]{3})$/i);
    if (kurz) return [...kurz[1]].map((z) => parseInt(z + z, 16));

    const lang = wert.match(/^#([0-9a-f]{6})$/i);
    if (lang) return [0, 2, 4].map((i) => parseInt(lang[1].slice(i, i + 2), 16));

    const zahlen = wert.match(/-?\d+(\.\d+)?/g);
    return zahlen && zahlen.length >= 3 ? zahlen.slice(0, 3).map(Number) : null;
  }

  /**
   * Mischt zwei Farben. Die Zwischentoene werden hier gerechnet und nicht
   * aus Tokens gelesen: Die Tokens der Seite sind color-mix-Ausdruecke, und
   * die nimmt nicht jeder Canvas an.
   */
  function mische(a, b, anteil) {
    const x = kanaele(a);
    const y = kanaele(b);
    if (!x || !y) return a;
    const [r, g, bl] = x.map((wert, i) => Math.round(wert + (y[i] - wert) * anteil));
    return `rgb(${r} ${g} ${bl})`;
  }

  function kasten(x, y, b, h, fuellung) {
    stift.fillStyle = fuellung;
    stift.fillRect(Math.round(x), Math.round(y), Math.round(b), Math.round(h));
  }

  /**
   * Die Leinwand im Raum: Streifen, die endlos in dieselbe Richtung
   * wandern wie der Ton steigt — das Auge sitzt derselben Taeuschung auf
   * wie das Ohr.
   */
  function zeichneIllusion(tinte, grund) {
    kasten(LEINWAND.x, LEINWAND.y, LEINWAND.b, LEINWAND.h, grund);

    const breite = 8;
    const teilung = breite * 2;
    const versatz = ((phase * teilung) % teilung) - teilung;

    // Erst die Leinwand ausschneiden, dann die Streifen hineinzeichnen —
    // sonst laege der Beschnitt im selben Pfad wie der Streifen.
    stift.save();
    stift.beginPath();
    stift.rect(LEINWAND.x, LEINWAND.y, LEINWAND.b, LEINWAND.h);
    stift.clip();

    stift.fillStyle = tinte;
    for (let x = -LEINWAND.h - teilung; x < LEINWAND.b + teilung; x += teilung) {
      // Schraeg gestellt: senkrechte Streifen wuerden nur blinken.
      const links = LEINWAND.x + x + versatz;
      stift.beginPath();
      stift.moveTo(links, LEINWAND.y + LEINWAND.h);
      stift.lineTo(links + breite, LEINWAND.y + LEINWAND.h);
      stift.lineTo(links + breite + LEINWAND.h, LEINWAND.y);
      stift.lineTo(links + LEINWAND.h, LEINWAND.y);
      stift.closePath();
      stift.fill();
    }
    stift.restore();

    stift.strokeStyle = tinte;
    stift.lineWidth = 1;
    stift.strokeRect(LEINWAND.x + 0.5, LEINWAND.y + 0.5, LEINWAND.b - 1, LEINWAND.h - 1);
  }

  function zeichne(werte) {
    const grund = farbe('--paper', '#c6e173');
    const tinte = farbe('--ink', '#1b260d');

    // Drei Werte, hell nach dunkel: der begehbare Weg, der uebrige Raum,
    // die Sitzreihen. Dadurch sieht man auf einen Blick, wohin man kann.
    const raum = mische(grund, tinte, 0.12);
    const matt = mische(grund, tinte, 0.45);

    kasten(0, 0, BREITE, HOEHE, raum);
    kasten(GANG.x, GANG.y, GANG.b, GANG.h, grund);
    kasten(VORNE.x, VORNE.y, VORNE.b, VORNE.h, grund);

    // Aussenwand
    stift.strokeStyle = tinte;
    stift.lineWidth = 2;
    stift.strokeRect(5, 5, BREITE - 10, HOEHE - 10);

    // Die Tuer oben links — der einzige Eingang.
    kasten(14, 3, 26, 4, grund);

    // Sitzreihen: Bloecke, die jeden anderen Weg versperren.
    for (const y of REIHEN) {
      for (let x = 62; x < 226; x += 14) kasten(x, y, 10, 10, matt);
    }

    // Boxen vorne
    for (const box of BOXEN) kasten(box.x, box.y, box.b, box.h, tinte);

    zeichneIllusion(tinte, grund);

    // Die Figur: vier Pixel breit, mit zwei Gehbildern.
    const geht = Math.hypot(figur.vx, figur.vy) > 2;
    const bein = geht && Math.floor(figur.schritt / 6) % 2 === 0;
    const fx = Math.round(figur.x) - 2;
    const fy = Math.round(figur.y) - 5;
    kasten(fx, fy, 5, 4, tinte); // Kopf
    kasten(fx, fy + 5, 5, 4, tinte); // Rumpf
    kasten(fx + (bein ? 0 : 1), fy + 9, 2, 3, tinte);
    kasten(fx + (bein ? 3 : 2), fy + 9, 2, 3, tinte);

    // Zwei Ringe als Schallwellen, wenn der Ton laeuft und man geht.
    if (klingt) {
      stift.strokeStyle = tinte;
      stift.lineWidth = 1;
      for (const box of BOXEN) {
        const mx = box.x + box.b / 2;
        const my = box.y + box.h / 2;
        for (let r = 1; r <= 2; r += 1) {
          const weite = 6 + r * 9 + ((phase * 9) % 9);
          stift.globalAlpha = werte.laut * (1 - r / 3) * 0.8;
          stift.beginPath();
          stift.arc(mx, my, weite, Math.PI, 2 * Math.PI);
          stift.stroke();
        }
      }
      stift.globalAlpha = 1;
    }
  }

  // ----------------------------------------------------------------- Lauf

  function balken(element, anteil) {
    if (element) element.style.setProperty('--anteil', `${Math.round(anteil * 100)}%`);
  }

  function bild(jetzt) {
    const dt = Math.min(0.05, (jetzt - letzte) / 1000) || 0;
    letzte = jetzt;

    if (!ruht) {
      bewege(dt);
      const werte = parameter();

      // Richtung und Geschwindigkeit verschieben die Lage im Oktavband.
      phase = (phase + werte.richtung * werte.schnell * TEMPO * dt + 1) % 1;

      stimme(werte.laut);
      zeichne(werte);

      balken(anzeigen.tempo, werte.schnell);
      balken(anzeigen.laut, werte.laut);
      if (anzeigen.richtung) {
        anzeigen.richtung.dataset.richtung =
          werte.richtung > 0 ? 'ab' : werte.richtung < 0 ? 'auf' : 'halt';
      }
    }

    requestAnimationFrame(bild);
  }

  // ------------------------------------------------------------- Bedienung

  const TASTEN = {
    ArrowLeft: 'links',
    ArrowRight: 'rechts',
    ArrowUp: 'hoch',
    ArrowDown: 'runter',
    a: 'links',
    d: 'rechts',
    w: 'hoch',
    s: 'runter',
  };

  leinwand.addEventListener('keydown', (ereignis) => {
    const richtung = TASTEN[ereignis.key] ?? TASTEN[ereignis.key.toLowerCase?.()];
    if (!richtung) return;
    ereignis.preventDefault();
    tasten.add(richtung);
    ziel = null;
  });

  leinwand.addEventListener('keyup', (ereignis) => {
    const richtung = TASTEN[ereignis.key] ?? TASTEN[ereignis.key.toLowerCase?.()];
    if (richtung) tasten.delete(richtung);
  });

  leinwand.addEventListener('blur', () => tasten.clear());

  /** Rechnet einen Zeigerpunkt in Grundriss-Pixel um. */
  function punkt(ereignis) {
    const feld = leinwand.getBoundingClientRect();
    return {
      x: ((ereignis.clientX - feld.left) / feld.width) * BREITE,
      y: ((ereignis.clientY - feld.top) / feld.height) * HOEHE,
    };
  }

  leinwand.addEventListener('pointerdown', (ereignis) => {
    ereignis.preventDefault();
    leinwand.setPointerCapture(ereignis.pointerId);
    leinwand.focus();
    ziel = punkt(ereignis);
  });

  leinwand.addEventListener('pointermove', (ereignis) => {
    if (ziel) ziel = punkt(ereignis);
  });

  const loslassen = () => {
    ziel = null;
  };
  leinwand.addEventListener('pointerup', loslassen);
  leinwand.addEventListener('pointercancel', loslassen);

  schalteTon(false);
  requestAnimationFrame((jetzt) => {
    letzte = jetzt;
    requestAnimationFrame(bild);
  });

  return {
    /** Ausser Sicht wird es still — eine Installation im Hintergrund ist keine. */
    pause(soll) {
      ruht = soll;
      if (soll && klingt && summe) summe.gain.setTargetAtTime(0, hof.currentTime, 0.1);
    },
  };
}
