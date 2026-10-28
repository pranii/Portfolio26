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
    'Logic Pro',
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
        title: 'Das Magazin',
        text:
          'Das Heft führt durch die Modelle hinter der Arbeit: Freuds Instanzenmodell, ' +
          'Melanie Kleins Objektbeziehungstheorie, Pete Walkers vier Überlebensstrategien. ' +
          'Der Satz, auf den alles hinausläuft: Jede dieser Strategien hat einmal ' +
          'funktioniert. Sie war nie ein Charakterfehler.',
        files: [],
        prototypHier: true,
      },
      {
        title: 'Technischer Aufbau',
        text:
          'Vier Videoakte und ein Soundtrack aus 42 Spuren laufen über Projektion und ' +
          'Lautsprecher in den Raum. Fünf Phasen geben vor, was wann zu sehen und zu hören ' +
          'ist; am Ende stehen Telefonzellen, in denen die Besucher selbst erzählen können.',
        files: [],
        aufbau: 'rreth',
      },
      {
        title: 'Vier Akte',
        text:
          'Die Bachelorarbeit von 2021 bis 2023. Die Akte tragen albanische Namen — ' +
          '„Themeli" (Grundstein) zeigt die Reaktionsmuster aus der Kindheit, „Shprehje ' +
          'Emocionale" übersetzt in Tanz, was ein Trigger auslöst, „Metamorfoza" ist der ' +
          'Wendepunkt, „Çlirim" die Katharsis, in der zum ersten Mal Farbe ins Bild kommt. ' +
          'Die ersten drei Akte sind streng schwarzweiß. Getanzt von Carina Borgards, gebaut ' +
          'aus Rotoskopie, EbSynth und 42 Tonspuren.',
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
        title: 'Projektpitch',
        text:
          '2025 im Master noch einmal überarbeitet, zu dritt mit Cara Brüggendieck und Laura ' +
          'Zahn. Daraus wurde ein Raum, der sich dreht: kaltes Licht, gedämpfte Klänge, ' +
          'alles still und fast kontrolliert. Auf dem Karussell zeigen sich die gewohnten ' +
          'Pausen und inneren Grenzen — und verwandeln sich in Offenheit, in Verbindung, in ' +
          'ein geteiltes Bewusstsein. Vorgearbeitet wurde viel; die Umsetzung musste aus ' +
          'Zeitgründen warten.',
        files: ['pitch-version-1'],
        layout: 'track',
      },
      {
        title: 'Erster Einblick',
        text:
          'Drehbuch, Regie und Schnitt: Pranvera Pelaj, Cara Brüggendieck, Laura Zahn. ' +
          'Kamera und Licht: Joscha Reuther, Jan Borghart.',
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
    pull: 'Ich werde an dir zu mir.',
    chapters: [
      {
        title: 'Himmel und Hölle',
        text:
          'Wer gegenübersteht, ist nicht das Fremde, sondern dasselbe in anderer Gestalt. ' +
          'Diesen Satz wollte ich nicht als Spruch weitergeben, sondern als Erfahrung. Also ' +
          'ein Spiel, das zwei Fremde zueinander bringt, ohne dass einer anfangen muss. ' +
          'Daraus wurde die Idee, mit dem zu spielen, was zwischen Fremden immer zuerst da ' +
          'ist: Misstrauen.',
        files: [],
        textOnly: true,
      },
      {
        title: 'Technischer Aufbau',
        text:
          'Zwei Arcade-Knöpfe, ein Raspberry Pi, ein Display im Nokia-Format. Jeder Knopf ' +
          'gehört zu einer Figur und leuchtet nur, wenn sie spricht. Am Ende löst die Kamera ' +
          'aus und der Bon-Drucker gibt die Begegnung durchnummeriert aus.',
        files: [],
        aufbau: 'in-lakech',
      },
      {
        title: 'Automat in Aktion',
        text:
          'Die beiden Figuren heißen Taiyo und Tsuki, Sonne und Mond. Sie streiten sich im ' +
          'Pokémon-Stil durch ein Duell, bis die Frage steht: to die or to live together? Am ' +
          'Ende der Vertrauenstest — „Kann ich dir vertrauen?", „Das hat weh getan", „Ich hab ' +
          'dich trotzdem lieb." Weiter geht es nur, wenn beide gleichzeitig drücken.',
        files: ['in-benutzung'],
        layout: 'wide',
        embed: { url: 'https://youtube.com/shorts/W-grDBfjafc', stumm: true },
      },
      {
        title: 'Gedruckte Begegnungen',
        text:
          'Jede gelungene Begegnung wird fotografiert und auf einen Kassenbon gedruckt, ' +
          'durchnummeriert. Zwei Menschen, die sich vorher nicht kannten, halten danach ' +
          'denselben Zettel in der Hand.',
        files: ['begegnung'],
        layout: 'track',
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
      'gerade passiert, und romantisieren es später durch den Filter von Social Media. Ein ' +
      'alter Röhrenmonitor am Ausgang des Aufzugs, gesteuert nur mit Körperhaltung und ' +
      'Handbewegung.',
    year: '2026',
    role: 'Konzept, Gestaltung, Interaktion',
    client:
      'Städtische Galerie Villingen-Schwenningen, März–April 2026. Mit Julia Mamani und ' +
      'Cara Brüggendieck',
    tools: ['TouchDesigner', 'Photoshop', 'CRT-Monitore'],
    tags: ['Installation', 'Interaktionsdesign', 'TouchDesigner', 'Liminalitaet'],
    pull: 'Was bleibt, wenn der Schein trügt?',
    // Video statt Titelbild oben auf der Seite.
    // Dieselbe Erkennung wie in der Galerie, nur mit MediaPipe statt
    // TouchDesigner: zwei Monitore und der Satz unter dem Nebel.
    prototyp: { art: 'nostalgia', titel: 'Selbst ins Bild treten' },
    chapters: [
      {
        title: 'Die Schwelle',
        text:
          'Den Namen habe ich zuerst bei Likana Cana gelesen. Kurz darauf ging es in der ' +
          'Hochschule um Liminalität — den Zustand zwischen zwei Zuständen — und da war die ' +
          'Idee da. Aus Brainstorming und Materialarchiv kamen drei Stränge: Sprache, ' +
          'nationale Identität, Spiritualität. Daraus die These: Nostalgie ist kein ' +
          'Erinnern, sondern ein Ausweichen. Wir lassen das, was gerade passiert, nicht an ' +
          'uns heran und holen es später gefiltert zurück.',
        files: [],
        textOnly: true,
      },
      {
        title: 'Technischer Aufbau',
        text:
          'Eine Kamera liest Abstand und Haltung aus, TouchDesigner rechnet daraus ' +
          'Schwellenwerte und legt beide Ebenen übereinander auf einen Röhrenmonitor. Je ' +
          'weiter man weg steht, desto gröber das Raster — beim Herangehen löst sich das ' +
          'Bild auf. Die Ästhetik kommt vom Signalfehler: RGB-Versatz, Rauschen, verrissene ' +
          'Zeilen. Was auf einem modernen Bildschirm wie ein Defekt aussieht, ist auf der ' +
          'Röhre normal.',
        files: [],
        aufbau: 'nostalgia',
      },
      {
        title: 'Niemand bedient etwas',
        text:
          'Wer aus dem Aufzug tritt, steht im Bild, bevor er es merkt. Es gibt nichts zu ' +
          'bedienen: Der Abstand zum Schirm und die Hand vor der Kamera sind die ganze ' +
          'Steuerung — die beiden Plakate erklären das wortlos. Oben läuft dieselbe ' +
          'Erkennung im Browser.',
        files: ['final'],
        layout: 'grid',
      },
      {
        title: 'Im Raum',
        text: 'Die Installation in der Städtischen Galerie.',
        files: [],
        embed: 'https://youtu.be/RwLj7i3BUq4',
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
      'Mit Cara Brüggendieck und Kathrin Krell. Betreut von Prof. Norbert Schnell und Peter Kirschenbauer',
    tools: ['Web Audio API', 'JavaScript', 'Polycam', 'InDesign'],
    tags: ['Klanginstallation', 'Raum', 'Wahrnehmung', 'Interaktion'],
    pull: 'Kann ich meinen Sinnen überhaupt trauen?',
    // Der Hoersaal als Grundriss zum Durchlaufen — mit demselben Klang
    // und denselben drei Parametern wie die Installation.
    prototyp: { art: 'shepard', titel: 'Den Raum durchlaufen' },
    chapters: [
      {
        title: 'Technischer Aufbau',
        text:
          'Geplant war eine Installation mit Positionstracking. Auf Rat von Prof. Norbert ' +
          'Schnell haben wir radikal vereinfacht und uns auf drei Parameter beschränkt: ' +
          'Geschwindigkeit, Richtung, Lautstärke. Weniger ging nicht, mehr brauchte es nicht.',
        files: [],
        aufbau: 'shepard-tone',
      },
      {
        title: 'Elf Oszillatoren',
        text:
          'Elf Oszillatoren decken 20 Hz bis 20.480 Hz in Oktaven ab, eine Hüllkurve macht ' +
          'die Ränder unhörbar — deshalb hört niemand, wann ein Ton verschwindet und am ' +
          'anderen Ende wieder auftaucht. Dazu eine projizierte optische Illusion als ' +
          'visuelles Gegenstück.',
        files: [],
        textOnly: true,
      },
      {
        title: 'Der Weg nach unten',
        text:
          'Der Grundriss entscheidet: Nur ein Weg führt links durch den Vorlesungssaal, alles ' +
          'andere versperren die Sitzreihen. Jeder geht dieselbe Strecke. Stehenbleiben und ' +
          'zuschauen geht nicht — der Weg durch den Raum ist die Arbeit. Oben lässt sich der ' +
          'Saal durchlaufen, mit demselben Klang.',
        files: [],
        textOnly: true,
      },
    ],
  },
  {
    slug: 'interaktionsdesign',
    title: 'Inner Flow',
    subtitle: 'Multimodale Visualisierung emotionaler Zustände',
    cover: 'header',
    description:
      'Eine Anwendung, die während einer Therapiesitzung Mimik, Stimme und Puls mitliest und ' +
      'daraus einen Verlauf zeichnet — als Gesprächsgrundlage für die Nachbesprechung, nicht ' +
      'als Diagnose. Alles läuft lokal, Rohbilder werden nie gespeichert.',
    year: '2026',
    role: 'Experteninterviews, Video- und Audioanalyse, Prototyp, Evaluation',
    client:
      'Mit Rosa Stark, Johannes Merschroth und Marla Speth. Modul Interaktionsdesign bei ' +
      'Prof. Dr.-Ing. Thomas Schlegel, Hochschule Furtwangen',
    tools: [
      'Python',
      'DeepFace',
      'OpenCV',
      'librosa',
      'scikit-learn',
      'FastAPI',
      'SQLite',
      'Streamlit',
      'Figma',
      'InDesign',
    ],
    tags: ['Interaktionsdesign', 'UX-Research', 'Prototyp', 'Datenvisualisierung'],
    pull: 'Die Einschätzung der Klient:innen steht über der KI.',
    prototyp: { art: 'innerflow', titel: 'Selbst messen lassen' },
    chapters: [
      {
        title: 'Beschreiben reicht nicht',
        text:
          'Therapeut:innen stützen sich auf das, was sie sehen und hören. Nur: Viele ' +
          'Klient:innen erinnern Erlebtes ungenau, finden keine Worte für ihr Befinden oder ' +
          'passen ihr Verhalten an — aus Scham, aus Angst vor Bewertung. Daraus wurde unsere ' +
          'Frage: Wie kann eine multimodale Visualisierung emotionaler Zustände ' +
          'Therapeut:innen helfen, Reaktionen besser zu erfassen und einzuordnen?',
        files: [],
        textOnly: true,
      },
      {
        title: 'Drei Psycholog:innen gefragt',
        text:
          'Ich habe drei angehende Psycholog:innen interviewt. Ihre Antworten haben das ' +
          'Projekt gedreht. Heute messen sie mit Skalierungsfragen und Fragebögen, achten ' +
          'nebenbei auf gebrochene Stimme, monotonen Tonfall, vermiedenen Blickkontakt. Von ' +
          'konkreten Emotionslabels hielten sie wenig — Emotionen ließen sich ohnehin kaum ' +
          'trennen. Was zählt, sind Tendenzen und Muster im Verlauf. Und ein Satz blieb ' +
          'hängen: Ein technisches Werkzeug darf den Vertrauensaufbau nicht stören. Daraus ' +
          'wurden die Leitplanken — lokale Verarbeitung, nachvollziehbare Logik, und die ' +
          'Selbstwahrnehmung der Klient:innen zählt mehr als jede Messung.',
        files: [],
        textOnly: true,
      },
      {
        title: 'Technischer Aufbau',
        text:
          'Drei Eingänge, alle lokal: Die Kamera liest über OpenCV und DeepFace die Mimik, ' +
          'das Mikrofon über librosa die Stimme — Lautstärke, Tonhöhe, Sprechtempo, Pausen —, ' +
          'ein Wearable den Puls. Jede Messung landet auf den drei Achsen des PAD-Modells ' +
          '(Valenz, Arousal, Dominanz) und mit Zeitstempel in einer SQLite-Datenbank, aus der ' +
          'das Dashboard sie liest. Keine Cloud, keine Rohbilder — nur abstrahierte Werte. ' +
          'Den Puls mussten wir simulieren: An der Hochschule war kein Wearable aufzutreiben.',
        files: [],
        aufbau: 'interaktionsdesign',
      },
      {
        title: 'Zwei Fenster',
        text:
          'Hier laufen die beiden Messungen im Browser, nach demselben Prinzip wie im ' +
          'Prototyp: oben der Eingang, darunter eine Liste, die alle 0,4 Sekunden notiert und ' +
          'nur die letzten beiden Einträge zeigt. Beim Ton gibt es eine Stilleschwelle. Die ' +
          'brauchte es auch im Projekt: Das Modell war auf einem Datensatz ohne Pausen ' +
          'trainiert und hat jede Stille als „happy" gelesen.',
        files: [],
        prototypHier: true,
      },
      {
        title: 'Was der Test gezeigt hat',
        text:
          'Zwei Probanden haben eine Therapiesitzung gespielt — einer als Klient mit Kamera ' +
          'und Mikrofon, einer als Therapeut. Aus den Messwerten wurde das Dashboard gebaut ' +
          'und einer angehenden Psychologin vorgelegt. Ihre Kritik traf den Kern: Grün, Gelb ' +
          'und Rot liest man als Ampel — und damit werden Gefühle ungewollt richtig oder ' +
          'falsch. Und weil nirgends eine Konfidenz stand, wirkten die Werte eindeutiger, als ' +
          'sie sind. Beides ist genau das, was ein solches Werkzeug nicht tun darf.',
        files: [],
        textOnly: true,
      },
      {
        title: 'Was bliebe zu tun',
        text:
          'Die Farbcodierung müsste raus aus der Bewertung, die Unsicherheit sichtbar ' +
          'werden — Konfidenzbereiche je Modalität, erklärende Texte, Notizen mit ' +
          'Zeitstempel für den Kontext. Technisch fehlen definierte ' +
          'Synchronisationsfenster, die Audioanalyse hängt drei bis fünf Sekunden hinterher, ' +
          'und der simulierte Puls müsste einem echten Sensor weichen. Was bleibt, ist die ' +
          'Haltung: Das System liefert Gesprächsanlässe, keine Diagnosen.',
        files: [],
        textOnly: true,
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
      'Mit Cara Brüggendieck. Modul "Inszenierung Interaktiver Medien", Master Design Interaktiver Medien',
    tools: ['React', 'Flask', 'Raspberry Pi', 'ReportLab', 'InDesign'],
    tags: ['Interaktion', 'Zine', 'Prototyp', 'Generative Gestaltung'],
    prototyp: { art: 'zodizine', titel: 'Der Automat im Browser', label: 'Automat ausprobieren' },
    pull: 'Banalität als Input, Interaktion als Verstärker, Emotion als Ziel.',
    chapters: [
      {
        title: 'Technischer Aufbau',
        text:
          'Ein Touchscreen nimmt Tag, Monat und Jahr. Ein Raspberry Pi im Kiosk-Modus ' +
          'rechnet daraus die Zeichen aus drei Tierkreisen, setzt sie mit ReportLab zu einem ' +
          'A4-Bogen und schickt ihn an den Drucker. Acht Seiten auf einem Blatt, gefaltet ' +
          'wird von Hand. Alles läuft offline.',
        files: [],
        aufbau: 'zodizine',
      },
      {
        title: 'Das warme Papier',
        text:
          'Für die Inszenierung haben wir uns an Wahrsagersalons bedient: Tücher verdecken ' +
          'die Umgebung, der nüchterne Automat wird zum rituellen Ort. Die Berührung des ' +
          'Touchscreens, das Warten, während die Mechanik arbeitet, die Übergabe des noch ' +
          'warmen Papiers. Die Faltung macht den Nutzer zum Mitproduzenten — jedes Zine ist ' +
          'ein Unikat in einer Serie von Unikaten.',
        files: [],
        embed: 'https://youtu.be/Ivilxs3Gcxg',
      },
    ],
  },
];
