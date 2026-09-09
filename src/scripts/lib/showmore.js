/**
 * "Alle Dateien zeigen" — blendet die restlichen Bilder eines Schritts ein.
 * Der Knopf steht direkt hinter der Galerie, zu der er gehoert.
 */

import { gsap, ScrollTrigger, prefersReducedMotion } from './scroll.js';

export function initShowMore(selector = '[data-more]') {
  document.querySelectorAll(selector).forEach((button) => {
    button.addEventListener(
      'click',
      () => {
        const gallery = button.previousElementSibling;
        if (!gallery) return;

        const versteckt = [...gallery.querySelectorAll('.is-hidden')];
        versteckt.forEach((el) => el.classList.remove('is-hidden'));
        button.remove();

        if (!prefersReducedMotion) {
          gsap.from(versteckt, {
            opacity: 0,
            y: 20,
            duration: 0.5,
            stagger: 0.03,
            ease: 'power2.out',
          });
        }

        // Die Seite ist gewachsen — Scroll-Trigger neu vermessen und die
        // Lightbox ueber die neuen Bilder informieren.
        ScrollTrigger.refresh();
        document.dispatchEvent(new CustomEvent('gallery:expanded'));
      },
      { once: true },
    );
  });
}
