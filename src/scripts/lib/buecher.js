/**
 * Die Hefte in den Kapiteln.
 *
 * Jedes PDF eines Projekts wird als Heft zum Durchblaettern gezeigt statt
 * als Reihe von Seitenbildern. Den leeren Platz dafuer setzt render.js
 * (`.buch-slot` mit dem Namen des PDFs), die Seiten stehen in media.json —
 * dort traegt jedes gerenderte Bild, aus welchem PDF und von welcher Seite
 * es stammt.
 *
 * Geladen wird das Blaetterwerk erst, wenn eine Seite wirklich eines
 * braucht, und auch dann erst, wenn das Heft ins Bild kommt.
 */

import { mediaFor } from './render.js';

export async function initBuecher(wurzel, slug) {
  const plaetze = [...wurzel.querySelectorAll('[data-buch]')];
  if (plaetze.length === 0) return;

  const { startMagazin } = await import('./magazin.js');
  const { images } = mediaFor(slug);
  const basis = import.meta.env.BASE_URL;

  for (const platz of plaetze) {
    const seiten = images
      .filter((bild) => bild.fromPdf === platz.dataset.buch)
      .sort((a, b) => a.page - b.page)
      .map((bild) => ({
        src: basis + bild.src.replace(/^\//, ''),
        width: bild.width,
        height: bild.height,
      }));

    if (seiten.length < 2) continue;
    platz.innerHTML = '';
    startMagazin(platz, seiten, () => {}, { modus: 'einzeln' });
  }
}
