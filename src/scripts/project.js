/**
 * Einstiegspunkt fuer projekt.html.
 * Welches Projekt gezeigt wird, steht in der Adresse: projekt.html?id=uni/rreth
 */

import '../styles/main.css';
import { site, categories } from '../data/site.js';
import { initScroll, initProgressBar, ScrollTrigger } from './lib/scroll.js';
import { revealFade, revealOnScroll } from './lib/reveal.js';
import { initCursor } from './lib/cursor.js';
import { initLightbox } from './lib/lightbox.js';
import { initPageTransitions } from './lib/transitions.js';
import { initReadout } from './lib/readout.js';
import { initShowMore } from './lib/showmore.js';
import { initVideoSlots } from './lib/videoslot.js';
import { renderProjectPage } from './lib/render.js';

const LOADERS = {
  arbeit: () => import('../data/arbeit.js'),
  freizeit: () => import('../data/freizeit.js'),
  uni: () => import('../data/uni.js'),
};

function parseId() {
  const raw = new URLSearchParams(location.search).get('id') ?? '';
  const [category, slug] = raw.split('/');
  return { category, slug };
}

function notFound(message) {
  document.querySelector('[data-slot="projekt"]').innerHTML = `
    <div class="empty">
      <h1 class="empty__title">Projekt nicht gefunden</h1>
      <p class="empty__text">${message}</p>
      <p><a class="button" href="index.html">Zur Startseite</a></p>
    </div>`;
  document.querySelector('.breadcrumb')?.remove();
  document.querySelector('.pager')?.remove();
}

async function main() {
  document.querySelector('[data-slot="name"]').textContent = site.name;
  document.querySelector('[data-slot="footer-name"]').textContent = site.name;
  document.querySelector('[data-slot="footer-links"]').innerHTML = site.links
    .map((link) => `<a href="${link.href}">${link.label}</a>`)
    .join('');
  initReadout();

  const { category, slug } = parseId();
  const load = LOADERS[category];

  if (!load) {
    notFound(
      'Die Adresse enthaelt keinen gueltigen Bereich. Erwartet wird zum Beispiel projekt.html?id=uni/rreth.',
    );
    return;
  }

  const data = await load();
  const index = data.projects.findIndex((p) => p.slug === slug);

  if (index === -1) {
    notFound(`Im Bereich ${data.category.title} gibt es kein Projekt mit dem Kuerzel "${slug}".`);
    return;
  }

  const project = data.projects[index];
  document.documentElement.dataset.accent = category;
  document.title = `${project.title} — ${data.category.title} — Portfolio`;

  const meta = categories.find((c) => c.slug === category);
  const crumb = document.querySelector('[data-slot="crumb-category"]');
  crumb.textContent = data.category.title;
  crumb.href = meta?.href ?? `${category}.html`;
  document.querySelector('[data-slot="crumb-project"]').textContent = project.title;

  document.querySelector('[data-slot="projekt"]').innerHTML = renderProjectPage(
    project,
    category,
    data.category.title,
  );

  // Voriges und naechstes Projekt desselben Bereichs.
  const setPager = (slotName, target, richtung) => {
    const link = document.querySelector(`[data-slot="${slotName}"]`);
    if (!target) {
      link.remove();
      return;
    }
    link.href = `projekt.html?id=${category}/${target.slug}`;
    link.innerHTML = `<span class="pager__dir">${richtung}</span><span class="pager__title">${target.title}</span>`;
  };

  setPager('prev', data.projects[index - 1], '← Vorheriges Projekt');
  setPager('next', data.projects[index + 1], 'Nächstes Projekt →');

  initScroll();
  initPageTransitions();
  initCursor();
  initProgressBar();
  revealFade();
  revealOnScroll('.step__head', { y: 24 });
  revealOnScroll('.figure', { y: 16 });
  initShowMore();
  initVideoSlots();
  initLightbox();

  window.addEventListener('load', () => ScrollTrigger.refresh());
}

main();
