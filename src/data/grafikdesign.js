/**
 * GRAFIKDESIGN — Corporate Design, Kampagnen, Editorial.
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
  slug: 'grafikdesign',
  title: 'Grafikdesign',
  lead: 'Corporate Design, Kampagnen und Editorial fuer Gastronomie, Handwerk, Praxen und Bildungseinrichtungen.', // TODO
};

export const projects = [
  {
    slug: 'handwerkerexperten',
    title: 'Handwerkerexperten',
    subtitle: 'Zwei Marken, eine Geschaeftsausstattung',
    cover: 'header',
    description:
      'Killes und Benz Immobilien betreibt zwei Geschaeftsbereiche: die Verwalterexperten fuer Immobilien- und Bueromanagement, die Handwerkerexperten fuer Projekt- und Schadensmanagement. Beide brauchten eine gemeinsame Formsprache, ohne sich gegenseitig zu verdecken.', // TODO
    year: '2025', // TODO
    role: 'Redesign, Gestaltung, Reinzeichnung',
    client: 'Killes und Benz Immobilien OHG, Fellbach',
    tools: ['Illustrator', 'InDesign', 'Wordpress'],
    tags: ['Corporate Design', 'Logo', 'Geschaeftsausstattung', 'Print'],
    pull: 'Zwei Bereiche, ein Dach — das Logo nimmt die Hausform woertlich.', // TODO
    chapters: [
      {
        title: 'Ursprungslogo',
        text: 'Ausgangspunkt war das alte Logo von Killes und Benz — eine Wortmarke mit Krone, die weder zum Immobilien- noch zum Handwerksbereich passte. Ich habe damit angefangen, um zu zeigen, wovon wir uns loesen.', // TODO
        files: ['ursprungslogo'],
        layout: 'stack',
      },
      {
        title: 'Marke und Dachform',
        text: 'Aus dem Dach wurde das gemeinsame Zeichen: ein Winkel, der sich fuer beide Bereiche wiederholt und sie farblich trennt — Gruen fuer die Verwalterexperten, Gelb fuer die Handwerkerexperten.', // TODO
        files: ['logo-kombiniert', 'anwendung'],
        layout: 'track',
      },
      {
        title: 'Visitenkarten',
        text: 'Die erste Anwendung war das Kartenset fuer das ganze Team. Jede Karte traegt vorne den Namen mit Funktion, hinten das Logo des jeweiligen Bereichs — so wird beim Uebergeben sofort klar, aus welchem Haus jemand kommt.', // TODO
        files: ['visitenkarte'],
        layout: 'grid',
      },
      {
        title: 'Flyer',
        text: 'Fuer die Akquise entstanden zwei Flyer: einer fuer die Handwerkerexperten mit Baustellenfotografie und starkem Gelb, einer fuer die Verwalterexperten mit ruhigerer Bildsprache und den Partnerlogos.', // TODO
        files: ['flyer-digital-handwerker', 'handwerkerexperten-flyerdruck', 'verwalterexperten'],
        layout: 'grid',
      },
      {
        title: 'Briefpapier',
        text: 'Zum Schluss die stillste Anwendung: ein Briefbogen, der die Dachform nur noch andeutet und den Platz dem Text laesst.', // TODO
        files: ['briefpapier'],
        layout: 'track',
      },
    ],
  },
  {
    slug: 'chiro-med',
    title: 'Chiro Med',
    subtitle: 'Corporate Design fuer eine chiropraktische Praxis',
    cover: 'header',
    description:
      'Chiro Med in Prishtina behandelt chiropraktisch, physiotherapeutisch und mit Dry Needling. Das Erscheinungsbild sollte medizinisch genug wirken, um Vertrauen zu schaffen, und koerperlich genug, um zu zeigen, worum es geht.', // TODO
    year: '2025', // TODO
    role: 'Konzept, Gestaltung, Styleguide',
    client: 'Chiro Med, Novoselle / Prishtina',
    tools: ['Illustrator', 'InDesign'],
    tags: ['Corporate Design', 'Logo', 'Styleguide'],
    chapters: [
      {
        title: 'Erste Richtungen',
        text: 'Zu Beginn standen zwei Ansaetze nebeneinander: eine figuerliche Marke mit aufgerichtetem Koerper und eine, die die Wirbelsaeule selbst zum Zeichen macht.', // TODO
        files: ['chiro-07', 'chiro-08', 'chiro-02'],
        layout: 'track',
      },
      {
        title: 'Die Wirbelsaeule als Zeichen',
        text: 'Durchgesetzt hat sich die Wirbelsaeule, die zwischen "chiro" und "med" steht und die beiden Woerter buchstaeblich traegt. Sie funktioniert als Trennzeichen und als Bild zugleich.', // TODO
        files: ['chiro-01', 'chiro-03', 'chiro-04', 'chiro-05', 'chiro-06'],
        layout: 'track',
      },
      {
        title: 'Styleguide',
        text: 'Den Abschluss bildet der Styleguide mit Farbwelt, Schutzraum und Anwendungsbeispielen, damit die Praxis das Erscheinungsbild selbst weiterfuehren kann.', // TODO
        files: ['styleguide-chiro-med'],
        layout: 'stack',
      },
    ],
  },
  {
    slug: 'sodam',
    title: 'SoDaM',
    subtitle: 'Zwei Kampagnen fuer die School of Design and Media',
    cover: 'header',
    description:
      'Die School of Design and Media der Hochschule Furtwangen brauchte eine Kampagne, die Studieninteressierte erreicht, ohne wie Hochschulwerbung auszusehen. Daraus entstanden zwei eigenstaendige Kampagnen: eine Social-Media-Strategie rund um die Serie "Victorious" und eine Live-Action-Plakatkampagne, die Schueler direkt anspricht.', // TODO
    year: '2025', // TODO
    role: 'Konzept, Strategie, Gestaltung',
    client: 'Hochschule Furtwangen University',
    tools: ['InDesign', 'Photoshop'],
    tags: ['Kampagne', 'Plakat', 'Social Media', 'Strategie'],
    pull: 'SoDaM FAKE — eine Kampagne, die zugibt, dass sie eine ist.', // TODO
    chapters: [
      {
        title: 'Victorious-Kampagne',
        text: 'Die erste Kampagne ist reine Social-Media-Strategie: Verschiedene Szenen der beliebten Serie "Victorious" werden nachgestellt, weil die Hochschule inhaltlich parallel zur Serie liegt. Das Strategiedeck dahinter deckt Zielgruppe, Kampagnenidee, Contentformate, Produktionsplan und die drei Phasen Pre-Launch, Launch und Amplifikation ab.', // TODO
        files: ['socialmediaauftritt'],
        layout: 'track',
        // Zwei Beispielvideos fuer den Instagram-Kanal folgen noch.
        platzhalter: ['/media/arbeit/sodam/Sodam1.mp4', '/media/arbeit/sodam/Sodam2.mp4'],
      },
      {
        title: 'Plakat-Kampagne: Live-Action',
        text: 'Die zweite Kampagne setzt auf Live-Action: Die Plakate "attackieren" Schueler foermlich — der Witz entsteht aus der Dualitaet zwischen aggressivem Motiv und der Einladung einer Hochschule. Dazu gehoeren magentafarbene Flyer mit dem Aufruf "Spread the Word" und ein kleiner Stempel, mit dem man Gegenstaende oder Mitschueler kurzerhand "sodamisiert" — um sie fuer die Hochschule zu begeistern.', // TODO
        files: ['plakat-01', 'plakat-02', 'plakat-03', 'plakat-alt'],
        layout: 'grid',
      },
    ],
  },
  {
    slug: 'fischerhuette',
    title: 'Fischerhuette',
    subtitle: 'Gastronomie-Kommunikation in Plochingen',
    cover: 'header',
    description:
      'Die Fischerhuette ist Ausflugslokal und Eventlocation zugleich. Gaeste sitzen im Gruenen, abends wird daraus eine Buehne — beide Zustaende mussten in derselben Bildsprache Platz haben.', // TODO
    year: '2025', // TODO
    role: 'Fotografie, Gestaltung, Social Media',
    client: 'Fischerhuette Plochingen',
    tools: ['Photoshop', 'InDesign'],
    tags: ['Gastronomie', 'Print', 'Social Media', 'Fotografie'],
    chapters: [
      {
        title: 'Tischaufsteller',
        text: 'Auf den Tischen steht das, was die Gaeste direkt betrifft: Mittagstisch, Hinweise, QR-Code zur Karte. Handschriftliche Logotype und viel Weissraum halten es freundlich statt betrieblich.', // TODO
        files: ['tischaufsteller-01', 'tischaufsteller-02', 'tischaufsteller-03'],
        layout: 'track',
      },
      {
        title: 'Kampagne und Events',
        text: 'Fuer Social Media und die Hocketse am 1. Mai wurde die Bildsprache lauter: Farbverlaeufe, grosse Versalien und der Satz "Tradition trifft Moderne".', // TODO
        files: ['fischerhuette-01', 'tischaufsteller-04'],
        layout: 'track',
        // Platz reserviert: sobald Fischerhuette.mp4 im Ordner liegt, spielt sie hier.
        platzhalter: '/media/arbeit/fischerhuette/Fischerhuette.mp4',
      },
    ],
  },
  {
    slug: 'step-v',
    title: 'Step V',
    subtitle: 'Markenpraesentation fuer ein Studio',
    cover: 'header',
    description:
      'Step V ist ein Studio, das sich neu positioniert. Neben Konzept und Gestaltung der Praesentation habe ich die Analyse und die Kommunikation nach aussen uebernommen, dazu Trendrecherche und Kundenakquise betrieben. Nebenbei habe ich, um das Unternehmen finanziell mit zu tragen, Videos geplant, geschnitten und mit Effekten bearbeitet.', // TODO
    year: '2025', // TODO
    role: 'Analyse, Kommunikation nach aussen, Trendrecherche, Kundenakquise, Videoproduktion',
    client: 'Step V Studio',
    tools: ['InDesign', 'After Effects'],
    tags: ['Editorial', 'Praesentation', 'Bewegtbild'],
    chapters: [
      {
        title: 'Praesentation',
        text: 'Der Aufbau folgt einer einfachen Dramaturgie: erst wofuer das Studio steht, dann die Zahlen dazu, dann die Aufforderung — "Zeit fuer Veraenderung".', // TODO
        files: ['copy-of-step-v'],
        layout: 'track',
      },
      {
        title: 'Produktfilm',
        text: 'Parallel entstand der Produktfilm. Das Board zeigt die Einstellungen und die Farbstimmung, mit der die Aufnahmen spaeter zusammengehalten werden.', // TODO
        files: ['step-v-01'],
        layout: 'stack',
      },
    ],
  },
  {
    slug: 'kamamuta',
    title: 'Kama Muta',
    subtitle: 'Ein Magazin ueber das Ergriffensein',
    cover: 'prototyp-03',
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
        title: 'Veites Kapitee',
        text: 'Ein weiteres Kapitel als Collage: gedruckte Doppelseiten, abfotografiert und wieder ueberklebt.', // TODO
        files: ['veites-kapitee'],
        layout: 'grid',
      },
      {
        title: 'Prototyp',
        text: 'Am Ende steht das gedruckte Heft — drei Essays, ein Umschlag, und der Beweis, dass die Anweisungen auf Papier funktionieren.', // TODO
        files: ['prototyp', 'kama-muta-magazine-prototype'],
        layout: 'track',
      },
    ],
  },
];
