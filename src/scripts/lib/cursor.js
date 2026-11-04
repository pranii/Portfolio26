/**
 * Eigener Mauszeiger: ein Bit, sonst nichts.
 *
 * Kein weiches Nachziehen, keine Groessenwechsel, keine Beschriftung —
 * der Punkt sitzt genau dort, wo der Zeiger ist. Beim Druecken wird er
 * negativ. Auf Touch-Geraeten und bei "weniger Bewegung" bleibt der
 * Systemzeiger.
 */

import { isTouch, prefersReducedMotion } from './scroll.js';

export function initCursor() {
  if (isTouch || prefersReducedMotion) return;

  const cursor = document.createElement('div');
  cursor.className = 'cursor';
  document.body.appendChild(cursor);

  window.addEventListener(
    'pointermove',
    (event) => {
      cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
    },
    { passive: true },
  );

  window.addEventListener('pointerdown', () => cursor.classList.add('is-down'));
  window.addEventListener('pointerup', () => cursor.classList.remove('is-down'));
  // Verlaesst der Zeiger das Fenster mit gedrueckter Taste, bleibt er
  // sonst negativ haengen.
  window.addEventListener('pointercancel', () => cursor.classList.remove('is-down'));
  window.addEventListener('blur', () => cursor.classList.remove('is-down'));
}
