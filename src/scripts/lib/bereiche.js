/**
 * Die Datendatei zu jedem Bereich. Wird nur geladen, wenn man den Bereich
 * oeffnet — so muss die Startseite nicht alle Projekte mitschleppen.
 *
 * Neuer Bereich: Datei in src/data/ anlegen, hier eintragen, in
 * src/data/site.js unter `categories` ergaenzen und eine HTML-Seite dazu.
 */
export const LOADERS = {
  'creative-technology': () => import('../../data/creative-technology.js'),
  film: () => import('../../data/film.js'),
  game: () => import('../../data/game.js'),
  kommunikationsdesign: () => import('../../data/kommunikationsdesign.js'),
};
