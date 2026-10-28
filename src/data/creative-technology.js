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
      'Rreth — albanisch für Kreis — läuft seit 2020 in drei Etappen: angefangen mit einem ' +
      'kleinen Magazin und einem Schlüsselanhänger, daraus eine begehbare Videoinstallation ' +
      'über die komplexe posttraumatische Belastungsstörung, und 2028 eine Ausstellung, die ' +
      'beides zusammenbringt. Wer hineingeht, soll am Ende selbst sprechen dürfen.',
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
        title: 'Ein Wort, das fehlt',
        text:
          'Als eigenständige Diagnose steht die komplexe posttraumatische Belastungsstörung ' +
          'erst in der ICD-11 — 2018 veröffentlicht, seit 2022 in Kraft. Entsprechend wenig ' +
          'bekannt ist sie, dabei erfüllt ein erheblicher Teil derer, die über depressive ' +
          'Symptome berichten, zugleich ihre Kriterien. Wer davon betroffen ist, hat selten ' +
          'ein Wort dafür. Die Frage war deshalb nicht, wie man darüber aufklärt, sondern wie ' +
          'man es spürbar macht — so, dass jemand den Raum anders verlässt, als er ' +
          'hineingegangen ist. Von 2021 bis 2023 entstand daraus die Bachelorarbeit: ein ' +
          'vierteiliges Video, ein eigener Soundtrack und ein Magazin.',
        files: ['vision-board'],
        layout: 'track',
      },
      {
        title: 'Vier Akte',
        text:
          'Das Hauptvideo läuft in vier Akten mit albanischen Namen. „Themeli" (Grundstein) ' +
          'zeigt die Reaktionsmuster aus der Kindheit — Kampf, Flucht, Erstarrung, ' +
          'Unterwerfung. „Shprehje Emocionale" übersetzt in Tanz, was passiert, wenn ein ' +
          'Trigger auf ein altes Muster trifft. „Metamorfoza" ist der Wendepunkt in ' +
          'Embryohaltung, „Çlirim" die Katharsis, in der zum ersten Mal Farbe ins Bild kommt. ' +
          'Die ersten drei Akte sind streng schwarzweiß, als Bild für das ' +
          'Schwarz-Weiß-Denken; gedreht mit Carina Borgards aus dem Tanztheater, gebaut aus ' +
          'Rotoskopie, EbSynth und einem Soundtrack aus 42 Spuren. 2025 kam das Projekt im ' +
          'Master zu dritt mit Cara Brüggendieck und Laura Zahn noch einmal auf den Tisch und ' +
          'wurde neu gedreht: Kamera Joscha Reuther, Licht Jan Borghart, Soundkulisse Denzel ' +
          '— Bild, Licht und Ton miteinander statt nacheinander. Der Pitch dazu beschreibt ' +
          'die Installation in fünf Phasen, jede mit Farbe, Ton, Gefühl, Dauer und Referenz, ' +
          'und gibt jedem Akt ein eigenes Symbol: je eine Form von Kreislauf, aus dem man ' +
          'alleine schwer herauskommt.',
        files: ['wheel-of-shame', 'pitch-version-1', 'symbolik', 'in-halt', 'raumskizze-laura'],
        layout: 'track',
        embed: ['https://youtu.be/i9AlftZ5PIk', 'https://youtu.be/Krdg6cM746g'],
      },
      {
        title: 'Der Weg hindurch',
        text:
          'Der Weg führt von absoluter Dunkelheit durch die vier Akte in einen hellen Raum ' +
          'mit anonymen Telefonzellen — dort darf erzählen, wer will. Das Magazin ist der ' +
          'Wegweiser durch die Modelle dahinter: vom Instanzenmodell nach Freud über Melanie ' +
          'Kleins Objektbeziehungstheorie zu Pete Walkers vier Überlebensstrategien, am Ende ' +
          'konkrete Gedankenkorrekturen. Der Satz, auf den alles hinausläuft: Jede dieser ' +
          'Strategien hat einmal funktioniert. Sie war nie ein Charakterfehler, sondern eine ' +
          'Lösung für eine Situation, die so heute nicht mehr herrscht. Oben auf dieser Seite ' +
          'lässt sich das Heft durchblättern.',
        files: ['have'],
        layout: 'grid',
      },
      {
        title: 'Halle 93',
        text:
          '2028 soll die Installation genau nach dem Pitch in der Halle 93 in Stuttgart ' +
          'stehen, mit überarbeitetem Magazin und einer App, die den Besucher weiter trägt ' +
          'als bis zum Ausgang. Die Instagram-Kampagne läuft im Vorfeld und bewirbt beides: ' +
          'kurze Videos, selbst aufgenommen und mit KI weiterbearbeitet, dazu Captions in der ' +
          'ersten Person. Jeder Post trägt den Namen eines Musters statt eines Titels — ' +
          'Suppressing, Self Sabotage, Self Destruction.',
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
      '„In Lak’ech" ist ein Gruß der Maya und heißt: Ich bin ein anderes Du. Ein Automat, ' +
      'der zwei Fremde zusammenbringt, die sonst aneinander vorbeigelaufen wären — ein ' +
      'Videospiel im Nokia-3310-Look auf einem Raspberry Pi, bedient über zwei ' +
      'Arcade-Knöpfe. Weitergehen kann es nur, wenn beide gleichzeitig drücken.',
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
          'Wer gegenübersteht, ist nicht das Fremde, sondern dasselbe in einer anderen ' +
          'Gestalt — und was ich dir antue, tue ich mir an. Diesen Satz nach außen zu tragen ' +
          'war mir wichtig, aber nicht als Spruch, sondern als Erfahrung, die man gemacht ' +
          'haben muss. Also habe ich nach einem Spiel gesucht, das zwei Fremde zueinander ' +
          'bringt, ohne dass einer den Anfang machen muss: „Himmel und Hölle", zwei ' +
          'Spielfelder einander gegenüber, jede beantwortete Frage bringt einen Schritt, bis ' +
          'sich beide in der Mitte treffen. Ein paar Tage später lag auf dem Weg zu einer ' +
          'Freundin „Feuerwaffen" von Howard Ricketts auf dem Boden. Ich habe es mitgenommen ' +
          'und zerschnitten — Pistolen aus dem einen Buch, Landschaften aus einem ' +
          'Naturmagazin, daraus ein Collagenbuch. Daraus wurde die Idee, genau das in einen ' +
          'Automaten zu übersetzen und mit dem zu spielen, was zwischen zwei Fremden immer ' +
          'zuerst da ist: Misstrauen.',
        files: ['spielidee', 'collage', 'wireframe'],
        layout: 'track',
      },
      {
        title: 'Zettel auf den Stufen',
        text:
          'Auf Rasterpapier entstand das Spiel im Raster des späteren Pixelbildes. Davor ' +
          'stand ein Test ohne jede Technik: Die Fragen landeten auf kleinen Notizzetteln, ' +
          'die Zettel auf den Stufen einer Unterführung. Von beiden Seiten geht je eine Stufe ' +
          'weiter, wer eine Frage beantwortet, bis man sich in der Mitte trifft. An dem Tag ' +
          'war das Wetter so schlecht, dass kaum jemand kam — die Erkenntnis blieb trotzdem: ' +
          'Der öffentliche Raum muss mitspielen, wenn man ihn bespielen will. Also ein ' +
          'Gehäuse, das für sich steht. Die beiden Figuren heißen Taiyo und Tsuki, Sonne und ' +
          'Mond; jede gehört zu einem Arcade-Knopf, der nur leuchtet, wenn sie spricht. ' +
          'Programmiert in Python mit Pygame, fünf Wochen Workshop.',
        files: ['test'],
        layout: 'track',
      },
      {
        title: 'Taiyo und Tsuki',
        text:
          'Zwei Figuren streiten sich im Pokémon-Stil durch ein Duell, bis die Frage steht: ' +
          'to die or to live together? Zuerst stand am Ende nur der Handschlag, inzwischen ' +
          'ist der Vertrauenstest im Spiel: „Kann ich dir vertrauen?", „Das hat weh getan", ' +
          '„Wir sind verletzt", „Ich hab dich trotzdem lieb." Nur wenn beide gleichzeitig ' +
          'drücken, löst die Kamera aus. Der Kassenbon-Drucker gibt ein Foto der Begegnung ' +
          'aus, durchnummeriert — zwei Menschen, die sich vorher nicht kannten, halten danach ' +
          'denselben Zettel in der Hand. Oben auf dieser Seite lässt sich das Duell spielen; ' +
          'am besten zu zweit.',
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
      'Eine Videoinstallation über Nostalgie als Abwehrmechanismus. Die These: Wir ' +
      'verdrängen, was gerade passiert, und romantisieren es später durch den Filter von ' +
      'Social Media, statt es zu verarbeiten. Zwei alte Röhrenmonitore stehen an den ' +
      'Ausgängen des Aufzugs — gesteuert wird nur mit Körperhaltung und Handbewegung, ohne ' +
      'Controller.',
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
          'Der Ausgangspunkt war Liminalität — der Schwellenzustand zwischen zwei Zuständen. ' +
          'Aus Brainstorming und Materialarchiv haben wir drei Stränge verfolgt: Sprache, ' +
          'nationale Identität und Spiritualität. Daraus wurde die These, auf der alles ' +
          'steht: Nostalgie ist kein Erinnern, sondern ein Ausweichen. Wir lassen das, was ' +
          'gerade passiert, nicht an uns heran und holen es später als schöne Erinnerung ' +
          'zurück, gefiltert und ungefährlich.',
        files: ['brainstorm', 'archiv'],
        layout: 'wide',
      },
      {
        title: 'Zwei Monitore am Aufzug',
        text:
          'Die entscheidende Frage war nicht, was auf den Monitoren läuft, sondern wo sie ' +
          'stehen: Der Aufzug ist selbst schon eine Schwelle, und wer ihn verlässt, soll die ' +
          'Bilder zwangsläufig sehen. Zwei TouchDesigner-Projekte lesen die Körperhaltung aus ' +
          'und streamen live auf die Röhren; die Knotennetze zeigen, wie aus Kamerabild, ' +
          'Schwellenwerten und Videospuren die Reaktion wird. Die Ästhetik kommt vom ' +
          'Signalfehler: RGB-Versatz, Bildrauschen, verrissene Zeilen. Was auf einem modernen ' +
          'Bildschirm wie ein Defekt aussieht, ist auf der Röhre das natürliche Verhalten.',
        files: ['skizze', 'td-screenshot'],
        layout: 'wide',
      },
      {
        title: 'Niemand bedient etwas',
        text:
          'Wer aus dem Aufzug tritt, steht im Bild, bevor er es merkt — und beide Ebenen ' +
          'reagieren zugleich. Es gibt nichts zu bedienen: Die Position im Raum und die Hand ' +
          'vor der Kamera sind die ganze Steuerung, und die beiden Plakate erklären das ' +
          'wortlos. Textfragmente erscheinen und zerfallen wieder — „where does one begin and ' +
          'the other end?", „Light, Future, Past". Das Titelplakat greift den Chromlook der ' +
          'Nullerjahre auf. Oben auf dieser Seite läuft dieselbe Erkennung im Browser.',
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
      'ohne je irgendwo anzukommen. Multi Shepard bringt ihn in einen Vorlesungssaal und ' +
      'stellt ihm eine projizierte optische Illusion zur Seite. Der Ton läuft bereits, bevor ' +
      'jemand da ist — der Weg nach unten ist das Erlebnis.',
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
          'Horror fiel die Entscheidung auf Action — auf das Gefühl kurz vor dem Höhepunkt ' +
          'einer Filmszene: dauernde Eskalation, die nie aufgelöst wird. Die ursprüngliche ' +
          'Idee sah eine Installation mit Positionstracking vor. Auf Rat von Prof. Norbert ' +
          'Schnell haben wir radikal vereinfacht und uns auf drei Parameter beschränkt: ' +
          'Geschwindigkeit, Richtung und Lautstärke. Weniger ging nicht, mehr brauchte es ' +
          'nicht.',
        files: ['shephard-tone-doku-s01', 'shephard-tone-doku-s02'],
        layout: 'wide',
      },
      {
        title: 'Elf Oszillatoren',
        text:
          'Elf Oszillatoren decken das Spektrum von 20 Hz bis 20.480 Hz in Oktaven ab, eine ' +
          'Amplituden-Hüllkurve macht die Übergänge an den Rändern unhörbar — deshalb hört ' +
          'niemand, wann ein Ton verschwindet und am anderen Ende wieder auftaucht. Der ' +
          'Grundriss zeigt, warum der Vorlesungssaal passt: Nur ein Weg führt links durch den ' +
          'Raum, alles andere versperren die Sitzreihen. Jeder Besucher geht dieselbe ' +
          'Strecke. Als visuelles Gegenstück kamen optische Illusionen dazu; der Ton selbst ' +
          'ist längst kein Kuriosum mehr — Hans Zimmer baut den gesamten Dunkirk-Score ' +
          'darauf auf, der Batpod in The Dark Knight beschleunigt scheinbar endlos, und die ' +
          'Endlostreppe in Super Mario 64 nutzt denselben Trick.',
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
          'Der Ton läuft schon, bevor jemand den Raum betritt. Stehenbleiben und zuschauen ' +
          'geht nicht — der Weg durch den Raum ist die Arbeit. Weil alle denselben Weg ' +
          'nehmen, lassen sich die Durchgänge vergleichen: Geplant sind Fragebogen und ' +
          'Kurzinterviews, dazu die Beobachtung von Körpersprache und Gehgeschwindigkeit. Ab ' +
          'wann setzt die Illusion ein? Bricht sie, wenn man stehenbleibt? Fühlt sich der ' +
          'Abstieg länger an, als er ist? Oben auf dieser Seite lässt sich der Saal ' +
          'durchlaufen, mit demselben Klang und denselben drei Parametern.',
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
          'In der Therapie wird viel beschrieben und wenig gezeigt. Wer über Wochen von ' +
          'seinem Befinden erzählt, verliert den Überblick über das eigene Muster — und die ' +
          'Therapeutin sieht nur Ausschnitte. Die Frage war, ob sich emotionale Zustände so ' +
          'darstellen lassen, dass beide dasselbe vor sich haben, ohne das Gefühl auf eine ' +
          'Zahl zu reduzieren.',
        files: [],
        textOnly: true,
      },
      {
        title: 'Vom Interview zum Dashboard',
        text:
          'Erst Interviews — mit Therapeutinnen und mit Betroffenen. Daraus Personas und ' +
          'Anwendungsfälle, daraus Wireframes, am Ende das Dashboard. Entworfen in Figma, ' +
          'dokumentiert in InDesign.',
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
      'Eine Station, an der Besucher ihr Geburtsdatum eingeben und daraufhin ein ' +
      'persönliches Zine gedruckt bekommen — berechnet aus chinesischem, indischem und ' +
      'keltischem Tierkreis. Ein simples Druckerzeugnis, das durch Personalisierung vom ' +
      'flüchtigen Wegwerfprodukt zum greifbaren Erlebnis wird. Alles läuft offline auf einem ' +
      'Raspberry Pi.',
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
          'Die Idee entsprang einem banalen Gespräch: Cara plante, ihrer Familie zu ' +
          'Weihnachten ein personalisiertes Zine zu schenken. Darin steckte das passende ' +
          'Alltagsobjekt für das Modul — und die Frage, ab wann ein Stück bedrucktes Papier ' +
          'aufhört, Wegwerfware zu sein. Im selben Gespräch stand fest, dass der Prototyp im ' +
          'öffentlichen Raum inszeniert werden sollte: erst in einer Telefonzelle, die sich ' +
          'nicht anmieten ließ, dann in einer halboffenen Bushaltestelle, die an Wetter und ' +
          'Zeit scheiterte.',
        files: ['zineprojektbericht'],
        textOnly: true,
      },
      {
        title: 'Tag, Monat, Jahr',
        text:
          'Die ganze Interaktion besteht aus einem Schritt: Tag, Monat, Jahr. Das Interface ' +
          'durchlief zwei Fassungen — zuerst eng an der Ästhetik des Nokia 3310, dann ' +
          'zugunsten einer stimmigeren Gestaltung überarbeitet. Die Arbeit lief parallel: ' +
          'Cara entwickelte die visuelle Identität und ein Datenset mit den Charakteristika ' +
          'der Sternzeichen aus drei astrologischen Systemen. Ich habe die Technik dahinter ' +
          'gebaut: Raspberry Pi im Kiosk-Modus, die Oberfläche und die Logik, die ' +
          'Geburtsdaten in personalisierte Layouts übersetzt und daraus ein druckfertiges PDF ' +
          'erzeugt.',
        files: ['zodizine-01', 'zodizine-02', 'zodizine-03'],
        layout: 'track',
      },
      {
        title: 'Das warme Papier',
        text:
          'Für die räumliche Inszenierung haben wir uns an Wahrsagersalons bedient: Tücher ' +
          'verdeckten die Umgebung und erzeugten eine mystische Atmosphäre, der nüchterne ' +
          'Automat wurde zum rituellen Ort. Der Übergang vom Digitalen zum Analogen ist ' +
          'körperlich inszeniert — die Berührung des Touchscreens, das gespannte Warten, ' +
          'während Drucker und Mechanik arbeiten, schließlich die Übergabe des noch warmen ' +
          'Papiers. Die Faltung macht den Nutzer zum Mitproduzenten: Aus flachen Bögen ' +
          'entsteht ein dreidimensionales Objekt. Jedes Zine trägt individuelle Spuren und ' +
          'existiert als Unikat in einer Serie von Unikaten. Oben auf dieser Seite lässt sich ' +
          'der Automat bedienen.',
        files: ['dji'],
        layout: 'wide',
        embed: 'https://youtu.be/Ivilxs3Gcxg',
      },
    ],
  },
];
