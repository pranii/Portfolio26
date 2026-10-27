# Spickzettel: Wo ändere ich was?

## Die kurze Antwort

| Ich will ändern …                            | Datei                                        |
| -------------------------------------------- | -------------------------------------------- |
| Meinen Namen, Kontakt, Links, Ort            | `src/data/site.js`                           |
| Die vier Bereichstexte auf der Startseite    | `src/data/site.js` (unten, `categories`)     |
| Steuerung und Text der Spielseite            | `src/data/site.js` (ganz unten, `spiel`)     |
| Projekte im Bereich **Creative Technology**  | `src/data/creative-technology.js`            |
| Projekte im Bereich **Film**                 | `src/data/film.js`                           |
| Projekte im Bereich **Game**                 | `src/data/game.js`                           |
| Projekte im Bereich **Kommunikationsdesign** | `src/data/kommunikationsdesign.js`           |
| Bildunterschriften im ZodiZine-Automaten     | `src/data/zodizine.js`                       |
| Bilder und Videos austauschen                | `public/media/<ordner>/<projekt>/`           |
| Welche Dateien überhaupt importiert werden   | `scripts/media-manifest.mjs`                 |
| Farben, Schriftgrößen, Abstände              | `src/styles/main.css`, ganz oben bei `:root` |
| Spaltensatz der Fließtexte                   | `src/styles/main.css`, `--column-min`        |

**Finger weg von** `src/data/media.json` — die Datei wird von `npm run import`
erzeugt und bei jedem Lauf überschrieben.

---

## Vom Element auf der Seite zur Datei

Mach im Browser einen Rechtsklick auf das, was du ändern willst, und wähle
**Untersuchen**. Der markierte Kasten hat einen Klassennamen wie `step__text`.
Damit findest du hier die Quelle:

| Klassenname im Browser               | Steht in      | Feld                                     |
| ------------------------------------ | ------------- | ---------------------------------------- |
| `hero__title`, `site-header__mark`   | `site.js`     | `name`                                   |
| `hero__role`                         | `site.js`     | `role`                                   |
| `hero__intro`                        | `site.js`     | `intro`                                  |
| `area__kicker`                       | `site.js`     | `categories[].kicker`                    |
| `area__desc`                         | `site.js`     | `categories[].description`               |
| `readout` (Fußzeile)                 | `site.js`     | `ort`, `koordinaten`, `version`          |
| `site-footer__links`                 | `site.js`     | `links`                                  |
| `intro__lead`                        | Bereichsdatei | `category.lead`                          |
| `card__title`, `project-head__title` | Bereichsdatei | `title` des Projekts                     |
| `card__sub`, `project-head__sub`     | Bereichsdatei | `subtitle`                               |
| `project-head__text`                 | Bereichsdatei | `description`                            |
| `facts` (Jahr, Rolle, Mitwirkende)   | Bereichsdatei | `year`, `role`, `client`, `tools`        |
| `tags`                               | Bereichsdatei | `tags`                                   |
| `pull` (großer Zwischenruf)          | Bereichsdatei | `pull`                                   |
| `step__title`                        | Bereichsdatei | `chapters[].title`                       |
| `step__text`                         | Bereichsdatei | `chapters[].text`                        |
| `ablauf__list`                       | —             | ergibt sich aus den Kapitelüberschriften |
| `figure` (ein Bild)                  | Bereichsdatei | `chapters[].files`                       |
| `boot__*`, `keys`                    | `site.js`     | `spiel`                                  |

„Bereichsdatei" heißt: `creative-technology.js`, `film.js`, `game.js` oder
`kommunikationsdesign.js` — je nachdem, in welchem Bereich du gerade bist. Steht auch
oben im Pfad der Seite.

**Projekt in einen anderen Bereich verschieben:** Den ganzen Block des Projekts
(von `{` bis `},`) aus der einen Bereichsdatei ausschneiden und in die andere
einfügen. An den Bildern musst du nichts ändern.

---

## Fließtext in zwei Spalten

Die Projekttexte — Beschreibung oben und die Kapiteltexte — laufen über die
ganze Seitenbreite und teilen sich dabei in bis zu vier Spalten. Dahinter
steckt kein Umbruchpunkt, sondern die Spaltenbreite: Es werden so viele
Spalten, wie mit `--column-min` nebeneinander passen — vier auf einem breiten
Monitor, drei auf einem Laptop, zwei auf dem Tablet, eine auf dem Handy.

| Token          | Bedeutung                                                 |
| -------------- | --------------------------------------------------------- |
| `--column-min` | Wie schmal eine Spalte höchstens wird, bevor es eine wird |
| `--shell`      | Wie breit die Seite insgesamt werden darf                 |

Größeres `--column-min` heißt: breitere Spalten, dafür weniger davon.
Beide stehen oben in `src/styles/main.css` bei `:root`. Die Obergrenze von
vier Spalten ist die `4` in der Regel darunter (`columns: var(--column-min)
4`) — eine andere Zahl dort ändert sie.

---

## Bilder austauschen

Die Bilder auf der Seite liegen in `public/media/<ordner>/<projekt>/`. Die
Ordner heißen noch wie früher — `arbeit`, `freizeit` und `uni` —, weil sie
den Quellordnern auf dem Desktop entsprechen. Mit den Bereichen der Seite haben
sie nichts mehr zu tun: Die Seite findet die Bilder über den Projektnamen. Zu
jedem Bild gibt es drei Dateien:

```
flyer-vorne-01.webp         volle Auflösung → Großansicht
flyer-vorne-01-thumb.webp   kleine Fassung  → schnelles Laden
flyer-vorne-01-crop.webp    3:2-Ausschnitt  → Kachelraster
```

**Ein einzelnes Bild schnell ersetzen:** Neue Datei über alle drei legen, mit
denselben Namen. Unsauber, aber es geht.

**Der saubere Weg**, und der einzige, der auch nach dem nächsten Import noch
stimmt:

1. Bild in den Quellordner legen: `Desktop\Portofolio\<Bereich>\<Projekt>\`
2. In `scripts/media-manifest.mjs` beim Projekt unter `sources` ergänzen
3. `npm run import -- --only=arbeit/huginn` (nur dieses Projekt neu einlesen)
4. In der Bereichsdatei den Dateinamen-Anfang bei `chapters[].files` eintragen

Welche Dateinamen es gibt, siehst du im Ordner unter `public/media/`.

---

## Prototypen in den Projektseiten

Drei Projekte zeigen ihre Arbeit direkt auf der Projektseite, zwischen Kopf
und Kapiteln — ohne weitere Unterseite:

| Projekt    | Was läuft dort                | Code                                  |
| ---------- | ----------------------------- | ------------------------------------- |
| In Lak'ech | Das Duell für zwei Knöpfe     | `src/scripts/lib/inlakech-game.js`    |
| ZodiZine   | Der Zine-Automat              | `src/scripts/lib/zodizine-automat.js` |
| Rreth      | Das Magazin zum Durchblättern | `src/scripts/lib/magazin.js`          |

Eingeschaltet wird das über das Feld `prototyp` im Projekt:

```js
prototyp: { art: 'magazin', titel: 'Das Magazin durchblättern', label: 'Magazin blättern', quelle: 'rreth02' },
```

`art` entscheidet, welcher Prototyp geladen wird (`in-lakech`, `zodizine`
oder `magazin`), `label` steht auf dem Knopf oben im Projektkopf, `titel`
über dem Fenster. `quelle` braucht nur das Magazin: der Dateiname-Anfang der
PDF-Seiten, so wie er in `chapters[].files` stehen würde.

Den Rahmen — Fenster, Knöpfe, Bedienungsanleitung — baut
`src/scripts/lib/prototyp.js`. Der schwere Teil wird erst geladen, wenn eine
Projektseite ihn wirklich zeigt. Das Duell hält an, sobald sein Fenster aus
dem Bild scrollt.

---

## ZodiZine: die Seiten des Hefts

Der Automat auf der ZodiZine-Projektseite gibt Caras gezeichnete Zine-Seiten aus. Sie
liegen in `public/zodizine/` — Umschlag vorne und hinten, zu jedem Zeichen
eine Illustration und eine Affirmation, dazu die Faltanleitung als PDF.

**Seiten neu einlesen** (etwa nach einer überarbeiteten Fassung von Cara):
Den Ordner mit `ChineseSigns_Transparent`, `IndianSigns_Transparent`,
`CelticSigns_Transparent`, `ZodiZine_front.png`, `ZodiZine_back.png` und
`ZodiZine_FoldingGuide.pdf` nach `Desktop\ZodiZine` legen, dann:

```bash
npm run zodizine
```

Liegt er woanders, den Pfad mitgeben:

```bash
ZODIZINE_QUELLE="D:/woauchimmer/ZodiZine" npm run zodizine
```

Das Skript rechnet die PNGs in verlustfreies WebP um und vereinheitlicht die
Dateinamen. Welche Datei zu welchem Zeichen gehört, steht in
`src/data/zodizine.js` unter `datei`. `npm run check` meldet, wenn eine Seite
fehlt.

Die deutschen Worte und Sätze in derselben Datei stehen **nicht** im Heft —
auf den Seiten steht Caras englische Fassung. Sie erscheinen als
Bildunterschrift im Fenster und als Bildbeschreibung für Vorleseprogramme.

---

## Videos einbauen

Videos werden **nicht** umgewandelt, sie werden nur kopiert. Zwei Dinge sind
deshalb wichtig: `.mp4` funktioniert überall, `.mov` nicht in jedem Browser.
Und alles über 50 MB wird beim Import übersprungen.

**Video hinzufügen:**

1. Die `.mp4` direkt nach `public/media/<ordner>/<projekt>/` legen
2. In der Bereichsdatei beim passenden Kapitel den Dateinamen-Anfang unter
   `files` ergänzen

**Reservierter Platz für ein Video, das es noch nicht gibt** — so ist es
gerade beim Huginn-Imagefilm gelöst:

```js
{
  title: 'Der fertige Film',
  text: 'Und so sieht es aus, wenn die Kamera tatsächlich läuft.',
  files: [],
  platzhalter: '/media/arbeit/huginn/huginn.mp4',
}
```

Solange die Datei fehlt, steht dort ein beschrifteter Rahmen. Sobald du sie
ablegst, spielt sie von selbst — du musst nichts umbauen.

**Video ist zu groß?** In `ASSETS-REPORT.md` stehen alle übersprungenen
Dateien mit dem fertigen ffmpeg-Befehl zum Verkleinern.

**Video von YouTube oder Vimeo einbetten** — kostet nichts, solange niemand
auf Play drückt, und eignet sich für alles, was zu groß fürs Repository ist:

```js
{
  title: 'Der Film',
  text: 'Das Hauptvideo der Rauminstallation.',
  embed: 'https://www.youtube.com/watch?v=XYZ',
}
```

Der Link aus der Adresszeile genügt, auch `youtu.be/...` oder ein Shorts-Link;
die Seite macht daraus selbst die Einbettung (über youtube-nocookie, damit
vorher keine Cookies gesetzt werden). **Platz reservieren**, solange das Video
noch fehlt: `embed: ''` schreiben — dann steht dort ein beschrifteter Rahmen,
und sobald der Link drinsteht, läuft das Video.

---

## Nach dem Ändern

Texte in den Datendateien erscheinen sofort im Browser, solange
`npm run dev` läuft. Bei neuen Bildern oder Videos einmal:

```bash
npm run check
```

Das sagt dir, ob eine Datei fehlt, ein Kapitel leer bleibt oder Bilder in
keinem Kapitel gelandet sind.
