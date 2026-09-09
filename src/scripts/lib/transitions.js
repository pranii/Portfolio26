/**
 * Seitenuebergang: beim Klick auf einen internen Link faehrt eine Flaeche
 * hoch, dann wird navigiert. Beim Ankommen faehrt sie wieder weg.
 */

import { gsap, prefersReducedMotion } from './scroll.js';

export function initPageTransitions() {
  const wipe = document.createElement('div');
  wipe.className = 'wipe';
  document.body.appendChild(wipe);

  if (prefersReducedMotion) return;

  // Ankommen
  gsap.fromTo(
    wipe,
    { scaleY: 1, transformOrigin: 'top' },
    { scaleY: 0, duration: 0.7, ease: 'power3.inOut' },
  );

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href]');
    if (!link) return;

    const url = new URL(link.href, location.href);
    const isInternal = url.origin === location.origin;
    const isSamePage = url.pathname === location.pathname && url.hash;

    if (!isInternal || isSamePage || link.target === '_blank' || link.hasAttribute('download'))
      return;
    if (event.metaKey || event.ctrlKey || event.shiftKey) return;

    event.preventDefault();
    gsap.to(wipe, {
      scaleY: 1,
      transformOrigin: 'bottom',
      duration: 0.55,
      ease: 'power3.inOut',
      onComplete: () => {
        location.href = url.href;
      },
    });
  });

  // Zurueck-Button: Browser zeigt die Seite aus dem Cache, Overlay muss weg.
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) gsap.set(wipe, { scaleY: 0 });
  });
}
