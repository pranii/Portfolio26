/**
 * Liest scripts/media-manifest.mjs, holt die kuratierten Dateien aus
 * Desktop/Portofolio und legt sie web-fertig unter public/media ab:
 *
 *   Bilder -> WebP (max. 1800px) + Thumbnail (720px)
 *   PDFs   -> Seiten als WebP gerendert, Original optional als Download
 *   Videos -> 1:1 kopiert, sofern unter dem Groessenlimit
 *
 * Ergebnis: public/media/**, src/data/media.json, ASSETS-REPORT.md
 *
 *   node scripts/import-assets.mjs
 *   node scripts/import-assets.mjs --only=uni        (nur eine Kategorie)
 *   node scripts/import-assets.mjs --only=uni/rreth  (nur ein Projekt)
 */

import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { pdf } from 'pdf-to-img';
import { SOURCE_ROOT, projects, LIMITS } from './media-manifest.mjs';
import { CROP } from './make-crops.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT_DIR = path.join(ROOT, 'public', 'media');
const DATA_FILE = path.join(ROOT, 'src', 'data', 'media.json');
const REPORT_FILE = path.join(ROOT, 'ASSETS-REPORT.md');

const onlyArg = process.argv.find((a) => a.startsWith('--only='))?.slice(7) ?? null;

const skipped = [];
const media = {};

// ─────────────────────────────────────────────────────────── Helfer ──

const UMLAUTS = { ä: 'ae', ö: 'oe', ü: 'ue', Ä: 'ae', Ö: 'oe', Ü: 'ue', ß: 'ss' };

function slugify(name) {
  return name
    .replace(/[äöüÄÖÜß]/g, (c) => UMLAUTS[c])
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

/** "bild (2).png" sortiert vor "bild (10).png" */
function naturalCompare(a, b) {
  return a.localeCompare(b, 'de', { numeric: true, sensitivity: 'base' });
}

function pad(n) {
  return String(n).padStart(2, '0');
}

function mb(bytes) {
  return (bytes / 1024 / 1024).toFixed(1) + ' MB';
}

function kindOf(file, explicit) {
  if (explicit) return explicit;
  const ext = path.extname(file).toLowerCase();
  if (['.png', '.jpg', '.jpeg', '.gif', '.webp'].includes(ext)) return 'image';
  if (['.mp4', '.mov', '.webm', '.m4v'].includes(ext)) return 'video';
  if (ext === '.pdf') return 'pdf';
  return 'other';
}

function listFiles(dir, { include, exclude }) {
  const abs = path.join(SOURCE_ROOT, dir);
  if (!fs.existsSync(abs)) {
    skipped.push({ reason: 'Ordner nicht gefunden', file: dir });
    return [];
  }
  return fs
    .readdirSync(abs, { withFileTypes: true })
    .filter((e) => e.isFile())
    .map((e) => e.name)
    .filter((n) => !n.startsWith('._') && n !== '.DS_Store')
    .filter((n) => (include ? include.test(n) : true))
    .filter((n) => (exclude ? !exclude.test(n) : true))
    .sort(naturalCompare)
    .map((n) => path.join(abs, n));
}

// ───────────────────────────────────────────────────── Konvertierung ──

async function writeImage(inputBuffer, outBase) {
  const img = sharp(inputBuffer, { animated: false });
  const meta = await img.metadata();

  await sharp(inputBuffer)
    .resize({ width: LIMITS.imageMaxWidth, withoutEnlargement: true })
    .webp({ quality: LIMITS.webpQuality })
    .toFile(outBase + '.webp');

  await sharp(inputBuffer)
    .resize({ width: LIMITS.thumbWidth, withoutEnlargement: true })
    .webp({ quality: 70 })
    .toFile(outBase + '-thumb.webp');

  // Einheitlicher 3:2-Ausschnitt fuer die Kachelraster. Wo geschnitten
  // wird, bestimmt sharp anhand des Bildinhalts.
  await sharp(inputBuffer)
    .resize(CROP.width, CROP.height, { fit: 'cover', position: sharp.strategy.attention })
    .webp({ quality: CROP.quality })
    .toFile(outBase + '-crop.webp');

  const w = Math.min(meta.width ?? LIMITS.imageMaxWidth, LIMITS.imageMaxWidth);
  const scale = w / (meta.width || w);
  return {
    width: Math.round(w),
    height: Math.round((meta.height ?? w) * scale),
  };
}

async function handleImage(src, outDir, publicDir, baseName, entries) {
  const ext = path.extname(src).toLowerCase();

  // Animierte GIFs behalten wir als GIF, sharp wuerde die Animation flachdruecken.
  if (ext === '.gif') {
    fs.copyFileSync(src, path.join(outDir, baseName + '.gif'));
    entries.push({
      type: 'image',
      src: `${publicDir}/${baseName}.gif`,
      thumb: `${publicDir}/${baseName}.gif`,
    });
    return;
  }

  const buf = fs.readFileSync(src);
  const size = await writeImage(buf, path.join(outDir, baseName));
  entries.push({
    type: 'image',
    src: `${publicDir}/${baseName}.webp`,
    thumb: `${publicDir}/${baseName}-thumb.webp`,
    ...size,
  });
}

async function handleVideo(src, outDir, publicDir, baseName, entries) {
  const bytes = fs.statSync(src).size;
  if (bytes > LIMITS.videoBytes) {
    skipped.push({
      reason: `Video zu gross (${mb(bytes)})`,
      file: path.relative(SOURCE_ROOT, src).replace(/\\/g, '/'),
      hint: 'komprimieren',
    });
    return;
  }
  const ext = path.extname(src).toLowerCase();
  fs.copyFileSync(src, path.join(outDir, baseName + ext));
  entries.push({ type: 'video', src: `${publicDir}/${baseName}${ext}`, bytes });
}

async function handlePdf(src, outDir, publicDir, baseName, entries, source) {
  const bytes = fs.statSync(src).size;
  const pageLimit = source.pages === 'cover' ? 1 : (source.pages ?? 1);

  // pages: 0 bedeutet "nur zum Download, keine Seitenbilder".
  if (pageLimit <= 0) {
    if (source.keepFile && bytes <= LIMITS.pdfCopyBytes) {
      fs.copyFileSync(src, path.join(outDir, baseName + '.pdf'));
      entries.push({ type: 'doc', src: `${publicDir}/${baseName}.pdf`, label: path.basename(src), bytes });
    }
    return;
  }

  let rendered = 0;
  try {
    const doc = await pdf(src, { scale: 2 });
    for await (const page of doc) {
      rendered += 1;
      const outBase = path.join(outDir, `${baseName}-s${pad(rendered)}`);
      const size = await writeImage(page, outBase);
      entries.push({
        type: 'image',
        src: `${publicDir}/${baseName}-s${pad(rendered)}.webp`,
        thumb: `${publicDir}/${baseName}-s${pad(rendered)}-thumb.webp`,
        fromPdf: baseName,
        page: rendered,
        ...size,
      });
      if (rendered >= pageLimit) break;
    }
  } catch (err) {
    skipped.push({
      reason: `PDF konnte nicht gerendert werden (${err.message})`,
      file: path.relative(SOURCE_ROOT, src).replace(/\\/g, '/'),
    });
  }

  if (source.keepFile) {
    if (bytes <= LIMITS.pdfCopyBytes) {
      fs.copyFileSync(src, path.join(outDir, baseName + '.pdf'));
      entries.push({
        type: 'doc',
        src: `${publicDir}/${baseName}.pdf`,
        label: path.basename(src),
        bytes,
      });
    } else {
      skipped.push({
        reason: `PDF-Download zu gross (${mb(bytes)})`,
        file: path.relative(SOURCE_ROOT, src).replace(/\\/g, '/'),
        hint: 'komprimieren',
      });
    }
  }
}

/**
 * Von Hand abgelegte Titelbilder.
 *
 * Wer `cover: 'header'` benutzt, legt eine Datei `header.webp` direkt in
 * public/media/<bereich>/<projekt>/ — sie steht in keinem Manifest. Ohne
 * diese Sicherung waere sie nach jedem Import weg, weil der Projektordner
 * vorher geleert wird.
 */
const ISTTITELBILD = (name) => /^header(-(thumb|crop))?\.(webp|png|jpe?g)$/i.test(name);

function sichereTitelbild(outDir) {
  if (!fs.existsSync(outDir)) return new Map();
  const gesichert = new Map();
  for (const name of fs.readdirSync(outDir)) {
    if (ISTTITELBILD(name)) gesichert.set(name, fs.readFileSync(path.join(outDir, name)));
  }
  return gesichert;
}

/** Titelbild zurueckschreiben und als erstes Bild registrieren. */
async function stelleTitelbildHer(gesichert, outDir, publicDir, entries) {
  const original = [...gesichert].find(([name]) => /^header\.(webp|png|jpe?g)$/i.test(name));
  if (!original) return;

  const [name, buffer] = original;
  // Das Original unveraendert zurueckschreiben — kein erneutes Kodieren.
  fs.writeFileSync(path.join(outDir, name), buffer);

  const meta = await sharp(buffer).metadata();
  await sharp(buffer)
    .resize({ width: LIMITS.thumbWidth, withoutEnlargement: true })
    .webp({ quality: 70 })
    .toFile(path.join(outDir, 'header-thumb.webp'));
  await sharp(buffer)
    .resize(CROP.width, CROP.height, { fit: 'cover', position: sharp.strategy.attention })
    .webp({ quality: CROP.quality })
    .toFile(path.join(outDir, 'header-crop.webp'));

  entries.unshift({
    type: 'image',
    src: `${publicDir}/${name}`,
    thumb: `${publicDir}/header-thumb.webp`,
    width: meta.width ?? null,
    height: meta.height ?? null,
  });
}

// ──────────────────────────────────────────────────────────── Ablauf ──

async function importProject(project) {
  const publicDir = `/media/${project.category}/${project.slug}`;
  const outDir = path.join(OUT_DIR, project.category, project.slug);
  const titelbild = sichereTitelbild(outDir);
  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(outDir, { recursive: true });

  const entries = [];

  for (const source of project.sources) {
    const files = listFiles(source.dir, source);
    let index = 0;

    for (const file of files) {
      index += 1;
      const stem = path.basename(file, path.extname(file));
      const baseName = source.prefix ? `${source.prefix}-${pad(index)}` : slugify(stem);
      const kind = kindOf(file, source.kind);

      try {
        if (kind === 'image') await handleImage(file, outDir, publicDir, baseName, entries);
        else if (kind === 'video') await handleVideo(file, outDir, publicDir, baseName, entries);
        else if (kind === 'pdf')
          await handlePdf(file, outDir, publicDir, baseName, entries, source);
        else
          skipped.push({
            reason: 'Dateityp nicht web-tauglich',
            file: path.relative(SOURCE_ROOT, file).replace(/\\/g, '/'),
          });
      } catch (err) {
        skipped.push({
          reason: `Fehler: ${err.message}`,
          file: path.relative(SOURCE_ROOT, file).replace(/\\/g, '/'),
        });
      }
    }
  }

  await stelleTitelbildHer(titelbild, outDir, publicDir, entries);

  media[project.category] ??= {};
  media[project.category][project.slug] = {
    images: entries.filter((e) => e.type === 'image'),
    videos: entries.filter((e) => e.type === 'video'),
    docs: entries.filter((e) => e.type === 'doc'),
  };

  const m = media[project.category][project.slug];
  console.log(
    `  ${project.category}/${project.slug}: ${m.images.length} Bilder, ${m.videos.length} Videos, ${m.docs.length} Downloads`,
  );
}

function writeReport() {
  const grouped = new Map();
  for (const s of skipped) {
    const key = s.hint ?? s.reason.replace(/\(.*\)/, '').trim();
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(s);
  }

  const lines = [
    '# Asset-Report',
    '',
    `Erzeugt am ${new Date().toLocaleDateString('de-DE')} von \`npm run import\`.`,
    '',
    '## Uebernommen',
    '',
    '| Kategorie | Projekt | Bilder | Videos | Downloads |',
    '| --- | --- | ---: | ---: | ---: |',
  ];

  for (const [cat, projs] of Object.entries(media)) {
    for (const [slug, m] of Object.entries(projs)) {
      lines.push(
        `| ${cat} | ${slug} | ${m.images.length} | ${m.videos.length} | ${m.docs.length} |`,
      );
    }
  }

  lines.push('', '## Nicht uebernommen', '');
  if (skipped.length === 0) {
    lines.push('Nichts uebersprungen.');
  } else {
    for (const [key, items] of grouped) {
      lines.push(`### ${key} (${items.length})`, '');
      for (const s of items) lines.push(`- \`${s.file}\` — ${s.reason}`);
      lines.push('');
    }
    lines.push(
      '### Grosse Videos komprimieren',
      '',
      'ffmpeg ist auf diesem Rechner nicht installiert. Nach `winget install Gyan.FFmpeg`',
      'bringt dieser Befehl ein Video auf web-taugliche Groesse (1080p, ~2 Mbit/s):',
      '',
      '```bash',
      'ffmpeg -i "EINGABE.mov" -vf "scale=-2:1080" -c:v libx264 -crf 26 \\',
      '  -preset slow -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 128k "AUSGABE.mp4"',
      '```',
      '',
      'Danach die fertige mp4 in den passenden Ordner unter `public/media/<kategorie>/<projekt>/`',
      'legen und im Projekt in `src/data/<kategorie>.js` eintragen:',
      '',
      '```js',
      "extraVideos: ['/media/uni/rreth/water.mp4'],",
      '```',
      '',
    );
  }

  fs.writeFileSync(REPORT_FILE, lines.join('\n'), 'utf8');
}

async function main() {
  const selected = projects.filter((p) => {
    if (!onlyArg) return true;
    return onlyArg.includes('/') ? `${p.category}/${p.slug}` === onlyArg : p.category === onlyArg;
  });

  if (selected.length === 0) {
    console.error(`Kein Projekt passt zu --only=${onlyArg}`);
    process.exit(1);
  }

  console.log(`Importiere ${selected.length} Projekte aus ${SOURCE_ROOT}\n`);
  for (const project of selected) await importProject(project);

  // Bei Teil-Importen die bestehende media.json ergaenzen statt ersetzen.
  if (onlyArg && fs.existsSync(DATA_FILE)) {
    const previous = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    for (const [cat, projs] of Object.entries(previous)) {
      media[cat] = { ...projs, ...(media[cat] ?? {}) };
    }
  }

  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(media, null, 2), 'utf8');
  writeReport();

  console.log(`\nFertig. ${skipped.length} Dateien uebersprungen — Details in ASSETS-REPORT.md`);
}

main();
