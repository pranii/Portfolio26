/**
 * CREATIVE TECHNOLOGY — Installationen, Interaktion und Prototypen.
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
  slug: 'creative-technology',
  title: 'Creative Technology',
  lead: 'Installationen, Interaktion und Prototypen — Arbeiten, in denen Technik zum Material wird.', // TODO
  /**
   * "So gehe ich vor" — erscheint unter dem Karussell. Vier Schritte
   * sind ideal, mehr oder weniger geht auch.
   */
  vorgehen: [
    // TODO: eigene Formulierung
    {
      title: 'Eine Frage finden',
      text: 'Am Anfang steht ein Gefühl oder eine Beobachtung, nicht die Technik. Erst wenn klar ist, was jemand erleben soll, suche ich das Werkzeug dafür.',
    },
    {
      title: 'Schnell bauen',
      text: 'Billige Prototypen aus Raspberry Pi, TouchDesigner oder Pappe — lieber zehn grobe Versuche als ein perfekter.',
    },
    {
      title: 'Mit Menschen testen',
      text: 'Ich lasse andere ausprobieren und schaue zu. Was sie tun, sagt mehr als das, was sie darüber sagen.',
    },
    {
      title: 'Den Raum gestalten',
      text: 'Licht, Ton, Wege und Ablauf entscheiden, ob die Technik verschwindet und nur das Erlebnis bleibt.',
    },
  ],
  /**
   * Software, die du in diesem Bereich beherrschst. Zu jedem Eintrag zeigt
   * die Seite, in wie vielen Projekten er unter `tools` vorkommt.
   */
  software: [
    'TouchDesigner',
    'Python',
    'JavaScript',
    'React',
    'Flask',
    'Raspberry Pi',
    'Web Audio API',
    'Ableton',
    'Figma',
    'Polycam',
  ], // TODO: pruefen
};

export const projects = [
  {
    slug: 'rreth',
    title: 'Rreth',
    subtitle: 'Take It All Off // Break the Silence',
    cover: 'header',
    description:
      'Rreth — albanisch für Kreis — begann 2020 mit einem kleinen Magazin und einem ' +
      'Schlüsselanhänger und läuft seither in drei Etappen. Von 2021 bis 2023 entstand als ' +
      'Bachelorarbeit eine immersive Rauminstallation über die komplexe posttraumatische ' +
      'Belastungsstörung: ein vierteiliges Video, ein eigener Soundtrack und ein Magazin, ' +
      'das durch die psychologischen Modelle dahinter führt. Als eigenständige Diagnose ' +
      'steht die Erkrankung erst in der ICD-11, 2018 veröffentlicht und seit 2022 in ' +
      'Kraft — entsprechend wenig bekannt ist sie, dabei erfüllt ein erheblicher Teil ' +
      'derer, die über depressive Symptome berichten, zugleich ihre Kriterien. 2025 kam ' +
      'das Projekt im ' +
      'Master noch einmal auf den Tisch, diesmal zu dritt mit Cara Brüggendieck und Laura ' +
      'Zahn: ein Pitch über fünf Phasen, Symbole für jeden Akt und die Planung einer ' +
      'begehbaren Videoinstallation. 2028 soll daraus das werden, was im Pitch steht — eine ' +
      'Ausstellung in der Halle 93 in Stuttgart, mit überarbeitetem Magazin und einer App, ' +
      'die den Besucher über die Installation hinaus begleitet.',
    year: '2020 - 2025',
    role: 'Konzeption, Recherche, Regie, Videoschnitt, Sounddesign, Rauminstallation',
    client:
      'Bachelorthesis "Rreth — Dokumentation einer immersiven Rauminstallation", vorgelegt ' +
      '2023 im Studiengang Online Medien, Fakultät Digitale Medien der Hochschule Furtwangen. ' +
      'Betreuung: Prof. Thomas Krach und Prof. Matthias Reusch. Fortführung 2025 im Master ' +
      'Design Interaktiver Medien mit Cara Brüggendieck und Laura Zahn',
    tools: [
      'Premiere Pro',
      'After Effects',
      'EbSynth',
      'RunwayML',
      'Logic Pro',
      'Photoshop',
      'InDesign',
    ],
    tags: ['Rauminstallation', 'Film', 'Partizipation', 'Editorial'],
    prototyp: {
      art: 'magazin',
      titel: 'Das Magazin durchblättern',
      label: 'Magazin blättern',
      quelle: 'rreth02',
    },
    pull: 'Die plötzliche Stille ist fast lauter als der Lärm.',
    chapters: [
      // TODO: RRETH1.pdf (das 2020er Magazin + der Schluesselanhaenger, mit dem
      // alles begann) fehlt noch als Datei. Sobald es vorliegt, hier als erstes
      // Kapitel im Karussell-Layout einfuegen, z.B.:
      //   { title: '2020 — Magazin und Schluesselanhaenger', files: ['rreth1'], layout: 'track' }

      // ── 2021 bis 2023: die Bachelorarbeit ──
      {
        title: 'Der Film',
        text:
          'Das Hauptvideo der Rauminstallation: vier Segmente, dazu ein eigens komponierter ' +
          'Soundtrack. In der Ausstellung lief es an einer Wand, während nebenan das ' +
          'Schattenspiel stand — hier ist es am Stück zu sehen.',
        embed: 'https://youtu.be/i9AlftZ5PIk',
      },
      {
        title: 'Worum es geht',
        text:
          'Mir geht es darum, Verhaltensweisen zu erkennen, die einmal als Schutzmechanismus ' +
          'gedient haben — und dann bewusst gegen den eigenen Impuls zu handeln, für ein ' +
          'schöneres Miteinander. Das Magazin legt die Grundlage dafür: Es führt vom ' +
          'Instanzenmodell nach Freud über Melanie Kleins Objektbeziehungstheorie zu Pete ' +
          'Walkers vier Überlebensstrategien — Kampf, Flucht, Erstarrung, Unterwerfung — und ' +
          'endet bei konkreten Gedankenkorrekturen. Jede dieser Strategien hat einmal ' +
          'funktioniert. Das ist der Punkt: Sie war nie ein Charakterfehler, sondern eine ' +
          'Lösung für eine Situation, die so heute nicht mehr herrscht.',
        // Die Seiten stehen oben im Heft zum Durchblaettern — als Bilderreihe
        // waeren sie doppelt.
        textOnly: true,
      },
      {
        title: 'Erste Skizzen',
        text:
          'Angefangen hat es 2021 mit vielen Tagebucheinträgen und Brainstorms. Drei ' +
          'Wortfelder blieben übrig: Paranoia, Dissoziation, Dissonanz. Daraus hat sich ' +
          'herausgeschält, dass es nicht um Depression gehen sollte, sondern um Scham — um ' +
          'das Gefühl, das man nicht erzählt und das genau deshalb bleibt.',
        files: ['have'],
        layout: 'grid',
      },
      {
        title: 'Vision Board — die erste Präsentation',
        text:
          'Mit diesem Vision Board habe ich Rreth 2023 zum ersten Mal bei Professor Krach ' +
          'vorgestellt. Darin steht alles, was danach gedreht wurde: vier ' +
          'Projektionsebenen, ein Vorspann, in dem ein Ball viermal aufspringt und sich dann ' +
          'in ein zwinkerndes Auge verwandelt, und ein Storyboard, das für jede der vier ' +
          'Überlebensstrategien dieselbe Szene durchspielt — eine Person auf einem Bett, ' +
          'eine zweite kommt dazu, und je nach Strategie schlägt die erste um sich, macht ' +
          'sich klein, erstarrt und dissoziiert oder umarmt die, die gerade schimpft. ' +
          'Dazu die Referenzen: die verwischten Figuren von John Batho, Hirnscans, ' +
          'monochromes Korn, die Gummischlauch-Figuren von Max Fleischer. Und eine Regel, ' +
          'die über allem steht: Das Material wird mit KI so weit abstrahiert, dass man ' +
          'sich darin wiedererkennen kann, ohne sich bloßgestellt zu fühlen — ähnlich ' +
          'genug, um gemeint zu sein, fremd genug, um es auszuhalten.',
        files: ['vision-board'],
        layout: 'track',
      },
      {
        title: 'Vier Akte, vier albanische Worte',
        text:
          'Das Hauptvideo läuft in vier Segmenten, jedes nach dem benannt, was es zeigt. ' +
          '"Themeli", Grundstein: die Reaktionsmuster, die in der Kindheit entstehen und im ' +
          'Erwachsenenalter zum Konfliktherd werden — Kampf, Flucht, Erstarrung, ' +
          'Unterwerfung. "Shprehje Emocionale", emotionaler Ausdruck: eine Tänzerin ' +
          'übersetzt in Bewegung, was passiert, wenn ein Trigger auf ein altes Muster ' +
          'trifft. "Metamorfoza", Metamorphose: die Hauptfigur in Embryohaltung, der ' +
          'Rückzug zum inneren Kind und der Wendepunkt, an dem jemand sich eingesteht, dass ' +
          'ein Verhalten nicht mehr dient. "Çlirim", Befreiung: die Katharsis, in der zum ' +
          'ersten Mal Farbe ins Bild kommt und drei Sätze den Takt geben — "Atme ein.", ' +
          '"Halte es fest.", "Lass es los."',
        textOnly: true,
      },
      {
        title: 'Dreharbeiten',
        text:
          'Gedreht wurde im Aufnahmestudio Photo Universal Kleiber. Für die Hauptrolle habe ' +
          'ich Carina Borgards ausgewählt, weil sie aus dem Tanztheater kommt und die ' +
          'Emotion körperlich tragen kann; dazu Mathis Harrer vor der Kamera, hinter der ' +
          'Kamera Redou Ainouz und Johannes Kleiber. Gefilmt wurde auf einer Sony Alpha ' +
          '6600, der Ton separat über ein Rode NT1-A. Die Kamera bleibt durchgehend an der ' +
          'Protagonistin — das soll sich wie Verfolgung anfühlen, nicht wie Beobachtung.',
        textOnly: true,
      },
      {
        title: 'Bildsprache',
        text:
          'Die drei ersten Segmente sind streng schwarzweiß, als Bild für das ' +
          'Schwarz-Weiß-Denken, das mit der Erkrankung einhergeht; erst im vierten kommt ein ' +
          'tiefes Blau dazu. Jede Figur wurde per Rotoskopie vom Hintergrund gelöst, das ' +
          'Material in Einzelbilder zerlegt und ausgewählte Schlüsselbilder in Photoshop ' +
          'bearbeitet: Gradationskurven, eine invertierte Kopie im Differenzmodus, ' +
          'Weichzeichner, Verflüssigen. EbSynth hat diesen Look dann über die ganze Sequenz ' +
          'gezogen, im dritten Segment hat RunwayML Einzelbilder entfernt und neu berechnet, ' +
          'damit die Bewegung kippt. Über allem liegen die Plug-ins TV-Pixel und Signal — ' +
          'das Bild soll aussehen wie eine Aufnahme, die schon lange im Schrank lag. ' +
          'Zwischendurch stehen schwarze Sequenzen: Trigger werden mit der Zeit leiser, ' +
          'aber sie verschwinden nicht.',
        textOnly: true,
      },
      {
        title: 'Die auditive Ebene',
        text:
          'Der Ton ist in Logic entstanden, 42 Spuren, die meisten als MIDI eingespielt. ' +
          'Melodien und ein verzerrter Bass aus Alchemy, Jungle-Drums für die Höhepunkte, ' +
          'dazwischen eine tickende Uhr. Alles läuft über einen harten Kompressor, damit ' +
          'der Track drückt statt nur zu klingen; Panorama-Automationen verteilen ihn im ' +
          'Raum. Eine Stimmaufnahme wurde mit Hall, Delay und Distortion so weit ' +
          'bearbeitet, dass man sie gerade noch als Stimme erkennt. Im letzten Segment ' +
          'bleibt nur noch Atmen übrig, ein- und ausatmen, als Anleitung zum Mitmachen.',
        textOnly: true,
      },
      {
        title: 'Die Ausstellung in der Stadtgalerie Villingen',
        text:
          'Den Abschluss der Bachelorarbeit bildete die Ausstellung. Über den City-Manager ' +
          'von Villingen-Schwenningen kam der Kontakt zur Stadtgalerie, dort haben wir den ' +
          'Raum ausgesucht. Beamer an der Decke waren nicht erlaubt, also standen sie auf ' +
          'Bänken, die Lautsprecher in den Ecken, die Kabel durch die Raummitte. Bei der ' +
          'Schlüsselübergabe kam heraus, dass eine Wand auf 3,66 Metern offen blieb. Statt ' +
          'den Raum zu verkleinern, habe ich den angrenzenden Platz dazugenommen und neu ' +
          'geplant: Der ursprüngliche Raum wurde zum Schattenspiel, zwei Beamer standen ' +
          'dafür direkt auf dem Boden in den Ecken, und eine drei Sekunden lange Sequenz ' +
          'lief dort in Endlosschleife als Lichtquelle. Die Besucher standen in diesem Raum ' +
          'und sahen das Hauptvideo an der Wand des Flurs daneben — der Beamer dafür stand ' +
          'in einem eigenen Raum auf einem Tisch, mit Lens-Shift und Trapezkorrektur so ' +
          'eingestellt, dass das Bild über die fehlende Wand hinweg läuft. Die geplante ' +
          '4.1-Anlage war nicht verfügbar, also kamen zwei Canton AM5 links und rechts der ' +
          'Projektion auf den Boden. Die Vernissage lief in sechs Schritten: empfangen, ' +
          'Schattenspiel, Anrede, Hauptvideo, kurze Pause, umsehen — und am Ende Postkarten ' +
          'mit einem QR-Code, der zum Magazin führt.',
        textOnly: true,
      },

      // ── 2025: Fortsetzung im Master, zu dritt ──
      {
        title: '2025 — Rreth wird ein Dreierprojekt',
        text:
          'Zwei Jahre später kam Rreth im Master noch einmal auf den Tisch, diesmal größer ' +
          'gedacht: nicht mehr ein Video in einem Raum, sondern eine Installation, die den ' +
          'Besucher zwanzig Minuten lang durch fünf Phasen führt. "Take It All Off — Break ' +
          'the Silence" in Schwarz und Rot, die Aufforderung und ihr Preis nebeneinander — ' +
          'die erste Präsentation für genau die Installation, die im Pitch steht. Mit ihr ' +
          'sind Cara Brüggendieck und Laura Zahn mit in das Projekt eingestiegen.',
        files: ['wheel-of-shame'],
        layout: 'track',
      },
      {
        title: 'Symbolik der Akte',
        text:
          'Für jeden Akt wurde ein eigenes Symbol gewählt. Jedes steht für eine Form von ' +
          'Kreislauf, aus dem man alleine schwer herauskommt. Beim Aussuchen hat Cara mir ' +
          'geholfen, entschieden haben wir gemeinsam.',
        files: ['symbolik'],
        layout: 'grid',
      },
      {
        title: 'Raumkonzept',
        text:
          'Die Handskizzen legen fest, wie der Besucher durch den Raum geführt wird: Video- ' +
          'und Audioinstallation, Warteraum, Telefonzelle. Die Architektur ist Teil der ' +
          'Dramaturgie, nicht nur ihr Behälter. In den Telefonzellen soll erzählt werden, ' +
          'was sonst niemand hört — anonym, aufgezeichnet, als Archiv für die, die nach ' +
          'einem kommen.',
        files: ['in-halt'],
        layout: 'track',
      },
      {
        title: 'Der Projektpitch',
        text:
          'Der Pitch beschreibt alle fünf Phasen einzeln: Farbe, Ton, Gefühl, Zeitdauer und ' +
          'Referenz. Aufgebaut habe ich ihn als Bauplan für die Ausstellung, die noch ' +
          'kommen soll — 2028 soll genau danach gebaut werden.',
        files: ['pitch-version-1'],
        layout: 'track',
      },
      {
        title: 'Neu gedreht — Kamera, Licht, Ton',
        text:
          'Für die neue Fassung wurde noch einmal gedreht, und zwar im Team: Gefilmt hat ' +
          'Joscha Reuther, das Licht hat Jan Borghart gesetzt. Die Soundkulisse stammt von ' +
          'Denzel, der sie eigens gebaut und Schnitt für Schnitt an das Video angepasst ' +
          'hat. Gearbeitet haben wir dabei eng zusammen — Bild, Licht und Ton sind nicht ' +
          'nacheinander entstanden, sondern miteinander.',
        textOnly: true,
      },
      {
        title: 'Die Videoinstallation im Rössle',
        text:
          'Als Zwischenschritt war eine begehbare Videoinstallation geplant: Leinwände von ' +
          'fünf Metern Breite, die den Besucher vollständig umstellen, die Beamer um eine ' +
          'Säule herum aufgestellt, Lautsprecher in allen Ecken. Erst fünf Minuten Stille, dann sieben ' +
          'Minuten Video, dann noch eine Minute Stille. Die Wände sollten das ' +
          'Unausweichliche spürbar machen, das Hinausgehen zwischen ihnen hindurch das ' +
          'Ausbrechen aus dem Kreislauf. Den Raum im Eventkeller des Rössle in Furtwangen ' +
          'hat Laura skizziert, 5,60 mal 8,90 Meter. Aus Zeitgründen ist daraus nichts ' +
          'geworden — gezeigt wurden die Videos am Ende an der Hochschule, am Tag der ' +
          'Medien.',
        files: ['raumskizze-laura'],
        layout: 'track',
      },

      {
        title: 'Die neuen Videos',
        text:
          'Was aus den Dreharbeiten von 2025 geworden ist — gezeigt am Tag der Medien an ' +
          'der Hochschule, bis die Installation den Raum bekommt, für den sie gedacht ist.',
        embed: 'https://youtu.be/Krdg6cM746g',
      },

      // ── Ausblick ──
      {
        title: '2028 — Halle 93, App und Kampagne',
        text:
          'Aufgegeben ist die Installation nicht: 2028 soll sie wieder aufgenommen und ' +
          'genau nach dem Pitch in der Halle 93 in Stuttgart ausgestellt werden. Dazu ' +
          'gehören ein überarbeitetes Magazin und eine App, die den Besucher weiter trägt ' +
          'als bis zum Ausgang — die Installation dauert zwanzig Minuten, die Muster, um ' +
          'die es geht, ein Leben lang. Die Instagram-Kampagne läuft im Vorfeld und bewirbt ' +
          'beides, App und Rauminstallation: kurze Videos, selbst aufgenommen und mit KI ' +
          'weiterbearbeitet, dazu Captions in der ersten Person — "We eat shame for ' +
          'breakfast", "I have no mouth but I need to scream". Jeder Post trägt den Namen ' +
          'eines Musters statt eines Titels: Suppressing, Self Sabotage, Self Destruction.',
        files: ['rreth-kampagne'],
        layout: 'track',
      },
      //   Hier möchte ich bitte auch nochmal ein Karussell einfügen als PDF. Bitte erinnere mich daran Claude
    ],
  },
  {
    slug: 'in-lakech',
    title: 'In Lak’ech',
    subtitle: 'Ein Begegnungsautomat fuer den oeffentlichen Raum',
    cover: 'begegnung-02',
    description:
      'Entstanden in einem fuenfwoechigen Workshop mit der Aufgabe, eine Begegnung im ' +
      'oeffentlichen Raum zu schaffen. Herausgekommen ist ein Automat fuer zwei Fremde: ' +
      'ein Videospiel im Nokia-3310-Look, programmiert in Python auf einem Raspberry Pi, ' +
      'bedient ueber zwei Arcade-Knoepfe. Zwei Figuren streiten sich im Pokemon-Stil ' +
      'durch ein Duell — bis am Ende die Frage steht: to die or to live together? Nur ' +
      'wenn beide gleichzeitig druecken, loest die Kamera aus und der Kassenbon-Drucker ' +
      'gibt ein Foto der Begegnung aus, durchnummeriert.', // TODO
    year: '2026',
    role: 'Konzept, Gestaltung, Programmierung',
    tools: ['Python', 'Pygame', 'Raspberry Pi', 'Photoshop'],
    tags: ['Installation', 'Game', 'Partizipation', 'Raspberry Pi', 'Public Space'],
    prototyp: { art: 'in-lakech', titel: 'Das Duell im Browser', label: 'Prototyp spielen' },
    pull: 'Ich werde an dir zu mir.',
    chapters: [
      {
        title: 'Visions',
        text:
          'Ausgangspunkt und Inspirationsquelle: Collagen aus Fundstuecken, Farbe und ' +
          'Handschrift. Aus dieser Bildwelt kam die Entscheidung, nicht mit Hochglanz zu ' +
          'arbeiten, sondern mit etwas Gebrauchtem und Lautem.', // TODO
        files: ['visions'],
        layout: 'grid',
      },
      {
        title: 'Arcade',
        text:
          'Auf Rasterpapier wurde das Spiel grob aufgezeichnet: Bildschirmaufbau, ' +
          'Dialogbox, wo die Figuren stehen, wo der Timing-Balken sitzt. Das Raster ' +
          'entsprach dabei schon dem spaeteren Pixelbild.', // TODO
        files: ['arcade'],
        layout: 'track',
      },
      {
        title: 'Taiyo und Tsuki',
        text:
          'Die beiden Figuren heissen Sonne und Mond. Jede sitzt auf einer Seite des ' +
          'Bildschirms und gehoert zu einem Arcade-Knopf, der nur leuchtet, wenn sie ' +
          'spricht. Die Angriffs-Animationen hat Julien Truebiger erstellt.', // TODO
        files: ['hand', 'animation'],
        layout: 'grid',
      },
      {
        title: 'In Lak’ech — Begegnungen',
        text:
          'Das Ergebnis: jede gelungene Begegnung wird fotografiert und auf einem ' +
          'Kassenbon ausgedruckt, mit fortlaufender Nummer. Zwei Menschen, die sich ' +
          'vorher nicht kannten, halten danach denselben Zettel in der Hand.', // TODO
        files: ['begegnung'],
        layout: 'grid',
      },
    ],
  },
  {
    slug: 'nostalgia',
    title: 'Nostalgia is a Portal',
    subtitle: 'Interaktive Videoinstallation',
    cover: 'header',
    description:
      'Eine Videoinstallation ueber Nostalgie als Abwehrmechanismus: THESE: Wir verdraengen, was gerade passiert, und romantisieren es spaeter durch den Filter von Social Media, statt es zu verarbeiten. Zwei alte Roehrenmonitore stehen an den Ausgaengen des Aufzugs — gesteuert wird nur mit Koerperhaltung und Handbewegung, ohne Controller.', // TODO
    year: '2026',
    role: 'Konzept, Gestaltung, Interaktion',
    client: 'Staedtische Galerie Villingen-Schwenningen, Maerz–April 2026',
    tools: ['TouchDesigner', 'Photoshop', 'CRT-Monitore'],
    tags: ['Installation', 'Interaktionsdesign', 'TouchDesigner', 'Liminalitaet'],
    pull: 'Was bleibt, wenn der Schein trügt?',

    chapters: [
      {
        title: 'Brainstorm',
        text: 'Der Ausgangspunkt war der Begriff Liminalitaet — der Schwellenzustand zwischen zwei Zustaenden. Aus Brainstorming und Materialarchiv haben wir drei Straenge verfolgt: Sprache, nationale Identitaet und Spiritualitaet.', // TODO
        files: ['brainstorm', 'archiv'],
        layout: 'wide',
      },
      {
        title: 'Raumkonzept',
        text: 'Die Skizzen klaeren die entscheidende Frage: Wo stehen die Monitore, damit die Besucher sie beim Verlassen des Aufzugs zwangslaeufig sehen? Der Aufzug ist selbst schon eine Schwelle — das Konzept nutzt sie.', // TODO
        files: ['skizze'],
        layout: 'grid',
      },
      {
        title: 'Technik in TouchDesigner',
        text: 'Zwei TouchDesigner-Projekte lesen die Koerperhaltung aus und streamen live auf die Roehrenmonitore. Die Knotennetze zeigen, wie aus Kamerabild, Schwellenwerten und Videospuren die Reaktion wird.', // TODO
        files: ['td-screenshot'],
        layout: 'wide',
      },
      {
        title: 'Bildwelt',
        text: 'Die Aesthetik kommt vom Signalfehler: RGB-Versatz, Bildrauschen, verrissene Zeilen. Was auf einem modernen Bildschirm wie ein Defekt aussieht, ist auf der Roehre das natuerliche Verhalten.', // TODO
        // Bewusst ohne Bild — der Absatz steht fuer sich.
        textOnly: true,
      },
      {
        title: 'Plakate',
        text: 'Das Titelplakat greift den Chromlook der Nullerjahre auf, die beiden Steuerungsplakate erklaeren wortlos, wie man mit dem Koerper spielt — Hand vor die Kamera, Position im Raum.', // TODO
        files: ['final'],
        layout: 'grid',
      },
      {
        title: 'Erster provisorischer Aufbau',
        text: 'Die Fernseher standen auf einem verhuellten Tisch, daneben die Plakate.', // TODO
        files: ['liminal'],
        layout: 'grid',
      },
      {
        title: 'Snippets',
        text: 'Textfragmente erscheinen und zerfallen wieder. "where does one begin and the other end?", "Light, Future, Past".', // TODO
        files: ['touchdesigner', 'liminalitaet2'],
        layout: 'grid',
      },
    ],
  },
  {
    slug: 'shepard-tone',
    title: 'Multi Shepard',
    subtitle: 'Audiovisuelle Rauminstallation',
    cover: 'shephard-tone-doku-s01',
    description:
      'Der Shepard-Ton ist eine Hoertaeuschung: eine Tonhoehe, die endlos zu steigen oder ' +
      'zu fallen scheint, ohne je irgendwo anzukommen. Multi Shepard bringt ihn in einen ' +
      'Vorlesungssaal und stellt ihm eine projizierte optische Illusion zur Seite. Wer den ' +
      'Raum betritt, laeuft mitten hindurch — der Ton laeuft bereits, und der Weg nach ' +
      'unten ist das Erlebnis.', // TODO
    year: 'Januar 2026',
    role: 'Konzept, Raumgestaltung, Sound',
    client:
      'Mit Cara Brueggendieck und Kathrin Krell. Betreut von Prof. Norbert Schnell und Peter Kirschenbauer',
    tools: ['Web Audio API', 'JavaScript', 'Polycam', 'InDesign'],
    tags: ['Klanginstallation', 'Raum', 'Wahrnehmung', 'Interaktion'],
    pull: 'Kann ich meinen Sinnen ueberhaupt trauen?',
    chapters: [
      {
        title: 'Konzeptfindung',
        text:
          'Zuerst die Frage, welche Emotion der Ton tragen soll. Nach einer Diskussion ueber ' +
          'Horror fiel die Entscheidung auf Action. Die urspruengliche Idee sah eine ' +
          'Installation mit Positionstracking vor — auf Rat von Prof. Norbert Schnell haben ' +
          'wir radikal vereinfacht und uns auf drei Parameter beschraenkt: Geschwindigkeit, ' +
          'Richtung und Lautstaerke.', // TODO
        files: ['shephard-tone-doku-s01', 'shephard-tone-doku-s02'],
        layout: 'wide',
      },
      {
        title: 'Erlebnisgestaltung',
        text:
          'Das Erlebnis sollte sich anfuehlen wie der Moment kurz vor dem Hoehepunkt einer ' +
          'Filmszene: dauernde Eskalation, die nie aufgeloest wird. Deshalb laeuft der Ton ' +
          'schon, bevor jemand den Raum betritt. Stehenbleiben und zuschauen geht nicht — ' +
          'der Weg durch den Raum ist die Arbeit.', // TODO
        files: ['shephard-tone-doku-s03'],
        layout: 'wide',
      },
      {
        title: 'Referenzen',
        text:
          'Der Shepard-Ton ist laengst kein Kuriosum mehr: Hans Zimmer baut den gesamten ' +
          'Dunkirk-Score darauf auf, der Batpod in The Dark Knight beschleunigt scheinbar ' +
          'endlos, und die Endlostreppe in Super Mario 64 nutzt denselben Trick. Dazu kamen ' +
          'optische Illusionen als visuelles Gegenstueck.', // TODO
        files: ['shephard-tone-doku-s04', 'shephard-tone-doku-s05'],
        layout: 'wide',
      },
      {
        title: 'Technischer Aufbau',
        text:
          'Elf Oszillatoren decken das Frequenzspektrum von 20 Hz bis 20.480 Hz in Oktaven ab, ' +
          'eine Amplituden-Huellkurve macht die Uebergaenge an den Raendern unhoerbar. Der ' +
          'Grundriss zeigt, warum der Vorlesungssaal passt: Nur ein Weg fuehrt links durch ' +
          'den Raum, alles andere versperren die Sitzreihen — jeder Besucher geht dieselbe ' +
          'Strecke.', // TODO
        files: ['shephard-tone-doku-s06'],
        layout: 'wide',
      },
      {
        title: 'User Testing',
        text:
          'Weil alle denselben Weg nehmen, lassen sich die Durchgaenge vergleichen. Geplant ' +
          'sind Fragebogen und Kurzinterviews, dazu die Beobachtung von Koerpersprache und ' +
          'Gehgeschwindigkeit: Ab wann setzt die Illusion ein? Bricht sie, wenn man ' +
          'stehenbleibt? Fuehlt sich der Abstieg laenger an, als er ist?', // TODO
        files: ['shephard-tone-doku-s07'],
        layout: 'wide',
      },
    ],
  },
  {
    slug: 'interaktionsdesign',
    title: 'Inner Flow',
    subtitle: 'Multimodale Visualisierung emotionaler Zustaende',
    cover: 'header',
    description:
      'Eine Studienarbeit im Interaktionsdesign: Wie lassen sich emotionale Zustaende so darstellen, dass sie therapeutische Prozesse unterstuetzen? Entwickelt im Human-Centered-Design-Prozess mit Interviews, Personas und Prototypen.', // TODO
    year: '2026',
    role: 'Konzept, Recherche, Prototyp',
    client: 'Hochschule Furtwangen, Prof. Dr.-Ing. Thomas Schlegel',
    tools: ['Figma', 'InDesign'],
    tags: ['Interaktionsdesign', 'UX-Research', 'Prototyp', 'Datenvisualisierung'],
    chapters: [
      {
        title: 'Projektbericht',
        text: 'Der Bericht folgt dem Human-Centered-Design-Prozess: Problemstellung, Interviews mit Therapeutinnen und Betroffenen, Personas, Use Cases, Wireframes und schliesslich das Dashboard.', // TODO
        files: ['interaktionsdesign-projektbericht'],
        layout: 'track',
      },
    ],
  },
  {
    slug: 'zodizine',
    title: 'ZodiZine',
    subtitle: 'Banales Ding — ein Zine-Automat',
    cover: 'header',
    description:
      'Eine Station, an der Besucher ihr Geburtsdatum auf einem Touchscreen eingeben und ' +
      'daraufhin ein persoenliches Zine gedruckt bekommen — berechnet aus chinesischem, ' +
      'indischem und keltischem Tierkreis. Ein simples Druckerzeugnis, das durch ' +
      'Personalisierung vom fluechtigen Wegwerfprodukt zum greifbaren Erlebnis wird. ' +
      'Alles laeuft offline auf einem Raspberry Pi.', // TODO
    year: '2026',
    role: 'Konzept, technische Umsetzung',
    client:
      'Mit Cara Brueggendieck. Modul "Inszenierung Interaktiver Medien", Master Design Interaktiver Medien',
    tools: ['React', 'Flask', 'Raspberry Pi', 'ReportLab', 'InDesign'],
    tags: ['Interaktion', 'Zine', 'Prototyp', 'Generative Gestaltung'],
    prototyp: { art: 'zodizine', titel: 'Der Automat im Browser', label: 'Automat ausprobieren' },
    pull: 'Banalitaet als Input, Interaktion als Verstaerker, Emotion als Ziel.',
    chapters: [
      {
        title: 'Ursprung',
        text:
          'Die Idee entsprang einem banalen Gespraech: Cara plante, ihrer Familie zu ' +
          'Weihnachten ein personalisiertes Zine zu schenken. Darin steckte das passende ' +
          'Alltagsobjekt fuer das Modul. Im selben Gespraech stand fest, dass der Prototyp ' +
          'im oeffentlichen Raum inszeniert werden sollte — erst in einer Telefonzelle, die ' +
          'sich nicht anmieten liess, dann in einer halboffenen Bushaltestelle, die an ' +
          'Wetter und Zeit scheiterte.', // TODO
        files: ['zineprojektbericht'],
        textOnly: true,
      },
      {
        title: 'Das Interface',
        text:
          'Die ganze Interaktion besteht aus einem Schritt: Tag, Monat, Jahr. Das Interface ' +
          'durchlief zwei Fassungen — zuerst eng an der Aesthetik des Nokia 3310, dann ' +
          'zugunsten einer stimmigeren Gestaltung ueberarbeitet.', // TODO
        files: ['zodizine-01'],
        layout: 'wide',
      },
      {
        title: 'Technischer Aufbau',
        text:
          'Die Arbeit lief parallel: Cara entwickelte die visuelle Identitaet und ein ' +
          'Datenset mit den Charakteristika der Sternzeichen aus drei astrologischen ' +
          'Systemen. Ich habe die Infrastruktur gebaut — Raspberry Pi im Kiosk-Modus, die ' +
          'Oberflaeche und die Logik, die Geburtsdaten in personalisierte Layouts uebersetzt ' +
          'und daraus ein PDF erzeugt.', // TODO
        files: ['zodizine-02', 'zodizine-03'],
        layout: 'track',
      },
      {
        title: 'ZodiZine in Anwendung',
        text:
          'Der Automat im Betrieb am Tag der Medien. Für die räumliche Inszenierung haben ' +
          'wir uns an Wahrsagersalons bedient: Tücher verdeckten die Umgebung und erzeugten ' +
          'eine mystische Atmosphäre. So wird der nüchterne Automat zum rituellen Ort.',
        embed: 'https://youtu.be/Ivilxs3Gcxg',
        files: ['dji'],
        layout: 'wide',
      },
      {
        title: 'Das Zine als Artefakt',
        text:
          'Der Automat inszeniert den Uebergang vom Digitalen zum Analogen als koerperliches ' +
          'Ritual: die Beruehrung des Touchscreens, das gespannte Warten, waehrend Drucker ' +
          'und Mechanik arbeiten, schliesslich die Uebergabe des noch warmen Papiers. Die ' +
          'Faltung macht den Nutzer zum Mitproduzenten. Aus flachen Boegen entsteht ein ' +
          'dreidimensionales Objekt. Jedes Zine traegt individuelle Spuren und existiert als ' +
          'Unikat in einer Serie von Unikaten.', // TODO
        textOnly: true,
      },
    ],
  },
];
