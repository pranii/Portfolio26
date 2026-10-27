/**
 * ZODIZINE — die Zeichen und ihre Texte.
 *
 * Grundlage des Automaten: Aus einem Geburtsdatum werden drei Zeichen
 * bestimmt — eines aus dem chinesischen, eines aus dem indischen
 * (siderischer Sonnenstand, Rashi) und eines aus dem keltischen
 * Baumkalender. Die Rechnung steckt in src/scripts/lib/zodizine-automat.js.
 *
 * Das Heft selbst besteht aus Caras Zeichnungen: zu jedem Zeichen eine
 * Illustration und eine Affirmation, dazu Umschlag vorne und hinten. Die
 * Seiten liegen unter public/zodizine/, aufbereitet von
 * scripts/make-zodizine-seiten.mjs. `datei` sagt, welche davon gemeint ist.
 *
 * `worte` und `text` stehen nicht im Heft — sie sind die deutsche
 * Bildunterschrift im Fenster und die Bildbeschreibung fuer Vorleser.
 * Auf den gezeichneten Seiten steht Caras englische Fassung.
 */

/**
 * Chinesisch, in der Reihenfolge des Zyklus.
 * Erster Eintrag = Ratte = die Jahre 1900, 1912, 1924 …
 */
export const chinesisch = [
  {
    name: 'Ratte',
    datei: 'rat',
    worte: ['wach', 'findig', 'vorausschauend'],
    text:
      'Merkt früher als alle anderen, dass es knapp wird, und hat dann schon gesammelt. ' +
      'Kommt mit Charme weiter als mit Ellenbogen.',
  },
  {
    name: 'Büffel',
    datei: 'ox',
    worte: ['geduldig', 'verlässlich', 'stur'],
    text:
      'Zieht die Furche zu Ende, auch wenn niemand zusieht. Langsam zu überzeugen — ' +
      'und danach nicht mehr vom Weg zu bringen.',
  },
  {
    name: 'Tiger',
    datei: 'tiger',
    worte: ['mutig', 'impulsiv', 'stolz'],
    text:
      'Geht hinein, wo andere noch die Lage prüfen. Die Kraft ist echt, die Geduld ' +
      'muss geliehen werden.',
  },
  {
    name: 'Hase',
    datei: 'rabbit',
    worte: ['feinfühlig', 'diplomatisch', 'vorsichtig'],
    text:
      'Spürt die Stimmung im Raum, bevor ein Wort fällt. Weicht dem Streit aus — ' +
      'nicht aus Angst, sondern aus Geschmack.',
  },
  {
    name: 'Drache',
    datei: 'dragon',
    worte: ['leuchtend', 'ehrgeizig', 'ungeduldig'],
    text:
      'Nimmt Platz ein, ohne darum zu bitten. Wo der Drache auftaucht, wird es selten ' +
      'langweilig und nie leise.',
  },
  {
    name: 'Schlange',
    datei: 'snake',
    worte: ['klug', 'verschlossen', 'elegant'],
    text:
      'Sagt wenig und weiß viel. Entscheidet in aller Ruhe und handelt dann in einer ' +
      'einzigen Bewegung.',
  },
  {
    name: 'Pferd',
    datei: 'horse',
    worte: ['frei', 'rastlos', 'offen'],
    text:
      'Braucht Weite, auch im Gespräch. Bindet sich gern, solange die Tür offen ' +
      'stehen bleibt.',
  },
  {
    name: 'Ziege',
    datei: 'goat',
    worte: ['sanft', 'künstlerisch', 'eigensinnig'],
    text:
      'Macht es sich schön, wo andere nur durchmüssen. Hinter der weichen Art steckt ' +
      'ein sehr eigener Kopf.',
  },
  {
    name: 'Affe',
    datei: 'monkey',
    worte: ['neugierig', 'erfinderisch', 'frech'],
    text:
      'Löst das Problem über einen Umweg, den niemand kommen sah. Langeweile ist die ' +
      'einzige echte Gefahr.',
  },
  {
    name: 'Hahn',
    datei: 'rooster',
    worte: ['genau', 'direkt', 'stolz'],
    text:
      'Sagt, was ist, und zwar pünktlich. Ordnung ist hier keine Pflicht, sondern ' +
      'ein Vergnügen.',
  },
  {
    name: 'Hund',
    datei: 'dog',
    worte: ['treu', 'gerecht', 'wachsam'],
    text:
      'Stellt sich vor die, die dazugehören. Vertrauen wird langsam vergeben und ' + 'dann ganz.',
  },
  {
    name: 'Schwein',
    datei: 'pig',
    worte: ['großzügig', 'gutmütig', 'genussvoll'],
    text:
      'Teilt, bevor gefragt wird, und glaubt an das Gute auch beim zweiten Mal. ' +
      'Der Tisch ist selten leer.',
  },
];

/**
 * Die fuenf Wandlungsphasen. Sie wechseln alle zwei Jahre.
 * Die Reihenfolge ist so gelegt, dass 1900/1901 auf den ersten Eintrag
 * faellt — deshalb beginnt die Liste mit Metall und nicht, wie sonst
 * ueblich, mit Holz.
 */
export const elemente = [
  { name: 'Metall', satz: 'schneidet klar, ordnet, glänzt' },
  { name: 'Wasser', satz: 'fließt um Hindernisse, denkt nach, trägt' },
  { name: 'Holz', satz: 'wächst, plant, will weiter' },
  { name: 'Feuer', satz: 'brennt, reißt mit, verbrennt sich' },
  { name: 'Erde', satz: 'hält, sammelt, bleibt' },
];

/**
 * Indisch (Rashi, siderischer Sonnenstand). `von` und `bis` sind
 * [Monat, Tag]. Die Uebergaenge verschieben sich jaehrlich um bis zu
 * einen Tag; der Automat rechnet mit den gebraeuchlichen Sankranti-Daten.
 */
export const indisch = [
  {
    name: 'Mesha',
    datei: 'aries',
    deutsch: 'Widder',
    von: [4, 14],
    bis: [5, 14],
    worte: ['antreibend', 'mutig', 'direkt'],
    text:
      'Fängt an, bevor der Plan fertig ist. Das Feuer ist echt, es braucht nur ' + 'eine Richtung.',
  },
  {
    name: 'Vrishabha',
    datei: 'taurus',
    deutsch: 'Stier',
    von: [5, 15],
    bis: [6, 14],
    worte: ['beständig', 'sinnlich', 'geduldig'],
    text: 'Baut, was bleiben soll. Schönheit ist hier kein Luxus, sondern ' + 'Grundausstattung.',
  },
  {
    name: 'Mithuna',
    datei: 'gemini',
    deutsch: 'Zwillinge',
    von: [6, 15],
    bis: [7, 15],
    worte: ['beweglich', 'sprachbegabt', 'neugierig'],
    text: 'Zwei Gedanken auf einmal, beide interessant. Die Welt wird im Reden sortiert.',
  },
  {
    name: 'Karka',
    datei: 'cancer',
    deutsch: 'Krebs',
    von: [7, 16],
    bis: [8, 16],
    worte: ['fürsorglich', 'treu', 'empfindsam'],
    text: 'Baut ein Zuhause, auch unterwegs. Was einmal dazugehört, wird gehütet.',
  },
  {
    name: 'Simha',
    datei: 'leo',
    deutsch: 'Löwe',
    von: [8, 17],
    bis: [9, 16],
    worte: ['stolz', 'großzügig', 'warm'],
    text: 'Steht gern im Licht und gibt es weiter. Anerkennung ist Nahrung, keine Eitelkeit.',
  },
  {
    name: 'Kanya',
    datei: 'virgo',
    deutsch: 'Jungfrau',
    von: [9, 17],
    bis: [10, 16],
    worte: ['genau', 'hilfsbereit', 'kritisch'],
    text: 'Sieht das Detail, das alles zusammenhält. Helfen heißt hier: besser machen.',
  },
  {
    name: 'Tula',
    datei: 'libra',
    deutsch: 'Waage',
    von: [10, 17],
    bis: [11, 15],
    worte: ['ausgleichend', 'ästhetisch', 'unentschieden'],
    text: 'Wägt ab, bis beide Seiten gehört sind. Harmonie ist Arbeit, nicht Zufall.',
  },
  {
    name: 'Vrischika',
    datei: 'scorpio',
    deutsch: 'Skorpion',
    von: [11, 16],
    bis: [12, 15],
    worte: ['tief', 'leidenschaftlich', 'verschlossen'],
    text: 'Geht bis auf den Grund oder gar nicht erst los. Was hier beginnt, hat Gewicht.',
  },
  {
    name: 'Dhanu',
    datei: 'sagittarius',
    deutsch: 'Schütze',
    von: [12, 16],
    bis: [1, 14],
    worte: ['suchend', 'offen', 'ehrlich'],
    text: 'Fragt nach dem Sinn und packt den Rucksack. Wahrheit ist wichtiger als Takt.',
  },
  {
    name: 'Makara',
    datei: 'capricorn',
    deutsch: 'Steinbock',
    von: [1, 15],
    bis: [2, 12],
    worte: ['ausdauernd', 'ernst', 'ehrgeizig'],
    text: 'Nimmt den langen Weg, weil er hält. Spät gefeiert, aber oben angekommen.',
  },
  {
    name: 'Kumbha',
    datei: 'aquarius',
    deutsch: 'Wassermann',
    von: [2, 13],
    bis: [3, 13],
    worte: ['eigen', 'sozial', 'vorausdenkend'],
    text: 'Denkt in Systemen und gegen den Strich. Nähe entsteht über gemeinsame Ideen.',
  },
  {
    name: 'Meena',
    datei: 'pisces',
    deutsch: 'Fische',
    von: [3, 14],
    bis: [4, 13],
    worte: ['träumend', 'mitfühlend', 'durchlässig'],
    text: 'Nimmt mehr auf, als gesagt wird. Grenzen sind hier gelernt, nicht angeboren.',
  },
];

/**
 * Keltischer Baumkalender: dreizehn Abschnitte zu rund 28 Tagen.
 * Der erste beginnt am 24. Dezember, drei Tage nach der laengsten Nacht.
 */
export const keltisch = [
  {
    name: 'Birke',
    datei: 'birch',
    von: [12, 24],
    bis: [1, 20],
    worte: ['Anfang', 'Klarheit', 'Zähigkeit'],
    text:
      'Der erste Baum nach der längsten Nacht. Fängt immer wieder von vorn an, ' +
      'auch auf kargem Boden.',
  },
  {
    name: 'Eberesche',
    datei: 'rowan',
    von: [1, 21],
    bis: [2, 17],
    worte: ['Schutz', 'Vision', 'Eigensinn'],
    text: 'Steht da, wo sonst nichts steht. Sieht weiter, als der Weg reicht.',
  },
  {
    name: 'Esche',
    datei: 'ash',
    von: [2, 18],
    bis: [3, 17],
    worte: ['Verbindung', 'Weite', 'Unruhe'],
    text: 'Wurzel und Krone gleich weit auseinander. Verbindet, was sonst nebeneinander läge.',
  },
  {
    name: 'Erle',
    datei: 'alder',
    von: [3, 18],
    bis: [4, 14],
    worte: ['Mut', 'Standfestigkeit', 'Aufbruch'],
    text: 'Wächst im nassen Grund und hält ihn fest. Geht voran, wo es matschig wird.',
  },
  {
    name: 'Weide',
    datei: 'willow',
    von: [4, 15],
    bis: [5, 12],
    worte: ['Gefühl', 'Beweglichkeit', 'Erinnerung'],
    text: 'Biegt sich im Sturm und bricht nicht. Nah am Wasser gebaut, im besten Sinn.',
  },
  {
    name: 'Weißdorn',
    datei: 'hawthorn',
    von: [5, 13],
    bis: [6, 9],
    worte: ['Schwelle', 'Witz', 'Schutz'],
    text: 'Blüht und sticht zugleich. Hütet den Übergang zwischen zwei Zuständen.',
  },
  {
    name: 'Eiche',
    datei: 'oak',
    von: [6, 10],
    bis: [7, 7],
    worte: ['Kraft', 'Verantwortung', 'Dauer'],
    text: 'Trägt mehr, als sie müsste. Dass andere sich unterstellen, ist kein Zufall.',
  },
  {
    name: 'Stechpalme',
    datei: 'holly',
    von: [7, 8],
    bis: [8, 4],
    worte: ['Behauptung', 'Ausdauer', 'Stolz'],
    text: 'Grün, wenn alles andere kahl ist. Wehrt sich leise und wirksam.',
  },
  {
    name: 'Hasel',
    datei: 'hazel',
    von: [8, 5],
    bis: [9, 1],
    worte: ['Wissen', 'Intuition', 'Sprache'],
    text: 'Die Rute findet das Wasser. Lernt schnell und erzählt es weiter.',
  },
  {
    name: 'Weinrebe',
    datei: 'vine',
    von: [9, 2],
    bis: [9, 29],
    worte: ['Genuss', 'Widerspruch', 'Reife'],
    text: 'Süß und sauer in derselben Frucht. Entscheidet sich ungern, lebt dafür doppelt.',
  },
  {
    name: 'Efeu',
    datei: 'ivy',
    von: [9, 30],
    bis: [10, 27],
    worte: ['Treue', 'Beharrlichkeit', 'Bindung'],
    text: 'Hält sich fest und wächst trotzdem. Kommt durch Winter, die anderen zu lang sind.',
  },
  {
    name: 'Schilf',
    datei: 'reed',
    von: [10, 28],
    bis: [11, 24],
    worte: ['Wahrheit', 'Tiefe', 'Klang'],
    text: 'Innen hohl, deshalb klingt es. Fragt so lange, bis der Kern frei liegt.',
  },
  {
    name: 'Holunder',
    datei: 'elder',
    von: [11, 25],
    bis: [12, 23],
    worte: ['Wandel', 'Freiheit', 'Erfahrung'],
    text: 'Der letzte Baum vor der Wende. Nimmt viel mit und hängt an wenig.',
  },
];

/** Texte des Automaten selbst — Startbild und der Hinweis am fertigen Heft. */
export const zine = {
  titel: 'ZODIZINE',
  untertitel: 'Ein Heft, nur für diesen einen Tag',
  faltung: 'Dreimal falten, einmal schneiden — die Anleitung liegt dem Druck bei.',
};
