/**
 * IN LAK'ECH — spielbarer Prototyp im Browser.
 *
 * Uebertragung der Raspberry-Pi-Fassung (aphotobooth.py, Pygame) auf ein
 * Canvas. Ablauf, Texte, Zeiten, Pixelschrift und T9-Effekt sind dieselben.
 * Was der Browser nicht kann, wird angedeutet:
 *   - Kamera + Kassenbon-Drucker  ->  Blitz und ein Bon, der ins Bild faehrt
 *   - Arcade-Knoepfe              ->  Tasten A / K oder die Knoepfe unter dem Bild
 *   - Screensaver-Video           ->  der Fallback-Attract aus dem Original
 *
 * Die zwei Figuren sind Taiyo (links, Taste A) und Tsuki (rechts, Taste K).
 * Ihre Angriffe sind die GIFs aus der Raspberry-Fassung, als Spritesheets
 * aufbereitet von scripts/make-inlakech-figuren.mjs.
 *
 * Gezeichnet wird intern immer in 1280 x 720; CSS skaliert das Canvas.
 *
 * Zurueck kommt { druecke, pause }: `druecke('A' | 'B')` loest einen Knopf
 * aus, `pause(true|false)` haelt die Schleife an, wenn das Fenster in der
 * Projektseite nicht im Bild ist.
 */

const SW = 1280;
const SH = 720;

// Pixelgroessen wie im Original (dort aus der Bildschirmbreite berechnet).
const PX_HEAD = 5;
const PX_BIG = 16;
const PX_TXT = 4;

// ----- Timing (Sekunden) -----
// Deutlich knapper als in aphotobooth.py: Am Bildschirm soll eine Runde in
// rund 20 Sekunden durch sein statt in fast einer Minute.
const IDLE_TIMEOUT = 60;
const ABANDON_TIMEOUT = 30;
const MIN_INPUT_DELAY = 0.25; // Pause nach jeder Zeile bis zur naechsten Eingabe
const T9_STEP = 0.012;
const T9_SETTLE = 0.025;
const ANGRIFF_TEMPO = 2; // Angriffs-GIFs laufen doppelt so schnell wie im Original
const TREFFER_ZEIT = 0.45; // so lange blinkt die getroffene Figur
const SMILE_TEXT_TIME = 1.1;
const HAND_TRAVEL_TIME = 1.6;
const FLASH_TIME = 0.3;
const BON_ZEIT = 1.3; // so lange faehrt der Kassenbon heraus
const END_HOLD_TIME = 4.5;
const FADE = 0.2;

// In welchem Bild der Angriffs-GIFs der Schuss faellt und wann er trifft.
const SCHUSS_BILD = 3;
const TREFFER_BILD = 7;

const HEADER = "IN LAK'ECH";

// Dialog-Sequenz ("Kampf"). who: A (links), B (rechts, Taste K) oder BOTH.
// left/right: 'figur' (Taiyo bzw. Tsuki) oder 'hand'. shoot: wer angreift.
const BATTLE = [
  { who: 'A', text: 'Kann ich dir vertrauen?', left: 'figur', right: 'figur', shoot: 'A2B' },
  {
    who: 'B',
    text: 'Das hat weh getan. Aber du kannst mir vertrauen.',
    left: 'figur',
    right: 'figur',
    shoot: 'B2A',
  },
  { who: 'A', text: 'Du tust weh.', left: 'hand', right: 'figur', shoot: null },
  { who: 'B', text: 'Ich bin verletzt.', left: 'hand', right: 'hand', shoot: null },
  { who: 'BOTH', text: 'Wir sind verletzt.', left: 'hand', right: 'hand', shoot: null },
  { who: 'A', text: 'Ich hab dich trotzdem lieb.', left: 'hand', right: 'hand', shoot: null },
  { who: 'B', text: 'Ich hab dich auch lieb.', left: 'hand', right: 'hand', shoot: null },
];

// ----- Nokia-LCD-Farben -----
const LCD_DARK = 'rgb(27, 51, 17)';
const LCD_INK2 = 'rgb(60, 90, 45)';
const LCD_BG = 'rgb(152, 206, 96)';
const BLITZ = 'rgb(238, 248, 230)';
const PAPIER = 'rgb(246, 244, 236)';
const DRUCK = 'rgb(28, 28, 28)';

const BILDER = {
  hintergrund: 'hintergrund.webp',
  handLinks: 'hand-links.webp',
  handRechts: 'hand-rechts.webp',
  endeLinks: 'ende-links.webp',
  endeRechts: 'ende-rechts.webp',
  titel: 'titel.webp',
  satz: 'satz.webp',
  taiyo: 'taiyo.png',
  tsuki: 'tsuki.png',
};

// ─────────────────────────────────────────────── 5x7-Pixelschrift ──

const FONT = {
  A: ['01110', '10001', '10001', '11111', '10001', '10001', '10001'],
  B: ['11110', '10001', '11110', '10001', '10001', '10001', '11110'],
  C: ['01111', '10000', '10000', '10000', '10000', '10000', '01111'],
  D: ['11110', '10001', '10001', '10001', '10001', '10001', '11110'],
  E: ['11111', '10000', '11110', '10000', '10000', '10000', '11111'],
  F: ['11111', '10000', '11110', '10000', '10000', '10000', '10000'],
  G: ['01111', '10000', '10000', '10011', '10001', '10001', '01111'],
  H: ['10001', '10001', '11111', '10001', '10001', '10001', '10001'],
  I: ['11111', '00100', '00100', '00100', '00100', '00100', '11111'],
  J: ['00111', '00010', '00010', '00010', '00010', '10010', '01100'],
  K: ['10001', '10010', '11100', '10010', '10001', '10001', '10001'],
  L: ['10000', '10000', '10000', '10000', '10000', '10000', '11111'],
  M: ['10001', '11011', '10101', '10101', '10001', '10001', '10001'],
  N: ['10001', '11001', '10101', '10011', '10001', '10001', '10001'],
  O: ['01110', '10001', '10001', '10001', '10001', '10001', '01110'],
  P: ['11110', '10001', '10001', '11110', '10000', '10000', '10000'],
  Q: ['01110', '10001', '10001', '10001', '10101', '10010', '01101'],
  R: ['11110', '10001', '10001', '11110', '10100', '10010', '10001'],
  S: ['01111', '10000', '10000', '01110', '00001', '00001', '11110'],
  T: ['11111', '00100', '00100', '00100', '00100', '00100', '00100'],
  U: ['10001', '10001', '10001', '10001', '10001', '10001', '01110'],
  V: ['10001', '10001', '10001', '10001', '10001', '01010', '00100'],
  W: ['10001', '10001', '10001', '10101', '10101', '11011', '10001'],
  X: ['10001', '10001', '01010', '00100', '01010', '10001', '10001'],
  Y: ['10001', '10001', '01010', '00100', '00100', '00100', '00100'],
  Z: ['11111', '00001', '00010', '00100', '01000', '10000', '11111'],
  0: ['01110', '10001', '10011', '10101', '11001', '10001', '01110'],
  1: ['00100', '01100', '00100', '00100', '00100', '00100', '01110'],
  2: ['01110', '10001', '00001', '00110', '01000', '10000', '11111'],
  3: ['11110', '00001', '00001', '01110', '00001', '00001', '11110'],
  4: ['00010', '00110', '01010', '10010', '11111', '00010', '00010'],
  5: ['11111', '10000', '11110', '00001', '00001', '10001', '01110'],
  6: ['01110', '10000', '11110', '10001', '10001', '10001', '01110'],
  7: ['11111', '00001', '00010', '00100', '01000', '01000', '01000'],
  8: ['01110', '10001', '10001', '01110', '10001', '10001', '01110'],
  9: ['01110', '10001', '10001', '01111', '00001', '00001', '01110'],
  '.': ['00000', '00000', '00000', '00000', '00000', '01100', '01100'],
  ',': ['00000', '00000', '00000', '00000', '01100', '01100', '00100'],
  '!': ['00100', '00100', '00100', '00100', '00100', '00000', '00100'],
  '?': ['01110', '10001', '00001', '00110', '00100', '00000', '00100'],
  "'": ['00100', '00100', '00100', '00000', '00000', '00000', '00000'],
  ':': ['00000', '01100', '01100', '00000', '01100', '01100', '00000'],
  '-': ['00000', '00000', '00000', '11111', '00000', '00000', '00000'],
  '/': ['00001', '00010', '00010', '00100', '01000', '01000', '10000'],
  '>': ['01000', '00100', '00010', '00001', '00010', '00100', '01000'],
  '<': ['00010', '00100', '01000', '10000', '01000', '00100', '00010'],
  _: ['00000', '00000', '00000', '00000', '00000', '00000', '11111'],
  ' ': ['00000', '00000', '00000', '00000', '00000', '00000', '00000'],
  ä: ['01010', '00000', '01110', '00001', '01111', '10001', '01111'],
  ö: ['01010', '00000', '01110', '10001', '10001', '10001', '01110'],
  ü: ['01010', '00000', '10001', '10001', '10001', '10011', '01101'],
  Ä: ['01010', '00000', '01110', '10001', '11111', '10001', '10001'],
  Ö: ['01010', '00000', '01110', '10001', '10001', '10001', '01110'],
  Ü: ['01010', '00000', '10001', '10001', '10001', '10001', '01110'],
};

function glyph(ch) {
  return FONT[ch] ?? FONT[ch.toUpperCase()] ?? FONT[ch.toLowerCase()] ?? FONT[' '];
}

function textWidth(text, px, spacing = 1) {
  return text.length * (5 + spacing) * px - spacing * px;
}

function drawText(g, text, x, y, px, color = LCD_DARK, spacing = 1) {
  g.fillStyle = color;
  let cx = x;
  for (const ch of text) {
    const rows = glyph(ch);
    for (let row = 0; row < 7; row++) {
      for (let col = 0; col < 5; col++) {
        if (rows[row][col] === '1') g.fillRect(cx + col * px, y + row * px, px, px);
      }
    }
    cx += (5 + spacing) * px;
  }
}

function drawCentered(g, text, y, px, color = LCD_DARK, spacing = 1) {
  drawText(g, text, Math.round((SW - textWidth(text, px, spacing)) / 2), y, px, color, spacing);
}

/** Zentrierter Mehrzeilen-Text mit Wortumbruch. */
function drawWrapped(g, text, y, px, color, maxW, spacing = 1) {
  const lines = [];
  let line = '';
  for (const word of text.split(' ')) {
    const test = (line + ' ' + word).trim();
    if (textWidth(test, px, spacing) > maxW && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  const lh = 7 * px + px * 2;
  lines.forEach((ln, i) => drawCentered(g, ln, y + i * lh, px, color, spacing));
}

// ───────────────────────────────────────────────────────────── T9 ──

const T9_KEYS = {};
for (const group of ['abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz']) {
  for (const ch of group) T9_KEYS[ch] = group;
}

const rotationen = (ch) => {
  const low = ch.toLowerCase();
  return T9_KEYS[low] ? T9_KEYS[low].indexOf(low) + 1 : 1;
};

function t9Char(ch, progress) {
  const low = ch.toLowerCase();
  if (!T9_KEYS[low]) return ch;
  const group = T9_KEYS[low];
  const idx = group.indexOf(low);
  const c = group[Math.min(idx, Math.floor(progress * (idx + 1)))];
  return ch === ch.toUpperCase() ? c.toUpperCase() : c;
}

/** Text im T9-Tippstil: [angezeigt, fertig?] nach `elapsed` Sekunden. */
function t9Render(text, elapsed) {
  let built = '';
  let rest = elapsed;
  for (const ch of text) {
    const rot = rotationen(ch);
    const dur = rot * T9_STEP + T9_SETTLE;
    if (rest >= dur) {
      built += ch;
      rest -= dur;
    } else {
      built += t9Char(ch, Math.max(0, Math.min(1, rest / (rot * T9_STEP))));
      return [built, false];
    }
  }
  return [built, true];
}

const t9Total = (text) =>
  [...text].reduce((sum, ch) => sum + rotationen(ch) * T9_STEP + T9_SETTLE, 0);

// ─────────────────────────────────────────────────────────── Ton ──

/**
 * Soundeffekte im Stil der Game-Boy-Pokemon-Spiele: Rechteck-Toene und
 * Rauschen, alles im Browser erzeugt — keine Audiodateien.
 * Erst nach der ersten Eingabe moeglich; Browser erlauben vorher keinen Ton.
 */
class Ton {
  constructor() {
    this.ctx = null;
    this.rauschen = null;
  }

  wecken() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      return;
    }
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      // Eine Sekunde weisses Rauschen fuer Knall, Aufprall und Drucker
      const n = this.ctx.sampleRate;
      this.rauschen = this.ctx.createBuffer(1, n, n);
      const daten = this.rauschen.getChannelData(0);
      for (let i = 0; i < n; i++) daten[i] = Math.random() * 2 - 1;
    } catch {
      this.ctx = null;
    }
  }

  /** Ein Ton ab `start` Sekunden. `bis`: Zielfrequenz fuer ein Glissando. */
  note(freq, start, dauer, { typ = 'square', vol = 0.06, bis = null } = {}) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime + start;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = typ;
    osc.frequency.setValueAtTime(freq, t);
    if (bis) osc.frequency.exponentialRampToValueAtTime(bis, t + dauer);
    gain.gain.setValueAtTime(vol, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dauer);
    osc.connect(gain).connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + dauer + 0.02);
  }

  /** Gefiltertes Rauschen ab `start` Sekunden. */
  knall(start, dauer, { vol = 0.15, filter = 'lowpass', freq = 2000 } = {}) {
    if (!this.ctx || !this.rauschen) return;
    const t = this.ctx.currentTime + start;
    const quelle = this.ctx.createBufferSource();
    quelle.buffer = this.rauschen;
    const f = this.ctx.createBiquadFilter();
    f.type = filter;
    f.frequency.value = freq;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(vol, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dauer);
    quelle.connect(f).connect(gain).connect(this.ctx.destination);
    quelle.start(t, Math.random() * 0.5, dauer + 0.02);
  }

  /** Melodie: Frequenzen im festen Abstand, 0 ist eine Pause. */
  folge(noten, schritt, start = 0, opts = {}) {
    noten.forEach((f, i) => f && this.note(f, start + i * schritt, schritt * 0.9, opts));
  }

  // Text-Ticken, wie wenn bei Pokemon ein Satz erscheint
  blip() {
    this.note(1320, 0, 0.016, { vol: 0.025 });
  }
  // Knopf gedrueckt — der Zwei-Ton-Blip aus dem Menue
  bestaetigen() {
    this.note(988, 0, 0.045, { vol: 0.05 });
    this.note(1319, 0.045, 0.07, { vol: 0.05 });
  }
  // Ein wilder Kampf beginnt
  kampfStart() {
    this.folge([523, 659, 784, 1047, 784, 1047, 1319], 0.055, 0, { vol: 0.05 });
  }
  // Taiyo: Schuss — Knall mit absackendem Ton
  schuss() {
    this.knall(0, 0.2, { vol: 0.3, freq: 3500 });
    this.note(320, 0, 0.16, { typ: 'triangle', vol: 0.14, bis: 55 });
  }
  // Tsuki: Welle — fallender Laser
  welle() {
    this.note(1700, 0, 0.34, { vol: 0.04, bis: 190 });
    this.note(2550, 0.02, 0.3, { vol: 0.02, bis: 280 });
  }
  // Treffer: zwei dumpfe Schlaege, die Figur blinkt dazu
  treffer() {
    this.knall(0, 0.12, { vol: 0.32, freq: 900 });
    this.note(150, 0, 0.12, { vol: 0.08, bis: 60 });
    this.knall(0.15, 0.09, { vol: 0.22, freq: 700 });
  }
  fehler() {
    this.note(160, 0, 0.2, { vol: 0.07 });
    this.note(240, 0.2, 0.26, { vol: 0.07 });
  }
  // Versoehnung — wie die Heilmelodie im Pokemon-Center
  heilung() {
    this.folge([784, 988, 1175, 1568, 0, 1175, 1568, 0, 2093], 0.085, 0, { vol: 0.045 });
  }
  ausloeser() {
    this.knall(0, 0.05, { vol: 0.25, filter: 'highpass', freq: 3000 });
    this.knall(0.07, 0.06, { vol: 0.2, filter: 'highpass', freq: 2000 });
  }
  // Kassenbon-Drucker: schnelles Rattern
  drucker(start, dauer) {
    for (let t = 0; t < dauer; t += 0.035) {
      this.knall(start + t, 0.018, { vol: 0.07, filter: 'bandpass', freq: 2600 });
    }
  }
  // Kampf gewonnen — kurze Fanfare
  sieg(start = 0) {
    this.folge([784, 784, 784, 1047, 0, 988, 1047, 1047], 0.09, start, { vol: 0.05 });
  }
}

// ───────────────────────────────────────────────────────── Grafik ──

const ease = (t) => {
  const x = Math.max(0, Math.min(1, t));
  return x * x * (3 - 2 * x);
};

function leinwand(w, h) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return c;
}

/** Faerbt ein Bild mit Transparenz komplett in einer Farbe ein (Form bleibt). */
function einfaerben(img, farbe, w = img.naturalWidth, h = img.naturalHeight) {
  const c = leinwand(w, h);
  const g = c.getContext('2d');
  g.drawImage(img, 0, 0, w, h);
  g.globalCompositeOperation = 'source-in';
  g.fillStyle = farbe;
  g.fillRect(0, 0, w, h);
  return c;
}

/** Welches Bild einer Animation nach t Sekunden dran ist. */
function bildNach(figur, t) {
  let rest = t * 1000;
  for (let i = 0; i < figur.bilder; i++) {
    rest -= figur.zeiten[i];
    if (rest < 0) return i;
  }
  return 0;
}

function ladeBilder(basis) {
  const eintraege = Object.entries(BILDER).map(
    ([name, datei]) =>
      new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve([name, img]);
        img.onerror = () => reject(new Error(`${datei} fehlt`));
        img.src = basis + datei;
      }),
  );
  return Promise.all(eintraege).then(Object.fromEntries);
}

// ─────────────────────────────────────────────────────────── Spiel ──

const READY = 'ready';
const SCHONER = 'schoner';
const WARTEN = 'warten';
const ENTHUELLEN = 'enthuellen';
const HAENDE = 'haende';
const LAECHELN = 'laecheln';
const FOTO = 'foto';
const ENDE = 'ende';
const AUSKLANG = 'ausklang';

const ZAEHLER_KEY = 'inlakech-begegnung';

/** Liest den Begegnungs-Zaehler, erhoeht ihn und gibt ihn fuenfstellig zurueck. */
function naechsteBegegnung() {
  let n = 0;
  try {
    n = Number(localStorage.getItem(ZAEHLER_KEY)) || 0;
  } catch {
    // Speicher gesperrt (privates Fenster) — dann zaehlt jede Sitzung neu.
  }
  n += 1;
  try {
    localStorage.setItem(ZAEHLER_KEY, String(n));
  } catch {
    // siehe oben
  }
  return String(n).padStart(5, '0');
}

/**
 * Startet das Spiel auf einem Canvas.
 *   canvas   das <canvas>
 *   basis    URL-Praefix der Bilder (mit Schraegstrich am Ende)
 *   status   optionaler Rueckruf fuer die Statuszeile unter dem Bild
 * Gibt eine Funktion `druecke('A' | 'B')` zurueck, mit der Knoepfe ausserhalb
 * des Canvas das Spiel bedienen.
 */
export async function startInLakech(canvas, basis, status = () => {}) {
  const g = canvas?.getContext?.('2d');
  if (!g) return () => {};
  canvas.width = SW;
  canvas.height = SH;
  g.imageSmoothingEnabled = false;

  g.fillStyle = LCD_BG;
  g.fillRect(0, 0, SW, SH);
  drawCentered(g, 'LADE ...', SH / 2 - 14, PX_TXT, LCD_DARK, 2);

  const [bild, figurDaten] = await Promise.all([
    ladeBilder(basis),
    fetch(basis + 'figuren.json').then((antwort) => antwort.json()),
  ]);
  const ton = new Ton();

  // ----- Figuren: Taiyo (links) und Tsuki (rechts) -----
  // Ganzzahlig vergroessert, damit die Nokia-Pixel scharf bleiben.
  const FIGUR_S = Math.floor((SH * 0.44) / Math.max(figurDaten.taiyo.h, figurDaten.tsuki.h));
  const figur = (img, daten) => {
    const zeiten = daten.zeiten.map((ms) => ms / ANGRIFF_TEMPO);
    return {
      ...daten,
      zeiten,
      sheet: einfaerben(img, LCD_DARK),
      dauer: zeiten.reduce((summe, ms) => summe + ms, 0) / 1000,
    };
  };
  const taiyo = figur(bild.taiyo, figurDaten.taiyo);
  const tsuki = figur(bild.tsuki, figurDaten.tsuki);

  // Spaeter werden die Figuren zu Haenden (Versoehnung).
  const handH = Math.round(SH * 0.3);
  const hand = (img) =>
    einfaerben(img, LCD_DARK, Math.round((img.naturalWidth * handH) / img.naturalHeight), handH);
  const handSprite = { links: hand(bild.handLinks), rechts: hand(bild.handRechts) };

  // Figuren und Haende stehen auf derselben Grundlinie.
  const boxUnten = Math.round(SH * 0.6);
  const boxMitte = boxUnten - Math.round((taiyo.h * FIGUR_S) / 2);
  const leftX = Math.round(SW * 0.1);
  const rechtsBuendig = (breite) => SW - leftX - breite;

  // ----- Schlussbild: quadratisch, mittig, so hoch wie das Bild -----
  const Q = SH;
  const qx = Math.round((SW - Q) / 2);
  const ende = {
    links: einfaerben(bild.endeLinks, LCD_DARK, Q, Q),
    rechts: einfaerben(bild.endeRechts, LCD_DARK, Q, Q),
    titel: einfaerben(bild.titel, LCD_DARK, Q, Q),
    satz: einfaerben(bild.satz, LCD_DARK, Q, Q),
  };

  // ----- Kassenbon: Schlussbild in Druckerschwarz auf Papier -----
  const BON_W = 240;
  function bonZeichnen(nummer) {
    const zeilen = ['PREJNI', "IN LAK'ECH", 'BEGEGNUNG NR.' + nummer];
    const px = 2;
    const h = BON_W + 16 + zeilen.length * (7 * px + 8) + 16;
    const c = leinwand(BON_W, h);
    const b = c.getContext('2d');
    b.fillStyle = PAPIER;
    b.fillRect(0, 0, BON_W, h);
    for (const ebene of [bild.endeLinks, bild.endeRechts, bild.titel, bild.satz]) {
      b.drawImage(einfaerben(ebene, DRUCK, BON_W - 16, BON_W - 16), 8, 8);
    }
    zeilen.forEach((z, i) => {
      const w = textWidth(z, px, 1);
      drawText(b, z, Math.round((BON_W - w) / 2), BON_W + 8 + i * (7 * px + 8), px, DRUCK, 1);
    });
    // Abrisskante unten
    b.fillStyle = 'rgba(0,0,0,0.12)';
    for (let x = 0; x < BON_W; x += 8) b.fillRect(x, h - 4, 4, 4);
    return c;
  }

  // ----- Zustand -----
  let zustand = READY;
  let tZustand = performance.now() / 1000;
  let letzteAktivitaet = tZustand;
  let pausiert = false;
  let idx = 0;
  let beideBereit = { A: false, B: false };
  let enthuellStart = 0;
  let letzteBlipLaenge = 0;
  let aktuelleZeile = '';
  let bon = null;
  let gedrueckt = new Set();
  let jetzt = 0;
  // Angriff: welches GIF-Bild zuletzt gezeigt wurde, und wer gerade blinkt
  let letztesAngriffsBild = -1;
  let trefferSeite = null;
  let trefferBis = 0;

  const melde = {
    [READY]: 'Bereit — Spieler A drückt zuerst',
    [SCHONER]: 'Bildschirmschoner — eine Taste weckt ihn',
    // Waehrend eine Zeile getippt wird, ist niemand am Zug.
    [ENTHUELLEN]: 'Nachricht kommt …',
    [HAENDE]: 'Versöhnung',
    [LAECHELN]: 'Bitte lächeln',
    [FOTO]: 'Foto wird gedruckt …',
    [ENDE]: 'Begegnung gedruckt',
    [AUSKLANG]: 'Neue Runde',
  };

  function geh(neu) {
    zustand = neu;
    tZustand = performance.now() / 1000;
    if (melde[neu]) status(melde[neu]);
  }

  function neueRunde() {
    idx = 0;
    beideBereit = { A: false, B: false };
    aktuelleZeile = '';
  }

  function zugMelden() {
    const who = BATTLE[idx].who;
    status(
      who === 'BOTH'
        ? 'Am Zug: beide (A und K)'
        : `Am Zug: ${who === 'A' ? 'A (links)' : 'K (rechts)'}`,
    );
  }

  // ----- Zeichnen -----
  function grund() {
    // Hintergrund deckend ueber das ganze Bild (quadratisch -> mittig beschneiden)
    g.drawImage(bild.hintergrund, 0, (SH - SW) / 2, SW, SW);
    const m = Math.round(Math.min(SW, SH) * 0.045);
    g.strokeStyle = LCD_INK2;
    g.lineWidth = PX_TXT;
    g.beginPath();
    if (g.roundRect) g.roundRect(m, m, SW - 2 * m, SH - 2 * m, PX_TXT * 2);
    else g.rect(m, m, SW - 2 * m, SH - 2 * m);
    g.stroke();
    drawCentered(g, HEADER, Math.round(SH * 0.06), PX_HEAD, LCD_DARK, 2);
  }

  function zeigeFigur(f, i, x) {
    const w = f.w * FIGUR_S;
    const h = f.h * FIGUR_S;
    g.drawImage(f.sheet, i * f.w, 0, f.w, f.h, x, boxUnten - h, w, h);
  }

  /** Getroffen: die Figur flackert kurz, wie ein Pokemon, das Schaden nimmt. */
  const blinkt = (seite) =>
    seite === trefferSeite && jetzt < trefferBis && Math.floor(jetzt * 20) % 2 === 0;

  /** Beide Seiten zeichnen. `angriffT`: Sekunden seit Beginn des Angriffs,
      oder null, wenn gerade niemand angreift (dann stehen beide still). */
  function figuren(step, angriffT = null) {
    if (blinkt('links')) {
      // ausgelassen
    } else if (step.left === 'figur') {
      const i = step.shoot === 'A2B' && angriffT !== null ? bildNach(taiyo, angriffT) : 0;
      zeigeFigur(taiyo, i, leftX);
    } else {
      g.drawImage(handSprite.links, leftX, boxMitte - handH / 2);
    }
    if (blinkt('rechts')) {
      // ausgelassen
    } else if (step.right === 'figur') {
      const i = step.shoot === 'B2A' && angriffT !== null ? bildNach(tsuki, angriffT) : 0;
      zeigeFigur(tsuki, i, rechtsBuendig(tsuki.w * FIGUR_S));
    } else {
      g.drawImage(handSprite.rechts, rechtsBuendig(handSprite.rechts.width), boxMitte - handH / 2);
    }
  }

  /** Blinkendes ▼ unter dem Text: jemand ist am Zug. */
  function weiterPfeil() {
    if (Math.floor(jetzt * 3) % 2) return;
    const px = PX_TXT;
    const x = Math.round(SW * 0.88);
    const y = Math.round(SH * 0.86);
    g.fillStyle = LCD_DARK;
    for (let r = 0; r < 4; r++) g.fillRect(x + r * px, y + r * px, (7 - 2 * r) * px, px);
  }

  function zugAnzeige(who) {
    const y = boxUnten + PX_TXT * 3;
    if (who === 'BOTH') drawCentered(g, 'BEIDE DRÜCKEN', Math.round(SH * 0.8), PX_TXT, LCD_INK2, 2);
    else if (who === 'A') drawText(g, '> A', leftX, y, PX_TXT, LCD_DARK, 2);
    else drawText(g, 'K <', rechtsBuendig(textWidth('K <', PX_TXT, 2)), y, PX_TXT, LCD_DARK, 2);
  }

  function dialog(text) {
    if (text) drawWrapped(g, text, Math.round(SH * 0.69), PX_TXT, LCD_DARK, SW * 0.8, 2);
  }

  function haende(p) {
    g.drawImage(ende.links, Math.round(-Q + (qx + Q) * p), 0);
    g.drawImage(ende.rechts, Math.round(SW + (qx - SW) * p), 0);
  }

  function fehlermeldung(alpha) {
    g.save();
    g.globalAlpha = alpha;
    const bw = Math.round(SW * 0.52);
    const bh = Math.round(SH * 0.4);
    const bx = SW / 2 - bw / 2;
    const by = Math.round(SH * 0.46) - bh / 2;
    g.fillStyle = LCD_BG;
    g.fillRect(bx, by, bw, bh);
    g.strokeStyle = LCD_DARK;
    g.lineWidth = PX_TXT;
    g.strokeRect(bx, by, bw, bh);
    const th = Math.round(bh * 0.24);
    g.fillStyle = LCD_DARK;
    g.fillRect(bx, by, bw, th);
    drawCentered(g, 'ERROR', by + th / 2 - 14, PX_TXT, LCD_BG, 2);
    drawCentered(g, 'BITTE LÄCHELN', by + th + (bh - th) / 2 - 14, PX_TXT, LCD_DARK, 2);
    g.restore();
  }

  // ----- Eingabe -----
  function druecke(knopf) {
    ton.wecken();
    gedrueckt.add(knopf);
  }

  window.addEventListener('keydown', (event) => {
    if (event.repeat || event.metaKey || event.ctrlKey || event.altKey) return;
    const k = event.key.toLowerCase();
    if (k === 'a') druecke('A');
    else if (k === 'k') druecke('B');
  });

  // ----- Schleife -----
  function bild_(nowMs) {
    if (pausiert) return;
    const now = nowMs / 1000;
    jetzt = now;
    const el = now - tZustand;
    const pressed = gedrueckt;
    gedrueckt = new Set();
    if (pressed.size) letzteAktivitaet = now;

    if (zustand === READY) {
      grund();
      figuren(BATTLE[0]);
      if (Math.floor(now * 1.4) % 2 === 0) {
        drawCentered(g, 'DRÜCKE A ZUM START', Math.round(SH * 0.8), PX_TXT, LCD_DARK, 2);
      }
      if (pressed.has(BATTLE[0].who)) {
        neueRunde();
        ton.kampfStart();
        enthuellStart = now;
        letzteBlipLaenge = 0;
        letztesAngriffsBild = -1;
        geh(ENTHUELLEN);
      } else if (now - letzteAktivitaet > IDLE_TIMEOUT) {
        geh(SCHONER);
      }
    } else if (zustand === SCHONER) {
      grund();
      const puls = 0.55 + 0.45 * (0.5 - 0.5 * Math.cos(now * 2));
      g.save();
      g.globalAlpha = puls;
      drawCentered(g, 'PREJNIII', Math.round(SH * 0.4), PX_BIG, LCD_DARK, 2);
      drawCentered(
        g,
        'Suche einen Freund und drücke eine Taste.',
        Math.round(SH * 0.58),
        PX_TXT,
        LCD_DARK,
        2,
      );
      g.restore();
      if (pressed.size) {
        ton.bestaetigen();
        neueRunde();
        letzteAktivitaet = now;
        geh(READY);
      }
    } else if (zustand === WARTEN) {
      const step = BATTLE[idx];
      grund();
      figuren(step);
      dialog(aktuelleZeile);
      zugAnzeige(step.who);
      weiterPfeil();
      const erlaubt = el >= MIN_INPUT_DELAY;
      let weiter;
      if (step.who === 'BOTH') {
        for (const k of pressed) beideBereit[k] = true;
        weiter = erlaubt && beideBereit.A && beideBereit.B;
      } else {
        weiter = erlaubt && pressed.has(step.who);
      }
      if (weiter) {
        ton.bestaetigen();
        enthuellStart = now;
        letzteBlipLaenge = 0;
        letztesAngriffsBild = -1;
        beideBereit = { A: false, B: false };
        geh(ENTHUELLEN);
      } else if (now - letzteAktivitaet > ABANDON_TIMEOUT) {
        neueRunde();
        geh(READY);
      }
    } else if (zustand === ENTHUELLEN) {
      const step = BATTLE[idx];
      const tRev = now - enthuellStart;
      // Erst laeuft der Angriff (das GIF der Figur), dann wird getippt.
      const angreifer = { A2B: taiyo, B2A: tsuki }[step.shoot];
      const schuss = angreifer ? angreifer.dauer : 0;

      // Schuss und Treffer im Takt der GIF-Bilder
      if (tRev < schuss) {
        const i = bildNach(angreifer, tRev);
        if (i !== letztesAngriffsBild) {
          if (i === SCHUSS_BILD) angreifer === taiyo ? ton.schuss() : ton.welle();
          if (i === TREFFER_BILD) {
            ton.treffer();
            trefferSeite = angreifer === taiyo ? 'rechts' : 'links';
            trefferBis = now + TREFFER_ZEIT;
          }
          letztesAngriffsBild = i;
        }
      }

      grund();
      figuren(step, tRev < schuss ? tRev : null);
      if (tRev < schuss) {
        dialog(aktuelleZeile);
      } else {
        let tippen = tRev - schuss;
        // Wie bei Pokemon: Druecken waehrend des Tippens zeigt die Zeile sofort ganz.
        if (pressed.size && tippen < t9Total(step.text)) {
          ton.bestaetigen();
          enthuellStart = now - schuss - t9Total(step.text);
          tippen = t9Total(step.text);
        }
        const [gezeigt, fertig] = t9Render(step.text, tippen);
        if (gezeigt.length !== letzteBlipLaenge) {
          ton.blip();
          letzteBlipLaenge = gezeigt.length;
        }
        const cursor = Math.floor(now * 2) % 2 === 0 ? '_' : ' ';
        dialog(gezeigt + (fertig ? '' : cursor));
        if (fertig && tippen > t9Total(step.text) + 0.05) {
          aktuelleZeile = step.text;
          idx += 1;
          if (idx >= BATTLE.length) {
            ton.heilung();
            geh(HAENDE);
          } else {
            geh(WARTEN);
            zugMelden();
          }
        }
      }
    } else if (zustand === HAENDE) {
      grund();
      haende(ease(el / HAND_TRAVEL_TIME));
      if (el >= HAND_TRAVEL_TIME) {
        ton.fehler();
        geh(LAECHELN);
      }
    } else if (zustand === LAECHELN) {
      grund();
      haende(1);
      fehlermeldung(el < FADE ? ease(el / FADE) : 1);
      if (el > SMILE_TEXT_TIME) {
        ton.ausloeser();
        bon = bonZeichnen(naechsteBegegnung());
        geh(FOTO);
      }
    } else if (zustand === FOTO || zustand === ENDE) {
      grund();
      haende(1);
      const tEnde = zustand === FOTO ? 0 : el;
      // Titel und Satz blenden nach dem Blitz ein
      g.save();
      g.globalAlpha = ease(tEnde / (FADE * 2));
      g.drawImage(ende.titel, qx, 0);
      g.drawImage(ende.satz, qx, 0);
      g.restore();
      // Kassenbon faehrt unten rechts aus dem "Drucker"
      if (zustand === ENDE && bon) {
        const p = ease((tEnde - 0.2) / BON_ZEIT);
        const ziel = SH - bon.height - 24;
        const by = SH + (ziel - SH) * p;
        g.drawImage(bon, SW - BON_W - 56, Math.round(by));
      }
      if (zustand === FOTO) {
        g.fillStyle = BLITZ;
        g.globalAlpha = 1 - ease(el / FLASH_TIME);
        g.fillRect(0, 0, SW, SH);
        g.globalAlpha = 1;
        if (el > FLASH_TIME) {
          ton.drucker(0.2, BON_ZEIT);
          ton.sieg(BON_ZEIT + 0.4);
          geh(ENDE);
        }
      } else if (el > END_HOLD_TIME) {
        geh(AUSKLANG);
      }
    } else if (zustand === AUSKLANG) {
      grund();
      g.save();
      g.globalAlpha = 1 - ease(el / FADE);
      haende(1);
      g.drawImage(ende.titel, qx, 0);
      g.drawImage(ende.satz, qx, 0);
      g.restore();
      if (el > FADE) {
        neueRunde();
        letzteAktivitaet = now;
        geh(READY);
      }
    }

    requestAnimationFrame(bild_);
  }

  /**
   * Haelt die Schleife an, solange das Fenster nicht im Bild ist — sonst
   * liefe das Spiel die ganze Projektseite lang im Hintergrund weiter.
   * Beim Fortsetzen faengt eine neue Runde an: Was waehrend der Pause
   * passiert waere, hat ohnehin niemand gesehen.
   */
  function pause(an) {
    if (an === pausiert) return;
    pausiert = an;
    if (an) return;
    neueRunde();
    letzteAktivitaet = performance.now() / 1000;
    geh(READY);
    requestAnimationFrame(bild_);
  }

  geh(READY);
  requestAnimationFrame(bild_);
  return { druecke, pause };
}
