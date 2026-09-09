/**
 * UNI — Studienprojekte.
 * Aufbau wie in arbeit.js: jedes Projekt hat Kapitel mit Text und `files`.
 * Texte sind Entwuerfe, bei TODO bitte ueberschreiben.
 */

export const category = {
  slug: 'uni',
  title: 'Uni',
  lead: 'Studienprojekte zwischen Rauminstallation, Magazin, Game Design und Interaktion — die Arbeiten, in denen am meisten ausprobiert wurde und am meisten schiefgehen durfte.', // TODO
};

export const projects = [
  {
    slug: 'rreth',
    title: 'Rreth',
    subtitle: 'Take It All Off // Break the Silence',
    cover: 'header',
    description:
      'Rreth ist ein Herzensprojekt, das 2020 mit einem kleinen Magazin und einem Schluesselanhaenger begann. Daraus hat sich ein Magazin entwickelt, das als Wegweiser durch verschiedene psychologische Modelle dient, und schliesslich eine zwanzigminuetige Rauminstallation zum Thema Scham: Sie fuehrt Besucher durch fuenf Phasen, von absoluter Dunkelheit ueber konfrontierende Video-Akte bis in einen hellen Raum, in dem anonyme Telefonzellen stehen und Menschen ihre eigene Geschichte erzaehlen koennen. Magazin und Rauminstallation sollen sich gegenseitig ergaenzen — die Rauminstallation als emotionale Reise, das Magazin als Wegweiser durch die Modelle dahinter. Rreth ist albanisch fuer Kreis.', // TODO
    year: '2026',
    role: 'Konzept, Regie, Rauminstallation, Gestaltung',
    tools: ['Premiere Pro', 'InDesign', 'Photoshop'],
    tags: ['Rauminstallation', 'Film', 'Partizipation', 'Editorial'],
    pull: 'Die ploetzliche Stille ist fast lauter als der Laerm.',
    chapters: [
      // TODO: RRETH1.pdf (das 2020er Magazin + der Schluesselanhaenger, mit dem
      // alles begann) fehlt noch als Datei. Sobald es vorliegt, hier als erstes
      // Kapitel im Karussell-Layout einfuegen, z.B.:
      //   { title: '2020 — Magazin und Schluesselanhaenger', files: ['rreth1'], layout: 'track' }
      {
        title: 'Erste Skizzen',
        text: 'Angefangen hat es an einer Wand voller Zettel: Paranoia, Dissoziation, Dissonanz. Aus diesen Wortfeldern hat sich herausgeschaelt, dass es nicht um Depression gehen sollte, sondern um Scham.', // TODO
        files: ['have'],
        layout: 'grid',
      },
      {
        title: 'Symbolik der Akte',
        text: 'Fuer jeden Akt habe ich ein eigenes Bildmotiv gesucht — Karussell, Maske, Wasser, Zug. Jedes steht fuer eine Form von Kreislauf, aus dem man nicht von allein herauskommt. Auf die Symbole haben Cara und ich uns gemeinsam geeinigt.', // TODO
        files: ['symbolik'],
        layout: 'grid',
      },
      {
        title: 'Raumkonzept',
        text: 'Die Handskizzen legen fest, wie der Besucher durch den Raum gefuehrt wird: Video- und Audioinstallation, Warteraum, Telefonzelle. Die Architektur ist Teil der Dramaturgie, nicht nur ihr Behaelter. Ausgestellt werden sollte die Installation in Kooperation mit der Halle93 in Stuttgart, was aus Zeitgruenden verschoben werden musste. Die neue Raumskizze hat Laura Zahn entwickelt, in Kooperation mit der Gastronomie "Roessle".', // TODO
        files: ['in-halt', 'skam-koh-per-depressiona', 'raumskizze-laura'],
        layout: 'track',
      },
      {
        title: 'Key Visual',
        text: 'Das Schluesselbild bringt maskierte Koerper und den Titel zusammen: "Take It All Off" in Schwarz, "Break the Silence" in Rot — die Aufforderung und ihr Preis nebeneinander. Mit dieser ersten Praesentation und dem ersten Projektpitch sind Cara und Laura mit in das Projekt eingestiegen.', // TODO
        files: ['wheel-of-shame'],
        layout: 'track',
      },
      {
        title: 'Projektpitch',
        text: 'Der finale Pitch beschreibt alle fuenf Phasen einzeln: Farbe, Ton, Gefuehl, Zeitdauer und Referenz. Phase eins ist absolute Dunkelheit mit Theta-Wellen, Phase drei eine einzige Minute Stille — ohne Pause keine Katharsis.', // TODO
        files: ['pitch-version-1'],
        layout: 'track',
      },
      {
        title: 'Reflexion',
        text: 'Im Rueckblick: Manches hat im Raum funktioniert und die Besucher tatsaechlich erreicht, manches war am Ende nur mir wichtig.', // TODO
        files: [],
        textOnly: true,
      },
      // Die fuenf Videoarbeiten (Karussell, Maske, Void, Water, Zug) sind
      // zwischen 278 und 753 MB gross und noch nicht komprimiert.
      // Nach dem Komprimieren oben im Projekt ergaenzen:
      //   extraVideos: ['/media/uni/rreth/karussell.mp4', ...],
      // und hier ein Kapitel mit files: ['karussell', 'maske', ...] anlegen.
    ],
  },

  {
    slug: 'nostalgia',
    title: 'Nostalgia is a Portal',
    subtitle: 'Interaktive Videoinstallation',
    cover: 'header',
    description:
      'Eine Videoinstallation ueber Nostalgie als Abwehrmechanismus: Wir verdraengen, was gerade passiert, und romantisieren es spaeter durch den Filter von Social Media, statt es zu verarbeiten. Zwei alte Roehrenmonitore stehen an den Ausgaengen des Aufzugs — gesteuert wird nur mit Koerperhaltung und Handbewegung, ohne Controller.', // TODO
    year: '2026',
    role: 'Konzept, Gestaltung, Interaktion',
    client: 'Staedtische Galerie Villingen-Schwenningen, Maerz–April 2026',
    tools: ['TouchDesigner', 'Photoshop', 'CRT-Monitore'],
    tags: ['Installation', 'Interaktionsdesign', 'TouchDesigner', 'Liminalitaet'],
    pull: 'Was bleibt, wenn der Schein trügt?',
    extern: {
      href: 'https://pranii.github.io/Nostalgia_IsAPortal/',
      label: 'Prozess-Journal ansehen',
      note: 'Die vollstaendige Dokumentation als eigene Webseite.',
    },
    chapters: [
      {
        title: 'Recherche',
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
        files: ['marketing'],
        layout: 'wide',
      },
      {
        title: 'Plakate',
        text: 'Das Titelplakat greift den Chromlook der Nullerjahre auf, die beiden Steuerungsplakate erklaeren wortlos, wie man mit dem Koerper spielt — Hand vor die Kamera, Position im Raum.', // TODO
        files: ['final'],
        layout: 'grid',
      },
      {
        title: 'Aufbau in der Galerie',
        text: 'In der Staedtischen Galerie stand die Roehre auf einem verhuellten Tisch, daneben die Plakate. Der Aufbau sollte provisorisch wirken, als haette jemand das Geraet dort vergessen.', // TODO
        files: ['liminal'],
        layout: 'grid',
      },
      {
        title: 'Die Installation im Betrieb',
        text: 'So sah es aus, wenn jemand davorstand: Textfragmente erscheinen und zerfallen wieder — "where does one begin and the other end?", "Light, Future, Past".', // TODO
        files: ['touchdesigner', 'liminalitaet2'],
        layout: 'grid',
      },
    ],
  },

  {
    slug: 'kamamuta',
    title: 'Kama Muta',
    subtitle: 'Ein Magazin ueber das Ergriffensein',
    cover: 'header',
    description:
      'Kama Muta ist das ploetzliche Gefuehl, das entsteht, wenn Naehe unerwartet spuerbar wird — Gaensehaut bei einer Umarmung, Traenen bei einem fremden Lied. Das Magazin versucht, dieses Gefuehl nicht zu erklaeren, sondern herzustellen: Leser werden aufgefordert, selbst Begegnungen zu machen.', // TODO
    year: '2026',
    role: 'Konzept, Gestaltung, Fotografie, Illustration',
    tools: ['InDesign', 'Photoshop', 'After Effects'],
    tags: ['Editorial', 'Magazin', 'Fotografie', 'Partizipation'],
    pull: 'In Lak’ech — ich bin ein anderes Du.',
    chapters: [
      {
        title: 'Erste Ideen',
        text: 'Am Anfang standen Handlungsanweisungen statt Artikel: "Mache ein Foto mit der dir gegenueber sitzenden Person. Tausche Adresse und Namen aus." Das Magazin sollte etwas verlangen, nicht nur etwas zeigen.', // TODO
        files: ['first-ideas'],
        layout: 'track',
      },
      {
        title: 'Archiv und Notizen',
        text: 'Parallel lief ein Notizarchiv mit Saetzen, die spaeter Kapitelnamen wurden — darunter der Gedanke, Verbindung als Spiegel zur Aussenwelt zu begreifen.', // TODO
        files: ['archive'],
        layout: 'track',
      },
      {
        title: 'Spaziergang',
        text: 'Ein ganzes Kapitel entstand beim Gehen: Bleistiftskizzen von Dingen am Weg, die zufaellig etwas ausloesen — eine Lampe, ein Stuhl, eine Treppe.', // TODO
        files: ['spaziergang'],
        layout: 'track',
      },
      {
        title: 'Black Swan',
        text: 'Fuer das Kapitel Black Swan habe ich mit Klebezetteln gearbeitet, um die Reihenfolge der Doppelseiten so lange zu verschieben, bis der Rhythmus stimmte.', // TODO
        files: ['black-swan'],
        layout: 'track',
      },
      {
        title: 'Arcade',
        text: 'Auf Rasterpapier wurden die Layouts konkret: wo Text steht, wo Bild, wo bewusst nichts.', // TODO
        files: ['arcade'],
        layout: 'track',
      },
      {
        title: 'Visions',
        text: 'Visions ist der lauteste Teil — Collagen aus Fundstuecken, Farbe und Handschrift, als Gegengewicht zu den ruhigen Kapiteln.', // TODO
        files: ['visions', 'veites-kapitee'],
        layout: 'grid',
      },
      {
        title: 'In Lak’ech — Begegnungen',
        text: 'Das Herzstueck: vierundzwanzig Begegnungen, jede als Schwarzweissfoto mit fortlaufender Nummer. Zwei Menschen fotografieren sich gegenseitig und tauschen ihre Namen — genau das, wozu das Magazin auffordert.', // TODO
        files: ['in-lakech'],
        layout: 'grid',
      },
      {
        title: 'Nokia-Animation',
        text: 'Fuer den digitalen Teil habe ich zwei Animationen im Nokia-3310-Raster gebaut: Taiyo und Tsuki, Sonne und Mond.', // TODO
        files: ['nokia'],
        layout: 'track',
      },
      {
        title: 'Prototyp',
        text: 'Am Ende steht das gedruckte Heft — drei Essays, ein Umschlag, und der Beweis, dass die Anweisungen auf Papier funktionieren.', // TODO
        files: ['prototyp', 'kama-muta-magazine-prototype'],
        layout: 'track',
      },
    ],
  },

  {
    slug: 'botlnick-gamejam',
    title: 'Botlnick',
    subtitle: 'Game Jam — Godot, Blender, Photogrammetrie',
    cover: 'header',
    description:
      'Ein Spiel, das aus echten Orten gebaut ist: Tiefgarage, Keller und Hinterhof wurden per Photogrammetrie eingescannt, in Blender aufbereitet und in Godot zu begehbaren Liminal Spaces zusammengesetzt. Entstanden im Game Jam bei Prof. Christoph Mueller und Julien Truebger.', // TODO
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
        title: 'Game Design Dokument',
        text: 'Aus den Ideen wurde ein Dokument mit Core Loop, Kurzzeit- und Langzeitziel. Erst als das stand, durfte gebaut werden.', // TODO
        files: ['game-studies-gdd'],
        layout: 'track',
      },
      {
        title: 'Photogrammetrie',
        text: 'Die Orte habe ich mit Polycam eingescannt: Tiefgarage, Halle, Keller, Hauseingang. Die Rohscans sind loechrig und schief — genau das macht sie fuer Liminal Spaces brauchbar.', // TODO
        files: ['photogrammetrie', 'stagedesignphotogrammetry'],
        layout: 'grid',
      },
      {
        title: 'Charaktere',
        text: 'Die Figuren entstanden als glaenzende Plastikkoerper, die bewusst nicht in die schmutzigen Scans passen — Hauptcharakter, Nebenfigur und ein Automat als stummer Gegenspieler.', // TODO
        files: ['character-ref', 'hauptcharacter', 'nebencharacter', 'sidecharacter'],
        layout: 'track',
      },
      {
        title: 'Level und Look',
        text: 'In Godot wurden die Scans zusammengesetzt und beleuchtet. Der PSX-Look mit niedriger Aufloesung und Vertex-Wobble kaschiert die Scanfehler und setzt sie zugleich in Szene.', // TODO
        files: ['stagedesign', 'liminal-space', 'scenerie', 'screenshot', 'erste-szene-ergebnis'],
        layout: 'grid',
      },
      {
        title: 'Im Spiel',
        text: 'Aufnahmen aus dem laufenden Spiel: Startbildschirm, erste Szene und der Uebergang, an dem der Ton kippt.', // TODO
        files: ['gamejamstartscreen', 'beginning', 'revolution'],
        layout: 'stack',
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
    slug: 'shepard-tone',
    title: 'Shepard Tone',
    subtitle: 'Interaktive Klanginstallation',
    cover: 'header',
    description:
      'Der Shepard-Ton ist eine Hoertaeuschung: eine Tonhoehe, die endlos zu steigen scheint, ohne je hoeher zu werden. Die Installation uebersetzt diese Endlosschleife in einen begehbaren Raum mit mehrkanaliger Lautsprecheranordnung.', // TODO
    year: '2025', // TODO
    role: 'Konzept, Raumgestaltung, Sound',
    tools: ['Ableton Live', 'InDesign', 'Polycam'],
    tags: ['Klanginstallation', 'Raum', 'Interaktion'],
    pull: 'Ein Ton, der ewig steigt und nie ankommt.',
    chapters: [
      {
        title: 'Konzept und Dokumentation',
        text: 'Die Dokumentation fuehrt von der Definition des Shepard-Tons ueber das Raumkonzept und den technischen Aufbau bis zu den Evaluationsergebnissen. Der Raum selbst wurde eingescannt, um die Lautsprecherpositionen planen zu koennen.', // TODO
        files: ['shepard-tone'],
        layout: 'track',
      },
    ],
  },

  {
    slug: 'interaktionsdesign',
    title: 'Inner Flow',
    subtitle: 'Multimodale Visualisierung emotionaler Zustaende',
    cover: 'header',
    description:
      'Eine Studienarbeit im Interaktionsdesign: Wie lassen sich emotionale Zustaende so darstellen, dass sie therapeutische Prozesse unterstuetzen statt sie zu vereinfachen? Entwickelt im Human-Centered-Design-Prozess mit Interviews, Personas und Prototypen.', // TODO
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
      {
        title: 'Bano',
        text: 'Aus demselben Semester stammt Bano, ein Sprachassistent-Interface. Bitte pruefen, ob das hierher gehoert oder ein eigenes Projekt werden soll.', // TODO
        files: ['bano'],
        layout: 'stack',
      },
    ],
  },

  {
    slug: 'zodizine',
    title: 'ZodiZine',
    subtitle: 'Zine-Automat auf dem Raspberry Pi',
    cover: 'header',
    description:
      'Eine Station, an der Besucher ihr Geburtsdatum auf einem Touchscreen eingeben und daraufhin ein persoenliches Zine gedruckt bekommen — berechnet aus chinesischem, indischem und keltischem Tierkreis. Alles laeuft offline auf einem Raspberry Pi.', // TODO
    year: '2026',
    role: 'Konzept, Gestaltung, Umsetzung',
    tools: ['React', 'Flask', 'Raspberry Pi', 'InDesign'],
    tags: ['Interaktion', 'Zine', 'Prototyp', 'Generative Gestaltung'],
    pull: 'Geburtsdatum eingeben, Zine mitnehmen.',
    chapters: [
      {
        title: 'Die Eingabe',
        text: 'Die ganze Interaktion besteht aus einem Schritt: Tag, Monat, Jahr. Das Interface ist bewusst im Pixel-Look gehalten, damit die Station wie ein Automat wirkt und nicht wie eine Website.', // TODO
        files: ['zodizine-01'],
        layout: 'stack',
      },
      {
        title: 'Technischer Aufbau',
        text: 'Vorne React mit TypeScript, hinten Flask, das die Tierkreiszeichen berechnet und mit ReportLab ein PDF baut. Gedruckt wird ueber CUPS direkt vom Pi.', // TODO
        files: ['zodizine-02', 'zodizine-03'],
        layout: 'track',
      },
      {
        title: 'Projektbericht und Doku',
        text: 'Bericht und Videodokumentation halten fest, wie die Station im Betrieb funktioniert hat.', // TODO
        files: ['zineprojektbericht', 'dji'],
        layout: 'track',
      },
    ],
  },

  {
    slug: 'art-of-peace',
    title: 'Art of Peace',
    subtitle: 'Animiertes Storyboard, ausgezeichnet mit dem Medienpreis',
    cover: 'header',
    description:
      'Ein animiertes Storyboard zum Thema Frieden, das mit einem Medienpreis ausgezeichnet wurde.', // TODO
    year: '2025', // TODO
    role: 'Storyboard, Animation',
    tools: ['After Effects', 'Procreate'],
    tags: ['Animation', 'Storyboard', 'Auszeichnung'],
    chapters: [
      {
        title: 'Auszeichnung',
        text: 'Der Scan der Preisverleihung — der Medienpreis fuer das animierte Storyboard.', // TODO
        files: ['medienpreis-scan'],
        layout: 'stack',
      },
      // Das animierte Storyboard (58 MB) ist noch nicht komprimiert.
      // Nach dem Komprimieren oben ergaenzen:
      //   extraVideos: ['/media/uni/art-of-peace/animated-storyboard.mp4'],
      // und hier ein Kapitel mit files: ['animated-storyboard'] anlegen.
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
