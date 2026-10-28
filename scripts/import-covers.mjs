/**
 * Importiert die Titelbilder aus public/media/COVER/ als `header`-Bild in
 * das jeweilige Projekt unter public/media/<kategorie>/<slug>/.
 *
 * Anders als media-manifest.mjs (das aus Desktop/Portofolio liest) liegen
 * diese Dateien schon im Projekt selbst — deshalb ein eigenes, kleines Skript
 * statt eines Eintrags in der grossen Kuratierungs-Liste.
 *
 *   node scripts/import-covers.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { LIMITS } from './media-manifest.mjs';
import { CROP } from './make-crops.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const COVER_DIR = path.join(ROOT, 'public', 'media', 'COVER');
const MEDIA_DIR = path.join(ROOT, 'public', 'media');
const DATA_FILE = path.join(ROOT, 'src', 'data', 'media.json');

// Die Titelbilder liegen flach in public/media/COVER/, 1800 x 1200 im
// Format 3:2. Hier steht, welches zu welchem Projekt gehoert und in
// welchem Medienordner das Projekt liegt.
const HEADERS = [
  { category: 'arbeit', slug: 'chiro-med', file: 'ChiroMed.png' },
  { category: 'arbeit', slug: 'citydep', file: 'CityDepartment.png' },
  { category: 'arbeit', slug: 'fischerhuette', file: 'Fischerhütte Plochingen.png' },
  { category: 'arbeit', slug: 'handwerkerexperten', file: 'Handwerkerexperten.png' },
  { category: 'arbeit', slug: 'huginn', file: 'huginn.png' },
  { category: 'arbeit', slug: 'sodam', file: 'SoDam.png' },
  { category: 'arbeit', slug: 'step-v', file: 'StepV.png' },
  { category: 'freizeit', slug: 'improtheater', file: 'Landestheater Thübingen.png' },
  { category: 'freizeit', slug: 'kamamuta', file: 'KAMA MUTA.png' },
  { category: 'freizeit', slug: 'love', file: 'LOVE.png' },
  { category: 'freizeit', slug: 'musikvideos', file: 'MUSIKVIDEOS.png' },
  { category: 'uni', slug: 'art-of-peace', file: 'AIKIDO.png' },
  { category: 'uni', slug: 'botlnick-gamejam', file: 'BOTLNICK.png' },
  { category: 'uni', slug: 'in-lakech', file: 'INLACKECH.png' },
  { category: 'uni', slug: 'interaktionsdesign', file: 'InnerFlow.png' },
  { category: 'uni', slug: 'nostalgia', file: 'NOSTALGIA.png' },
  { category: 'uni', slug: 'rreth', file: 'RRETH.png' },
  { category: 'uni', slug: 'shepard-tone', file: 'SHEPHARDTONE.png' },
  { category: 'uni', slug: 'umakeitgram', file: 'u’llMakeItGram.png' },
  { category: 'uni', slug: 'zodizine', file: 'ZODIZINE.png' },
];

async function writeHeaderImage(inputBuffer, outBase) {
  const meta = await sharp(inputBuffer).metadata();

  await sharp(inputBuffer)
    .resize({ width: LIMITS.imageMaxWidth, withoutEnlargement: true })
    .webp({ quality: LIMITS.webpQuality })
    .toFile(outBase + '.webp');

  await sharp(inputBuffer)
    .resize({ width: LIMITS.thumbWidth, withoutEnlargement: true })
    .webp({ quality: 70 })
    .toFile(outBase + '-thumb.webp');

  await sharp(inputBuffer)
    .resize(CROP.width, CROP.height, { fit: 'cover', position: sharp.strategy.attention })
    .webp({ quality: CROP.quality })
    .toFile(outBase + '-crop.webp');

  const w = Math.min(meta.width ?? LIMITS.imageMaxWidth, LIMITS.imageMaxWidth);
  const scale = w / (meta.width || w);
  return { width: Math.round(w), height: Math.round((meta.height ?? w) * scale) };
}

async function main() {
  const media = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));

  for (const h of HEADERS) {
    const src = path.join(COVER_DIR, h.file);
    if (!fs.existsSync(src)) {
      console.error(`  FEHLT: ${src}`);
      continue;
    }

    const outDir = path.join(MEDIA_DIR, h.category, h.slug);
    fs.mkdirSync(outDir, { recursive: true });
    const outBase = path.join(outDir, 'header');
    const buf = fs.readFileSync(src);
    const size = await writeHeaderImage(buf, outBase);

    const entry = {
      type: 'image',
      src: `/media/${h.category}/${h.slug}/header.webp`,
      thumb: `/media/${h.category}/${h.slug}/header-thumb.webp`,
      ...size,
    };

    media[h.category] ??= {};
    media[h.category][h.slug] ??= { images: [], videos: [], docs: [] };
    const images = media[h.category][h.slug].images;
    const withoutOldHeader = images.filter((i) => !i.src.endsWith('/header.webp'));
    media[h.category][h.slug].images = [entry, ...withoutOldHeader];

    console.log(`  ${h.category}/${h.slug}: header.webp (${size.width}x${size.height})`);
  }

  fs.writeFileSync(DATA_FILE, JSON.stringify(media, null, 2) + '\n', 'utf8');
  console.log('\nFertig.');
}

main();
