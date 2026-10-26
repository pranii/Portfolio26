/**
 * Einstiegspunkt fuer die Startseite.
 * Zeigt Titel und Rolle, dann die Bereiche als Menuekacheln.
 */

import '../styles/main.css';
import { site, categories } from '../data/site.js';
import { initScroll, initProgressBar, gsap, prefersReducedMotion } from './lib/scroll.js';
import { revealFade } from './lib/reveal.js';
import { initCursor } from './lib/cursor.js';
import { initPageTransitions } from './lib/transitions.js';
import { initReadout } from './lib/readout.js';
import { initLauncher } from './lib/launcher.js';

// Platzhalter-Icons im 8-Bit-Raster (8×8) — je 1 ein gesetztes Pixel.
// Werden spaeter durch die endgueltigen Bereichssymbole ersetzt.
const ICON_GRIDS = {
  // Platine mit Leiterbahnen
  'creative-technology': [
    '01011010',
    '11111111',
    '01000010',
    '11011011',
    '11011011',
    '01000010',
    '11111111',
    '01011010',
  ],
  // Filmkamera mit zwei Spulen
  film: [
    '01100110',
    '11111111',
    '01100110',
    '00000000',
    '11111101',
    '11111111',
    '11111101',
    '11111100',
  ],
  // Controller
  game: [
    '00000000',
    '01111110',
    '11111111',
    '10111101',
    '00110100',
    '11111111',
    '11100111',
    '01000010',
  ],
  // Zeichenfeder
  grafikdesign: [
    '00011000',
    '00111100',
    '01111110',
    '01100110',
    '01111110',
    '00111100',
    '00011000',
    '00011000',
  ],
};

function pixelIcon(slug) {
  const grid = ICON_GRIDS[slug];
  if (!grid) return '';
  const rects = grid
    .flatMap((row, y) =>
      [...row].map((bit, x) =>
        bit === '1' ? `<rect x="${x}" y="${y}" width="1" height="1"/>` : '',
      ),
    )
    .join('');
  return `<svg viewBox="0 0 8 8" fill="currentColor" aria-hidden="true">${rects}</svg>`;
}

function renderRole(role) {
  return role
    .split('·')
    .map((term) => term.trim())
    .filter(Boolean)
    .map((term) => `<span class="tagbox">${term}</span>`)
    .join('');
}

function renderAreas() {
  return categories
    .map(
      (cat) => `
      <a class="area" href="${cat.href}" data-cursor="Öffnen">
        <span class="area__icon">${pixelIcon(cat.slug)}</span>
        <span class="area__title">${cat.title}</span>
      </a>`,
    )
    .join('');
}

function main() {
  document.querySelector('[data-slot="name"]').textContent = site.name;
  document.querySelector('[data-slot="launcher-title"]').textContent = site.name;
  document.querySelector('[data-slot="hero"]').textContent = site.name;
  document.querySelector('[data-slot="role"]').innerHTML = renderRole(site.role);
  document.querySelector('[data-slot="intro"]').textContent = site.intro;
  document.querySelector('[data-slot="areas"]').innerHTML = renderAreas();
  document.querySelector('[data-slot="footer-links"]').innerHTML = site.links
    .map((link) => `<a href="${link.href}">${link.label}</a>`)
    .join('');
  document.querySelector('[data-slot="footer-name"]').textContent = site.name;

  initLauncher();
  initScroll();
  initPageTransitions();
  initCursor();
  initProgressBar();
  initReadout();
  revealFade();

  if (!prefersReducedMotion) {
    gsap.fromTo(
      '.area',
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.3 },
    );
  }
}

main();
