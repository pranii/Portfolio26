/**
 * Scroll-Grundlage: Lenis (weiches Scrollen) an GSAP ScrollTrigger koppeln.
 * Alles andere im Projekt baut darauf auf.
 */

import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const isTouch = window.matchMedia('(max-width: 860px), (pointer: coarse)').matches;

let lenis = null;

export function initScroll() {
  if (prefersReducedMotion) {
    // Ohne Lenis: natives Scrollen, ScrollTrigger funktioniert trotzdem.
    ScrollTrigger.refresh();
    return null;
  }

  lenis = new Lenis({
    lerp: 0.09,
    wheelMultiplier: 1,
    smoothWheel: true,
    // Auf Touch-Geraeten fuehlt sich natives Scrollen besser an.
    syncTouch: false,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // Ankerlinks durch Lenis leiten, damit der Sprung weich bleibt.
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    lenis.scrollTo(target, { offset: -80, duration: 1.1 });
  });

  return lenis;
}

export function getLenis() {
  return lenis;
}

export function stopScroll() {
  lenis?.stop();
  if (!lenis) document.body.style.overflow = 'hidden';
}

export function startScroll() {
  lenis?.start();
  if (!lenis) document.body.style.overflow = '';
}

/** Duenner Fortschrittsbalken ganz oben. */
export function initProgressBar() {
  const bar = document.querySelector('.progress');
  if (!bar) return;
  gsap.to(bar, {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
  });
}

/**
 * Bilder nach oben laufen lassen, waehrend die Seite scrollt.
 * Erwartet ein Element mit overflow:hidden um das Bild herum.
 */
export function initParallax(selector = '[data-parallax]') {
  if (prefersReducedMotion) return;
  document.querySelectorAll(selector).forEach((el) => {
    const strength = Number(el.dataset.parallax) || 12;
    gsap.fromTo(
      el,
      { yPercent: -strength / 2, scale: 1 + strength / 100 },
      {
        yPercent: strength / 2,
        ease: 'none',
        scrollTrigger: {
          trigger: el.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      },
    );
  });
}

export { gsap, ScrollTrigger };
