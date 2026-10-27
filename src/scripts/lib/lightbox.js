/**
 * Grossansicht fuer Bilder.
 * Bedienung: Klick auf ein Bild, danach Pfeiltasten oder die Knoepfe,
 * Escape oder Klick daneben schliesst wieder.
 */

import { gsap, stopScroll, startScroll } from './scroll.js';
import { t } from './i18n.js';

export function initLightbox(selector = '[data-full]') {
  const box = document.createElement('div');
  box.className = 'lightbox';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.setAttribute('aria-label', t('galerie.grossansicht'));
  box.innerHTML = `
    <img alt="">
    <button class="lightbox__close" type="button">${t('galerie.schliessen')}</button>
    <button class="lightbox__nav" data-dir="prev" type="button" aria-label="${t('galerie.vorheriges')}">←</button>
    <button class="lightbox__nav" data-dir="next" type="button" aria-label="${t('galerie.naechstes')}">→</button>
    <p class="lightbox__counter"></p>
  `;
  document.body.appendChild(box);

  const image = box.querySelector('img');
  const counter = box.querySelector('.lightbox__counter');
  let items = [];
  let current = 0;
  let lastFocused = null;

  /** Nach dem Einblenden weiterer Bilder erneut aufsammeln. */
  function collect() {
    items = [...document.querySelectorAll(selector)].filter((el) => !el.closest('.is-hidden'));
  }

  function show(index) {
    current = (index + items.length) % items.length;
    const source = items[current];
    image.src = source.dataset.full;
    image.alt = source.querySelector('img')?.alt ?? '';
    counter.textContent = `${current + 1} / ${items.length}`;
    gsap.fromTo(
      image,
      { opacity: 0, scale: 0.985 },
      { opacity: 1, scale: 1, duration: 0.35, ease: 'power3.out' },
    );
  }

  function open(element) {
    collect();
    const index = items.indexOf(element);
    if (index === -1) return;
    lastFocused = document.activeElement;
    box.classList.add('is-open');
    stopScroll();
    show(index);
    box.querySelector('.lightbox__close').focus();
  }

  function close() {
    box.classList.remove('is-open');
    startScroll();
    lastFocused?.focus();
  }

  // Ein Zuhoerer fuer die ganze Seite — funktioniert auch fuer Bilder,
  // die erst spaeter eingeblendet werden.
  document.addEventListener('click', (event) => {
    const trigger = event.target.closest(selector);
    if (trigger && !box.contains(trigger)) open(trigger);
  });

  box.addEventListener('click', (event) => {
    if (event.target === box) close();
    const nav = event.target.closest('.lightbox__nav');
    if (nav) show(current + (nav.dataset.dir === 'next' ? 1 : -1));
    if (event.target.closest('.lightbox__close')) close();
  });

  document.addEventListener('keydown', (event) => {
    if (!box.classList.contains('is-open')) return;
    if (event.key === 'Escape') close();
    if (event.key === 'ArrowRight') show(current + 1);
    if (event.key === 'ArrowLeft') show(current - 1);
  });

  document.addEventListener('gallery:expanded', collect);
  collect();
}
