/**
 * Globale Angaben. Hier zuerst deinen Namen und die Kontaktdaten eintragen.
 */

export const site = {
  name: 'DEIN NAME', // TODO — steht gross auf der Startseite
  role: 'Kommunikationsdesign · Film · Game',
  intro:
    'Ich gestalte zwischen Print, bewegtem Bild und Raum. Jedes Projekt hier zeigt nicht nur das Ergebnis, sondern den Weg dorthin — Schritt fuer Schritt.', // TODO
  email: 'prejysion@gmail.com',
  links: [
    { label: 'E-Mail', href: 'mailto:prejysion@gmail.com' },
    { label: 'Instagram', href: '#' }, // TODO
    { label: 'Vimeo', href: '#' }, // TODO
    { label: 'Lebenslauf', href: '#' }, // TODO
  ],

  /* Diese drei Angaben stehen klein in der Fusszeile. */
  version: 'ausg. hs26', // TODO — wie eine Ausgabennummer
  ort: 'Furtwangen, Schwarzwald',
  koordinaten: "N 48° 3' 5\" E 8° 12' 33\"",
};

export const categories = [
  {
    slug: 'arbeit',
    href: 'arbeit.html',
    title: 'Arbeit',
    description:
      'Arbeiten fuer Auftraggeber — Marken, Kampagnen, Geschaeftsausstattung und Imagefilme.',
  },
  {
    slug: 'freizeit',
    href: 'freizeit.html',
    title: 'Freizeit',
    description: 'Eigene Arbeiten ohne Briefing — Kurzfilm, Musikvideo und Filmkonzepte.',
  },
  {
    slug: 'uni',
    href: 'uni.html',
    title: 'Uni',
    description: 'Studienprojekte — Rauminstallation, Magazin, Game Design und Interaktion.',
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
  beschreibung:
    'Im Game Jam entstanden: reale Tiefgaragen und Keller wurden abgescannt und zu begehbaren Raeumen zusammengesetzt. Laeuft direkt im Browser, kein Download noetig.',
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
