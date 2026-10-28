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
    subtitle: 'LOVE - what love prompts us to do',
    cover: 'header',
    description: '',
    year: '2025',
    role: 'Konzept, Regie, Gestaltung, Sounddesign',
    client: 'Mit Dardan Shala',
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
    subtitle: 'Landestheater Tübingen',
    description:
      'Ein Improvisationstheaterstück, gefilmt und auf einen Trailer gebracht. Niemand weiß ' +
      'vorher, wo die Szene hingeht — es gibt keinen zweiten Take.',
    year: '2026',
    role: 'Kamera, Schnitt',
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
    subtitle: 'EREZA — a kishe guxu',
    cover: 'header',
    description:
      'Ereza ist mittlerweile eine Freundin, mit der ich gerne Ideen fuer Musikvideos bespreche und auch schon oefter eng zusammengearbeitet habe — etwa fuer den Dreh von "A kishe guxu?".', // TODO
    year: '2025', // TODO
    role: 'Regie, Kamera, Schnitt',
    tools: ['Premiere Pro', 'DaVinci Resolve'],
    tags: ['Musikvideo', 'Regie', 'Schnitt'],
    pull: 'Erst die Idee besprechen, dann die Kamera auspacken.',
    extern: {
      href: 'https://www.youtube.com/watch?v=GhhHAptcLss',
      label: 'Video auf YouTube ansehen',
      note: 'EREZA — a kishe guxu, offiziell veroeffentlicht.',
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
    subtitle: 'Raumvermietung, Website und Imagefilm',
    cover: 'header',
    description:
      'Huginn ist Café, Bar, Eventlocation und Co-Working-Space in einem Haus. Über ein Jahr ' +
      'habe ich die Kommunikation gemacht: Konzepte für Bewegtbild, die Drucksachen und die ' +
      'Fotografie.',
    year: '2025', // TODO
    role: 'Gestaltung, Storyboard, Fotografie',
    client: 'Huginn',
    tools: ['InDesign', 'Photoshop', 'Premiere Pro'],
    tags: ['Editorial', 'Storyboard', 'Bewegtbild', 'Fotografie'],
    pull: 'Sechzehn Bilder, die den Film erzählen, bevor die Kamera läuft.',
    chapters: [
      {
        title: 'The Perfect Martini',
        text:
          'Das erste Konzept kam von Guy Buffet und seiner Serie „The Perfect Martini": ' +
          'gemalte Szenen, in denen das Glas die Hauptrolle spielt. Der Plan war, darüber die ' +
          'Cocktails zu vermarkten — so sieht das Ergebnis aus.',
        files: [],
        embed: 'https://youtube.com/shorts/bi1_YXsKkaI',
      },
      {
        title: 'Tischaufsteller und WhatsApp Business',
        text:
          'Auf den Tischen steht, was die Gäste direkt betrifft. Dazu habe ich das WhatsApp ' +
          'Business aufgesetzt und die passenden Fotos selbst geschossen — die Gerichte vor ' +
          'Rot, damit sie sich in die Bildwelt einfügen statt als Fremdkörper zu wirken.',
        files: ['logo-huginn', 'header-webseite', 'flyer-vorne', 'flyer-hinten', 'mangobowl'],
        layout: 'wide',
      },
      {
        title: 'Magazin für den Eventraum',
        text:
          'Für die Vermietung des Eventraums im Obergeschoss habe ich ein Magazin entworfen: ' +
          'Etage für Etage durch das Haus, jede Doppelseite ein Raum und ein Anlass.',
        files: ['huginn-raumvermietung'],
        layout: 'track',
      },
      {
        title: 'Breakfast at Jule’s',
        text:
          'Für die Vermarktung des Frühstücks habe ich einen Videodreh geplant und gefilmt — ' +
          'kurze Werbevideos und Reels unter der Kampagne „Breakfast at Jule’s". Sechzehn ' +
          'gezeichnete Bilder erzählen den Film, bevor die Kamera läuft. Die Aufnahmen stehen, ' +
          'fertig geschnitten sind sie leider nicht.',
        files: ['storyboard'],
        layout: 'track',
      },
    ],
  },
  {
    slug: 'art-of-peace',
    title: 'The Art of Peace',
    subtitle: 'Anime-Pilotfolge ueber Aikido',
    cover: 'header',
    description:
      'Ein Teamprojekt mit dem Ziel, das Interesse an Aikido wiederzubeleben — der ' +
      'Kampfkunst, die Morihei Ueshiba Mitte des 20. Jahrhunderts in Japan entwickelt hat ' +
      'und die Konflikte durch Harmonie statt durch Gewalt loest. Entstanden sind zwei ' +
      'Dinge: ein VR-Spiel und die Pilotfolge einer Anime-Serie. Mein Teil war das ' +
      'Storyboard und dessen Animation.', // TODO
    year: '2022',
    role: 'Storyboard, Animation',
    client: 'Teamprojekt an der Hochschule Furtwangen',
    tools: ['Storyboarder', 'Photoshop', 'Blender', 'Celtx'],
    tags: ['Animation', 'Storyboard', 'Anime', 'Aikido', 'Auszeichnung'],
    pull: 'Konflikte lösen sich durch Harmonie, nicht durch Gewalt.',
    extern: {
      href: 'https://hs-furtwangen.github.io/TheArtOfPeace/',
      label: 'Projektdokumentation ansehen',
      note: 'Die vollstaendige Doku des Teams mit Research, Assets und Trailer.',
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
