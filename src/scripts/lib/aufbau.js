/**
 * Die technischen Aufbauten als Zeichnung.
 *
 * Jede Installation besteht aus denselben drei Dingen: Was hereinkommt,
 * was rechnet, was herauskommt. Genau so ist jede Skizze aufgebaut —
 * drei Spalten, dazwischen Linien. Dadurch sieht man beim zweiten
 * Projekt sofort, was man beim ersten gelernt hat.
 *
 * Gezeichnet wird als SVG mit `currentColor`, damit die Skizze die
 * Farben der Seite erbt und in jeder Groesse scharf bleibt — ein Bild
 * muesste man dafuer dreimal exportieren.
 */

const KASTEN_B = 190;
const KASTEN_H = 54;
const LUFT = 18;
const SPALTE = 92;
const RAND = 8;
const KOPF = 26;

/**
 * Die Aufbauten. Je Spalte eine Beschriftung und die Kaesten darunter;
 * ein `|` im Kastentext bricht die Zeile um.
 */
export const AUFBAUTEN = {
  'in-lakech': {
    alt: 'Zwei Arcade-Knöpfe gehen an einen Raspberry Pi, der Display, Kamera und Bon-Drucker ansteuert',
    spalten: [
      { label: 'Eingabe', kaesten: ['Arcade-Knopf A|Taiyo', 'Arcade-Knopf B|Tsuki'] },
      { label: 'Rechner', kaesten: ['Raspberry Pi|Python · Pygame'] },
      {
        label: 'Ausgabe',
        kaesten: ['Display|1280 × 720', 'Kamera', 'Bon-Drucker|durchnummeriert'],
      },
    ],
  },

  nostalgia: {
    alt: 'Eine Kamera geht an zwei TouchDesigner-Projekte, die auf zwei Röhrenmonitore streamen',
    spalten: [
      { label: 'Eingabe', kaesten: ['Kamera|Körperhaltung, Hand'] },
      { label: 'Rechner', kaesten: ['TouchDesigner|Schwellenwerte', 'Videospuren|RGB-Versatz'] },
      { label: 'Ausgabe', kaesten: ['Röhre links|Ebene A', 'Röhre rechts|Ebene B'] },
    ],
  },

  'shepard-tone': {
    alt: 'Elf Oszillatoren laufen über eine Hüllkurve auf die Lautsprecher, dazu ein Projektor',
    spalten: [
      { label: 'Quelle', kaesten: ['11 Oszillatoren|20 Hz – 20.480 Hz'] },
      { label: 'Rechner', kaesten: ['Web Audio API|Hüllkurve', 'Tempo · Richtung|Lautstärke'] },
      {
        label: 'Ausgabe',
        kaesten: ['Lautsprecher|Vorlesungssaal', 'Projektion|optische Illusion'],
      },
    ],
  },

  zodizine: {
    alt: 'Ein Touchscreen gibt das Geburtsdatum an einen Raspberry Pi, der ein PDF erzeugt und druckt',
    spalten: [
      { label: 'Eingabe', kaesten: ['Touchscreen|Tag · Monat · Jahr'] },
      {
        label: 'Rechner',
        kaesten: [
          'Raspberry Pi|Kiosk-Modus',
          'React · Flask|drei Tierkreise',
          'ReportLab|A4-Bogen',
        ],
      },
      { label: 'Ausgabe', kaesten: ['Drucker', 'Acht Seiten|zum Falten'] },
    ],
  },

  rreth: {
    alt: 'Vier Videoakte und ein Soundtrack laufen über Projektion und Lautsprecher in den Raum',
    spalten: [
      { label: 'Material', kaesten: ['Vier Akte|Rotoskopie · EbSynth', 'Soundtrack|42 Spuren'] },
      { label: 'Steuerung', kaesten: ['Fünf Phasen|Farbe · Ton · Dauer'] },
      { label: 'Raum', kaesten: ['Projektion', 'Lautsprecher', 'Telefonzellen|für die Besucher'] },
    ],
  },

  interaktionsdesign: {
    alt: 'Kamera und Mikrofon gehen an die Auswertung, die daraus ein Dashboard schreibt',
    spalten: [
      { label: 'Eingabe', kaesten: ['Kamera|Gesichtszüge', 'Mikrofon|Stimme'] },
      { label: 'Auswertung', kaesten: ['Merkmale|alle 0,4 Sekunden'] },
      { label: 'Ausgabe', kaesten: ['Verlauf|zwei Einträge', 'Dashboard'] },
    ],
  },
};

const esc = (text) =>
  String(text).replace(
    /[&<>"]/g,
    (zeichen) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[zeichen],
  );

/** Ein Kasten mit ein oder zwei Zeilen Text. */
function kasten(x, y, text) {
  const zeilen = String(text).split('|');
  const mitte = x + KASTEN_B / 2;
  const start = y + (zeilen.length === 1 ? 32 : 23);

  const beschriftung = zeilen
    .map(
      (zeile, i) =>
        `<text x="${mitte}" y="${start + i * 17}" text-anchor="middle" font-size="${
          i === 0 ? 14 : 12
        }" opacity="${i === 0 ? 1 : 0.7}">${esc(zeile)}</text>`,
    )
    .join('');

  return `<rect x="${x}" y="${y}" width="${KASTEN_B}" height="${KASTEN_H}" fill="none" stroke="currentColor" stroke-width="2"/>${beschriftung}`;
}

/**
 * Baut die Skizze zu einem Namen. Gibt eine leere Zeichenkette zurueck,
 * wenn es dazu keine gibt.
 */
export function aufbauSvg(name) {
  const plan = AUFBAUTEN[name];
  if (!plan) return '';

  const spalten = plan.spalten;
  const hoechste = Math.max(...spalten.map((s) => s.kaesten.length));
  const inhaltH = hoechste * KASTEN_H + (hoechste - 1) * LUFT;
  const breite = RAND * 2 + spalten.length * KASTEN_B + (spalten.length - 1) * SPALTE;
  const hoehe = RAND * 2 + KOPF + inhaltH;

  const teile = [];

  spalten.forEach((spalte, si) => {
    const x = RAND + si * (KASTEN_B + SPALTE);
    // Spaltenname als kleine Versalzeile darueber
    teile.push(
      `<text x="${x}" y="${RAND + 13}" font-size="11" letter-spacing="2" opacity="0.65">${esc(
        spalte.label.toUpperCase(),
      )}</text>`,
    );

    // Die Kaesten einer Spalte sitzen mittig zur hoechsten Spalte
    const eigenH = spalte.kaesten.length * KASTEN_H + (spalte.kaesten.length - 1) * LUFT;
    const oben = RAND + KOPF + (inhaltH - eigenH) / 2;

    spalte.kaesten.forEach((text, ki) => {
      teile.push(kasten(x, oben + ki * (KASTEN_H + LUFT), text));
    });

    // Linien zur naechsten Spalte: von jedem Kasten rechts zur Mitte
    // der naechsten Spalte — so sieht man, was wohin geht.
    if (si === spalten.length - 1) return;
    const naechste = spalten[si + 1];
    const naechsteH = naechste.kaesten.length * KASTEN_H + (naechste.kaesten.length - 1) * LUFT;
    const naechsteOben = RAND + KOPF + (inhaltH - naechsteH) / 2;
    const zielX = x + KASTEN_B + SPALTE;

    spalte.kaesten.forEach((_, ki) => {
      const vonY = oben + ki * (KASTEN_H + LUFT) + KASTEN_H / 2;
      naechste.kaesten.forEach((__, kj) => {
        const nachY = naechsteOben + kj * (KASTEN_H + LUFT) + KASTEN_H / 2;
        const mitteX = x + KASTEN_B + SPALTE / 2;
        teile.push(
          `<path d="M ${x + KASTEN_B} ${vonY} H ${mitteX} V ${nachY} H ${zielX}" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.55"/>`,
        );
      });
    });

    // Pfeilspitze am Eingang der naechsten Spalte
    naechste.kaesten.forEach((__, kj) => {
      const nachY = naechsteOben + kj * (KASTEN_H + LUFT) + KASTEN_H / 2;
      teile.push(
        `<path d="M ${zielX - 7} ${nachY - 4} L ${zielX} ${nachY} L ${zielX - 7} ${nachY + 4}" fill="none" stroke="currentColor" stroke-width="1.5"/>`,
      );
    });
  });

  return `
    <figure class="aufbau">
      <svg viewBox="0 0 ${breite} ${hoehe}" role="img" aria-label="${esc(plan.alt)}" font-family="var(--font-mono)">
        ${teile.join('\n        ')}
      </svg>
    </figure>`;
}
