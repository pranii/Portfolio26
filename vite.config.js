import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  // Fuer GitHub Pages hier auf '/<repo-name>/' setzen.
  base: './',
  server: {
    open: true,
    host: true,
    watch: {
      /**
       * Medien und Spiel-Build von der Dateiueberwachung ausnehmen.
       *
       * In public/ liegen rund 400 MB: ueber tausend Bilder, dazu Videos und
       * der 91 MB grosse Godot-Export. Vite versucht sonst, jede dieser
       * Dateien einzeln zu ueberwachen. Unter Windows bricht der Server
       * dabei mit EBUSY ab, sobald eine Videodatei gerade von einem anderen
       * Programm gehalten wird (Virenscanner, Vorschau, Kopiervorgang).
       *
       * Es sind ohnehin statische Dateien — sie brauchen kein Neuladen.
       * Neue Bilder erscheinen nach einem normalen Seiten-Refresh.
       */
      ignored: ['**/public/media/**', '**/public/spiel/**', '**/dist/**'],
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
