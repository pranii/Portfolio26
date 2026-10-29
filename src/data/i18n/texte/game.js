/**
 * Bereich Game in Englisch und Albanisch.
 *
 * Aufbau jeder Bereichsdatei:
 *   kategorie  Titel, Lead, Kurzbeschreibung im Menue und die Schritte
 *              unter "So gehe ich vor"
 *   projekte   je Projekt die uebersetzten Felder; `kapitel` folgt der
 *              Reihenfolge der Kapitel in der deutschen Datendatei
 *
 * Was hier fehlt, erscheint auf Deutsch.
 */

export const game = {
  slug: 'game',

  en: {
    kategorie: {
      title: 'Game',
      kurz: 'Games and game design.',
      lead: 'Games from game jams and seminars — Botlnick runs right in the browser.',
      schritte: [
        {
          title: 'Define the feel',
          text: 'Before anything is built, it has to be clear how the game should feel — eerie, playful, calm.',
        },
        {
          title: 'Build the world',
          text: 'The world is built in Blender — our own assets rather than bought ones, as many as the time allows.',
        },
        {
          title: 'Make it playable',
          text: 'Godot adds controls, logic and interaction. Even a grey prototype has to be fun.',
        },
        {
          title: 'Test and refine',
          text: 'Let others play, watch, improve — until difficulty and pace are right.',
        },
      ],
    },
    projekte: {
      'botlnick-gamejam': {
        subtitle: 'Four days of game jam — an exploration game in Godot',
        description:
          'Nick collects deposit bottles in an empty building and unlocks abilities with them in ' +
          'Godot. Made at the game jam with Prof. Christoph Müller and Julien Trübiger.',
        role: 'Game design, 3D, level design, documentation',
        pull: 'What others throw away is what the player needs.',
      },
      umakeitgram: {
        subtitle: 'Video game — final project “Media Counter-Cultures”',
        description:
          'A video game about an AI assistant “supporting” someone fresh out of school in ' +
          'building a social media career. At every fork you decide yourself — and the bar ' +
          'along the bottom keeps count.',
        role: 'Concept, story, game design',
        client: 'Furtwangen University, course “Media Counter-Cultures”',
        pull: 'You are the result of the experiment.',
      },
    },
  },

  sq: {
    kategorie: {
      title: 'Lojëra',
      kurz: 'Lojëra dhe dizajn lojërash.',
      lead: 'Lojëra nga game jam-e dhe seminare — Botlnick luhet drejtpërdrejt në shfletues.',
      schritte: [
        {
          title: 'Të përcaktohet ndjesia',
          text: 'Para se të ndërtohet çfarëdo gjëje, duhet të jetë e qartë si duhet të ndihet loja — e frikshme, lozonjare, e qetë.',
        },
        {
          title: 'Të ndërtohet bota',
          text: 'Bota ndërtohet në Blender — me asete tona në vend të të blerëve, aq sa lejon koha.',
        },
        {
          title: 'Të bëhet e luajtshme',
          text: 'Në Godot vijnë kontrollet, logjika dhe ndërveprimi. Edhe një prototip gri duhet të jetë kënaqësi.',
        },
        {
          title: 'Të testohet dhe të lëmohet',
          text: 'T’i lësh të tjerët të luajnë, t’i vëzhgosh, të përmirësosh — derisa vështirësia dhe ritmi të jenë në rregull.',
        },
      ],
    },
    projekte: {
      'botlnick-gamejam': {
        subtitle: 'Katër ditë game jam — një lojë eksplorimi në Godot',
        description:
          'Nick mbledh shishe depozite në një ndërtesë të zbraztë dhe me to zhbllokon aftësi, ' +
          'derisa gjen rrugën për të dalë. Lindi në game jam me Prof. Christoph Müller dhe ' +
          'Julien Trübiger.',
        role: 'Dizajn loje, 3D, dizajn nivelesh, dokumentim',
        pull: 'Ajo që të tjerët e hedhin, për lojëtarin ka vlerë.',
      },
      umakeitgram: {
        subtitle: 'Videolojë — punim përfundimtar „Kundërkultura mediatike"',
        description:
          'Një videolojë për një asistent me inteligjencë artificiale që „ndihmon" dikë sapo ' +
          'dalë nga shkolla të ndërtojë një karrierë në rrjete sociale. Në çdo udhëkryq vendos ' +
          'vetë — dhe shiriti poshtë numëron.',
        role: 'Koncept, histori, dizajn loje',
        client: 'Universiteti i Furtwangenit, lënda „Kundërkultura mediatike"',
        pull: 'Ti je rezultati i eksperimentit.',
      },
    },
  },
};
