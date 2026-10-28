/**
 * Holt uMakeItGram aus dem Angular-Projekt in die Portfolio-Seite.
 *
 * Das Spiel ist 2023 in Furtwangen als Angular-Anwendung entstanden. Fuer die
 * Projektseite wird daraus nur das, was das Spiel ausmacht: die Story und die
 * Bilder. Die Story steckt im Original in einer TypeScript-Datei als Map von
 * Schrittnummer auf Aktion — dieses Skript rechnet sie in JSON um und legt
 * die Bilder als WebP ab. Den Spielablauf selbst uebernimmt danach
 * src/scripts/lib/umakeitgram.js, in der Sprache der uebrigen Seite.
 *
 * Aufruf:  node scripts/import-umakeitgram.mjs
 *          UMAKEITGRAM_QUELLE="D:/woauchimmer" node scripts/import-umakeitgram.mjs
 *
 * Ergebnis: public/umakeitgram/*.webp
 *           src/data/umakeitgram.json
 */

import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { transform } from 'esbuild';

const QUELLE = process.env.UMAKEITGRAM_QUELLE ?? 'C:/Users/prejni/Documents/GitHub/uMakeItGram';
const STORY = path.join(QUELLE, 'src', 'app', 'model', 'text.ts');
const BILDER = path.join(QUELLE, 'dist', 'u-make-it-gran', 'assets', 'pic');
const ZIEL = path.resolve(import.meta.dirname, '..', 'public', 'umakeitgram');
const DATEN = path.resolve(import.meta.dirname, '..', 'src', 'data', 'umakeitgram.json');

/** Die Bilder sind Bildschirmfotos — 1100 Pixel reichen im Fenster vollauf. */
const BREITE = 1100;
const QUALITAET = 76;

/** Aus "../../assets/pic/fi/Rdesktop.png" wird "fi/Rdesktop.png". */
function bildpfad(roh) {
  return String(roh)
    .replace(/^[./]*assets\/pic\//, '')
    .replace(/^\/+/, '');
}

/** Aus "fi/Rdesktop.png" wird "fi-rdesktop" — ein Dateiname ohne Ordner. */
function kennung(pfad) {
  return pfad
    .replace(/\.[a-z]+$/i, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/** Liest die TypeScript-Datei des Originals und gibt ihre Daten zurueck. */
async function leseStory() {
  const quelltext = fs
    .readFileSync(STORY, 'utf8')
    // Die Umgebung des Angular-Projekts gibt es hier nicht — ihr einziger
    // Wert ist der Bilderordner.
    .replace(/^import .*environment.*$/m, 'const environment = { assetUrl: "assets/pic" };');

  const { code } = await transform(quelltext, { loader: 'ts', format: 'esm' });
  const datei = path.join(ZIEL, '.story.mjs');
  fs.mkdirSync(ZIEL, { recursive: true });
  fs.writeFileSync(datei, code);
  const modul = await import(`file://${datei}?${Date.now()}`);
  fs.unlinkSync(datei);
  return modul;
}

/**
 * Rechnet die Map des Originals in eine schlichte Tabelle um:
 * Schrittnummer -> { bild, text, weiter } oder { bild, text, wahl: [...] }.
 */
function schritte(karte) {
  const tabelle = {};
  const gebraucht = new Set();

  for (const [nummer, aktion] of karte) {
    const bild = bildpfad(aktion.image);
    gebraucht.add(bild);

    const schritt = { bild: kennung(bild), text: aktion.text ?? '' };

    if (Array.isArray(aktion.decision)) {
      schritt.wahl = aktion.decision.map((zeile) => ({
        text: zeile.text,
        weiter: zeile.nextStep,
        wert: zeile.barValue,
      }));
    } else {
      schritt.weiter = aktion.nextStep;
      // "popup" blendet im Original einen Kasten ueber das Bild.
      if (aktion.type === 'popup') schritt.kasten = true;
    }

    tabelle[nummer] = schritt;
  }

  return { tabelle, gebraucht };
}

/** Wandelt ein Bild in WebP um und meldet, wie gross es geworden ist. */
async function wandle(relativ) {
  const quelle = path.join(BILDER, relativ);
  if (!fs.existsSync(quelle)) {
    console.warn(`  fehlt: ${relativ}`);
    return 0;
  }

  const ziel = path.join(ZIEL, `${kennung(relativ)}.webp`);
  const bild = sharp(quelle).resize({
    width: BREITE,
    height: BREITE,
    fit: 'inside',
    withoutEnlargement: true,
  });
  const { size } = await bild.webp({ quality: QUALITAET }).toFile(ziel);
  return size;
}

async function main() {
  const modul = await leseStory();
  const { tabelle, gebraucht } = schritte(modul.path_fashion);

  // Die drei Schlussbilder haengen nicht an einem Schritt, sondern am Ende.
  const enden = modul.ending_src.map(bildpfad);
  enden.forEach((bild) => gebraucht.add(bild));

  // Das Startbild, bevor der erste Schritt laeuft.
  const start = 'StartButton.png';
  gebraucht.add(start);

  console.log(`${Object.keys(tabelle).length} Schritte, ${gebraucht.size} Bilder`);

  fs.mkdirSync(ZIEL, { recursive: true });
  let summe = 0;
  for (const bild of [...gebraucht].sort()) summe += await wandle(bild);
  console.log(`  ${(summe / 1024 / 1024).toFixed(1)} MB WebP`);

  const daten = {
    // Werte aus dem Original: der Balken startet bei 60 von 100, ab 50 geht
    // die Geschichte schlecht aus.
    start: modul.lifeStartValue,
    hoechstwert: modul.lifeMaxBarValue,
    schwelle: modul.badEndingValue,
    startbild: kennung(start),
    enden: { gut: kennung(enden[0]), schlecht: kennung(enden[1]), schluss: kennung(enden[2]) },
    schritte: tabelle,
  };

  fs.writeFileSync(DATEN, JSON.stringify(daten, null, 2) + '\n');
  console.log(`  ${path.relative(process.cwd(), DATEN)}`);
}

main();
