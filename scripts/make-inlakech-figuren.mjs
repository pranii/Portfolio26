/**
 * Macht aus den Angriffs-GIFs von Taiyo und Tsuki Spritesheets fuer das
 * Browser-Spiel In Lak'ech (inlakech.html).
 *
 * Die GIFs sind Nokia-Grafik: 84 x 48 Pixel, 20-fach vergroessert. Das
 * Skript rechnet sie auf die echten Pixel zurueck, wirft den gruenen
 * Hintergrund raus (nur die dunklen Pixel bleiben) und schneidet alle
 * Bilder einer Figur auf denselben Rahmen zu, damit nichts springt.
 *
 * Aufruf:  node scripts/make-inlakech-figuren.mjs
 * Ergebnis: public/inlakech/taiyo.png, tsuki.png, figuren.json
 */

import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const QUELLE = 'D:/in-lak-ech-raspberry/Animationen';
const ZIEL = path.resolve(import.meta.dirname, '..', 'public', 'inlakech');

const FIGUREN = {
  taiyo: 'Taiyo/Taiyo1.gif.gif', // links, Spieler A
  tsuki: 'Tsuki/Tsuki1.gif.gif', // rechts, Spieler K
};

// Echte Display-Aufloesung des Nokia 3310
const NOKIA_W = 84;
const NOKIA_H = 48;
// Dunkler als das gilt als Pixel ("Tinte"), heller als Hintergrund.
const SCHWELLE = 95;

const daten = {};

for (const [name, datei] of Object.entries(FIGUREN)) {
  const quelle = path.join(QUELLE, datei);
  const meta = await sharp(quelle, { animated: true }).metadata();
  const bilder = meta.pages;

  // Jedes Bild auf 84 x 48 zurueckrechnen und als Maske (Tinte ja/nein) merken.
  const masken = [];
  for (let i = 0; i < bilder; i++) {
    const raw = await sharp(quelle, { page: i })
      .resize(NOKIA_W, NOKIA_H, { kernel: 'nearest' })
      .removeAlpha()
      .raw()
      .toBuffer();
    const maske = new Uint8Array(NOKIA_W * NOKIA_H);
    for (let p = 0; p < maske.length; p++) {
      const hell = 0.2126 * raw[p * 3] + 0.7152 * raw[p * 3 + 1] + 0.0722 * raw[p * 3 + 2];
      maske[p] = hell < SCHWELLE ? 1 : 0;
    }
    masken.push(maske);
  }

  // Gemeinsamer Rahmen ueber alle Bilder
  let x0 = NOKIA_W;
  let y0 = NOKIA_H;
  let x1 = -1;
  let y1 = -1;
  for (const maske of masken) {
    for (let y = 0; y < NOKIA_H; y++) {
      for (let x = 0; x < NOKIA_W; x++) {
        if (!maske[y * NOKIA_W + x]) continue;
        x0 = Math.min(x0, x);
        y0 = Math.min(y0, y);
        x1 = Math.max(x1, x);
        y1 = Math.max(y1, y);
      }
    }
  }
  const w = x1 - x0 + 1;
  const h = y1 - y0 + 1;

  // Spritesheet: alle Bilder nebeneinander, schwarz auf transparent.
  const sheet = Buffer.alloc(w * bilder * h * 4);
  masken.forEach((maske, i) => {
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        if (!maske[(y + y0) * NOKIA_W + (x + x0)]) continue;
        const o = (y * w * bilder + i * w + x) * 4;
        sheet[o + 3] = 255;
      }
    }
  });
  await sharp(sheet, { raw: { width: w * bilder, height: h, channels: 4 } })
    .png()
    .toFile(path.join(ZIEL, `${name}.png`));

  daten[name] = { w, h, bilder, zeiten: meta.delay };
  console.log(`${name}: ${bilder} Bilder, je ${w} x ${h} Pixel, Zeiten ${meta.delay.join(' ')} ms`);
}

fs.writeFileSync(path.join(ZIEL, 'figuren.json'), JSON.stringify(daten, null, 2) + '\n');
console.log('Fertig: public/inlakech/taiyo.png, tsuki.png, figuren.json');
