/**
 * Importiert die Titelbilder aus public/media/COVER/<kategorie>/ als
 * `header`-Bild in das jeweilige Projekt unter public/media/<kategorie>/<slug>/.
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

// { category, slug, file: Dateiname relativ zu public/media/COVER/<Ordner> }
const HEADERS = [
  { category: 'arbeit', slug: 'chiro-med', folder: 'arbeit', file: 'chiromed.svg' },
  { category: 'arbeit', slug: 'citydep', folder: 'arbeit', file: 'citydept.svg' },
  { category: 'arbeit', slug: 'fischerhuette', folder: 'arbeit', file: 'fischerhütte.svg' },
  { category: 'arbeit', slug: 'huginn', folder: 'arbeit', file: 'huginn.svg' },
  { category: 'arbeit', slug: 'sodam', folder: 'arbeit', file: 'sodam.svg' },
  { category: 'arbeit', slug: 'step-v', folder: 'arbeit', file: 'stepv.svg' },
  { category: 'arbeit', slug: 'handwerkerexperten', folder: 'arbeit', file: 'Ingo.svg' },
  { category: 'freizeit', slug: 'love', folder: 'Freizeit', file: 'love.svg' },
  { category: 'freizeit', slug: 'musikvideos', folder: 'Freizeit', file: 'ereza.svg' },
  { category: 'uni', slug: 'kamamuta', folder: 'uni', file: 'kamamuta.svg' },
  { category: 'uni', slug: 'nostalgia', folder: 'uni', file: 'nostalgia.svg' },
  { category: 'uni', slug: 'rreth', folder: 'uni', file: 'rreth.svg' },
  { category: 'uni', slug: 'zodizine', folder: 'uni', file: 'zodizine.svg' },
  { category: 'uni', slug: 'shepard-tone', folder: 'uni', file: 'shephardtone.svg' },
  { category: 'uni', slug: 'botlnick-gamejam', folder: 'uni', file: 'botl.svg' },
  { category: 'uni', slug: 'interaktionsdesign', folder: 'uni', file: 'innerflow.svg' },
  { category: 'uni', slug: 'art-of-peace', folder: 'uni', file: 'aikido.svg' },
  { category: 'uni', slug: 'umakeitgram', folder: 'uni', file: 'umakeitgram.svg' },
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
    const src = path.join(COVER_DIR, h.folder, h.file);
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
