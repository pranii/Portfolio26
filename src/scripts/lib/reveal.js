/**
 * Zurueckhaltende Einblende-Effekte.
 *
 * Bewusst wenig: Inhalte fahren beim Hereinscrollen leicht hoch und werden
 * sichtbar. Nichts wird festgehalten, nichts scrollt seitwaerts — die Seite
 * soll sich vorhersehbar verhalten.
 */

import { gsap, prefersReducedMotion } from './scroll.js';

/** Elemente mit [data-fade] beim Laden einblenden. Der Wert ist die Verzoegerung. */
export function revealFade(selector = '[data-fade]') {
  const elements = [...document.querySelectorAll(selector)];
  if (elements.length === 0) return;

  if (prefersReducedMotion) {
    gsap.set(elements, { opacity: 1, y: 0 });
    return;
  }

  elements.forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.8, delay: Number(el.dataset.fade) || 0, ease: 'power3.out' },
    );
  });
}

/** Elemente einblenden, sobald sie in den Blick kommen. */
export function revealOnScroll(selector, { y = 20 } = {}) {
  const elements = [...document.querySelectorAll(selector)];
  if (elements.length === 0) return;

  if (prefersReducedMotion) {
    gsap.set(elements, { opacity: 1, y: 0 });
    return;
  }

  elements.forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      },
    );
  });
}
