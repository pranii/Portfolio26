/**
 * Eigener Cursor: kleiner Punkt, der ueber Links zu einem Kreis mit
 * Beschriftung aufgeht. Auf Touch-Geraeten deaktiviert.
 */

import { gsap, isTouch, prefersReducedMotion } from './scroll.js';

export function initCursor() {
  if (isTouch || prefersReducedMotion) return;

  const cursor = document.createElement('div');
  cursor.className = 'cursor';
  cursor.innerHTML = '<span class="cursor__label"></span>';
  document.body.appendChild(cursor);

  const label = cursor.querySelector('.cursor__label');
  const setX = gsap.quickTo(cursor, 'x', { duration: 0.35, ease: 'power3' });
  const setY = gsap.quickTo(cursor, 'y', { duration: 0.35, ease: 'power3' });

  window.addEventListener('pointermove', (event) => {
    setX(event.clientX);
    setY(event.clientY);
  });

  // data-cursor="Ansehen" auf einem Element setzt die Beschriftung.
  document.addEventListener('pointerover', (event) => {
    const target = event.target.closest('a, button, [data-cursor]');
    if (!target) return;
    cursor.dataset.state = 'link';
    label.textContent = target.dataset.cursor ?? '';
  });

  document.addEventListener('pointerout', (event) => {
    if (event.target.closest('a, button, [data-cursor]')) {
      cursor.dataset.state = '';
      label.textContent = '';
    }
  });
}
