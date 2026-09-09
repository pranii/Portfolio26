/**
 * Sanity-Check vor dem Veroeffentlichen:
 *   - hat jedes Projekt aus den Datendateien auch Medien?
 *   - existiert jede in media.json genannte Datei wirklich?
 *   - gibt es Medienordner, die in keiner Datendatei auftauchen?
 *
 *   node scripts/check-content.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { groupIntoChapters } from '../src/scripts/lib/chapters.js';

const ROOT = path.resolve(import.meta.dirname, '..');
const media = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/media.json'), 'utf8'));

const problems = [];
const notes = [];
let fileCount = 0;

for (const categorySlug of ['arbeit', 'freizeit', 'uni']) {
  const { projects, category } = await import(`../src/data/${categorySlug}.js`);

  if (category.slug !== categorySlug) {
    problems.push(
      `${categorySlug}.js: category.slug ist "${category.slug}", erwartet "${categorySlug}"`,
    );
  }

  const known = new Set(projects.map((p) => p.slug));
  const imported = new Set(Object.keys(media[categorySlug] ?? {}));

  for (const project of projects) {
    const entry = media[categorySlug]?.[project.slug];
    if (!entry) {
      problems.push(`${categorySlug}/${project.slug}: keine Medien importiert`);
      continue;
    }

    const total = entry.images.length + entry.videos.length;
    if (total === 0) problems.push(`${categorySlug}/${project.slug}: weder Bilder noch Videos`);

    // Kapitel pruefen: leere Kapitel und nicht zugeordnete Dateien.
    if (!project.chapters?.length) {
      problems.push(`${categorySlug}/${project.slug}: keine Kapitel definiert`);
    } else {
      const chapters = groupIntoChapters(project, entry);
      for (const chapter of chapters) {
        if (chapter.isLeftover) {
          const names = chapter.items.map((i) => i.src.split('/').pop()).join(', ');
          notes.push(
            `${categorySlug}/${project.slug}: ${chapter.items.length} Dateien in keinem Kapitel — ${names}`,
          );
        } else if (chapter.platzhalter) {
          // Kapitel haelt bewusst Platz fuer eine oder mehrere Dateien frei, die noch fehlen.
          const dateien = Array.isArray(chapter.platzhalter)
            ? chapter.platzhalter
            : [chapter.platzhalter];
          for (const eintrag of dateien) {
            const datei = eintrag.replace(/^\//, '');
            if (fs.existsSync(path.join(ROOT, 'public', datei))) {
              notes.push(
                `${categorySlug}/${project.slug}: "${chapter.title}" — ${datei} liegt jetzt vor. ` +
                  'Du kannst `platzhalter` entfernen und die Datei ueber `files` einbinden.',
              );
            } else {
              notes.push(
                `${categorySlug}/${project.slug}: "${chapter.title}" wartet noch auf ${datei}`,
              );
            }
          }
        } else if (chapter.textOnly) {
          // Kapitel bewusst ohne Medien — nur Text.
        } else if (chapter.items.length === 0 && chapter.docs.length === 0) {
          problems.push(
            `${categorySlug}/${project.slug}: Kapitel "${chapter.title}" bleibt leer, kein Treffer fuer ${JSON.stringify(chapter.files ?? [])}`,
          );
        }
        if (!chapter.isLeftover && !chapter.text?.trim()) {
          problems.push(
            `${categorySlug}/${project.slug}: Kapitel "${chapter.title}" hat keinen Text`,
          );
        }
      }
    }

    for (const item of [...entry.images, ...entry.videos, ...entry.docs]) {
      for (const key of ['src', 'thumb']) {
        const rel = item[key];
        if (!rel) continue;
        fileCount += 1;
        if (!fs.existsSync(path.join(ROOT, 'public', rel))) {
          problems.push(`${categorySlug}/${project.slug}: Datei fehlt — ${rel}`);
        }
      }
    }
  }

  for (const slug of imported) {
    if (!known.has(slug)) {
      problems.push(`${categorySlug}: "${slug}" wurde importiert, steht aber in keiner Datendatei`);
    }
  }
}

// Jedes [data-slot="x"], das ein Skript befuellen will, muss im HTML stehen —
// sonst laeuft die Seite auf einen null-Zugriff.
const PAGE_SCRIPTS = {
  'index.html': ['src/scripts/main.js'],
  'arbeit.html': ['src/scripts/category.js'],
  'freizeit.html': ['src/scripts/category.js'],
  'uni.html': ['src/scripts/category.js'],
};

for (const [page, scripts] of Object.entries(PAGE_SCRIPTS)) {
  const html = fs.readFileSync(path.join(ROOT, page), 'utf8');
  const present = new Set([...html.matchAll(/data-slot="([^"]+)"/g)].map((m) => m[1]));

  for (const script of scripts) {
    const code = fs.readFileSync(path.join(ROOT, script), 'utf8');
    const wanted = new Set([...code.matchAll(/\[data-slot="([^"]+)"\]/g)].map((m) => m[1]));

    for (const slot of wanted) {
      if (!present.has(slot))
        problems.push(`${page}: data-slot="${slot}" fehlt, ${script} greift darauf zu`);
    }
  }
}

console.log(`${fileCount} Mediendateien geprueft.`);

if (notes.length > 0) {
  console.log(`\nHinweise (${notes.length}) — landen auf der Seite unter "Weiteres Material":`);
  notes.forEach((n) => console.log('  · ' + n));
}

if (problems.length === 0) {
  console.log('\nKeine Fehler.');
} else {
  console.log(`\n${problems.length} Punkte:`);
  problems.forEach((p) => console.log('  - ' + p));
  process.exitCode = 1;
}
