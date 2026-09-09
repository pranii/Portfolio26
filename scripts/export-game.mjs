/**
 * Baut BOTLNICK aus dem Godot-Projekt neu und legt den Web-Export unter
 * public/spiel/botlnick/ ab.
 *
 *   npm run export:spiel
 *
 * Voraussetzungen (einmalig):
 *   1. Godot 4.7 unter GODOT_EXE (siehe unten)
 *   2. Export-Templates fuer 4.7 installiert
 *      (Godot oeffnen → Editor → Export-Templates verwalten → herunterladen)
 *   3. Im Godot-Projekt ein Export-Preset namens "Web"
 *
 * Wichtig: Das Preset nutzt export_filter="scenes" und listet nur die fuenf
 * Szenen, die das Spiel tatsaechlich durchlaeuft. Mit "all_resources" waere
 * der Export 1,6 GB statt 91 MB, weil dann das komplette Asset-Archiv
 * mitwandert — auch die 4K-Texturen, die nie im Spiel auftauchen.
 */

import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const ROOT = path.resolve(import.meta.dirname, '..');

const GODOT_EXE = process.env.GODOT_EXE ?? 'C:/Users/pranv/Desktop/Godot_v4.7-stable_win64.exe';
const GAME_PROJECT = process.env.GODOT_PROJECT ?? 'C:/Users/pranv/Documents/GitHub/Pre-Flight';
const PRESET = 'Web';
const OUT_DIR = path.join(ROOT, 'public', 'spiel', 'botlnick');

function fehler(text) {
  console.error('\n' + text + '\n');
  process.exit(1);
}

if (!fs.existsSync(GODOT_EXE)) {
  fehler(
    `Godot nicht gefunden: ${GODOT_EXE}\nSetze die Umgebungsvariable GODOT_EXE auf den richtigen Pfad.`,
  );
}
if (!fs.existsSync(path.join(GAME_PROJECT, 'project.godot'))) {
  fehler(`Kein Godot-Projekt unter: ${GAME_PROJECT}\nSetze GODOT_PROJECT auf den richtigen Pfad.`);
}

fs.rmSync(OUT_DIR, { recursive: true, force: true });
fs.mkdirSync(OUT_DIR, { recursive: true });

console.log(`Exportiere "${PRESET}" aus ${GAME_PROJECT} …`);

const ergebnis = spawnSync(
  GODOT_EXE,
  [
    '--headless',
    '--path',
    GAME_PROJECT,
    '--export-release',
    PRESET,
    path.join(OUT_DIR, 'index.html'),
  ],
  { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 },
);

const ausgabe = (ergebnis.stdout ?? '') + (ergebnis.stderr ?? '');

if (ergebnis.status !== 0 || /export.*failed|configuration errors/i.test(ausgabe)) {
  const zeilen = ausgabe
    .split('\n')
    .filter((z) => /ERROR|WARNING: Could|failed/i.test(z) && !/UID duplicate/i.test(z))
    .slice(0, 12);
  fehler('Export fehlgeschlagen:\n' + (zeilen.join('\n') || ausgabe.slice(-1500)));
}

const dateien = fs.readdirSync(OUT_DIR);
if (!dateien.includes('index.wasm') || !dateien.includes('index.pck')) {
  fehler(`Export unvollstaendig. Im Ordner liegen nur: ${dateien.join(', ')}`);
}

const bytes = dateien.reduce((summe, f) => summe + fs.statSync(path.join(OUT_DIR, f)).size, 0);
const mb = Math.round(bytes / 1024 / 1024);

console.log(`\nFertig — ${dateien.length} Dateien, ${mb} MB in public/spiel/botlnick/`);
console.log('Trag die Groesse in src/data/site.js unter spiel.groesseMB ein,');
console.log('damit die Startkarte den richtigen Wert nennt.');

if (mb > 150) {
  console.log(
    '\nAchtung: ueber 150 MB. Pruefe im Godot-Preset, ob export_filter auf "scenes"\n' +
      'steht und nur die benoetigten Szenen gelistet sind.',
  );
}
