/**
 * Die Toene der Seite — Tastenpiepser wie am Nokia 3310.
 *
 * Nichts davon ist eine Datei: Die Klaenge entstehen im Browser aus
 * Rechteckschwingungen, genau wie der Summer eines alten Telefons.
 * Deshalb kosten sie nichts an Ladezeit und klingen auf jedem Geraet
 * gleich.
 *
 * Standardmaessig ist der Ton AUS. Niemand will von einer Seite
 * angepiept werden, die er nur anschaut — eingeschaltet wird er ueber
 * den Lautsprecher in der Kopfzeile, und die Wahl bleibt gespeichert.
 *
 * Der erste Ton darf ohnehin erst nach einem Klick kommen; der Klick auf
 * den Schalter ist genau dieser erste Klick.
 */

const SPEICHER = 'portfolio-ton';

let an = false;
let hof = null; // AudioContext, erst beim ersten Ton angelegt

try {
  an = localStorage.getItem(SPEICHER) === 'an';
} catch {
  // Privates Fenster ohne Speicher — dann eben stumm.
}

function kontext() {
  const Klasse = window.AudioContext ?? window.webkitAudioContext;
  if (!Klasse) return null;
  hof ??= new Klasse();
  if (hof.state === 'suspended') hof.resume();
  return hof;
}

/**
 * Ein kurzer Piepser.
 * @param {number} hoehe      Tonhoehe in Hertz
 * @param {number} dauer      Laenge in Sekunden
 * @param {number} ab         Verzoegerung in Sekunden
 * @param {number} lautstaerke 0 bis 1
 */
function piep(hoehe, dauer = 0.03, ab = 0, lautstaerke = 0.05) {
  const ctx = kontext();
  if (!ctx) return;

  const start = ctx.currentTime + ab;
  const schwinger = ctx.createOscillator();
  const regler = ctx.createGain();

  // Rechteck klingt nach Piezo-Summer, nicht nach Synthesizer.
  schwinger.type = 'square';
  schwinger.frequency.setValueAtTime(hoehe, start);

  // Harte Kanten knacken; ein kurzes Auf und Ab nimmt das weg.
  regler.gain.setValueAtTime(0, start);
  regler.gain.linearRampToValueAtTime(lautstaerke, start + 0.004);
  regler.gain.setValueAtTime(lautstaerke, start + dauer - 0.006);
  regler.gain.linearRampToValueAtTime(0, start + dauer);

  schwinger.connect(regler).connect(ctx.destination);
  schwinger.start(start);
  schwinger.stop(start + dauer + 0.01);
}

/** Kurzes Rauschen — das Papier, das umschlaegt. */
function rauschen(dauer = 0.09, lautstaerke = 0.05) {
  const ctx = kontext();
  if (!ctx) return;

  const laenge = Math.floor(ctx.sampleRate * dauer);
  const puffer = ctx.createBuffer(1, laenge, ctx.sampleRate);
  const daten = puffer.getChannelData(0);
  for (let i = 0; i < laenge; i += 1) {
    // Zum Ende hin leiser: so klingt ein Blatt, das sich legt.
    daten[i] = (Math.random() * 2 - 1) * (1 - i / laenge) ** 2;
  }

  const quelle = ctx.createBufferSource();
  quelle.buffer = puffer;

  // Tiefen weg, sonst klingt es nach Wind statt nach Papier.
  const filter = ctx.createBiquadFilter();
  filter.type = 'highpass';
  filter.frequency.value = 2000;

  const regler = ctx.createGain();
  regler.gain.value = lautstaerke;

  quelle.connect(filter).connect(regler).connect(ctx.destination);
  quelle.start();
}

/** Die Toene, die die Seite kennt. */
export const ton = {
  /** Ein Schritt weiter: im Menue, in der Projektliste. */
  taste() {
    if (an) piep(1320, 0.025);
  },
  /** Etwas wird geoeffnet — zwei Toene aufwaerts, wie eine Bestaetigung. */
  auswahl() {
    if (!an) return;
    piep(988, 0.04);
    piep(1480, 0.06, 0.045);
  },
  /** Eine Seite im Heft wird umgeblaettert. */
  blatt() {
    if (an) rauschen();
  },
  /** Eine Einstellung aendert sich, zum Beispiel die Sprache. */
  wechsel() {
    if (!an) return;
    piep(660, 0.035);
    piep(880, 0.045, 0.04);
  },
  /** Am Rand angekommen — ein tiefer, kurzer Ton. */
  ende() {
    if (an) piep(220, 0.05, 0, 0.04);
  },
};

export const tonAn = () => an;

/**
 * Der Lautsprecher in der Kopfzeile. Zwei Zustaende, gezeichnet im
 * selben Pixelraster wie die Menuesymbole.
 */
function lautsprecher(laut) {
  return `
    <svg viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
      <rect x="1" y="4" width="2" height="4" />
      <rect x="3" y="3" width="1" height="6" />
      <rect x="4" y="2" width="1" height="8" />
      ${
        laut
          ? `<rect x="7" y="4" width="1" height="4" />
             <rect x="9" y="2" width="1" height="8" />`
          : `<rect x="7" y="4" width="1" height="1" />
             <rect x="8" y="5" width="1" height="1" />
             <rect x="9" y="6" width="1" height="1" />
             <rect x="9" y="4" width="1" height="1" />
             <rect x="8" y="6" width="1" height="1" />
             <rect x="7" y="7" width="1" height="1" />`
      }
    </svg>`;
}

/**
 * Haengt den Schalter neben den Sprachschalter in die Kopfzeile, auf der
 * Startseite in die Statusleiste.
 */
export function initTonschalter(beschriftung = { an: 'Ton an', aus: 'Ton aus' }) {
  const platz = document.querySelector('.site-header') ?? document.querySelector('.home__status');
  if (!platz || platz.querySelector('.tonschalter')) return;

  const knopf = document.createElement('button');
  knopf.type = 'button';
  knopf.className = 'tonschalter';
  const zeichne = () => {
    knopf.innerHTML = lautsprecher(an);
    knopf.classList.toggle('is-an', an);
    knopf.setAttribute('aria-pressed', String(an));
    knopf.setAttribute('aria-label', an ? beschriftung.an : beschriftung.aus);
  };
  zeichne();

  knopf.addEventListener('click', () => {
    an = !an;
    try {
      localStorage.setItem(SPEICHER, an ? 'an' : 'aus');
    } catch {
      // Ohne Speicher gilt die Wahl nur fuer diesen Besuch.
    }
    zeichne();
    // Beim Einschalten einmal hoeren, was man eingeschaltet hat.
    if (an) ton.auswahl();
  });

  platz.appendChild(knopf);
}
