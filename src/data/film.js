/**
 * FILM — Kurzfilm, Musikvideo, Animation und Imagefilm.
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
  slug: 'film',
  title: 'Film',
  lead: 'Kurzfilme, Musikvideos, Animation und Imagefilme — von Storyboard bis Schnitt.', // TODO
  /**
   * "So gehe ich vor" — erscheint unter dem Karussell. Vier Schritte
   * sind ideal, mehr oder weniger geht auch.
   */
  vorgehen: [
    // TODO: eigene Formulierung
    {
      title: 'Idee und Recherche',
      text: 'Worum geht es wirklich? Ich sammle Bilder, Musik und Referenzen, bis die Stimmung des Films klar ist.',
    },
    {
      title: 'Storyboard',
      text: 'Jede Einstellung wird vorher gezeichnet. So wissen alle am Set, was gebraucht wird, und der Drehtag bleibt planbar.',
    },
    {
      title: 'Dreh',
      text: 'Kamera, Licht und Regie — mit Raum für das, was am Set ungeplant passiert.',
    },
    {
      title: 'Schnitt und Ton',
      text: 'Im Schnitt entsteht der Rhythmus. Farbe und Sounddesign geben dem Film zum Schluss seinen Charakter.',
    },
  ],
  /**
   * Software, die du in diesem Bereich beherrschst. Zu jedem Eintrag zeigt
   * die Seite, in wie vielen Projekten er unter `tools` vorkommt.
   */
  software: [
    'Premiere Pro',
    'DaVinci Resolve',
    'After Effects',
    'Photoshop',
    'Blender',
    'Storyboarder',
    'Celtx',
    'EbSynth',
  ], // TODO: pruefen
};

export const projects = [
  {
    slug: 'love',
    title: 'Love',
    subtitle: 'Kurzfilm — what love prompts us to do',
    cover: 'header',
    description: '',
    year: '2025',
    role: 'Konzept, Regie, Gestaltung, Sounddesign',
    kontext: 'Kurzfilm, Februar 2025 — Besetzung über ein offenes Casting auf Instagram und TikTok',
    client: 'Dardan Shala',
    tools: ['Photoshop', 'Premiere Pro'],
    tags: ['Kurzfilm', 'Artwork', 'Casting'],
    pull: 'a story of perspective on love',
    chapters: [
      {
        title: 'Offenes Casting',
        text: '',
        files: ['love-03', 'love-01', 'love-02', 'love-04', 'love'],
        layout: 'track',
      },
      {
        title: 'Der Film',
        text: '',
        files: [],
        embed: 'https://youtu.be/kmN_JAU1OH8',
      },
    ],
  },
  {
    slug: 'improtheater',
    title: 'Improtheater',
    cover: 'header',
    subtitle: 'Trailer für ein Improvisationstheaterstück',
    description:
      'Ein Improvisationstheaterstück, gefilmt und auf einen Trailer gebracht. Niemand weiß ' +
      'vorher, wo die Szene hingeht — es gibt keinen zweiten Take.',
    year: '2026',
    kontext: 'Landestheater Tübingen, Juli 2026',
    role: 'Kamera, Schnitt',
    client: 'Joscha Reuther, Jan Bangert',
    tools: ['Premiere Pro'],
    tags: ['Theater', 'Dokumentation', 'Kamera'],
    pull: 'Keine zweite Aufnahme, kein Plan, an den man sich halten könnte.',
    chapters: [
      {
        title: 'Der Trailer',
        text:
          'Gedreht im Juli 2026 in Tübingen beim Landestheater, mit Joscha Reuther und Jan ' +
          'Bangert.',
        files: [],
        embed: 'https://vimeo.com/1227665449/8897decc48',
      },
    ],
  },
  {
    slug: 'musikvideos',
    title: 'Musikvideos',
    subtitle: 'Videos für Ereza und Jeriko',
    cover: 'header',
    description:
      'Zwei Musiker, zwei Arten zu arbeiten: Bei Ereza führe ich Regie, stehe an der Kamera ' +
      'und schneide. Bei Jeriko komme ich für die Effekte dazu.',
    year: '2025',
    role: 'Regie, Kamera, Schnitt',
    kontext: 'Musikvideo, Visualizer und Promomaterial',
    client: 'Ereza, Jeriko',
    tools: ['Premiere Pro', 'DaVinci Resolve'],
    tags: ['Musikvideo', 'Regie', 'Schnitt'],
    pull: 'Erst die Idee besprechen, dann die Kamera auspacken.',
    extern: {
      href: 'https://www.youtube.com/watch?v=GhhHAptcLss',
      label: 'Video auf YouTube ansehen',
      note: 'EREZA — a kishe guxu, offiziell veröffentlicht.',
    },
    chapters: [
      {
        title: 'Mit Ereza',
        text:
          'Ereza ist mittlerweile eine Freundin. Das verändert die Arbeit: Wir besprechen Ideen ' +
          'lange, bevor eine Kamera im Raum steht.',
        files: [],
        textOnly: true,
      },
      {
        title: 'A kishe guxu?',
        text:
          'Das Musikvideo, offiziell veröffentlicht — dazu der Visualizer, der auf Instagram ' +
          'lief. Ein Beispiel aus der Promophase kommt noch dazu.',
        files: ['ereza'],
        layout: 'stack',
        embed: [
          'https://www.youtube.com/watch?v=GhhHAptcLss',
          'https://youtube.com/shorts/T42nvH19S1o',
        ],
      },
      {
        title: 'Jeriko — Pay Me',
        text:
          'Jeriko ist Rapper aus Frankfurt. Beim Musikvideo zu „Pay Me" war ich für die VFX ' +
          'zuständig.',
        files: [],
        embed: 'https://www.instagram.com/reel/DEfoY2eo6Km/',
      },
    ],
  },
  {
    slug: 'huginn',
    title: 'Huginn',
    subtitle: 'Zwei Werbefilme für Bar und Frühstück',
    cover: 'header',
    description:
      'Huginn ist Café, Bar, Eventlocation und Co-Working-Space in einem Haus. Für die ' +
      'Vermarktung sind zwei Filmkonzepte entstanden — eines für die Cocktails, eines für ' +
      'das Frühstück.',
    year: '2025', // TODO
    role: 'Konzept, Storyboard, Kamera',
    auftrag: 'Huginn Lounge & Arts',
    tools: ['Premiere Pro', 'Photoshop'],
    tags: ['Storyboard', 'Bewegtbild', 'Werbefilm'],
    pull: 'Ein Haus, zwei Tonlagen — und für jede ein eigener Film.',
    chapters: [
      {
        title: 'The Perfect Martini',
        text:
          'Das Konzept kam von Guy Buffet und seiner Serie „The Perfect Martini": gemalte ' +
          'Szenen, in denen das Glas die Hauptrolle spielt. Zwölf Bilder — Preparation, ' +
          'Shaking, Finishing — wurden Bild für Bild in Bewegung übersetzt, dazu die ' +
          'Kameraeinstellungen für beide Fassungen: Slow Shutter und normal. So sieht das ' +
          'Ergebnis aus.',
        files: ['konzept-guy-buffet'],
        layout: 'wide',
        embed: 'https://youtube.com/shorts/bi1_YXsKkaI',
      },
      {
        title: 'Breakfast at Jule’s',
        text:
          'Für das Frühstück habe ich einen zweiten Dreh geplant und gefilmt — kurze ' +
          'Werbevideos und Reels. Sechzehn gezeichnete Bilder erzählen den Film, bevor die ' +
          'Kamera läuft: jeder Schnitt, jede Einstellung, die Shotlist. Die Aufnahmen stehen, ' +
          'fertig geschnitten sind sie leider nicht.',
        files: ['storyboard'],
        layout: 'track',
      },
    ],
  },
  {
    slug: 'art-of-peace',
    title: 'The Art of Peace',
    subtitle: 'Anime-Pilotfolge über Aikido',
    cover: 'header',
    description:
      'Ein Teamprojekt mit dem Ziel, das Interesse an Aikido wiederzubeleben. Entstanden sind ' +
      'zwei Dinge: ein VR-Spiel und die Pilotfolge einer Anime-Serie. Mein Teil war das ' +
      'Storyboard und dessen Animation.',
    role: 'Storyboard, Animation',
    year: '2022',
    kontext: 'Teamprojekt an der Hochschule Furtwangen',
    tools: ['Storyboarder', 'Photoshop', 'Blender', 'Celtx'],
    tags: ['Animation', 'Storyboard', 'Anime', 'Aikido', 'Auszeichnung'],
    pull: 'Konflikte lösen sich durch Harmonie, nicht durch Gewalt.',
    extern: {
      href: 'https://hs-furtwangen.github.io/TheArtOfPeace/',
      label: 'Projektdokumentation ansehen',
      note: 'Die vollständige Doku des Teams mit Research, Assets und Trailer.',
    },
    chapters: [
      {
        title: 'Ueshiba',
        text:
          'Morihei Ueshiba hat Aikido Mitte des 20. Jahrhunderts aus mehreren Strömungen ' +
          'zusammengeführt. Die Technik kommt aus dem Daitō-ryū Aiki-jūjutsu, der Umgang mit ' +
          'dem Gegner aus dem Zen: nicht gewinnen, sondern auflösen. Dazu die Ōmoto-kyō, eine ' +
          'shintoistische Bewegung, aus der Ueshiba den Gedanken nahm, dass Kampfkunst dem ' +
          'Schutz allen Lebens dient. Und das Prinzip des Ki — die Kraft, die man nicht gegen ' +
          'den anderen richtet, sondern mit ihm führt. Das Teamprojekt sollte das Interesse ' +
          'daran wiederbeleben; wichtig war uns, dass die Geschichte das Wesen der Kampfkunst ' +
          'widerspiegelt und nicht nur von ihr handelt.',
        files: [],
        textOnly: true,
      },
      {
        title: 'Dreiundzwanzig Szenen',
        text:
          'Ein junger Schüler Ueshibas begreift das Wesen des Aikido durch eine Begegnung mit ' +
          'einem Betrunkenen im Zug — ein Konflikt, der sich auflöst, ohne dass jemand ' +
          'zuschlägt. Alle 23 Szenen wurden gezeichnet und zu einer animierten Fassung mit ' +
          'Musik und Ton gebracht. Animiert wurde Szene 13 in Blender, die Schlüsselszene im ' +
          'Zugwagen.',
        files: [],
        embed: 'https://player.vimeo.com/video/669799645',
      },
      {
        title: 'Medienpreis',
        text: 'Das animierte Storyboard hat den Medienpreis bekommen.',
        files: ['medienpreis-scan'],
        layout: 'wide',
      },
    ],
  },
];
