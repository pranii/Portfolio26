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
      'Rreth — albanisch für Kreis — begann 2020 mit einem kleinen Magazin und einem ' +
      'Schlüsselanhänger und läuft seither in drei Etappen. Von 2021 bis 2023 entstand als ' +
      'Bachelorarbeit eine immersive Rauminstallation über die komplexe posttraumatische ' +
      'Belastungsstörung: ein vierteiliges Video, ein eigener Soundtrack und ein Magazin, ' +
      'das durch die psychologischen Modelle dahinter führt. Als eigenständige Diagnose ' +
      'steht die Erkrankung erst in der ICD-11, 2018 veröffentlicht und seit 2022 in ' +
      'Kraft — entsprechend wenig bekannt ist sie, dabei erfüllt ein erheblicher Teil ' +
      'derer, die über depressive Symptome berichten, zugleich ihre Kriterien. 2025 kam ' +
      'das Projekt im ' +
      'Master noch einmal auf den Tisch, diesmal zu dritt mit Cara Brüggendieck und Laura ' +
      'Zahn: ein Pitch über fünf Phasen, Symbole für jeden Akt und die Planung einer ' +
      'begehbaren Videoinstallation. 2028 soll daraus das werden, was im Pitch steht — eine ' +
      'Ausstellung in der Halle 93 in Stuttgart, mit überarbeitetem Magazin und einer App, ' +
      'die den Besucher über die Installation hinaus begleitet.',
    year: '2020 - 2025',
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
        title: 'Projektpitch',
        text:
          'Der Pitch beschreibt die Installation in fünf Phasen, jede mit Farbe, Ton, Gefühl, ' +
          'Zeitdauer und Referenz: von absoluter Dunkelheit über konfrontierende Video-Akte bis ' +
          'in einen hellen Raum mit anonymen Telefonzellen, in denen Besucher ihre eigene ' +
          'Geschichte erzählen können. „Take It All Off — Break the Silence" in Schwarz und Rot ' +
          'war die erste Präsentation dazu; mit ihr sind Cara Brüggendieck und Laura Zahn 2025 ' +
          'eingestiegen. Für jeden Akt steht ein eigenes Symbol, jedes für eine Form von ' +
          'Kreislauf, aus dem man alleine schwer herauskommt.',
        files: ['wheel-of-shame', 'pitch-version-1', 'symbolik', 'in-halt', 'raumskizze-laura'],
        layout: 'track',
      },
      {
        title: 'Videoextrakte',
        text:
          'Das Hauptvideo läuft in vier Akten mit albanischen Namen: „Themeli" (Grundstein) ' +
          'zeigt die Reaktionsmuster aus der Kindheit — Kampf, Flucht, Erstarrung, Unterwerfung. ' +
          '„Shprehje Emocionale" übersetzt in Tanz, was passiert, wenn ein Trigger auf ein altes ' +
          'Muster trifft. „Metamorfoza" ist der Wendepunkt in Embryohaltung, „Çlirim" die ' +
          'Katharsis, in der zum ersten Mal Farbe ins Bild kommt. Die ersten drei Akte sind ' +
          'streng schwarzweiß, als Bild für das Schwarz-Weiß-Denken; gedreht wurde mit Carina ' +
          'Borgards aus dem Tanztheater, gebaut aus Rotoskopie, EbSynth und einem Soundtrack aus ' +
          '42 Spuren. 2025 ist neu gedreht worden: Kamera Joscha Reuther, Licht Jan Borghart, ' +
          'Soundkulisse Denzel — Bild, Licht und Ton miteinander statt nacheinander.',
        embed: ['https://youtu.be/i9AlftZ5PIk', 'https://youtu.be/Krdg6cM746g'],
        files: ['vision-board'],
        layout: 'track',
      },
      {
        title: 'Magazin',
        text:
          'Das Magazin ist der Wegweiser durch die Modelle hinter der Installation: vom ' +
          'Instanzenmodell nach Freud über Melanie Kleins Objektbeziehungstheorie zu Pete ' +
          'Walkers vier Überlebensstrategien, und am Ende konkrete Gedankenkorrekturen. Jede ' +
          'dieser Strategien hat einmal funktioniert — sie war nie ein Charakterfehler, sondern ' +
          'eine Lösung für eine Situation, die so heute nicht mehr herrscht. Oben auf dieser ' +
          'Seite lässt es sich durchblättern.',
        files: ['have'],
        layout: 'grid',
      },
      {
        title: 'Zukunft',
        text:
          '2028 soll die Installation wieder aufgenommen und genau nach dem Pitch in der Halle ' +
          '93 in Stuttgart ausgestellt werden, mit überarbeitetem Magazin und einer App, die den ' +
          'Besucher weiter trägt als bis zum Ausgang. Die Instagram-Kampagne läuft im Vorfeld ' +
          'und bewirbt beides: kurze Videos, selbst aufgenommen und mit KI weiterbearbeitet, ' +
          'dazu Captions in der ersten Person. Jeder Post trägt den Namen eines Musters statt ' +
          'eines Titels: Suppressing, Self Sabotage, Self Destruction.',
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
      '„In Lak’ech" ist ein Gruß der Maya und heißt: Ich bin ein anderes Du. Wer ' +
      'gegenübersteht, ist nicht das Fremde, sondern dasselbe in einer anderen Gestalt — ' +
      'und was ich dir antue, tue ich mir an. Dieser Satz nach außen zu tragen ist mir ' +
      'wichtig, und zwar nicht als Spruch, sondern als Erfahrung, die man gemacht haben ' +
      'muss. Also ein Automat, der zwei Fremde zusammenbringt, die sonst aneinander ' +
      'vorbeigelaufen wären: ein Videospiel im Nokia-3310-Look, programmiert in Python ' +
      'auf einem Raspberry Pi, bedient über zwei Arcade-Knöpfe. Zwei Figuren streiten ' +
      'sich im Pokémon-Stil durch ein Duell, bis am Ende die Frage steht: to die or to ' +
      'live together? Nur wenn beide gleichzeitig drücken, löst die Kamera aus und der ' +
      'Kassenbon-Drucker gibt ein Foto der Begegnung aus, durchnummeriert. Entstanden in ' +
      'einem fünfwöchigen Workshop mit der Aufgabe, eine Begegnung im öffentlichen Raum ' +
      'zu schaffen.',
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
        title: 'Ideenentwicklung',
        text:
          'Zuerst habe ich nach einem Spiel gesucht, das zwei Fremde zueinander bringt, ohne ' +
          'dass einer den Anfang machen muss: „Himmel und Hölle", zwei Spielfelder einander ' +
          'gegenüber, jede beantwortete Frage bringt einen Schritt, bis sich beide in der Mitte ' +
          'treffen und sich die Hand geben. Ein paar Tage später lag auf dem Weg zu einer ' +
          'Freundin „Feuerwaffen" von Howard Ricketts auf dem Boden. Ich habe es mitgenommen und ' +
          'zerschnitten — Pistolen aus dem einen Buch, Landschaften aus einem Naturmagazin, ' +
          'daraus ein Collagenbuch. Daraus wurde die Idee, genau das in einen Automaten zu ' +
          'übersetzen und mit dem zu spielen, was zwischen zwei Fremden immer zuerst da ist: ' +
          'Misstrauen. Auf Rasterpapier entstand dann das Spiel selbst, im Raster des späteren ' +
          'Pixelbildes.',
        files: ['spielidee', 'collage', 'wireframe'],
        layout: 'track',
      },
      {
        title: 'Test in Furtwangen',
        text:
          'Die Fragen landeten auf kleinen Notizzetteln, die Zettel auf den Stufen einer ' +
          'Unterführung: Von beiden Seiten geht je eine Stufe weiter, wer eine Frage ' +
          'beantwortet, bis man sich in der Mitte trifft. An dem Tag war das Wetter so schlecht, ' +
          'dass kaum jemand kam — die Erkenntnis blieb trotzdem: Der öffentliche Raum muss ' +
          'mitspielen, wenn man ihn bespielen will.',
        files: ['test'],
        layout: 'track',
      },
      {
        title: 'Der Automat',
        text:
          'Die beiden Figuren heißen Taiyo und Tsuki, Sonne und Mond; jede gehört zu einem ' +
          'Arcade-Knopf, der nur leuchtet, wenn sie spricht. Zuerst stand am Ende nur der ' +
          'Handschlag, inzwischen ist der Vertrauenstest im Spiel: „Kann ich dir vertrauen?", ' +
          '„Das hat weh getan", „Wir sind verletzt", „Ich hab dich trotzdem lieb." Jede ' +
          'gelungene Begegnung wird fotografiert und auf einem Kassenbon ausgedruckt, ' +
          'durchnummeriert — zwei Menschen, die sich vorher nicht kannten, halten danach ' +
          'denselben Zettel in der Hand. Im Sommer 2027 soll der Automat in der Innenstadt von ' +
          'Regensburg stehen.',
        files: ['in-benutzung', 'begegnung', 'hand', 'animation'],
        layout: 'grid',
      },
    ],
  },
  {
    slug: 'nostalgia',
    title: 'Nostalgia is a Portal',
    subtitle: 'Interaktive Videoinstallation',
    cover: 'header',
    description:
      'Eine Videoinstallation ueber Nostalgie als Abwehrmechanismus: THESE: Wir verdraengen, was gerade passiert, und romantisieren es spaeter durch den Filter von Social Media, statt es zu verarbeiten. Zwei alte Roehrenmonitore stehen an den Ausgaengen des Aufzugs — gesteuert wird nur mit Koerperhaltung und Handbewegung, ohne Controller.', // TODO
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
        title: 'Brainstorm',
        text: 'Der Ausgangspunkt war der Begriff Liminalitaet — der Schwellenzustand zwischen zwei Zustaenden. Aus Brainstorming und Materialarchiv haben wir drei Straenge verfolgt: Sprache, nationale Identitaet und Spiritualitaet.', // TODO
        files: ['brainstorm', 'archiv'],
        layout: 'wide',
      },
      {
        title: 'Raumkonzept',
        text: 'Die Skizzen klaeren die entscheidende Frage: Wo stehen die Monitore, damit die Besucher sie beim Verlassen des Aufzugs zwangslaeufig sehen? Der Aufzug ist selbst schon eine Schwelle — das Konzept nutzt sie.', // TODO
        files: ['skizze'],
        layout: 'grid',
      },
      {
        title: 'Technik in TouchDesigner',
        text: 'Zwei TouchDesigner-Projekte lesen die Koerperhaltung aus und streamen live auf die Roehrenmonitore. Die Knotennetze zeigen, wie aus Kamerabild, Schwellenwerten und Videospuren die Reaktion wird.', // TODO
        files: ['td-screenshot'],
        layout: 'wide',
      },
      {
        title: 'Bildwelt',
        text: 'Die Aesthetik kommt vom Signalfehler: RGB-Versatz, Bildrauschen, verrissene Zeilen. Was auf einem modernen Bildschirm wie ein Defekt aussieht, ist auf der Roehre das natuerliche Verhalten.', // TODO
        // Bewusst ohne Bild — der Absatz steht fuer sich.
        textOnly: true,
      },
      {
        title: 'Plakate',
        text: 'Das Titelplakat greift den Chromlook der Nullerjahre auf, die beiden Steuerungsplakate erklaeren wortlos, wie man mit dem Koerper spielt — Hand vor die Kamera, Position im Raum.', // TODO
        files: ['final'],
        layout: 'grid',
      },
      {
        title: 'Erster provisorischer Aufbau',
        text: 'Die Fernseher standen auf einem verhuellten Tisch, daneben die Plakate.', // TODO
        files: ['liminal'],
        layout: 'grid',
      },
      {
        title: 'Snippets',
        text: 'Textfragmente erscheinen und zerfallen wieder. "where does one begin and the other end?", "Light, Future, Past".', // TODO
        files: ['touchdesigner', 'liminalitaet2'],
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
      'Der Shepard-Ton ist eine Hoertaeuschung: eine Tonhoehe, die endlos zu steigen oder ' +
      'zu fallen scheint, ohne je irgendwo anzukommen. Multi Shepard bringt ihn in einen ' +
      'Vorlesungssaal und stellt ihm eine projizierte optische Illusion zur Seite. Wer den ' +
      'Raum betritt, laeuft mitten hindurch — der Ton laeuft bereits, und der Weg nach ' +
      'unten ist das Erlebnis.', // TODO
    year: 'Januar 2026',
    role: 'Konzept, Raumgestaltung, Sound',
    client:
      'Mit Cara Brueggendieck und Kathrin Krell. Betreut von Prof. Norbert Schnell und Peter Kirschenbauer',
    tools: ['Web Audio API', 'JavaScript', 'Polycam', 'InDesign'],
    tags: ['Klanginstallation', 'Raum', 'Wahrnehmung', 'Interaktion'],
    pull: 'Kann ich meinen Sinnen ueberhaupt trauen?',
    // Der Hoersaal als Grundriss zum Durchlaufen — mit demselben Klang
    // und denselben drei Parametern wie die Installation.
    prototyp: { art: 'shepard', titel: 'Den Raum durchlaufen' },
    chapters: [
      {
        title: 'Konzeptfindung',
        text:
          'Zuerst die Frage, welche Emotion der Ton tragen soll. Nach einer Diskussion ueber ' +
          'Horror fiel die Entscheidung auf Action. Die urspruengliche Idee sah eine ' +
          'Installation mit Positionstracking vor — auf Rat von Prof. Norbert Schnell haben ' +
          'wir radikal vereinfacht und uns auf drei Parameter beschraenkt: Geschwindigkeit, ' +
          'Richtung und Lautstaerke.', // TODO
        files: ['shephard-tone-doku-s01', 'shephard-tone-doku-s02'],
        layout: 'wide',
      },
      {
        title: 'Erlebnisgestaltung',
        text:
          'Das Erlebnis sollte sich anfuehlen wie der Moment kurz vor dem Hoehepunkt einer ' +
          'Filmszene: dauernde Eskalation, die nie aufgeloest wird. Deshalb laeuft der Ton ' +
          'schon, bevor jemand den Raum betritt. Stehenbleiben und zuschauen geht nicht — ' +
          'der Weg durch den Raum ist die Arbeit.', // TODO
        files: ['shephard-tone-doku-s03'],
        layout: 'wide',
      },
      {
        title: 'Referenzen',
        text:
          'Der Shepard-Ton ist laengst kein Kuriosum mehr: Hans Zimmer baut den gesamten ' +
          'Dunkirk-Score darauf auf, der Batpod in The Dark Knight beschleunigt scheinbar ' +
          'endlos, und die Endlostreppe in Super Mario 64 nutzt denselben Trick. Dazu kamen ' +
          'optische Illusionen als visuelles Gegenstueck.', // TODO
        files: ['shephard-tone-doku-s04', 'shephard-tone-doku-s05'],
        layout: 'wide',
      },
      {
        title: 'Technischer Aufbau',
        text:
          'Elf Oszillatoren decken das Frequenzspektrum von 20 Hz bis 20.480 Hz in Oktaven ab, ' +
          'eine Amplituden-Huellkurve macht die Uebergaenge an den Raendern unhoerbar. Der ' +
          'Grundriss zeigt, warum der Vorlesungssaal passt: Nur ein Weg fuehrt links durch ' +
          'den Raum, alles andere versperren die Sitzreihen — jeder Besucher geht dieselbe ' +
          'Strecke.', // TODO
        files: ['shephard-tone-doku-s06'],
        layout: 'wide',
      },
      {
        title: 'User Testing',
        text:
          'Weil alle denselben Weg nehmen, lassen sich die Durchgaenge vergleichen. Geplant ' +
          'sind Fragebogen und Kurzinterviews, dazu die Beobachtung von Koerpersprache und ' +
          'Gehgeschwindigkeit: Ab wann setzt die Illusion ein? Bricht sie, wenn man ' +
          'stehenbleibt? Fuehlt sich der Abstieg laenger an, als er ist?', // TODO
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
      'Eine Studienarbeit im Interaktionsdesign: Wie lassen sich emotionale Zustaende so darstellen, dass sie therapeutische Prozesse unterstuetzen? Entwickelt im Human-Centered-Design-Prozess mit Interviews, Personas und Prototypen.', // TODO
    year: '2026',
    role: 'Konzept, Recherche, Prototyp',
    client: 'Hochschule Furtwangen, Prof. Dr.-Ing. Thomas Schlegel',
    tools: ['Figma', 'InDesign'],
    tags: ['Interaktionsdesign', 'UX-Research', 'Prototyp', 'Datenvisualisierung'],
    chapters: [
      {
        title: 'Projektbericht',
        text: 'Der Bericht folgt dem Human-Centered-Design-Prozess: Problemstellung, Interviews mit Therapeutinnen und Betroffenen, Personas, Use Cases, Wireframes und schliesslich das Dashboard.', // TODO
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
      'Eine Station, an der Besucher ihr Geburtsdatum auf einem Touchscreen eingeben und ' +
      'daraufhin ein persoenliches Zine gedruckt bekommen — berechnet aus chinesischem, ' +
      'indischem und keltischem Tierkreis. Ein simples Druckerzeugnis, das durch ' +
      'Personalisierung vom fluechtigen Wegwerfprodukt zum greifbaren Erlebnis wird. ' +
      'Alles laeuft offline auf einem Raspberry Pi.', // TODO
    year: '2026',
    role: 'Konzept, technische Umsetzung',
    client:
      'Mit Cara Brueggendieck. Modul "Inszenierung Interaktiver Medien", Master Design Interaktiver Medien',
    tools: ['React', 'Flask', 'Raspberry Pi', 'ReportLab', 'InDesign'],
    tags: ['Interaktion', 'Zine', 'Prototyp', 'Generative Gestaltung'],
    prototyp: { art: 'zodizine', titel: 'Der Automat im Browser', label: 'Automat ausprobieren' },
    pull: 'Banalitaet als Input, Interaktion als Verstaerker, Emotion als Ziel.',
    chapters: [
      {
        title: 'Ursprung',
        text:
          'Die Idee entsprang einem banalen Gespraech: Cara plante, ihrer Familie zu ' +
          'Weihnachten ein personalisiertes Zine zu schenken. Darin steckte das passende ' +
          'Alltagsobjekt fuer das Modul. Im selben Gespraech stand fest, dass der Prototyp ' +
          'im oeffentlichen Raum inszeniert werden sollte — erst in einer Telefonzelle, die ' +
          'sich nicht anmieten liess, dann in einer halboffenen Bushaltestelle, die an ' +
          'Wetter und Zeit scheiterte.', // TODO
        files: ['zineprojektbericht'],
        textOnly: true,
      },
      {
        title: 'Das Interface',
        text:
          'Die ganze Interaktion besteht aus einem Schritt: Tag, Monat, Jahr. Das Interface ' +
          'durchlief zwei Fassungen — zuerst eng an der Aesthetik des Nokia 3310, dann ' +
          'zugunsten einer stimmigeren Gestaltung ueberarbeitet.', // TODO
        files: ['zodizine-01'],
        layout: 'wide',
      },
      {
        title: 'Technischer Aufbau',
        text:
          'Die Arbeit lief parallel: Cara entwickelte die visuelle Identitaet und ein ' +
          'Datenset mit den Charakteristika der Sternzeichen aus drei astrologischen ' +
          'Systemen. Ich habe die Infrastruktur gebaut — Raspberry Pi im Kiosk-Modus, die ' +
          'Oberflaeche und die Logik, die Geburtsdaten in personalisierte Layouts uebersetzt ' +
          'und daraus ein PDF erzeugt.', // TODO
        files: ['zodizine-02', 'zodizine-03'],
        layout: 'track',
      },
      {
        title: 'ZodiZine in Anwendung',
        text:
          'Der Automat im Betrieb am Tag der Medien. Für die räumliche Inszenierung haben ' +
          'wir uns an Wahrsagersalons bedient: Tücher verdeckten die Umgebung und erzeugten ' +
          'eine mystische Atmosphäre. So wird der nüchterne Automat zum rituellen Ort.',
        embed: 'https://youtu.be/Ivilxs3Gcxg',
        files: ['dji'],
        layout: 'wide',
      },
      {
        title: 'Das Zine als Artefakt',
        text:
          'Der Automat inszeniert den Uebergang vom Digitalen zum Analogen als koerperliches ' +
          'Ritual: die Beruehrung des Touchscreens, das gespannte Warten, waehrend Drucker ' +
          'und Mechanik arbeiten, schliesslich die Uebergabe des noch warmen Papiers. Die ' +
          'Faltung macht den Nutzer zum Mitproduzenten. Aus flachen Boegen entsteht ein ' +
          'dreidimensionales Objekt. Jedes Zine traegt individuelle Spuren und existiert als ' +
          'Unikat in einer Serie von Unikaten.', // TODO
        textOnly: true,
      },
    ],
  },
];
