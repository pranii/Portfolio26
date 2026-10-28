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
  lead: 'Corporate Design, Kampagnen und Editorial fuer Gastronomie, Handwerk, Praxen und Bildungseinrichtungen.', // TODO
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
    subtitle: 'Zwei Marken, eine Geschaeftsausstattung',
    cover: 'header',
    description:
      'Killes und Benz Immobilien betreibt zwei Geschäftsbereiche: die Verwalterexperten ' +
      'für Immobilien- und Büromanagement, die Handwerkerexperten für Projekt- und ' +
      'Schadensmanagement. Beide brauchten eine gemeinsame Formsprache, ohne sich ' +
      'gegenseitig zu verdecken.',
    year: '2025', // TODO
    role: 'Redesign, Gestaltung, Reinzeichnung',
    client: 'Killes und Benz Immobilien OHG, Fellbach',
    tools: ['Illustrator', 'InDesign', 'Wordpress'],
    tags: ['Corporate Design', 'Logo', 'Geschaeftsausstattung', 'Print'],
    pull: 'Zwei Bereiche, ein Dach — das Logo nimmt die Hausform wörtlich.',
    chapters: [
      {
        title: 'Die Krone muss weg',
        text:
          'Ausgangspunkt war das alte Logo von Killes und Benz — eine Wortmarke mit Krone, ' +
          'die weder zum Immobilien- noch zum Handwerksbereich passte. Ich habe damit ' +
          'angefangen, um zu zeigen, wovon wir uns lösen. Die Aufgabe lag dazwischen: Zwei ' +
          'Bereiche brauchen ein gemeinsames Zeichen, damit man sie einem Haus zuordnet — ' +
          'und genug Eigenes, damit niemand den Handwerker anruft, wenn er die Verwaltung ' +
          'meint.',
        files: ['ursprungslogo'],
        layout: 'stack',
      },
      {
        title: 'Ein Dach, zwei Farben',
        text:
          'Aus dem Dach wurde das gemeinsame Zeichen: ein Winkel, der sich für beide ' +
          'Bereiche wiederholt und sie farblich trennt — Grün für die Verwalterexperten, ' +
          'Gelb für die Handwerkerexperten. Dieselbe Form, zwei Temperaturen. Damit ist die ' +
          'Zugehörigkeit auf einen Blick lesbar, ohne dass irgendwo „Teil von" stehen muss.',
        files: ['logo-kombiniert', 'anwendung'],
        layout: 'track',
      },
      {
        title: 'Was man übergibt',
        text:
          'Die Geschäftsausstattung ist der Ort, an dem die Marke tatsächlich in die Hand ' +
          'genommen wird. Jede Visitenkarte trägt vorne den Namen mit Funktion, hinten das ' +
          'Logo des jeweiligen Bereichs — beim Übergeben ist sofort klar, aus welchem Haus ' +
          'jemand kommt. Für die Akquise entstanden zwei Flyer: einer für die ' +
          'Handwerkerexperten mit Baustellenfotografie und starkem Gelb, einer für die ' +
          'Verwalterexperten mit ruhigerer Bildsprache und den Partnerlogos. Zum Schluss die ' +
          'stillste Anwendung: ein Briefbogen, der die Dachform nur noch andeutet und den ' +
          'Platz dem Text lässt.',
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
    pull: 'Ein Zeichen, das trägt, was es zeigt.',
    chapters: [
      {
        title: 'Zwei Entwürfe',
        text:
          'Chiro Med in Prishtina behandelt chiropraktisch, physiotherapeutisch und mit Dry ' +
          'Needling. Das Erscheinungsbild musste zwei Dinge gleichzeitig: medizinisch genug ' +
          'wirken, um Vertrauen zu schaffen, und körperlich genug, um zu zeigen, worum es ' +
          'geht. Zu Beginn standen zwei Ansätze nebeneinander — eine figürliche Marke mit ' +
          'aufgerichtetem Körper und eine, die die Wirbelsäule selbst zum Zeichen macht.',
        files: ['chiro-07', 'chiro-08', 'chiro-02'],
        layout: 'track',
      },
      {
        title: 'Die Wirbelsäule',
        text:
          'Durchgesetzt hat sich die Wirbelsäule. Sie steht zwischen „chiro" und „med" und ' +
          'trägt die beiden Wörter buchstäblich — Trennzeichen und Bild zugleich. Damit ' +
          'macht das Logo genau das, was die Praxis macht, statt es zu behaupten.',
        files: ['chiro-01', 'chiro-03', 'chiro-04', 'chiro-05', 'chiro-06'],
        layout: 'track',
      },
      {
        title: 'Der Styleguide',
        text:
          'Den Abschluss bildet der Styleguide mit Farbwelt, Schutzraum und ' +
          'Anwendungsbeispielen. Damit kann die Praxis das Erscheinungsbild selbst ' +
          'weiterführen, ohne bei jedem neuen Aushang nachfragen zu müssen.',
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
    pull: 'SoDaM FAKE — eine Kampagne, die zugibt, dass sie eine ist.',
    chapters: [
      {
        title: 'Nicht nach Hochschule aussehen',
        text:
          'Die School of Design and Media der Hochschule Furtwangen brauchte eine Kampagne, ' +
          'die Studieninteressierte erreicht, ohne wie Hochschulwerbung auszusehen. Das ist ' +
          'die eigentliche Schwierigkeit: Sobald eine Institution über sich selbst spricht, ' +
          'hört die Zielgruppe weg. Also zwei Wege, die beide nicht nach Broschüre aussehen.',
        files: [],
        textOnly: true,
      },
      {
        title: 'Victorious',
        text:
          'Die erste Kampagne ist reine Social-Media-Strategie: Szenen der Serie „Victorious" ' +
          'werden nachgestellt, weil die Hochschule inhaltlich parallel zur Serie liegt. Das ' +
          'Papier dahinter klärt, wen man erreichen will, was gepostet wird, wer es ' +
          'produziert und in welcher Reihenfolge es läuft — vor dem Start, zum Start, danach.',
        files: ['socialmediaauftritt'],
        layout: 'track',
        platzhalter: ['/media/arbeit/sodam/Sodam1.mp4', '/media/arbeit/sodam/Sodam2.mp4'],
      },
      {
        title: 'Der Stempel',
        text:
          'Die zweite Kampagne setzt auf Live-Action: Die Plakate „attackieren" Schüler ' +
          'förmlich. Der Witz liegt im Widerspruch: ein Motiv, das angreift, und dahinter die ' +
          'Einladung einer Hochschule. Dazu gehören magentafarbene Flyer mit dem Aufruf ' +
          '„Spread the Word" und ein kleiner Stempel, mit dem man Gegenstände oder ' +
          'Mitschüler kurzerhand „sodamisiert". Damit ist der Schüler nicht mehr Empfänger ' +
          'der Kampagne, sondern führt sie weiter.',
        files: ['plakat-01', 'plakat-02', 'plakat-03', 'plakat-alt'],
        layout: 'grid',
      },
    ],
  },
  {
    slug: 'fischerhuette',
    title: 'Fischerhütte',
    subtitle: 'Gastronomie-Kommunikation in Plochingen',
    cover: 'header',
    description:
      'Die Fischerhuette ist Ausflugslokal und Eventlocation zugleich. Gaeste sitzen im Gruenen, abends wird daraus eine Buehne — beide Zustaende mussten in derselben Bildsprache Platz haben.', // TODO
    year: '2025', // TODO
    role: 'Fotografie, Gestaltung, Social Media',
    client: 'Fischerhuette Plochingen',
    tools: ['Photoshop', 'InDesign'],
    tags: ['Gastronomie', 'Print', 'Social Media', 'Fotografie'],
    pull: 'Mittags im Grünen, abends eine Bühne — dieselbe Bildsprache.',
    chapters: [
      {
        title: 'Mittags und abends',
        text:
          'Die Fischerhütte ist Ausflugslokal und Eventlocation zugleich. Gäste sitzen ' +
          'mittags im Grünen, abends wird daraus eine Bühne. Beide Zustände mussten in ' +
          'derselben Bildsprache Platz haben, ohne dass einer den anderen übertönt.',
        files: [],
        textOnly: true,
      },
      {
        title: 'Auf den Tischen',
        text:
          'Auf den Tischen steht das, was die Gäste direkt betrifft: Mittagstisch, Hinweise, ' +
          'QR-Code zur Karte. Handschriftliche Logotype und viel Weißraum halten es ' +
          'freundlich statt betrieblich — das ist die leise Hälfte.',
        files: ['tischaufsteller-01', 'tischaufsteller-03'],
        layout: 'track',
      },
      {
        title: 'Eine Lautstärke höher',
        text:
          'Für Social Media und die Hocketse am 1. Mai wird die Bildsprache lauter: ' +
          'Farbverläufe, große Versalien und der Satz „Tradition trifft Moderne". Dieselbe ' +
          'Marke, nur eine Lautstärke höher — wer abends kommt, erkennt das Lokal vom ' +
          'Mittagstisch wieder.',
        files: ['fischerhuette-01', 'tischaufsteller-04'],
        layout: 'track',
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
    pull: 'Erst wofür das Studio steht, dann die Zahlen, dann die Aufforderung.',
    chapters: [
      {
        title: 'Eine Entscheidung treffen',
        text:
          'Step V ist ein Studio, das sich neu positioniert. Eine Positionierung ist aber ' +
          'erst dann eine, wenn jemand von außen sie nachsprechen kann. Die Präsentation ' +
          'musste also nicht beschreiben, was das Studio alles kann, sondern eine ' +
          'Entscheidung treffen und sie halten.',
        files: [],
        textOnly: true,
      },
      {
        title: 'Zeit für Veränderung',
        text:
          'Der Aufbau folgt einer einfachen Dramaturgie: erst wofür das Studio steht, dann ' +
          'die Zahlen dazu, dann die Aufforderung — „Zeit für Veränderung". Neben Konzept ' +
          'und Gestaltung habe ich die Analyse und die Kommunikation nach außen übernommen, ' +
          'dazu Trendrecherche und Kundenakquise betrieben. Nebenbei habe ich, um das ' +
          'Unternehmen finanziell mit zu tragen, Videos geplant, geschnitten und mit ' +
          'Effekten bearbeitet.',
        files: ['copy-of-step-v'],
        layout: 'track',
      },
    ],
  },
  {
    slug: 'kamamuta',
    title: 'Kama Muta',
    subtitle: 'Ein Magazin ueber das Ergriffensein',
    cover: 'header',
    description:
      'Kama Muta ist das plötzliche Gefühl, das entsteht, wenn Nähe unerwartet spürbar wird ' +
      '— Gänsehaut bei einer Umarmung, Tränen bei einem fremden Lied. Das Magazin versucht ' +
      'nicht, das Gefühl zu erklären, sondern es herzustellen. Inzwischen ist daraus eine ' +
      'Installation geworden, die genau das im Raum einlöst.',
    year: '2026',
    role: 'Konzept, Gestaltung, Fotografie, Illustration',
    tools: ['InDesign', 'Photoshop', 'After Effects'],
    tags: ['Editorial', 'Magazin', 'Fotografie', 'Partizipation'],
    pull: 'In Lak’ech — ich bin ein anderes Du.',
    chapters: [
      {
        title: 'Mache ein Foto',
        text:
          'Ein Magazin über ein Gefühl, das sich beim Lesen einstellen soll — das geht nicht ' +
          'mit Artikeln. Am Anfang standen deshalb Handlungsanweisungen: „Mache ein Foto mit ' +
          'der dir gegenüber sitzenden Person. Tausche Adresse und Namen aus." Das Heft ' +
          'sollte etwas verlangen, nicht nur etwas zeigen. Parallel lief ein Notizarchiv mit ' +
          'Sätzen, die später Kapitelnamen wurden — darunter der Gedanke, Verbindung als ' +
          'Spiegel zur Außenwelt zu begreifen.',
        files: ['first-ideas', 'archive'],
        layout: 'track',
      },
      {
        title: 'Jedes Kapitel anders',
        text:
          'Jedes Kapitel entstand mit einer eigenen Methode. Eines beim Gehen: ' +
          'Bleistiftskizzen von Dingen am Weg, die zufällig etwas auslösen — eine Lampe, ein ' +
          'Stuhl, eine Treppe. Für „Black Swan" habe ich mit Klebezetteln gearbeitet und die ' +
          'Reihenfolge der Doppelseiten so lange verschoben, bis der Rhythmus stimmte. Ein ' +
          'weiteres als Collage: gedruckte Doppelseiten, abfotografiert und wieder ' +
          'überklebt. Am Ende steht das gedruckte Heft — drei Essays, ein Umschlag, und der ' +
          'Beweis, dass die Anweisungen auf Papier funktionieren.',
        files: [
          'spaziergang',
          'black-swan',
          'veites-kapitee',
          'prototyp',
          'kama-muta-magazine-prototype',
        ],
        layout: 'track',
      },
      {
        title: 'Zwei Stühle, ein Buch',
        text:
          'Für den Pavillon am Schlossplatz in Stuttgart ist aus dem Heft ein Aufbau ' +
          'geworden: zwei Fremde sitzen sich gegenüber, zwischen ihnen nichts als ein Buch. ' +
          'Das Gespräch führt der Fragebogen, nicht der Mut der beiden — niemand muss sich ' +
          'etwas ausdenken, es steht ja da. Grundlage ist der bekannte Fragenkatalog, mit ' +
          'dem sich zwei Menschen in 36 Fragen näherkommen; ich habe ihn auseinandergenommen ' +
          'und auf drei Stufen zu je zwei Fragen verteilt. Erst das Leichte, dann das, was ' +
          'man sonst nicht erzählt. Der Ablauf ist ein Weg durch diese drei Stufen: Platz ' +
          'nehmen, Karte ziehen, antworten, weiterrücken. Die Regeln stehen auf dem Buch ' +
          'selbst, damit kein Erklärer daneben stehen muss.',
        files: [],
        textOnly: true,
      },
      {
        title: 'Danach',
        text:
          'Das erste Design steht; für den nächsten Einsatz wird es noch einmal ' + 'überarbeitet.',
        files: [],
        textOnly: true,
      },
    ],
  },
  {
    slug: 'citydep',
    title: 'Citydep',
    subtitle: 'Storyboards und Trailer im VHS-Look',
    cover: 'header',
    description:
      'Fuer Citydep entstanden Trailer, die aussehen sollen, als waeren sie von einer Kassette gerettet worden. Die Storyboards sind entsprechend als Archivbloecke aufgebaut — mit Kassettennummer, Ort und Equipment pro Einstellung.', // TODO
    year: '2025', // TODO
    role: 'Storyboard, Schnitt, Gestaltung',
    tools: ['Premiere Pro', 'After Effects', 'InDesign'],
    tags: ['Bewegtbild', 'Storyboard', 'VHS'],
    pull: 'and then we unite — we become the stars',
    chapters: [
      {
        title: 'Wie von einer Kassette',
        text:
          'Die Trailer für Citydep sollten aussehen, als wären sie von einer Kassette ' +
          'gerettet worden. Ein Look, den man nicht am Schluss drauflegen kann — wenn die ' +
          'Bildstörung nur ein Filter ist, merkt man es. Also musste das Archiv schon in der ' +
          'Planung stecken.',
        files: [],
        textOnly: true,
      },
      {
        title: 'Kassette #4',
        text:
          'Jede Storyboard-Seite ist wie ein Fundstück aufgebaut: „Kassette #4", „Lost Fire ' +
          '#7", dazu Frame, Beschreibung, Ton und Equipment pro Einstellung. Das Raster ' +
          'gehört damit schon zur Erzählung, nicht nur zur Planung.',
        files: ['storyboard-storyboard-in-black'],
        layout: 'track',
      },
      {
        title: 'Die Trailer',
        text:
          'Aus den Boards wurden die Trailer geschnitten — Bildstörung, Zeitcode und ' +
          'Bandrauschen sind bewusst stehen geblieben.',
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
