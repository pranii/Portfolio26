/**
 * ZODIZINE — der Automat im Browser.
 *
 * Uebertragung der Kiosk-Fassung (React + Flask auf einem Raspberry Pi mit
 * 10-Zoll-Touchscreen) auf eine einzelne Seite. Ablauf und Oberflaeche sind
 * dieselben:
 *
 *   Startbild  ->  ENTER BIRTHDAY  ->  Druckvorgang  ->  Zine
 *
 * Was der Browser nicht kann, wird ersetzt:
 *   - Flask + ReportLab + CUPS  ->  das Heft wird im Fenster durchgeblaettert,
 *     der Knopf "DRUCKEN" legt den Bogen in den Druckdialog
 *   - Touchscreen               ->  Maus, Finger oder Pfeiltasten
 *
 * Gerechnet wird wie im Original mit drei Kalendern: chinesischer Zyklus
 * (Mondneujahr), indische Rashi (siderischer Sonnenstand) und keltischer
 * Baumkalender. Die Zeichen stehen in src/data/zodizine.js, die acht
 * Seiten des Hefts als Bilder in public/zodizine/.
 */

import { chinesisch, elemente, indisch, keltisch, zine } from '../../data/zodizine.js';

const MONATE = [
  'Januar',
  'Februar',
  'März',
  'April',
  'Mai',
  'Juni',
  'Juli',
  'August',
  'September',
  'Oktober',
  'November',
  'Dezember',
];

/** Erstes Jahr im Waehler. Davor wird die Neumondrechnung ungenau. */
const JAHR_MIN = 1900;

/** Die Schritte des Druckvorgangs — Text und Dauer in Millisekunden. */
const DRUCK_SCHRITTE = [
  ['READING BIRTHDAY', 600],
  ['CHINESE ZODIAC', 700],
  ['INDIAN ZODIAC', 700],
  ['CELTIC ZODIAC', 700],
  ['BUILDING LAYOUT', 900],
  ['SENDING TO PRINTER', 800],
];

// ───────────────────────── Kalenderrechnung ─────────────────────────

const GRAD = Math.PI / 180;

/** Rest, der auch bei negativen Zahlen positiv bleibt. */
function mod(wert, teiler) {
  return ((wert % teiler) + teiler) % teiler;
}

/**
 * Julianisches Datum des k-ten Neumonds seit dem 6. Januar 2000
 * (Meeus, Astronomical Algorithms, Kapitel 49, ohne die kleinen
 * Planetenglieder — der Fehler bleibt unter zwei Minuten).
 */
function neumond(k) {
  const t = k / 1236.85;
  const t2 = t * t;
  const t3 = t2 * t;
  const t4 = t3 * t;

  let jd =
    2451550.09766 + 29.530588861 * k + 0.00015437 * t2 - 0.00000015 * t3 + 0.00000000073 * t4;

  const e = 1 - 0.002516 * t - 0.0000074 * t2;
  // Mittlere Anomalie der Sonne, des Mondes und der Breitenwinkel.
  const sonne = GRAD * (2.5534 + 29.1053567 * k - 0.0000014 * t2 - 0.00000011 * t3);
  const mond =
    GRAD * (201.5643 + 385.81693528 * k + 0.0107582 * t2 + 0.00001238 * t3 - 0.000000058 * t4);
  const breite =
    GRAD * (160.7108 + 390.67050284 * k - 0.0016118 * t2 - 0.00000227 * t3 + 0.000000011 * t4);
  const knoten = GRAD * (124.7746 - 1.56375588 * k + 0.0020672 * t2 + 0.00000215 * t3);

  jd +=
    -0.4072 * Math.sin(mond) +
    0.17241 * e * Math.sin(sonne) +
    0.01608 * Math.sin(2 * mond) +
    0.01039 * Math.sin(2 * breite) +
    0.00739 * e * Math.sin(mond - sonne) -
    0.00514 * e * Math.sin(mond + sonne) +
    0.00208 * e * e * Math.sin(2 * sonne) -
    0.00111 * Math.sin(mond - 2 * breite) -
    0.00057 * Math.sin(mond + 2 * breite) +
    0.00056 * e * Math.sin(2 * mond + sonne) -
    0.00042 * Math.sin(3 * mond) +
    0.00042 * e * Math.sin(sonne + 2 * breite) +
    0.00038 * e * Math.sin(sonne - 2 * breite) -
    0.00024 * e * Math.sin(2 * mond - sonne) -
    0.00017 * Math.sin(knoten) -
    0.00007 * Math.sin(mond + 2 * sonne);

  return jd;
}

/**
 * Scheinbare Laenge der Sonne in Grad (Meeus, Kapitel 25, Kurzfassung).
 * Genau auf etwa eine Hundertstelgrad — fuer den Tag, auf den ein
 * Sonnenstand faellt, reicht das.
 */
function sonnenlaenge(jd) {
  const t = (jd - 2451545) / 36525;
  const mittel = 280.46646 + 36000.76983 * t + 0.0003032 * t * t;
  const anomalie = GRAD * (357.52911 + 35999.05029 * t - 0.0001537 * t * t);
  const mitte =
    (1.914602 - 0.004817 * t - 0.000014 * t * t) * Math.sin(anomalie) +
    (0.019993 - 0.000101 * t) * Math.sin(2 * anomalie) +
    0.000289 * Math.sin(3 * anomalie);
  return mod(mittel + mitte, 360);
}

/** Julianisches Datum des Mittags eines Kalendertags (Meeus, Kapitel 7). */
function datumZuJd(jahr, monat, tag) {
  let j = jahr;
  let m = monat;
  if (m <= 2) {
    j -= 1;
    m += 12;
  }
  const a = Math.floor(j / 100);
  const b = 2 - a + Math.floor(a / 4);
  return Math.floor(365.25 * (j + 4716)) + Math.floor(30.6001 * (m + 1)) + tag + b - 1524.5 + 0.5;
}

/** Zeitpunkt der Wintersonnenwende (Sonnenlaenge 270 Grad) des Jahres. */
function wintersonnenwende(jahr) {
  let jd = datumZuJd(jahr, 12, 21);
  for (let runde = 0; runde < 8; runde += 1) {
    const abweichung = mod(270 - sonnenlaenge(jd) + 180, 360) - 180;
    jd += abweichung / 0.9856; // die Sonne laeuft rund ein Grad am Tag
  }
  return jd;
}

/**
 * Welcher chinesische Kalendertag ist das? Gezaehlt wird in ganzen Tagen
 * in Ortszeit Peking (UTC+8) — darauf kommt es an: ein Neumond kurz vor
 * Mitternacht gehoert noch zum alten Tag und verschiebt den ganzen Monat.
 */
function tagNummer(jd) {
  return Math.floor(jd + 8 / 24 + 0.5);
}

/** Zeitpunkt des k-ten Neumonds als chinesischer Kalendertag. */
function neumondTag(k) {
  return tagNummer(neumond(k));
}

/** Index des letzten Neumonds, der nicht nach `tag` liegt. */
function neumondIndexBis(tag) {
  let k = Math.floor((tag - 0.5 - 2451550.09766) / 29.530588861);
  while (neumondTag(k) > tag) k -= 1;
  while (neumondTag(k + 1) <= tag) k += 1;
  return k;
}

/**
 * Enthaelt der Mondmonat zwischen den Neumonden k und k+1 einen Zhongqi,
 * also einen der zwoelf Haupt-Sonnenstaende (Vielfache von 30 Grad)?
 * Ein Monat ohne Zhongqi ist der Schaltmonat.
 */
function hatZhongqi(k) {
  const anfang = sonnenlaenge(neumondTag(k) - 0.5 - 8 / 24);
  const ende = sonnenlaenge(neumondTag(k + 1) - 0.5 - 8 / 24);
  return Math.floor(anfang / 30) !== Math.floor(ende / 30);
}

/** Julianisches Datum zurueck in Tag, Monat, Jahr (Meeus, Kapitel 7). */
function jdZuDatum(jd) {
  const z = Math.floor(jd + 0.5);
  const f = jd + 0.5 - z;
  let a = z;
  if (z >= 2299161) {
    const alpha = Math.floor((z - 1867216.25) / 36524.25);
    a = z + 1 + alpha - Math.floor(alpha / 4);
  }
  const b = a + 1524;
  const c = Math.floor((b - 122.1) / 365.25);
  const d = Math.floor(365.25 * c);
  const e = Math.floor((b - d) / 30.6001);
  const tag = Math.floor(b - d - Math.floor(30.6001 * e) + f);
  const monat = e < 14 ? e - 1 : e - 13;
  return { tag, monat, jahr: monat > 2 ? c - 4716 : c - 4715 };
}

/**
 * Chinesisches Neujahr eines Jahres.
 *
 * Nicht "der erste Neumond nach dem 21. Januar" — diese Faustregel liegt
 * in Schaltjahren daneben (1985 etwa um einen ganzen Monat). Es gilt die
 * echte Regel: Der elfte Monat ist der, in den die Wintersonnenwende
 * faellt. Liegen zwischen zwei elften Monaten dreizehn Neumonde, ist einer
 * davon ein Schaltmonat — der erste ohne Zhongqi. Neujahr ist dann der
 * dritte statt des zweiten Neumonds.
 */
export function chinesischesNeujahr(jahr) {
  const elfterVorher = neumondIndexBis(tagNummer(wintersonnenwende(jahr - 1)));
  const elfterNachher = neumondIndexBis(tagNummer(wintersonnenwende(jahr)));

  let versatz = 2;
  if (elfterNachher - elfterVorher === 13) {
    // Der erste Monat ohne Zhongqi ist der Schaltmonat. Liegt er vor dem
    // ersten Monat, rutscht Neujahr um einen Neumond nach hinten.
    for (let i = 1; i <= 12; i += 1) {
      if (!hatZhongqi(elfterVorher + i)) {
        if (i <= 2) versatz = 3;
        break;
      }
    }
  }

  return jdZuDatum(neumondTag(elfterVorher + versatz) - 0.5);
}

/** Liegt [monat, tag] vor dem Neujahrsdatum? */
function vorNeujahr(monat, tag, neujahr) {
  return monat * 100 + tag < neujahr.monat * 100 + neujahr.tag;
}

/** Faellt [monat, tag] in den Zeitraum? `von`/`bis` duerfen den Jahreswechsel ueberspringen. */
function imZeitraum(monat, tag, von, bis) {
  const wert = monat * 100 + tag;
  const anfang = von[0] * 100 + von[1];
  const ende = bis[0] * 100 + bis[1];
  return anfang <= ende ? wert >= anfang && wert <= ende : wert >= anfang || wert <= ende;
}

/**
 * Chinesisches Zeichen samt Wandlungsphase. Das Zeichenjahr beginnt erst
 * mit dem Mondneujahr — wer im Januar geboren ist, gehoert meist noch
 * zum Vorjahr.
 */
export function chinesischesZeichen({ tag, monat, jahr }) {
  const neujahr = chinesischesNeujahr(jahr);
  const zeichenjahr = vorNeujahr(monat, tag, neujahr) ? jahr - 1 : jahr;
  return {
    tier: chinesisch[mod(zeichenjahr - 1900, 12)],
    element: elemente[Math.floor(mod(zeichenjahr - 1900, 10) / 2)],
    polaritaet: mod(zeichenjahr, 2) === 0 ? 'Yang' : 'Yin',
    zeichenjahr,
    neujahr,
  };
}

/** Indisches Zeichen (Rashi). */
export function indischesZeichen({ tag, monat }) {
  return indisch.find((eintrag) => imZeitraum(monat, tag, eintrag.von, eintrag.bis));
}

/** Keltisches Baumzeichen. */
export function keltischesZeichen({ tag, monat }) {
  return keltisch.find((eintrag) => imZeitraum(monat, tag, eintrag.von, eintrag.bis));
}

// ───────────────────────── Kleine Helfer ─────────────────────────

function esc(text) {
  return String(text).replace(
    /[&<>"]/g,
    (zeichen) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[zeichen],
  );
}

function zweistellig(zahl) {
  return String(zahl).padStart(2, '0');
}

/** Tage im Monat, Schaltjahre eingerechnet. */
function tageImMonat(monat, jahr) {
  return new Date(Date.UTC(jahr, monat, 0)).getUTCDate();
}

function datumLang({ tag, monat, jahr }) {
  return `${tag}. ${MONATE[monat - 1]} ${jahr}`;
}

function zeitraumText(eintrag) {
  return `${zweistellig(eintrag.von[1])}.${zweistellig(eintrag.von[0])}. – ${zweistellig(eintrag.bis[1])}.${zweistellig(eintrag.bis[0])}.`;
}

// ───────────────────────── Das Zine ─────────────────────────

/**
 * Baut die acht Seiten des Hefts.
 *
 * Das Heft ist genau so aufgebaut wie das gedruckte: Umschlag, dann zu
 * jedem der drei Zeichen eine Illustration und eine Affirmation, zuletzt
 * die Rueckseite. Die Seiten sind Caras Zeichnungen aus public/zodizine/.
 *
 * `bildunterschrift` steht nur im Fenster unter dem Blatt, nicht im Heft:
 * die deutsche Entsprechung zu dem, was auf der Seite auf Englisch steht.
 */
export function zineSeiten(datum, basis) {
  const chin = chinesischesZeichen(datum);
  const ind = indischesZeichen(datum);
  const kelt = keltischesZeichen(datum);

  const seitenpaar = (system, kennung, eintrag, unterzeile) => [
    {
      bild: `${basis}${system}/${eintrag.datei}-illustration.webp`,
      alt: `${eintrag.name}, gezeichnet — ${eintrag.text}`,
      bildunterschrift: `${kennung} · ${eintrag.name}`,
      unterzeile,
    },
    {
      bild: `${basis}${system}/${eintrag.datei}-affirmation.webp`,
      alt: `${eintrag.name}: ${eintrag.worte.join(', ')}`,
      bildunterschrift: `${kennung} · ${eintrag.name}`,
      unterzeile: eintrag.worte.join(' · '),
    },
  ];

  return [
    {
      bild: `${basis}front.webp`,
      alt: 'Umschlag des ZodiZine: Sonne und Mond, umlaufend die Mondphasen',
      bildunterschrift: 'Umschlag',
      unterzeile: `${zweistellig(datum.tag)} · ${zweistellig(datum.monat)} · ${datum.jahr}`,
    },
    ...seitenpaar(
      'chinesisch',
      'Chinesisch',
      chin.tier,
      `${chin.element.name} · ${chin.polaritaet} · Jahr ${chin.zeichenjahr}`,
    ),
    ...seitenpaar('indisch', 'Indisch', ind, `${ind.deutsch} · ${zeitraumText(ind)}`),
    ...seitenpaar('keltisch', 'Keltisch', kelt, zeitraumText(kelt)),
    {
      bild: `${basis}back.webp`,
      alt: 'Rueckseite des ZodiZine mit Affirmation und Impressum',
      bildunterschrift: 'Rückseite',
      unterzeile: 'Art and illustrations by @caramelizedart',
    },
  ];
}

/**
 * Die acht Seiten auf dem Druckbogen, in der Reihenfolge der Faltanleitung
 * aus dem Projekt: ein Blatt A4 hochkant, zwei Spalten zu vier Feldern.
 * Die Seiten liegen quer — links gegen den Uhrzeigersinn gedreht, rechts
 * im Uhrzeigersinn. Gefuellt wird zeilenweise, also 1/2, 8/3, 7/4, 6/5.
 *
 * Das ist bewusst nicht die uebliche Querformat-Aufteilung: Gefaltet wird
 * nach ZodiZine_FoldingGuide.pdf, und die geht von diesem Bogen aus.
 */
const BOGEN = [
  { seite: 1, drehung: 'links' },
  { seite: 2, drehung: 'rechts' },
  { seite: 8, drehung: 'links' },
  { seite: 3, drehung: 'rechts' },
  { seite: 7, drehung: 'links' },
  { seite: 4, drehung: 'rechts' },
  { seite: 6, drehung: 'links' },
  { seite: 5, drehung: 'rechts' },
];

/** Der Druckbogen: dieselben acht Seiten, aber gefaltet-sortiert. */
function bogenHtml(seiten) {
  return BOGEN.map(
    ({ seite, drehung }) => `
      <div class="zine-bogen__feld zine-bogen__feld--${drehung}">
        <img src="${esc(seiten[seite - 1].bild)}" alt="" />
      </div>`,
  ).join('');
}

// ───────────────────────── Der Automat ─────────────────────────

/**
 * Startet den Automaten in `wurzel`.
 *
 * @param {HTMLElement} wurzel    Der Bildschirm im Fenster.
 * @param {HTMLElement} bogen     Versteckter Druckbogen fuer window.print().
 * @param {string} basis          Pfad zu den Zine-Seiten (public/zodizine/).
 * @param {(text: string) => void} melde  Schreibt in die Statuszeile.
 */
export function startZodiZine(wurzel, bogen, basis, melde = () => {}) {
  const heute = new Date();
  const jahrMax = heute.getFullYear();

  let datum = { tag: 1, monat: 1, jahr: 2000 };
  let spalte = 0; // 0 Tag, 1 Monat, 2 Jahr
  let seiten = [];
  let seite = 0;
  let ausgabe = 0;
  let uhren = [];

  function spaeter(fn, ms) {
    uhren.push(setTimeout(fn, ms));
  }

  function uhrenStoppen() {
    uhren.forEach(clearTimeout);
    uhren = [];
  }

  // ── Zustaende ──

  function zeigeStart() {
    uhrenStoppen();
    melde('BEREIT');
    wurzel.innerHTML = `
      <div class="zodi__screen zodi__screen--start">
        <p class="zodi__marke">${esc(zine.titel)}</p>
        <p class="zodi__claim">${esc(zine.untertitel)}</p>
        <button class="zodi__start" type="button" data-tu="start">TOUCH TO START</button>
        <p class="zodi__hinweis">Im Original ein 10-Zoll-Touchscreen am Raspberry Pi.</p>
      </div>`;
  }

  function zeigeEingabe() {
    uhrenStoppen();
    melde('ENTER BIRTHDAY');
    wurzel.innerHTML = `
      <div class="zodi__screen zodi__screen--eingabe">
        <h2 class="zodi__titel">ENTER BIRTHDAY</h2>
        <div class="zodi__waehler">
          ${['DAY', 'MONTH', 'YEAR'].map((kopf, i) => spalteHtml(kopf, i)).join('')}
        </div>
        <button class="zodi__ok" type="button" data-tu="ok">OK</button>
      </div>`;
  }

  function spalteHtml(kopf, index) {
    const werte = [-1, 0, 1].map((versatz) => wertFuer(index, versatz));
    return `
      <div class="zodi__spalte${index === spalte ? ' is-aktiv' : ''}" data-spalte="${index}">
        <p class="zodi__kopf">${kopf}</p>
        <button class="zodi__pfeil" type="button" data-schritt="${index}:1" aria-label="${kopf} erhöhen">▲</button>
        <div class="zodi__rollen">
          <button class="zodi__wert zodi__wert--vor" type="button" data-schritt="${index}:-1" tabindex="-1">${werte[0]}</button>
          <span class="zodi__wert zodi__wert--jetzt">${werte[1]}</span>
          <button class="zodi__wert zodi__wert--nach" type="button" data-schritt="${index}:1" tabindex="-1">${werte[2]}</button>
        </div>
        <button class="zodi__pfeil" type="button" data-schritt="${index}:-1" aria-label="${kopf} verringern">▼</button>
      </div>`;
  }

  /** Der Wert einer Spalte, um `versatz` Schritte verschoben. */
  function wertFuer(index, versatz) {
    if (index === 0) {
      const tage = tageImMonat(datum.monat, datum.jahr);
      return zweistellig(mod(datum.tag - 1 + versatz, tage) + 1);
    }
    if (index === 1) return zweistellig(mod(datum.monat - 1 + versatz, 12) + 1);
    const spanne = jahrMax - JAHR_MIN + 1;
    return String(mod(datum.jahr - JAHR_MIN + versatz, spanne) + JAHR_MIN);
  }

  function schritt(index, richtung) {
    spalte = index;
    if (index === 0) {
      const tage = tageImMonat(datum.monat, datum.jahr);
      datum.tag = mod(datum.tag - 1 + richtung, tage) + 1;
    } else if (index === 1) {
      datum.monat = mod(datum.monat - 1 + richtung, 12) + 1;
    } else {
      const spanne = jahrMax - JAHR_MIN + 1;
      datum.jahr = mod(datum.jahr - JAHR_MIN + richtung, spanne) + JAHR_MIN;
    }
    // Der 31. ueberlebt den Wechsel in einen kurzen Monat nicht.
    datum.tag = Math.min(datum.tag, tageImMonat(datum.monat, datum.jahr));
    zeigeEingabe();
  }

  function zeigeDruck() {
    uhrenStoppen();
    ausgabe += 1;
    seiten = zineSeiten({ ...datum }, basis);
    bogen.innerHTML = bogenHtml(seiten);
    // Waehrend der Druckvorgang laeuft, sind die acht Seiten schon da —
    // danach soll das Blatt sofort stehen und nicht erst nachladen.
    seiten.forEach(({ bild }) => {
      new Image().src = bild;
    });

    wurzel.innerHTML = `
      <div class="zodi__screen zodi__screen--druck">
        <h2 class="zodi__titel">PRINTING</h2>
        <p class="zodi__datum">${zweistellig(datum.tag)} · ${zweistellig(datum.monat)} · ${datum.jahr}</p>
        <ol class="zodi__log" data-tu="log"></ol>
        <div class="zodi__balken"><span class="zodi__balken-fuell" data-tu="balken"></span></div>
      </div>`;

    const log = wurzel.querySelector('[data-tu="log"]');
    const balken = wurzel.querySelector('[data-tu="balken"]');
    let verstrichen = 0;

    DRUCK_SCHRITTE.forEach(([text, dauer], i) => {
      verstrichen += dauer;
      spaeter(() => {
        log.insertAdjacentHTML('beforeend', `<li>${esc(text)} <span>OK</span></li>`);
        balken.style.width = `${Math.round(((i + 1) / DRUCK_SCHRITTE.length) * 100)}%`;
        melde(`${text} …`);
      }, verstrichen);
    });

    spaeter(zeigeZine, verstrichen + 700);
  }

  function zeigeZine() {
    uhrenStoppen();
    seite = 0;
    melde(`ZINE ${zweistellig(ausgabe)} · ${datumLang(datum)}`);
    zeichneZine();
  }

  function zeichneZine() {
    const blatt = seiten[seite];
    wurzel.innerHTML = `
      <div class="zodi__screen zodi__screen--zine">
        <div class="zodi__blatt">
          <button class="zodi__blaettern" type="button" data-tu="zurueck" aria-label="Seite zurück">◀</button>
          <figure class="zine-seite">
            <img class="zine-seite__bild" src="${esc(blatt.bild)}" alt="${esc(blatt.alt)}" />
          </figure>
          <button class="zodi__blaettern" type="button" data-tu="vor" aria-label="Seite vor">▶</button>
        </div>
        <p class="zodi__unterschrift">
          <span>${esc(blatt.bildunterschrift)}</span>
          <span class="zodi__unterzeile">${esc(blatt.unterzeile)}</span>
        </p>
        <div class="zodi__leiste">
          <span class="zodi__zaehler">SEITE ${seite + 1} / ${seiten.length}</span>
          <button class="zodi__knopf" type="button" data-tu="drucken">DRUCKEN</button>
          <button class="zodi__knopf" type="button" data-tu="nochmal">NOCHMAL</button>
        </div>
      </div>`;
  }

  function blaettern(richtung) {
    seite = mod(seite + richtung, seiten.length);
    zeichneZine();
  }

  // ── Eingaben ──

  wurzel.addEventListener('click', (ereignis) => {
    const ziel = ereignis.target.closest('[data-tu], [data-schritt]');
    if (!ziel) return;
    wurzel.focus({ preventScroll: true });

    if (ziel.dataset.schritt) {
      const [index, richtung] = ziel.dataset.schritt.split(':').map(Number);
      schritt(index, richtung);
      return;
    }

    switch (ziel.dataset.tu) {
      case 'start':
        zeigeEingabe();
        break;
      case 'ok':
        zeigeDruck();
        break;
      case 'vor':
        blaettern(1);
        break;
      case 'zurueck':
        blaettern(-1);
        break;
      case 'drucken':
        melde('DRUCKDIALOG');
        window.print();
        break;
      case 'nochmal':
        zeigeStart();
        break;
    }
  });

  // Die Spalte unter dem Zeiger wird die aktive — wie der Finger auf dem
  // Touchscreen, der die Spalte auswaehlt, die er gerade schiebt.
  wurzel.addEventListener('pointerdown', (ereignis) => {
    const spalteEl = ereignis.target.closest('[data-spalte]');
    if (spalteEl) spalte = Number(spalteEl.dataset.spalte);
  });

  wurzel.addEventListener('keydown', (ereignis) => {
    const taste = ereignis.key;
    const istEingabe = Boolean(wurzel.querySelector('.zodi__waehler'));
    const istZine = Boolean(wurzel.querySelector('.zodi__blatt'));

    if (istEingabe) {
      if (taste === 'ArrowUp' || taste === 'ArrowDown') {
        ereignis.preventDefault();
        schritt(spalte, taste === 'ArrowUp' ? 1 : -1);
      } else if (taste === 'ArrowLeft' || taste === 'ArrowRight') {
        ereignis.preventDefault();
        spalte = mod(spalte + (taste === 'ArrowRight' ? 1 : -1), 3);
        zeigeEingabe();
      } else if (taste === 'Enter' || taste === ' ') {
        ereignis.preventDefault();
        zeigeDruck();
      }
      return;
    }

    if (istZine && (taste === 'ArrowLeft' || taste === 'ArrowRight')) {
      ereignis.preventDefault();
      blaettern(taste === 'ArrowRight' ? 1 : -1);
    } else if (taste === 'Enter' || taste === ' ') {
      ereignis.preventDefault();
      if (!istZine) zeigeEingabe();
    }
  });

  zeigeStart();

  return { zeigeStart };
}
