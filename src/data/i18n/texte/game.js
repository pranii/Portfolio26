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
        description:
          'A real underground car park, scanned with photogrammetry and made walkable in ' +
          'Godot. Made at the game jam with Prof. Christoph Müller and Julien Trübiger.',
        role: 'Game design, 3D, level design, documentation',
        pull: 'An underground car park, scanned and made walkable.',
        kapitel: [
          {
            title: 'An underground car park',
            text:
              'A game jam gives you little time and no safety. Instead of inventing a world we ' +
              'brought one along: a car park, scanned and made walkable. Places like it are ' +
              'liminal spaces — you are always only on your way somewhere else, never arrived. ' +
              'It started with moodboards for style, cutscenes, key objects and comedic relief: ' +
              'the tone had to be able to tip between eerie and silly.',
          },
          {
            title: 'From scan to room',
            text:
              'The car park came out of Polycam as a photogrammetry scan and was cleaned up in ' +
              'Blender — closing holes, reducing geometry until Godot could carry it. Then the ' +
              'figures: main and side character, reference sheets, the set design. The PSX look is ' +
              'not a filter but the result — low resolution and hard edges hide exactly what a ' +
              'scan cannot give you.',
          },
          {
            title: 'Going in',
            text:
              'The car park can be entered at the top of this page — WASD to walk, mouse to ' +
              'look, Esc gives the pointer back. The documentation holds the whole path, from ' +
              'finding the idea through setting and mechanics to post-production of the scans.',
          },
        ],
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
          text: 'Vende reale skanohen me fotogrametri dhe bëhen hapësira të luajtshme në Blender.',
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
        subtitle: 'Game jam — Godot, Blender, fotogrametri',
        description:
          'Një parking nëntokësor i vërtetë, i skanuar me fotogrametri dhe i bërë i kalueshëm ' +
          'në Godot. Lindi në game jam me Prof. Christoph Müller dhe Julien Trübiger.',
        role: 'Dizajn loje, 3D, dizajn nivelesh, dokumentim',
        pull: 'Një parking nëntokësor, i skanuar dhe i bërë i kalueshëm.',
        kapitel: [
          {
            title: 'Një parking nëntokësor',
            text:
              'Një game jam të jep pak kohë dhe asnjë siguri. Në vend që të shpiknim një botë, ' +
              'morëm një me vete: një parking, i skanuar dhe i bërë i kalueshëm. Vende të tilla ' +
              'janë hapësira kalimtare — aty je gjithmonë vetëm rrugës diku tjetër, kurrë i ' +
              'arritur. Në fillim ishin moodboard-et për stilin, cutscene-t, objektet kyçe dhe ' +
              'çlirimin komik: toni duhej të anonte mes të llahtarshmes dhe qesharakes.',
          },
          {
            title: 'Nga skanimi te hapësira',
            text:
              'Parkingu erdhi si skanim fotogrametrik nga Polycam dhe u përpunua në Blender — ' +
              'mbyllje vrimash, pakësim gjeometrie, derisa Godot mundi ta mbante. Pastaj ' +
              'figurat: personazhi kryesor dhe ai dytësor, fletët e referencës, skenografia. ' +
              'Pamja PSX nuk është filtër, por rezultat — rezolucioni i ulët dhe tehet e forta ' +
              'fshehin pikërisht atë që një skanim nuk e jep.',
          },
          {
            title: 'Hyrja brenda',
            text:
              'Parkingu mund të shkelet lart në këtë faqe — WASD për të ecur, miu për të parë ' +
              'rreth e rrotull, Esc e kthen kursorin. Dokumentimi e mban tërë rrugën, nga ' +
              'gjetja e idesë te ambienti, mekanika dhe përpunimi i skanimeve.',
          },
        ],
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
