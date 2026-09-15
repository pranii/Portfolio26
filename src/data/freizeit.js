/**
 * FREIZEIT — freie Arbeiten.
 * Aufbau wie in arbeit.js: jedes Projekt hat Kapitel mit Text und `files`.
 * Texte sind Entwürfe, bei TODO bitte überschreiben.
 */

export const category = {
  slug: 'freizeit',
  title: 'Freizeit',
  lead: 'In meiner Freizeit tausche ich mich gerne mit anderen Kuenstlerinnen und Kuenstlern aus, helfe bei Studierendenprojekten mit und plane oder setze Projekte fuer und mit Freunden um.', // TODO
};

export const projects = [
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
        text: 'Und so sieht der fertige Kurzfilm aus.', // TODO
        files: [],
        // Platz reserviert: sobald Love.mp4 im Ordner liegt, spielt sie hier.
        platzhalter: '/media/freizeit/love/Love.mp4',
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
        text: 'Das fertige Video, offiziell veroeffentlicht.', // TODO
        files: ['ereza'],
        layout: 'stack',
      },
    ],
  },
];
