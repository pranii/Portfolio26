/**
 * Die Projektliste — eine Spalte, die von oben nach unten laeuft, wie das
 * Menue eines Nokia 3310. Rechts daneben die Schiene mit dem Schieber.
 *
 * Die Grundlage ist natives Scrollen mit scroll-snap — Wischen, Trackpad und
 * Pfeiltasten funktionieren also ohne eigenen Code. Dazu kommen hier nur:
 * Vor/Zurueck-Knoepfe, Ziehen mit der Maus, Zaehler und Schieber.
 */

import { prefersReducedMotion } from './scroll.js';
import { ton } from './ton.js';

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

  // Zaehler und Schiene sind beide freiwillig — fehlt einer, laeuft der
  // Rest weiter.
  if (total) total.textContent = pad(slides.length);

  // Abstand von einer Karte zur naechsten, Luecke eingerechnet.
  const step = () =>
    slides.length > 1 ? slides[1].offsetTop - slides[0].offsetTop : viewport.clientHeight;
  const max = () => viewport.scrollHeight - viewport.clientHeight;

  function update() {
    const y = viewport.scrollTop;
    const m = max();
    const amEnde = y >= m - 2;

    // Passt alles auf einmal auf den Bildschirm, braucht es keine Steuerung.
    root.classList.toggle('is-static', m <= 2);

    if (current) {
      const index = amEnde ? slides.length - 1 : Math.round(y / step());
      current.textContent = pad(index + 1);
    }
    if (prev) prev.disabled = y <= 2;
    if (next) next.disabled = amEnde;

    if (thumb) {
      const sichtbar = viewport.clientHeight / viewport.scrollHeight;
      const anteil = m > 0 ? y / m : 0;
      thumb.style.height = `${sichtbar * 100}%`;
      thumb.style.transform = `translateY(${anteil * (1 / sichtbar - 1) * 100}%)`;
    }
  }

  prev?.addEventListener('click', () => {
    ton.taste();
    viewport.scrollBy({ top: -step(), behavior });
  });
  next?.addEventListener('click', () => {
    ton.taste();
    viewport.scrollBy({ top: step(), behavior });
  });
  viewport.addEventListener('scroll', update, { passive: true });
  new ResizeObserver(update).observe(viewport);

  // ── Ziehen mit der Maus. Touch und Trackpad scrollen ohnehin nativ. ──
  let start = null;
  let gezogen = false;

  viewport.addEventListener('pointerdown', (event) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    start = { y: event.clientY, scroll: viewport.scrollTop };
    gezogen = false;
  });

  window.addEventListener('pointermove', (event) => {
    if (!start) return;
    const dy = event.clientY - start.y;
    if (!gezogen && Math.abs(dy) < 5) return;
    gezogen = true;
    root.classList.add('is-dragging');
    viewport.scrollTop = start.scroll - dy;
  });

  window.addEventListener('pointerup', () => {
    if (!start) return;
    start = null;
    if (!gezogen) return;

    // Auf die naechste Karte einrasten, danach scroll-snap wieder einschalten.
    const ziel = Math.min(max(), Math.round(viewport.scrollTop / step()) * step());
    viewport.scrollTo({ top: ziel, behavior });
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
