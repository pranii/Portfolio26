/**
 * Die Sprachen der Seite.
 *
 * Zurzeit laeuft alles auf Deutsch — siehe MEHRSPRACHIG weiter unten.
 * Der Rest dieser Datei beschreibt, wie es wieder angeht.
 *
 * Wie es funktioniert
 * ───────────────────
 * Deutsch ist die Quelle. Alles liegt auf Deutsch in den Datendateien;
 * die Uebersetzungen stehen daneben in src/data/i18n/ und werden
 * darübergelegt. Fehlt eine Uebersetzung, bleibt der deutsche Text
 * stehen — die Seite ist also nie halb leer, nur halb uebersetzt.
 *
 * Die gewaehlte Sprache steht im localStorage und laesst sich auch mit
 * ?lang=en an der Adresse mitgeben. Beim Umschalten wird die Seite neu
 * geladen: Alles wird ohnehin beim Laden aus den Daten gebaut, so bleibt
 * der Code einfach und es kann nichts halb uebersetzt stehenbleiben.
 */

import { SPRACHEN, ui } from '../../data/i18n/ui.js';
import { ton } from './ton.js';

/**
 * Vorerst laeuft die Seite nur auf Deutsch.
 *
 * Die Uebersetzungen bleiben vollstaendig liegen — in src/data/i18n/ und
 * in den ui-Tabellen. Auf `true` gestellt sind Sprachschalter und
 * Overlays sofort wieder da; bis dahin baut die Seite alles aus den
 * deutschen Datendateien, so wie ohne Uebersetzung auch.
 */
const MEHRSPRACHIG = false;

const SPEICHER = 'portfolio-sprache';
const CODES = SPRACHEN.map((s) => s.code);

let aktuell = ermitteln();
let inhalte = null;

function ermitteln() {
  if (!MEHRSPRACHIG) return 'de';

  let gewaehlt = null;
  try {
    gewaehlt =
      new URLSearchParams(window.location.search).get('lang') ?? localStorage.getItem(SPEICHER);
  } catch {
    // Privates Fenster ohne Speicher — dann eben Deutsch.
  }
  return CODES.includes(gewaehlt) ? gewaehlt : 'de';
}

/** Der Code der aktuellen Sprache: 'de', 'en' oder 'sq'. */
export function sprache() {
  return aktuell;
}

/**
 * Ein Text der Oberflaeche. `{name}` darin wird aus `werte` ersetzt.
 * Fehlt der Schluessel in der gewaehlten Sprache, kommt der deutsche.
 */
export function t(schluessel, werte = {}) {
  const text = ui[aktuell]?.[schluessel] ?? ui.de[schluessel] ?? schluessel;
  return String(text).replace(/\{(\w+)\}/g, (ganz, name) =>
    name in werte ? String(werte[name]) : ganz,
  );
}

/** Laedt die Uebersetzung der Inhalte. Vor dem ersten Rendern aufrufen. */
export async function ladeSprache() {
  document.documentElement.lang = aktuell;
  if (aktuell === 'de') return;
  try {
    const modul = await import(`../../data/i18n/${aktuell}.js`);
    inhalte = modul.default ?? null;
  } catch {
    inhalte = null;
  }
}

/** Legt die Uebersetzung eines Projekts ueber das deutsche Original. */
export function uebersetzeProjekt(projekt) {
  const fremd = inhalte?.projekte?.[projekt.slug];
  if (!fremd) return projekt;

  const { kapitel, ...felder } = fremd;
  const chapters = (projekt.chapters ?? []).map((eigenes, i) => ({
    ...eigenes,
    ...(kapitel?.[i] ?? {}),
  }));
  return { ...projekt, ...felder, chapters };
}

/** Dasselbe fuer den Kopf eines Bereichs (Titel, Lead, Vorgehen). */
export function uebersetzeKategorie(kategorie) {
  const fremd = inhalte?.kategorien?.[kategorie.slug];
  if (!fremd) return kategorie;

  const { schritte, ...felder } = fremd;
  const vorgehen = (kategorie.vorgehen ?? []).map((eigenes, i) => ({
    ...eigenes,
    ...(schritte?.[i] ?? {}),
  }));
  return { ...kategorie, ...felder, vorgehen };
}

/** Und fuer die globalen Angaben (Rolle, Intro, Bereichstexte). */
export function uebersetzeSite(site, categories) {
  const fremd = inhalte?.site;
  const uebersetzt = fremd ? { ...site, ...fremd } : site;
  const bereiche = categories.map((bereich) => ({
    ...bereich,
    title: t(`kat.${bereich.slug}`) || bereich.title,
    description: inhalte?.kategorien?.[bereich.slug]?.kurz ?? bereich.description,
  }));
  return { site: uebersetzt, categories: bereiche };
}

/**
 * Setzt die Texte, die fest im HTML stehen:
 *   <h2 data-t="abschnitt.projekte">Projekte</h2>
 *   <nav data-t-label="nav.bereiche">
 */
export function uebersetzeSeite(wurzel = document) {
  wurzel.querySelectorAll('[data-t]').forEach((el) => {
    el.textContent = t(el.dataset.t);
  });
  wurzel.querySelectorAll('[data-t-label]').forEach((el) => {
    el.setAttribute('aria-label', t(el.dataset.tLabel));
  });
  wurzel.querySelectorAll('[data-t-titel]').forEach((el) => {
    el.setAttribute('title', t(el.dataset.tTitel));
  });
}

/**
 * Der Schalter: drei Kuerzel nebeneinander, das gewaehlte invertiert.
 * Haengt sich in die Kopfzeile, auf der Startseite in die Statusleiste.
 */
export function initSprachschalter() {
  if (!MEHRSPRACHIG) return;

  const platz = document.querySelector('.site-header') ?? document.querySelector('.home__status');
  if (!platz || platz.querySelector('.sprachen')) return;

  const liste = document.createElement('nav');
  liste.className = 'sprachen';
  liste.setAttribute('aria-label', t('sprache.wechseln'));
  liste.innerHTML = SPRACHEN.map(
    (s) => `
      <button
        class="sprachen__knopf${s.code === aktuell ? ' is-aktiv' : ''}"
        type="button"
        lang="${s.code}"
        data-sprache="${s.code}"
        aria-label="${s.name}"
        ${s.code === aktuell ? 'aria-current="true"' : ''}
      >${s.kuerzel}</button>`,
  ).join('');

  liste.addEventListener('click', (ereignis) => {
    const code = ereignis.target.closest('[data-sprache]')?.dataset.sprache;
    if (!code || code === aktuell) return;
    ton.wechsel();
    try {
      localStorage.setItem(SPEICHER, code);
    } catch {
      // Ohne Speicher bleibt die Wahl nur fuer diesen Aufruf — dafuer die Adresse.
    }
    const adresse = new URL(window.location.href);
    adresse.searchParams.set('lang', code);
    window.location.href = adresse.toString();
  });

  platz.appendChild(liste);
}
