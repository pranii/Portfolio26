/**
 * Globale Angaben. Hier zuerst deinen Namen und die Kontaktdaten eintragen.
 */

export const site = {
  name: 'PREJNI', // TODO — steht gross auf der Startseite
  role: 'Kommunikationsdesign · Creative Technology · Game Design',
  intro:
    'Ich gestalte PRINT, DIGITALES und RAUM. Im folgenden sind verschiedene Projekte dokumentiert.', // TODO
  email: 'pranverapelaj@outlook.de',
  links: [
    { label: 'E-Mail', href: 'mailto:pranverapelaj@outlook.de' },
    { label: 'Instagram', href: 'https://www.instagram.com/prejniii/' }, // TODO
    { label: 'Lebenslauf', href: '#' }, // TODO
  ],

  ort: 'Furtwangen, Schwarzwald',
  koordinaten: 'N 48° 3\' 5" E 8° 12\' 33"',
  version: 'v1.0',
};

export const categories = [
  {
    slug: 'arbeit',
    href: 'arbeit.html',
    title: 'in arbeit geschafft',
    description: 'Arbeiten fuer Auftraggeber',
  },
  {
    slug: 'freizeit',
    href: 'freizeit.html',
    title: 'in freizeit gemacht',
    description: 'Arbeit ohne Briefing',
  },
  {
    slug: 'uni',
    href: 'uni.html',
    title: 'in uni gelernt',
    description: 'Rauminstallation, Magazin, Game Design und Interaktion.',
  },
];

/**
 * Das Spiel, das direkt im Browser laeuft (spiel.html).
 * Neu bauen mit `npm run export:spiel`.
 */
export const spiel = {
  slug: 'botlnick',
  title: 'BOTLNICK',
  untertitel: 'Ein Spiel aus eingescannten Orten',
  href: 'spiel.html',
  beschreibung: 'Im Game Jam entstanden: Kein Download noetig.',
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
