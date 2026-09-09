/**
 * Erzeugt den Launcher-Boot-Screen: eine kleine, gepixelte Animation in
 * echter Nokia-3310-Displayaufloesung (84 x 48), nur mit den zwei
 * Website-Farben. Zeigt vier "Signalbalken", die sich fuellen und wieder
 * leeren — eine Anspielung auf den Verbindungsaufbau alter Handys.
 *
 * Aufruf: npm run launcher-gif
 * Ergebnis: public/launcher/boot.gif
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import gifenc from 'gifenc';
const { GIFEncoder, quantize, applyPalette } = gifenc;

const ROOT = path.dirname(fileURLToPath(import.meta.url)) + '/..';
const OUT = path.join(ROOT, 'public', 'launcher', 'boot.gif');

const W = 84;
const H = 48;
const SECONDARY = [0x1c, 0x1c, 0x1e];
const PRIMARY = [0x7d, 0x7d, 0x7d];

function makeFrame(litBars) {
  const rgba = new Uint8Array(W * H * 4);
  for (let i = 0; i < W * H; i++) {
    rgba[i * 4] = SECONDARY[0];
    rgba[i * 4 + 1] = SECONDARY[1];
    rgba[i * 4 + 2] = SECONDARY[2];
    rgba[i * 4 + 3] = 255;
  }

  const setPx = (x, y, color) => {
    if (x < 0 || x >= W || y < 0 || y >= H) return;
    const i = (y * W + x) * 4;
    rgba[i] = color[0];
    rgba[i + 1] = color[1];
    rgba[i + 2] = color[2];
    rgba[i + 3] = 255;
  };
  const rect = (x, y, w, h, color) => {
    for (let yy = y; yy < y + h; yy++) for (let xx = x; xx < x + w; xx++) setPx(xx, yy, color);
  };

  // Displayrahmen: ein Pixel Rand.
  rect(0, 0, W, 1, PRIMARY);
  rect(0, H - 1, W, 1, PRIMARY);
  rect(0, 0, 1, H, PRIMARY);
  rect(W - 1, 0, 1, H, PRIMARY);

  // Vier Signalbalken, steigend, unten links.
  const barW = 5;
  const gap = 3;
  const baseY = H - 8;
  const heights = [6, 12, 18, 24];
  for (let b = 0; b < 4; b++) {
    const x = 10 + b * (barW + gap);
    const h = heights[b];
    const on = b < litBars;
    rect(x, baseY - h, barW, h, on ? PRIMARY : SECONDARY);
    // Umriss, damit unbeleuchtete Balken trotzdem sichtbar sind.
    if (!on) {
      rect(x, baseY - h, barW, 1, PRIMARY);
      rect(x, baseY - 1, barW, 1, PRIMARY);
      rect(x, baseY - h, 1, h, PRIMARY);
      rect(x + barW - 1, baseY - h, 1, h, PRIMARY);
    }
  }

  return rgba;
}

const sequence = [0, 1, 2, 3, 4, 4, 3, 2, 1, 0, 0, 0];
const gif = GIFEncoder();

for (const litBars of sequence) {
  const rgba = makeFrame(litBars);
  const palette = quantize(rgba, 8);
  const index = applyPalette(rgba, palette);
  gif.writeFrame(index, W, H, { palette, delay: 150 });
}

gif.finish();

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, gif.bytes());
console.log(`Launcher-GIF geschrieben: ${path.relative(ROOT, OUT)} (${gif.bytes().length} Bytes)`);
