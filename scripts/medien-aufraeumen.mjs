/**
 * Bringt media.json mit dem in Einklang, was wirklich in public/media liegt.
 *
 * Loescht man ein Bild von Hand aus einem Projektordner, steht es noch
 * im Index — und die Seite sucht es dann vergeblich. Dieses Skript
 * entfernt genau diese Eintraege und meldet, welche Kapitel dadurch
 * Dateinamen nennen, die es nicht mehr gibt.
 *
 * Es loescht selbst nie eine Datei. Es raeumt nur den Index auf.
 *
 * Aufruf:
 *   node scripts/medien-aufraeumen.mjs            nur zeigen
 *   node scripts/medien-aufraeumen.mjs --schreiben  wirklich aufraeumen
 */

import fs from 'node:fs';
import path from 'node:path';
import { projects as ctProjekte } from '../src/data/creative-technology.js';
import { projects as filmProjekte } from '../src/data/film.js';
import { projects as gameProjekte } from '../src/data/game.js';
import { projects as kdProjekte } from '../src/data/kommunikationsdesign.js';
import { basename } from '../src/scripts/lib/chapters.js';

const ROOT = path.resolve(import.meta.dirname, '..');
const DATEI = path.join(ROOT, 'src', 'data', 'media.json');
const SCHREIBEN = process.argv.includes('--schreiben');

const alleProjekte = [...ctProjekte, ...filmProjekte, ...gameProjekte, ...kdProjekte];

/** Liegt die Datei da — genau so geschrieben? */
const ordnerInhalt = new Map();
function dateiDa(rel) {
  const voll = path.join(ROOT, 'public', rel);
  const ordner = path.dirname(voll);
  if (!ordnerInhalt.has(ordner)) {
    ordnerInhalt.set(ordner, fs.existsSync(ordner) ? new Set(fs.readdirSync(ordner)) : new Set());
  }
  return ordnerInhalt.get(ordner).has(path.basename(voll));
}

const daten = JSON.parse(fs.readFileSync(DATEI, 'utf8'));
const entfernt = [];

for (const projekte of Object.values(daten)) {
  for (const [slug, projekt] of Object.entries(projekte)) {
    for (const art of ['images', 'videos', 'docs']) {
      projekt[art] = projekt[art].filter((eintrag) => {
        if (dateiDa(eintrag.src)) return true;
        entfernt.push({ slug, name: path.basename(eintrag.src) });
        return false;
      });
    }
  }
}

if (entfernt.length === 0) {
  console.log('Index und Ordner stimmen ueberein — nichts aufzuraeumen.');
  process.exit(0);
}

const nachProjekt = new Map();
for (const { slug, name } of entfernt) {
  if (!nachProjekt.has(slug)) nachProjekt.set(slug, []);
  nachProjekt.get(slug).push(name);
}

console.log(`${entfernt.length} Eintraege ohne Datei:\n`);
for (const [slug, namen] of nachProjekt) {
  console.log(`  ${slug}: ${namen.join(', ')}`);
}

// Welche Kapitel nennen jetzt ins Leere?
const verwaiste = [];
for (const projekt of alleProjekte) {
  const weg = nachProjekt.get(projekt.medien ?? projekt.slug);
  if (!weg) continue;
  const stamm = new Set(weg.map((n) => basename(n)));
  for (const kapitel of projekt.chapters ?? []) {
    for (const praefix of kapitel.files ?? []) {
      const trifftNoch = [...stamm].some((s) => s.startsWith(praefix));
      if (trifftNoch) verwaiste.push(`${projekt.slug} · "${kapitel.title}" · ${praefix}`);
    }
  }
}

if (verwaiste.length) {
  console.log('\nKapitel, die davon betroffen sind:');
  for (const zeile of new Set(verwaiste)) console.log(`  ${zeile}`);
}

if (!SCHREIBEN) {
  console.log('\nProbelauf. Mit --schreiben wird media.json wirklich aufgeraeumt.');
  process.exit(0);
}

fs.writeFileSync(DATEI, JSON.stringify(daten, null, 2) + '\n');
console.log('\nmedia.json aufgeraeumt. Danach npm run check laufen lassen.');
