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
      lead: 'Games from game jams and seminars — Botlnick runs straight in the browser.',
      schritte: [
        {
          title: 'Define the feel',
          text: 'Before anything is built, it is clear how the game should feel — eerie, playful, calm.',
        },
        {
          title: 'Build the world',
          text: 'Real places are scanned by photogrammetry and turned into playable rooms in Blender.',
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
        subtitle: 'Game jam — Godot, Blender, photogrammetry',
        description: 'Made during a game jam with Prof. Christoph Müller and Julien Trübinger.',
        role: 'Game design, 3D, level design, documentation',
        pull: 'An underground car park, scanned and made walkable.',
        kapitel: [
          {
            title: 'Finding the idea',
            text:
              'It started with moodboards for style, cutscenes, key objects and comedic relief — ' +
              'the tone had to be able to tip between eerie and silly.',
          },
          {
            title: 'Documentation',
            text:
              'The submitted documentation holds the whole path — from finding the idea through ' +
              'setting and mechanics to post-production of the scans.',
          },
        ],
      },
      umakeitgram: {
        subtitle: 'Video game — final project “Media Counter-Cultures”',
        description:
          'uMakeItGram is a video game about an AI assistant “supporting” someone fresh out of ' +
          'school in building a social media career — and taking over step by step.',
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
          text: 'Para se të ndërtohet, dihet si duhet të ndihet loja — e frikshme, lozonjare, e qetë.',
        },
        {
          title: 'Të ndërtohet bota',
          text: 'Vende reale skanohen me fotogrametri dhe bëhen hapësira të luajtshme në Blender.',
        },
        {
          title: 'Të bëhet e luajtshme',
          text: 'Në Godot vijnë kontrollet, logjika dhe ndërveprimi. Edhe një prototip gri duhet të jetë kënaqësi.',
        },
        {
          title: 'Të testohet dhe të lëmohet',
          text: 'T’i lësh të tjerët të luajnë, t’i vëzhgosh, të përmirësosh — derisa vështirësia dhe ritmi janë në rregull.',
        },
      ],
    },
    projekte: {
      'botlnick-gamejam': {
        subtitle: 'Game jam — Godot, Blender, fotogrametri',
        description: 'Krijuar gjatë një game jam-i me Prof. Christoph Müller dhe Julien Trübinger.',
        role: 'Dizajn loje, 3D, dizajn nivelesh, dokumentim',
        pull: 'Një parking nëntokësor, i skanuar dhe i bërë i shkelshëm.',
        kapitel: [
          {
            title: 'Gjetja e idesë',
            text:
              'Në fillim ishin moodboard-et për stilin, cutscene-t, objektet kyçe dhe lehtësimin ' +
              'komik — toni duhej të mund të anonte mes së frikshmes dhe së marrës.',
          },
          {
            title: 'Dokumentimi',
            text:
              'Dokumentimi i dorëzuar mban tërë rrugën — nga gjetja e idesë te ambienti dhe ' +
              'mekanika, deri te përpunimi i skanimeve.',
          },
        ],
      },
      umakeitgram: {
        subtitle: 'Videolojë — punim përfundimtar „Kundërkultura mediatike"',
        description:
          'uMakeItGram është një videolojë për mënyrën si një asistent me inteligjencë artificiale ' +
          '„ndihmon" një të ri sapo dalë nga shkolla të ndërtojë një karrierë në rrjete sociale — ' +
          'dhe hap pas hapi merr kontrollin.',
        role: 'Koncept, histori, dizajn loje',
        client: 'Universiteti i Furtwangenit, lënda „Kundërkultura mediatike"',
        pull: 'Ti je rezultati i eksperimentit.',
      },
    },
  },
};
