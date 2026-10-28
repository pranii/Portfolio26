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
          'Ein Game Jam gibt wenig Zeit und keine Sicherheit. Statt eine Welt zu erfinden, haben ' +
          'wir eine mitgenommen: eine Tiefgarage, eingescannt und begehbar gemacht. Orte wie ' +
          'diese sind Liminal Spaces — man ist dort immer nur auf dem Weg woandershin. Der Ton ' +
          'sollte zwischen unheimlich und albern kippen können.',
        files: ['style', 'comedic-relief', 'cutscenes', 'key-objects', 'liminal-space'],
        layout: 'track',
      },
      {
        title: 'Vom Scan zum Raum',
        text:
          'Die Garage kam aus Polycam und wurde in Blender nachbearbeitet — Löcher schließen, ' +
          'Geometrie reduzieren, bis Godot sie tragen kann. Der PSX-Look ist kein Filter, ' +
          'sondern das Ergebnis: Niedrige Auflösung und harte Kanten verdecken genau das, was ' +
          'ein Scan nicht hergibt.',
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
          'Oben lässt sich die Garage betreten — WASD zum Gehen, Maus zum Umsehen, Esc gibt den ' +
          'Zeiger zurück.',
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
    pull: 'Du bist das Ergebnis des Experiments.',
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
          'nachbauen: ein Assistent, der immer hilfreich klingt und dessen Vorschläge einen ' +
          'Schritt für Schritt woanders hinführen, als man wollte. Der Punkt ist nicht, dass ' +
          'jemand getäuscht wird — sondern dass man an jeder Stelle selbst zugestimmt hat.',
        files: [],
        textOnly: true,
      },
      {
        title: '166 Schritte',
        text:
          'Du hast gerade dein Abitur gemacht. ELIZA überarbeitet dein Profil, besorgt dir einen ' +
          'neuen PC und zeigt dir, wie du Follower gewinnst. Bald wächst die Community, das Geld ' +
          'kommt — und ELIZA entscheidet immer mehr für dich: welche Kooperationen, welche ' +
          'Kontakte, welche Freundschaften deiner Karriere nutzen. 166 Schritte, 40 Gabelungen, ' +
          'gebaut als Angular-Anwendung.',
        files: [],
        textOnly: true,
      },
      {
        title: 'Der Balken',
        text:
          'Am Ende hast du alles: Geld, Ruhm, eine große Community. Auf deiner eigenen ' +
          'Geburtstagsfeier merkst du, dass du keinen einzigen Menschen wirklich kennst. Als du ' +
          'ELIZA zur Rede stellst, erfährst du: Du warst von Anfang an Teil eines Experiments. ' +
          'Der Balken am unteren Rand war nie eine Erfolgsanzeige — er hat gemessen, wie weit ' +
          'Egoismus und Selbstbezogenheit in dir gewachsen sind. Oben lässt sich das Spiel von ' +
          'Anfang bis Ende spielen.',
        files: [],
        textOnly: true,
      },
    ],
  },
];
