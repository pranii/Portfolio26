/**
 * Einstiegspunkt fuer arbeit.html, freizeit.html und uni.html.
 * Diese Seiten zeigen nur die Uebersicht: alle Projekte als Karten.
 * Das einzelne Projekt liegt auf projekt.html.
 */

import '../styles/main.css';
import { site } from '../data/site.js';
import { initScroll, initProgressBar, gsap, prefersReducedMotion } from './lib/scroll.js';
import { revealFade } from './lib/reveal.js';
import { initCursor } from './lib/cursor.js';
import { initPageTransitions } from './lib/transitions.js';
import { initReadout } from './lib/readout.js';
import { renderCards, countMedia } from './lib/render.js';

const LOADERS = {
  arbeit: () => import('../data/arbeit.js'),
  freizeit: () => import('../data/freizeit.js'),
  uni: () => import('../data/uni.js'),
};

async function main() {
  const page = document.body.dataset.page;
  const { category, projects } = await LOADERS[page]();

  document.documentElement.dataset.accent = page;
  document.querySelector('[data-slot="name"]').textContent = site.name;

  const counts = countMedia(projects, page);

  // Der Titel steht zweimal auf der Seite: im Pfad und als Ueberschrift.
  document.querySelectorAll('[data-slot="title"]').forEach((el) => {
    el.textContent = category.title;
  });
  document.querySelector('[data-slot="lead"]').textContent = category.lead;
  document.querySelector('[data-slot="count"]').textContent =
    `${projects.length} Projekte · ${counts.chapters} Arbeitsschritte`;
  document.querySelector('[data-slot="cards"]').innerHTML = renderCards(projects, page);

  document.querySelector('[data-slot="footer-links"]').innerHTML = site.links
    .map((link) => `<a href="${link.href}">${link.label}</a>`)
    .join('');
  document.querySelector('[data-slot="footer-name"]').textContent = site.name;

  initScroll();
  initPageTransitions();
  initCursor();
  initProgressBar();
  initReadout();
  revealFade();

  if (!prefersReducedMotion) {
    gsap.fromTo(
      '.card',
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.06, ease: 'power3.out', delay: 0.15 },
    );
  }
}

main();
