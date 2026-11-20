/**
 * Einstiegspunkt fuer index.html — die Startseite.
 *
 * Die Startseite zeigt die Arbeit, nicht nur den Namen: oben der Satz,
 * der sie erklaert, darunter das Verzeichnis aller Arbeiten, dann die
 * Bereiche und das Vorgehen. Wer die Seite oeffnet, sieht sofort, was
 * es hier zu sehen gibt.
 */

import '../styles/main.css';
import { site, categories } from '../data/site.js';
import { initScroll, initProgressBar, gsap, prefersReducedMotion } from './lib/scroll.js';
import { revealFade } from './lib/reveal.js';
import { initCursor } from './lib/cursor.js';
import { initShell, themaAnwenden } from './lib/shell.js';
import { initVorschau } from './lib/vorschau.js';
import { renderIndex, renderAreas, renderVorgehen, ladeAlleProjekte } from './lib/render.js';
import { ladeSprache, t, uebersetzeSite, uebersetzeSeite, initSprachschalter } from './lib/i18n.js';
import { initTonschalter } from './lib/ton.js';

themaAnwenden();

/** Die Rolle als einzelne Begriffe — in den Daten steht sie als Kette. */
function renderRole(role = '') {
  return role
    .split('·')
    .map((term) => term.trim())
    .filter(Boolean)
    .map((term) => `<span class="tagbox">${term}</span>`)
    .join('');
}

async function main() {
  await ladeSprache();
  uebersetzeSeite();
  initSprachschalter();
  initTonschalter({ an: t('ton.an'), aus: t('ton.aus') });

  const uebersetzt = uebersetzeSite(site, categories);
  Object.assign(site, uebersetzt.site);
  categories.splice(0, categories.length, ...uebersetzt.categories);

  const ueber = site.ueber ?? {};
  const setze = (slot, wert) => {
    const el = document.querySelector(`[data-slot="${slot}"]`);
    if (el) el.textContent = wert ?? '';
  };

  setze('kuerzel', site.name);
  setze('person', [ueber.name, ueber.rolle].filter(Boolean).join(', '));
  setze('claim', site.claim);
  setze('intro', site.intro);

  const rolle = document.querySelector('[data-slot="role"]');
  if (rolle) rolle.innerHTML = renderRole(site.role);

  initShell();

  // Alle Bereiche laden: das Verzeichnis zeigt die Arbeiten aller
  // Bereiche an einer Stelle.
  const bereiche = await ladeAlleProjekte();
  const alle = bereiche.flatMap((bereich) => bereich.projekte);

  document.querySelector('[data-slot="index"]').innerHTML = renderIndex(alle);
  setze(
    'arbeiten-note',
    `${alle.length} Arbeiten aus ${bereiche.length} Bereichen, neueste zuerst. Jede Zeile führt zur Arbeit.`,
  );
  document.querySelector('[data-slot="areas"]').innerHTML = renderAreas(bereiche);
  document.querySelector('[data-slot="vorgehen"]').innerHTML = renderVorgehen(ueber.vorgehen);

  initScroll();
  initProgressBar();
  initCursor();
  initVorschau();
  revealFade();

  // Der einzige Einstieg, der von selbst laeuft: die Zeilen des
  // Verzeichnisses kommen nach dem Kopf herein, einmal, kurz.
  if (!prefersReducedMotion) {
    gsap.from('.index__row', {
      opacity: 0,
      y: 10,
      duration: 0.5,
      stagger: 0.035,
      delay: 0.2,
      ease: 'power2.out',
    });
  }
}

main();
