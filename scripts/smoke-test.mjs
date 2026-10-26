/**
 * Fuehrt jede Seite in einer simulierten Browser-Umgebung aus und meldet
 * JavaScript-Fehler. Faengt genau die Fehler ab, die man sonst erst im
 * Browser sieht: fehlende Elemente, kaputte Importe, Tippfehler.
 *
 *   node scripts/smoke-test.mjs
 *
 * jsdom hat keine Layout-Engine — Scroll-Animationen laufen hier nicht
 * wirklich. Es geht darum, dass die Seite ohne Fehler aufbaut.
 */

import fs from 'node:fs';
import path from 'node:path';
import esbuild from 'esbuild';
import { JSDOM, VirtualConsole } from 'jsdom';

const ROOT = path.resolve(import.meta.dirname, '..');
const TMP = path.join(ROOT, 'node_modules', '.smoke');

const PAGES = [
  { html: 'index.html', entry: 'src/scripts/main.js', erwartet: '.phone__item' },
  { html: 'creative-technology.html', entry: 'src/scripts/category.js', erwartet: '.card' },
  { html: 'film.html', entry: 'src/scripts/category.js', erwartet: '.card' },
  { html: 'game.html', entry: 'src/scripts/category.js', erwartet: '.card' },
  { html: 'kommunikationsdesign.html', entry: 'src/scripts/category.js', erwartet: '.card' },
  // Die Projektseite liest ihr Projekt aus der Adresse.
  {
    html: 'projekt.html',
    entry: 'src/scripts/project.js',
    erwartet: '.step',
    query: '?id=kommunikationsdesign/handwerkerexperten',
  },
  {
    html: 'projekt.html',
    entry: 'src/scripts/project.js',
    erwartet: '.step',
    query: '?id=creative-technology/rreth',
  },
  {
    html: 'projekt.html',
    entry: 'src/scripts/project.js',
    erwartet: '.step',
    query: '?id=kommunikationsdesign/kamamuta',
  },
  {
    html: 'projekt.html',
    entry: 'src/scripts/project.js',
    erwartet: '.step',
    query: '?id=creative-technology/in-lakech',
  },
  {
    html: 'projekt.html',
    entry: 'src/scripts/project.js',
    erwartet: '.step',
    query: '?id=film/huginn',
  },
  {
    html: 'projekt.html',
    entry: 'src/scripts/project.js',
    erwartet: '.step',
    query: '?id=creative-technology/nostalgia',
  },
  // Falsche Adresse muss sauber abgefangen werden.
  {
    html: 'projekt.html',
    entry: 'src/scripts/project.js',
    erwartet: '.empty',
    query: '?id=film/gibtsnicht',
  },
  { html: 'spiel.html', entry: 'src/scripts/spiel.js', erwartet: '.boot__start' },
  { html: 'inlakech.html', entry: 'src/scripts/inlakech.js', erwartet: '.duell__key' },
];

fs.mkdirSync(TMP, { recursive: true });

/** Module zu einem einzelnen klassischen Skript buendeln — jsdom kann kein ESM. */
function bundle(entry) {
  const result = esbuild.buildSync({
    entryPoints: [path.join(ROOT, entry)],
    bundle: true,
    format: 'iife',
    write: false,
    loader: { '.css': 'text' },
    logLevel: 'error',
    absWorkingDir: ROOT,
    define: { 'import.meta.env.BASE_URL': '"/"' },
  });
  return result.outputFiles[0].text;
}

/** jsdom fehlen ein paar Browser-Bausteine, die GSAP und Lenis erwarten. */
function addShims(window) {
  window.matchMedia ??= (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener() {},
    removeListener() {},
    addEventListener() {},
    removeEventListener() {},
    dispatchEvent: () => false,
  });

  window.ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };

  // jsdom bringt scrollTo mit, wirft aber "Not implemented" — ueberschreiben.
  window.scrollTo = () => {};
  window.scrollBy = () => {};
  window.requestAnimationFrame ??= (cb) => setTimeout(() => cb(Date.now()), 16);
  window.cancelAnimationFrame ??= (id) => clearTimeout(id);
  // jsdom kann nicht zeichnen. Ohne diese Zeile meldet es "Not implemented";
  // das Spiel (inlakech.html) kommt mit `null` zurecht und zeichnet dann nichts.
  window.HTMLCanvasElement.prototype.getContext = () => null;
}

let failed = 0;

for (const page of PAGES) {
  const errors = [];
  const virtualConsole = new VirtualConsole();
  virtualConsole.on('jsdomError', (err) => errors.push(err.message));
  virtualConsole.on('error', (...args) => errors.push(args.join(' ')));

  const dom = new JSDOM(fs.readFileSync(path.join(ROOT, page.html), 'utf8'), {
    url: 'http://localhost:5173/' + page.html + (page.query ?? ''),
    runScripts: 'outside-only',
    pretendToBeVisual: true,
    virtualConsole,
  });

  addShims(dom.window);
  dom.window.addEventListener('error', (event) => errors.push(event.message));
  dom.window.addEventListener('unhandledrejection', (event) =>
    errors.push(String(event.reason?.stack ?? event.reason)),
  );

  try {
    dom.window.eval(bundle(page.entry));
  } catch (err) {
    errors.push(err.stack ?? String(err));
  }

  // Die Kategorieseiten laden ihre Daten per dynamischem import — kurz warten.
  await new Promise((resolve) => setTimeout(resolve, 400));

  const doc = dom.window.document;
  const gefunden = doc.querySelectorAll(page.erwartet).length;
  const sichtbar = doc.querySelectorAll('.figure:not(.is-hidden) [data-full]').length;
  const versteckt = doc.querySelectorAll('.figure.is-hidden').length;
  const emptySlots = [...doc.querySelectorAll('[data-slot]')]
    .filter((el) => el.innerHTML.trim() === '')
    .map((el) => el.dataset.slot);

  const status = errors.length === 0 && gefunden > 0 ? 'OK  ' : 'FEHL';
  if (status === 'FEHL') failed += 1;

  const name = (page.html + (page.query ?? '')).padEnd(38);
  const zusatz =
    sichtbar > 0 ? ` · ${sichtbar} Bilder sichtbar, ${versteckt} hinter dem Knopf` : '';
  console.log(`${status} ${name} ${gefunden}× ${page.erwartet}${zusatz}`);
  if (emptySlots.length) console.log(`     leere Platzhalter: ${emptySlots.join(', ')}`);
  errors.slice(0, 4).forEach((e) => console.log('     ' + e.split('\n')[0]));

  dom.window.close();
}

process.exitCode = failed === 0 ? 0 : 1;
