/**
 * Kleine Anzeige am Seitenfuss: Ort, Koordinaten, Ortszeit, Ausgabe.
 *
 * Von henry.codes uebernommen, wo Temperatur und Koordinaten unter dem
 * Namen stehen. Der Effekt: die Seite wirkt wie von einem Menschen an
 * einem bestimmten Ort gepflegt und nicht wie eine Vorlage.
 */

import { site } from '../../data/site.js';

export function initReadout(selector = '[data-slot="readout"]') {
  const host = document.querySelector(selector);
  if (!host) return;

  host.innerHTML = `
    <span class="readout__cell">${site.ort}</span>
    <span class="readout__cell readout__cell--wide">${site.koordinaten}</span>
    <span class="readout__cell"><span data-readout-time>--:--</span> Ortszeit</span>
    <span class="readout__cell readout__cell--version">${site.version}</span>
  `;

  const zeit = host.querySelector('[data-readout-time]');
  const tick = () => {
    zeit.textContent = new Date().toLocaleTimeString('de-DE', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  tick();
  setInterval(tick, 30_000);
}
