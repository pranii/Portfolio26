/**
 * Die Oberflaeche in drei Sprachen.
 *
 * Hier steht alles, was nicht zu einem einzelnen Projekt gehoert:
 * Menuepunkte, Beschriftungen, Knoepfe, Hinweise. Die Projekttexte selbst
 * liegen in en.js und sq.js, nach Projekt sortiert.
 *
 * `{name}` in einem Text wird beim Einsetzen ersetzt, zum Beispiel
 * t('schritt.von', { n: 2, m: 7 }).
 *
 * Fehlt ein Schluessel in einer Sprache, nimmt die Seite den deutschen
 * Text — es bleibt also nie eine Luecke stehen.
 */

export const SPRACHEN = [
  { code: 'de', kuerzel: 'DE', name: 'Deutsch' },
  { code: 'en', kuerzel: 'EN', name: 'English' },
  { code: 'sq', kuerzel: 'SQ', name: 'Shqip' },
];

export const ui = {
  de: {
    'ueber.titel': 'Über mich',
    'ueber.kontakte': 'Kontakte',
    'ueber.gespeichert': 'Gespeichert',
    'ueber.feld.ort': 'Ort',
    'ueber.feld.mail': 'E-Mail',
    'ueber.feld.instagram': 'Instagram',
    'ueber.feld.abschluss': 'Abschluss',
    'ueber.feld.sprachen': 'Sprachen',
    'ueber.feld.gruppe': 'Gruppe',
    'ueber.feld.kernkompetenz': 'Kernkompetenz',

    'ton.an': 'Ton ausschalten',
    'ton.aus': 'Ton einschalten',
    'sprache.wechseln': 'Sprache wechseln',

    'nav.bereiche': 'Bereiche',
    'nav.pfad': 'Pfad',
    'nav.start': 'Start',
    'nav.bereich': 'Bereich',
    'nav.projekt': 'Projekt',
    'nav.weitere': 'Weitere Projekte',
    'nav.weiter': 'Weiter',

    'kat.creative-technology': 'Creative Technology',
    'kat.film': 'Film',
    'kat.game': 'Game',
    'kat.kommunikationsdesign': 'Kommunikationsdesign',
    'kat.spiel': 'Spiel',

    'abschnitt.projekte': 'Projekte',
    'abschnitt.werkzeuge': 'Werkzeuge',
    'abschnitt.womiticharbeite': 'Womit ich arbeite',
    'abschnitt.vorgehen': 'Vorgehen',
    'abschnitt.sogeheichvor': 'So gehe ich vor',
    'abschnitt.werkzeuge': 'Werkzeuge',
    'abschnitt.software': 'Software',
    'abschnitt.softwarehinweis':
      'Die Zahl dahinter zeigt, in wie vielen Projekten dieses Bereichs das Programm im Einsatz war.',

    'karte.ansehen': 'Ansehen',
    'karte.oeffnen': 'Öffnen',
    'karte.spielen': 'Spielen',
    'karte.projekt': 'Projekt',
    'karte.projekte': 'Projekte',

    'fakten.jahr': 'Jahr',
    'fakten.auftrag': 'Auftraggeber',
    'fakten.rahmen': 'Rahmen',
    'fakten.rolle': 'Meine Rolle',
    'fakten.mitwirkende': 'Mitwirkende',
    'fakten.werkzeuge': 'Werkzeuge',

    'projekt.weiteres': 'Weiteres Material',
    'projekt.nichtgefunden': 'Projekt nicht gefunden',
    'projekt.zurstartseite': 'Zur Startseite',
    'projekt.kein-bereich':
      'Die Adresse enthält keinen gültigen Bereich. Erwartet wird zum Beispiel projekt.html?id=film/love.',
    'projekt.kein-projekt': 'Im Bereich {bereich} gibt es kein Projekt mit dem Kürzel „{slug}".',
    'projekt.vorheriges': '← Vorheriges Projekt',
    'projekt.naechstes': 'Nächstes Projekt →',

    'galerie.alle': 'Alle {n} Bilder zeigen',
    'galerie.vergroessern': 'Vergrössern',
    'galerie.bildvon': 'Bild {n} von {m} vergrössern',
    'galerie.grossansicht': 'Grossansicht',
    'galerie.schliessen': 'Schliessen ✕',
    'galerie.vorheriges': 'Vorheriges Bild',
    'galerie.naechstes': 'Nächstes Bild',

    'liste.projekte': 'Projekte, scrollbar',
    'liste.vorheriges': 'Vorheriges Projekt',
    'liste.naechstes': 'Nächstes Projekt',

    'menu.waehlen': 'Wählen',
    'menu.zurueck': 'Zurück',
    'menu.titel': 'Menü',
    'menu.oeffnen': 'Menü öffnen',
    'menu.schliessen': 'Menü schließen',
    'menu.voriger': 'Vorheriger Eintrag',
    'menu.naechster': 'Nächster Eintrag',
    'menu.anrufen': 'Anrufen',
    'menu.spiele': 'Spiele',
    'menu.kontakt': 'Kontakt',
    'menu.kontakttext': 'Interesse oder Fragen zu einer Kollaboration?',

    'spiel.titel': 'BOTLNICK',
    'spiel.starten': 'Spiel starten',
    'spiel.laeuftimbrowser': 'Läuft im Browser',
    'spiel.bereit': 'Bereit',
    'spiel.laedt': 'Lädt …',
    'spiel.laeuft': 'Läuft — zum Spielen ins Bild klicken',
    'spiel.esc': 'Esc gibt die Maus wieder frei',
    'spiel.keinbuild': 'Kein Build',
    'spiel.steuerung': 'Steuerung',
    'spiel.maushinweis': 'Das Spiel übernimmt den Mauszeiger, sobald du hineinklickst. Mit',
    'spiel.maushinweis2': 'bekommst du ihn zurück.',
    'spiel.zumprojekt': '← Zurück zum Projekt',

    'prototyp.inlakech':
      'Ein Automat für zwei Fremde: Erst wenn beide gleichzeitig drücken, geht es weiter — am ' +
      'besten zu zweit an einer Tastatur oder einem Handy. In der Installation lösen am Ende ' +
      'Kamera und Kassenbon-Drucker aus; im Browser bleibt es beim Blitz und einem Bon auf dem ' +
      'Bildschirm.',
    'prototyp.zodizine':
      'Aus einem Geburtsdatum werden drei Zeichen: eines aus dem chinesischen Mondkalender, ' +
      'eines aus der indischen Rashi, eines aus dem keltischen Baumkalender. Daraus entsteht ' +
      'das Heft — acht Seiten auf einem Blatt A4, aus dem es gefaltet wird. Dazu passt die ' +
      '{anleitung}. Die Zeichnungen auf den Seiten sind von Cara Brüggendieck.',
    'prototyp.zodizine.anleitung': 'Faltanleitung aus dem Projekt',
    'prototyp.shepard':
      'Der Hörsaal von oben: links der einzige Weg, vorne die Leinwand und die beiden Boxen. ' +
      'Der Ton klingt wie in der Installation — elf Oszillatoren von 20 Hz bis 20.480 Hz — und ' +
      'hängt an denselben drei Parametern: wie schnell du gehst, in welche Richtung und wie ' +
      'nah du den Boxen kommst.',

    'prototyp.nostalgia':
      'Dieselbe Erkennung wie in der Galerie, nur im Browser: Beide Ebenen liegen auf einem ' +
      'Bildschirm übereinander, und der Abstand entscheidet, wie grob das Bild wird. ' +
      'Im zweiten Fenster liegt ein Satz unter Nebel; die Hand wischt ihn frei, und der Nebel ' +
      'zieht wieder zu. Gezeichnet wird nur mit Farben, nie mit dem Kamerabild.',

    'portal.kameraan': 'Kamera einschalten',
    'portal.kameraaus': 'Kamera ausschalten',
    'portal.demo': 'Ohne Kamera ansehen',
    'portal.demoaus': 'Vorführung beenden',
    'portal.hinweis':
      'Das Bild bleibt auf deinem Gerät und wird nirgendwohin gesendet. Zu sehen sind nur ' +
      'Farbfelder, kein Gesicht.',
    'portal.aus': 'Aus',
    'portal.laedt': 'Lädt …',
    'portal.bereit': 'Bereit',
    'portal.niemand': 'Niemand im Bild',
    'portal.erkannt': 'Im Bild',
    'portal.wischen.status': '{n}% frei',
    'portal.fehler': 'Kamera nicht erreichbar',
    'portal.verweigert': 'Kamera nicht freigegeben',
    'portal.rechts.ebenen': 'MediaPipe · ein Schirm',
    'portal.rechts.wischen': 'Hand oder Finger',
    'portal.ebenen.alt': 'Ein Bildschirm, der gröber wird, je weiter man weg steht',
    'portal.wischen.alt': 'Ein Satz unter Nebel, der sich wegwischen lässt',
    'portal.imbild': 'Im Bild',
    'portal.abstand': 'Abstand',
    'portal.aufloesung': 'Auflösung',
    'portal.snippet1': 'where does one begin and the other end?',
    'portal.snippet2': 'Light, Future, Past',
    'portal.snippet3': 'nostalgia is a portal',

    'prototyp.innerflow':
      'Dieselben beiden Messungen wie im Prototyp, hier im Browser: Die Kamera liest die ' +
      'Mimik, das Mikrofon Lautstärke, Tonhöhe und Nulldurchgangsrate. V, A und D sind die ' +
      'Achsen des PAD-Modells — Valenz, Arousal, Dominanz. Das ist ein Anhaltspunkt, kein ' +
      'Befund: Was eine Messung bedeutet, weiß nur der Mensch davor.',
    'if.hinweis':
      'Kamera und Mikrofon gehen erst nach einem Klick an. Nichts wird gespeichert und ' +
      'nichts verlässt dein Gerät.',
    'if.rechts.mimik': 'MediaPipe · alle 0,4 s',
    'if.rechts.stimme': 'Web Audio · alle 0,4 s',
    'if.gesicht.alt': 'Die erkannten Gesichtspunkte als Raster',
    'if.pegel.alt': 'Die Wellenform des Mikrofons mit der Stilleschwelle',
    'if.kameraan': 'Kamera einschalten',
    'if.kameraaus': 'Kamera ausschalten',
    'if.mikroan': 'Mikrofon einschalten',
    'if.mikroaus': 'Mikrofon ausschalten',
    'if.misst': 'Misst',
    'if.keingesicht': 'kein Gesicht',
    'if.stille': 'Stille',
    'if.neutral': 'neutral',
    'if.froh': 'froh',
    'if.traurig': 'traurig',
    'if.aerger': 'Ärger',
    'if.ueberrascht': 'überrascht',

    'botlnick.rechts': 'Godot · {mb} MB',
    'botlnick.starten': 'Spiel starten',
    'botlnick.hinweis':
      'Lädt einmalig etwa {mb} MB. Läuft in Chrome, Edge und Firefox; Safari kann zicken. ' +
      'Am besten mit Tastatur und Maus.',
    'botlnick.keinbuild': 'Kein Build vorhanden',
    'botlnick.bereit': 'Bereit',
    'botlnick.laeuft': 'Läuft — zum Spielen ins Bild klicken',

    'gram.rechts': 'Angular · 2023',
    'gram.start': 'Drücken zum Starten.',
    'gram.nochmal': 'Noch einmal?',
    'gram.status.weiter': 'Weiter ▸',
    'gram.status.waehlen': 'Wählen',
    'gram.status.ende': 'Ende',

    'shepard.rechts': '11 Oszillatoren · 20–20.480 Hz',
    'shepard.plan': 'Grundriss des Hörsaals — mit Pfeiltasten oder Finger gehen',
    'shepard.an': 'Ton an',
    'shepard.aus': 'Ton aus',
    'shepard.laeuft': 'Der Ton läuft',
    'shepard.still': 'Still — Ton einschalten',
    'shepard.keinton': 'Dieser Browser kann keinen Ton erzeugen',
    'shepard.tempo': 'Geschwindigkeit',
    'shepard.richtung': 'Richtung',
    'shepard.laut': 'Lautstärke',

    'heft.seite': 'Seite',
    'heft.seitevon': 'Seite {n} von {m}',
    'heft.seitenpaar': 'Seite {a} und {b}',
    'heft.vorderseite': 'Vorderseite',
    'heft.rueckseite': 'Rückseite',
    'heft.leer': 'Keine Seiten gefunden.',
    'heft.seitenzahl': '{n} Seiten',
    'heft.zurueck': 'Zurückblättern',
    'heft.vor': 'Weiterblättern',
  },

  en: {
    'ueber.titel': 'About',
    'ueber.kontakte': 'Contacts',
    'ueber.gespeichert': 'Saved',
    'ueber.feld.ort': 'Place',
    'ueber.feld.mail': 'E-mail',
    'ueber.feld.instagram': 'Instagram',
    'ueber.feld.abschluss': 'Degrees',
    'ueber.feld.sprachen': 'Languages',
    'ueber.feld.gruppe': 'Group',
    'ueber.feld.kernkompetenz': 'Core strength',

    'ton.an': 'Turn sound off',
    'ton.aus': 'Turn sound on',
    'sprache.wechseln': 'Change language',

    'nav.bereiche': 'Sections',
    'nav.pfad': 'Path',
    'nav.start': 'Home',
    'nav.bereich': 'Section',
    'nav.projekt': 'Project',
    'nav.weitere': 'More projects',
    'nav.weiter': 'Next',

    'kat.creative-technology': 'Creative Technology',
    'kat.film': 'Film',
    'kat.game': 'Game',
    'kat.kommunikationsdesign': 'Communication Design',
    'kat.spiel': 'Play',

    'abschnitt.projekte': 'Projects',
    'abschnitt.werkzeuge': 'Tools',
    'abschnitt.womiticharbeite': 'What I work with',
    'abschnitt.vorgehen': 'Method',
    'abschnitt.sogeheichvor': 'How I work',
    'abschnitt.werkzeuge': 'Tools',
    'abschnitt.software': 'Software',
    'abschnitt.softwarehinweis':
      'The number behind it shows how many projects in this section used the program.',

    'karte.ansehen': 'View',
    'karte.oeffnen': 'Open',
    'karte.spielen': 'Play',
    'karte.projekt': 'project',
    'karte.projekte': 'projects',

    'fakten.jahr': 'Year',
    'fakten.auftrag': 'Client',
    'fakten.rahmen': 'Context',
    'fakten.rolle': 'My role',
    'fakten.mitwirkende': 'Collaborators',
    'fakten.werkzeuge': 'Tools',

    'projekt.weiteres': 'More material',
    'projekt.nichtgefunden': 'Project not found',
    'projekt.zurstartseite': 'To the home page',
    'projekt.kein-bereich':
      'The address holds no valid section. Expected is something like projekt.html?id=film/love.',
    'projekt.kein-projekt': 'There is no project called “{slug}” in {bereich}.',
    'projekt.vorheriges': '← Previous project',
    'projekt.naechstes': 'Next project →',

    'galerie.alle': 'Show all {n} images',
    'galerie.vergroessern': 'Enlarge',
    'galerie.bildvon': 'Enlarge image {n} of {m}',
    'galerie.grossansicht': 'Large view',
    'galerie.schliessen': 'Close ✕',
    'galerie.vorheriges': 'Previous image',
    'galerie.naechstes': 'Next image',

    'liste.projekte': 'Projects, scrollable',
    'liste.vorheriges': 'Previous project',
    'liste.naechstes': 'Next project',

    'menu.waehlen': 'Select',
    'menu.zurueck': 'Back',
    'menu.titel': 'Menu',
    'menu.oeffnen': 'Open menu',
    'menu.schliessen': 'Close menu',
    'menu.voriger': 'Previous entry',
    'menu.naechster': 'Next entry',
    'menu.anrufen': 'Call',
    'menu.spiele': 'Games',
    'menu.kontakt': 'Contact',
    'menu.kontakttext': 'Interested, or questions about working together?',

    'spiel.titel': 'BOTLNICK',
    'spiel.starten': 'Start the game',
    'spiel.laeuftimbrowser': 'Runs in the browser',
    'spiel.bereit': 'Ready',
    'spiel.laedt': 'Loading …',
    'spiel.laeuft': 'Running — click into the frame to play',
    'spiel.esc': 'Esc releases the mouse again',
    'spiel.keinbuild': 'No build',
    'spiel.steuerung': 'Controls',
    'spiel.maushinweis': 'The game takes over the mouse pointer once you click into it. With',
    'spiel.maushinweis2': 'you get it back.',
    'spiel.zumprojekt': '← Back to the project',

    'prototyp.inlakech':
      'A machine for two strangers: only when both press at the same time does it go on — ' +
      'best played by two people at one keyboard or phone. In the installation a camera and a ' +
      'receipt printer fire at the end; in the browser it stays with the flash and a receipt ' +
      'on screen.',
    'prototyp.zodizine':
      'A date of birth turns into three signs: one from the Chinese lunar calendar, one from ' +
      'the Indian rashi, one from the Celtic tree calendar. Out of them comes the zine — eight ' +
      'pages on a single A4 sheet that gets folded. The matching {anleitung} is included. The ' +
      'drawings on the pages are by Cara Brüggendieck.',
    'prototyp.zodizine.anleitung': 'folding guide from the project',
    'prototyp.shepard':
      'The lecture hall from above: the only way through on the left, the screen and the two ' +
      'speakers at the front. The sound is the one from the installation — eleven oscillators ' +
      'from 20 Hz to 20,480 Hz — and it hangs on the same three parameters: how fast you walk, ' +
      'in which direction, and how close you get to the speakers.',

    'prototyp.nostalgia':
      'The same detection as in the gallery, only in the browser: whoever is in frame sees ' +
      'both layers at once — and where you stand decides which of them carries. In the second ' +
      'window a sentence lies under fog; your hand wipes it clear, and the fog closes again. ' +
      'It is drawn with colours only, never with the camera image.',

    'portal.kameraan': 'Turn the camera on',
    'portal.kameraaus': 'Turn the camera off',
    'portal.demo': 'Watch without a camera',
    'portal.demoaus': 'Stop the demo',
    'portal.hinweis':
      'The image stays on your device and is sent nowhere. All you see are fields of colour, ' +
      'no face.',
    'portal.aus': 'Off',
    'portal.laedt': 'Loading …',
    'portal.bereit': 'Ready',
    'portal.niemand': 'Nobody in frame',
    'portal.erkannt': 'In frame',
    'portal.wischen.status': '{n}% clear',
    'portal.fehler': 'Camera unavailable',
    'portal.verweigert': 'Camera not permitted',
    'portal.rechts.ebenen': 'MediaPipe · one screen',
    'portal.rechts.wischen': 'Hand or finger',
    'portal.ebenen.alt': 'One screen that gets coarser the further away you stand',
    'portal.wischen.alt': 'A sentence under fog that can be wiped away',
    'portal.imbild': 'In frame',
    'portal.abstand': 'Distance',
    'portal.aufloesung': 'Resolution',
    'portal.snippet1': 'where does one begin and the other end?',
    'portal.snippet2': 'Light, Future, Past',
    'portal.snippet3': 'nostalgia is a portal',

    'prototyp.innerflow':
      'The same two measurements as in the prototype, here in the browser: the camera reads ' +
      'the face, the microphone reads loudness, pitch and zero-crossing rate. V, A and D are ' +
      'the axes of the PAD model — valence, arousal, dominance. It is a clue, not a finding: ' +
      'what a measurement means is known only to the person in front of it.',
    'if.hinweis':
      'Camera and microphone only start after a click. Nothing is stored and nothing leaves ' +
      'your device.',
    'if.rechts.mimik': 'MediaPipe · every 0.4 s',
    'if.rechts.stimme': 'Web Audio · every 0.4 s',
    'if.gesicht.alt': 'The detected face points as a grid',
    'if.pegel.alt': 'The microphone waveform with the silence threshold',
    'if.kameraan': 'Turn the camera on',
    'if.kameraaus': 'Turn the camera off',
    'if.mikroan': 'Turn the microphone on',
    'if.mikroaus': 'Turn the microphone off',
    'if.misst': 'Measuring',
    'if.keingesicht': 'no face',
    'if.stille': 'silence',
    'if.neutral': 'neutral',
    'if.froh': 'happy',
    'if.traurig': 'sad',
    'if.aerger': 'anger',
    'if.ueberrascht': 'surprised',

    'botlnick.rechts': 'Godot · {mb} MB',
    'botlnick.starten': 'Start the game',
    'botlnick.hinweis':
      'Loads about {mb} MB once. Runs in Chrome, Edge and Firefox; Safari can be fussy. ' +
      'Best with a keyboard and mouse.',
    'botlnick.keinbuild': 'No build available',
    'botlnick.bereit': 'Ready',
    'botlnick.laeuft': 'Running — click into the picture to play',

    'gram.rechts': 'Angular · 2023',
    'gram.start': 'Press to start.',
    'gram.nochmal': 'Again?',
    'gram.status.weiter': 'Next ▸',
    'gram.status.waehlen': 'Choose',
    'gram.status.ende': 'End',

    'shepard.rechts': '11 oscillators · 20–20,480 Hz',
    'shepard.plan': 'Floor plan of the lecture hall — walk with the arrow keys or your finger',
    'shepard.an': 'Sound on',
    'shepard.aus': 'Sound off',
    'shepard.laeuft': 'The tone is running',
    'shepard.still': 'Silent — switch the sound on',
    'shepard.keinton': 'This browser cannot produce sound',
    'shepard.tempo': 'Speed',
    'shepard.richtung': 'Direction',
    'shepard.laut': 'Volume',

    'heft.seite': 'Page',
    'heft.seitevon': 'Page {n} of {m}',
    'heft.seitenpaar': 'Pages {a} and {b}',
    'heft.vorderseite': 'Front cover',
    'heft.rueckseite': 'Back cover',
    'heft.leer': 'No pages found.',
    'heft.seitenzahl': '{n} pages',
    'heft.zurueck': 'Page back',
    'heft.vor': 'Page forward',
  },

  sq: {
    'ueber.titel': 'Rreth meje',
    'ueber.kontakte': 'Kontaktet',
    'ueber.gespeichert': 'E ruajtur',
    'ueber.feld.ort': 'Vendi',
    'ueber.feld.mail': 'E-mail',
    'ueber.feld.instagram': 'Instagram',
    'ueber.feld.abschluss': 'Diplomat',
    'ueber.feld.sprachen': 'Gjuhët',
    'ueber.feld.gruppe': 'Grupi',
    'ueber.feld.kernkompetenz': 'Fusha kryesore',

    'ton.an': 'Fik zërin',
    'ton.aus': 'Ndiz zërin',
    'sprache.wechseln': 'Ndërro gjuhën',

    'nav.bereiche': 'Fushat',
    'nav.pfad': 'Shtegu',
    'nav.start': 'Fillimi',
    'nav.bereich': 'Fusha',
    'nav.projekt': 'Projekti',
    'nav.weitere': 'Projekte të tjera',
    'nav.weiter': 'Vazhdo',

    'kat.creative-technology': 'Creative Technology',
    'kat.film': 'Film',
    'kat.game': 'Lojëra',
    'kat.kommunikationsdesign': 'Dizajn komunikimi',
    'kat.spiel': 'Luaj',

    'abschnitt.projekte': 'Projektet',
    'abschnitt.werkzeuge': 'Mjetet',
    'abschnitt.womiticharbeite': 'Me çfarë punoj',
    'abschnitt.vorgehen': 'Mënyra e punës',
    'abschnitt.sogeheichvor': 'Si punoj',
    'abschnitt.werkzeuge': 'Mjetet',
    'abschnitt.software': 'Programet',
    'abschnitt.softwarehinweis':
      'Numri pas emrit tregon në sa projekte të kësaj fushe është përdorur programi.',

    'karte.ansehen': 'Shiko',
    'karte.oeffnen': 'Hap',
    'karte.spielen': 'Luaj',
    'karte.projekt': 'projekt',
    'karte.projekte': 'projekte',

    'fakten.jahr': 'Viti',
    'fakten.auftrag': 'Klienti',
    'fakten.rahmen': 'Konteksti',
    'fakten.rolle': 'Roli im',
    'fakten.mitwirkende': 'Bashkëpunëtorët',
    'fakten.werkzeuge': 'Mjetet',

    'projekt.weiteres': 'Material tjetër',
    'projekt.nichtgefunden': 'Projekti nuk u gjet',
    'projekt.zurstartseite': 'Te faqja kryesore',
    'projekt.kein-bereich':
      'Adresa nuk përmban një fushë të vlefshme. Pritet diçka si projekt.html?id=film/love.',
    'projekt.kein-projekt': 'Në fushën {bereich} nuk ka projekt me emrin „{slug}".',
    'projekt.vorheriges': '← Projekti i mëparshëm',
    'projekt.naechstes': 'Projekti tjetër →',

    'galerie.alle': 'Shfaq të {n} fotografitë',
    'galerie.vergroessern': 'Zmadho',
    'galerie.bildvon': 'Zmadho fotografinë {n} nga {m}',
    'galerie.grossansicht': 'Pamje e madhe',
    'galerie.schliessen': 'Mbyll ✕',
    'galerie.vorheriges': 'Fotografia e mëparshme',
    'galerie.naechstes': 'Fotografia tjetër',

    'liste.projekte': 'Projektet, me rrëshqitje',
    'liste.vorheriges': 'Projekti i mëparshëm',
    'liste.naechstes': 'Projekti tjetër',

    'menu.waehlen': 'Zgjidh',
    'menu.zurueck': 'Prapa',
    'menu.titel': 'Menyja',
    'menu.oeffnen': 'Hap menynë',
    'menu.schliessen': 'Mbyll menynë',
    'menu.voriger': 'Zëri i mëparshëm',
    'menu.naechster': 'Zëri tjetër',
    'menu.anrufen': 'Telefono',
    'menu.spiele': 'Lojëra',
    'menu.kontakt': 'Kontakt',
    'menu.kontakttext': 'Interes ose pyetje për një bashkëpunim?',

    'spiel.titel': 'BOTLNICK',
    'spiel.starten': 'Nis lojën',
    'spiel.laeuftimbrowser': 'Luhet në shfletues',
    'spiel.bereit': 'Gati',
    'spiel.laedt': 'Po ngarkohet …',
    'spiel.laeuft': 'Po luan — kliko brenda pamjes për të luajtur',
    'spiel.esc': 'Esc e liron sërish miun',
    'spiel.keinbuild': 'Pa version',
    'spiel.steuerung': 'Kontrollet',
    'spiel.maushinweis': 'Loja merr kursorin sapo klikon brenda. Me',
    'spiel.maushinweis2': 'e merr sërish.',
    'spiel.zumprojekt': '← Kthehu te projekti',

    'prototyp.inlakech':
      'Një automat për dy të panjohur: vetëm kur shtypin të dy njëkohësisht vazhdon — më mirë ' +
      'dy veta në një tastierë ose në një telefon. Në instalim në fund ndizen kamera dhe ' +
      'printeri i faturave; në shfletues mbetet vetëm blici dhe një faturë në ekran.',
    'prototyp.zodizine':
      'Nga një datëlindje dalin tre shenja: një nga kalendari hënor kinez, një nga rashi ' +
      'indiane, një nga kalendari keltik i pemëve. Prej tyre lind fletushka — tetë faqe në një ' +
      'fletë A4 që pastaj paloset. Bashkë me të vjen {anleitung}. Vizatimet në faqe janë të ' +
      'Cara Brüggendieck.',
    'prototyp.zodizine.anleitung': 'udhëzimi i palosjes nga projekti',
    'prototyp.shepard':
      'Salla e leksioneve parë nga lart: majtas rruga e vetme, përpara ekrani dhe dy ' +
      'altoparlantët. Tingulli është ai i instalimit — njëmbëdhjetë oshilatorë nga 20 Hz deri ' +
      'në 20.480 Hz — dhe varet nga të njëjtët tre parametra: sa shpejt ecën, në cilin drejtim ' +
      'dhe sa afër u vjen altoparlantëve.',

    'prototyp.nostalgia':
      'I njëjti njohje si në galeri, vetëm në shfletues: kush është në kuadër i sheh të dy ' +
      'shtresat njëherësh — dhe vendi ku qëndron vendos cila prej tyre mban. Në dritaren e ' +
      'dytë një fjali rri nën mjegull; dora e pastron, dhe mjegulla kthehet. Vizatohet vetëm ' +
      'me ngjyra, kurrë me pamjen e kamerës.',

    'portal.kameraan': 'Ndiz kamerën',
    'portal.kameraaus': 'Fik kamerën',
    'portal.demo': 'Shiko pa kamerë',
    'portal.demoaus': 'Ndalo demonstrimin',
    'portal.hinweis':
      'Pamja mbetet në pajisjen tënde dhe nuk dërgohet askund. Shihen vetëm fusha ngjyrash, ' +
      'asnjë fytyrë.',
    'portal.aus': 'Fikur',
    'portal.laedt': 'Po ngarkohet …',
    'portal.bereit': 'Gati',
    'portal.niemand': 'Askush në kuadër',
    'portal.erkannt': 'Në kuadër',
    'portal.wischen.status': '{n}% e pastruar',
    'portal.fehler': 'Kamera e paarritshme',
    'portal.verweigert': 'Kamera nuk u lejua',
    'portal.rechts.ebenen': 'MediaPipe · një ekran',
    'portal.rechts.wischen': 'Dora ose gishti',
    'portal.ebenen.alt': 'Një ekran që bëhet më i trashë sa më larg të qëndrosh',
    'portal.wischen.alt': 'Një fjali nën mjegull që mund të fshihet',
    'portal.imbild': 'Në kuadër',
    'portal.abstand': 'Distanca',
    'portal.aufloesung': 'Rezolucioni',
    'portal.snippet1': 'where does one begin and the other end?',
    'portal.snippet2': 'Light, Future, Past',
    'portal.snippet3': 'nostalgia is a portal',

    'prototyp.innerflow':
      'Të njëjtat dy matje si në prototip, këtu në shfletues: kamera lexon mimikën, mikrofoni ' +
      'lexon volumin, lartësinë e zërit dhe shkallën e kalimeve përmes zeros. V, A dhe D janë ' +
      'boshtet e modelit PAD — valenca, zgjimi, dominanca. Është një shenjë, jo një ' +
      'diagnozë: çfarë do të thotë një matje e di vetëm njeriu përballë saj.',
    'if.hinweis':
      'Kamera dhe mikrofoni ndizen vetëm pas një klikimi. Asgjë nuk ruhet dhe asgjë nuk del ' +
      'nga pajisja jote.',
    'if.rechts.mimik': 'MediaPipe · çdo 0,4 s',
    'if.rechts.stimme': 'Web Audio · çdo 0,4 s',
    'if.gesicht.alt': 'Pikat e njohura të fytyrës si rrjetë',
    'if.pegel.alt': 'Vala e mikrofonit me pragun e heshtjes',
    'if.kameraan': 'Ndiz kamerën',
    'if.kameraaus': 'Fik kamerën',
    'if.mikroan': 'Ndiz mikrofonin',
    'if.mikroaus': 'Fik mikrofonin',
    'if.misst': 'Po mat',
    'if.keingesicht': 'pa fytyrë',
    'if.stille': 'heshtje',
    'if.neutral': 'neutral',
    'if.froh': 'i gëzuar',
    'if.traurig': 'i trishtuar',
    'if.aerger': 'zemërim',
    'if.ueberrascht': 'i befasuar',

    'botlnick.rechts': 'Godot · {mb} MB',
    'botlnick.starten': 'Nis lojën',
    'botlnick.hinweis':
      'Ngarkon rreth {mb} MB një herë. Punon në Chrome, Edge dhe Firefox; Safari mund të ' +
      'bëjë naze. Më mirë me tastierë dhe mi.',
    'botlnick.keinbuild': 'Nuk ka build',
    'botlnick.bereit': 'Gati',
    'botlnick.laeuft': 'Po luan — kliko brenda pamjes për të luajtur',

    'gram.rechts': 'Angular · 2023',
    'gram.start': 'Shtyp për të filluar.',
    'gram.nochmal': 'Edhe një herë?',
    'gram.status.weiter': 'Vazhdo ▸',
    'gram.status.waehlen': 'Zgjidh',
    'gram.status.ende': 'Fund',

    'shepard.rechts': '11 oshilatorë · 20–20.480 Hz',
    'shepard.plan': 'Plani i sallës — ec me shigjetat ose me gisht',
    'shepard.an': 'Ndiz zërin',
    'shepard.aus': 'Fik zërin',
    'shepard.laeuft': 'Tingulli po luan',
    'shepard.still': 'Në heshtje — ndiz zërin',
    'shepard.keinton': 'Ky shfletues nuk mund të prodhojë zë',
    'shepard.tempo': 'Shpejtësia',
    'shepard.richtung': 'Drejtimi',
    'shepard.laut': 'Volumi',

    'heft.seite': 'Faqja',
    'heft.seitevon': 'Faqja {n} nga {m}',
    'heft.seitenpaar': 'Faqet {a} dhe {b}',
    'heft.vorderseite': 'Kopertina e parë',
    'heft.rueckseite': 'Kopertina e fundit',
    'heft.leer': 'Nuk u gjetën faqe.',
    'heft.seitenzahl': '{n} faqe',
    'heft.zurueck': 'Kthehu një faqe',
    'heft.vor': 'Vazhdo një faqe',
  },
};
