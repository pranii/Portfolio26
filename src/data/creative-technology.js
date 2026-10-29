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
    'Logic Pro',
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
      'Rreth — albanisch für Kreis — läuft seit 2020: angefangen mit einem kleinen Magazin, ' +
      'daraus eine begehbare Videoinstallation über die komplexe posttraumatische ' +
      'Belastungsstörung, und 2028 eine Ausstellung, die beides zusammenbringt.',
    year: '2020–2025',
    role: 'Konzeption, Recherche, Regie, Videoschnitt, Sounddesign, Rauminstallation',
    kontext:
      'Bachelorthesis 2023, Online Medien — fortgeführt 2025 im Master Design Interaktiver ' +
      'Medien, Hochschule Furtwangen',
    client:
      'Cara Brüggendieck und Laura Zahn. Betreuung: Prof. Thomas Krach, Prof. Matthias Reusch',
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
      {
        title: 'Meine These',
        text:
          'Einen Raum schaffen, in dem Schweigen nicht mehr schützt, sondern offenlegt. ' +
          '„Take It All Off // Break the Silence" verwandelt Verletzlichkeit in kollektive ' +
          'Stärke — Verbindung entsteht erst, wenn wir aufhören, unsere Emotionen zu ' +
          'verstecken. Den Anlass gibt eine Diagnose, die kaum jemand kennt: Die komplexe ' +
          'posttraumatische Belastungsstörung steht erst seit der ICD-11 als eigenständige ' +
          'Erkrankung da. Wer betroffen ist, hat selten ein Wort dafür. Die Frage war nie, ' +
          'wie man darüber aufklärt, sondern wie man es spürbar macht.',
        files: [],
        textOnly: true,
      },
      {
        title: 'Das Magazin',
        text:
          'Das Heft führt durch die Modelle hinter der Arbeit: Freuds Instanzenmodell, die ' +
          'vier Reaktionstypen — Fight, Flight, Freeze, Fawn —, die Polyvagal-Theorie und ' +
          'den Trauma-Response-Zyklus. Dazu Shadowwork zum Mitmachen und am Ende ' +
          'Anlaufstellen. Der Satz, auf den alles hinausläuft: Jede dieser Strategien hat ' +
          'einmal funktioniert. Sie war nie ein Charakterfehler.',
        files: [],
        prototypHier: true,
      },
      {
        title: 'Vier Akte',
        text:
          'Die Bachelorarbeit von 2021 bis 2023. Vier Akte mit albanischen Namen, verteilt ' +
          'auf vier Projektionsebenen: „Themeli" (Grundstein) zeigt die Reaktionsmuster aus ' +
          'der Kindheit, „Shprehje Emocionale" übersetzt in Tanz, was ein Trigger auslöst, ' +
          '„Metamorfoza" ist der Wendepunkt, „Çlirim" die Katharsis, in der zum ersten Mal ' +
          'Farbe ins Bild kommt. Die ersten drei Akte sind streng schwarzweiß. Getanzt von ' +
          'Carina Borgards, gebaut aus Rotoskopie, EbSynth und einem Soundtrack aus 42 ' +
          'Spuren.',
        files: ['vision-board'],
        layout: 'track',
        aufbau: 'rreth',
        embed: 'https://youtu.be/i9AlftZ5PIk',
      },
      {
        title: 'Ausgestellt',
        text:
          'Im Juli 2023 war die Arbeit einen Tag lang in der Städtischen Galerie ' +
          'Villingen-Schwenningen zu sehen.',
        files: [],
        textOnly: true,
      },
      {
        title: 'Projektpitch',
        text:
          '2025 im Master noch einmal angefasst, zu dritt mit Cara Brüggendieck und Laura ' +
          'Zahn. Daraus wurde ein anderer Entwurf: nicht mehr ein Video im Raum, sondern ein ' +
          'Weg durch fünf Phasen. Drei Minuten absolute Dunkelheit mit Theta-Wellen, dann ' +
          'fünfzehn Minuten auf drei Flächen — Shadow, Pain, Ignite, Break, Light. Danach ' +
          'eine einzige Minute Stille, in der man den eigenen Herzschlag hört; ohne diese ' +
          'Pause keine Katharsis. Dann 10.000 Lux, fast schmerzhaft hell, und Glaskabinen ' +
          'mit offenem Mikrofon: Wer will, erzählt anonym, wer nicht will, hört zu. Am Ende ' +
          'gibt es die Magazine mit auf den Weg. Vorgearbeitet wurde viel; die Umsetzung ' +
          'musste aus Zeitgründen warten.',
        files: ['pitch-version-1'],
        layout: 'track',
        aufbau: 'rreth-pitch',
      },
      {
        title: 'Erster Einblick',
        text:
          'Drehbuch, Regie und Schnitt: Pranvera Pelaj, Cara Brüggendieck, Laura Zahn. ' +
          'Kamera und Licht: Joscha Reuther, Jan Borghart.',
        files: [],
        embed: 'https://youtu.be/21GWCYnf_ww',
      },
      {
        title: 'Kampagne und Zukunftsausblick',
        text:
          'Die Instagram-Kampagne läuft im Vorfeld: kurze Videos, selbst aufgenommen und mit ' +
          'KI weiterbearbeitet, Captions in der ersten Person. Jeder Post trägt den Namen ' +
          'eines Musters statt eines Titels — Suppressing, Self Sabotage, Self Destruction. ' +
          '2028 soll die Installation in der Halle 93 in Stuttgart stehen.',
        files: ['rreth-kampagne'],
        layout: 'track',
      },
    ],
  },
  {
    slug: 'in-lakech',
    title: 'In Lak’ech',
    subtitle: 'Ein Begegnungsautomat für den öffentlichen Raum',
    cover: 'header',
    description:
      '„In Lak’ech" ist ein Gruß der Maya: Ich bin ein anderes Du. Ein Automat, der zwei ' +
      'Fremde zusammenbringt — ein Videospiel im Nokia-3310-Look auf einem Raspberry Pi, ' +
      'bedient über zwei Arcade-Knöpfe. Weiter geht es nur, wenn beide gleichzeitig drücken.',
    year: '2026',
    kontext: 'Masterprojekt Design Interaktiver Medien — geplant für Regensburg, Sommer 2027',
    role: 'Konzept, Gestaltung, Programmierung',
    tools: ['Python', 'Pygame', 'Raspberry Pi', 'Photoshop'],
    tags: ['Installation', 'Game', 'Partizipation', 'Raspberry Pi', 'Public Space'],
    prototyp: { art: 'in-lakech', titel: 'Das Duell im Browser', label: 'Prototyp spielen' },
    // Der Automat in Benutzung — ohne Ton, der Ton kommt aus dem Prototypen.
    pull: 'Ich werde an dir zu mir.',
    chapters: [
      {
        title: 'Himmel und Hölle',
        text:
          'Wer gegenübersteht, ist nicht das Fremde, sondern dasselbe in anderer Gestalt. ' +
          'Diesen Satz wollte ich nicht als Spruch weitergeben, sondern als Erfahrung. Also ' +
          'ein Spiel, das zwei Fremde zueinander bringt, ohne dass einer anfangen muss. ' +
          'Daraus wurde die Idee, mit dem zu spielen, was zwischen Fremden immer zuerst da ' +
          'ist: Misstrauen.',
        files: [],
        textOnly: true,
      },
      {
        title: 'Technischer Aufbau',
        text:
          'Zwei Arcade-Knöpfe, ein Raspberry Pi, ein Display im Nokia-Format. Jeder Knopf ' +
          'gehört zu einer Figur und leuchtet nur, wenn sie spricht. Am Ende löst die Kamera ' +
          'aus und der Bon-Drucker gibt die Begegnung durchnummeriert aus.',
        files: [],
        aufbau: 'in-lakech',
      },
      {
        title: 'Automat in Aktion',
        text:
          'Die beiden Figuren heißen Taiyo und Tsuki, Sonne und Mond. Sie streiten sich im ' +
          'Pokémon-Stil durch ein Duell, bis die Frage steht: to die or to live together? Am ' +
          'Ende der Vertrauenstest — „Kann ich dir vertrauen?", „Das hat weh getan", „Ich hab ' +
          'dich trotzdem lieb." Weiter geht es nur, wenn beide gleichzeitig drücken.',
        files: ['in-benutzung'],
        layout: 'wide',
        embed: { url: 'https://youtube.com/shorts/W-grDBfjafc', stumm: true },
      },
      {
        title: 'Gedruckte Begegnungen',
        text:
          'Jede gelungene Begegnung wird fotografiert und auf einen Kassenbon gedruckt, ' +
          'durchnummeriert. Zwei Menschen, die sich vorher nicht kannten, halten danach ' +
          'denselben Zettel in der Hand.',
        files: ['begegnung'],
        layout: 'track',
      },
      {
        title: 'Regensburg, Sommer 2027',
        text:
          'Im Sommer 2027 soll der Automat in der Innenstadt von Regensburg stehen — dort, wo ' +
          'die Leute ohnehin aneinander vorbeigehen.',
        files: [],
        textOnly: true,
      },
    ],
  },
  {
    slug: 'nostalgia',
    title: 'Nostalgia is a Portal',
    subtitle: 'Interaktive Videoinstallation',
    cover: 'header',
    description:
      'Eine interaktive Videoinstallation über Identität, Erinnerung und den Widerstand ' +
      'gegen das Vergessen. Auf einem Röhrenmonitor liegen zwei Bildebenen übereinander. ' +
      'Gesteuert wird allein über die Position im Raum und über Handbewegungen.',
    year: '2026',
    role: 'Konzept, Gestaltung, Interaktion',
    kontext: 'Städtische Galerie Villingen-Schwenningen, März–April 2026',
    client: 'Julia Mamani und Cara Brüggendieck',
    tools: ['TouchDesigner', 'Photoshop', 'CRT-Monitore'],
    tags: ['Installation', 'Interaktionsdesign', 'TouchDesigner', 'Liminalität'],
    pull: 'Was bleibt, wenn der Schein trügt?',
    // Video statt Titelbild oben auf der Seite.
    // Aehnliche Erkennung wie in der Galerie, nur mit MediaPipe statt
    // TouchDesigner: ein Schirm und der Satz unter dem Nebel.
    prototyp: { art: 'nostalgia', titel: 'Selbst ins Bild treten' },
    chapters: [
      {
        title: 'Die Schwelle',
        text:
          'Den Namen habe ich zuerst bei Likana Cana gelesen. Das Thema kam aus einem ' +
          'Semester an der Hochschule über Liminalität, den Zustand zwischen zwei ' +
          'Zuständen. Auf dem Plakat steht die Frage, die die Arbeit stellt: Was bleibt, ' +
          'wenn der Schein trügt?',
        files: [],
        textOnly: true,
      },
      {
        title: 'Technischer Aufbau',
        text:
          'Eine Kamera erfasst die Position im Raum. TouchDesigner legt daraus zwei ' +
          'Bildebenen übereinander und gibt sie auf einen Röhrenmonitor aus. Je weiter man ' +
          'sich aus der Mitte bewegt, desto stärker verschiebt sich das Verhältnis zwischen ' +
          'Vorder- und Hintergrundebene. Die eigene Silhouette wird dabei zur Maske: In ihr ' +
          'erscheint eine andere Bildebene als im Rest des Bildes.',
        files: [],
        aufbau: 'nostalgia',
      },
      {
        title: 'Die Steuerung',
        text:
          'Zwei Tafeln erklären die Bedienung. Die eine zeigt die Position: Die ' +
          'Hintergrundebene besteht aus fließenden, geschwungenen Störeffekten und heißt ' +
          'dort die Traumwelt, schön, aber ungreifbar; die Vordergrundebene aus kantigen, ' +
          'harten Glitches und heißt die Kollision mit der Realität. Die andere Tafel ' +
          'zeigt die Hände: Die Kamera erfasst ausschließlich Handbewegungen, eine ' +
          'Bewegung nach links lässt Text Wort für Wort sichtbar werden, eine nach rechts ' +
          'zieht ihn zurück ins Dunkel. Oben im Browser läuft eine ähnliche Erkennung wie in ' +
          'der Galerie.',
        files: ['final'],
        layout: 'grid',
      },
      {
        title: 'Im Raum',
        text: 'Die Installation in der Städtischen Galerie.',
        files: [],
        embed: 'https://youtu.be/RwLj7i3BUq4',
      },
    ],
  },
  {
    slug: 'shepard-tone',
    title: 'Multi Shepard',
    subtitle: 'Audiovisuelle Rauminstallation',
    cover: 'header',
    description:
      'Der Shepard-Ton ist eine Hörtäuschung: eine Tonhöhe, die endlos zu steigen scheint, ' +
      'ohne je anzukommen. Multi Shepard bringt ihn in einen Vorlesungssaal. Der Ton läuft ' +
      'bereits, bevor jemand da ist — der Weg nach unten ist das Erlebnis.',
    year: 'Januar 2026',
    role: 'Konzept, Raumgestaltung, Sound',
    kontext: 'Hochschule Furtwangen, betreut von Prof. Norbert Schnell und Peter Kirschenbauer',
    client: 'Cara Brüggendieck und Kathrin Krell',
    tools: ['Web Audio API', 'JavaScript', 'Polycam', 'InDesign'],
    tags: ['Klanginstallation', 'Raum', 'Wahrnehmung', 'Interaktion'],
    pull: 'Kann ich meinen Sinnen überhaupt trauen?',
    // Der Hoersaal als Grundriss zum Durchlaufen — mit demselben Klang
    // und denselben drei Parametern wie die Installation.
    prototyp: { art: 'shepard', titel: 'Den Raum durchlaufen' },
    chapters: [
      {
        title: 'Technischer Aufbau',
        text:
          'Geplant war eine Installation mit Positionstracking. Auf Rat von Prof. Norbert ' +
          'Schnell haben wir radikal vereinfacht und uns auf drei Parameter beschränkt: ' +
          'Geschwindigkeit, Richtung, Lautstärke. Weniger ging nicht, mehr brauchte es nicht.',
        files: [],
        aufbau: 'shepard-tone',
      },
      {
        title: 'Elf Oszillatoren',
        text:
          'Elf Oszillatoren decken 20 Hz bis 20.480 Hz in Oktaven ab, eine Hüllkurve macht ' +
          'die Ränder unhörbar — deshalb hört niemand, wann ein Ton verschwindet und am ' +
          'anderen Ende wieder auftaucht. Dazu eine projizierte optische Illusion als ' +
          'visuelles Gegenstück.',
        files: [],
        textOnly: true,
      },
      {
        title: 'Der Weg nach unten',
        text:
          'Der Grundriss entscheidet: Nur ein Weg führt links durch den Vorlesungssaal, alles ' +
          'andere versperren die Sitzreihen. Jeder geht dieselbe Strecke. Stehenbleiben und ' +
          'zuschauen geht nicht — der Weg durch den Raum ist die Arbeit. Oben lässt sich der ' +
          'Saal durchlaufen, mit demselben Klang.',
        files: [],
        textOnly: true,
      },
    ],
  },
  {
    slug: 'kamamuta',
    title: 'Kama Muta',
    subtitle: 'Table for two — ein gedeckter Tisch für zwei Fremde',
    cover: 'header',
    description:
      'Zwei Fremde setzen sich an einen gedeckten Tisch mitten in der Stadt und lernen sich ' +
      'über ein inszeniertes Dinner kennen. Anfangs soll es bedrohlich wirken — dafür sorgen ' +
      'eine Soundkulisse, ein schweigender Kellner und ein Securityguard. Was dann passiert, ' +
      'machen die beiden selbst.',
    year: '2026',
    role: 'Konzept, Inszenierung, Gestaltung, Fotografie',
    kontext: 'Performance im öffentlichen Raum — Furtwangen und Stuttgart, Sommer 2026',
    tools: ['Raspberry Pi', 'InDesign', 'Photoshop', 'After Effects'],
    tags: ['Performance', 'Öffentlicher Raum', 'Partizipation', 'Editorial'],
    pull: 'Der Mensch wird am Du zum Ich.',
    chapters: [
      {
        title: 'Table for two',
        text:
          'Kama muta heißt „von Liebe bewegt" — das plötzliche Gefühl, wenn Nähe unerwartet ' +
          'spürbar wird. Mitten im öffentlichen Raum steht ein gedeckter Tisch, ohne ' +
          'Erklärung. Wer sich setzt, trifft auf eine fremde Person, die sich unabhängig ' +
          'davon gesetzt hat. Der Kellner serviert und schweigt, im Hintergrund steht ein ' +
          'Securityguard, dazu eine Soundkulisse. Die Karte sagt: „please feel welcome. I can ' +
          'not hear you. you are being watched. act accordingly." Der Abend beginnt ' +
          'bedrohlich und endet, wenn es gut läuft, mit zwei Menschen, die sich vorher nicht ' +
          'kannten.',
        files: [],
        textOnly: true,
      },
      {
        title: 'Der Ablauf',
        text:
          'Dreißig Minuten in sieben Schritten. Der Host greift nie ein — er deckt, wartet, ' +
          'serviert, tritt zurück. Serviert wird ein Gipsballon auf einem Silbertablett, ohne ' +
          'ein Wort dazu. Nach dem Prinzip einer Piñata müssen die beiden ihn gemeinsam ' +
          'aufbrechen; heraus fallen zwei Zines. Darin stehen die Fragen, die sie sich ' +
          'gegenseitig stellen.',
        files: [],
        aufbau: 'kamamuta-ablauf',
      },
      {
        title: 'Technischer Aufbau',
        text:
          'Am Ende stellt der Host eine Photobooth auf den Tisch — ein Raspberry Pi mit ' +
          'Kamera und Bondrucker. Heraus kommt das gemeinsame Foto, das auf Seite zwei des ' +
          'Zines geklebt wird, und die Rechnung: „A new connection. 2 Servings. Price: 30 ' +
          'minutes. Bill has been covered. Invite the next person to this experience."',
        files: [],
        aufbau: 'kamamuta',
      },
      {
        title: 'Mache ein Foto',
        text:
          'Angefangen hat es als Magazin über dasselbe Gefühl — mit Handlungsanweisungen ' +
          'statt Artikeln: „Mache ein Foto mit der dir gegenüber sitzenden Person. Tausche ' +
          'Adresse und Namen aus." Das Heft sollte etwas verlangen, nicht nur etwas zeigen. ' +
          'Parallel lief ein Notizarchiv mit Sätzen, die später Kapitelnamen wurden.',
        files: ['first-ideas', 'archive'],
        layout: 'track',
      },
      {
        title: 'Der Fragenkatalog',
        text:
          'Grundlage ist der bekannte Katalog, mit dem sich zwei Menschen in 36 Fragen ' +
          'näherkommen — auseinandergenommen und auf drei Gänge verteilt. Erst das Leichte, ' +
          'dann das, was man sonst nicht erzählt. Die Regeln stehen auf dem Zine selbst, ' +
          'damit kein Erklärer daneben stehen muss.',
        files: ['fragenkatalog'],
        layout: 'track',
      },
      {
        title: 'Zwei Orte',
        text:
          'Dasselbe Setup an zwei verschiedenen Orten, um zu sehen, was der Ort ändert: ' +
          'Furtwangen und der Pavillon am Schlossplatz in Stuttgart, Sommer 2026. Zum ' +
          'Vergleich lag Marina Abramović’ „The Artist Is Present" auf dem Tisch — nur ' +
          'Präsenz, offen, Scheitern erlaubt. Hier ist es das Gegenteil: dreißig gerahmte ' +
          'Minuten, drei Gänge, Wärme und ein Geschenk. Nicht „ich halte mich im Anderen ' +
          'aus", sondern „ich werde am Du zum Ich".',
        files: [],
        textOnly: true,
      },
    ],
  },
  {
    slug: 'interaktionsdesign',
    title: 'Inner Flow',
    subtitle: 'Multimodale Visualisierung emotionaler Zustände',
    cover: 'header',
    description:
      'Eine Anwendung, die während einer Therapiesitzung Mimik, Stimme und Puls mitliest und ' +
      'daraus einen Verlauf zeichnet — als Gesprächsgrundlage für die Nachbesprechung, nicht ' +
      'als Diagnose. Alles läuft lokal, Rohbilder werden nie gespeichert.',
    year: '2026',
    role: 'Experteninterviews, Video- und Audioanalyse, Prototyp, Evaluation',
    kontext:
      'Modul Interaktionsdesign bei Prof. Dr.-Ing. Thomas Schlegel, Hochschule Furtwangen',
    client: 'Rosa Stark, Johannes Merschroth und Marla Speth',
    tools: [
      'Python',
      'DeepFace',
      'OpenCV',
      'librosa',
      'scikit-learn',
      'FastAPI',
      'SQLite',
      'Streamlit',
      'Figma',
      'InDesign',
    ],
    tags: ['Interaktionsdesign', 'UX-Research', 'Prototyp', 'Datenvisualisierung'],
    pull: 'Die Einschätzung der Klient:innen steht über der KI.',
    prototyp: { art: 'innerflow', titel: 'Selbst messen lassen' },
    chapters: [
      {
        title: 'Beschreiben reicht nicht',
        text:
          'Therapeut:innen stützen sich auf das, was sie sehen und hören. Nur: Viele ' +
          'Klient:innen erinnern Erlebtes ungenau, finden keine Worte für ihr Befinden oder ' +
          'passen ihr Verhalten an — aus Scham, aus Angst vor Bewertung. Daraus wurde unsere ' +
          'Frage: Wie kann eine multimodale Visualisierung emotionaler Zustände ' +
          'Therapeut:innen helfen, Reaktionen besser zu erfassen und einzuordnen?',
        files: [],
        textOnly: true,
      },
      {
        title: 'Drei Psycholog:innen gefragt',
        text:
          'Ich habe drei angehende Psycholog:innen interviewt. Ihre Antworten haben das ' +
          'Projekt gedreht. Heute messen sie mit Skalierungsfragen und Fragebögen, achten ' +
          'nebenbei auf gebrochene Stimme, monotonen Tonfall, vermiedenen Blickkontakt. Von ' +
          'konkreten Emotionslabels hielten sie wenig — Emotionen ließen sich ohnehin kaum ' +
          'trennen. Was zählt, sind Tendenzen und Muster im Verlauf. Und ein Satz blieb ' +
          'hängen: Ein technisches Werkzeug darf den Vertrauensaufbau nicht stören. Daraus ' +
          'wurden die Leitplanken — lokale Verarbeitung, nachvollziehbare Logik, und die ' +
          'Selbstwahrnehmung der Klient:innen zählt mehr als jede Messung.',
        files: [],
        textOnly: true,
      },
      {
        title: 'Technischer Aufbau',
        text:
          'Drei Eingänge, alle lokal: Die Kamera liest über OpenCV und DeepFace die Mimik, ' +
          'das Mikrofon über librosa die Stimme — Lautstärke, Tonhöhe, Sprechtempo, Pausen —, ' +
          'ein Wearable den Puls. Jede Messung landet auf den drei Achsen des PAD-Modells ' +
          '(Valenz, Arousal, Dominanz) und mit Zeitstempel in einer SQLite-Datenbank, aus der ' +
          'das Dashboard sie liest. Keine Cloud, keine Rohbilder — nur abstrahierte Werte. ' +
          'Den Puls mussten wir simulieren: An der Hochschule war kein Wearable aufzutreiben.',
        files: [],
        aufbau: 'interaktionsdesign',
      },
      {
        title: 'Zwei Fenster',
        text:
          'Hier laufen die beiden Messungen im Browser, nach demselben Prinzip wie im ' +
          'Prototyp: oben der Eingang, darunter eine Liste, die alle 0,4 Sekunden notiert und ' +
          'nur die letzten beiden Einträge zeigt. Beim Ton gibt es eine Stilleschwelle. Die ' +
          'brauchte es auch im Projekt: Das Modell war auf einem Datensatz ohne Pausen ' +
          'trainiert und hat jede Stille als „happy" gelesen.',
        files: [],
        prototypHier: true,
      },
      {
        title: 'Was der Test gezeigt hat',
        text:
          'Zwei Probanden haben eine Therapiesitzung gespielt — einer als Klient mit Kamera ' +
          'und Mikrofon, einer als Therapeut. Aus den Messwerten wurde das Dashboard gebaut ' +
          'und einer angehenden Psychologin vorgelegt. Ihre Kritik traf den Kern: Grün, Gelb ' +
          'und Rot liest man als Ampel — und damit werden Gefühle ungewollt richtig oder ' +
          'falsch. Und weil nirgends eine Konfidenz stand, wirkten die Werte eindeutiger, als ' +
          'sie sind. Beides ist genau das, was ein solches Werkzeug nicht tun darf.',
        files: [],
        textOnly: true,
      },
      {
        title: 'Was bliebe zu tun',
        text:
          'Die Farbcodierung müsste raus aus der Bewertung, die Unsicherheit sichtbar ' +
          'werden — Konfidenzbereiche je Modalität, erklärende Texte, Notizen mit ' +
          'Zeitstempel für den Kontext. Technisch fehlen definierte ' +
          'Synchronisationsfenster, die Audioanalyse hängt drei bis fünf Sekunden hinterher, ' +
          'und der simulierte Puls müsste einem echten Sensor weichen. Was bleibt, ist die ' +
          'Haltung: Das System liefert Gesprächsanlässe, keine Diagnosen.',
        files: [],
        textOnly: true,
      },
    ],
  },
  {
    slug: 'zodizine',
    title: 'ZodiZine',
    subtitle: 'Ein Automat, der Zines druckt',
    cover: 'header',
    description:
      'Eine Station, an der Besucher ihr Geburtsdatum eingeben und ein persönliches Zine ' +
      'gedruckt bekommen — berechnet aus chinesischem, indischem und keltischem Tierkreis. ' +
      'Alles läuft offline auf einem Raspberry Pi.',
    year: '2026',
    role: 'Konzept, technische Umsetzung',
    kontext: 'Modul „Inszenierung Interaktiver Medien“, Master Design Interaktiver Medien',
    client: 'Cara Brüggendieck',
    tools: ['React', 'Flask', 'Raspberry Pi', 'ReportLab', 'InDesign'],
    tags: ['Interaktion', 'Zine', 'Prototyp', 'Generative Gestaltung'],
    prototyp: { art: 'zodizine', titel: 'Der Automat im Browser', label: 'Automat ausprobieren' },
    pull: 'Banalität als Input, Interaktion als Verstärker, Emotion als Ziel.',
    chapters: [
      {
        title: 'Technischer Aufbau',
        text:
          'Ein Touchscreen nimmt Tag, Monat und Jahr. Ein Raspberry Pi im Kiosk-Modus ' +
          'rechnet daraus die Zeichen aus drei Tierkreisen, setzt sie mit ReportLab zu einem ' +
          'A4-Bogen und schickt ihn an den Drucker. Acht Seiten auf einem Blatt, gefaltet ' +
          'wird von Hand. Alles läuft offline.',
        files: [],
        aufbau: 'zodizine',
      },
      {
        title: 'Das warme Papier',
        text:
          'Für die Inszenierung haben wir uns an Wahrsagersalons bedient: Tücher verdecken ' +
          'die Umgebung, der nüchterne Automat wird zum rituellen Ort. Die Berührung des ' +
          'Touchscreens, das Warten, während die Mechanik arbeitet, die Übergabe des noch ' +
          'warmen Papiers. Die Faltung macht den Nutzer zum Mitproduzenten — jedes Zine ist ' +
          'ein Unikat in einer Serie von Unikaten. Oben auf dieser Seite lässt sich der ' +
          'Automat bedienen.',
        files: [],
        embed: 'https://youtu.be/Ivilxs3Gcxg',
      },
    ],
  },
];
