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
    alt: 'Eine Kamera geht an TouchDesigner, das beide Ebenen auf einen Röhrenmonitor legt',
    spalten: [
      { label: 'Eingabe', kaesten: ['Kamera|Abstand, Haltung, Hand'] },
      {
        label: 'Rechner',
        kaesten: [
          'TouchDesigner|Schwellenwerte',
          'Rasterung|grob bis fein',
          'RGB-Versatz|zwei Ebenen',
        ],
      },
      { label: 'Ausgabe', kaesten: ['Röhrenmonitor|am Aufzug'] },
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

  // Die Bachelorarbeit von 2023: vier Akte auf vier Projektionsebenen.
  rreth: {
    alt: 'Vier Videoakte laufen auf vier Projektionsebenen, dazu ein Soundtrack aus 42 Spuren',
    spalten: [
      {
        label: 'Material',
        kaesten: ['Vier Akte|Rotoskopie · EbSynth', 'Soundtrack|42 Spuren'],
      },
      { label: 'Technik', kaesten: ['Projektoren', 'Lautsprecher'] },
      { label: 'Raum', kaesten: ['Vier|Projektionsebenen'] },
    ],
  },

  // Der Pitch von 2025: fuenf Phasen, durch die man geht.
  'rreth-pitch': {
    alt: 'Fünf Phasen nacheinander: Dunkelheit, fünf Videoakte, Stille, helle Kabinen, Magazin',
    reihe: [
      'Entering the Void|3 Min · 0 Lux|Theta 4–8 Hz',
      'The Eye of the Storm|15 Min · 3 Flächen|Fünf Akte',
      'The Silence between|1 Min · 0 Lux|absolute Stille',
      'Breaking the Silence|offen · 10.000 Lux|Glaskabinen, Mikrofon',
      'From Feeling to|Understanding|zwei Magazine',
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
/**
 * Eine Abfolge: Kaesten nebeneinander, dazwischen Pfeile. Laengere
 * Ablaeufe brechen nach vier Schritten um — sonst wird die Zeichnung so
 * breit, dass auf dem Telefon niemand mehr etwas erkennt. Die Nummern
 * halten die Reihenfolge ueber den Umbruch hinweg zusammen.
 */
function reiheSvg(plan) {
  const B = 150;
  const H = 76;
  const LUECKE = 34;
  const PRO_ZEILE = 4;
  const ZEILE_H = H + 28;
  const teile = [];

  plan.reihe.forEach((eintrag, i) => {
    const spalte = i % PRO_ZEILE;
    const zeile = Math.floor(i / PRO_ZEILE);
    const x = RAND + spalte * (B + LUECKE);
    const y = RAND + zeile * ZEILE_H;
    const zeilen = String(eintrag).split('|');

    teile.push(
      `<rect x="${x}" y="${y}" width="${B}" height="${H}" fill="none" stroke="currentColor" stroke-width="2"/>`,
    );

    // Die Nummer der Phase sitzt oben links im Kasten.
    teile.push(`<text x="${x + 8}" y="${y + 15}" font-size="11" opacity="0.6">${i + 1}</text>`);

    zeilen.forEach((zeile, z) => {
      teile.push(
        `<text x="${x + B / 2}" y="${y + 32 + z * 15}" text-anchor="middle" font-size="${
          z === 0 ? 13 : 11
        }" opacity="${z === 0 ? 1 : 0.7}">${esc(zeile)}</text>`,
      );
    });

    // Am Zeilenende kein Pfeil — dort fuehrt die Nummer weiter.
    if (i === plan.reihe.length - 1 || spalte === PRO_ZEILE - 1) return;
    const pfeilVon = x + B;
    const pfeilBis = x + B + LUECKE;
    const mitte = y + H / 2;
    teile.push(
      `<path d="M ${pfeilVon} ${mitte} H ${pfeilBis}" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.55"/>`,
      `<path d="M ${pfeilBis - 7} ${mitte - 4} L ${pfeilBis} ${mitte} L ${pfeilBis - 7} ${mitte + 4}" fill="none" stroke="currentColor" stroke-width="1.5"/>`,
    );
  });

  const inZeile = Math.min(plan.reihe.length, PRO_ZEILE);
  const zeilen = Math.ceil(plan.reihe.length / PRO_ZEILE);
  const breite = RAND * 2 + inZeile * B + (inZeile - 1) * LUECKE;
  const hoehe = RAND * 2 + zeilen * ZEILE_H - (ZEILE_H - H);

  return `
    <figure class="aufbau">
      <svg viewBox="0 0 ${breite} ${hoehe}" role="img" aria-label="${esc(plan.alt)}" font-family="var(--font-mono)">
        ${teile.join('\n        ')}
      </svg>
    </figure>`;
}

export function aufbauSvg(name) {
  const plan = AUFBAUTEN[name];
  if (!plan) return '';
  if (plan.reihe) return reiheSvg(plan);

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
