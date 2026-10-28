/**
 * Liest das bearbeitete Word-Dokument zurück in die Datendateien.
 *
 *   node scripts/texte-import.mjs                  (zeigt nur, was sich aendert)
 *   node scripts/texte-import.mjs --schreiben      (schreibt es wirklich)
 *   node scripts/texte-import.mjs --datei "C:/.../Portfolio-Texte.docx"
 *
 * Wie es funktioniert: Jede Tabellenzeile im Dokument traegt links den
 * Schluessel (zum Beispiel `rreth.chapters[2].text`). Dazu wird der alte
 * Text aus den Daten geholt und im Quelltext die Zeichenkette gesucht,
 * die genau diesen Wert ergibt — auch wenn sie dort ueber mehrere Zeilen
 * mit + zusammengesetzt ist. Nur diese eine Stelle wird ersetzt.
 *
 * Danach einmal `npx prettier --write src/data` laufen lassen.
 */

import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const ROOT = path.resolve(import.meta.dirname, '..');
const schreiben = process.argv.includes('--schreiben');
const dateiArg = process.argv.indexOf('--datei');
const DOKUMENT =
  dateiArg > -1 ? process.argv[dateiArg + 1] : path.join(ROOT, 'Portfolio-Texte.docx');

const BEREICHE = ['creative-technology', 'film', 'game', 'kommunikationsdesign'];

// ── Das Dokument lesen ─────────────────────────────────────────────────

/** Holt word/document.xml aus der .docx — ein ZIP ohne weitere Abhaengigkeit. */
function dokumentXml(datei) {
  const buf = fs.readFileSync(datei);
  // Zentrales Verzeichnis von hinten lesen, Eintrag fuer Eintrag.
  for (let i = buf.length - 22; i >= 0; i -= 1) {
    if (buf.readUInt32LE(i) !== 0x06054b50) continue;
    let zeiger = buf.readUInt32LE(i + 16);
    const anzahl = buf.readUInt16LE(i + 10);
    for (let n = 0; n < anzahl; n += 1) {
      const namensLaenge = buf.readUInt16LE(zeiger + 28);
      const extraLaenge = buf.readUInt16LE(zeiger + 30);
      const kommentarLaenge = buf.readUInt16LE(zeiger + 32);
      const name = buf.toString('utf8', zeiger + 46, zeiger + 46 + namensLaenge);
      const start = buf.readUInt32LE(zeiger + 42);
      if (name === 'word/document.xml') {
        const lokalExtra = buf.readUInt16LE(start + 28);
        const lokalName = buf.readUInt16LE(start + 26);
        const daten = buf.subarray(
          start + 30 + lokalName + lokalExtra,
          start + 30 + lokalName + lokalExtra + buf.readUInt32LE(zeiger + 20),
        );
        return buf.readUInt16LE(zeiger + 10) === 0
          ? daten.toString('utf8')
          : zlib.inflateRawSync(daten).toString('utf8');
      }
      zeiger += 46 + namensLaenge + extraLaenge + kommentarLaenge;
    }
  }
  throw new Error('word/document.xml nicht gefunden');
}

/** Alle Tabellenzeilen als [Schluessel, Text]. */
function zeilenAusXml(xml) {
  const zeilen = [];
  for (const treffer of xml.matchAll(/<w:tr[ >][\s\S]*?<\/w:tr>/g)) {
    const zellen = [...treffer[0].matchAll(/<w:tc[ >][\s\S]*?<\/w:tc>/g)].map((z) =>
      [...z[0].matchAll(/<w:p[ >][\s\S]*?<\/w:p>/g)]
        .map((p) =>
          [...p[0].matchAll(/<w:t(?: [^>]*)?>([\s\S]*?)<\/w:t>/g)]
            .map((t) => t[1])
            .join('')
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&apos;/g, "'"),
        )
        .join('\n')
        .trim(),
    );
    if (zellen.length === 2 && zellen[0]) zeilen.push(zellen);
  }
  return zeilen;
}

// ── Die alten Werte holen ──────────────────────────────────────────────

const alteWerte = new Map(); // Schluessel -> { wert, datei }

function merke(schluessel, wert, datei) {
  if (typeof wert === 'string' && wert.trim()) alteWerte.set(schluessel, { wert, datei });
}

const alsUrl = (rel) => `file:///${path.join(ROOT, rel).replace(/\\/g, '/')}`;

const { site } = await import(alsUrl('src/data/site.js'));
merke('site.name', site.name, 'src/data/site.js');
merke('site.role', site.role, 'src/data/site.js');
merke('site.intro', site.intro, 'src/data/site.js');
merke('site.ueber.rolle', site.ueber.rolle, 'src/data/site.js');
merke('site.ueber.text', site.ueber.text, 'src/data/site.js');
site.ueber.vorgehen.forEach((schritt, i) => {
  merke(`site.ueber.vorgehen[${i}].title`, schritt.title, 'src/data/site.js');
  merke(`site.ueber.vorgehen[${i}].text`, schritt.text, 'src/data/site.js');
});

for (const bereich of BEREICHE) {
  const datei = `src/data/${bereich}.js`;
  const { category, projects } = await import(alsUrl(datei));
  merke('category.title', category.title, datei);
  merke('category.lead', category.lead, datei);
  (category.vorgehen ?? []).forEach((schritt, i) => {
    merke(`category.vorgehen[${i}].title`, schritt.title, datei);
    merke(`category.vorgehen[${i}].text`, schritt.text, datei);
  });
  for (const projekt of projects) {
    for (const feld of ['title', 'subtitle', 'year', 'role', 'client', 'description', 'pull']) {
      merke(`${projekt.slug}.${feld}`, projekt[feld], datei);
      merke(feld, projekt[feld], datei); // Schluessel ohne Slug, wie im Dokument
    }
    (projekt.chapters ?? []).forEach((kapitel, i) => {
      merke(`${projekt.slug}.chapters[${i}].title`, kapitel.title, datei);
      merke(`${projekt.slug}.chapters[${i}].text`, kapitel.text, datei);
    });
  }
}

// ── Ersetzen ───────────────────────────────────────────────────────────

/** Findet im Quelltext die Zeichenkette, die genau `wert` ergibt. */
function findeKette(quelle, wert) {
  const muster = /'(?:[^'\\]|\\.)*'(?:\s*\+\s*'(?:[^'\\]|\\.)*')*/g;
  for (const treffer of quelle.matchAll(muster)) {
    const zusammen = [...treffer[0].matchAll(/'((?:[^'\\]|\\.)*)'/g)]
      .map((t) => t[1].replace(/\\'/g, "'").replace(/\\\\/g, '\\'))
      .join('');
    if (zusammen === wert) return { start: treffer.index, ende: treffer.index + treffer[0].length };
  }
  return null;
}

/** Bricht einen langen Text in die Schreibweise der Datendateien um. */
function alsQuelltext(text, einzug = 10) {
  const maske = (teil) => teil.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  if (text.length <= 92) return `'${maske(text)}'`;

  const zeilen = [];
  let zeile = '';
  for (const wort of text.split(' ')) {
    if ((zeile + wort).length > 88) {
      zeilen.push(zeile);
      zeile = '';
    }
    zeile += (zeile ? ' ' : '') + wort;
  }
  if (zeile) zeilen.push(zeile);
  const luecke = ' '.repeat(einzug);
  return zeilen
    .map((z, i) => `'${maske(z)}${i < zeilen.length - 1 ? ' ' : ''}'`)
    .join(` +\n${luecke}`);
}

const neueTexte = new Map(zeilenAusXml(dokumentXml(DOKUMENT)));
const aenderungen = [];

for (const [schluessel, neu] of neueTexte) {
  const alt = alteWerte.get(schluessel);
  if (!alt || alt.wert === neu) continue;
  aenderungen.push({ schluessel, datei: alt.datei, alt: alt.wert, neu });
}

if (aenderungen.length === 0) {
  console.log('Keine Aenderungen gefunden.');
  process.exit(0);
}

console.log(`${aenderungen.length} geaenderte Texte:\n`);
const proDatei = new Map();
for (const a of aenderungen) {
  console.log(`  ${a.datei} · ${a.schluessel}`);
  console.log(`    alt: ${a.alt.slice(0, 80)}${a.alt.length > 80 ? ' …' : ''}`);
  console.log(`    neu: ${a.neu.slice(0, 80)}${a.neu.length > 80 ? ' …' : ''}`);
  proDatei.set(a.datei, [...(proDatei.get(a.datei) ?? []), a]);
}

if (!schreiben) {
  console.log('\nZum Uebernehmen: node scripts/texte-import.mjs --schreiben');
  process.exit(0);
}

let geschrieben = 0;
for (const [datei, liste] of proDatei) {
  const pfad = path.join(ROOT, datei);
  let quelle = fs.readFileSync(pfad, 'utf8');
  for (const a of liste) {
    const stelle = findeKette(quelle, a.alt);
    if (!stelle) {
      console.log(`  ! nicht gefunden: ${a.schluessel}`);
      continue;
    }
    quelle = quelle.slice(0, stelle.start) + alsQuelltext(a.neu) + quelle.slice(stelle.ende);
    geschrieben += 1;
  }
  fs.writeFileSync(pfad, quelle, 'utf8');
}

console.log(`\n${geschrieben} Texte geschrieben. Jetzt: npx prettier --write src/data`);
