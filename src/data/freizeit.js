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
