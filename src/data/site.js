/**
 * Globale Angaben. Hier zuerst deinen Namen und die Kontaktdaten eintragen.
 */

export const site = {
  name: 'PREJNI', // steht gross auf der Startseite
  role: 'Creative Director · Creative Coding · Installationen', // steht unter dem Namen
  intro:
    'Creative Director mit Schwerpunkt auf Creative Coding und Installationen. Ich baue ' +
    'Dinge, die man betritt, bedient oder in die Hand nimmt — vom Automaten im öffentlichen ' +
    'Raum bis zum Heft, das man selbst faltet.',
  email: 'pranverapelaj@outlook.de',
  links: [
    { label: 'E-Mail', href: 'mailto:pranverapelaj@outlook.de' },
    { label: 'Instagram', href: 'https://www.instagram.com/prejni.design/' },
  ],

  /**
   * Die Seite ueber mich — aufgebaut wie ein Kontakteintrag im Telefon.
   * `felder` erscheinen als Liste, `vorgehen` darunter als Schritte.
   */
  ueber: {
    name: 'Pranvera Pelaj',
    kuerzel: 'PREJNI',
    rolle: 'Creative Director',
    ort: 'Regensburg',
    abschluesse: ['B.Sc. Marketing', 'M.A. Design Interaktiver Medien'],
    sprachen: ['Deutsch', 'Englisch', 'Albanisch'],
    instagram: { label: '@prejni.design', href: 'https://www.instagram.com/prejni.design/' },
    kernkompetenz: 'Creative Coding und Installationen',
    text:
      'Ich gestalte an der Stelle, an der Print, Digitales und Raum aufhören, getrennte ' +
      'Disziplinen zu sein: Installationen, die man betritt, Hefte, die man faltet, Automaten, ' +
      'die zwei Fremde ins Gespräch bringen. Was dabei entsteht, soll nicht erklären, sondern ' +
      'erfahrbar machen.',
    /**
     * Wofuer ich welches Programm benutze. Die Uebersicht auf der Seite
     * baut sich aus den Projekten selbst — hier steht nur, in welches
     * Feld ein Programm gehoert. Was fehlt, erscheint unter "Weiteres".
     */
    werkzeuge: [
      {
        titel: 'Gestaltung',
        werkzeuge: ['InDesign', 'Illustrator', 'Photoshop', 'Figma'],
      },
      {
        titel: 'Bewegtbild und Ton',
        werkzeuge: [
          'Premiere Pro',
          'After Effects',
          'DaVinci Resolve',
          'EbSynth',
          'RunwayML',
          'Storyboarder',
          'Celtx',
          'Logic Pro',
        ],
      },
      {
        titel: 'Maschinelles Sehen und Hören',
        werkzeuge: ['DeepFace', 'OpenCV', 'librosa', 'scikit-learn'],
      },
      {
        titel: 'Code und Interaktion',
        werkzeuge: [
          'TouchDesigner',
          'Python',
          'Pygame',
          'JavaScript',
          'TypeScript',
          'Angular',
          'React',
          'Flask',
          'SCSS',
          'Web Audio API',
          'ReportLab',
          'FastAPI',
          'SQLite',
          'Streamlit',
          'Wordpress',
        ],
      },
      {
        titel: '3D und Spiel',
        werkzeuge: ['Blender', 'Godot', 'Polycam'],
      },
      {
        titel: 'Hardware',
        werkzeuge: ['Raspberry Pi', 'CRT-Monitore'],
      },
    ],

    vorgehen: [
      {
        title: 'Rahmen setzen',
        text:
          'Am Anfang steht ein grober Styleguide und ein klares Ziel, gemeinsam mit Kundschaft ' +
          'oder Team festgelegt. Wer weiß, worauf er zuarbeitet, diskutiert später über ' +
          'Entscheidungen statt über Geschmack.',
      },
      {
        title: 'Brainstorm',
        text:
          'Dann wird das Projekt konkret: offene Runde, viele Richtungen, am Ende eine Idee, ' +
          'die sich in einem Satz erklären lässt — und die den Rahmen von vorhin trägt.',
      },
      {
        title: 'Aufgaben verteilen',
        text:
          'Wer macht was bis wann? Jede Aufgabe bekommt einen Namen und ein Datum. Das hält ' +
          'die Verantwortung sichtbar und die Abstimmung kurz.',
      },
      {
        title: 'Distribution',
        text:
          'Zum Schluss steht die Frage, wo die Arbeit landet: Druckdaten, Kanäle, Formate, ' +
          'Ausspielung. Ein Entwurf ist erst fertig, wenn er dort funktioniert, wo er hinsoll.',
      },
    ],
  },

  ort: 'Furtwangen, Schwarzwald',
  koordinaten: 'N 48° 3\' 5" E 8° 12\' 33"',
  version: 'v1.0',
};

export const categories = [
  {
    slug: 'creative-technology',
    href: 'creative-technology.html',
    title: 'Creative Technology',
    description: 'Installationen, Interaktion und Prototypen.',
  },
  {
    slug: 'film',
    href: 'film.html',
    title: 'Film',
    description: 'Kurzfilm, Musikvideo, Animation und Imagefilm.',
  },
  {
    slug: 'game',
    href: 'game.html',
    title: 'Game',
    description: 'Spiele und Game Design.',
  },
  {
    slug: 'kommunikationsdesign',
    href: 'kommunikationsdesign.html',
    title: 'Kommunikations­design', // ­: unsichtbare Trennstelle fuer schmale Bildschirme
    description: 'Corporate Design, Kampagnen und Editorial.',
  },
];

/**
 * Der Godot-Export, der im Projektfenster von Botlnick laeuft.
 * Neu bauen mit `npm run export:spiel`.
 */
export const spiel = {
  slug: 'botlnick',
  title: 'BOTLNICK',
  untertitel: 'Ein Spiel aus eingescannten Orten',
  beschreibung: 'Im Game Jam entstanden: Kein Download nötig.',
  steuerung: [
    ['W A S D', 'Bewegen'],
    ['Maus', 'Umsehen'],
    ['Leertaste', 'Springen'],
    ['E', 'Aufheben / Benutzen'],
    ['Esc', 'Maus freigeben'],
  ],
  /** Pfad zum Godot-Web-Export unter public/. null = noch kein Build. */
  build: '/spiel/botlnick/index.html',
  /** Wird dem Besucher vor dem Start angezeigt. */
  groesseMB: 91,
  groesseGepacktMB: 46,
};
