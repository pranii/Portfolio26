/**
 * Einstiegspunkt fuer die Startseite.
 *
 * Ein einziger Bildschirm ohne Scrollen: Name, Begriffe, darunter ein
 * Telefon. Ein Klick aufs Telefon schaltet die Seite ins Negativ und
 * oeffnet das Menue in einem Fenster — ein Eintrag zur Zeit, wie beim
 * Nokia 3310.
 */

import '../styles/main.css';
import { site, categories, spiel } from '../data/site.js';
import { revealFade } from './lib/reveal.js';
import { initCursor } from './lib/cursor.js';
import { initPageTransitions } from './lib/transitions.js';
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
  // Briefumschlag
  kontakt: [
    '1111111111111111',
    '1100000000000011',
    '1010000000000101',
    '1001000000001001',
    '1000100000010001',
    '1000010000100001',
    '1000001111000001',
    '1000000000000001',
    '1000000000000001',
    '1111111111111111',
  ],
  // Tischtelefon — der Knopf auf dem Startbildschirm
  telefon: [
    '0011111111111100',
    '0111111111111110',
    '1111000000001111',
    '1111000000001111',
    '0110000000000110',
    '0000011111100000',
    '0000111111110000',
    '0001100110011000',
    '0011111111111100',
    '0111100110011110',
    '0111111111111110',
    '0111100110011110',
    '0111111111111110',
    '0111111111111110',
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

/** Die Eintraege des Menues: alle Bereiche, das spielbare Spiel und Kontakt. */
function renderMenu() {
  const eintraege = [
    ...categories,
    { slug: 'spiele', href: spiel.href, title: 'Spiele', description: spiel.untertitel },
    {
      slug: 'kontakt',
      href: `mailto:${site.email}`,
      title: 'Kontakt',
      description: 'Interesse oder Fragen zu einer Kollaboration?',
    },
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

/**
 * Telefon oeffnet das Menuefenster. Solange es offen ist, steht die ganze
 * Seite im Negativ (.is-dark auf <html> tauscht die Farb-Tokens).
 * Schliessen: Kreuz, Esc (macht <dialog> von selbst) oder Klick daneben.
 */
function initMenuWindow(call, fenster) {
  const screen = fenster.querySelector('.phone__screen');

  call.addEventListener('click', () => {
    document.documentElement.classList.add('is-dark');
    fenster.showModal();
    // Fokus fuer die Pfeiltasten, aber ohne sichtbare Markierung.
    screen.focus({ focusVisible: false });
  });

  fenster.addEventListener('close', () => {
    document.documentElement.classList.remove('is-dark');
  });

  fenster.querySelector('[data-menu="close"]').addEventListener('click', () => fenster.close());

  // Das Fenster selbst hat keinen Innenabstand — ein Klick, der direkt auf
  // dem <dialog> landet, war also daneben.
  fenster.addEventListener('click', (event) => {
    if (event.target === fenster) fenster.close();
  });
}

function main() {
  document.querySelector('[data-slot="launcher-title"]').textContent = site.name;
  document.querySelector('[data-slot="hero"]').textContent = site.name;
  document.querySelector('[data-slot="role"]').innerHTML = renderRole(site.role);
  document.querySelector('[data-slot="call"]').innerHTML = pixelIcon('telefon');
  document.querySelector('[data-slot="menu"]').innerHTML = renderMenu();

  initLauncher();
  initPageTransitions();
  initCursor();
  initPhoneMenu(document.querySelector('.phone'));
  initMenuWindow(
    document.querySelector('[data-slot="call"]'),
    document.querySelector('[data-slot="menu-window"]'),
  );
  revealFade();
}

main();
