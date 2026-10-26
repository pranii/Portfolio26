/**
 * Waagerechtes Karussell fuer die Projektkarten.
 *
 * Die Grundlage ist natives Scrollen mit scroll-snap — Wischen, Trackpad und
 * Pfeiltasten funktionieren also ohne eigenen Code. Dazu kommen hier nur:
 * Vor/Zurueck-Knoepfe, Ziehen mit der Maus, Zaehler und Fortschrittsbalken.
 */

import { prefersReducedMotion } from './scroll.js';

const pad = (n) => String(n).padStart(2, '0');

export function initCarousel(root) {
  const viewport = root?.querySelector('.carousel__viewport');
  const slides = [...(root?.querySelectorAll('.carousel__slide') ?? [])];
  if (!viewport || slides.length === 0) return;

  const prev = root.querySelector('[data-carousel="prev"]');
  const next = root.querySelector('[data-carousel="next"]');
  const current = root.querySelector('[data-carousel="current"]');
  const total = root.querySelector('[data-carousel="total"]');
  const thumb = root.querySelector('.carousel__thumb');
  const behavior = prefersReducedMotion ? 'auto' : 'smooth';

  total.textContent = pad(slides.length);

  // Abstand von einer Karte zur naechsten, Luecke eingerechnet.
  const step = () =>
    slides.length > 1 ? slides[1].offsetLeft - slides[0].offsetLeft : viewport.clientWidth;
  const max = () => viewport.scrollWidth - viewport.clientWidth;

  function update() {
    const x = viewport.scrollLeft;
    const m = max();
    const amEnde = x >= m - 2;

    // Passt alles auf einmal auf den Bildschirm, braucht es keine Steuerung.
    root.classList.toggle('is-static', m <= 2);

    const index = amEnde ? slides.length - 1 : Math.round(x / step());
    current.textContent = pad(index + 1);
    prev.disabled = x <= 2;
    next.disabled = amEnde;

    const sichtbar = viewport.clientWidth / viewport.scrollWidth;
    const anteil = m > 0 ? x / m : 0;
    thumb.style.width = `${sichtbar * 100}%`;
    thumb.style.transform = `translateX(${anteil * (1 / sichtbar - 1) * 100}%)`;
  }

  prev.addEventListener('click', () => viewport.scrollBy({ left: -step(), behavior }));
  next.addEventListener('click', () => viewport.scrollBy({ left: step(), behavior }));
  viewport.addEventListener('scroll', update, { passive: true });
  new ResizeObserver(update).observe(viewport);

  // ── Ziehen mit der Maus. Touch und Trackpad scrollen ohnehin nativ. ──
  let start = null;
  let gezogen = false;

  viewport.addEventListener('pointerdown', (event) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    start = { x: event.clientX, scroll: viewport.scrollLeft };
    gezogen = false;
  });

  window.addEventListener('pointermove', (event) => {
    if (!start) return;
    const dx = event.clientX - start.x;
    if (!gezogen && Math.abs(dx) < 5) return;
    gezogen = true;
    root.classList.add('is-dragging');
    viewport.scrollLeft = start.scroll - dx;
  });

  window.addEventListener('pointerup', () => {
    if (!start) return;
    start = null;
    if (!gezogen) return;

    // Auf die naechste Karte einrasten, danach scroll-snap wieder einschalten.
    const ziel = Math.min(max(), Math.round(viewport.scrollLeft / step()) * step());
    viewport.scrollTo({ left: ziel, behavior });
    setTimeout(() => root.classList.remove('is-dragging'), prefersReducedMotion ? 0 : 450);
  });

  // Wer gezogen hat, wollte keine Karte oeffnen.
  viewport.addEventListener(
    'click',
    (event) => {
      if (!gezogen) return;
      event.preventDefault();
      event.stopPropagation();
      gezogen = false;
    },
    true,
  );

  update();
}
