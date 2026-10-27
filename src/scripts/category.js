/**
 * Einstiegspunkt fuer die Bereichsseiten (creative-technology.html, film.html,
 * game.html, kommunikationsdesign.html).
 * Diese Seiten zeigen die Uebersicht: alle Projekte als Karten im Karussell,
 * darunter das Vorgehen und die Software des Bereichs.
 * Das einzelne Projekt liegt auf projekt.html.
 */

import '../styles/main.css';
import { site } from '../data/site.js';
import { initScroll, initProgressBar, gsap, prefersReducedMotion } from './lib/scroll.js';
import { revealFade, revealOnScroll } from './lib/reveal.js';
import { initCursor } from './lib/cursor.js';
import { initPageTransitions } from './lib/transitions.js';
import { renderCards, renderSoftware, countMedia } from './lib/render.js';
import { initCarousel } from './lib/carousel.js';
import { LOADERS } from './lib/bereiche.js';
import {
  ladeSprache,
  t,
  uebersetzeKategorie,
  uebersetzeProjekt,
  uebersetzeSeite,
  initSprachschalter,
} from './lib/i18n.js';

async function main() {
  const page = document.body.dataset.page;
  await ladeSprache();
  uebersetzeSeite();
  initSprachschalter();

  const geladen = await LOADERS[page]();
  const category = uebersetzeKategorie(geladen.category);
  const projects = geladen.projects.map(uebersetzeProjekt);
  document.title = `${category.title} — Portfolio`;

  document.documentElement.dataset.accent = page;
  document.querySelector('[data-slot="name"]').textContent = site.name;

  const counts = countMedia(projects);

  // Der Titel steht zweimal auf der Seite: im Pfad und als Ueberschrift.
  document.querySelectorAll('[data-slot="title"]').forEach((el) => {
    el.textContent = category.title;
  });
  document.querySelector('[data-slot="lead"]').textContent = category.lead;
  document.querySelector('[data-slot="count"]').textContent =
    `${projects.length} ${t('karte.projekte')} · ${counts.chapters} ${t('karte.schritte')}`;
  document.querySelector('[data-slot="cards"]').innerHTML = renderCards(projects, page);

  // Abschnitte ohne Inhalt ganz weglassen statt eine leere Ueberschrift zu zeigen.
  const fuelle = (slot, html) => {
    if (html) slot.innerHTML = html;
    else slot.closest('section').remove();
  };
  fuelle(
    document.querySelector('[data-slot="software"]'),
    renderSoftware(category.software, projects),
  );

  initScroll();
  initPageTransitions();
  initCursor();
  initProgressBar();
  initCarousel(document.querySelector('.carousel'));
  revealFade();
  revealOnScroll('.method__step', { y: 20 });
  revealOnScroll('.skill', { y: 12 });

  if (!prefersReducedMotion) {
    gsap.fromTo(
      '.card',
      { opacity: 0, x: 48 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.07,
        ease: 'power3.out',
        delay: 0.15,
        // Sonst bliebe ein Inline-transform stehen und der Hover-Effekt griffe nicht.
        clearProps: 'transform',
      },
    );
  }
}

main();
