/**
 * Einstiegspunkt fuer ueber.html — die Seite ueber mich.
 *
 * Aufgebaut wie ein Eintrag im Telefonbuch eines Nokia 3310: Name oben,
 * darunter die Felder mit gepunkteter Fuehrung, darunter die Arbeitsweise.
 * Die Angaben stehen in src/data/site.js unter `ueber`.
 */

import '../styles/main.css';
import { site } from '../data/site.js';
import { initScroll, initProgressBar } from './lib/scroll.js';
import { revealFade, revealOnScroll } from './lib/reveal.js';
import { initCursor } from './lib/cursor.js';
import { initPageTransitions } from './lib/transitions.js';
import { renderVorgehen, renderWerkzeuge } from './lib/render.js';
import { LOADERS } from './lib/bereiche.js';
import { ladeSprache, t, uebersetzeSeite, initSprachschalter } from './lib/i18n.js';
import { initTonschalter } from './lib/ton.js';

/** Ein Feld des Eintrags: Name links, Wert rechts, dazwischen Punkte. */
function feld(bezeichnung, wert, href) {
  const inhalt = href
    ? `<a href="${href}"${href.startsWith('http') ? ' target="_blank" rel="noopener"' : ''}>${wert}</a>`
    : wert;
  return `
    <div class="kontakt__zeile">
      <dt>${bezeichnung}</dt>
      <dd>${inhalt}</dd>
    </div>`;
}

/** Die Initialen im Kasten — das Platzhalterbild im Telefonbuch. */
function initialen(name) {
  return name
    .split(' ')
    .map((teil) => teil[0])
    .join('');
}

async function main() {
  await ladeSprache();
  uebersetzeSeite();
  initSprachschalter();
  initTonschalter({ an: t('ton.an'), aus: t('ton.aus') });

  const ueber = site.ueber;
  document.querySelector('[data-slot="name"]').textContent = site.name;
  document.querySelector('[data-slot="avatar"]').textContent = initialen(ueber.name);
  document.querySelector('[data-slot="kontakt-name"]').textContent = ueber.name;
  document.querySelector('[data-slot="kontakt-rolle"]').textContent = ueber.rolle;
  document.querySelector('[data-slot="ueber-text"]').textContent = ueber.text;
  document.querySelector('[data-slot="kontakt-status"]').textContent = ueber.kuerzel;

  document.querySelector('[data-slot="kontakt-felder"]').innerHTML = [
    feld(t('ueber.feld.ort'), ueber.ort),
    feld(t('ueber.feld.mail'), site.email, `mailto:${site.email}`),
    feld(t('ueber.feld.instagram'), ueber.instagram.label, ueber.instagram.href),
    feld(t('ueber.feld.abschluss'), ueber.abschluesse.join(' · ')),
    feld(t('ueber.feld.sprachen'), ueber.sprachen.join(' · ')),
    feld(t('ueber.feld.kernkompetenz'), ueber.kernkompetenz),
  ].join('');

  document.querySelector('[data-slot="vorgehen"]').innerHTML = renderVorgehen(ueber.vorgehen);

  // Die Werkzeuge kommen aus den Projekten selbst, nicht aus einer
  // gepflegten Liste — so fehlt nie eines, das irgendwo benutzt wurde.
  const bereiche = await Promise.all(Object.values(LOADERS).map((laden) => laden()));
  const alleProjekte = bereiche.flatMap((bereich) => bereich.projects);
  document.querySelector('[data-slot="werkzeuge"]').innerHTML = renderWerkzeuge(
    ueber.werkzeuge,
    alleProjekte,
  );

  initScroll();
  initPageTransitions();
  initCursor();
  initProgressBar();
  revealFade();
  revealOnScroll('.method__step', { y: 20 });
}

main();
