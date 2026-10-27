/**
 * Einstiegspunkt fuer projekt.html.
 * Welches Projekt gezeigt wird, steht in der Adresse: projekt.html?id=film/love
 */

import '../styles/main.css';
import { site, categories } from '../data/site.js';
import { initScroll, initProgressBar, ScrollTrigger } from './lib/scroll.js';
import { revealFade, revealOnScroll } from './lib/reveal.js';
import { initCursor } from './lib/cursor.js';
import { initLightbox } from './lib/lightbox.js';
import { initPageTransitions } from './lib/transitions.js';
import { initShowMore } from './lib/showmore.js';
import { initVideoSlots } from './lib/videoslot.js';
import { renderProjectPage } from './lib/render.js';
import { prototypHtml, startPrototyp } from './lib/prototyp.js';
import { initBuecher } from './lib/buecher.js';
import {
  ladeSprache,
  t,
  uebersetzeProjekt,
  uebersetzeKategorie,
  uebersetzeSeite,
  initSprachschalter,
} from './lib/i18n.js';
import { LOADERS } from './lib/bereiche.js';

function parseId() {
  const raw = new URLSearchParams(location.search).get('id') ?? '';
  const [category, slug] = raw.split('/');
  return { category, slug };
}

function notFound(message) {
  document.querySelector('[data-slot="projekt"]').innerHTML = `
    <div class="empty">
      <h1 class="empty__title">${t('projekt.nichtgefunden')}</h1>
      <p class="empty__text">${message}</p>
      <p><a class="button" href="index.html">${t('projekt.zurstartseite')}</a></p>
    </div>`;
  document.querySelector('.breadcrumb')?.remove();
  document.querySelector('.pager')?.remove();
}

/** Das Projekt davor oder danach — mit uebersetztem Titel. */
function uebersetztesNachbarprojekt(data, index) {
  const nachbar = data.projects[index];
  return nachbar ? uebersetzeProjekt(nachbar) : null;
}

async function main() {
  await ladeSprache();
  uebersetzeSeite();
  initSprachschalter();
  document.querySelector('[data-slot="name"]').textContent = site.name;

  const { category, slug } = parseId();
  const load = LOADERS[category];

  if (!load) {
    notFound(t('projekt.kein-bereich'));
    return;
  }

  const data = await load();
  const index = data.projects.findIndex((p) => p.slug === slug);

  if (index === -1) {
    notFound(t('projekt.kein-projekt', { bereich: data.category.title, slug }));
    return;
  }

  const project = uebersetzeProjekt(data.projects[index]);
  const bereich = uebersetzeKategorie(data.category);
  document.documentElement.dataset.accent = category;
  document.title = `${project.title} — ${bereich.title} — Portfolio`;

  const meta = categories.find((c) => c.slug === category);
  const crumb = document.querySelector('[data-slot="crumb-category"]');
  crumb.textContent = bereich.title;
  crumb.href = meta?.href ?? `${category}.html`;
  document.querySelector('[data-slot="crumb-project"]').textContent = project.title;

  const wurzel = document.querySelector('[data-slot="projekt"]');
  wurzel.innerHTML = renderProjectPage(project, bereich.title);

  // Der Prototyp sitzt zwischen Projektkopf und Kapiteln — auf derselben
  // Seite, nicht auf einer eigenen.
  if (project.prototyp) {
    wurzel.querySelector('.project-head').insertAdjacentHTML('afterend', prototypHtml(project));
  }

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

  setPager('prev', uebersetztesNachbarprojekt(data, index - 1), t('projekt.vorheriges'));
  setPager('next', uebersetztesNachbarprojekt(data, index + 1), t('projekt.naechstes'));

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

  await initBuecher(wurzel, project.slug);
  if (project.prototyp) await startPrototyp(project, wurzel);

  window.addEventListener('load', () => ScrollTrigger.refresh());
}

main();
