/**
 * Nimmt ein einzelnes PDF in ein Projekt auf, ohne den ganzen Import.
 *
 * Der normale Weg (scripts/import-assets.mjs) liest aus dem Ordner in
 * SOURCE_ROOT. Steht eine Datei nur hier im Repository — weil sie per
 * Hand dazugelegt wurde —, rendert dieses Skript ihre Seiten, legt sie
 * neben die uebrigen Medien des Projekts und traegt sie in media.json
 * nach. Dasselbe Format, dieselben Groessen.
 *
 * Aufruf:
 *   node scripts/import-einzeln.mjs <pdf> <slug> <praefix>
 *
 * Beispiel:
 *   node scripts/import-einzeln.mjs \
 *     public/media/uni/in-lakech/Fragenkatalog.pdf kamamuta fragenkatalog
 */

import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { pdf } from 'pdf-to-img';
import { LIMITS } from './media-manifest.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const [quelle, slug, praefix] = process.argv.slice(2);

if (!quelle || !slug || !praefix) {
  console.error('Aufruf: node scripts/import-einzeln.mjs <pdf> <slug> <praefix>');
  process.exit(1);
}

const pad = (n) => String(n).padStart(2, '0');

/** Findet heraus, wo die Medien dieses Projekts liegen. */
function zielOrdner(daten) {
  for (const [bereich, projekte] of Object.entries(daten)) {
    if (projekte[slug]) {
      const erste = projekte[slug].images[0] ?? projekte[slug].docs[0];
      const oeffentlich = path.posix.dirname(erste.src);
      return { bereich, oeffentlich, ordner: path.join(ROOT, 'public', oeffentlich) };
    }
  }
  throw new Error(`Projekt ${slug} steht nicht in media.json`);
}

/** Schreibt eine Seite als WebP, gross und als Vorschau. */
async function schreibe(puffer, basis) {
  const bild = sharp(puffer);
  const { width, height } = await bild.metadata();
  const breite = Math.min(width, LIMITS.imageMaxWidth);

  await bild
    .clone()
    .resize({ width: breite, withoutEnlargement: true })
    .webp({ quality: LIMITS.webpQuality })
    .toFile(`${basis}.webp`);

  await bild
    .clone()
    .resize({ width: LIMITS.thumbWidth, withoutEnlargement: true })
    .webp({ quality: LIMITS.webpQuality })
    .toFile(`${basis}-thumb.webp`);

  const massstab = breite / width;
  return { width: breite, height: Math.round(height * massstab) };
}

async function main() {
  const datei = path.join(ROOT, 'src', 'data', 'media.json');
  const daten = JSON.parse(fs.readFileSync(datei, 'utf8'));
  const { bereich, oeffentlich, ordner } = zielOrdner(daten);
  const projekt = daten[bereich][slug];

  // Was unter diesem Praefix schon dasteht, wird ersetzt.
  projekt.images = projekt.images.filter((i) => i.fromPdf !== praefix);
  projekt.docs = projekt.docs.filter((d) => path.basename(d.src) !== `${praefix}.pdf`);

  const neu = [];
  let seite = 0;
  const doc = await pdf(path.resolve(quelle), { scale: 2 });
  for await (const bild of doc) {
    seite += 1;
    const basis = path.join(ordner, `${praefix}-s${pad(seite)}`);
    const masse = await schreibe(bild, basis);
    neu.push({
      type: 'image',
      src: `${oeffentlich}/${praefix}-s${pad(seite)}.webp`,
      thumb: `${oeffentlich}/${praefix}-s${pad(seite)}-thumb.webp`,
      fromPdf: praefix,
      page: seite,
      ...masse,
    });
  }

  const bytes = fs.statSync(quelle).size;
  if (bytes <= LIMITS.pdfCopyBytes) {
    fs.copyFileSync(quelle, path.join(ordner, `${praefix}.pdf`));
    projekt.docs.push({
      type: 'doc',
      src: `${oeffentlich}/${praefix}.pdf`,
      label: path.basename(quelle),
      bytes,
    });
  }

  projekt.images.push(...neu);
  fs.writeFileSync(datei, JSON.stringify(daten, null, 2) + '\n');
  console.log(`${seite} Seiten nach ${oeffentlich} — media.json aktualisiert`);
}

main();
