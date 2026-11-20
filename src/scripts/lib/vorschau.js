/**
 * Die Bildvorschau am Werkverzeichnis.
 *
 * Faehrt der Zeiger ueber eine Zeile, erscheint das Titelbild der
 * Arbeit neben dem Zeiger. Das Verzeichnis bleibt eine Liste — lesbar
 * und schnell zu ueberfliegen —, zeigt aber trotzdem, wie die Arbeit
 * aussieht, bevor man sie oeffnet.
 *
 * Nur mit Maus: auf Tippgeraeten gibt es kein "darueber", und bei
 * "weniger Bewegung" bleibt die Liste ruhig.
 */

import { isTouch, prefersReducedMotion } from './scroll.js';

export function initVorschau(wurzel = document) {
  if (isTouch || prefersReducedMotion) return;

  const zeilen = [...wurzel.querySelectorAll('[data-vorschau]')];
  if (zeilen.length === 0) return;

  const kasten = document.createElement('div');
  kasten.className = 'peek';
  kasten.setAttribute('aria-hidden', 'true');
  const bild = document.createElement('img');
  bild.alt = '';
  bild.decoding = 'async';
  kasten.appendChild(bild);
  document.body.appendChild(kasten);

  // Die Bilder einmal vorladen, damit beim ersten Darueberfahren
  // nichts erst erscheinen muss.
  zeilen.forEach((zeile) => {
    const vor = new Image();
    vor.src = zeile.dataset.vorschau;
  });

  let zielX = 0;
  let zielY = 0;
  let x = 0;
  let y = 0;
  let laeuft = false;

  // Das Bild folgt dem Zeiger mit etwas Nachlauf — es haengt an ihm,
  // klebt aber nicht daran.
  const folge = () => {
    x += (zielX - x) * 0.14;
    y += (zielY - y) * 0.14;
    kasten.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    if (laeuft) requestAnimationFrame(folge);
  };

  const bewege = (ereignis) => {
    const rand = 24;
    zielX = Math.min(ereignis.clientX + rand, window.innerWidth - kasten.offsetWidth - rand);
    zielY = Math.min(
      Math.max(ereignis.clientY - kasten.offsetHeight / 2, rand),
      window.innerHeight - kasten.offsetHeight - rand,
    );
  };

  zeilen.forEach((zeile) => {
    zeile.addEventListener('pointerenter', (ereignis) => {
      if (ereignis.pointerType !== 'mouse') return;
      bild.src = zeile.dataset.vorschau;
      bewege(ereignis);
      // Beim ersten Erscheinen nicht aus der alten Ecke heranfliegen.
      x = zielX;
      y = zielY;
      kasten.classList.add('is-sichtbar');
      if (!laeuft) {
        laeuft = true;
        requestAnimationFrame(folge);
      }
    });

    zeile.addEventListener('pointermove', bewege, { passive: true });

    zeile.addEventListener('pointerleave', () => {
      kasten.classList.remove('is-sichtbar');
      laeuft = false;
    });
  });
}
