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

  const leftovers = pool.filter((item) => !used.has(item.src));
  if (leftovers.length > 0) {
    chapters.push({
      title: 'Weiteres Material',
      text: 'Diese Dateien sind noch keinem Kapitel zugeordnet. Trag sie in src/data/ beim passenden Kapitel unter `files` ein.',
      items: leftovers,
      docs: [],
      isLeftover: true,
    });
  }

  return chapters;
}
