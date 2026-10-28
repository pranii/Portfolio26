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
        title: 'Das rote V',
        text:
          'Liebe hat nicht ein Gesicht, sondern viele — und die meisten Kurzfilme darüber ' +
          'zeigen nur eines. Die Frage war, wie man mehrere Perspektiven in einen Film ' +
          'bekommt, ohne sie zu erklären. Der Titel setzt den Ton: „LOVE" in schwarzer und ' +
          'roter Tusche, das V als einziges rotes Zeichen. Die übrige Bildsprache folgt ' +
          'dieser Geste.',
        files: ['love-03'],
        layout: 'stack',
      },
      {
        title: 'Offenes Casting',
        text:
          'Statt im Bekanntenkreis zu besetzen, lief ein offenes Casting über Instagram und ' +
          'TikTok — Drehort, Drehtag und Altersgruppen stehen direkt auf dem Aufruf, die ' +
          'Rückmeldungen liefen über dieselben Kanäle zusammen. So kamen Gesichter in den ' +
          'Film, die niemand von uns vorher kannte. Gedreht in Frankfurt im Februar 2025, ' +
          'konzipiert, gefilmt und bearbeitet gemeinsam mit Dardan Shala.',
        files: ['love-01', 'love-02', 'love-04', 'love'],
        layout: 'track',
      },
      {
        title: 'Der Film',
        text: 'Der fertige Kurzfilm.',
        files: [],
        embed: 'https://youtu.be/kmN_JAU1OH8',
      },
    ],
  },
  {
    slug: 'improtheater',
    title: 'Improtheater',
    cover: 'header',
    subtitle: 'Staatstheater Tübingen',
    description:
      'Ein Improvisationstheaterstück am Staatstheater in Tübingen — gefilmt, geschnitten ' +
      'und auf einen Trailer gebracht. Improvisation heißt für die Kamera: Niemand weiß ' +
      'vorher, wo die Szene hingeht, es gibt keinen zweiten Take und keinen Plan, an den ' +
      'man sich halten könnte. Gedreht habe ich gemeinsam mit Joscha Reuther und Jan ' +
      'Bangert.',
    year: '2026',
    role: 'Kamera, Schnitt',
    tools: ['Premiere Pro'],
    tags: ['Theater', 'Dokumentation', 'Kamera'],
    pull: 'Keine zweite Aufnahme, kein Plan, an den man sich halten könnte.',
    chapters: [
      {
        title: 'Kein zweiter Take',
        text:
          'Improvisation heißt für die Kamera: Niemand weiß vorher, wo die Szene hingeht, es ' +
          'gibt keinen zweiten Take und keinen Plan, an den man sich halten könnte. Die ' +
          'Frage war, wie man einen Abend einfängt, der nur einmal stattfindet — und daraus ' +
          'einen Trailer schneidet, der die Unsicherheit nicht wegglättet. Gedreht gemeinsam ' +
          'mit Joscha Reuther und Jan Bangert.',
        files: [],
        textOnly: true,
      },
      {
        title: 'Der Trailer',
        text:
          'Der Zusammenschnitt des Abends: Szenen, die es so nur einmal gegeben hat, weil sie ' +
          'im Moment entstanden sind.',
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
          'Ereza ist mittlerweile eine Freundin. Das verändert die Arbeit: Wir besprechen ' +
          'Ideen für Musikvideos lange, bevor eine Kamera im Raum steht, und ich kann sagen, ' +
          'wenn etwas nicht trägt. Was dabei herauskommt, sieht anders aus als ein Dreh nach ' +
          'Briefing.',
        files: [],
        textOnly: true,
      },
      {
        title: 'Zwei Videos',
        text:
          '„A kishe guxu?" ist offiziell veröffentlicht, „Jeriko" als Reel erschienen — zwei ' +
          'Tonlagen derselben Zusammenarbeit.',
        files: ['ereza'],
        layout: 'stack',
        embed: [
          'https://www.youtube.com/watch?v=GhhHAptcLss',
          'https://www.instagram.com/reel/DEfoY2eo6Km/',
        ],
      },
    ],
  },
  {
    slug: 'huginn',
    title: 'Huginn',
    subtitle: 'Raumvermietung, Website und Imagefilm',
    cover: 'header',
    description:
      'Huginn ist Café, Bar, Eventlocation und Co-Working-Space in einem Haus. Die Aufgabe ' +
      'war, diese Vielseitigkeit zu zeigen, ohne beliebig zu werden — der Rabe als ' +
      'Markenzeichen hält alles zusammen.',
    year: '2025', // TODO
    role: 'Gestaltung, Storyboard, Fotografie',
    client: 'Huginn',
    tools: ['InDesign', 'Photoshop', 'Premiere Pro'],
    tags: ['Editorial', 'Storyboard', 'Bewegtbild', 'Fotografie'],
    pull: 'Sechzehn Bilder, die den Film erzählen, bevor die Kamera läuft.',
    chapters: [
      {
        title: 'Der Rabe',
        text:
          'Ein Haus, vier Nutzungen: Café, Bar, Eventlocation, Co-Working. Wer so etwas ' +
          'bewirbt, landet schnell bei „für jeden etwas" — und damit bei niemandem. Die ' +
          'Antwort steckte im Namen: Huginn ist einer der beiden Raben Odins, der Gedanke. ' +
          'Die Wortmarke bleibt entsprechend still — Kleinschreibung, weiche Rundungen, der ' +
          'Zusatz Café & Bar als schmaler Block darunter. Ein Zeichen, das alles überdacht, ' +
          'statt jede Nutzung einzeln zu erklären.',
        files: ['logo-huginn'],
        layout: 'wide',
      },
      {
        title: 'Vom Header bis zum Teller',
        text:
          'Aus dem Namen wurde das Bild: zwei gespiegelte Raben, die als Header der Website ' +
          'den Ton setzen — dunkel, etwas nordisch, mit Rot als einzigem Akzent. Der Flyer ' +
          'bringt beide Seiten des Hauses zusammen: vorne dunkel das Tagesgeschäft von ' +
          'Brunch bis DJ, hinten hell die Eventlocation im ersten Stock, die Raben als ' +
          'gesprühte Schablonen über beiden. Die Broschüre führt Etage für Etage durch das ' +
          'Haus, jede Doppelseite ein Raum und ein Anlass. Die Gerichte für Speisekarte und ' +
          'Social Media habe ich selbst fotografiert, vor Rot, damit sie sich einfügen statt ' +
          'als Fremdkörper zu wirken.',
        files: [
          'header-webseite',
          'flyer-vorne',
          'flyer-hinten',
          'huginn-raumvermietung',
          'mangobowl',
        ],
        layout: 'wide',
      },
      {
        title: 'Sechzehn Bilder',
        text:
          'Der Imagefilm zitiert „Breakfast at Tiffany\'s": eine Frau steigt aus dem Taxi, ' +
          'geht auf die Bar zu, dreht sich um. Sechzehn gezeichnete Bilder erzählen den Film, ' +
          'bevor die Kamera läuft — das Storyboard hält jeden Schnitt, jede Kameraeinstellung ' +
          'und die Shotlist fest, damit am Drehtag nichts diskutiert werden muss. Der Schnitt ' +
          'ist noch nicht fertig; bis dahin gibt es ein Reel, das Bilder und Tempo zeigt.',
        files: ['storyboard'],
        layout: 'track',
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
          'Aikido ist die Kampfkunst, die Morihei Ueshiba Mitte des 20. Jahrhunderts in Japan ' +
          'entwickelt hat und die Konflikte durch Harmonie statt durch Gewalt löst. Das ' +
          'Teamprojekt sollte das Interesse daran wiederbeleben. Wichtig war uns, dass die ' +
          'Geschichte das Wesen der Kampfkunst selbst widerspiegelt und nicht nur von ihr ' +
          'handelt — eine Erzählung, die Ueshibas Leben chronologisch folgt. Geplant war eine ' +
          'Serie; aus Zeitgründen blieb es bei einer Pilotfolge.',
        files: [],
        textOnly: true,
      },
      {
        title: 'Dreiundzwanzig Szenen',
        text:
          'Das Drehbuch entstand in Celtx und wurde mehrfach überarbeitet: Ein junger Schüler ' +
          'Ueshibas begreift das wahre Wesen des Aikido durch eine ungewöhnliche Begegnung ' +
          'mit einem Betrunkenen im Zug. Alle 23 Szenen wurden mit Storyboarder und Photoshop ' +
          'gezeichnet und zu einer animierten Fassung mit Musik und Toneffekten gebracht — ' +
          'das Storyboard nicht als Planungswerkzeug, sondern als eigenständige Fassung des ' +
          'Films. Für die eigentliche Animation fiel die Wahl auf Blender, frei verfügbar und ' +
          'im Studium bereits gelernt; die Figuren entstanden in VRoid Studio. Animiert wurde ' +
          'Szene 13, die Schlüsselszene im Zugwagen.',
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
