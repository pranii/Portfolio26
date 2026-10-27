/**
 * Bereitet Caras Zine-Seiten fuer den Automaten in der Projektseite auf.
 *
 * Quelle ist der Ordner, den der Automat auf dem Raspberry Pi benutzt hat:
 * zu jedem Zeichen zwei Seiten (Illustration und Affirmation), dazu Umschlag
 * vorne und hinten und die Faltanleitung. Alle Seiten sind 620 x 874 Pixel
 * mit durchsichtigem Hintergrund — ein Achtel A4, stehend.
 *
 * Das Skript macht daraus verlustfreies WebP (kleiner als PNG und bei
 * Strichzeichnungen ohne sichtbaren Unterschied) und benennt die Dateien
 * einheitlich um, weil im Original ein paar Namen aus der Reihe fallen
 * ("Hawthorn__CelticAffirmation", "Ivy_CelticAffirmation1").
 *
 * Aufruf:  node scripts/make-zodizine-seiten.mjs
 *          ZODIZINE_QUELLE="D:/woauchimmer/ZodiZine" node scripts/make-zodizine-seiten.mjs
 *
 * Ergebnis: public/zodizine/{front,back}.webp
 *           public/zodizine/<system>/<zeichen>-{illustration,affirmation}.webp
 *           public/zodizine/faltanleitung.pdf
 */

import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const QUELLE = process.env.ZODIZINE_QUELLE ?? 'C:/Users/prejni/Desktop/ZodiZine';
const ZIEL = path.resolve(import.meta.dirname, '..', 'public', 'zodizine');

/** Ordner im Quellverzeichnis und die Zeichen darin, in der Reihenfolge der Datendatei. */
const SYSTEME = {
  chinesisch: {
    ordner: 'ChineseSigns_Transparent',
    kennung: 'Chinese',
    zeichen: [
      'Rat',
      'Ox',
      'Tiger',
      'Rabbit',
      'Dragon',
      'Snake',
      'Horse',
      'Goat',
      'Monkey',
      'Rooster',
      'Dog',
      'Pig',
    ],
  },
  indisch: {
    ordner: 'IndianSigns_Transparent',
    kennung: 'Indian',
    zeichen: [
      'Aries',
      'Taurus',
      'Gemini',
      'Cancer',
      'Leo',
      'Virgo',
      'Libra',
      'Scorpio',
      'Sagittarius',
      'Capricorn',
      'Aquarius',
      'Pisces',
    ],
  },
  keltisch: {
    ordner: 'CelticSigns_Transparent',
    kennung: 'Celtic',
    zeichen: [
      'Birch',
      'Rowan',
      'Ash',
      'Alder',
      'Willow',
      'Hawthorn',
      'Oak',
      'Holly',
      'Hazel',
      'Vine',
      'Ivy',
      'Reed',
      'Elder',
    ],
  },
};

if (!fs.existsSync(QUELLE)) {
  console.error(`Quellordner nicht gefunden: ${QUELLE}`);
  console.error('Entpacke das ZodiZine-Archiv dorthin oder setze ZODIZINE_QUELLE.');
  process.exit(1);
}

/** Sucht eine Datei tolerant: Unterstriche und angehaengte Ziffern sind egal. */
function finde(ordner, zeichen, kennung, art) {
  const muster = new RegExp(`^${zeichen}_+${kennung}${art}\\d*\\.png$`, 'i');
  const treffer = fs.readdirSync(ordner).find((datei) => muster.test(datei));
  return treffer ? path.join(ordner, treffer) : null;
}

async function alsWebp(quelle, ziel) {
  fs.mkdirSync(path.dirname(ziel), { recursive: true });
  await sharp(quelle).webp({ lossless: true, effort: 6 }).toFile(ziel);
  return fs.statSync(ziel).size;
}

let gesamt = 0;
let anzahl = 0;
const fehlt = [];

for (const [system, { ordner, kennung, zeichen }] of Object.entries(SYSTEME)) {
  const quellordner = path.join(QUELLE, ordner);
  for (const name of zeichen) {
    for (const art of ['Illustration', 'Affirmation']) {
      const quelle = finde(quellordner, name, kennung, art);
      if (!quelle) {
        fehlt.push(`${system}/${name} ${art}`);
        continue;
      }
      const ziel = path.join(ZIEL, system, `${name.toLowerCase()}-${art.toLowerCase()}.webp`);
      gesamt += await alsWebp(quelle, ziel);
      anzahl += 1;
    }
  }
}

for (const [datei, name] of [
  ['ZodiZine_front.png', 'front.webp'],
  ['ZodiZine_back.png', 'back.webp'],
]) {
  const quelle = path.join(QUELLE, datei);
  if (!fs.existsSync(quelle)) {
    fehlt.push(datei);
    continue;
  }
  gesamt += await alsWebp(quelle, path.join(ZIEL, name));
  anzahl += 1;
}

const anleitung = path.join(QUELLE, 'ZodiZine_FoldingGuide.pdf');
if (fs.existsSync(anleitung)) {
  fs.copyFileSync(anleitung, path.join(ZIEL, 'faltanleitung.pdf'));
} else {
  fehlt.push('ZodiZine_FoldingGuide.pdf');
}

console.log(`${anzahl} Seiten umgewandelt, zusammen ${(gesamt / 1024 / 1024).toFixed(1)} MB.`);
if (fehlt.length > 0) {
  console.log(`\n${fehlt.length} Dateien fehlen in der Quelle:`);
  fehlt.forEach((f) => console.log('  - ' + f));
  process.exitCode = 1;
}
