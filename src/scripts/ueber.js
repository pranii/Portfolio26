/**
 * Einstiegspunkt fuer ueber.html — die Seite ueber mich.
 *
 * Drei Dinge in dieser Reihenfolge: der eigene Standpunkt, die Angaben
 * zum Nachschlagen (Ort, Kontakt, Abschluesse, Sprachen), dann die
 * Werkzeuge und das Vorgehen. Die Angaben stehen in src/data/site.js
 * unter `ueber`.
 */

import '../styles/main.css';
import { site } from '../data/site.js';
import { initScroll, initProgressBar } from './lib/scroll.js';
import { revealFade } from './lib/reveal.js';
import { initCursor } from './lib/cursor.js';
import { initShell, themaAnwenden } from './lib/shell.js';
import { renderVorgehen, renderWerkzeuge, ladeAlleProjekte } from './lib/render.js';
import { ladeSprache, t, uebersetzeSeite, initSprachschalter } from './lib/i18n.js';
import { initTonschalter } from './lib/ton.js';

themaAnwenden();

const esc = (value = '') =>
  String(value).replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
  );

/** Eine Zeile der Angaben: Begriff links, Wert rechts. */
function feld(bezeichnung, wert, href) {
  if (!wert) return '';
  const inhalt = href
    ? `<a class="link" href="${esc(href)}"${
        href.startsWith('http') ? ' target="_blank" rel="noopener"' : ''
      }>${esc(wert)}</a>`
    : esc(wert);
  return `
    <div class="facts__row">
      <dt>${esc(bezeichnung)}</dt>
      <dd>${inhalt}</dd>
    </div>`;
}

async function main() {
  await ladeSprache();
  uebersetzeSeite();
  initSprachschalter();
  initTonschalter({ an: t('ton.an'), aus: t('ton.aus') });
  initShell();

  const ueber = site.ueber;
  const setze = (slot, wert) => {
    const el = document.querySelector(`[data-slot="${slot}"]`);
    if (el) el.textContent = wert ?? '';
  };

  setze('kontakt-name', ueber.name);
  setze('kontakt-rolle', [ueber.rolle, ueber.kernkompetenz].filter(Boolean).join(' — '));
  setze('ueber-text', ueber.text);

  document.querySelector('[data-slot="kontakt-felder"]').innerHTML = [
    feld(t('ueber.feld.ort'), ueber.ort),
    feld(t('ueber.feld.mail'), site.email, `mailto:${site.email}`),
    feld(t('ueber.feld.instagram'), ueber.instagram?.label, ueber.instagram?.href),
    feld(t('ueber.feld.abschluss'), ueber.abschluesse?.join(', ')),
    feld(t('ueber.feld.sprachen'), ueber.sprachen?.join(', ')),
    feld(t('ueber.feld.kernkompetenz'), ueber.kernkompetenz),
  ].join('');

  document.querySelector('[data-slot="vorgehen"]').innerHTML = renderVorgehen(ueber.vorgehen);

  // Die Werkzeuge kommen aus den Projekten selbst, nicht aus einer
  // gepflegten Liste — so fehlt nie eines, das irgendwo benutzt wurde.
  const bereiche = await ladeAlleProjekte();
  const alleProjekte = bereiche.flatMap((bereich) => bereich.projekte);
  document.querySelector('[data-slot="werkzeuge"]').innerHTML = renderWerkzeuge(
    ueber.werkzeuge,
    alleProjekte,
  );

  initScroll();
  initProgressBar();
  initCursor();
  revealFade();
}

main();
