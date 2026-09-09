/**
 * Einstiegspunkt fuer spiel.html.
 *
 * Das Spiel wird nicht automatisch geladen — 91 MB laedt man niemandem
 * ungefragt herunter. Stattdessen steht erst eine Startkarte da, die sagt,
 * wie gross es ist. Erst nach dem Klick kommt der iframe.
 */

import '../styles/main.css';
import { site, spiel } from '../data/site.js';
import { initScroll, initProgressBar } from './lib/scroll.js';
import { revealFade } from './lib/reveal.js';
import { initCursor } from './lib/cursor.js';
import { initPageTransitions } from './lib/transitions.js';
import { initReadout } from './lib/readout.js';

const fenster = () => document.querySelector('[data-slot="spiel-fenster"]');
const status = (text) => {
  const el = document.querySelector('[data-slot="spiel-status"]');
  if (el) el.textContent = text;
};

function startkarte() {
  return `
    <div class="boot">
      <p class="boot__logo" aria-hidden="true">▚▚▚</p>
      <h2 class="boot__title">${spiel.title}</h2>
      <p class="boot__text">${spiel.beschreibung}</p>
      <button class="boot__start" type="button" data-start>Spiel starten</button>
      <p class="boot__note">
        Lädt einmalig etwa ${spiel.groesseGepacktMB} MB. Läuft in Chrome, Edge und
        Firefox; Safari kann zicken. Am besten mit Tastatur und Maus.
      </p>
    </div>`;
}

function starten() {
  status('Lädt …');
  document.querySelector('[data-slot="spiel-groesse"]').textContent =
    `${spiel.groesseGepacktMB} MB werden übertragen`;

  const rahmen = document.createElement('iframe');
  rahmen.className = 'window__frame';
  rahmen.src = import.meta.env.BASE_URL.replace(/\/$/, '') + spiel.build;
  rahmen.title = `${spiel.title} — spielbare Fassung`;
  rahmen.allow = 'autoplay; fullscreen; gamepad; cross-origin-isolated';
  rahmen.setAttribute('allowfullscreen', '');

  rahmen.addEventListener('load', () => {
    status('Läuft — zum Spielen ins Bild klicken');
    document.querySelector('[data-slot="spiel-groesse"]').textContent =
      'Esc gibt die Maus wieder frei';
  });

  const host = fenster();
  host.innerHTML = '';
  host.appendChild(rahmen);
}

function steuerungstabelle() {
  return spiel.steuerung
    .map(
      ([taste, was]) => `<div class="keys__row"><dt><kbd>${taste}</kbd></dt><dd>${was}</dd></div>`,
    )
    .join('');
}

function uhr() {
  const el = document.querySelector('[data-slot="spiel-uhr"]');
  const tick = () => {
    el.textContent = new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
  };
  tick();
  setInterval(tick, 30_000);
}

function main() {
  document.querySelector('[data-slot="name"]').textContent = site.name;
  document.querySelector('[data-slot="footer-name"]').textContent = site.name;
  document.querySelector('[data-slot="footer-links"]').innerHTML = site.links
    .map((link) => `<a href="${link.href}">${link.label}</a>`)
    .join('');

  document.querySelector('[data-slot="spiel-titel"]').textContent = spiel.title;
  document.querySelector('[data-slot="spiel-text"]').textContent = spiel.beschreibung;
  document.querySelector('[data-slot="steuerung"]').innerHTML = steuerungstabelle();

  if (spiel.build) {
    fenster().innerHTML = startkarte();
    document.querySelector('[data-start]').addEventListener('click', starten, { once: true });
  } else {
    fenster().innerHTML = `
      <div class="boot">
        <h2 class="boot__title">Noch kein Web-Export vorhanden</h2>
        <p class="boot__text">
          Führe <code>npm run export:spiel</code> aus, um das Spiel aus dem
          Godot-Projekt zu bauen. Details stehen in der README.
        </p>
      </div>`;
    status('Kein Build');
  }

  uhr();
  initScroll();
  initPageTransitions();
  initCursor();
  initProgressBar();
  initReadout();
  revealFade();
}

main();
