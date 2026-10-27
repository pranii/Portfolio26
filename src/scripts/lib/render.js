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

function imageTag(image, sizes, { lazy = true, modus = passung(image) } = {}) {
  const full = esc(asset(image.src));
  const thumb = esc(asset(image.thumb ?? image.src));

  // Gefuellte Kacheln zeigen den vorbereiteten Ausschnitt, eingepasste
  // das ganze Bild. Die Lightbox oeffnet in beiden Faellen das Original.
  const quelle = modus === 'fill' ? esc(asset(cropSrc(image))) : thumb;
  const srcset =
    modus === 'fill'
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
export function renderCard(project, category, index = 0) {
  const media = mediaFor(project.slug);
  const cover = coverFor(project, media);
  const steps = project.chapters?.length ?? 0;
  const bilder = media.images.length;
  const videos = media.videos.length;

  const zahlen = [
    `${steps} ${steps === 1 ? 'Schritt' : 'Schritte'}`,
    bilder > 0 ? `${bilder} Bilder` : null,
    videos > 0 ? `${videos} ${videos === 1 ? 'Video' : 'Videos'}` : null,
  ]
    .filter(Boolean)
    .join(' · ');

  const modus = cover ? passung(cover) : 'fill';
  const bild = cover
    ? imageTag(cover, '(max-width: 700px) 85vw, 26rem', { modus })
    : `<span class="card__placeholder">${esc(project.title)}</span>`;

  const tags = (project.tags ?? [])
    .slice(0, 3)
    .map((tag) => `<li>${esc(tag)}</li>`)
    .join('');

  return `
    <li class="carousel__slide">
      <a class="card" href="projekt.html?id=${esc(category)}/${esc(project.slug)}" data-cursor="Ansehen" draggable="false">
        <span class="card__media card__media--${modus}">${bild}</span>
        <span class="card__top">
          <span class="card__num">${nummer(index)}</span>
          ${project.year ? `<span class="card__year">${esc(project.year)}</span>` : ''}
        </span>
        <span class="card__body">
          <span class="card__title">${esc(project.title)}</span>
          <span class="card__sub">${esc(project.subtitle ?? '')}</span>
          ${project.role ? `<span class="card__role"><span class="card__label">Rolle</span> ${esc(kurz(project.role))}</span>` : ''}
          ${tags ? `<ul class="card__tags">${tags}</ul>` : ''}
        </span>
        <span class="card__foot">
          <span class="card__meta">${zahlen}</span>
          <span class="card__go" aria-hidden="true">Ansehen →</span>
        </span>
      </a>
    </li>`;
}

export function renderCards(projects, category) {
  return projects.map((project, i) => renderCard(project, category, i)).join('');
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

/**
 * Software eines Bereichs. Die Zahl dahinter zaehlt, in wie vielen Projekten
 * des Bereichs das Programm unter `tools` steht — so belegt die Seite selbst,
 * wo es zum Einsatz kam.
 */
export function renderSoftware(software = [], projects = []) {
  return software
    .map((name) => {
      const n = projects.filter((p) =>
        (p.tools ?? []).some((tool) => tool.toLowerCase() === name.toLowerCase()),
      ).length;
      const beleg =
        n > 0 ? `<span class="skill__count">${n} ${n === 1 ? 'Projekt' : 'Projekte'}</span>` : '';
      return `<li class="skill"><span class="skill__name">${esc(name)}</span>${beleg}</li>`;
    })
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
        <button class="figure__button" type="button" data-full="${esc(asset(item.src))}" data-cursor="Vergrössern"
                aria-label="Bild ${i + 1} von ${items.length} vergrössern">
          ${imageTag(item, sizes, { modus })}
        </button>
      </figure>`;
  });

  const knopf = kuerzen
    ? `<button class="more" type="button" data-more>Alle ${items.length} Dateien zeigen <span aria-hidden="true">↓</span></button>`
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
  const adressen = (Array.isArray(embed) ? embed : [embed]).filter(Boolean);
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
function einbettung(url) {
  const yt = url.match(
    /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?v=|embed\/|shorts\/|live\/))([\w-]{6,})/,
  );
  if (yt) {
    return {
      src: `https://www.youtube-nocookie.com/embed/${yt[1]}`,
      hoch: url.includes('/shorts/'),
    };
  }

  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)(?:\/(\w+))?/);
  if (vimeo) {
    const schluessel = vimeo[2] ? `?h=${vimeo[2]}` : '';
    return { src: `https://player.vimeo.com/video/${vimeo[1]}${schluessel}`, hoch: false };
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

function renderStep(chapter, index, total, poster) {
  const weit = WEITE_LAYOUTS.has(chapter.layout);
  return `
    <section class="step">
      <div class="step__head">
        <p class="step__num">Schritt ${index + 1} von ${total}</p>
        <h2 class="step__title">${esc(chapter.title)}</h2>
        <p class="step__text">${esc(chapter.text)}</p>
        ${downloadLinks(chapter.docs)}
      </div>
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

function factList(project) {
  const rows = [
    ['Jahr', project.year],
    ['Meine Rolle', project.role],
    ['Mitwirkende', project.client],
    ['Werkzeuge', project.tools?.join(', ')],
  ].filter(([, value]) => value);

  if (rows.length === 0) return '';
  return `<dl class="facts">${rows
    .map(
      ([key, value]) => `<div class="facts__row"><dt>${esc(key)}</dt><dd>${esc(value)}</dd></div>`,
    )
    .join('')}</dl>`;
}

export function renderProjectPage(project, categoryTitle) {
  const media = mediaFor(project.slug);
  const chapters = groupIntoChapters(project, media);
  const cover = coverFor(project, media);
  const poster = cover?.src;

  const tags = project.tags?.length
    ? `<ul class="tags">${project.tags.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>`
    : '';

  const steps = chapters
    .map((chapter, i) => renderStep(chapter, i, chapters.length, poster))
    .join('');

  // Kurzes Inhaltsverzeichnis, damit man den Aufbau sofort sieht.
  const ablauf = chapters
    .map((chapter, i) => `<li><span class="ablauf__num">${i + 1}</span> ${esc(chapter.title)}</li>`)
    .join('');

  return `
    <header class="project-head">
      <p class="project-head__kicker">${esc(categoryTitle)}</p>
      <h1 class="project-head__title">${esc(project.title)}</h1>
      <p class="project-head__sub">${esc(project.subtitle ?? '')}</p>
      <div class="project-head__grid">
        <div>
          <p class="project-head__text">${esc(project.description)}</p>
          ${tags}
        </div>
        <div>
          ${factList(project)}
        </div>
      </div>
      ${
        project.prototyp
          ? `<p class="play"><a class="play__button" href="#prototyp" data-cursor="Ansehen">▶ ${esc(project.prototyp.label)}</a></p>`
          : ''
      }
      ${
        project.spielbar
          ? `<p class="play"><a class="play__button" href="${esc(project.spielbar.href)}" data-cursor="Spielen">▶ ${esc(project.spielbar.label)}</a>
             <span class="play__note">Läuft direkt im Browser, kein Download nötig.</span></p>`
          : ''
      }
      ${
        project.extern
          ? `<p class="play"><a class="play__button" href="${esc(project.extern.href)}" target="_blank" rel="noopener" data-cursor="Öffnen">${esc(project.extern.label)} ↗</a>
             <span class="play__note">${esc(project.extern.note ?? '')}</span></p>`
          : ''
      }
      ${
        cover
          ? `<figure class="project-head__cover project-head__cover--${passung(cover)}">
               ${imageTag(cover, '100vw', { lazy: false })}
             </figure>`
          : ''
      }
      <nav class="ablauf" aria-label="Aufbau des Projekts">
        <p class="ablauf__label">So ist das Projekt entstanden</p>
        <ol class="ablauf__list">${ablauf}</ol>
      </nav>
    </header>
    <div class="steps">${steps}</div>`;
}

/** Zaehlt Bilder, Videos und Schritte fuer die Bereichskarten. */
export function countMedia(projects) {
  return projects.reduce(
    (sum, project) => {
      const media = mediaFor(project.slug);
      sum.images += media.images.length;
      sum.videos += media.videos.length;
      sum.chapters += project.chapters?.length ?? 0;
      return sum;
    },
    { images: 0, videos: 0, chapters: 0 },
  );
}
