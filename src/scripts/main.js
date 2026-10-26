/**
 * Einstiegspunkt fuer die Startseite.
 * Oben der Startbildschirm des Telefons (Name, Rolle, Softkey "Menue"),
 * darunter das Menue wie beim Nokia 3310: ein Eintrag nach dem anderen.
 */

import '../styles/main.css';
import { site, categories, spiel } from '../data/site.js';
import { initScroll, initProgressBar, gsap, prefersReducedMotion } from './lib/scroll.js';
import { revealFade } from './lib/reveal.js';
import { initCursor } from './lib/cursor.js';
import { initPageTransitions } from './lib/transitions.js';
import { initReadout } from './lib/readout.js';
import { initLauncher } from './lib/launcher.js';
import { initPhoneMenu } from './lib/phonemenu.js';

// Menue-Icons im 16er-Pixelraster, 1 = gesetztes Pixel.
const ICON_GRIDS = {
  // Roehrenfernseher mit Antenne
  'creative-technology': [
    '0001000000001000',
    '0000100000010000',
    '0000010000100000',
    '0000001001000000',
    '1111111111111111',
    '1000000000000001',
    '1011111111110001',
    '1010000000010101',
    '1010010010010001',
    '1010000000010101',
    '1010100001010001',
    '1010011110010001',
    '1011111111110001',
    '1000000000000001',
    '1111111111111111',
    '0110000000000110',
  ],
  // Filmkamera mit zwei Spulen
  film: [
    '0011100001110000',
    '0100010010001000',
    '0101010010101000',
    '0100010010001000',
    '0011100001110000',
    '0000000000000000',
    '1111111111110000',
    '1000000000010011',
    '1011111111010111',
    '1010000001011111',
    '1011111111010111',
    '1000000000010011',
    '1111111111110000',
    '0000011100000000',
  ],
  // Controller
  game: [
    '0011111111111100',
    '0100000000000010',
    '1000100000010001',
    '1001110000101001',
    '1000100000010001',
    '1000000000000001',
    '1000001111000001',
    '1000010000100001',
    '0111100000011110',
  ],
  // Zeichenfeder
  grafikdesign: [
    '0000000110000000',
    '0000001001000000',
    '0000010000100000',
    '0000100000010000',
    '0001000110001000',
    '0001000110001000',
    '0001000000001000',
    '0001000110001000',
    '0000100110010000',
    '0000010110100000',
    '0000001111000000',
    '0000000110000000',
    '0000000110000000',
  ],
  // Snake — was sonst im Spiele-Menue eines 3310
  spiele: [
    '1111111111000000',
    '1111111111000000',
    '1100000011000000',
    '1100000011000000',
    '1100000011111111',
    '1100000011111011',
    '1100000000000000',
    '1100000000000000',
    '1100000000000110',
    '0000000000000110',
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
  return `<svg viewBox="0 0 ${grid[0].length} ${grid.length}" fill="currentColor" aria-hidden="true">${rects}</svg>`;
}

function renderRole(role) {
  return role
    .split('·')
    .map((term) => term.trim())
    .filter(Boolean)
    .map((term) => `<span class="tagbox">${term}</span>`)
    .join('');
}

/** Die Eintraege des Menues: alle Bereiche, dazu das spielbare Spiel. */
function renderMenu() {
  const eintraege = [
    ...categories,
    { slug: 'spiele', href: spiel.href, title: 'Spiele', description: spiel.untertitel },
  ];
  return eintraege
    .map(
      (eintrag) => `
      <li class="phone__item">
        <a class="phone__link" href="${eintrag.href}" data-cursor="Öffnen">
          <span class="phone__icon">${pixelIcon(eintrag.slug)}</span>
          <span class="phone__name">${eintrag.title}</span>
          <span class="phone__desc">${eintrag.description ?? ''}</span>
        </a>
      </li>`,
    )
    .join('');
}

function main() {
  document.querySelector('[data-slot="name"]').textContent = site.name;
  document.querySelector('[data-slot="launcher-title"]').textContent = site.name;
  document.querySelector('[data-slot="hero"]').textContent = site.name;
  document.querySelector('[data-slot="role"]').innerHTML = renderRole(site.role);
  document.querySelector('[data-slot="intro"]').textContent = site.intro;
  document.querySelector('[data-slot="menu"]').innerHTML = renderMenu();
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
  initPhoneMenu(document.querySelector('.phone'));
  revealFade();

  if (!prefersReducedMotion) {
    gsap.fromTo(
      '.phone__screen',
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.3, clearProps: 'transform' },
    );
  }
}

main();
