/**
 * Einstiegspunkt fuer die Bereichsseiten (creative-technology.html,
 * film.html, game.html, kommunikationsdesign.html).
 *
 * Eine Bereichsseite zeigt drei Dinge: die Arbeiten als Raster, das
 * Vorgehen in diesem Bereich und die Werkzeuge. Das einzelne Projekt
 * liegt auf projekt.html.
 */

import '../styles/main.css';
import { initScroll, initProgressBar } from './lib/scroll.js';
import { revealFade } from './lib/reveal.js';
import { initCursor } from './lib/cursor.js';
import { initShell, themaAnwenden } from './lib/shell.js';
import { renderPlates, renderSoftware, renderVorgehen } from './lib/render.js';
import { LOADERS } from './lib/bereiche.js';
import {
  ladeSprache,
  t,
  uebersetzeKategorie,
  uebersetzeProjekt,
  uebersetzeSeite,
  initSprachschalter,
} from './lib/i18n.js';
import { initTonschalter } from './lib/ton.js';

themaAnwenden();

async function main() {
  const page = document.body.dataset.page;
  await ladeSprache();
  uebersetzeSeite();
  initSprachschalter();
  initTonschalter({ an: t('ton.an'), aus: t('ton.aus') });
  initShell();

  const geladen = await LOADERS[page]();
  const category = uebersetzeKategorie(geladen.category);
  const projects = geladen.projects.filter((p) => !p.versteckt).map(uebersetzeProjekt);
  document.title = `${category.title} | Pranvera Pelaj`;
  document.documentElement.dataset.accent = page;

  document.querySelectorAll('[data-slot="title"]').forEach((el) => {
    el.textContent = category.title;
  });
  document.querySelector('[data-slot="lead"]').textContent = category.lead;
  document.querySelector('[data-slot="cards"]').innerHTML = renderPlates(projects, page);

  const anzahl = document.querySelector('[data-slot="anzahl"]');
  if (anzahl) {
    anzahl.textContent = `${projects.length} ${
      projects.length === 1 ? t('karte.projekt') : t('karte.projekte')
    } in diesem Bereich.`;
  }

  // Abschnitte ohne Inhalt ganz weglassen statt eine leere Ueberschrift
  // zu zeigen.
  const fuelle = (slot, html) => {
    const el = document.querySelector(slot);
    if (!el) return;
    if (html) el.innerHTML = html;
    else el.closest('section')?.remove();
  };

  fuelle('[data-slot="vorgehen"]', renderVorgehen(category.vorgehen));
  fuelle('[data-slot="software"]', renderSoftware(category.software));

  initScroll();
  initProgressBar();
  initCursor();
  revealFade();
}

main();
