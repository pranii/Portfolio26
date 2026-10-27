/**
 * Die Prototypen in der Projektseite.
 *
 * Jedes Projekt, das in seiner Datendatei ein `prototyp`-Feld hat, bekommt
 * direkt auf der Projektseite ein Fenster, in dem die Arbeit laeuft — kein
 * Umweg ueber eine eigene Seite:
 *
 *   in-lakech  Das Duell, uebertragen vom Raspberry Pi (lib/inlakech-game.js)
 *   zodizine   Der Zine-Automat mit Caras Seiten (lib/zodizine-automat.js)
 *   magazin    Rreth 02 zum Durchblaettern (lib/magazin.js)
 *
 * Hier steht nur der Rahmen: das Fenster, die Knoepfe darunter und die
 * kurze Bedienungsanleitung. Das eigentliche Stueck Software wird erst
 * geladen, wenn die Seite es wirklich zeigt — deshalb steckt es in einem
 * dynamischen Import und nicht oben im Modulkopf.
 */

import { mediaFor } from './render.js';

const esc = (text) =>
  String(text).replace(
    /[&<>"]/g,
    (zeichen) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[zeichen],
  );

/** Fenster mit Titelleiste und Statuszeile — der Rahmen aller Prototypen. */
function fenster({ titel, rechts, koerper, koerperKlasse = '' }) {
  return `
    <section class="window" aria-labelledby="prototyp-titel">
      <div class="window__bar">
        <span class="window__title" id="prototyp-titel">
          <span class="window__icon" aria-hidden="true">▣</span>
          ${esc(titel)}
        </span>
        <span class="window__buttons" aria-hidden="true">
          <span class="window__btn">_</span>
          <span class="window__btn">□</span>
          <span class="window__btn window__btn--close">✕</span>
        </span>
      </div>
      <div class="window__body ${koerperKlasse}">${koerper}</div>
      <div class="window__status">
        <span class="window__status-cell window__status-cell--grow" data-rolle="status">Lädt …</span>
        <span class="window__status-cell">${esc(rechts)}</span>
      </div>
    </section>`;
}

/** Die Zeile unter dem Fenster — was man dort sieht, nicht wie man es bedient. */
function fuss(hinweis) {
  return hinweis ? `<div class="prototyp__fuss"><p class="section-hint">${hinweis}</p></div>` : '';
}

const BAUPLAN = {
  'in-lakech': () =>
    fenster({
      titel: 'INLAKECH.PY',
      rechts: 'A links · K rechts',
      koerper: `
        <canvas
          class="window__frame duell__canvas"
          data-rolle="duell"
          width="1280"
          height="720"
          role="img"
          aria-label="IN LAK'ECH — zwei Figuren im Duell"
        ></canvas>`,
    }) +
    `
    <div class="duell__keys">
      <button class="duell__key" type="button" data-knopf="A" aria-label="Knopf A, links">A</button>
      <button class="duell__key" type="button" data-knopf="B" aria-label="Knopf K, rechts">K</button>
    </div>` +
    fuss(t('prototyp.inlakech')),

  zodizine: () =>
    fenster({
      titel: 'ZODIZINE.APP',
      rechts: 'Raspberry Pi · 1280 × 800',
      koerperKlasse: 'window__body--kiosk',
      koerper: `
        <div
          class="window__frame zodi"
          data-rolle="zodizine"
          tabindex="0"
          role="application"
          aria-label="ZodiZine — Automat"
        ></div>`,
    }) +
    fuss(
      t('prototyp.zodizine', {
        anleitung: `<a href="zodizine/faltanleitung.pdf" target="_blank" rel="noopener">${t(
          'prototyp.zodizine.anleitung',
        )}</a>`,
      }),
    ),

  magazin: ({ pdf }) =>
    fenster({
      titel: 'RRETH02.PDF',
      rechts: 'A5 quer · 30 Seiten',
      koerperKlasse: 'window__body--buch',
      koerper: '<div class="window__frame" data-rolle="magazin"></div>',
    }) +
    `
    <div class="buch__leiste">
      <button class="buch__knopf" type="button" data-rolle="zurueck" aria-label="${t('heft.zurueck')}">
        ◀
      </button>
      <span class="buch__zaehler" data-rolle="zaehler" aria-live="polite"></span>
      <button class="buch__knopf" type="button" data-rolle="vor" aria-label="${t('heft.vor')}">
        ▶
      </button>
    </div>` +
    fuss(
      pdf
        ? t('prototyp.magazin', {
            pdf: `<a href="${esc(pdf)}" target="_blank" rel="noopener">${t('prototyp.magazin.pdf')}</a>`,
          })
        : t('prototyp.magazin.ohnepdf'),
    ),
};

/**
 * Der HTML-Block fuer die Projektseite. Leer, wenn das Projekt keinen
 * Prototypen hat oder die Art unbekannt ist.
 */
export function prototypHtml(project) {
  const art = project.prototyp?.art;
  const bauen = BAUPLAN[art];
  if (!bauen) return '';

  return `
    <section class="prototyp" id="prototyp" data-prototyp="${esc(art)}">
      <p class="prototyp__kicker">${esc(project.prototyp.kicker ?? t('prototyp.kicker'))}</p>
      <h2 class="section-title">${esc(project.prototyp.titel ?? 'Prototyp')}</h2>
      ${bauen(quellen(project))}
    </section>`;
}

/** Was der jeweilige Prototyp aus den Projektdaten braucht. */
function quellen(project) {
  if (project.prototyp.art !== 'magazin') return {};
  const { docs } = mediaFor(project.slug);
  const pdf = docs.find((doc) => doc.src.includes(project.prototyp.quelle));
  return { pdf: pdf ? basis() + pdf.src.replace(/^\//, '') : null };
}

function basis() {
  return import.meta.env.BASE_URL;
}

/**
 * Startet den Prototypen, nachdem die Projektseite steht.
 * Der Code dafuer wird erst hier geladen.
 */
export async function startPrototyp(project, wurzel) {
  const art = project.prototyp?.art;
  const block = wurzel.querySelector('[data-prototyp]');
  if (!art || !block) return;

  const melde = (text) => {
    const zeile = block.querySelector('[data-rolle="status"]');
    if (zeile) zeile.textContent = text;
  };

  try {
    if (art === 'in-lakech') await startInLakechBlock(block, melde);
    if (art === 'zodizine') await startZodiZineBlock(block, melde);
    if (art === 'magazin') await startMagazinBlock(project, block, melde);
  } catch (fehler) {
    melde(`Fehler: ${fehler.message}`);
  }
}

async function startInLakechBlock(block, melde) {
  const { startInLakech } = await import('./inlakech-game.js');
  const { druecke, pause } = await startInLakech(
    block.querySelector('[data-rolle="duell"]'),
    basis() + 'inlakech/',
    melde,
  );
  // pointerdown statt click: reagiert sofort und erlaubt, dass zwei Finger
  // gleichzeitig druecken.
  block.querySelectorAll('[data-knopf]').forEach((knopf) => {
    knopf.addEventListener('pointerdown', (ereignis) => {
      ereignis.preventDefault();
      druecke(knopf.dataset.knopf);
    });
  });

  // Solange das Fenster nicht im Bild ist, ruht das Spiel.
  beobachte(block, (sichtbar) => pause(!sichtbar));
}

/** Ruft `was` mit true/false, sobald das Element ins Bild kommt oder es verlaesst. */
function beobachte(element, was) {
  if (typeof IntersectionObserver !== 'function') {
    was(true);
    return;
  }
  new IntersectionObserver(([eintrag]) => was(eintrag.isIntersecting), { threshold: 0.2 }).observe(
    element,
  );
}

async function startZodiZineBlock(block, melde) {
  const { startZodiZine } = await import('./zodizine-automat.js');
  // Der Druckbogen haengt am Seitenende, nicht im Fenster: Im Druck bleibt
  // nur er stehen, und dafuer darf er nicht im Projekttext liegen.
  const bogen = document.createElement('div');
  bogen.className = 'zine-bogen';
  bogen.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bogen);

  startZodiZine(
    block.querySelector('[data-rolle="zodizine"]'),
    bogen,
    basis() + 'zodizine/',
    melde,
  );
}

async function startMagazinBlock(project, block, melde) {
  const { startMagazin } = await import('./magazin.js');
  const { images } = mediaFor(project.slug);
  const seiten = images
    .filter((bild) => bild.fromPdf === project.prototyp.quelle)
    .sort((a, b) => a.page - b.page)
    .map((bild) => ({
      src: basis() + bild.src.replace(/^\//, ''),
      width: bild.width,
      height: bild.height,
    }));

  // Der Zaehler haengt am Ereignis des Hefts und muss stehen, bevor die
  // erste Doppelseite gezeigt wird.
  const zaehler = block.querySelector('[data-rolle="zaehler"]');
  block.addEventListener('magazin:seite', (ereignis) => {
    zaehler.textContent = ereignis.detail.name;
  });

  // Rreth 02 ist ein Heft im Querformat: zwei Seiten nebeneinander, mit
  // Umschlag. Die Blaetterleiste steht hier unter dem Fenster, nicht im Heft.
  const heft = startMagazin(block.querySelector('[data-rolle="magazin"]'), seiten, melde, {
    modus: 'heft',
    leiste: false,
  });

  block.querySelector('[data-rolle="vor"]').addEventListener('click', heft.vor);
  block.querySelector('[data-rolle="zurueck"]').addEventListener('click', heft.zurueck);

  // Pfeiltasten nur, solange das Heft im Bild ist — sonst wuerde es das
  // Blaettern der ganzen Seite stoeren.
  let sichtbar = false;
  beobachte(block, (imBild) => (sichtbar = imBild));

  window.addEventListener('keydown', (ereignis) => {
    if (!sichtbar || ereignis.target.closest('input, textarea')) return;
    if (ereignis.key === 'ArrowRight') {
      ereignis.preventDefault();
      heft.vor();
    } else if (ereignis.key === 'ArrowLeft') {
      ereignis.preventDefault();
      heft.zurueck();
    }
  });
}
