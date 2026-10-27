/**
 * Setzt die Uebersetzungen aus den Textdateien zu einer Sprache zusammen.
 *
 * Jede Textdatei haelt einen Bereich in allen Sprachen — so stehen die
 * Fassungen desselben Satzes untereinander und lassen sich vergleichen.
 * Hier werden sie nach Sprache sortiert und so geformt, wie lib/i18n.js
 * sie erwartet: { site, kategorien, projekte }.
 *
 * Was fehlt, fehlt einfach — dann bleibt der deutsche Text stehen.
 */

import { allgemein } from './texte/allgemein.js';
import { creativeTechnology } from './texte/creative-technology.js';
import { film } from './texte/film.js';
import { game } from './texte/game.js';
import { kommunikationsdesign } from './texte/kommunikationsdesign.js';

const BEREICHE = [creativeTechnology, film, game, kommunikationsdesign];

export function baue(sprache) {
  const kategorien = {};
  let projekte = {};

  for (const bereich of BEREICHE) {
    const teil = bereich[sprache];
    if (!teil) continue;
    if (teil.kategorie) kategorien[bereich.slug] = teil.kategorie;
    projekte = { ...projekte, ...(teil.projekte ?? {}) };
  }

  return {
    site: allgemein[sprache]?.site ?? {},
    kategorien,
    projekte,
  };
}
