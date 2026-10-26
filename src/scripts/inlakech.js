/**
 * Einstiegspunkt fuer inlakech.html — der spielbare Prototyp von In Lak'ech.
 * Das Spiel selbst steckt in lib/inlakech-game.js; hier nur Seite und Knoepfe.
 */

import '../styles/main.css';
import { site } from '../data/site.js';
import { initScroll, initProgressBar } from './lib/scroll.js';
import { revealFade } from './lib/reveal.js';
import { initCursor } from './lib/cursor.js';
import { initPageTransitions } from './lib/transitions.js';
import { initReadout } from './lib/readout.js';
import { startInLakech } from './lib/inlakech-game.js';

async function main() {
  document.querySelector('[data-slot="name"]').textContent = site.name;
  document.querySelector('[data-slot="footer-name"]').textContent = site.name;
  document.querySelector('[data-slot="footer-links"]').innerHTML = site.links
    .map((link) => `<a href="${link.href}">${link.label}</a>`)
    .join('');

  initScroll();
  initPageTransitions();
  initCursor();
  initProgressBar();
  initReadout();
  revealFade();

  const statusZeile = document.querySelector('[data-slot="duell-status"]');
  const basis = import.meta.env.BASE_URL + 'inlakech/';
  try {
    const druecke = await startInLakech(
      document.querySelector('[data-slot="duell"]'),
      basis,
      (text) => (statusZeile.textContent = text),
    );
    // Knoepfe unter dem Bild. pointerdown statt click: reagiert sofort und
    // erlaubt, dass zwei Finger gleichzeitig druecken.
    document.querySelectorAll('[data-knopf]').forEach((knopf) => {
      knopf.addEventListener('pointerdown', (event) => {
        event.preventDefault();
        druecke(knopf.dataset.knopf);
      });
    });
  } catch (fehler) {
    statusZeile.textContent = `Fehler: ${fehler.message}`;
  }
}

main();
