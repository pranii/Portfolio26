import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  /**
   * Unterverzeichnis, unter dem die Seite laeuft.
   *
   * GitHub Pages veroeffentlicht ein Repo namens "portfolio" unter
   * https://<benutzername>.github.io/portfolio/ — deshalb muss der Name hier
   * stehen, sonst suchen Skripte, Stylesheet und Bilder an der falschen Stelle.
   *
   * Benennst du das Repository um, musst du diese Zeile mitaendern.
   * Fuer lokales Arbeiten (npm run dev) wird sie ignoriert.
   */
  // configure-pages liefert "/portfolio" ohne Schraegstrich am Ende,
  // Vite braucht ihn aber — deshalb hier ergaenzen.
  base: (process.env.BASE_PATH ?? '/portfolio').replace(/\/?$/, '/'),
  server: {
    open: true,
    host: true,
    watch: {
      /**
       * Medien und Spiel-Build von der Dateiueberwachung ausnehmen.
       *
       * In public/ liegen rund 400 MB: ueber tausend Bilder, dazu Videos und
       * der 91 MB grosse Godot-Export.
       *
       * Ausgenommen werden nur Videos und der Spiel-Export. Bilder bleiben
       * bewusst unter Beobachtung: Vite liefert Dateien aus public/ nur aus,
       * wenn es sie kennt — nimmt man den ganzen Ordner aus der Ueberwachung,
       * erscheinen neu importierte Bilder erst nach einem Serverneustart.
       */
      ignored: [
        // Nur die Videos ausnehmen: Unter Windows bricht der Server mit EBUSY
        // ab, sobald eine Videodatei gerade von einem anderen Programm
        // gehalten wird (Virenscanner, Vorschau, Kopiervorgang).
        '**/public/media/**/*.{mov,mp4,m4v,webm}',
        // Der Godot-Export ist 91 MB und aendert sich nur beim Neubauen.
        '**/public/spiel/**',
        '**/dist/**',
      ],
    },
  },
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        index: resolve(import.meta.dirname, 'index.html'),
        arbeit: resolve(import.meta.dirname, 'arbeit.html'),
        freizeit: resolve(import.meta.dirname, 'freizeit.html'),
        uni: resolve(import.meta.dirname, 'uni.html'),
        projekt: resolve(import.meta.dirname, 'projekt.html'),
        spiel: resolve(import.meta.dirname, 'spiel.html'),
      },
    },
  },
});
