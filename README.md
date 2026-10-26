# Portfolio

Die Seite hat drei Ebenen. Man kann sich an keiner Stelle verlaufen:

```
Startseite            Vier Bereiche als Kacheln
   ↓
Übersicht             Alle Projekte eines Bereichs als Karten
   ↓
Projektseite          Ein Projekt, Schritt für Schritt
```

Oben steht immer der Pfad — `Start / Arbeit / Huginn` — und jeder Teil davon
ist anklickbar.

Die Inhalte kommen aus `Desktop/Portofolio`. Dieser Ordner bleibt unangetastet
und ist die Quelle; alles hier ist eine web-taugliche Kopie davon.

## Loslegen

```bash
cd Desktop/portfolio
npm install      # nur beim ersten Mal
npm run dev      # oeffnet http://localhost:5173
```

In VS Code: Ordner oeffnen, Terminal mit `Strg + ö`, dann `npm run dev`.

## Befehle

| Befehl            | Wofuer                                                      |
| ----------------- | ----------------------------------------------------------- |
| `npm run dev`     | Entwicklungsserver mit sofortiger Vorschau                  |
| `npm run build`   | Fertige Seite nach `dist/` bauen                            |
| `npm run preview` | Den gebauten Stand lokal ansehen                            |
| `npm run import`  | Medien neu aus `Desktop/Portofolio` holen                   |
| `npm run check`   | Prueft Medien, Kapitel und ob jede Seite fehlerfrei aufbaut |

## Was du wo aenderst

| Was                              | Datei                                          |
| -------------------------------- | ---------------------------------------------- |
| Name, Kontakt, Bereichstexte     | `src/data/site.js`                             |
| Projekte Creative Technology     | `src/data/creative-technology.js`              |
| Projekte Film                    | `src/data/film.js`                             |
| Projekte Game                    | `src/data/game.js`                             |
| Projekte Kommunikationsdesign    | `src/data/kommunikationsdesign.js`             |
| Welche Dateien importiert werden | `scripts/media-manifest.mjs`                   |
| Farben, Schrift, Abstaende       | `src/styles/main.css`, ganz oben unter `:root` |

**Zuerst:** In `src/data/site.js` deinen Namen eintragen — dort steht noch
`DEIN NAME`. Dann in den drei Datendateien nach `TODO` suchen
(`Strg + Shift + F`), das sind die Stellen, an denen ich Beschreibungen und
Jahreszahlen geraten habe.

## Wie ein Projekt aufgebaut ist

Jedes Projekt erzaehlt seinen Arbeitsweg in **Schritten**. Ein Schritt besteht
aus Nummer, Ueberschrift, ein bis zwei Saetzen von dir und den zugehoerigen
Dateien:

```js
{
  slug: 'handwerkerexperten',
  title: 'Handwerkerexperten',
  subtitle: 'Zwei Marken, eine Geschaeftsausstattung',
  cover: 'logo-kombiniert',        // Titelbild fuer die Uebersichtskarte
  description: 'Killes und Benz betreibt zwei Geschaeftsbereiche …',
  year: '2025',
  role: 'Redesign, Gestaltung, Reinzeichnung',
  chapters: [
    {
      title: 'Visitenkarten',
      text: 'Die erste Anwendung war das Kartenset fuer das ganze Team …',
      files: ['visitenkarte'],     // sammelt visitenkarte-01 bis -08 ein
      layout: 'grid',              // 'grid' = Raster | 'wide' = grosse Bilder
    },
  ],
}
```

Ein paar Regeln, die dir Arbeit sparen:

- **Reihenfolge**: Die Reihenfolge der Schritte im Array ist die Reihenfolge auf
  der Seite. Zum Umsortieren verschiebst du die Bloecke — die Nummerierung
  passt sich von allein an.
- **Dateien zuordnen**: `files` sind Dateinamen-**Anfaenge**. `['visitenkarte']`
  holt alle Dateien, die so beginnen. Welche es gibt, siehst du in
  `public/media/<ordner>/<projekt>/`.
- **Was keinem Schritt zugeordnet ist, wird nicht gezeigt.** Die Seite zeigt
  nur, was du bewusst einsortiert hast — nicht alles, was zufaellig im Ordner
  liegt. Verschwiegen wird trotzdem nichts: `npm run check` listet jede nicht
  zugeordnete Datei mit Namen auf.
- **Nicht alles wird gezeigt**: Pro Schritt erscheinen zunaechst sechs Bilder,
  der Rest kommt ueber „Alle Dateien zeigen". Die Zahl steht in
  `src/scripts/lib/render.js` als `VORSCHAU_BILDER`.
- **Titelbild**: `cover` waehlt das Bild fuer die Uebersichtskarte. Ohne Angabe
  wird das erste Bild des Projekts genommen — das ist oft die erste Skizze und
  selten das beste Motiv, also lieber setzen.

### Ein Projekt hinzufuegen

1. In `scripts/media-manifest.mjs` einen Eintrag mit `category`, `slug` und
   `sources` ergaenzen. `category` ist hier nur der Medienordner (`arbeit`,
   `freizeit` oder `uni`), nicht der Bereich auf der Seite.
2. `npm run import` laufen lassen.
3. In `src/data/<bereich>.js` ein Objekt mit demselben `slug` ergaenzen —
   Titel, `cover`, Beschreibung und die `chapters`.
4. `npm run check`, dann `npm run dev`.

### Ein Projekt verstecken

Kommentiere das Projektobjekt in der Datendatei aus oder loesche es. Die Medien
bleiben liegen, die Seite zeigt es einfach nicht mehr.

## Das Spiel (BOTLNICK)

`spiel.html` laedt den Godot-Web-Export aus `public/spiel/botlnick/` in einem
Fenster. Das Spiel startet **nicht** von selbst — erst nach Klick auf
„Spiel starten", weil sonst jeder Besucher ungefragt 46 MB herunterlaedt.

Neu bauen:

```bash
npm run export:spiel
```

Das Skript ruft Godot im Headless-Modus auf. Voraussetzungen:

| Was              | Wo                                                                             |
| ---------------- | ------------------------------------------------------------------------------ |
| Godot 4.7        | `C:\Users\pranv\Desktop\Godot_v4.7-stable_win64.exe` — oder `GODOT_EXE` setzen |
| Spielprojekt     | `C:\Users\pranv\Documents\GitHub\Pre-Flight` — oder `GODOT_PROJECT` setzen     |
| Export-Templates | einmalig ueber Godot → Editor → Export-Templates verwalten                     |
| Preset „Web"     | steht in `export_presets.cfg` des Spielprojekts                                |

**Warum das Preset nur fuenf Szenen listet:** Mit `export_filter="all_resources"`
wird das komplette Projekt exportiert — das ergibt 1,6 GB, weil der Ordner
`ASSETS GameJam` voller 4K-Texturen steckt, die im fertigen Spiel gar nicht
vorkommen. Mit `export_filter="scenes"` und der Liste der fuenf Szenen, die das
Spiel durchlaeuft (Startbildschirm → Menue → Cutscene → Welt → Game Over),
zieht Godot nur deren Abhaengigkeiten mit: **91 MB statt 1,6 GB.**

Wenn du im Spiel neue Szenen ergaenzt, die per `change_scene_to_file` geladen
werden, musst du sie im Preset unter `export_files` nachtragen — sonst fehlen
sie im Web-Build, obwohl das Spiel auf dem Desktop laeuft.

Der Ordner `public/spiel/` steht in `.gitignore`. Fuer eine Veroeffentlichung
muss er mit hochgeladen werden (bei Netlify oder Vercel passiert das
automatisch, weil `npm run build` ihn nach `dist/` kopiert).

## Bilder und Ausschnitte

Zu jedem Bild liegen drei Fassungen im selben Ordner:

| Datei             | Wofuer                                             |
| ----------------- | -------------------------------------------------- |
| `name.webp`       | volle Aufloesung, wird in der Grossansicht gezeigt |
| `name-thumb.webp` | kleine Fassung fuer schnelles Laden                |
| `name-crop.webp`  | fester 3:2-Ausschnitt fuer die Kachelraster        |

Alle Kacheln haben dasselbe Seitenformat — das ist der Unterschied zwischen
einem Raster und einem Haufen. Ob ein Bild die Kachel **fuellt** oder darin
**eingepasst** wird, entscheidet die Seite automatisch anhand des
Seitenverhaeltnisses:

- zwischen 1,15 und 2,2 (Fotos, Screenshots, Querformate) → gefuellt, also
  beschnitten
- alles andere (Plakate, Logos, Magazinseiten) → eingepasst mit Luft ringsum

Der Gedanke dahinter: Ein Foto darf man beschneiden, ein Plakat nicht — ein
angeschnittenes Plakat waere eine Falschaussage ueber die Arbeit. Die Grenzen
stehen in `src/scripts/lib/render.js` in der Funktion `passung()`.

Neue Ausschnitte erzeugen (laeuft bei `npm run import` automatisch mit):

```bash
npm run crops
```

## Design aendern

Alle Farben, Schriftgroessen und Abstaende stehen ganz oben in
`src/styles/main.css` unter `:root`. Zwei Dinge sind dort wichtig:

**Die Skalen.** Schriftgroessen (`--t--2` bis `--t-6`) und Abstaende (`--s-1`
bis `--s-11`) sind feste Stufen. Wenn du etwas groesser oder luftiger willst,
nimm die naechste Stufe statt einen Zwischenwert zu erfinden — sonst zerfaellt
der gemeinsame Massstab.

**Hell oder dunkel.** Die Seite steht auf hellem Papier, weil Druckarbeiten
darauf wirken wie an einer Galeriewand. Willst du zurueck auf dunkel, reichen
diese Werte:

```css
--paper: #0c0c0d;
--paper-sunk: #17171a;
--ink: #f0eee9;
--ink-soft: #a5a199;
--ink-dim: #75716a;
--rule: #26262a;
```

Die Akzentfarben musst du dann aufhellen, sonst verschwinden sie.

## Eigene Schrift einbinden

1. `.woff2`-Datei nach `public/fonts/` legen.
2. Oben in `src/styles/main.css` ergaenzen:

```css
@font-face {
  font-family: 'Meine Schrift';
  src: url('/fonts/meine-schrift.woff2') format('woff2');
  font-weight: 100 900;
  font-display: swap;
}
```

3. Bei `:root` eintragen: `--font: 'Meine Schrift', sans-serif;`

## Grosse Videos

Neun Videos waren zu gross fuer eine Webseite (bis zu 750 MB). Welche das sind
und wie du sie komprimierst, steht in [ASSETS-REPORT.md](ASSETS-REPORT.md).

## Veroeffentlichen

`npm run build` erzeugt `dist/`. Diesen Ordner kannst du bei Netlify oder
Vercel per Drag-and-drop hochladen.

Fuer GitHub Pages zusaetzlich in `vite.config.js` `base` auf `'/<repo-name>/'`
setzen. Beachte: `public/media/` steht in `.gitignore`, weil der Ordner rund
300 MB gross ist — fuer GitHub Pages musst du die Zeile entfernen oder die
Medien getrennt hochladen.
