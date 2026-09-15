# Spickzettel: Wo ändere ich was?

## Die kurze Antwort

| Ich will ändern …                          | Datei                                        |
| ------------------------------------------ | -------------------------------------------- |
| Meinen Namen, Kontakt, Links, Ort          | `src/data/site.js`                           |
| Die drei Bereichstexte auf der Startseite  | `src/data/site.js` (unten, `categories`)     |
| Steuerung und Text der Spielseite          | `src/data/site.js` (ganz unten, `spiel`)     |
| Projekte im Bereich **Arbeit**             | `src/data/arbeit.js`                         |
| Projekte im Bereich **Freizeit**           | `src/data/freizeit.js`                       |
| Projekte im Bereich **Uni**                | `src/data/uni.js`                            |
| Bilder und Videos austauschen              | `public/media/<bereich>/<projekt>/`          |
| Welche Dateien überhaupt importiert werden | `scripts/media-manifest.mjs`                 |
| Farben, Schriftgrößen, Abstände            | `src/styles/main.css`, ganz oben bei `:root` |

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
| `facts` (Jahr, Rolle, Mitwirkende)  | Bereichsdatei | `year`, `role`, `client`, `tools`        |
| `tags`                               | Bereichsdatei | `tags`                                   |
| `pull` (großer Zwischenruf)          | Bereichsdatei | `pull`                                   |
| `step__title`                        | Bereichsdatei | `chapters[].title`                       |
| `step__text`                         | Bereichsdatei | `chapters[].text`                        |
| `ablauf__list`                       | —             | ergibt sich aus den Kapitelüberschriften |
| `figure` (ein Bild)                  | Bereichsdatei | `chapters[].files`                       |
| `boot__*`, `keys`                    | `site.js`     | `spiel`                                  |

„Bereichsdatei" heißt: `arbeit.js`, `freizeit.js` oder `uni.js` — je nachdem,
in welchem Bereich du gerade bist. Steht auch oben im Pfad der Seite.

---

## Bilder austauschen

Die Bilder auf der Seite liegen in `public/media/<bereich>/<projekt>/`. Zu
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

## Videos einbauen

Videos werden **nicht** umgewandelt, sie werden nur kopiert. Zwei Dinge sind
deshalb wichtig: `.mp4` funktioniert überall, `.mov` nicht in jedem Browser.
Und alles über 50 MB wird beim Import übersprungen.

**Video hinzufügen:**

1. Die `.mp4` direkt nach `public/media/<bereich>/<projekt>/` legen
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

---

## Nach dem Ändern

Texte in den Datendateien erscheinen sofort im Browser, solange
`npm run dev` läuft. Bei neuen Bildern oder Videos einmal:

```bash
npm run check
```

Das sagt dir, ob eine Datei fehlt, ein Kapitel leer bleibt oder Bilder in
keinem Kapitel gelandet sind.
