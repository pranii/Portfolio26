/**
 * Schreibt alle Texte der Seite in ein Word-Dokument zum Bearbeiten.
 *
 *   node scripts/texte-export.mjs
 *   -> Portfolio-Texte.docx im Projektordner
 *
 * Jeder Text steht in einer Tabelle: links der Schluessel, rechts der
 * Text. Der Schluessel sagt, wo der Text im Code liegt — damit laesst
 * sich das bearbeitete Dokument spaeter wieder einlesen
 * (scripts/texte-import.mjs).
 */

import fs from 'node:fs';
import path from 'node:path';
import {
  AlignmentType,
  Document,
  Footer,
  HeadingLevel,
  PageNumber,
  Packer,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from 'docx';

const ROOT = path.resolve(import.meta.dirname, '..');
const ZIEL = path.join(ROOT, 'Portfolio-Texte.docx');

const BEREICHE = ['creative-technology', 'film', 'game', 'kommunikationsdesign'];
const SPALTEN = [2500, 7138]; // zusammen 9638 DXA = Satzspiegel auf A4

// ── Bausteine ──────────────────────────────────────────────────────────

const absatz = (text, optionen = {}) =>
  new Paragraph({ children: [new TextRun({ text, ...optionen.run })], ...optionen.absatz });

const ueberschrift = (text, stufe) =>
  new Paragraph({ text, heading: stufe, spacing: { before: 320, after: 140 } });

function zelle(kinder, breite, grau = false) {
  return new TableCell({
    width: { size: breite, type: WidthType.DXA },
    shading: grau ? { type: ShadingType.CLEAR, fill: 'F2F2F2' } : undefined,
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    children: kinder,
  });
}

/** Eine Zeile: Schluessel links, Text rechts. */
function zeile(schluessel, text) {
  return new TableRow({
    children: [
      zelle(
        [absatz(schluessel, { run: { size: 16, font: 'Consolas', color: '666666' } })],
        SPALTEN[0],
        true,
      ),
      zelle(
        String(text)
          .split('\n')
          .map((teil) => absatz(teil, { run: { size: 21 } })),
        SPALTEN[1],
      ),
    ],
  });
}

function tabelle(zeilen) {
  return new Table({
    columnWidths: SPALTEN,
    width: { size: SPALTEN[0] + SPALTEN[1], type: WidthType.DXA },
    rows: zeilen,
  });
}

// ── Texte einsammeln ───────────────────────────────────────────────────

/** Sammelt die Felder eines Projekts in der Reihenfolge, in der sie auf der Seite stehen. */
function projektZeilen(projekt) {
  const zeilen = [];
  const nimm = (feld, wert) => {
    if (typeof wert === 'string' && wert.trim()) zeilen.push(zeile(feld, wert));
  };

  nimm('title', projekt.title);
  nimm('subtitle', projekt.subtitle);
  nimm('year', projekt.year);
  nimm('role', projekt.role);
  nimm('client', projekt.client);
  nimm('description', projekt.description);
  nimm('pull', projekt.pull);

  (projekt.chapters ?? []).forEach((kapitel, i) => {
    nimm(`chapters[${i}].title`, kapitel.title);
    nimm(`chapters[${i}].text`, kapitel.text);
  });

  return zeilen;
}

const kinder = [];

kinder.push(
  new Paragraph({ text: 'Portfolio — alle Texte', heading: HeadingLevel.TITLE }),
  absatz(
    'Bitte nur die rechte Spalte ändern. Die linke Spalte sagt, wo der Text im Code steht — ' +
      'ohne sie lässt sich das Dokument nicht wieder einlesen. Zeilen, die leer bleiben ' +
      'sollen, einfach leeren; gelöschte Zeilen werden beim Einlesen übersprungen.',
    { run: { size: 20 }, absatz: { spacing: { after: 160 } } },
  ),
  absatz(
    'Zurückgeben: Datei speichern und mir sagen, wo sie liegt — ich schreibe die Änderungen ' +
      'dann in die Datendateien zurück.',
    { run: { size: 20, italics: true }, absatz: { spacing: { after: 320 } } },
  ),
);

// Allgemeines aus site.js
const { site } = await import(`file:///${path.join(ROOT, 'src/data/site.js').replace(/\\/g, '/')}`);
kinder.push(ueberschrift('Allgemein', HeadingLevel.HEADING_1));
kinder.push(absatz('src/data/site.js', { run: { size: 18, font: 'Consolas', color: '888888' } }));
kinder.push(
  tabelle([
    zeile('site.name', site.name),
    zeile('site.role', site.role),
    zeile('site.intro', site.intro),
    zeile('site.ueber.rolle', site.ueber.rolle),
    zeile('site.ueber.text', site.ueber.text),
    ...site.ueber.vorgehen.flatMap((schritt, i) => [
      zeile(`site.ueber.vorgehen[${i}].title`, schritt.title),
      zeile(`site.ueber.vorgehen[${i}].text`, schritt.text),
    ]),
  ]),
);

// Die vier Bereiche
for (const bereich of BEREICHE) {
  const datei = `src/data/${bereich}.js`;
  const { category, projects } = await import(
    `file:///${path.join(ROOT, datei).replace(/\\/g, '/')}`
  );

  kinder.push(ueberschrift(category.title, HeadingLevel.HEADING_1));
  kinder.push(absatz(datei, { run: { size: 18, font: 'Consolas', color: '888888' } }));
  kinder.push(
    tabelle([
      zeile('category.title', category.title),
      zeile('category.lead', category.lead),
      ...(category.vorgehen ?? []).flatMap((schritt, i) => [
        zeile(`category.vorgehen[${i}].title`, schritt.title),
        zeile(`category.vorgehen[${i}].text`, schritt.text),
      ]),
    ]),
  );

  for (const projekt of projects) {
    kinder.push(ueberschrift(projekt.title, HeadingLevel.HEADING_2));
    kinder.push(
      absatz(`${datei}  ·  slug: ${projekt.slug}`, {
        run: { size: 18, font: 'Consolas', color: '888888' },
      }),
    );
    kinder.push(tabelle(projektZeilen(projekt)));
  }
}

// Die Hinweistexte unter den Prototypen stehen im Woerterbuch.
const { ui } = await import(
  `file:///${path.join(ROOT, 'src/data/i18n/ui.js').replace(/\\/g, '/')}`
);
kinder.push(ueberschrift('Hinweise unter den Prototypen', HeadingLevel.HEADING_1));
kinder.push(
  absatz('src/data/i18n/ui.js  ·  Abschnitt de', {
    run: { size: 18, font: 'Consolas', color: '888888' },
  }),
);
kinder.push(
  tabelle(
    ['prototyp.inlakech', 'prototyp.zodizine', 'prototyp.magazin'].map((schluessel) =>
      zeile(`ui.de['${schluessel}']`, ui.de[schluessel]),
    ),
  ),
);

// ── Schreiben ──────────────────────────────────────────────────────────

const dokument = new Document({
  styles: {
    default: {
      document: { run: { font: 'Calibri', size: 21 } },
    },
  },
  sections: [
    {
      properties: { page: { margin: { top: 1134, bottom: 1134, left: 1134, right: 1134 } } },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({ children: [PageNumber.CURRENT], size: 18, color: '888888' }),
              ],
            }),
          ],
        }),
      },
      children: kinder,
    },
  ],
});

fs.writeFileSync(ZIEL, await Packer.toBuffer(dokument));
const zeilenZahl = kinder.filter((k) => k instanceof Table).reduce((n, t) => n + t.root.length, 0);
console.log(`${path.relative(ROOT, ZIEL)} geschrieben — rund ${zeilenZahl} Textfelder.`);
