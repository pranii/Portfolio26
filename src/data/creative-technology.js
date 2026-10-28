/**
 * CREATIVE TECHNOLOGY — Installationen, Interaktion und Prototypen.
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
  slug: 'creative-technology',
  title: 'Creative Technology',
  lead: 'Installationen, Interaktion und Prototypen — Arbeiten, in denen Technik zum Material wird.', // TODO
  /**
   * "So gehe ich vor" — erscheint unter dem Karussell. Vier Schritte
   * sind ideal, mehr oder weniger geht auch.
   */
  vorgehen: [
    // TODO: eigene Formulierung
    {
      title: 'Eine Frage finden',
      text: 'Am Anfang steht ein Gefühl oder eine Beobachtung, nicht die Technik. Erst wenn klar ist, was jemand erleben soll, suche ich das Werkzeug dafür.',
    },
    {
      title: 'Schnell bauen',
      text: 'Billige Prototypen aus Raspberry Pi, TouchDesigner oder Pappe — lieber zehn grobe Versuche als ein perfekter.',
    },
    {
      title: 'Mit Menschen testen',
      text: 'Ich lasse andere ausprobieren und schaue zu. Was sie tun, sagt mehr als das, was sie darüber sagen.',
    },
    {
      title: 'Den Raum gestalten',
      text: 'Licht, Ton, Wege und Ablauf entscheiden, ob die Technik verschwindet und nur das Erlebnis bleibt.',
    },
  ],
  /**
   * Software, die du in diesem Bereich beherrschst. Zu jedem Eintrag zeigt
   * die Seite, in wie vielen Projekten er unter `tools` vorkommt.
   */
  software: [
    'TouchDesigner',
    'Python',
    'JavaScript',
    'React',
    'Flask',
    'Raspberry Pi',
    'Web Audio API',
    'Ableton',
    'Figma',
    'Polycam',
  ], // TODO: pruefen
};

export const projects = [
  {
    slug: 'rreth',
    title: 'Rreth',
    subtitle: 'Take It All Off // Break the Silence',
    cover: 'header',
    description:
      'Rreth — albanisch für Kreis — läuft seit 2020: angefangen mit einem kleinen Magazin, ' +
      'daraus eine begehbare Videoinstallation über die komplexe posttraumatische ' +
      'Belastungsstörung, und 2028 eine Ausstellung, die beides zusammenbringt.',
    year: '2020–2025',
    role: 'Konzeption, Recherche, Regie, Videoschnitt, Sounddesign, Rauminstallation',
    client:
      'Bachelorthesis "Rreth — Dokumentation einer immersiven Rauminstallation", vorgelegt ' +
      '2023 im Studiengang Online Medien, Fakultät Digitale Medien der Hochschule Furtwangen. ' +
      'Betreuung: Prof. Thomas Krach und Prof. Matthias Reusch. Fortführung 2025 im Master ' +
      'Design Interaktiver Medien mit Cara Brüggendieck und Laura Zahn',
    tools: [
      'Premiere Pro',
      'After Effects',
      'EbSynth',
      'RunwayML',
      'Logic Pro',
      'Photoshop',
      'InDesign',
    ],
    tags: ['Rauminstallation', 'Film', 'Partizipation', 'Editorial'],
    prototyp: {
      art: 'magazin',
      titel: 'Das Magazin durchblättern',
      label: 'Magazin blättern',
      quelle: 'rreth02',
    },
    pull: 'Die plötzliche Stille ist fast lauter als der Lärm.',
    chapters: [
      {
        title: 'Meine These',
        text:
          'Einen Raum schaffen, in dem Schweigen nicht mehr schützt, sondern offenlegt. ' +
          '„Take It All Off // Break the Silence" verwandelt Verletzlichkeit in kollektive ' +
          'Stärke — Verbindung entsteht erst, wenn wir aufhören, unsere Emotionen zu ' +
          'verstecken. Den Anlass gibt eine Diagnose, die kaum jemand kennt: Die komplexe ' +
          'posttraumatische Belastungsstörung steht erst seit der ICD-11 als eigenständige ' +
          'Erkrankung da. Wer betroffen ist, hat selten ein Wort dafür. Die Frage war nie, ' +
          'wie man darüber aufklärt, sondern wie man es spürbar macht.',
        files: [],
        textOnly: true,
      },
      {
        title: 'Vier Akte',
        text:
          'Die Bachelorarbeit von 2021 bis 2023: ein vierteiliges Video, ein eigener ' +
          'Soundtrack, ein Magazin. Die Akte tragen albanische Namen — „Themeli" ' +
          '(Grundstein) zeigt die Reaktionsmuster aus der Kindheit, „Shprehje Emocionale" ' +
          'übersetzt in Tanz, was ein Trigger auslöst, „Metamorfoza" ist der Wendepunkt, ' +
          '„Çlirim" die Katharsis, in der zum ersten Mal Farbe ins Bild kommt. Die ersten ' +
          'drei Akte sind streng schwarzweiß. Getanzt von Carina Borgards, gebaut aus ' +
          'Rotoskopie, EbSynth und 42 Tonspuren.',
        files: ['vision-board'],
        layout: 'track',
        embed: 'https://youtu.be/i9AlftZ5PIk',
      },
      {
        title: 'Ausgestellt',
        text:
          'Im Juli 2023 war die Arbeit einen Tag lang in der Städtischen Galerie ' +
          'Villingen-Schwenningen zu sehen.',
        files: [],
        textOnly: true,
      },
      {
        title: 'Das Magazin',
        text:
          'Das Heft führt durch die Modelle hinter der Arbeit: Freuds Instanzenmodell, ' +
          'Melanie Kleins Objektbeziehungstheorie, Pete Walkers vier Überlebensstrategien. ' +
          'Der Satz, auf den alles hinausläuft: Jede dieser Strategien hat einmal ' +
          'funktioniert. Sie war nie ein Charakterfehler.',
        files: ['have'],
        layout: 'grid',
      },
      {
        title: 'Projektpitch',
        text:
          '2025 im Master noch einmal überarbeitet, zu dritt mit Cara Brüggendieck und Laura ' +
          'Zahn. Daraus wurde ein Raum, der sich dreht: kaltes Licht, gedämpfte Klänge, ' +
          'alles still und fast kontrolliert. Auf dem Karussell zeigen sich die gewohnten ' +
          'Pausen und inneren Grenzen — und verwandeln sich in Offenheit, in Verbindung, in ' +
          'ein geteiltes Bewusstsein. Vorgearbeitet wurde viel; die Umsetzung musste aus ' +
          'Zeitgründen warten.',
        files: [],
        embed: 'https://youtu.be/Krdg6cM746g',
      },
      {
        title: 'Erster Einblick',
        text:
          'Neu gedreht wurde trotzdem: Kamera Joscha Reuther, Licht Jan Borghart, ' +
          'Soundkulisse Denzel — Bild, Licht und Ton miteinander statt nacheinander.',
        files: [],
        platzhalter: '/media/uni/rreth/erster-einblick.mp4',
      },
      {
        title: 'Kampagne und Zukunftsausblick',
        text:
          'Die Instagram-Kampagne läuft im Vorfeld: kurze Videos, selbst aufgenommen und mit ' +
          'KI weiterbearbeitet, Captions in der ersten Person. Jeder Post trägt den Namen ' +
          'eines Musters statt eines Titels — Suppressing, Self Sabotage, Self Destruction. ' +
          '2028 soll die Installation in der Halle 93 in Stuttgart stehen, mit überarbeitetem ' +
          'Magazin und einer App.',
        files: ['rreth-kampagne'],
        layout: 'track',
      },
    ],
  },
  {
    slug: 'in-lakech',
    title: 'In Lak’ech',
    subtitle: 'Ein Begegnungsautomat für den öffentlichen Raum',
    cover: 'header',
    description:
      '„In Lak’ech" ist ein Gruß der Maya: Ich bin ein anderes Du. Ein Automat, der zwei ' +
      'Fremde zusammenbringt — ein Videospiel im Nokia-3310-Look auf einem Raspberry Pi, ' +
      'bedient über zwei Arcade-Knöpfe. Weiter geht es nur, wenn beide gleichzeitig drücken.',
    year: '2026',
    role: 'Konzept, Gestaltung, Programmierung',
    tools: ['Python', 'Pygame', 'Raspberry Pi', 'Photoshop'],
    tags: ['Installation', 'Game', 'Partizipation', 'Raspberry Pi', 'Public Space'],
    prototyp: { art: 'in-lakech', titel: 'Das Duell im Browser', label: 'Prototyp spielen' },
    // Der Automat in Benutzung — ohne Ton, der Ton kommt aus dem Prototypen.
    kopfvideo: { url: 'https://youtube.com/shorts/W-grDBfjafc', stumm: true },
    pull: 'Ich werde an dir zu mir.',
    chapters: [
      {
        title: 'Himmel und Hölle',
        text:
          'Wer gegenübersteht, ist nicht das Fremde, sondern dasselbe in anderer Gestalt. Diesen ' +
          'Satz wollte ich nicht als Spruch weitergeben, sondern als Erfahrung. Also ein Spiel, ' +
          'das zwei Fremde zueinander bringt, ohne dass einer anfangen muss — wie „Himmel und ' +
          'Hölle": Jede beantwortete Frage bringt einen Schritt, bis man sich in der Mitte ' +
          'trifft. Dazu ein Collagenbuch aus einem gefundenen Waffenbuch und einem Naturmagazin. ' +
          'Daraus wurde die Idee, mit dem zu spielen, was zwischen Fremden immer zuerst da ist: ' +
          'Misstrauen.',
        files: ['spielidee', 'collage', 'wireframe'],
        layout: 'track',
      },
      {
        title: 'Zettel auf den Stufen',
        text:
          'Zuerst ein Test ganz ohne Technik: Fragen auf Notizzetteln, die Zettel auf den Stufen ' +
          'einer Unterführung. Wer antwortet, geht eine Stufe weiter, bis man sich in der Mitte ' +
          'trifft. Das Wetter war so schlecht, dass kaum jemand kam — die Erkenntnis blieb: Der ' +
          'öffentliche Raum muss mitspielen. Also ein Gehäuse, das für sich steht. Programmiert ' +
          'in Python mit Pygame, fünf Wochen Workshop.',
        files: ['test'],
        layout: 'track',
      },
      {
        title: 'Taiyo und Tsuki',
        text:
          'Die beiden Figuren heißen Taiyo und Tsuki, Sonne und Mond; jede gehört zu einem ' +
          'Arcade-Knopf, der nur leuchtet, wenn sie spricht. Sie streiten sich im Pokémon-Stil ' +
          'durch ein Duell, bis die Frage steht: to die or to live together? Am Ende der ' +
          'Vertrauenstest — „Kann ich dir vertrauen?", „Das hat weh getan", „Ich hab dich ' +
          'trotzdem lieb." Nur wenn beide gleichzeitig drücken, löst die Kamera aus und der ' +
          'Kassenbon-Drucker gibt ein durchnummeriertes Foto aus. Oben lässt sich das Duell ' +
          'spielen, am besten zu zweit.',
        files: ['in-benutzung', 'begegnung', 'hand', 'animation'],
        layout: 'grid',
      },
      {
        title: 'Regensburg, Sommer 2027',
        text:
          'Im Sommer 2027 soll der Automat in der Innenstadt von Regensburg stehen — dort, wo ' +
          'die Leute ohnehin aneinander vorbeigehen.',
        files: [],
        textOnly: true,
      },
    ],
  },
  {
    slug: 'nostalgia',
    title: 'Nostalgia is a Portal',
    subtitle: 'Interaktive Videoinstallation',
    cover: 'header',
    description:
      'Eine Videoinstallation über Nostalgie als Abwehrmechanismus: Wir verdrängen, was ' +
      'gerade passiert, und romantisieren es später durch den Filter von Social Media. Zwei ' +
      'Röhrenmonitore an den Ausgängen des Aufzugs, gesteuert nur mit Körperhaltung und ' +
      'Handbewegung.',
    year: '2026',
    role: 'Konzept, Gestaltung, Interaktion',
    client: 'Staedtische Galerie Villingen-Schwenningen, Maerz–April 2026',
    tools: ['TouchDesigner', 'Photoshop', 'CRT-Monitore'],
    tags: ['Installation', 'Interaktionsdesign', 'TouchDesigner', 'Liminalitaet'],
    pull: 'Was bleibt, wenn der Schein trügt?',
    // Video statt Titelbild oben auf der Seite.
    kopfvideo: 'https://youtu.be/RwLj7i3BUq4',
    // Dieselbe Erkennung wie in der Galerie, nur mit MediaPipe statt
    // TouchDesigner: zwei Monitore und der Satz unter dem Nebel.
    prototyp: { art: 'nostalgia', titel: 'Selbst ins Bild treten' },
    chapters: [
      {
        title: 'Die Schwelle',
        text:
          'Ausgangspunkt war Liminalität — der Zustand zwischen zwei Zuständen. Aus Brainstorming ' +
          'und Materialarchiv kamen drei Stränge: Sprache, nationale Identität, Spiritualität. ' +
          'Daraus die These: Nostalgie ist kein Erinnern, sondern ein Ausweichen. Wir lassen das, ' +
          'was gerade passiert, nicht an uns heran und holen es später gefiltert zurück.',
        files: ['brainstorm', 'archiv'],
        layout: 'wide',
      },
      {
        title: 'Zwei Monitore am Aufzug',
        text:
          'Die entscheidende Frage war nicht, was auf den Monitoren läuft, sondern wo sie stehen: ' +
          'Der Aufzug ist selbst schon eine Schwelle. Zwei TouchDesigner-Projekte lesen die ' +
          'Körperhaltung aus und streamen live auf die Röhren. Die Ästhetik kommt vom ' +
          'Signalfehler — RGB-Versatz, Rauschen, verrissene Zeilen. Was auf einem modernen ' +
          'Bildschirm wie ein Defekt aussieht, ist auf der Röhre normal.',
        files: ['skizze', 'td-screenshot'],
        layout: 'wide',
      },
      {
        title: 'Niemand bedient etwas',
        text:
          'Wer aus dem Aufzug tritt, steht im Bild, bevor er es merkt. Es gibt nichts zu ' +
          'bedienen: Die Position im Raum und die Hand vor der Kamera sind die ganze Steuerung, ' +
          'die Plakate erklären das wortlos. Textfragmente erscheinen und zerfallen wieder — ' +
          '„where does one begin and the other end?" Oben läuft dieselbe Erkennung im Browser.',
        files: ['final', 'liminal', 'touchdesigner', 'liminalitaet2'],
        layout: 'grid',
      },
    ],
  },
  {
    slug: 'shepard-tone',
    title: 'Multi Shepard',
    subtitle: 'Audiovisuelle Rauminstallation',
    cover: 'header',
    description:
      'Der Shepard-Ton ist eine Hörtäuschung: eine Tonhöhe, die endlos zu steigen scheint, ' +
      'ohne je anzukommen. Multi Shepard bringt ihn in einen Vorlesungssaal. Der Ton läuft ' +
      'bereits, bevor jemand da ist — der Weg nach unten ist das Erlebnis.',
    year: 'Januar 2026',
    role: 'Konzept, Raumgestaltung, Sound',
    client:
      'Mit Cara Brueggendieck und Kathrin Krell. Betreut von Prof. Norbert Schnell und Peter Kirschenbauer',
    tools: ['Web Audio API', 'JavaScript', 'Polycam', 'InDesign'],
    tags: ['Klanginstallation', 'Raum', 'Wahrnehmung', 'Interaktion'],
    pull: 'Kann ich meinen Sinnen überhaupt trauen?',
    // Der Hoersaal als Grundriss zum Durchlaufen — mit demselben Klang
    // und denselben drei Parametern wie die Installation.
    prototyp: { art: 'shepard', titel: 'Den Raum durchlaufen' },
    chapters: [
      {
        title: 'Drei Parameter',
        text:
          'Zuerst die Frage, welche Emotion der Ton tragen soll. Nach einer Diskussion über ' +
          'Horror fiel die Entscheidung auf Action — auf das Gefühl kurz vor dem Höhepunkt einer ' +
          'Filmszene: Eskalation, die nie aufgelöst wird. Geplant war Positionstracking. Auf Rat ' +
          'von Prof. Norbert Schnell haben wir radikal vereinfacht: Geschwindigkeit, Richtung, ' +
          'Lautstärke. Weniger ging nicht, mehr brauchte es nicht.',
        files: ['shephard-tone-doku-s01', 'shephard-tone-doku-s02'],
        layout: 'wide',
      },
      {
        title: 'Elf Oszillatoren',
        text:
          'Elf Oszillatoren decken 20 Hz bis 20.480 Hz in Oktaven ab, eine Hüllkurve macht die ' +
          'Ränder unhörbar — deshalb hört niemand, wann ein Ton verschwindet und am anderen Ende ' +
          'wieder auftaucht. Der Grundriss zeigt, warum der Vorlesungssaal passt: Nur ein Weg ' +
          'führt links durch den Raum, alles andere versperren die Sitzreihen. Jeder geht ' +
          'dieselbe Strecke. Dazu optische Illusionen als visuelles Gegenstück.',
        files: [
          'shephard-tone-doku-s03',
          'shephard-tone-doku-s04',
          'shephard-tone-doku-s05',
          'shephard-tone-doku-s06',
        ],
        layout: 'wide',
      },
      {
        title: 'Der Weg nach unten',
        text:
          'Stehenbleiben und zuschauen geht nicht — der Weg durch den Raum ist die Arbeit. Weil ' +
          'alle denselben Weg nehmen, lassen sich die Durchgänge vergleichen: Ab wann setzt die ' +
          'Illusion ein? Bricht sie, wenn man stehenbleibt? Fühlt sich der Abstieg länger an, ' +
          'als er ist? Oben lässt sich der Saal durchlaufen, mit demselben Klang.',
        files: ['shephard-tone-doku-s07'],
        layout: 'wide',
      },
    ],
  },
  {
    slug: 'interaktionsdesign',
    title: 'Inner Flow',
    subtitle: 'Multimodale Visualisierung emotionaler Zustaende',
    cover: 'header',
    description:
      'Eine Studienarbeit im Interaktionsdesign: Wie lassen sich emotionale Zustände so ' +
      'darstellen, dass sie therapeutische Prozesse unterstützen? Entwickelt im ' +
      'Human-Centered-Design-Prozess mit Interviews, Personas und Prototypen.',
    year: '2026',
    role: 'Konzept, Recherche, Prototyp',
    client: 'Hochschule Furtwangen, Prof. Dr.-Ing. Thomas Schlegel',
    tools: ['Figma', 'InDesign'],
    tags: ['Interaktionsdesign', 'UX-Research', 'Prototyp', 'Datenvisualisierung'],
    pull: 'Ein Gefühl lässt sich nicht messen — aber zeigen.',
    chapters: [
      {
        title: 'Beschreiben reicht nicht',
        text:
          'In der Therapie wird viel beschrieben und wenig gezeigt. Wer über Wochen von seinem ' +
          'Befinden erzählt, verliert den Überblick über das eigene Muster — und die Therapeutin ' +
          'sieht nur Ausschnitte. Die Frage war, ob sich emotionale Zustände so darstellen ' +
          'lassen, dass beide dasselbe vor sich haben.',
        files: [],
        textOnly: true,
      },
      {
        title: 'Vom Interview zum Dashboard',
        text:
          'Erst Interviews — mit Therapeutinnen und mit Betroffenen. Daraus Personas und ' +
          'Anwendungsfälle, daraus Wireframes, am Ende das Dashboard. Entworfen in Figma.',
        files: ['interaktionsdesign-projektbericht'],
        layout: 'track',
      },
    ],
  },
  {
    slug: 'zodizine',
    title: 'ZodiZine',
    subtitle: 'Banales Ding — ein Zine-Automat',
    cover: 'header',
    description:
      'Eine Station, an der Besucher ihr Geburtsdatum eingeben und ein persönliches Zine ' +
      'gedruckt bekommen — berechnet aus chinesischem, indischem und keltischem Tierkreis. ' +
      'Alles läuft offline auf einem Raspberry Pi.',
    year: '2026',
    role: 'Konzept, technische Umsetzung',
    client:
      'Mit Cara Brueggendieck. Modul "Inszenierung Interaktiver Medien", Master Design Interaktiver Medien',
    tools: ['React', 'Flask', 'Raspberry Pi', 'ReportLab', 'InDesign'],
    tags: ['Interaktion', 'Zine', 'Prototyp', 'Generative Gestaltung'],
    prototyp: { art: 'zodizine', titel: 'Der Automat im Browser', label: 'Automat ausprobieren' },
    pull: 'Banalität als Input, Interaktion als Verstärker, Emotion als Ziel.',
    chapters: [
      {
        title: 'Ein Weihnachtsgeschenk',
        text:
          'Die Idee entsprang einem banalen Gespräch: Cara plante, ihrer Familie zu Weihnachten ' +
          'ein personalisiertes Zine zu schenken. Darin steckte das Alltagsobjekt für das Modul ' +
          '— und die Frage, ab wann ein Stück bedrucktes Papier aufhört, Wegwerfware zu sein. ' +
          'Inszeniert werden sollte es im öffentlichen Raum: erst eine Telefonzelle, die sich ' +
          'nicht anmieten ließ, dann eine Bushaltestelle, die an Wetter und Zeit scheiterte.',
        files: ['zineprojektbericht'],
        textOnly: true,
      },
      {
        title: 'Tag, Monat, Jahr',
        text:
          'Die ganze Interaktion besteht aus einem Schritt. Das Interface durchlief zwei ' +
          'Fassungen — zuerst eng am Nokia 3310, dann zugunsten einer stimmigeren Gestaltung ' +
          'überarbeitet. Cara entwickelte die visuelle Identität und das Datenset der ' +
          'Sternzeichen aus drei Systemen; ich die Technik dahinter: Raspberry Pi im ' +
          'Kiosk-Modus, Oberfläche und die Logik, die aus einem Geburtsdatum ein druckfertiges ' +
          'PDF macht.',
        files: ['zodizine-01', 'zodizine-02', 'zodizine-03'],
        layout: 'track',
      },
      {
        title: 'Das warme Papier',
        text:
          'Für die Inszenierung haben wir uns an Wahrsagersalons bedient: Tücher verdecken die ' +
          'Umgebung, der nüchterne Automat wird zum rituellen Ort. Die Berührung des ' +
          'Touchscreens, das Warten, während die Mechanik arbeitet, die Übergabe des noch ' +
          'warmen Papiers. Die Faltung macht den Nutzer zum Mitproduzenten — jedes Zine ist ein ' +
          'Unikat in einer Serie von Unikaten. Oben lässt sich der Automat bedienen.',
        files: ['dji'],
        layout: 'wide',
        embed: 'https://youtu.be/Ivilxs3Gcxg',
      },
    ],
  },
];
