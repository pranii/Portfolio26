/**
 * HEFT — ein PDF zum Durchblaettern.
 *
 * Zwei Betriebsarten:
 *
 *   modus: 'einzeln'  Eine Seite liegt da, das Blatt dreht sich ueber die
 *                     ganze Breite. So werden alle PDFs der Seite gezeigt:
 *                     Berichte, Pitches, Flyer.
 *   modus: 'heft'     Zwei Seiten nebeneinander wie in einem aufgeschlagenen
 *                     Heft. Dafuer gebaut: Rreth 02, ein Magazin im
 *                     Querformat A5. Jedes der dreissig Bilder im PDF ist
 *                     eine einzelne Seite, aufgeschlagen liegen immer zwei
 *                     davon nebeneinander, vorne und hinten je eine allein:
 *
 *   zu       Seite 1 rechts (die Vorderseite), links liegt nichts
 *   offen    Seite 2 und 3, dann 4 und 5, und so weiter
 *   zu       Seite 30 links (die Rueckseite), rechts liegt nichts
 *
 * Gezaehlt wird deshalb nicht in Seiten, sondern in Blaettern — wie im
 * Heft. Ein Blatt traegt zwei Seiten: vorn eine ungerade, hinten die
 * gerade danach. Das erste Blatt ist der Umschlag (Seite 1 vorn, Seite 2
 * hinten), das letzte traegt hinten die Rueckseite. Aus der Zahl der
 * umgeschlagenen Blaetter ergibt sich beides von selbst:
 *
 *   linke Seite  = Rueckseite des zuletzt umgeschlagenen Blattes
 *   rechte Seite = Vorderseite des naechsten Blattes
 *
 * Auf schmalen Bildschirmen passen zwei Querformat-Seiten nicht
 * nebeneinander. Dort liegt auch im Heft-Modus nur eine Seite da, und es
 * wird Seite fuer Seite geblaettert statt Blatt fuer Blatt.
 */

const DAUER = 620; // Millisekunden fuer eine Drehung
const KURVE = 'cubic-bezier(0.35, 0, 0.2, 1)';
const SCHMAL = '(max-width: 48rem)';

/**
 * @param {HTMLElement} wurzel   Das Element, in dem das Heft liegt.
 * @param {Array<{src: string, width?: number, height?: number}>} seiten
 *        Die Seiten des PDFs, der Reihe nach.
 * @param {(text: string) => void} melde  Schreibt in die Statuszeile.
 * @param {{modus?: 'heft'|'einzeln', leiste?: boolean, titel?: string}} optionen
 */
export function startMagazin(wurzel, seiten, melde = () => {}, optionen = {}) {
  if (seiten.length === 0) {
    wurzel.innerHTML = '<p class="buch__leer">Keine Seiten gefunden.</p>';
    return {};
  }

  const heftModus = optionen.modus === 'heft';
  const eigeneLeiste = optionen.leiste !== false;
  const titel = optionen.titel ?? 'Seite';

  // Bei ungerader Seitenzahl bleibt die Rueckseite des letzten Blattes leer.
  const blaetter = Math.ceil(seiten.length / 2);

  let blatt = 0; // umgeschlagene Blaetter, 0 bis blaetter
  let seitenNr = 1; // gezeigte Seite, nur im Einzelmodus
  let einzeln = !heftModus;
  let dreht = false;

  // Das Seitenverhaeltnis einer Seite steuert die Hoehe — es steht in
  // media.json bei jedem gerenderten PDF-Bild.
  const erste = seiten[0];
  if (erste.width && erste.height) {
    wurzel.style.setProperty('--blatt-ratio', (erste.width / erste.height).toFixed(4));
  }

  wurzel.innerHTML = `
    <div class="buch" data-rolle="buch">
      <div class="buch__paar" data-rolle="paar">
        <div class="buch__seite buch__seite--links" data-rolle="feld-links">
          <img class="buch__bild" data-rolle="links" alt="" />
        </div>
        <div class="buch__seite buch__seite--rechts" data-rolle="feld-rechts">
          <img class="buch__bild" data-rolle="rechts" alt="" />
        </div>
        <div class="buch__bund" data-rolle="bund" aria-hidden="true"></div>

        <!-- Das Blatt, das sich dreht. Liegt nur waehrend der Bewegung oben. -->
        <div class="buch__blatt" data-rolle="blatt" aria-hidden="true" hidden>
          <div class="buch__flaeche buch__flaeche--vorn">
            <img class="buch__bild" data-rolle="vorn" alt="" />
          </div>
          <div class="buch__flaeche buch__flaeche--hinten">
            <img class="buch__bild" data-rolle="hinten" alt="" />
          </div>
          <div class="buch__schatten" data-rolle="schatten"></div>
        </div>
      </div>
    </div>
    ${
      eigeneLeiste
        ? `<div class="buch__leiste">
            <button class="buch__knopf" type="button" data-rolle="zurueck" aria-label="Zurückblättern">◀</button>
            <span class="buch__zaehler" data-rolle="zaehler" aria-live="polite"></span>
            <button class="buch__knopf" type="button" data-rolle="vor" aria-label="Weiterblättern">▶</button>
          </div>`
        : ''
    }`;

  const teil = (rolle) => wurzel.querySelector(`[data-rolle="${rolle}"]`);
  const buch = teil('buch');
  const paar = teil('paar');
  const bund = teil('bund');
  const feldLinks = teil('feld-links');
  const feldRechts = teil('feld-rechts');
  const links = teil('links');
  const rechts = teil('rechts');
  const blattEl = teil('blatt');
  const vorn = teil('vorn');
  const hinten = teil('hinten');
  const schatten = teil('schatten');

  /** Seitenzahlen ab 1; 0 heisst: auf dieser Seite liegt nichts. */
  const linkeSeite = (b) => (b === 0 ? 0 : Math.min(2 * b, seiten.length));
  const rechteSeite = (b) => (b >= blaetter ? 0 : 2 * b + 1);
  const bild = (nummer) => seiten[nummer - 1]?.src ?? '';

  function benennung() {
    if (einzeln) {
      if (heftModus && seitenNr === 1) return 'Vorderseite';
      if (heftModus && seitenNr === seiten.length) return 'Rückseite';
      return `${titel} ${seitenNr} von ${seiten.length}`;
    }
    if (blatt === 0) return 'Vorderseite';
    if (blatt >= blaetter) return 'Rückseite';
    return `${titel} ${linkeSeite(blatt)} und ${rechteSeite(blatt)}`;
  }

  /** Setzt ein Seitenfeld auf eine Seitenzahl — oder leert es. */
  function setze(feld, img, nummer, was) {
    feld.classList.toggle('buch__seite--leer', nummer === 0);
    if (nummer === 0) {
      img.removeAttribute('src');
      img.alt = '';
      return;
    }
    img.src = bild(nummer);
    img.alt = `Rreth 02, ${was} ${nummer} von ${seiten.length}`;
  }

  function zeige() {
    const l = einzeln ? 0 : linkeSeite(blatt);
    const r = einzeln ? seitenNr : rechteSeite(blatt);

    setze(feldLinks, links, l, 'linke Seite');
    setze(feldRechts, rechts, r, einzeln ? 'Seite' : 'rechte Seite');

    paar.classList.toggle('buch__paar--einzeln', einzeln);
    // Liegt nur eine Seite da, rueckt das Heft in die Mitte.
    paar.classList.toggle('buch__paar--nach-links', !einzeln && l === 0);
    paar.classList.toggle('buch__paar--nach-rechts', !einzeln && r === 0);
    bund.hidden = einzeln || l === 0 || r === 0;

    const zaehler = teil('zaehler');
    if (zaehler) zaehler.textContent = benennung();

    melde(benennung().toUpperCase());
    wurzel.dispatchEvent(
      new CustomEvent('magazin:seite', {
        detail: { name: benennung(), von: seiten.length },
        bubbles: true,
      }),
    );
    vorladen(1);
    vorladen(-1);
  }

  /** Was als Naechstes drankommt, schon einmal holen. */
  function vorladen(richtung) {
    if (einzeln) {
      const nummer = seitenNr + richtung;
      if (nummer >= 1 && nummer <= seiten.length) new Image().src = bild(nummer);
      return;
    }
    const b = blatt + richtung;
    if (b < 0 || b > blaetter) return;
    for (const nummer of [linkeSeite(b), rechteSeite(b)]) {
      if (nummer) new Image().src = bild(nummer);
    }
  }

  /** Dreht sich das Blatt, oder wird nur umgeschaltet? */
  function kannDrehen() {
    if (typeof blattEl.animate !== 'function') return false;
    return !window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
  }

  /**
   * Die Drehung selbst. `vorwaerts` bestimmt die Richtung, `vornNr` und
   * `hintenNr` die beiden Seiten des Blattes. Fehlt die Rueckseite, ist
   * das Blatt ab neunzig Grad einfach weg — so wird im Einzelmodus und
   * am Umschlag geblaettert.
   */
  async function drehe({ vorwaerts, vornNr, hintenNr }) {
    vorn.src = bild(vornNr || hintenNr);
    hinten.src = bild(hintenNr || vornNr);
    blattEl.classList.toggle('buch__blatt--ohne-rueckseite', !hintenNr || !vornNr);

    blattEl.hidden = false;
    const drehung = blattEl.animate(
      [
        { transform: `rotateY(${vorwaerts ? 0 : -180}deg)` },
        { transform: `rotateY(${vorwaerts ? -180 : 0}deg)` },
      ],
      { duration: DAUER, easing: KURVE, fill: 'forwards' },
    );
    schatten.animate([{ opacity: 0 }, { opacity: 0.45 }, { opacity: 0 }], {
      duration: DAUER,
      easing: 'linear',
    });

    await drehung.finished.catch(() => {});
    drehung.cancel();
    blattEl.hidden = true;
  }

  /**
   * Umblaettern. `richtung` ist 1 (weiter) oder -1 (zurueck).
   * Aufgeschlagen wandert ein ganzes Blatt, einzeln eine Seite.
   */
  async function blaettern(richtung) {
    if (dreht) return;
    const vorwaerts = richtung === 1;

    if (einzeln) {
      const ziel = seitenNr + richtung;
      if (ziel < 1 || ziel > seiten.length) return;
      dreht = true;
      if (kannDrehen()) {
        // Unter dem Blatt liegt schon die Seite, die danach dasteht.
        setze(feldRechts, rechts, ziel, 'Seite');
        await drehe({ vorwaerts, vornNr: vorwaerts ? seitenNr : ziel, hintenNr: 0 });
      }
      seitenNr = ziel;
      zeige();
      dreht = false;
      return;
    }

    const ziel = blatt + richtung;
    if (ziel < 0 || ziel > blaetter) return;
    dreht = true;

    if (kannDrehen()) {
      // Vorn liegt die rechte Seite des Blattes, hinten die linke dahinter.
      const vornNr = vorwaerts ? rechteSeite(blatt) : rechteSeite(ziel);
      const hintenNr = vorwaerts ? linkeSeite(ziel) : linkeSeite(blatt);

      // Darunter liegt schon, was nach der Drehung stehen bleibt.
      if (vorwaerts) setze(feldRechts, rechts, rechteSeite(ziel), 'rechte Seite');
      else setze(feldLinks, links, linkeSeite(ziel), 'linke Seite');

      await drehe({ vorwaerts, vornNr, hintenNr });
    }

    blatt = ziel;
    seitenNr = rechteSeite(blatt) || linkeSeite(blatt);
    zeige();
    dreht = false;
  }

  // ── Bedienung ──

  // Klick auf die rechte Haelfte blaettert vor, auf die linke zurueck.
  // Nach einem Wisch kommt noch ein Klick hinterher — der wird uebergangen.
  let gewischt = false;

  buch.addEventListener('click', (ereignis) => {
    if (gewischt) {
      gewischt = false;
      return;
    }
    const kasten = paar.getBoundingClientRect();
    blaettern(ereignis.clientX - kasten.left > kasten.width / 2 ? 1 : -1);
  });

  // Wischen auf dem Handy.
  let startX = null;
  buch.addEventListener(
    'pointerdown',
    (ereignis) => {
      startX = ereignis.clientX;
    },
    { passive: true },
  );
  buch.addEventListener(
    'pointerup',
    (ereignis) => {
      if (startX === null) return;
      const weg = ereignis.clientX - startX;
      startX = null;
      if (Math.abs(weg) <= 40) return;
      gewischt = true;
      blaettern(weg < 0 ? 1 : -1);
    },
    { passive: true },
  );

  // Schmale Bildschirme zeigen eine Seite statt zwei. Im Einzelmodus ist
  // das ohnehin so, dort braucht es die Abfrage nicht.
  const schmal = heftModus ? window.matchMedia?.(SCHMAL) : null;
  if (schmal) {
    einzeln = schmal.matches;
    seitenNr = rechteSeite(blatt) || linkeSeite(blatt);
    schmal.addEventListener?.('change', (ereignis) => {
      einzeln = ereignis.matches;
      // Beim Wechsel bleibt stehen, was gerade zu sehen war.
      if (!einzeln) blatt = Math.floor(seitenNr / 2);
      zeige();
    });
  }

  if (eigeneLeiste) {
    teil('vor')?.addEventListener('click', () => blaettern(1));
    teil('zurueck')?.addEventListener('click', () => blaettern(-1));
  }

  zeige();

  return {
    vor: () => blaettern(1),
    zurueck: () => blaettern(-1),
    anzahl: seiten.length,
  };
}
