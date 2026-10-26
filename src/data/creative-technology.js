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
      'Rreth ist ein Herzensprojekt, das 2020 mit einem kleinen Magazin und einem Schluesselanhaenger begann. Daraus hat sich ein Magazin entwickelt, das als Wegweiser durch verschiedene psychologische Modelle dient, und schliesslich eine zwanzigminuetige Rauminstallation zum Thema Scham: Sie fuehrt Besucher durch fuenf Phasen, von absoluter Dunkelheit ueber konfrontierende Video-Akte bis in einen hellen Raum, in dem anonyme Telefonzellen stehen und Menschen ihre eigene Geschichte erzaehlen koennen. Magazin und Rauminstallation sollen sich gegenseitig ergaenzen — die Rauminstallation als emotionale Reise, das Magazin als Wegweiser durch die Modelle dahinter. Rreth ist albanisch fuer Kreis.', // TODO
    year: '2023 - 2026',
    role: 'Konzeption, Recherche, Regie, Rauminstallation, Gestaltung',
    tools: ['Premiere Pro', 'EbSynth', 'Ableton', 'InDesign', 'Photoshop'],
    tags: ['Rauminstallation', 'Film', 'Partizipation', 'Editorial'],
    pull: 'Die ploetzliche Stille ist fast lauter als der Laerm.',
    chapters: [
      // TODO: RRETH1.pdf (das 2020er Magazin + der Schluesselanhaenger, mit dem
      // alles begann) fehlt noch als Datei. Sobald es vorliegt, hier als erstes
      // Kapitel im Karussell-Layout einfuegen, z.B.:
      //   { title: '2020 — Magazin und Schluesselanhaenger', files: ['rreth1'], layout: 'track' }
      {
        title: 'Worum es geht',
        text:
          'Mir geht es darum, Verhaltensweisen zu erkennen, die einmal als Schutzmechanismus ' +
          'gedient haben — und dann bewusst gegen den eigenen Impuls zu handeln, fuer ein ' +
          'schoeneres Miteinander. Das Magazin legt die Grundlage dafuer: Es fuehrt vom ' +
          'Instanzenmodell nach Freud ueber Melanie Kleins Objektbeziehungstheorie zu Pete ' +
          'Walkers vier Ueberlebensstrategien — Kampf, Flucht, Erstarrung, Unterwerfung — und ' +
          'endet bei konkreten Gedankenkorrekturen. Jede dieser Strategien hat einmal ' +
          'funktioniert. Das ist der Punkt: Sie war nie ein Charakterfehler, sondern eine ' +
          'Loesung fuer eine Situation, die so heute nicht mehr herrscht.',
        files: ['rreth02'],
        layout: 'track',
      },
      {
        title: 'Erste Skizzen',
        text: 'RAUMINSTALLTION: Angefangen hat es mit vielen Tagebucheinträgen und Brainstorms. Geendet hat es in folgendes Konzept: Paranoia, Dissoziation, Dissonanz. Aus diesen Wortfeldern hat sich herausgeschaelt, dass es nicht um Depression gehen sollte, sondern um Scham.', // TODO
        files: ['have'],
        layout: 'grid',
      },
      {
        title: 'Erste Präsentation',
        text: '"Take It All Off - Break the Silence" in Schwarz und Rot. Die Aufforderung und ihr Preis nebeneinander. Mit dieser ersten Praesentation und dem ersten Projektpitch sind Cara und Laura mit in das Projekt eingestiegen.', // TODO

        files: ['wheel-of-shame'],
        layout: 'track',
      },
      //   Hier möchte ich bitte auch nochmal ein Karussell einfügen als PDF. Bitte erinnere mich daran Claude

      {
        title: 'Symbolik der Akte',
        text: 'Fuer jeden Akt wurde ein eigenes Symbol gewählt. Jedes steht fuer eine Form von Kreislauf, aus dem man alleine schwer herauskommt. Auf die Symbole haben Cara und ich uns gemeinsam geeinigt.', // TODO
        files: ['symbolik'],
        layout: 'grid',
      },
      {
        title: 'Raumkonzept',
        text: 'Die Handskizzen legen fest, wie der Besucher durch den Raum gefuehrt wird: Video- und Audioinstallation, Warteraum, Telefonzelle. Die Architektur ist Teil der Dramaturgie, nicht nur ihr Behaelter. Ausgestellt werden sollte die Installation in Kooperation mit der Halle93 in Stuttgart, was aus Zeitgruenden verschoben werden musste. Die neue Raumskizze hat Laura Zahn im Rahmen einer Ausstellung an der School of Design an Media entwickelt.', // TODO
        files: ['in-halt', 'raumskizze-laura'],
        layout: 'track',
      },
      {
        title: 'Projektpitch',
        text: 'Der finale Pitch beschreibt alle fuenf Phasen einzeln: Farbe, Ton, Gefuehl, Zeitdauer und Referenz.', // TODO
        files: ['pitch-version-1'],
        layout: 'track',
      },

      // Hier möchte ich auch noch Platz für ein Video welches ich mit einbette im Nachhinein.
      {
        title: 'Zukunftsausblick',
        text:
          'Fuer die Ausstellung war eine Instagram-Kampagne geplant: kurze Videos, selbst ' +
          'aufgenommen und mit KI weiterbearbeitet, dazu Captions in der ersten Person — ' +
          '"We eat shame for breakfast", "I have no mouth but I need to scream". Jeder Post ' +
          'traegt den Namen eines Musters statt eines Titels: Suppressing, Self Sabotage, ' +
          'Self Destruction. Aus Zeitgruenden ist die Kampagne verschoben. Die Installation ' +
          'soll in zwei Jahren erneut aufgefuehrt werden — bis dahin entsteht eine neue ' +
          'Auflage des Magazins, und an den Videos wird weitergearbeitet.',
        files: ['rreth-kampagne'],
        layout: 'track',
      },
    ],
  },
  {
    slug: 'in-lakech',
    title: 'In Lak’ech',
    subtitle: 'Ein Begegnungsautomat fuer den oeffentlichen Raum',
    cover: 'begegnung-02',
    description:
      'Entstanden in einem fuenfwoechigen Workshop mit der Aufgabe, eine Begegnung im ' +
      'oeffentlichen Raum zu schaffen. Herausgekommen ist ein Automat fuer zwei Fremde: ' +
      'ein Videospiel im Nokia-3310-Look, programmiert in Python auf einem Raspberry Pi, ' +
      'bedient ueber zwei Arcade-Knoepfe. Zwei Figuren streiten sich im Pokemon-Stil ' +
      'durch ein Duell — bis am Ende die Frage steht: to die or to live together? Nur ' +
      'wenn beide gleichzeitig druecken, loest die Kamera aus und der Kassenbon-Drucker ' +
      'gibt ein Foto der Begegnung aus, durchnummeriert.', // TODO
    year: '2026',
    role: 'Konzept, Gestaltung, Programmierung',
    tools: ['Python', 'Pygame', 'Raspberry Pi', 'Photoshop'],
    tags: ['Installation', 'Game', 'Partizipation', 'Raspberry Pi', 'Public Space'],
    spielbar: { href: 'inlakech.html', label: 'Prototyp spielen' },
    pull: 'Ich werde an dir zu mir.',
    chapters: [
      {
        title: 'Visions',
        text:
          'Ausgangspunkt und Inspirationsquelle: Collagen aus Fundstuecken, Farbe und ' +
          'Handschrift. Aus dieser Bildwelt kam die Entscheidung, nicht mit Hochglanz zu ' +
          'arbeiten, sondern mit etwas Gebrauchtem und Lautem.', // TODO
        files: ['visions'],
        layout: 'grid',
      },
      {
        title: 'Arcade',
        text:
          'Auf Rasterpapier wurde das Spiel grob aufgezeichnet: Bildschirmaufbau, ' +
          'Dialogbox, wo die Figuren stehen, wo der Timing-Balken sitzt. Das Raster ' +
          'entsprach dabei schon dem spaeteren Pixelbild.', // TODO
        files: ['arcade'],
        layout: 'track',
      },
      {
        title: 'Taiyo und Tsuki',
        text:
          'Die beiden Figuren heissen Sonne und Mond. Jede sitzt auf einer Seite des ' +
          'Bildschirms und gehoert zu einem Arcade-Knopf, der nur leuchtet, wenn sie ' +
          'spricht. Die Angriffs-Animationen hat Julien Truebiger erstellt.', // TODO
        files: ['hand', 'animation'],
        layout: 'grid',
      },
      {
        title: 'In Lak’ech — Begegnungen',
        text:
          'Das Ergebnis: jede gelungene Begegnung wird fotografiert und auf einem ' +
          'Kassenbon ausgedruckt, mit fortlaufender Nummer. Zwei Menschen, die sich ' +
          'vorher nicht kannten, halten danach denselben Zettel in der Hand.', // TODO
        files: ['begegnung'],
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
    cover: 'shephard-tone-doku-s01',
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
          'Der Automat im Betrieb am Tag der Medien. Fuer die raeumliche Inszenierung haben ' +
          'wir uns an Wahrsagersalons bedient: Tuecher verdeckten die Umgebung und erzeugten ' +
          'eine mystische Atmosphaere. So wird der nuechterne Automat zum rituellen Ort.', // TODO
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
