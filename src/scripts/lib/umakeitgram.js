/**
 * uMakeItGram — das Spiel in der Projektseite.
 *
 * Das Original ist 2023 in Furtwangen als Angular-Anwendung entstanden.
 * Hier laeuft dieselbe Geschichte ohne Angular: ein Bild, ein Text, der
 * sich schreibt, und an den Gabelungen eine Liste zum Auswaehlen.
 * Story und Bilder kommen aus scripts/import-umakeitgram.mjs.
 *
 * Der Balken unten bleibt ohne Beschriftung — im Spiel sieht er aus wie
 * eine Erfolgsanzeige, und erst am Schluss erfaehrt man, was er wirklich
 * gemessen hat. Eine Beschriftung waere der verratene Schluss.
 */

import { ton } from './ton.js';
import { t } from './i18n.js';

/** Millisekunden je Buchstabe — langsam genug zum Mitlesen. */
const TEMPO = 18;

/** Die beiden Schrittnummern, die im Original kein Schritt mehr sind. */
const ENDE = 1000;
const ABSPANN = 1001;

const esc = (text) =>
  String(text).replace(
    /[&<>"]/g,
    (zeichen) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[zeichen],
  );

/**
 * Startet das Spiel in `wurzel`.
 * @param {HTMLElement} wurzel  Der Kasten im Fenster
 * @param {string} basis        Ordner mit den WebP-Bildern, mit Schraegstrich am Ende
 * @param {(text: string) => void} melde  Schreibt in die Statuszeile
 * @returns {Promise<{pause: (ruht: boolean) => void}>}
 */
export async function startUMakeItGram(wurzel, basis, melde = () => {}) {
  const daten = (await import('../../data/umakeitgram.json')).default;

  wurzel.innerHTML = `
    <div class="gram">
      <div class="gram__buehne">
        <img class="gram__bild" alt="" />
        <div class="gram__kasten" hidden></div>
      </div>
      <div class="gram__unten">
        <p class="gram__text"></p>
        <ul class="gram__wahl" hidden></ul>
      </div>
      <div class="gram__balken"><span class="gram__fuellung"></span></div>
    </div>`;

  const bild = wurzel.querySelector('.gram__bild');
  const kasten = wurzel.querySelector('.gram__kasten');
  const text = wurzel.querySelector('.gram__text');
  const wahl = wurzel.querySelector('.gram__wahl');
  const fuellung = wurzel.querySelector('.gram__fuellung');

  let nummer = null; // null = Startbild, sonst Schrittnummer oder ENDE/ABSPANN
  let wert = daten.start;
  let geschrieben = 0;
  let uhr = null;
  let ruht = false;

  const url = (kennung) => `${basis}${kennung}.webp`;
  const schritt = () => (typeof nummer === 'number' ? daten.schritte[nummer] : null);

  /** Laedt ein Bild im Voraus, damit beim Weitergehen nichts flackert. */
  function vorladen(kennung) {
    if (kennung) new Image().src = url(kennung);
  }

  function zeigeBalken() {
    const anteil = Math.max(0, Math.min(100, (wert / daten.hoechstwert) * 100));
    fuellung.style.width = `${anteil}%`;
  }

  /** Der Text schreibt sich Buchstabe fuer Buchstabe. */
  function schreibe(inhalt) {
    clearInterval(uhr);
    geschrieben = 0;
    text.textContent = '';
    if (!inhalt) return;

    uhr = setInterval(() => {
      if (ruht) return;
      geschrieben += 1;
      text.textContent = inhalt.slice(0, geschrieben);
      // Nicht jeder Buchstabe piept — das waere ein Maschinengewehr.
      if (geschrieben % 4 === 0) ton.taste();
      if (geschrieben >= inhalt.length) clearInterval(uhr);
    }, TEMPO);
  }

  const fertigGeschrieben = () => geschrieben >= (schritt()?.text?.length ?? 0);

  /** Bringt den Text sofort zu Ende, statt auf die Schreibmaschine zu warten. */
  function sofortFertig() {
    const jetzt = schritt();
    if (!jetzt) return;
    clearInterval(uhr);
    geschrieben = jetzt.text.length;
    text.textContent = jetzt.text;
  }

  function zeichneWahl(zeilen) {
    wahl.innerHTML = zeilen
      .map(
        (zeile, i) =>
          `<li><button class="gram__knopf" type="button" data-wahl="${i}">${esc(zeile.text)}</button></li>`,
      )
      .join('');
    wahl.hidden = false;
    zeilen.forEach((zeile) => vorladen(daten.schritte[zeile.weiter]?.bild));
  }

  /** Zeichnet den Schritt, auf dem wir gerade stehen. */
  function zeichne() {
    kasten.hidden = true;
    wahl.hidden = true;
    wahl.innerHTML = '';

    if (nummer === null) {
      bild.src = url(daten.startbild);
      text.textContent = t('gram.start');
      melde(t('gram.status.weiter'));
      return;
    }

    if (nummer === ENDE) {
      // Der Balken entscheidet, welcher Schluss kommt: hoch ist schlecht.
      bild.src = url(wert >= daten.schwelle ? daten.enden.schlecht : daten.enden.gut);
      text.textContent = '';
      melde(t('gram.status.weiter'));
      ton.ende();
      return;
    }

    if (nummer === ABSPANN) {
      bild.src = url(daten.enden.schluss);
      text.textContent = t('gram.nochmal');
      melde(t('gram.status.ende'));
      return;
    }

    const jetzt = schritt();
    bild.src = url(jetzt.bild);

    if (jetzt.kasten) {
      // Im Original legt sich der Text als Kasten ueber das Bild.
      kasten.textContent = jetzt.text;
      kasten.hidden = false;
      text.textContent = '';
      melde(t('gram.status.weiter'));
      vorladen(daten.schritte[jetzt.weiter]?.bild);
      return;
    }

    schreibe(jetzt.text);

    if (jetzt.wahl) {
      zeichneWahl(jetzt.wahl);
      melde(t('gram.status.waehlen'));
    } else {
      melde(t('gram.status.weiter'));
      vorladen(daten.schritte[jetzt.weiter]?.bild);
    }
  }

  /** Ein Schritt weiter — oder, wenn der Text noch laeuft, erst den Text fertig. */
  function weiter() {
    if (nummer === null) {
      nummer = 0;
      wert = daten.start;
      zeigeBalken();
      ton.auswahl();
      zeichne();
      return;
    }

    if (nummer === ABSPANN) {
      nummer = null;
      wert = daten.start;
      zeigeBalken();
      ton.wechsel();
      zeichne();
      return;
    }

    if (nummer === ENDE) {
      nummer = ABSPANN;
      zeichne();
      return;
    }

    const jetzt = schritt();
    if (jetzt.wahl) return; // An einer Gabelung geht es nur ueber die Liste weiter.

    if (!jetzt.kasten && !fertigGeschrieben()) {
      sofortFertig();
      return;
    }

    nummer = jetzt.weiter;
    ton.taste();
    zeichne();
  }

  function entscheide(index) {
    const zeile = schritt()?.wahl?.[index];
    if (!zeile) return;

    wert += zeile.wert;
    zeigeBalken();
    ton.auswahl();
    nummer = zeile.weiter;
    zeichne();
  }

  // Ein Klick auf Bild oder Text geht weiter, ein Klick auf die Liste waehlt.
  wurzel.addEventListener('click', (ereignis) => {
    const knopf = ereignis.target.closest('[data-wahl]');
    if (knopf) {
      entscheide(Number(knopf.dataset.wahl));
      return;
    }
    if (!ereignis.target.closest('.gram__wahl')) weiter();
  });

  // Tastatur, solange das Fenster den Fokus hat: Pfeile durch die Liste,
  // Enter oder Leertaste weiter.
  wurzel.addEventListener('keydown', (ereignis) => {
    const knoepfe = [...wurzel.querySelectorAll('[data-wahl]')];

    if (knoepfe.length && (ereignis.key === 'ArrowDown' || ereignis.key === 'ArrowUp')) {
      ereignis.preventDefault();
      const jetzt = knoepfe.indexOf(document.activeElement);
      const schrittweite = ereignis.key === 'ArrowDown' ? 1 : -1;
      const ziel = (jetzt + schrittweite + knoepfe.length) % knoepfe.length;
      knoepfe[ziel].focus();
      ton.taste();
      return;
    }

    if (ereignis.key === 'Enter' || ereignis.key === ' ') {
      if (document.activeElement?.dataset?.wahl !== undefined) return; // Der Knopf klickt selbst.
      ereignis.preventDefault();
      weiter();
    }
  });

  zeigeBalken();
  zeichne();
  vorladen(daten.schritte[0]?.bild);

  return {
    /** Haelt die Schreibmaschine an, solange das Fenster nicht im Bild ist. */
    pause(soll) {
      ruht = soll;
    },
  };
}
