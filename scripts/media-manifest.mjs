/**
 * Kuratierungs-Liste: was aus Desktop/Portofolio ins Portfolio wandert.
 *
 * Diese Datei ist die einzige Stelle, an der du festlegst, welche Dateien
 * uebernommen werden. `npm run import` liest sie aus, kopiert, konvertiert
 * und legt alles unter public/media/<kategorie>/<slug>/ ab.
 *
 * Felder pro Quelle:
 *   dir      Ordner relativ zu SOURCE_ROOT
 *   include  RegExp auf den Dateinamen
 *   exclude  RegExp, gewinnt gegen include
 *   prefix   benennt die Treffer natuerlich sortiert in prefix-01, prefix-02 ... um
 *   kind     'image' | 'video' | 'pdf'  (default wird aus der Endung geraten)
 *   pages    nur fuer PDFs: 'cover' = nur Seite 1 als Bild,
 *            Zahl = so viele Seiten als Bildergalerie rendern,
 *            0 = gar keine Seitenbilder (nur Download, braucht keepFile)
 *   keepFile nur fuer PDFs: Original zusaetzlich zum Download kopieren
 */

export const SOURCE_ROOT = 'C:/Users/pranv/Desktop/Portofolio';

const IMG = /\.(png|jpe?g)$/i;

export const projects = [
  // ─────────────────────────────────────────────── ARBEIT ────────────
  {
    category: 'arbeit',
    slug: 'chiro-med',
    sources: [
      { dir: 'Arbeit/CHIRO MED', include: IMG, prefix: 'chiro' },
      { dir: 'Arbeit/CHIRO MED', include: /^STYLEGUIDE.*\.pdf$/i, pages: 8, keepFile: true },
    ],
  },
  {
    category: 'arbeit',
    slug: 'citydep',
    sources: [
      // Nur die erste Seite — der Rest wurde auf Wunsch wieder entfernt.
      { dir: 'Arbeit/CITYDEP', include: /^Storyboard.*\.pdf$/i, pages: 1, keepFile: true },
      { dir: 'Arbeit/CITYDEP', include: /^Citydep_part2_remake\.mov$/i },
      { dir: 'Arbeit/CITYDEP', include: /^CITYDEP_TEASER\.mp4$/i },
    ],
  },
  {
    category: 'arbeit',
    slug: 'fischerhuette',
    sources: [
      // 3.png/4.png (Terrasse, Lichterketten) auf Wunsch raus — nur das
      // Kampagnenmotiv (dhasd.png) bleibt als fischerhuette-01.
      {
        dir: 'Arbeit/FISCHERHÜTTE',
        include: IMG,
        exclude: /^(3|4)\.png$/i,
        prefix: 'fischerhuette',
      },
      // tischaufsteller-02 wurde auf Wunsch geloescht. Beim naechsten Import
      // kaeme es wieder — dann hier per `exclude` den Originalnamen des
      // zweiten Bilds im Ordner ausschliessen.
      {
        dir: 'Arbeit/FISCHERHÜTTE/TISCHAUFSTELLER FISCHERHÜTTE',
        include: IMG,
        prefix: 'tischaufsteller',
      },
    ],
  },
  {
    category: 'arbeit',
    slug: 'handwerkerexperten',
    sources: [
      { dir: 'Arbeit/HANDWERKER', include: /^(LOGO_KOMBINIERT|URSPRUNGSLOGO)\.png$/i },
      { dir: 'Arbeit/HANDWERKER', include: /^(1|2)\.png$/i, prefix: 'anwendung' },
      {
        dir: 'Arbeit/HANDWERKER',
        include: /^VERWALTEREXPERTEN_FLYERDRUCK.*\.png$/i,
        prefix: 'verwalterexperten',
      },
      { dir: 'Arbeit/HANDWERKER/VISITENKARTEN', include: IMG, prefix: 'visitenkarte' },
      {
        dir: 'Arbeit/HANDWERKER',
        include: /^(BRIEFPAPIER_|FLYER_DIGITAL-HANDWERKER|HANDWERKEREXPERTEN_FLYERDRUCK)\.pdf$/i,
        pages: 6,
        keepFile: true,
      },
    ],
  },
  {
    category: 'arbeit',
    slug: 'huginn',
    sources: [
      { dir: 'Arbeit/Huginn', include: /^LOGO_HUGINN\.png$/i },
      { dir: 'Arbeit/Huginn', include: /^HEADER_WEBSEITE\.png$/i },
      // Getrennt gelistet, damit die Vorderseite zuerst kommt — sonst wuerde
      // die alphabetische Sortierung die Rueckseite nach vorne ziehen.
      { dir: 'Arbeit/Huginn', include: /^FLYER_VORDERSEITE\.png$/i, prefix: 'flyer-vorne' },
      { dir: 'Arbeit/Huginn', include: /^FLYER_RUECKSEITE\.png$/i, prefix: 'flyer-hinten' },
      { dir: 'Arbeit/Huginn', include: /^Mangobowl\.jpe?g$/i },
      { dir: 'Arbeit/Huginn', include: /^STORYBOARD_IMAGEFILM.*\.png$/i, prefix: 'storyboard' },
      { dir: 'Arbeit/Huginn', include: /^HUGINN_RAUMVERMIETUNG\.pdf$/i, pages: 8, keepFile: true },
    ],
  },
  {
    category: 'arbeit',
    slug: 'sodam',
    sources: [
      { dir: 'Arbeit/SODAM/PLAKAT_KAMPAGNE', include: IMG, prefix: 'plakat' },
      {
        dir: 'Arbeit/SODAM/PLAKAT_KAMPAGNE/School of Design and Media-2',
        include: IMG,
        prefix: 'plakat-alt',
      },
      { dir: 'Arbeit/SODAM', include: /^SOCIALMEDIAAUFTRITT\.pdf$/i, pages: 10, keepFile: true },
    ],
  },
  {
    category: 'arbeit',
    slug: 'step-v',
    sources: [{ dir: 'Arbeit/STEP V', include: /^Copy of STEP V\.pdf$/i, pages: 12 }],
  },
  {
    // Das Bild aus dem Ordner STEP V steht auf der Seite als eigenes
    // Projekt "Animationen" im Bereich Film.
    category: 'arbeit',
    slug: 'animationen',
    sources: [{ dir: 'Arbeit/STEP V', include: IMG, prefix: 'animation' }],
  },

  // ───────────────────────────────────────────── FREIZEIT ────────────
  {
    category: 'freizeit',
    slug: 'love',
    sources: [
      { dir: 'FREIZEIT/LOVE', include: /^LOVE\.png$/i },
      { dir: 'FREIZEIT/LOVE', include: /^\d+\.png$/i, prefix: 'love' },
      { dir: 'FREIZEIT/LOVE', include: /\.mov$/i },
    ],
  },
  {
    category: 'freizeit',
    slug: 'kamamuta',
    sources: [
      { dir: 'UNI/KAMAMUTA/Bilder/FIRST IDEAS', include: IMG, prefix: 'first-ideas' },
      { dir: 'UNI/KAMAMUTA/Bilder/ARCHIVE', include: IMG, prefix: 'archive' },
      { dir: 'UNI/KAMAMUTA/Bilder/SPAZIERGANG', include: IMG, prefix: 'spaziergang' },
      { dir: 'UNI/KAMAMUTA/Bilder/BLACK SWAN', include: IMG, prefix: 'black-swan' },
      { dir: 'UNI/KAMAMUTA/Bilder/VEITES KAPITEE', include: IMG, prefix: 'veites-kapitee' },
      { dir: 'UNI/KAMAMUTA/Bilder/KAMA MUTA MAGAZINE PROTOTYPE', include: IMG, prefix: 'prototyp' },
      {
        dir: 'UNI/KAMAMUTA',
        include: /^KAMA MUTA MAGAZINE PROTOTYPE\.pdf$/i,
        pages: 'cover',
        keepFile: true,
      },
    ],
  },
  {
    category: 'freizeit',
    slug: 'musikvideos',
    sources: [
      // Nur das veroeffentlichte EREZA-Video — das anonyme Rohmaterial ist raus.
      { dir: 'FREIZEIT/MUSIKVIDEOS', include: /^EREZA.*\.mp4$/i },
    ],
  },

  // ────────────────────────────────────────────────── UNI ────────────
  {
    category: 'uni',
    slug: 'rreth',
    sources: [
      // Das Magazin RRETH 02 — 30 Seiten, steht als erstes Kapitel auf der
      // Projektseite und erklaert, worum es inhaltlich geht.
      { dir: 'UNI/RRETH', include: /^RRETH02\.pdf$/i, pages: 30, keepFile: true },
      // Geplante Instagram-Kampagne — steht als Zukunftsausblick am Ende.
      { dir: 'UNI/RRETH', include: /^RRETH_KAMPAGNE\.pdf$/i, pages: 4, keepFile: true },
      { dir: 'UNI/RRETH/Symbolism', include: /\.jpe?g$/i, prefix: 'symbolik' },
      // Vision Board von 2023 — die erste Praesentation der Bachelorarbeit.
      { dir: 'UNI/RRETH', include: /^VISION BOARD\.pdf$/i, pages: 32, keepFile: true },
      { dir: 'UNI/RRETH', include: /^PITCH VERSION 1\.pdf$/i, pages: 14, keepFile: true },
      { dir: 'UNI/RRETH', include: /^wheel of shame\.pdf$/i, pages: 6, keepFile: true },
      // Dokumentation-2 auf Wunsch raus — die Reflexion steht jetzt nur noch in Worten da.
      {
        dir: 'UNI/RRETH/DOKUMENTATION RRETH',
        include: /^(IN HALT|HAVE)\.pdf$/i,
        pages: 8,
      },
      // Neue Raumskizze von Laura Zahn, in Kooperation mit der Roessle-Gastronomie.
      { dir: 'UNI/RRETH/RRRETH', include: /^THELAYOUT\.PNG$/i, prefix: 'raumskizze-laura' },
      { dir: 'UNI/RRETH/RRRETH', include: /\.mov$/i },
    ],
  },
  {
    category: 'uni',
    slug: 'in-lakech',
    sources: [
      // Inspirationsquelle und grobe Spielskizze
      { dir: 'UNI/KAMAMUTA/Bilder/VISIONS', include: IMG, prefix: 'visions' },
      { dir: 'UNI/KAMAMUTA/Bilder/ARCADE', include: IMG, prefix: 'arcade' },
      // Die beiden Spielfiguren als Nokia-Grafik, aus dem Spielordner kopiert
      { dir: 'UNI/IN LAKECH', include: /^HAND_(TAIYO|TSUKI)\.png$/i, prefix: 'hand' },
      // Die Angriffs-Animationen — erstellt von Julien Truebiger
      { dir: 'UNI/KAMAMUTA/Animation_NOKIA_3310', include: /\.gif$/i, prefix: 'animation' },
      // Die gedruckten Begegnungen, die der Automat ausgibt
      { dir: "UNI/KAMAMUTA/Bilder/IN LAK'ECH", include: IMG, prefix: 'begegnung' },
      { dir: "UNI/KAMAMUTA/Bilder/in lak'ech 2 (1)", include: IMG, prefix: 'begegnung-2' },
    ],
  },
  {
    category: 'uni',
    slug: 'botlnick-gamejam',
    sources: [
      { dir: 'UNI/GameJam Documentation/Bilder/benutzt', include: IMG, prefix: 'photogrammetrie' },
      {
        dir: 'UNI/GameJam Documentation',
        include: /^ReferenceCharacter.*\.png$/i,
        prefix: 'character-ref',
      },
      {
        dir: 'UNI/GameJam Documentation/GAMEJAM/DOKUMENTATION GAMEJAM',
        include:
          /^(StageDesign|StageDesignPhotogrammetry|Style|Key Objects|Cutscenes|SideCharacter|Comedic Relief)\.png$/i,
      },
      {
        dir: 'UNI/GameJam Documentation/GAMEJAM/DOKUMENTATION GAMEJAM',
        include: /^(Hauptcharacter|Nebencharacter)\.jpe?g$/i,
      },
      {
        dir: 'UNI/GameJam Documentation/GAMEJAM',
        include: /^(LIMINAL SPACE|Screenshot|scenerie|ERSTE SZENE ERGEBNIS)\.png$/i,
      },
      {
        dir: 'UNI/GameJam Documentation/GAMEJAM',
        include: /^(Beginning|Revolution|GameJamStartScreen)\.mp4$/i,
      },
      {
        dir: 'UNI/GameJam Documentation',
        include: /^BOTLNICK\.Dokumentation-2\.pdf$/i,
        pages: 20,
        keepFile: true,
      },
      {
        dir: 'UNI/GameJam Documentation/GAMEJAM',
        include: /^Game Studies \(GDD\)\.pdf$/i,
        pages: 10,
        keepFile: true,
      },
    ],
  },
  {
    category: 'uni',
    slug: 'zodizine',
    sources: [
      { dir: 'UNI/Zodizine', include: /^Bildschirmfoto.*\.png$/i, prefix: 'zodizine' },
      // Der Inhalt steht als Text auf der Seite — das Seitenbild braucht es nicht.
      { dir: 'UNI/Zodizine', include: /^ZineProjektbericht\.pdf$/i, pages: 0, keepFile: true },
      { dir: 'UNI/Zodizine', include: /^DJI_.*0009_D\.MP4$/i },
      { dir: 'UNI/Zodizine', include: /^ZodiZine_Doku\.mp4$/i },
    ],
  },
  {
    category: 'uni',
    slug: 'art-of-peace',
    sources: [
      { dir: 'UNI/ArtOfPeace', include: /^Medienpreis Scan\.pdf\.png$/i },
      { dir: 'UNI/ArtOfPeace', include: /\.mp4$/i },
    ],
  },
  {
    category: 'uni',
    slug: 'interaktionsdesign',
    sources: [
      {
        dir: 'UNI',
        include: /^Interaktionsdesign-Projektbericht\.pdf$/i,
        pages: 14,
        keepFile: true,
      },
      { dir: 'UNI', include: /^Bano\.png$/i },
    ],
  },
  {
    category: 'uni',
    slug: 'nostalgia',
    sources: [
      {
        dir: 'UNI/Nostalgia',
        include: /^(LIMIN2|LIMIN3|LIMINALITAETFOTOS0|LIMINALITÄTFOTOS0)\.jpe?g$/i,
        prefix: 'liminal',
      },
      { dir: 'UNI/Nostalgia', include: /^BRAINSTORM\.png$/i },
      { dir: 'UNI/Nostalgia', include: /^Archiv\.png$/i },
      // sonic-01/02.jpg sind trotz Endung HEIC-Dateien und lassen sich nicht
      // konvertieren. Es sind ohnehin fremde Referenzbilder — bewusst raus.
      { dir: 'UNI/Nostalgia', include: /^skizze-\d+\.jpe?g$/i, prefix: 'skizze' },
      { dir: 'UNI/Nostalgia', include: /^TouchDesignerJulia\d\.jpe?g$/i, prefix: 'touchdesigner' },
      { dir: 'UNI/Nostalgia', include: /^TD_Screenshot_.*\.png$/i, prefix: 'td-screenshot' },
      { dir: 'UNI/Nostalgia', include: /^Final1[012]\.png$/i, prefix: 'final' },
      { dir: 'UNI/Nostalgia', include: /\.mov$/i },
    ],
  },
  {
    category: 'uni',
    slug: 'shepard-tone',
    sources: [
      // Die richtige Dokumentation (7 Seiten) — die alte "Shepard tone.pdf"
      // gehoerte nicht zu diesem Projekt.
      { dir: 'UNI', include: /^SHEPHARD_TONE_DOKU\.pdf$/i, pages: 7, keepFile: true },
    ],
  },
];

/** Grenzwerte – alles darueber wird uebersprungen und in ASSETS-REPORT.md protokolliert. */
export const LIMITS = {
  videoBytes: 50 * 1024 * 1024, // Videos groesser als 50 MB: erst komprimieren
  pdfCopyBytes: 20 * 1024 * 1024, // PDFs groesser als 20 MB nicht als Download kopieren
  imageMaxWidth: 1800,
  thumbWidth: 720,
  webpQuality: 80,
};
