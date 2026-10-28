/**
 * Die Prototypen in der Projektseite.
 *
 * Jedes Projekt, das in seiner Datendatei ein `prototyp`-Feld hat, bekommt
 * direkt auf der Projektseite ein Fenster, in dem die Arbeit laeuft — kein
 * Umweg ueber eine eigene Seite:
 *
 *   in-lakech    Das Duell, uebertragen vom Raspberry Pi (lib/inlakech-game.js)
 *   zodizine     Der Zine-Automat mit Caras Seiten (lib/zodizine-automat.js)
 *   magazin      Rreth 02 zum Durchblaettern (lib/magazin.js)
 *   umakeitgram  Das Spiel ohne Angular (lib/umakeitgram.js)
 *   shepard      Der Hoersaal zum Durchlaufen (lib/shepard.js)
 *   nostalgia    Die beiden Monitore mit MediaPipe (lib/nostalgia.js)
 *   botlnick     Der Godot-Export der Tiefgarage
 *
 * Hier steht nur der Rahmen: das Fenster, die Knoepfe darunter und die
 * kurze Bedienungsanleitung. Das eigentliche Stueck Software wird erst
 * geladen, wenn die Seite es wirklich zeigt — deshalb steckt es in einem
 * dynamischen Import und nicht oben im Modulkopf.
 */

import { mediaFor, medienVon } from './render.js';
import { spiel } from '../../data/site.js';
import { t } from './i18n.js';

const esc = (text) =>
  String(text).replace(
    /[&<>"]/g,
    (zeichen) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[zeichen],
  );

/**
 * Fenster mit Titelleiste und Statuszeile — der Rahmen aller Prototypen.
 * `kennung` macht Titel und Statuszeile eindeutig; das braucht nur, wer
 * zwei Fenster nebeneinander stellt.
 */
function fenster({ titel, rechts, koerper, koerperKlasse = '', kennung = 'prototyp' }) {
  return `
    <section class="window" aria-labelledby="${esc(kennung)}-titel">
      <div class="window__bar">
        <span class="window__title" id="${esc(kennung)}-titel">
          <span class="window__icon" aria-hidden="true">▣</span>
          ${esc(titel)}
        </span>
        <span class="window__buttons" aria-hidden="true">
          <span class="window__btn">_</span>
          <span class="window__btn">□</span>
          <span class="window__btn window__btn--close">✕</span>
        </span>
      </div>
      <div class="window__body ${koerperKlasse}">${koerper}</div>
      <div class="window__status">
        <span
          class="window__status-cell window__status-cell--grow"
          data-rolle="status"
          data-status="${esc(kennung)}"
          >Lädt …</span
        >
        <span class="window__status-cell">${esc(rechts)}</span>
      </div>
    </section>`;
}

/** Die Zeile unter dem Fenster — was man dort sieht, nicht wie man es bedient. */
function fuss(hinweis) {
  return hinweis ? `<div class="prototyp__fuss"><p class="section-hint">${hinweis}</p></div>` : '';
}

const BAUPLAN = {
  'in-lakech': () =>
    fenster({
      titel: 'INLAKECH.PY',
      rechts: 'A links · B rechts',
      koerper: `
        <canvas
          class="window__frame duell__canvas"
          data-rolle="duell"
          width="1280"
          height="720"
          role="img"
          aria-label="IN LAK'ECH — zwei Figuren im Duell"
        ></canvas>`,
    }) +
    `
    <div class="duell__keys">
      <button class="duell__key" type="button" data-knopf="A" aria-label="Knopf A, links">A</button>
      <button class="duell__key" type="button" data-knopf="B" aria-label="Knopf B, rechts">B</button>
    </div>`,

  zodizine: () =>
    fenster({
      titel: 'ZODIZINE.APP',
      rechts: 'Raspberry Pi · 1280 × 800',
      koerperKlasse: 'window__body--kiosk',
      koerper: `
        <div
          class="window__frame zodi"
          data-rolle="zodizine"
          tabindex="0"
          role="application"
          aria-label="ZodiZine — Automat"
        ></div>`,
    }) +
    fuss(
      t('prototyp.zodizine', {
        anleitung: `<a href="zodizine/faltanleitung.pdf" target="_blank" rel="noopener">${t(
          'prototyp.zodizine.anleitung',
        )}</a>`,
      }),
    ),

  magazin: ({ pdf }) =>
    fenster({
      titel: 'RRETH02.PDF',
      rechts: 'A5 quer · 30 Seiten',
      koerperKlasse: 'window__body--buch',
      koerper: '<div class="window__frame" data-rolle="magazin"></div>',
    }) +
    `
    <div class="buch__leiste">
      <button class="buch__knopf" type="button" data-rolle="zurueck" aria-label="${t('heft.zurueck')}">
        ◀
      </button>
      <span class="buch__zaehler" data-rolle="zaehler" aria-live="polite"></span>
      <button class="buch__knopf" type="button" data-rolle="vor" aria-label="${t('heft.vor')}">
        ▶
      </button>
    </div>` +
    fuss(
      pdf
        ? t('prototyp.magazin', {
            pdf: `<a href="${esc(pdf)}" target="_blank" rel="noopener">${t('prototyp.magazin.pdf')}</a>`,
          })
        : t('prototyp.magazin.ohnepdf'),
    ),

  umakeitgram: () =>
    fenster({
      titel: 'UMAKEITGRAM.EXE',
      rechts: t('gram.rechts'),
      koerperKlasse: 'window__body--gram',
      koerper: `
        <div
          class="window__frame"
          data-rolle="gram"
          tabindex="0"
          role="application"
          aria-label="uMakeItGram"
        ></div>`,
    }) + fuss(t('prototyp.umakeitgram')),

  // Zwei Messfenster: oben der Eingang, darunter die Liste, die alle
  // 0,4 Sekunden notiert und nur die letzten beiden Eintraege zeigt.
  innerflow: () =>
    `
    <p class="portal__hinweis">${t('if.hinweis')}</p>
    <video class="portal__video" data-rolle="if-video" playsinline muted></video>` +
    fenster({
      titel: 'MIMIK.PY',
      rechts: t('if.rechts.mimik'),
      kennung: 'mimik',
      koerperKlasse: 'window__body--innerflow',
      koerper: `
        <div class="if-eingang">
          <canvas class="if-schirm" data-rolle="if-gesicht" width="320" height="240"
            role="img" aria-label="${t('if.gesicht.alt')}"></canvas>
          <button class="portal__knopf" type="button" data-rolle="if-kamera" aria-pressed="false">
            ${t('if.kameraan')}
          </button>
        </div>
        <ol class="if-liste" data-rolle="if-liste-mimik" aria-live="polite"></ol>`,
    }) +
    fenster({
      titel: 'STIMME.PY',
      rechts: t('if.rechts.stimme'),
      kennung: 'stimme',
      koerperKlasse: 'window__body--innerflow',
      koerper: `
        <div class="if-eingang">
          <canvas class="if-schirm if-schirm--pegel" data-rolle="if-pegel" width="320" height="120"
            role="img" aria-label="${t('if.pegel.alt')}"></canvas>
          <button class="portal__knopf" type="button" data-rolle="if-mikro" aria-pressed="false">
            ${t('if.mikroan')}
          </button>
        </div>
        <ol class="if-liste" data-rolle="if-liste-stimme" aria-live="polite"></ol>`,
    }) +
    fuss(t('prototyp.innerflow')),

  // Der Godot-Export. 46 MB laedt man niemandem ungefragt herunter —
  // deshalb steht erst eine Karte da, die sagt, wie gross es ist.
  botlnick: () =>
    fenster({
      titel: 'BOTLNICK.EXE',
      rechts: t('botlnick.rechts', { mb: spiel.groesseGepacktMB }),
      koerperKlasse: 'window__body--spiel',
      koerper: `
        <div class="boot" data-rolle="botlnick">
          <p class="boot__logo" aria-hidden="true">▚▚▚</p>
          <h3 class="boot__title">${esc(spiel.title)}</h3>
          <p class="boot__text">${esc(spiel.untertitel)}</p>
          <button class="boot__start" type="button" data-rolle="start">
            ${t('botlnick.starten')}
          </button>
          <p class="boot__note">${t('botlnick.hinweis', { mb: spiel.groesseGepacktMB })}</p>
        </div>`,
    }) +
    `
    <dl class="keys">
      ${spiel.steuerung
        .map(
          ([taste, was]) =>
            `<div class="keys__row"><dt><kbd>${esc(taste)}</kbd></dt><dd>${esc(was)}</dd></div>`,
        )
        .join('')}
    </dl>` +
    fuss(t('prototyp.botlnick')),

  // Zwei Fenster: links die beiden Monitore, rechts der Text unter dem
  // Nebel. Beide haengen an derselben Kamera und derselben Erkennung.
  nostalgia: () =>
    `
    <div class="portal__start">
      <div class="portal__knoepfe">
        <button class="portal__knopf" type="button" data-rolle="kamera">
          ${t('portal.kameraan')}
        </button>
        <button class="portal__knopf" type="button" data-rolle="demo">
          ${t('portal.demo')}
        </button>
      </div>
      <p class="portal__hinweis">${t('portal.hinweis')}</p>
      <video class="portal__video" data-rolle="video" playsinline muted></video>
    </div>` +
    fenster({
      titel: 'SCHIRM.TOE',
      rechts: t('portal.rechts.ebenen'),
      kennung: 'ebenen',
      koerperKlasse: 'window__body--portal',
      koerper: `
        <canvas
          class="portal__schirm"
          data-rolle="ebenen"
          width="320"
          height="136"
          role="img"
          aria-label="${t('portal.ebenen.alt')}"
        ></canvas>
        <dl class="portal__werte">
          <div class="portal__wert">
            <dt>${t('portal.imbild')}</dt>
            <dd><span class="portal__lampe" data-wert="imbild" data-an="nein"></span></dd>
          </div>
          <div class="portal__wert">
            <dt>${t('portal.abstand')}</dt>
            <dd><span class="portal__balken" data-wert="abstand"></span></dd>
          </div>
          <div class="portal__wert">
            <dt>${t('portal.aufloesung')}</dt>
            <dd><span class="portal__zahl" data-wert="aufloesung">—</span></dd>
          </div>
        </dl>`,
    }) +
    fenster({
      titel: 'WISCHEN.TOE',
      rechts: t('portal.rechts.wischen'),
      kennung: 'wischen',
      koerperKlasse: 'window__body--portal',
      koerper: `
        <canvas
          class="portal__schirm"
          data-rolle="wischen"
          width="320"
          height="180"
          role="img"
          aria-label="${t('portal.wischen.alt')}"
        ></canvas>`,
    }) +
    fuss(t('prototyp.nostalgia')),

  shepard: () =>
    fenster({
      titel: 'MULTISHEPARD.JS',
      rechts: t('shepard.rechts'),
      koerperKlasse: 'window__body--saal',
      koerper: `
        <div class="window__frame saal" data-rolle="shepard">
          <canvas
            class="saal__plan"
            data-rolle="saal"
            width="240"
            height="200"
            tabindex="0"
            role="application"
            aria-label="${t('shepard.plan')}"
          ></canvas>
          <div class="saal__regler">
            <button class="saal__schalter" type="button" data-rolle="shepard-ton" aria-pressed="false">
              ${t('shepard.an')}
            </button>
            <dl class="saal__werte">
              <div class="saal__wert">
                <dt>${t('shepard.tempo')}</dt>
                <dd><span class="saal__balken" data-wert="tempo"></span></dd>
              </div>
              <div class="saal__wert">
                <dt>${t('shepard.richtung')}</dt>
                <dd><span class="saal__pfeil" data-wert="richtung" data-richtung="halt"></span></dd>
              </div>
              <div class="saal__wert">
                <dt>${t('shepard.laut')}</dt>
                <dd><span class="saal__balken" data-wert="laut"></span></dd>
              </div>
            </dl>
          </div>
        </div>`,
    }) + fuss(t('prototyp.shepard')),
};

/**
 * Der HTML-Block fuer die Projektseite. Leer, wenn das Projekt keinen
 * Prototypen hat oder die Art unbekannt ist.
 */
export function prototypHtml(project) {
  const art = project.prototyp?.art;
  const bauen = BAUPLAN[art];
  if (!bauen) return '';

  return `
    <section class="prototyp" id="prototyp" data-prototyp="${esc(art)}">
      <h2 class="section-title">${esc(project.prototyp.titel ?? 'Prototyp')}</h2>
      ${bauen(quellen(project))}
    </section>`;
}

/** Was der jeweilige Prototyp aus den Projektdaten braucht. */
function quellen(project) {
  if (project.prototyp.art !== 'magazin') return {};
  const { docs } = medienVon(project);
  const pdf = docs.find((doc) => doc.src.includes(project.prototyp.quelle));
  return { pdf: pdf ? basis() + pdf.src.replace(/^\//, '') : null };
}

function basis() {
  return import.meta.env.BASE_URL;
}

/**
 * Startet den Prototypen, nachdem die Projektseite steht.
 * Der Code dafuer wird erst hier geladen.
 */
export async function startPrototyp(project, wurzel) {
  const art = project.prototyp?.art;
  const block = wurzel.querySelector('[data-prototyp]');
  if (!art || !block) return;

  const melde = (text) => {
    const zeile = block.querySelector('[data-rolle="status"]');
    if (zeile) zeile.textContent = text;
  };

  try {
    if (art === 'in-lakech') await startInLakechBlock(block, melde);
    if (art === 'zodizine') await startZodiZineBlock(block, melde);
    if (art === 'magazin') await startMagazinBlock(project, block, melde);
    if (art === 'umakeitgram') await startGramBlock(block, melde);
    if (art === 'shepard') await startShepardBlock(block, melde);
    if (art === 'nostalgia') await startNostalgiaBlock(block);
    if (art === 'botlnick') startBotlnickBlock(block, melde);
    if (art === 'innerflow') await startInnerFlowBlock(block);
  } catch (fehler) {
    melde(`Fehler: ${fehler.message}`);
  }
}

async function startInLakechBlock(block, melde) {
  const { startInLakech } = await import('./inlakech-game.js');
  const { druecke, pause } = await startInLakech(
    block.querySelector('[data-rolle="duell"]'),
    basis() + 'inlakech/',
    melde,
  );
  // pointerdown statt click: reagiert sofort und erlaubt, dass zwei Finger
  // gleichzeitig druecken.
  block.querySelectorAll('[data-knopf]').forEach((knopf) => {
    knopf.addEventListener('pointerdown', (ereignis) => {
      ereignis.preventDefault();
      druecke(knopf.dataset.knopf);
    });
  });

  // Solange das Fenster nicht im Bild ist, ruht das Spiel.
  beobachte(block, (sichtbar) => pause(!sichtbar));
}

/** Ruft `was` mit true/false, sobald das Element ins Bild kommt oder es verlaesst. */
function beobachte(element, was) {
  if (typeof IntersectionObserver !== 'function') {
    was(true);
    return;
  }
  new IntersectionObserver(([eintrag]) => was(eintrag.isIntersecting), { threshold: 0.2 }).observe(
    element,
  );
}

async function startZodiZineBlock(block, melde) {
  const { startZodiZine } = await import('./zodizine-automat.js');
  // Der Druckbogen haengt am Seitenende, nicht im Fenster: Im Druck bleibt
  // nur er stehen, und dafuer darf er nicht im Projekttext liegen.
  const bogen = document.createElement('div');
  bogen.className = 'zine-bogen';
  bogen.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bogen);

  startZodiZine(
    block.querySelector('[data-rolle="zodizine"]'),
    bogen,
    basis() + 'zodizine/',
    melde,
  );
}

async function startGramBlock(block, melde) {
  const { startUMakeItGram } = await import('./umakeitgram.js');
  const spiel = await startUMakeItGram(
    block.querySelector('[data-rolle="gram"]'),
    basis() + 'umakeitgram/',
    melde,
  );

  // Ausser Sicht haelt die Schreibmaschine an, damit man keinen Text verpasst.
  beobachte(block, (sichtbar) => spiel.pause(!sichtbar));
}

/**
 * Der Godot-Export laedt erst nach einem Klick: Das Spiel ist ein paar
 * Dutzend Megabyte gross, und wer die Seite nur liest, soll sie nicht
 * herunterladen.
 */
function startBotlnickBlock(block, melde) {
  const karte = block.querySelector('[data-rolle="botlnick"]');
  if (!spiel.build) {
    melde(t('botlnick.keinbuild'));
    return;
  }

  melde(t('botlnick.bereit'));

  block.querySelector('[data-rolle="start"]').addEventListener(
    'click',
    () => {
      melde(t('portal.laedt'));
      const rahmen = document.createElement('iframe');
      rahmen.className = 'window__frame';
      rahmen.src = basis().replace(/\/$/, '') + spiel.build;
      rahmen.title = spiel.title;
      rahmen.allow = 'autoplay; fullscreen; gamepad; cross-origin-isolated';
      rahmen.setAttribute('allowfullscreen', '');
      rahmen.addEventListener('load', () => melde(t('botlnick.laeuft')));
      karte.replaceWith(rahmen);
    },
    { once: true },
  );
}

async function startInnerFlowBlock(block) {
  const { startInnerFlow } = await import('./innerflow.js');

  const melde = (welches, text) => {
    const zeile = block.querySelector(`[data-status="${welches}"]`);
    if (zeile) zeile.textContent = text;
  };

  const flow = await startInnerFlow(block, melde, {
    kameraan: t('if.kameraan'),
    kameraaus: t('if.kameraaus'),
    mikroan: t('if.mikroan'),
    mikroaus: t('if.mikroaus'),
    aus: t('portal.aus'),
    laedt: t('portal.laedt'),
    misst: t('if.misst'),
    fehler: t('portal.fehler'),
    verweigert: t('portal.verweigert'),
    keingesicht: t('if.keingesicht'),
    stille: t('if.stille'),
    neutral: t('if.neutral'),
    froh: t('if.froh'),
    traurig: t('if.traurig'),
    aerger: t('if.aerger'),
    ueberrascht: t('if.ueberrascht'),
  });

  beobachte(block, (sichtbar) => flow.pause(!sichtbar));
}

async function startNostalgiaBlock(block) {
  const { startNostalgia } = await import('./nostalgia.js');

  // Zwei Fenster, zwei Statuszeilen — jede meldet fuer sich.
  const melde = (welches, text) => {
    const zeile = block.querySelector(`[data-status="${welches}"]`);
    if (zeile) zeile.textContent = text;
  };

  const portal = await startNostalgia(block, melde, {
    kameraan: t('portal.kameraan'),
    kameraaus: t('portal.kameraaus'),
    demo: t('portal.demo'),
    demoaus: t('portal.demoaus'),
    aus: t('portal.aus'),
    laedt: t('portal.laedt'),
    bereit: t('portal.bereit'),
    niemand: t('portal.niemand'),
    erkannt: t('portal.erkannt'),
    wischen: t('portal.wischen.status'),
    fehler: t('portal.fehler'),
    verweigert: t('portal.verweigert'),
    snippets: [t('portal.snippet1'), t('portal.snippet2'), t('portal.snippet3')],
  });

  // Ausser Sicht wird nicht gerechnet — und die Kamera laeuft nicht umsonst.
  beobachte(block, (sichtbar) => portal.pause(!sichtbar));
}

async function startShepardBlock(block, melde) {
  const { startShepard } = await import('./shepard.js');
  const saal = startShepard(block.querySelector('[data-rolle="shepard"]'), melde, {
    an: t('shepard.an'),
    aus: t('shepard.aus'),
    laeuft: t('shepard.laeuft'),
    still: t('shepard.still'),
    keinton: t('shepard.keinton'),
  });

  beobachte(block, (sichtbar) => saal.pause(!sichtbar));
}

async function startMagazinBlock(project, block, melde) {
  const { startMagazin } = await import('./magazin.js');
  const { images } = medienVon(project);
  const seiten = images
    .filter((bild) => bild.fromPdf === project.prototyp.quelle)
    .sort((a, b) => a.page - b.page)
    .map((bild) => ({
      src: basis() + bild.src.replace(/^\//, ''),
      width: bild.width,
      height: bild.height,
    }));

  // Der Zaehler haengt am Ereignis des Hefts und muss stehen, bevor die
  // erste Doppelseite gezeigt wird.
  const zaehler = block.querySelector('[data-rolle="zaehler"]');
  block.addEventListener('magazin:seite', (ereignis) => {
    zaehler.textContent = ereignis.detail.name;
  });

  // Rreth 02 ist ein Heft im Querformat: zwei Seiten nebeneinander, mit
  // Umschlag. Die Blaetterleiste steht hier unter dem Fenster, nicht im Heft.
  const heft = startMagazin(block.querySelector('[data-rolle="magazin"]'), seiten, melde, {
    modus: 'heft',
    leiste: false,
  });

  block.querySelector('[data-rolle="vor"]').addEventListener('click', heft.vor);
  block.querySelector('[data-rolle="zurueck"]').addEventListener('click', heft.zurueck);

  // Pfeiltasten nur, solange das Heft im Bild ist — sonst wuerde es das
  // Blaettern der ganzen Seite stoeren.
  let sichtbar = false;
  beobachte(block, (imBild) => (sichtbar = imBild));

  window.addEventListener('keydown', (ereignis) => {
    if (!sichtbar || ereignis.target.closest('input, textarea')) return;
    if (ereignis.key === 'ArrowRight') {
      ereignis.preventDefault();
      heft.vor();
    } else if (ereignis.key === 'ArrowLeft') {
      ereignis.preventDefault();
      heft.zurueck();
    }
  });
}
