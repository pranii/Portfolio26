/**
 * Verteilt die Medien eines Projekts auf seine Kapitel.
 *
 * Zuordnung ueber Dateinamen-Anfaenge: `files: ['visitenkarte']` sammelt
 * visitenkarte-01 bis visitenkarte-08 ein, in der Reihenfolge, in der die
 * Praefixe stehen. Was in keinem Kapitel landet, kommt in ein letztes
 * Kapitel, damit nichts unbemerkt verschwindet.
 *
 * Bewusst frei von DOM und JSON-Import, damit auch scripts/check-content.mjs
 * dieselbe Logik pruefen kann.
 */

/** "/media/arbeit/huginn/storyboard-04.webp" -> "storyboard-04" */
export function basename(src) {
  return src
    .split('/')
    .pop()
    .replace(/\.[^.]+$/, '');
}

export function groupIntoChapters(project, media) {
  const pool = [
    ...media.images.map((m) => ({ ...m, kind: 'image' })),
    ...media.videos.map((m) => ({ ...m, kind: 'video' })),
    ...(project.extraVideos ?? []).map((src) => ({ src, kind: 'video' })),
  ];

  const used = new Set();
  const chapters = (project.chapters ?? []).map((chapter) => {
    const items = [];

    for (const prefix of chapter.files ?? []) {
      for (const item of pool) {
        if (used.has(item.src)) continue;
        if (!basename(item.src).startsWith(prefix)) continue;
        used.add(item.src);
        items.push(item);
      }
    }

    const docs = media.docs.filter((doc) =>
      (chapter.files ?? []).some((prefix) => basename(doc.src).startsWith(prefix)),
    );

    return { ...chapter, items, docs };
  });

  // Das Titelbild (`cover`) zaehlt als verwendet, auch wenn es in keinem
  // Kapitel auftaucht — es ist schon oben auf der Projektseite zu sehen.
  if (project.cover) {
    const coverItem = pool.find((item) => basename(item.src).startsWith(project.cover));
    if (coverItem) used.add(coverItem.src);
  }

  // Was in keinem Kapitel landet, wird nicht gezeigt.
  //
  // Frueher gab es dafuer ein Sammelkapitel "Weiteres Material". Das hat die
  // Projektseiten zugemuellt: unsortierte Reste standen gleichberechtigt neben
  // den kuratierten Schritten. Eine Portfolioseite soll zeigen, was gezeigt
  // werden soll — nicht alles, was zufaellig im Ordner liegt.
  //
  // Verschwiegen wird trotzdem nichts: `npm run check` listet jede nicht
  // zugeordnete Datei auf, damit nichts unbemerkt untergeht.
  return chapters;
}

/** Dateien, die in keinem Kapitel vorkommen — nur fuer die Pruefung. */
export function findeNichtZugeordnet(project, media) {
  const chapters = groupIntoChapters(project, media);
  const verwendet = new Set(chapters.flatMap((c) => c.items.map((i) => i.src)));
  if (project.cover) {
    const treffer = media.images.find((i) => basename(i.src).startsWith(project.cover));
    if (treffer) verwendet.add(treffer.src);
  }
  return [...media.images, ...media.videos].filter((i) => !verwendet.has(i.src));
}
