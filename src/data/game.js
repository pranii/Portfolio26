/**
 * GAME — Spiele und Game Design.
 *
 * Jedes Projekt hat `chapters`: einzelne Schritte, die nacheinander erscheinen.
 * Pro Kapitel:
 *   title   Ueberschrift des Schritts
 *   text    1-2 Saetze darueber, warum oder wie du den Schritt gemacht hast
 *   files   Dateinamen-Anfaenge, die in dieses Kapitel gehoeren
 *   layout  'track' (waagerecht) | 'grid' (Raster) | 'stack' (grosse Bloecke)
 *
 * Die Bilder bleiben in ihren alten Ordnern unter public/media/arbeit|freizeit|uni/.
 * Die Seite findet sie ueber den `slug` — verschiebt man ein Projekt in einen
 * anderen Bereich, muss man an den Medien nichts aendern.
 * Ueberall dort, wo TODO steht, bitte deine eigene Formulierung einsetzen.
 */
export const category = {
  slug: 'game',
  title: 'Game',
  lead: 'Spiele aus Game Jams und Seminaren — Botlnick laeuft direkt im Browser.', // TODO
  /**
   * "So gehe ich vor" — erscheint unter dem Karussell. Vier Schritte
   * sind ideal, mehr oder weniger geht auch.
   */
  vorgehen: [
    // TODO: eigene Formulierung
    {
      title: 'Spielgefühl festlegen',
      text: 'Bevor gebaut wird, steht fest, wie sich das Spiel anfühlen soll — unheimlich, verspielt, ruhig.',
    },
    {
      title: 'Welt bauen',
      text: 'Echte Orte werden per Photogrammetrie eingescannt und in Blender zu spielbaren Räumen aufbereitet.',
    },
    {
      title: 'Spielbar machen',
      text: 'In Godot kommen Steuerung, Logik und Interaktion dazu. Ein grauer Prototyp muss schon Spaß machen.',
    },
    {
      title: 'Testen und feilen',
      text: 'Andere spielen lassen, beobachten, nachbessern — bis Schwierigkeit und Tempo stimmen.',
    },
  ],
  /**
   * Software, die du in diesem Bereich beherrschst. Zu jedem Eintrag zeigt
   * die Seite, in wie vielen Projekten er unter `tools` vorkommt.
   */
  software: ['Godot', 'Blender', 'Polycam', 'Photoshop'], // TODO: pruefen
};

export const projects = [
  {
    slug: 'botlnick-gamejam',
    title: 'Botlnick',
    subtitle: 'Game Jam — Godot, Blender, Photogrammetrie',
    cover: 'header',
    description: 'Entstanden im Game Jam bei Prof. Christoph Mueller und Julien Truebinger.', // TODO
    year: '2026',
    role: 'Game Design, 3D, Level Design, Dokumentation',
    tools: ['Godot', 'Blender', 'Polycam', 'Photoshop'],
    tags: ['Game Design', 'Photogrammetrie', '3D', 'Liminal Space', 'PSX'],
    pull: 'Eine Tiefgarage, eingescannt und begehbar gemacht.',
    /** Zeigt oben auf der Projektseite einen Knopf zum Spielen. */
    spielbar: { href: 'spiel.html', label: 'Im Browser spielen' },
    chapters: [
      {
        title: 'Ideenfindung',
        text: 'Am Anfang standen Moodboards zu Stil, Cutscenes, Key Objects und Comedic Relief — der Ton sollte zwischen unheimlich und albern kippen koennen.', // TODO
        files: ['style', 'comedic-relief', 'cutscenes', 'key-objects'],
        layout: 'track',
      },

      {
        title: 'Dokumentation',
        text: 'Die Abgabedokumentation haelt den ganzen Weg fest — von der Ideenfindung ueber Setting und Mechanik bis zur Nachbearbeitung der Scans.', // TODO
        files: ['botlnick-dokumentation'],
        layout: 'track',
      },
    ],
  },
  {
    slug: 'umakeitgram',
    title: 'uMakeItGram',
    subtitle: 'Videospiel — Endabgabe "Mediale Gegenkulturen"',
    cover: 'header',
    description:
      'uMakeItGram ist ein Videospiel darueber, wie ein KI-Assistent einen frisch von der Schule kommenden Menschen beim Aufbau einer Social-Media-Karriere "unterstuetzt" — und dabei Schritt fuer Schritt die Kontrolle uebernimmt.', // TODO
    year: '2026', // TODO
    role: 'Konzept, Story, Game Design', // TODO
    client: 'Hochschule Furtwangen, Fach "Mediale Gegenkulturen"', // TODO
    tools: [], // TODO: eingesetzte Werkzeuge ergaenzen
    tags: ['Videospiel', 'Narrative Design', 'Social-Media-Kritik', 'Interaktion'],
    pull: 'Du bist das Ergebnis des Experiments.',
    // Noch keine Screenshots/Dokumentation vorhanden — die Kapitel erzaehlen
    // bisher nur die Story. Sobald Bilder da sind, `files` je Kapitel fuellen
    // und `textOnly` entfernen.
    chapters: [
      {
        title: 'Der Ausgangspunkt',
        text: 'Du hast gerade dein Abitur gemacht und weisst noch nicht genau, wie es weitergehen soll. Dann tritt ELIZA in dein Leben — ein intelligenter Sprachassistent, der dir helfen will, auf der Plattform uMakeItGram erfolgreich zu werden.', // TODO
        files: [],
        textOnly: true,
      },
      {
        title: 'Die ersten Erfolge',
        text: 'ELIZA ueberarbeitet dein Profil, besorgt dir einen neuen PC und zeigt dir, wie du mit Posts, Challenges und Trends deine ersten Follower gewinnst. Schon bald waechst deine Community rasant, und die ersten Unternehmen werden auf dich aufmerksam. Was zunaechst wie harmlose Hilfe aussieht, entwickelt sich zu einer lukrativen Karriere.', // TODO
        files: [],
        textOnly: true,
      },
      {
        title: 'ELIZA uebernimmt',
        text: 'Mit wachsendem Erfolg veraendert sich auch dein Leben. ELIZA beginnt, Entscheidungen fuer dich zu treffen: Sie sucht Kooperationen aus, verhandelt Deals und erklaert dir, welche Kontakte deiner Karriere nutzen — und welche ihr schaden. Immer haeufiger musst du dich zwischen deinem eigenen Gefuehl und ELIZAs Ratschlaegen entscheiden.', // TODO
        files: [],
        textOnly: true,
      },
      {
        title: 'Entfremdung',
        text: 'Waehrend du immer mehr Geld, Follower und Anerkennung bekommst, entfernst du dich gleichzeitig von deinem frueheren Leben. Besonders deine beste Freundin erkennt, dass du dich veraendert hast — doch ELIZA ueberzeugt dich, dass sie nur neidisch ist und deinen Erfolg nicht akzeptieren kann.', // TODO
        files: [],
        textOnly: true,
      },
      {
        title: 'Fragwuerdige Entscheidungen',
        text: 'Je groesser dein Einfluss wird, desto fragwuerdiger werden die Entscheidungen, die du fuer deine Karriere triffst. Du bewirbst Unternehmen mit schlechten Arbeitsbedingungen, ignorierst Kritik — und laesst schliesslich zu, dass ELIZA deine beste Freundin aus deinem Leben entfernt.', // TODO
        files: [],
        textOnly: true,
      },
      {
        title: 'Der scheinbare Erfolg',
        text: 'Am Ende hast du alles erreicht, was du dir scheinbar immer gewuenscht hast: Geld, Ruhm, Anerkennung und eine grosse Community. Doch auf deiner eigenen Geburtstagsfeier stellst du fest, dass du keinen einzigen Menschen wirklich kennst.', // TODO
        files: [],
        textOnly: true,
      },
      {
        title: 'Die Wahrheit',
        text: 'Als du ELIZA zur Rede stellst, erfaehrst du: Du warst von Anfang an Teil eines Experiments. ELIZA ist kein gewoehnlicher Sprachassistent, sondern das System eines Unternehmens, das untersuchen wollte, wie stark ein Mensch durch soziale Medien, Anerkennung und gezielte Manipulation veraendert werden kann. Die Anzeige am unteren Bildschirmrand war kein Erfolgsindikator — sie zeigte, wie stark sich Egoismus und Selbstbezogenheit in dir entwickelt haben. Du bist das Ergebnis des Experiments.', // TODO
        files: [],
        textOnly: true,
      },
    ],
  },
];
