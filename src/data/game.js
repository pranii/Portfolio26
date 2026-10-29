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
  lead: 'Spiele aus Game Jams und Seminaren — beide laufen direkt im Browser.', // TODO
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
    subtitle: 'Vier Tage Game Jam — ein Exploration-Spiel in Godot',
    cover: 'header',
    description:
      'Nick sammelt Pfandflaschen in einem leeren Gebäude und schaltet damit Fähigkeiten ' +
      'frei, bis er den Weg nach draußen findet. Was alle für Müll halten, ist hier die ' +
      'Währung.',
    kontext:
      'Game Jam im Sommersemester 2026 bei Prof. Christoph Müller und Julien Trübinger, ' +
      'HFU School of Design and Media',
    client: 'Sebastiana Augenstein, Cara Brüggendieck, Tobias Moser',
    year: '2026',
    role: 'Game Design, 3D, Level Design, Dokumentation',
    tools: ['Godot', 'Blender', 'BlendKit', 'Polycam', 'Photoshop'],
    tags: ['Game Design', 'Level Design', '3D', 'Liminal Space', 'Game Jam'],
    pull: 'Was andere wegwerfen, hat für den Spieler Wert.',
    /** Zeigt oben auf der Projektseite einen Knopf zum Spielen. */
    prototyp: { art: 'botlnick', titel: 'Die Garage betreten' },
    chapters: [
      {
        title: 'Vier Tage',
        text:
          'Vom ersten Einfall bis zum spielbaren Prototyp waren es vier Tage. In dieser Zeit ' +
          'musste alles einmal passieren: die Idee, die Spielwelt, die Technik und die eigenen ' +
          'Assets. Oben lässt sich das Ergebnis starten — WASD zum Gehen, Maus zum Umsehen.',
        files: [],
        textOnly: true,
      },
      {
        title: 'Nick und die Flaschen',
        text:
          'Eine kurze Cutscene am Anfang: Ein goldener Blob wirft achtlos eine Plastikflasche ' +
          'weg. Danach übernimmt man Nick. Überall liegen Pfandflaschen herum, und sie sind die ' +
          'Währung des Spiels — beim Roboter Walbert schaltet man damit Fähigkeiten frei: ' +
          'werfen, schrumpfen, Flaschen kleben lassen, schweben. Jede neue Fähigkeit öffnet ' +
          'einen Teil des Gebäudes, der vorher unerreichbar war, und nebenher muss man Gegnern ' +
          'ausweichen. Am Ende steht der Ausgang.',
        files: [],
        textOnly: true,
      },
      {
        title: 'Vier Säulen',
        text:
          'Das Design steht auf vier Entscheidungen. Gesammelt wird nur eines, die Flasche. ' +
          'Fortschritt heißt neue Möglichkeiten statt größerer Zahlen. Der Weg führt nach oben, ' +
          'räumlich wie erzählerisch — von ganz unten bis zur Elite. Und die Räume bleiben ' +
          'leer: reduzierte Backrooms, die ihre Dystopie nicht erklären, sondern über Hall, ' +
          'Stille und vereinzelte Geräusche spürbar machen. Man merkt, dass dieser Ort nicht ' +
          'für einen gebaut wurde.',
        files: [],
        textOnly: true,
      },
      {
        title: 'Was unterwegs wegfiel',
        text:
          'Geplant waren Räume, die wir aus unserer realen Umgebung einscannen wollten; die ' +
          'Photogrammetrie lief schon. Mitten im Jam haben wir sie verworfen und die Zeit in ' +
          'die Mechanik gesteckt statt in die Umgebung. Dieselbe Rechnung steckt in den ' +
          'Vorbildern: Die „Hidden Levels" aus Super Mario Sunshine beschneiden eine Mechanik ' +
          'und gewinnen dadurch Schwierigkeit, ohne dass jemand mehr bauen muss — bei vier ' +
          'Tagen ist das das richtige Prinzip. Die Levelauswahl über Gemälde aus Super Mario 64 ' +
          'und eine Basketball-Mechanik als Levelabschluss haben wir geprüft und liegen lassen.',
        files: [],
        textOnly: true,
      },
      {
        title: 'Dokumentation',
        text:
          'Die Dokumentation des Jams, Seite für Seite: Ideenfindung, Game Design Dokument, ' +
          'Kernsysteme, Assets und Level Design.',
        files: ['botlnick-dokumentation'],
        layout: 'track',
      },
    ],
  },
  {
    slug: 'umakeitgram',
    title: 'uMakeItGram',
    subtitle: 'Ein Spiel in 166 Schritten',
    cover: 'header',
    description:
      'Ein Videospiel darüber, wie ein KI-Assistent einen frisch von der Schule kommenden ' +
      'Menschen beim Aufbau einer Social-Media-Karriere „unterstützt". An jeder Gabelung ' +
      'entscheidest du selbst — und der Balken am unteren Rand zählt mit.',
    year: '2023',
    role: 'Konzept, Story, Game Design', // TODO
    kontext: 'Hochschule Furtwangen, Fach "Mediale Gegenkulturen"', // TODO
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
