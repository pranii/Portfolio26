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
    description:
      'Ein Kurzfilm über die verschiedenen Facetten der Liebe, entstanden mit einem offenen Casting über Instagram. Gedreht in Frankfurt, Februar 2025. Konzipiert, gefilmt und bearbeitet gemeinsam mit Dardan Shala.', // TODO
    year: '2025',
    role: 'Konzept, Regie, Gestaltung, Sounddesign',
    tools: ['Photoshop', 'Premiere Pro'],
    tags: ['Kurzfilm', 'Artwork', 'Casting'],
    pull: 'a story of perspective on love',
    chapters: [
      {
        title: 'Titel und Bildwelt',
        text: '"LOVE" in schwarzer und roter Tusche. Das V als einziges rotes Zeichen. Als Geste der gewählten restlichen Bildsprache.', // TODO
        files: ['love-03'],
        layout: 'stack',
      },
      {
        title: 'Casting Call',
        text: 'Talente haben wir über Soziale Medien gesucht. Drehort, Drehtag und Altersgruppen stehen direkt auf dem Dokument.', // TODO
        files: ['love-01', 'love-02', 'love-04'],
        layout: 'track',
      },
      {
        title: 'Verbreitung',
        text: 'Verbreitet wurde der Aufruf über Instagram und TikTok, wo auch die Rückmeldungen zusammenliefen.', // TODO
        files: ['love'],
        layout: 'stack',
      },
      {
        title: 'Der fertige Film',
        text: 'Und so sieht der fertige Kurzfilm aus.',
        files: [],
        embed: 'https://youtu.be/kmN_JAU1OH8',
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
    extern: {
      href: 'https://www.youtube.com/watch?v=GhhHAptcLss',
      label: 'Video auf YouTube ansehen',
      note: 'EREZA — a kishe guxu, offiziell veroeffentlicht.',
    },
    chapters: [
      {
        title: 'EREZA — a kishe guxu',
        text: 'Das fertige Video, offiziell veröffentlicht.',
        embed: 'https://www.youtube.com/watch?v=GhhHAptcLss',
        files: ['ereza'],
        layout: 'stack',
      },
      {
        title: 'Jeriko',
        text: 'Ein weiteres Musikvideo, erschienen als Reel.',
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
      'Huginn ist Cafe, Bar, Eventlocation und Co-Working-Space in einem Haus. Die Aufgabe war, diese Vielseitigkeit zu zeigen, ohne beliebig zu werden — die Rabe als Markenzeichen haelt alles zusammen.', // TODO
    year: '2025', // TODO
    role: 'Gestaltung, Storyboard, Fotografie',
    client: 'Huginn',
    tools: ['InDesign', 'Photoshop', 'Premiere Pro'],
    tags: ['Editorial', 'Storyboard', 'Bewegtbild', 'Fotografie'],
    pull: 'Sechzehn Bilder, die den Film erzaehlen, bevor die Kamera laeuft.', // TODO
    chapters: [
      {
        title: 'Wortmarke',
        text: 'Huginn ist einer der beiden Raben Odins — der Gedanke. Die Wortmarke bleibt entsprechend still: Kleinschreibung, weiche Rundungen, der Zusatz Café & Bar als schmaler Block darunter.', // TODO
        files: ['logo-huginn'],
        layout: 'wide',
      },
      {
        title: 'Bildmarke und Web-Header',
        text: 'Aus dem Namen wurde das Bild: zwei gespiegelte Raben, die als Header der Website den Ton setzen — dunkel, etwas nordisch, mit Rot als einzigem Akzent.', // TODO
        files: ['header-webseite'],
        layout: 'wide',
      },
      {
        title: 'Flyer',
        text: 'Der Flyer bringt beide Seiten des Hauses zusammen: vorne dunkel das Tagesgeschäft von Brunch bis DJ, hinten hell die Eventlocation im ersten Stock. Die Raben tauchen als gesprühte Schablonen wieder auf und halten beide Seiten zusammen.', // TODO
        files: ['flyer-vorne', 'flyer-hinten'],
        layout: 'wide',
      },
      {
        title: 'Broschuere Raumvermietung',
        text: 'Die Broschuere fuehrt durch das Haus: Etage fuer Etage, vom Cafe im Erdgeschoss bis zum Eventraum im Obergeschoss. Jede Doppelseite steht fuer einen Raum und einen Anlass.', // TODO
        files: ['huginn-raumvermietung'],
        layout: 'track',
      },
      {
        title: 'Foodfotografie',
        text: 'Fuer die Speisekarte und Social Media habe ich die Gerichte selbst fotografiert — vor Rot, damit sie sich in die Bildwelt einfuegen statt als Fremdkoerper zu wirken.', // TODO
        files: ['mangobowl'],
        layout: 'stack',
      },
      {
        title: 'Storyboard Imagefilm',
        text: 'Der Imagefilm zitiert "Breakfast at Tiffany\'s": eine Frau steigt aus dem Taxi, geht auf die Bar zu, dreht sich um. Das Storyboard haelt jeden Schnitt, jede Kameraeinstellung und die Shotlist fest, damit am Drehtag nichts diskutiert werden muss.', // TODO
        files: ['storyboard'],
        layout: 'track',
      },
      {
        title: 'Der fertige Film',
        text: 'Der Imagefilm selbst ist noch nicht fertig geschnitten. Bis es so weit ist, gibt es schon ein Reel zu sehen, das einen ersten Eindruck von Bildern und Tempo gibt.', // TODO
        files: [],
        // Platz reserviert: sobald huginn.mp4 im Ordner liegt, spielt sie hier.
        platzhalter: '/media/arbeit/huginn/huginn.mp4',
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
    pull: 'Konflikte loesen sich durch Harmonie, nicht durch Gewalt.',
    extern: {
      href: 'https://hs-furtwangen.github.io/TheArtOfPeace/',
      label: 'Projektdokumentation ansehen',
      note: 'Die vollstaendige Doku des Teams mit Research, Assets und Trailer.',
    },
    chapters: [
      {
        title: 'Recherche und Erzaehlbogen',
        text:
          'Aus der Recherche entstand eine Erzaehlung, die Ueshibas Leben chronologisch ' +
          'folgt. Wichtig war uns, dass die Geschichte das Wesen der Kampfkunst selbst ' +
          'widerspiegelt und nicht nur von ihr handelt. Geplant war eine Serie mit mehreren ' +
          'Episoden — aus Zeitgruenden blieb es bei einer Pilotfolge.', // TODO
        textOnly: true,
      },
      {
        title: 'Drehbuch',
        text:
          'Geschrieben in Celtx, mehrfach ueberarbeitet. Die Folge erzaehlt von einem jungen ' +
          'Schueler Ueshibas, der das wahre Wesen des Aikido durch eine ungewoehnliche ' +
          'Begegnung mit einem Betrunkenen im Zug begreift.', // TODO
        textOnly: true,
      },
      {
        title: 'Storyboard',
        text:
          'Alle 23 Szenen wurden mit Storyboarder und Photoshop gezeichnet. Daraus entstand ' +
          'eine animierte Fassung mit Musik und Toneffekten — das Storyboard nicht als ' +
          'Planungswerkzeug, sondern als eigenstaendige Fassung des Films.', // TODO
        embed: 'https://player.vimeo.com/video/669799645',
      },
      {
        title: 'Animation',
        text:
          'Fuer die eigentliche Animation fiel die Wahl auf Blender — frei verfuegbar und im ' +
          'Studium bereits gelernt. Die Figuren entstanden in VRoid Studio und wurden in ' +
          'Blender geriggt. Animiert wurde Szene 13, die Schluesselszene im Zugwagen.', // TODO
        textOnly: true,
      },
      {
        title: 'Auszeichnung',
        text: 'Der Scan der Preisverleihung — der Medienpreis fuer das animierte Storyboard.', // TODO
        files: ['medienpreis-scan'],
        layout: 'wide',
      },
    ],
  },
  {
    // Bild stammt aus dem Step-V-Ordner (siehe scripts/media-manifest.mjs).
    slug: 'animationen',
    title: 'Animationen',
    subtitle: 'Bewegtbild und Animation', // TODO
    cover: 'animation-01',
    description:
      'Animierte Arbeiten und Bewegtbild-Studien. Das Board zeigt die Einstellungen und die Farbstimmung, mit der die Aufnahmen zusammengehalten werden.', // TODO
    year: '2025', // TODO
    role: 'Animation, Bewegtbild', // TODO
    tools: ['After Effects'], // TODO
    tags: ['Animation', 'Bewegtbild'],
    chapters: [
      {
        title: 'Board',
        text: 'Das Board zeigt die Einstellungen und die Farbstimmung, mit der die Aufnahmen spaeter zusammengehalten werden.', // TODO
        files: ['animation-01'],
        layout: 'stack',
      },
    ],
  },
];
