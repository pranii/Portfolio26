/**
 * Baut die HTML-Bausteine der Seite.
 *
 * Die Seite hat drei Ebenen:
 *   1. Startseite      — die Bereiche als Kacheln
 *   2. Uebersicht      — alle Projekte eines Bereichs als Karten
 *   3. Projektseite    — ein Projekt, Schritt fuer Schritt
 *
 * Pro Schritt werden hoechstens VORSCHAU_BILDER Bilder gezeigt, der Rest
 * kommt erst auf Knopfdruck. So bleibt eine Seite ueberschaubar, auch wenn
 * ein Projekt hundert Dateien hat.
 */

import mediaIndex from '../../data/media.json';
import { groupIntoChapters, basename } from './chapters.js';
import { aufbauSvg } from './aufbau.js';
import { t } from './i18n.js';

const THUMB_WIDTH = 720;
const VORSCHAU_BILDER = 6;

const esc = (value = '') =>
  String(value).replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
  );

/**
 * Macht aus einem absoluten Medienpfad einen, der auch in einem
 * Unterverzeichnis funktioniert.
 *
 * Auf GitHub Pages liegt die Seite unter /<repo-name>/ — ein Pfad wie
 * "/media/..." zeigt dort an der Seite vorbei. `import.meta.env.BASE_URL`
 * kennt dieses Praefix; Vite setzt es beim Bauen ein. Lokal ist es "/",
 * dann aendert sich nichts.
 */
export function asset(pfad = '') {
  if (!pfad.startsWith('/')) return pfad;
  return import.meta.env.BASE_URL.replace(/\/$/, '') + pfad;
}

/**
 * media.json ist noch nach den alten Ordnern (arbeit, freizeit, uni) sortiert,
 * die Bereiche der Seite sind andere. Deshalb wird ueber den Slug gesucht —
 * der ist ueber alle Bereiche hinweg eindeutig.
 */
const mediaBySlug = Object.assign({}, ...Object.values(mediaIndex ?? {}));

export function mediaFor(slug) {
  return mediaBySlug[slug] ?? { images: [], videos: [], docs: [] };
}

/** Titelbild: das in `cover` genannte, sonst das erste Bild des Projekts. */
export function coverFor(project, media) {
  if (project.cover) {
    const hit = media.images.find((image) => basename(image.src).startsWith(project.cover));
    if (hit) return hit;
  }
  return media.images[0] ?? null;
}

/**
 * Entscheidet, ob ein Bild die Kachel fuellen darf oder eingepasst wird.
 *
 * Alle Kacheln haben dasselbe Seitenformat (3:2). Ein Foto darf man dafuer
 * beschneiden — bei einem Plakat, einem Logo oder einer Magazinseite waere
 * das dagegen eine Falschaussage ueber die Arbeit. Deshalb entscheidet das
 * Seitenverhaeltnis: Was ungefaehr ins Format passt, wird gefuellt, alles
 * andere bekommt Luft ringsum.
 */
function passung(image) {
  const r = (image.width ?? 3) / (image.height ?? 2);
  return r >= 1.15 && r <= 2.2 ? 'fill' : 'fit';
}

/** Der 3:2-Ausschnitt, den scripts/make-crops.mjs erzeugt hat. */
function cropSrc(image) {
  return image.src.endsWith('.webp') ? image.src.replace(/\.webp$/, '-crop.webp') : image.src;
}

function imageTag(image, sizes, { lazy = true, modus = passung(image), ganzesBild = false } = {}) {
  const full = esc(asset(image.src));
  const thumb = esc(asset(image.thumb ?? image.src));

  // Gefuellte Kacheln zeigen den vorbereiteten Ausschnitt, eingepasste
  // das ganze Bild. Die Lightbox oeffnet in beiden Faellen das Original.
  const quelle = modus === 'fill' && !ganzesBild ? esc(asset(cropSrc(image))) : thumb;
  const srcset =
    modus === 'fill' && !ganzesBild
      ? `${quelle} 1200w, ${full} ${image.width ?? 1800}w`
      : `${thumb} ${THUMB_WIDTH}w, ${full} ${image.width ?? 1800}w`;

  return `<img
    src="${quelle}"
    srcset="${srcset}"
    sizes="${sizes}"
    alt="${esc(image.alt ?? '')}"
    loading="${lazy ? 'lazy' : 'eager'}"
    decoding="async">`;
}

// ─────────────────────────────────────────────── Ebene 1 + 2: Karten ──

/** Die ersten paar Eintraege einer Komma-Liste — fuer die Kurzinfo auf der Karte. */
function kurz(text = '', anzahl = 3) {
  const teile = text
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  return teile.slice(0, anzahl).join(', ') + (teile.length > anzahl ? ' …' : '');
}

const nummer = (i) => String(i + 1).padStart(2, '0');

/** Karte fuer ein Projekt im Karussell. */
export function renderCard(project, category) {
  const media = mediaFor(project.slug);
  const cover = coverFor(project, media);
  const modus = cover ? passung(cover) : 'fill';
  const bild = cover
    ? imageTag(cover, '(max-width: 700px) 85vw, 26rem', { modus, ganzesBild: true })
    : `<span class="card__placeholder">${esc(project.title)}</span>`;

  const tags = (project.tags ?? [])
    .slice(0, 3)
    .map((tag) => `<li>${esc(tag)}</li>`)
    .join('');

  return `
    <li class="carousel__slide">
      <article class="card">
        <span class="card__media card__media--${modus}">${bild}</span>
        <div class="card__top">
          ${project.year ? `<span class="card__year">${esc(project.year)}</span>` : ''}
        </div>
        <div class="card__body">
          <h3 class="card__title">${esc(project.title)}</h3>
          <p class="card__sub">${esc(project.subtitle ?? '')}</p>
          ${project.role ? `<p class="card__role">${esc(kurz(project.role))}</p>` : ''}
          ${tags ? `<ul class="card__tags">${tags}</ul>` : ''}
        </div>
        <div class="card__foot">
          <a
            class="card__waehlen"
            href="projekt.html?id=${esc(category)}/${esc(project.slug)}"
            data-cursor="${esc(t('karte.ansehen'))}"
          >${esc(t('karte.ansehen'))}</a>
        </div>
      </article>
    </li>`;
}

export function renderCards(projects, category) {
  return projects.map((project) => renderCard(project, category)).join('');
}

/** "So gehe ich vor": nummerierte Schritte eines Bereichs. */
export function renderVorgehen(schritte = []) {
  return schritte
    .map(
      (schritt, i) => `
      <li class="method__step">
        <span class="method__num">${nummer(i)}</span>
        <h3 class="method__title">${esc(schritt.title)}</h3>
        <p class="method__text">${esc(schritt.text)}</p>
      </li>`,
    )
    .join('');
}

/** Die Software eines Bereichs — nur die Namen, ohne Zaehlerei. */
export function renderSoftware(software = []) {
  return software
    .map((name) => `<li class="skill"><span class="skill__name">${esc(name)}</span></li>`)
    .join('');
}

/**
 * Alle Werkzeuge aus allen Projekten, nach Feldern sortiert.
 *
 * Die Zuordnung steht in site.js; was dort fehlt, landet unter "Weiteres"
 * statt unter den Tisch zu fallen — so vergisst die Uebersicht nichts,
 * auch wenn ein Projekt ein neues Programm mitbringt.
 */
export function renderWerkzeuge(felder, projekte) {
  const gefunden = new Map();
  for (const projekt of projekte) {
    for (const name of projekt.tools ?? []) {
      const schluessel = name.toLowerCase();
      if (!gefunden.has(schluessel)) gefunden.set(schluessel, name);
    }
  }

  const vergeben = new Set();
  const gruppen = felder.map(({ titel, werkzeuge }) => {
    const treffer = werkzeuge
      .map((name) => {
        const schluessel = name.toLowerCase();
        if (!gefunden.has(schluessel)) return null;
        vergeben.add(schluessel);
        return gefunden.get(schluessel);
      })
      .filter(Boolean);
    return { titel, treffer };
  });

  const rest = [...gefunden.entries()]
    .filter(([schluessel]) => !vergeben.has(schluessel))
    .map(([, name]) => name)
    .sort((a, b) => a.localeCompare(b, 'de'));
  if (rest.length) gruppen.push({ titel: 'Weiteres', treffer: rest });

  return gruppen
    .filter((gruppe) => gruppe.treffer.length)
    .map(
      (gruppe) => `
      <div class="werkzeuge__feld">
        <h3 class="werkzeuge__titel">${esc(gruppe.titel)}</h3>
        <ul class="werkzeuge__liste">
          ${gruppe.treffer.map((name) => `<li>${esc(name)}</li>`).join('')}
        </ul>
      </div>`,
    )
    .join('');
}

// ──────────────────────────────────────────── Ebene 3: Projektseite ──

function videoBlock(video, poster) {
  const type = video.src.endsWith('.mov') ? 'video/quicktime' : 'video/mp4';
  return `
    <div class="figure figure--wide">
      <video controls playsinline preload="metadata"${poster ? ` poster="${esc(poster)}"` : ''}>
        <source src="${esc(asset(video.src))}" type="${type}">
        Dein Browser kann dieses Video nicht abspielen.
      </video>
    </div>`;
}

/**
 * Galerie eines Schritts. Zeigt zunaechst nur die ersten Bilder,
 * der Rest steckt hinter einem Knopf.
 */
function gallery(items, poster, weit) {
  if (items.length === 0) return '';

  const sizes = weit
    ? '(max-width: 700px) 100vw, 50vw'
    : '(max-width: 700px) 50vw, (max-width: 1100px) 33vw, 25vw';

  // Nur kuerzen, wenn sich das lohnt — zwei Bilder zu verstecken waere albern.
  const kuerzen = items.length > VORSCHAU_BILDER + 2;

  const cells = items.map((item, i) => {
    if (item.kind === 'video') return videoBlock(item, poster);
    const versteckt = kuerzen && i >= VORSCHAU_BILDER ? ' is-hidden' : '';
    const modus = passung(item);
    return `
      <figure class="figure figure--${modus}${versteckt}">
        <button class="figure__button" type="button" data-full="${esc(asset(item.src))}" data-cursor="${esc(t('galerie.vergroessern'))}"
                aria-label="${esc(t('galerie.bildvon', { n: i + 1, m: items.length }))}">
          ${imageTag(item, sizes, { modus })}
        </button>
      </figure>`;
  });

  const knopf = kuerzen
    ? `<button class="more" type="button" data-more>${esc(t('galerie.alle', { n: items.length }))} <span aria-hidden="true">↓</span></button>`
    : '';

  return `<div class="gallery${weit ? ' gallery--wide' : ''}">${cells.join('')}</div>${knopf}`;
}

function downloadLinks(docs) {
  if (docs.length === 0) return '';
  return `<p class="step__downloads">${docs
    .map(
      (doc) =>
        `<a href="${esc(asset(doc.src))}" target="_blank" rel="noopener" data-cursor="PDF">${esc(doc.label)} ↗</a>`,
    )
    .join('')}</p>`;
}

// 'track' und 'stack' aus frueheren Fassungen weiterhin verstehen.
const WEITE_LAYOUTS = new Set(['stack', 'wide']);

/**
 * Reservierter Platz fuer ein Video, das es noch nicht gibt.
 *
 * Es wird trotzdem ein <video> ausgegeben. Liegt die Datei da, spielt sie.
 * Fehlt sie, blendet ein kleines Skript den Rahmen mit dem Dateinamen ein —
 * so muss nichts umgebaut werden, wenn das Video spaeter dazukommt.
 */
function platzhalter(datei, poster) {
  const src = esc(asset(datei));
  return `
    <div class="figure figure--wide slot" data-slot-video>
      <video controls playsinline preload="metadata"${poster ? ` poster="${esc(poster)}"` : ''}>
        <source src="${src}" type="video/mp4">
      </video>
    </div>`;
}

/**
 * Eingebettetes Video von einer fremden Plattform (Vimeo, YouTube).
 *
 * Sinnvoll, wenn die Datei zu gross fuer die eigene Seite waere: Das
 * Storyboard von Art of Peace liegt als 58-MB-Datei vor — eingebettet
 * kostet es die Besucher nichts, solange sie nicht auf Play druecken.
 *
 * `embed: ''` reserviert den Platz: Solange kein Link eingetragen ist,
 * steht dort ein beschrifteter Rahmen. Fehlt das Feld ganz, erscheint
 * gar nichts.
 */
function embedBlock(embed, titel) {
  if (embed === undefined) return '';
  const adressen = (Array.isArray(embed) ? embed : [embed]).filter(
    (eintrag) => eintrag && (typeof eintrag === 'string' || eintrag.url),
  );
  if (adressen.length === 0) return embedPlatzhalter();

  // Hochformatige Videos (Shorts, Reels) stehen nebeneinander statt
  // untereinander — sonst fuellt ein einziges Handyvideo die halbe Seite.
  const bloecke = [];
  let hochformat = [];

  const hochRaus = () => {
    if (hochformat.length === 0) return;
    bloecke.push(`<div class="embeds-hoch">${hochformat.join('')}</div>`);
    hochformat = [];
  };

  adressen.forEach((adresse, i) => {
    const quelle = einbettung(adresse);
    const rahmen = `
      <div class="figure embed${quelle.hoch ? ' embed--hoch' : ' figure--wide'}">
        <iframe
          src="${esc(quelle.src)}"
          title="${esc(titel)}${adressen.length > 1 ? ` (${i + 1} von ${adressen.length})` : ''}"
          loading="lazy"
          allow="autoplay; fullscreen; picture-in-picture"
          allowfullscreen></iframe>
      </div>`;
    if (quelle.hoch) hochformat.push(rahmen);
    else {
      hochRaus();
      bloecke.push(rahmen);
    }
  });

  hochRaus();
  return bloecke.join('');
}

/**
 * Macht aus einem geteilten Link die Adresse, die sich einbetten laesst —
 * damit der Link aus der Adresszeile genuegt und nicht erst umgeschrieben
 * werden muss. Erkannt werden YouTube (auch Shorts und youtu.be), Vimeo
 * (auch die Links mit Freigabe-Schluessel) und Instagram. Alles andere
 * bleibt, wie es ist.
 *
 * YouTube laeuft ueber youtube-nocookie: Das setzt keine Cookies, bevor
 * jemand auf Play drueckt.
 *
 * `hoch` sagt, ob das Video im Hochformat ist.
 */
function einbettung(eintrag) {
  // Ein Eintrag ist entweder der blanke Link oder { url, stumm: true }.
  const url = typeof eintrag === 'string' ? eintrag : eintrag.url;
  const stumm = typeof eintrag === 'object' && eintrag.stumm;

  const yt = url.match(
    /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?v=|embed\/|shorts\/|live\/))([\w-]{6,})/,
  );
  if (yt) {
    // rel=0 haelt die Vorschlaege am Ende beim eigenen Kanal, modestbranding
    // nimmt das Logo aus der Leiste. Ganz ohne Weg zu YouTube geht es nicht:
    // Die Titelzeile des Players bleibt ein Link.
    const schalter = ['rel=0', 'modestbranding=1', 'playsinline=1', stumm ? 'mute=1' : null]
      .filter(Boolean)
      .join('&');
    return {
      src: `https://www.youtube-nocookie.com/embed/${yt[1]}?${schalter}`,
      hoch: url.includes('/shorts/'),
    };
  }

  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)(?:\/(\w+))?/);
  if (vimeo) {
    const teile = [vimeo[2] ? `h=${vimeo[2]}` : null, 'title=0', 'byline=0', 'portrait=0']
      .concat(stumm ? ['muted=1'] : [])
      .filter(Boolean);
    return { src: `https://player.vimeo.com/video/${vimeo[1]}?${teile.join('&')}`, hoch: false };
  }

  const insta = url.match(/instagram\.com\/(reel|p|tv)\/([\w-]+)/);
  if (insta) {
    return { src: `https://www.instagram.com/${insta[1]}/${insta[2]}/embed`, hoch: true };
  }

  return { src: url, hoch: false };
}

/** Reservierter Platz fuer ein Video, das noch nicht eingebettet ist. */
function embedPlatzhalter() {
  return '<div class="figure figure--wide slot is-empty"></div>';
}

function renderStep(chapter, poster) {
  const weit = WEITE_LAYOUTS.has(chapter.layout);
  // Ein Kapitel kann den Prototypen zu sich holen, statt ihn oben auf der
  // Seite stehen zu lassen — dann steht er neben dem Text, zu dem er
  // gehoert. Gefuellt wird die Stelle in project.js.
  return `
    <section class="step"${chapter.prototypHier ? ' data-prototyp-hier' : ''}>
      <div class="step__head">
        <h2 class="step__title">${esc(chapter.title)}</h2>
        <p class="step__text">${esc(chapter.text)}</p>
        ${downloadLinks(chapter.docs)}
      </div>
      ${chapter.aufbau ? aufbauSvg(chapter.aufbau) : ''}
      ${medienBloecke(chapter.items, poster, weit)}
      ${platzhalterBlock(chapter.platzhalter, poster)}
      ${embedBlock(chapter.embed, chapter.title)}
    </section>`;
}

/**
 * Die Medien eines Kapitels, in der Reihenfolge, in der sie zugeordnet sind.
 *
 * Was aus einem PDF gerendert wurde, erkennt man an `fromPdf`. Mehrere
 * Seiten desselben PDFs werden nicht als Bilderreihe gezeigt, sondern als
 * Heft zum Durchblaettern — sonst stuenden dieselben Seiten zweimal da,
 * einmal als Kacheln und einmal im Heft. Hier entsteht nur der Platz
 * dafuer; gefuellt wird er von lib/buecher.js, sobald die Seite steht.
 */
function medienBloecke(items, poster, weit) {
  const bloecke = [];
  let bilder = [];

  const bilderRaus = () => {
    if (bilder.length === 0) return;
    bloecke.push(gallery(bilder, poster, weit));
    bilder = [];
  };

  for (let i = 0; i < items.length; i += 1) {
    const pdf = items[i].fromPdf;
    if (!pdf) {
      bilder.push(items[i]);
      continue;
    }

    // Alle direkt folgenden Seiten desselben PDFs einsammeln.
    let ende = i;
    while (ende + 1 < items.length && items[ende + 1].fromPdf === pdf) ende += 1;
    const seiten = ende - i + 1;

    if (seiten < 2) {
      bilder.push(items[i]);
    } else {
      bilderRaus();
      bloecke.push(buchBlock(items[i], pdf, seiten));
    }
    i = ende;
  }

  bilderRaus();
  return bloecke.join('');
}

/** Der reservierte Platz fuer ein Heft; die Seiten traegt das Skript nach. */
function buchBlock(erste, pdf, seiten) {
  const ratio = erste.width && erste.height ? (erste.width / erste.height).toFixed(4) : '1.4142';
  return `
    <div class="buch-slot" data-buch="${esc(pdf)}" style="--blatt-ratio: ${ratio}">
      <p class="buch__leer">${seiten} Seiten</p>
    </div>`;
}

/** `platzhalter` darf eine einzelne Datei oder mehrere sein (z.B. mehrere angekuendigte Videos). */
function platzhalterBlock(datei, poster) {
  if (!datei) return '';
  const dateien = Array.isArray(datei) ? datei : [datei];
  return dateien.map((d) => platzhalter(d, poster)).join('');
}

/**
 * Die Eckdaten. Das Jahr fehlt hier mit Absicht — es steht ueber dem
 * Titel, wo man es zuerst sucht, und muesste sonst zweimal dastehen.
 */
function factList(project) {
  const rows = [
    [t('fakten.rolle'), project.role],
    [t('fakten.mitwirkende'), project.client],
    [t('fakten.werkzeuge'), project.tools?.join(', ')],
  ].filter(([, value]) => value);

  if (rows.length === 0) return '';
  return `<dl class="facts">${rows
    .map(
      ([key, value]) => `<div class="facts__row"><dt>${esc(key)}</dt><dd>${esc(value)}</dd></div>`,
    )
    .join('')}</dl>`;
}

export function renderProjectPage(project) {
  const media = mediaFor(project.slug);
  const chapters = groupIntoChapters(project, media);
  const cover = coverFor(project, media);
  const poster = cover?.src;

  const tags = project.tags?.length
    ? `<ul class="tags">${project.tags.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>`
    : '';

  const steps = chapters.map((chapter) => renderStep(chapter, poster)).join('');

  // Die Reihenfolge ist die Gewichtung: Titel, dann der eine Satz, der das
  // Projekt traegt, dann worum es geht. Die Eckdaten stehen darunter als
  // ruhige Zeile — sie sollen nachschlagbar sein, nicht um Aufmerksamkeit
  // mit dem Text streiten.
  return `
    <header class="project-head">
      ${project.year ? `<p class="project-head__kicker">${esc(project.year)}</p>` : ''}
      <h1 class="project-head__title">${esc(project.title)}</h1>
      ${project.subtitle ? `<p class="project-head__sub">${esc(project.subtitle)}</p>` : ''}
      ${project.pull ? `<p class="pull">${esc(project.pull)}</p>` : ''}
      <p class="project-head__text">${esc(project.description)}</p>
      ${tags}
      ${factList(project)}
      ${
        project.extern
          ? `<p class="play"><a class="play__button" href="${esc(project.extern.href)}" target="_blank" rel="noopener" data-cursor="${esc(t('karte.oeffnen'))}">${esc(project.extern.label)} ↗</a>
             <span class="play__note">${esc(project.extern.note ?? '')}</span></p>`
          : ''
      }
      ${project.kopfvideo ? embedBlock(project.kopfvideo, project.title) : ''}
    </header>
    <div class="steps">${steps}</div>`;
}
