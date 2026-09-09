/**
 * Erzeugt zu jedem Bild einen einheitlichen Ausschnitt fuer die Kachelraster.
 *
 *   <name>.webp        Original in voller Breite  → Lightbox
 *   <name>-thumb.webp  kleine Fassung             → schnelles Laden
 *   <name>-crop.webp   fester Bildausschnitt 3:2  → Raster und Karten
 *
 * Warum ueberhaupt schneiden: Die Vorlagen sind wild gemischt — hochkant
 * PDF-Seiten, quadratische Logos, querformatige Screenshots. In einem Raster
 * nebeneinander ergibt das eine unruhige Treppe. Ein gemeinsames Seitenformat
 * beruhigt das sofort.
 *
 * Wo geschnitten wird, entscheidet sharp anhand des Bildinhalts
 * (`attention`) — das trifft Gesichter und kontrastreiche Stellen deutlich
 * besser als ein starrer Mittelschnitt.
 *
 * Das vollstaendige Bild geht dabei nicht verloren: die Lightbox zeigt
 * weiterhin das Original.
 *
 *   node scripts/make-crops.mjs          nur fehlende erzeugen
 *   node scripts/make-crops.mjs --force  alle neu erzeugen
 */

import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const MEDIA = path.join(ROOT, 'public', 'media');

export const CROP = { width: 1200, height: 800, quality: 78 }; // 3:2

const force = process.argv.includes('--force');

/** Alle Original-WebPs finden (ohne -thumb und -crop). */
function sammle(dir) {
  const treffer = [];
  for (const eintrag of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, eintrag.name);
    if (eintrag.isDirectory()) treffer.push(...sammle(p));
    else if (eintrag.name.endsWith('.webp') && !/-(thumb|crop)\.webp$/.test(eintrag.name))
      treffer.push(p);
  }
  return treffer;
}

export async function schneide(datei) {
  const ziel = datei.replace(/\.webp$/, '-crop.webp');
  if (!force && fs.existsSync(ziel)) return false;

  await sharp(datei)
    .resize(CROP.width, CROP.height, { fit: 'cover', position: sharp.strategy.attention })
    .webp({ quality: CROP.quality })
    .toFile(ziel + '.tmp');

  fs.renameSync(ziel + '.tmp', ziel);
  return true;
}

async function main() {
  if (!fs.existsSync(MEDIA)) {
    console.error('public/media fehlt — erst `npm run import` laufen lassen.');
    process.exit(1);
  }

  const dateien = sammle(MEDIA);
  let neu = 0;

  for (const datei of dateien) {
    try {
      if (await schneide(datei)) neu += 1;
    } catch (err) {
      console.error('Fehler bei', path.relative(MEDIA, datei), '—', err.message);
    }
  }

  console.log(
    `${dateien.length} Bilder geprueft, ${neu} Ausschnitte erzeugt (${CROP.width}×${CROP.height}).`,
  );
}

if (import.meta.filename === process.argv[1]) main();
