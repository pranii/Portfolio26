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
import { groupIntoChapters, findeNichtZugeordnet } from '../src/scripts/lib/chapters.js';

const ROOT = path.resolve(import.meta.dirname, '..');
const media = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/media.json'), 'utf8'));

const problems = [];
const notes = [];
let fileCount = 0;

// media.json ist nach den Medienordnern (arbeit, freizeit, uni) sortiert,
// die Bereiche der Seite sind andere. Gesucht wird deshalb ueber den Slug.
const mediaBySlug = Object.assign({}, ...Object.values(media));

/**
 * Gibt es die Datei — und zwar genau so geschrieben?
 *
 * Windows unterscheidet Gross- und Kleinschreibung nicht, der Server bei
 * GitHub Pages schon. Ohne diese Pruefung faellt ein falsch geschriebener
 * Name hier nicht auf und laesst spaeter den Deploy scheitern.
 */
const ordnerInhalt = new Map();
function dateienIn(ordner) {
  if (!ordnerInhalt.has(ordner)) {
    ordnerInhalt.set(ordner, fs.existsSync(ordner) ? new Set(fs.readdirSync(ordner)) : new Set());
  }
  return ordnerInhalt.get(ordner);
}

function dateiDa(rel) {
  const voll = path.join(ROOT, 'public', rel);
  return dateienIn(path.dirname(voll)).has(path.basename(voll));
}

/** Dieselbe Datei mit anderer Schreibweise, falls es sie gibt. */
function andereSchreibweise(rel) {
  const voll = path.join(ROOT, 'public', rel);
  const gesucht = path.basename(voll).toLowerCase();
  for (const name of dateienIn(path.dirname(voll))) {
    if (name.toLowerCase() === gesucht) return name;
  }
  return null;
}
const known = new Set();

for (const categorySlug of ['creative-technology', 'film', 'game', 'kommunikationsdesign']) {
  const { projects, category } = await import(`../src/data/${categorySlug}.js`);

  if (category.slug !== categorySlug) {
    problems.push(
      `${categorySlug}.js: category.slug ist "${category.slug}", erwartet "${categorySlug}"`,
    );
  }

  for (const project of projects) {
    if (known.has(project.slug)) {
      problems.push(`${categorySlug}/${project.slug}: Slug kommt in mehreren Bereichen vor`);
    }
    known.add(project.slug);

    // Ein Projekt, das nur aus Text und eingebetteten Videos besteht, braucht
    // keine eigenen Medien — etwa wenn der Film bei Vimeo oder YouTube liegt.
    const nurEingebettet = (project.chapters ?? []).every(
      (chapter) => chapter.textOnly || chapter.embed !== undefined,
    );

    // `medien` zeigt auf ein anderes Projekt: Dieselbe Arbeit kann in
    // zwei Bereichen stehen, ohne die Dateien zu verdoppeln.
    const entry = mediaBySlug[project.medien ?? project.slug];
    if (!entry) {
      if (!nurEingebettet) {
        problems.push(`${categorySlug}/${project.slug}: keine Medien importiert`);
      } else {
        notes.push(`${categorySlug}/${project.slug}: ohne eigene Medien, zeigt nur Eingebettetes`);
      }
      continue;
    }

    const total = entry.images.length + entry.videos.length;
    if (total === 0 && !nurEingebettet) {
      problems.push(`${categorySlug}/${project.slug}: weder Bilder noch Videos`);
    }

    // Kapitel pruefen: leere Kapitel und nicht zugeordnete Dateien.
    if (!project.chapters?.length) {
      problems.push(`${categorySlug}/${project.slug}: keine Kapitel definiert`);
    } else {
      const chapters = groupIntoChapters(project, entry);

      // Nicht zugeordnete Dateien erscheinen nicht auf der Seite. Damit sie
      // nicht unbemerkt verschwinden, werden sie hier aufgelistet.
      const uebrig = findeNichtZugeordnet(project, entry);
      if (uebrig.length > 0) {
        const namen = uebrig.map((i) => i.src.split('/').pop()).join(', ');
        notes.push(
          `${categorySlug}/${project.slug}: ${uebrig.length} Dateien werden nicht gezeigt ` +
            `(in keinem Kapitel) — ${namen}`,
        );
      }

      for (const chapter of chapters) {
        if (chapter.platzhalter) {
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
        } else if (
          chapter.textOnly ||
          chapter.embed !== undefined ||
          chapter.aufbau ||
          chapter.prototypHier
        ) {
          // Kapitel bewusst ohne Medien: nur Text, eingebettetes Video,
          // reservierter Platz dafuer (embed: ''), eine Aufbauskizze oder
          // der Prototyp, den das Kapitel zu sich holt.
        } else if (chapter.items.length === 0 && chapter.docs.length === 0) {
          problems.push(
            `${categorySlug}/${project.slug}: Kapitel "${chapter.title}" bleibt leer, kein Treffer fuer ${JSON.stringify(chapter.files ?? [])}`,
          );
        }
        // Ein Kapitel darf ohne Text auskommen, wenn Bilder oder ein Video
        // fuer sich sprechen. Ohne beides bliebe nur die Ueberschrift.
        const zeigtMedien =
          chapter.items.length > 0 ||
          chapter.docs.length > 0 ||
          chapter.embed ||
          chapter.platzhalter;
        if (!chapter.text?.trim() && !zeigtMedien) {
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
        if (!dateiDa(rel)) {
          const anders = andereSchreibweise(rel);
          problems.push(
            anders
              ? `${categorySlug}/${project.slug}: Schreibweise — ${rel} heisst auf der Platte ${anders}`
              : `${categorySlug}/${project.slug}: Datei fehlt — ${rel}`,
          );
        }
      }
    }
  }
}

for (const [ordner, projekte] of Object.entries(media)) {
  for (const slug of Object.keys(projekte)) {
    if (!known.has(slug)) {
      problems.push(`${ordner}: "${slug}" wurde importiert, steht aber in keiner Datendatei`);
    }
  }
}

// Die Zine-Seiten des ZodiZine-Automaten liegen nicht in media.json, sondern
// kommen aus scripts/make-zodizine-seiten.mjs. Fehlt eine, bleibt im
// Prototypen ein Blatt leer — deshalb hier mitpruefen.
{
  const { chinesisch, indisch, keltisch } = await import('../src/data/zodizine.js');
  const seiten = ['front.webp', 'back.webp'];
  for (const [system, zeichen] of Object.entries({
    chinesisch,
    indisch,
    keltisch,
  })) {
    for (const eintrag of zeichen) {
      seiten.push(
        `${system}/${eintrag.datei}-illustration.webp`,
        `${system}/${eintrag.datei}-affirmation.webp`,
      );
    }
  }

  for (const seite of seiten) {
    fileCount += 1;
    if (!fs.existsSync(path.join(ROOT, 'public', 'zodizine', seite))) {
      problems.push(`zodizine: Zine-Seite fehlt — public/zodizine/${seite}`);
    }
  }
}

// Jedes [data-slot="x"], das ein Skript befuellen will, muss im HTML stehen —
// sonst laeuft die Seite auf einen null-Zugriff.
const PAGE_SCRIPTS = {
  'index.html': ['src/scripts/main.js'],
  'creative-technology.html': ['src/scripts/category.js'],
  'film.html': ['src/scripts/category.js'],
  'game.html': ['src/scripts/category.js'],
  'kommunikationsdesign.html': ['src/scripts/category.js'],
  'ueber.html': ['src/scripts/ueber.js'],
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
