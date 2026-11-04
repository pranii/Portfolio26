/**
 * KOMMUNIKATIONSDESIGN — Corporate Design, Kampagnen, Editorial.
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
  slug: 'kommunikationsdesign',
  title: 'Kommunikations­design', // ­: unsichtbare Trennstelle fuer schmale Bildschirme
  lead: 'Corporate Design, Kampagnen und Editorial — für Gastronomie, Handwerk, Praxen und Hochschulen.',
  /**
   * "So gehe ich vor" — erscheint unter dem Karussell. Vier Schritte
   * sind ideal, mehr oder weniger geht auch.
   */
  vorgehen: [
    // TODO: eigene Formulierung
    {
      title: 'Zuhören und analysieren',
      text: 'Was macht den Auftraggeber aus, wer soll erreicht werden, was gibt es schon? Daraus entsteht das Briefing.',
    },
    {
      title: 'Konzept',
      text: 'Eine klare Idee, die sich in einem Satz erklären lässt — sie trägt alle späteren Entscheidungen.',
    },
    {
      title: 'Gestaltung und System',
      text: 'Logo, Farben, Schrift und Raster werden zu einem System, das auf Papier und Bildschirm funktioniert.',
    },
    {
      title: 'Reinzeichnung und Übergabe',
      text: 'Druckfertige Daten, Styleguide und Vorlagen, damit das Design auch ohne mich weiterlebt.',
    },
  ],
  /**
   * Software, die du in diesem Bereich beherrschst. Zu jedem Eintrag zeigt
   * die Seite, in wie vielen Projekten er unter `tools` vorkommt.
   */
  software: ['InDesign', 'Illustrator', 'Photoshop', 'After Effects', 'Figma', 'WordPress'], // TODO: pruefen
};

export const projects = [
  {
    slug: 'handwerkerexperten',
    title: 'Handwerkerexperten',
    subtitle: 'Zwei Marken unter einem Dach',
    cover: 'header',
    description:
      'Killes und Benz Immobilien betreibt zwei Geschäftsbereiche: die Verwalterexperten ' +
      'für Immobilien- und Büromanagement, die Handwerkerexperten für Projekt- und ' +
      'Schadensmanagement. Beide brauchten eine gemeinsame Formsprache, ohne sich ' +
      'gegenseitig zu verdecken.',
    year: '2025', // TODO
    role: 'Redesign, Gestaltung, Reinzeichnung',
    auftrag: 'Killes und Benz Immobilien OHG, Fellbach',
    tools: ['Illustrator', 'InDesign', 'Wordpress'],
    tags: ['Corporate Design', 'Logo', 'Geschäftsausstattung', 'Print'],
    pull: 'Zwei Bereiche, ein Dach — das Logo nimmt die Hausform wörtlich.',
    chapters: [
      {
        title: 'Die Krone muss weg',
        text:
          'Ausgangspunkt war das alte Logo von Killes und Benz — eine Wortmarke mit Krone, die ' +
          'weder zum Immobilien- noch zum Handwerksbereich passte. Die Aufgabe lag dazwischen: ' +
          'Zwei Bereiche brauchen ein gemeinsames Zeichen, damit man sie einem Haus zuordnet — ' +
          'und genug Eigenes, damit niemand den Handwerker anruft, wenn er die Verwaltung meint.',
        files: ['ursprungslogo'],
        layout: 'stack',
      },
      {
        title: 'Ein Dach, zwei Farben',
        text:
          'Aus dem Dach wurde das gemeinsame Zeichen: ein Winkel, der sich für beide Bereiche ' +
          'wiederholt und sie farblich trennt — Grün für die Verwalterexperten, Gelb für die ' +
          'Handwerkerexperten. Dieselbe Form, zwei Temperaturen.',
        files: ['logo-kombiniert', 'anwendung'],
        layout: 'track',
      },
      {
        title: 'Was man übergibt',
        text:
          'Jede Visitenkarte trägt vorne den Namen, hinten das Logo des jeweiligen Bereichs — ' +
          'beim Übergeben ist sofort klar, aus welchem Haus jemand kommt. Dazu zwei Flyer für ' +
          'die Akquise und zum Schluss die stillste Anwendung: ein Briefbogen, der die Dachform ' +
          'nur noch andeutet.',
        files: [
          'visitenkarte',
          'flyer-digital-handwerker',
          'handwerkerexperten-flyerdruck',
          'verwalterexperten',
          'briefpapier',
        ],
        layout: 'grid',
      },
    ],
  },
  {
    slug: 'huginn-gestaltung',
    // Dieselben Dateien wie das Filmprojekt — die Arbeit gehoert in
    // beide Bereiche, die Bilder liegen nur einmal im Repository.
    medien: 'huginn',
    title: 'Huginn',
    subtitle: 'Marke, Drucksachen und Fotografie',
    cover: 'header',
    description:
      'Huginn ist Café, Bar, Eventlocation und Co-Working-Space in einem Haus. Über ein ' +
      'Jahr habe ich die Kommunikation gemacht: die Marke, alles Gedruckte und die ' +
      'Fotografie.',
    year: '2025',
    role: 'Gestaltung, Fotografie, Social Media',
    auftrag: 'Huginn Lounge & Arts',
    tools: ['InDesign', 'Photoshop', 'Illustrator'],
    tags: ['Corporate Design', 'Editorial', 'Fotografie', 'Gastronomie'],
    pull: 'Ein Zeichen, das alles überdacht.',
    chapters: [
      {
        title: 'Der Rabe',
        text:
          'Ein Haus, vier Nutzungen. Wer so etwas bewirbt, landet schnell bei „für jeden ' +
          'etwas" — und damit bei niemandem. Die Antwort steckte im Namen: Huginn ist einer ' +
          'der beiden Raben Odins, der Gedanke. Die Wortmarke bleibt entsprechend still, und ' +
          'zwei gespiegelte Raben setzen als Header den Ton: dunkel, nordisch, Rot als ' +
          'einziger Akzent.',
        files: ['logo-huginn', 'header-webseite'],
        layout: 'wide',
      },
      {
        title: 'Auf den Tischen',
        text:
          'Der Flyer bringt beide Seiten des Hauses zusammen: vorne dunkel das ' +
          'Tagesgeschäft, hinten hell die Eventlocation. Dazu habe ich das WhatsApp Business ' +
          'aufgesetzt und die Gerichte selbst fotografiert — vor Rot, damit sie sich in die ' +
          'Bildwelt einfügen statt als Fremdkörper zu wirken.',
        files: ['flyer-vorne', 'flyer-hinten', 'mangobowl'],
        layout: 'wide',
      },
      {
        title: 'Magazin für den Eventraum',
        text:
          'Für die Vermietung des Eventraums im Obergeschoss habe ich ein Magazin ' +
          'entworfen: Etage für Etage durch das Haus, jede Doppelseite ein Raum und ein ' +
          'Anlass.',
        files: ['huginn-raumvermietung'],
        layout: 'track',
      },
    ],
  },
  {
    slug: 'chiro-med',
    /** Vorerst nicht auf der Seite. Zeile entfernen, dann ist es zurueck. */
    versteckt: true,
    title: 'Chiro Med',
    subtitle: 'Corporate Design für eine chiropraktische Praxis',
    cover: 'header',
    description:
      'Chiro Med in Prishtina behandelt chiropraktisch, physiotherapeutisch und mit Dry ' +
      'Needling.',
    year: '2025', // TODO
    role: 'Konzept, Gestaltung, Styleguide',
    auftrag: 'Chiro Med, Novoselle / Prishtina',
    tools: ['Illustrator', 'InDesign', 'WordPress'],
    tags: ['Corporate Design', 'Logo', 'Styleguide'],
    pull: 'Das Logo macht das, was die Praxis macht.',
    chapters: [
      {
        title: 'Zwei Entwürfe',
        text:
          'Das Erscheinungsbild musste medizinisch genug wirken, um Vertrauen zu schaffen, und ' +
          'körperlich genug, um zu zeigen, worum es geht. Zu Beginn standen zwei Ansätze ' +
          'nebeneinander.',
        files: ['chiro-07', 'chiro-08', 'chiro-02'],
        layout: 'track',
      },
      {
        title: 'Die Wirbelsäule',
        text:
          'Durchgesetzt hat sich die Wirbelsäule. Sie steht zwischen „chiro" und „med" und ' +
          'trägt die beiden Wörter. Trennzeichen und Bild zugleich. Zum Schluss kam ein ' +
          'Styleguide mit Farbwelt, Schutzraum und Anwendungen, damit die Praxis das ' +
          'Erscheinungsbild selbst weiterführen kann.',
        files: ['chiro-01', 'chiro-03', 'chiro-04', 'chiro-05', 'chiro-06'],
        layout: 'track',
      },
    ],
  },
  {
    slug: 'sodam',
    title: 'SoDaM',
    subtitle: 'Zwei Kampagnen für die School of Design and Media',
    cover: 'header',
    description:
      'Zwei Kampagnen mit demselben Ziel und gegensätzlichen Mitteln: eine leise, die sich an ' +
      'eine Serie anlehnt, und eine laute, die vom Plakat herunter angreift.',
    year: '2025', // TODO
    role: 'Konzept, Strategie, Gestaltung',
    auftrag: 'Hochschule Furtwangen',
    tools: ['InDesign', 'Photoshop'],
    tags: ['Kampagne', 'Plakat', 'Social Media', 'Strategie'],
    pull: 'SoDaM FAKE — eine Kampagne, die zugibt, dass sie eine ist.',
    chapters: [
      {
        title: 'KONZEPTARBEIT',
        text:
          'Aufgeführt sind nur Ideen, die als Konzepte aus Zeitgründen zurückgelegt wurden. ' +
          'Die School of Design and Media brauchte eine Kampagne, die Studieninteressierte ' +
          'erreicht, ohne wie Hochschulwerbung auszusehen. Sobald eine Institution über sich ' +
          'selbst spricht, hört die Zielgruppe weg.',
        files: [],
        textOnly: true,
      },
      {
        title: 'Victorious',
        text:
          'Szenen der Serie „Victorious" werden nachgestellt, weil die Hochschule inhaltlich ' +
          'parallel zur Serie liegt. Die Videos habe ich konzipiert, gedreht und geschnitten, ' +
          'dazu Bilder für Social Media gemacht und auf Messen gesprochen. Geplant war, über ' +
          'TikTok und Instagram nach und nach Hinweise zu verstecken und erst langsam ' +
          'aufzudecken, dass hier eine Serie nachgeahmt wird.',
        files: ['socialmediaauftritt'],
        layout: 'track',
      },
      {
        title: 'Kampagne zum Schulende',
        text:
          'Die zweite Kampagne setzt auf Live-Action: Die Plakate „attackieren" Schüler ' +
          'förmlich. Der Witz liegt im Widerspruch — ein Motiv, das angreift, und dahinter die ' +
          'Einladung einer Hochschule. Dazu ein Stempel, mit dem man Gegenstände oder ' +
          'Mitschüler kurzerhand „sodamisiert".',
        files: ['plakat-01', 'plakat-02', 'plakat-03', 'plakat-alt'],
        layout: 'grid',
      },
      {
        title: 'Außenkommunikation',
        text:
          'Von Oktober 2025 bis August 2026 habe ich vor allem auf Instagram und YouTube ' +
          'mitgewirkt.',
        files: [],
        embed: [
          'https://www.instagram.com/reel/DPoii6bAhuc/',
          'https://www.instagram.com/reel/DQRpdQoAi4K/',
          'https://www.instagram.com/p/DRZ4dHWgjJV/',
        ],
      },
    ],
  },
  {
    slug: 'fischerhuette',
    title: 'Fischerhütte',
    subtitle: 'Gastronomie-Kommunikation in Plochingen',
    cover: 'header',
    description:
      'Die Fischerhütte ist Ausflugslokal und Eventlocation zugleich. Beide Seiten mussten in ' +
      'dieselbe Bildsprache passen.',
    year: '2025', // TODO
    role: 'Gestaltung, Social Media',
    auftrag: 'Fischerhütte Plochingen',
    tools: ['Photoshop', 'InDesign'],
    tags: ['Gastronomie', 'Print', 'Social Media', 'Editorial'],
    pull: 'Mittags im Grünen, abends eine Bühne.',
    chapters: [
      {
        title: 'Mittags und abends',
        text:
          'Mittags sitzt man im Grünen, abends wird daraus eine Bühne. Die Grafiken mussten ' +
          'beides tragen, ohne dass es nach zwei Häusern aussieht.',
        files: [],
        textOnly: true,
      },
      {
        title: 'Auf den Tischen',
        text:
          'Mittagstisch, Hinweise, QR-Code zur Karte. Handschriftliche Logotype und viel ' +
          'Weißraum halten es freundlich statt betrieblich.',
        files: ['tischaufsteller-01', 'tischaufsteller-03'],
        layout: 'track',
      },
      {
        title: 'Eine Lautstärke höher',
        text:
          'Für Social Media und die Hocketse am 1. Mai wird die Bildsprache lauter. ' +
          'Farbverläufe, große Versalien, „Tradition trifft Moderne". Dieselbe Marke, nur ' +
          'lauter.',
        files: ['fischerhuette-01', 'tischaufsteller-04'],
        layout: 'track',
      },
    ],
  },
  {
    slug: 'step-v',
    /** Vorerst nicht auf der Seite. Zeile entfernen, dann ist es zurueck. */
    versteckt: true,
    title: 'Step V',
    subtitle: 'Markenpräsentation für ein Studio',
    cover: 'header',
    description: 'Step V ist ein Studio, das sich neu positioniert. Dafür ist eine Präsentation entstanden.',
    year: '2025', // TODO
    role: 'Analyse, Außenkommunikation, Trendrecherche, Kundenakquise, Videoproduktion',
    auftrag: 'Step V Studio',
    tools: ['InDesign', 'After Effects'],
    tags: ['Editorial', 'Präsentation', 'Bewegtbild'],
    pull: 'Erst wofür das Studio steht, dann die Zahlen, dann die Aufforderung.',
    chapters: [
      {
        title: 'Eine Entscheidung treffen',
        text:
          'Step V positioniert sich neu. Die Präsentation sollte nicht aufzählen, was das ' +
          'Studio alles kann, sondern sich entscheiden.',
        files: [],
        textOnly: true,
      },
      {
        title: 'Zeit für Veränderung',
        text:
          'Der Aufbau folgt einer einfachen Dramaturgie: erst wofür das Studio steht, dann die ' +
          'Zahlen, dann die Aufforderung. Neben Konzept und Gestaltung habe ich Analyse, ' +
          'Außenkommunikation, Trendrecherche und Kundenakquise übernommen. Dazu habe ich ' +
          'Videos geplant, geschnitten und bearbeitet.',
        files: ['copy-of-step-v'],
        layout: 'track',
      },
    ],
  },
  {
    slug: 'citydep',
    title: 'Citydep',
    subtitle: 'Trailer im VHS-Look um Nostalgie zu erwecken.',
    cover: 'header',
    description:
      'Trailer, die an die 2000er Clubzeiten erinnern. Dargestellt durch die Inszenierung von ' +
      'Röhrenfernseher, sowie VHS Kassetten.',
    year: '2025', // TODO
    auftrag: 'Citydep',
    role: 'Storyboard, Schnitt, Gestaltung',
    client: 'Dardan Shala',
    bearbeitungszeit: '3 Wochen',
    tools: ['DaVinci Resolve', 'Canva', 'Meta'],
    tags: ['Bewegtbild', 'Storyboard', 'VHS'],
    pull:
      'Das Citydepartment hat nach coronabedingtem Ausfall neu eröffnet. Die Kampagne diente dazu, ' +
      'Interessierte anzusprechen.',
    pullLabel: 'Ziel',
    chapters: [
      {
        title: 'IDEE',
        text:
          'Jede Storyboard-Seite ist wie ein Fundstück aufgebaut: „Kassette #4", „Lost Fire #7", ' +
          'dazu Frame, Beschreibung, Ton und Equipment. Das Raster gehört damit zur Erzählung, ' +
          'nicht nur zur Planung. Die Kassetten wurden nach Absprache eigenhändig präpariert; ' +
          'aus Zeit- und finanziellen Gründen haben wir ohne professionelles Equipment gedreht.',
        files: ['storyboard-storyboard-in-black'],
        layout: 'track',
      },
      {
        title: 'Beispieltrailer',
        text: 'Bildstörung, Zeitcode und Bandrauschen sind bewusst stehen geblieben.',
        files: ['citydep-part2-remake'],
        layout: 'stack',
        embed: [
          'https://youtu.be/rBo8fTXw3qI',
          'https://youtube.com/shorts/teJY1-D-86c',
          'https://youtube.com/shorts/3Ykcj1OcYmc',
          'https://youtube.com/shorts/s-tykl7BaPE',
        ],
      },
    ],
  },
];
