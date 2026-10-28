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
    description:
      'Eine echte Tiefgarage, mit Photogrammetrie eingescannt und in Godot begehbar gemacht. ' +
      'Entstanden im Game Jam bei Prof. Christoph Müller und Julien Trübinger.',
    year: '2026',
    role: 'Game Design, 3D, Level Design, Dokumentation',
    tools: ['Godot', 'Blender', 'Polycam', 'Photoshop'],
    tags: ['Game Design', 'Photogrammetrie', '3D', 'Liminal Space', 'PSX'],
    pull: 'Eine Tiefgarage, eingescannt und begehbar gemacht.',
    /** Zeigt oben auf der Projektseite einen Knopf zum Spielen. */
    prototyp: { art: 'botlnick', titel: 'Die Garage betreten' },
    chapters: [
      {
        title: 'Eine Tiefgarage',
        text:
          'Ein Game Jam gibt wenig Zeit und keine Sicherheit. Statt eine Welt zu erfinden, ' +
          'haben wir eine mitgenommen: eine Tiefgarage, eingescannt und begehbar gemacht. ' +
          'Orte wie diese sind Liminal Spaces — man ist dort immer nur auf dem Weg ' +
          'woandershin, nie angekommen. Am Anfang standen Moodboards zu Stil, Cutscenes, Key ' +
          'Objects und Comedic Relief: Der Ton sollte zwischen unheimlich und albern kippen ' +
          'können.',
        files: ['style', 'comedic-relief', 'cutscenes', 'key-objects', 'liminal-space'],
        layout: 'track',
      },
      {
        title: 'Vom Scan zum Raum',
        text:
          'Die Garage kam als Photogrammetrie-Scan aus Polycam und wurde in Blender ' +
          'nachbearbeitet — Löcher schließen, Geometrie reduzieren, bis Godot sie tragen ' +
          'kann. Dazu die Figuren: Haupt- und Nebencharakter, Referenzblätter, das ' +
          'Bühnenbild. Der PSX-Look ist kein Filter, sondern das Ergebnis — niedrige ' +
          'Auflösung und harte Kanten verdecken genau das, was ein Scan nicht hergibt.',
        files: [
          'photogrammetrie-01',
          'photogrammetrie-02',
          'photogrammetrie-03',
          'photogrammetrie-04',
          'photogrammetrie-05',
          'photogrammetrie-06',
          'photogrammetrie-07',
          'stagedesignphotogrammetry',
          'stagedesign',
          'hauptcharacter',
          'nebencharacter',
          'sidecharacter',
          'character-ref-01',
          'character-ref-02',
          'character-ref-03',
          'character-ref-04',
        ],
        layout: 'track',
      },
      {
        title: 'Hineingehen',
        text:
          'Oben auf dieser Seite lässt sich die Garage betreten — WASD zum Gehen, Maus zum ' +
          'Umsehen, Esc gibt den Zeiger wieder frei. Die Dokumentation hält den ganzen Weg ' +
          'fest, von der Ideenfindung über Setting und Mechanik bis zur Nachbearbeitung der ' +
          'Scans.',
        files: [
          'erste-szene-ergebnis',
          'scenerie',
          'screenshot',
          'beginning',
          'gamejamstartscreen',
          'revolution',
          'botlnick-dokumentation',
          'game-studies-gdd-s01',
          'game-studies-gdd-s02',
          'game-studies-gdd-s03',
        ],
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
      'Ein Videospiel darüber, wie ein KI-Assistent einen frisch von der Schule kommenden ' +
      'Menschen beim Aufbau einer Social-Media-Karriere „unterstützt". An jeder Gabelung ' +
      'entscheidest du selbst — und der Balken am unteren Rand zählt mit.',
    year: '2023',
    role: 'Konzept, Story, Game Design', // TODO
    client: 'Hochschule Furtwangen, Fach "Mediale Gegenkulturen"', // TODO
    tools: ['Angular', 'TypeScript', 'SCSS'],
    tags: ['Videospiel', 'Narrative Design', 'Social-Media-Kritik', 'Interaktion'],
    pull: 'Der Balken zählt nicht das, was du denkst.',
    // Das Spiel laeuft direkt in der Seite: Story und Bilder kommen aus dem
    // Angular-Projekt, der Ablauf aus lib/umakeitgram.js.
    prototyp: { art: 'umakeitgram', titel: 'Spielen' },
    // Die Kapitel erzaehlen die Story; die Bilder stecken im Spiel selbst.
    chapters: [
      {
        title: 'ELIZA',
        text:
          'Die Endabgabe im Fach „Mediale Gegenkulturen" sollte sich mit einer Gegenkultur ' +
          'auseinandersetzen. Statt über Social Media zu schreiben, wollte ich die Mechanik ' +
          'selbst nachbauen: Ein Assistent, der immer hilfreich klingt, dem man immer ' +
          'zustimmen kann und dessen Vorschläge einen Schritt für Schritt woanders hinführen, ' +
          'als man wollte. Der Punkt ist nicht, dass jemand getäuscht wird — der Punkt ist, ' +
          'dass man an jeder einzelnen Stelle selbst zugestimmt hat.',
        files: [],
        textOnly: true,
      },
      {
        title: '166 Schritte',
        text:
          'Die Geschichte läuft über 166 Schritte mit 40 Gabelungen und zwei Enden. Jede ' +
          'Entscheidung verschiebt einen Balken am unteren Bildschirmrand, der im Spiel ' +
          'aussieht wie eine Erfolgsanzeige. Gebaut als Angular-Anwendung in TypeScript, die ' +
          'Bilder gezeichnet und montiert als Bildschirmfotos einer Plattform, die es nicht ' +
          'gibt.',
        files: [],
        textOnly: true,
      },
      {
        title: 'Der Balken',
        text:
          'Oben auf dieser Seite lässt sich das Spiel von Anfang bis Ende spielen — etwa ' +
          'zwanzig Minuten. Was der Balken wirklich zählt, erklärt ELIZA am Schluss. Bis ' +
          'dahin: Achte darauf, an welcher Stelle du aufhörst, dich zu wundern.',
        files: [],
        textOnly: true,
      },
    ],
  },
];
