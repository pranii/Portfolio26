/**
 * Menue wie beim Nokia 3310: immer nur ein Eintrag sichtbar — Symbol,
 * Name, Unterzeile —, links und rechts die Pfeile zum Blaettern.
 *
 * Ohne JavaScript bleibt es eine normale Liste aus Links. Erst wenn dieses
 * Skript laeuft, bekommt das Menue die Klasse .is-ready und zeigt nur noch
 * den aktiven Eintrag.
 *
 * Blaettern: Pfeil-Knoepfe, Pfeiltasten (sobald das Menue den Fokus hat)
 * oder Wischen. Hinter dem letzten Eintrag geht es wieder von vorn los.
 */

export function initPhoneMenu(root) {
  const items = [...(root?.querySelectorAll('.phone__item') ?? [])];
  if (items.length === 0) return;

  const screen = root.querySelector('.phone__screen');
  const list = root.querySelector('.phone__list');
  let aktuell = 0;

  function zeige(i) {
    aktuell = (i + items.length) % items.length;
    items.forEach((item, k) => item.classList.toggle('is-active', k === aktuell));
  }

  root.querySelector('[data-menu="prev"]').addEventListener('click', () => zeige(aktuell - 1));
  root.querySelector('[data-menu="next"]').addEventListener('click', () => zeige(aktuell + 1));

  screen.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') zeige(aktuell - 1);
    else if (event.key === 'ArrowRight' || event.key === 'ArrowDown') zeige(aktuell + 1);
    else if (event.key === 'Enter' && event.target === screen)
      items[aktuell].querySelector('.phone__link').click();
    else return;
    event.preventDefault();
  });

  // Wischen. Ein Wisch ist kein Klick — der Link darf dann nicht oeffnen.
  let start = null;
  let gewischt = false;
  list.addEventListener('pointerdown', (event) => {
    start = { x: event.clientX, y: event.clientY };
    gewischt = false;
  });
  list.addEventListener('pointerup', (event) => {
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    start = null;
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
    gewischt = true;
    zeige(aktuell + (dx < 0 ? 1 : -1));
  });
  list.addEventListener(
    'click',
    (event) => {
      if (!gewischt) return;
      event.preventDefault();
      event.stopPropagation();
      gewischt = false;
    },
    true,
  );
  // Bilder und Links nicht als Ganzes wegziehen lassen, sonst schluckt der
  // Browser die Wischgeste.
  list.addEventListener('dragstart', (event) => event.preventDefault());

  root.classList.add('is-ready');
  zeige(0);
}
