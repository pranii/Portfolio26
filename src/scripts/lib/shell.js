/**
 * Der Rahmen, den jede Seite teilt: Kopf und Fuss.
 *
 * Die Navigation steht als HTML in den Seiten — so finden Suchmaschinen
 * und Leser ohne JavaScript die Bereiche. Alles, was aus den Daten
 * kommt (Kontakt, Ort, Jahr), baut dieses Modul.
 */

import { site, categories } from '../../data/site.js';
import { t } from './i18n.js';

const SPEICHER = 'portfolio-thema';

const esc = (value = '') =>
  String(value).replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
  );

/* ── Themenschalter ───────────────────────────────────────────────── */

/**
 * Hell oder dunkel. Ohne Wahl folgt die Seite dem System; eine
 * getroffene Wahl bleibt gespeichert und gilt auf allen Seiten.
 */
function gespeichertesThema() {
  try {
    return localStorage.getItem(SPEICHER);
  } catch {
    return null; // privates Fenster ohne Speicher
  }
}

/** Setzt das Thema, noch bevor gezeichnet wird — sonst blitzt es auf. */
export function themaAnwenden() {
  const wahl = gespeichertesThema();
  if (wahl === 'dark' || wahl === 'light') document.documentElement.dataset.theme = wahl;
}

const SONNE =
  '<circle cx="12" cy="12" r="4.2"/><path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.4 5.4l1.6 1.6M17 17l1.6 1.6M18.6 5.4 17 7M7 17l-1.6 1.6"/>';
const MOND = '<path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5Z"/>';

function themaKnopf() {
  const knopf = document.createElement('button');
  knopf.type = 'button';
  knopf.className = 'theme-toggle';

  const zeichne = () => {
    // Der Knopf zeigt, was ein Klick bewirkt, nicht den Zustand.
    const dunkelJetzt = matchMedia('(prefers-color-scheme: dark)').matches;
    const thema = document.documentElement.dataset.theme ?? (dunkelJetzt ? 'dark' : 'light');
    const ziel = thema === 'dark' ? 'light' : 'dark';
    const beschriftung = ziel === 'dark' ? 'Dunkle Ansicht' : 'Helle Ansicht';
    knopf.setAttribute('aria-label', beschriftung);
    knopf.setAttribute('title', beschriftung);
    knopf.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
      stroke-linecap="round" aria-hidden="true">${ziel === 'dark' ? MOND : SONNE}</svg>`;
    knopf.dataset.ziel = ziel;
  };

  knopf.addEventListener('click', () => {
    const ziel = knopf.dataset.ziel;
    document.documentElement.dataset.theme = ziel;
    try {
      localStorage.setItem(SPEICHER, ziel);
    } catch {
      // Ohne Speicher gilt die Wahl nur fuer diese Seite.
    }
    zeichne();
  });

  zeichne();
  return knopf;
}

/* ── Kopf ─────────────────────────────────────────────────────────── */

/**
 * Richtet den Kopf ein: Name, Themenschalter und — auf schmalen
 * Bildschirmen — den Knopf, der die Navigation aufklappt.
 */
export function initKopf() {
  const kopf = document.querySelector('.site-header');
  if (!kopf) return;

  const mark = kopf.querySelector('.site-header__mark');
  if (mark) mark.textContent = site.name;

  const tools = document.createElement('div');
  tools.className = 'site-header__tools';

  const nav = kopf.querySelector('.site-nav');
  if (nav) {
    const knopf = document.createElement('button');
    knopf.type = 'button';
    knopf.className = 'nav-toggle';
    knopf.setAttribute('aria-expanded', 'false');
    knopf.setAttribute('aria-controls', 'bereiche');
    knopf.textContent = 'Bereiche';
    nav.id = 'bereiche';
    kopf.dataset.nav = 'zu';

    knopf.addEventListener('click', () => {
      const offen = kopf.dataset.nav === 'auf';
      kopf.dataset.nav = offen ? 'zu' : 'auf';
      knopf.setAttribute('aria-expanded', String(!offen));
    });

    tools.appendChild(knopf);
  }

  tools.appendChild(themaKnopf());
  kopf.appendChild(tools);
}

/* ── Fuss ─────────────────────────────────────────────────────────── */

/**
 * Der Fuss ist der Kontaktabschnitt: die Adresse gross, daneben der
 * Weg zu den Bereichen. Er steht auf jeder Seite, damit der Weg zu
 * ihr nie gesucht werden muss.
 */
export function renderFooter() {
  if (document.querySelector('.site-footer')) return;

  const ueber = site.ueber ?? {};
  const weitere = (site.links ?? []).filter((link) => !link.href.startsWith('mailto:'));

  const bereiche = categories
    .map((bereich) => `<a href="${esc(bereich.href)}">${bereich.title}</a>`)
    .join('');

  const fuss = document.createElement('footer');
  fuss.className = 'site-footer';
  fuss.innerHTML = `
    <div class="shell site-footer__inner">
      <div>
        <p class="site-footer__call">${esc(t('menu.kontakttext'))}</p>
        <a class="site-footer__mail" href="mailto:${esc(site.email)}">${esc(site.email)}</a>
        ${
          weitere.length
            ? `<p class="site-footer__links">${weitere
                .map(
                  (link) =>
                    `<a href="${esc(link.href)}" target="_blank" rel="noopener">${esc(link.label)}</a>`,
                )
                .join('')}</p>`
            : ''
        }
      </div>
      <nav class="site-footer__nav" aria-label="${esc(t('nav.bereiche'))}">
        <h2>${esc(t('nav.bereiche'))}</h2>
        ${bereiche}
        <a href="ueber.html">${esc(t('menu.ueber'))}</a>
      </nav>
    </div>
    <div class="shell site-footer__foot">
      <span>${esc(ueber.name ?? site.name)}${ueber.ort ? `, ${esc(ueber.ort)}` : ''}</span>
      <span>${new Date().getFullYear()}</span>
    </div>`;

  document.body.appendChild(fuss);
}

/** Kopf und Fuss in einem Aufruf — das braucht jede Seite. */
export function initShell() {
  initKopf();
  renderFooter();
}
