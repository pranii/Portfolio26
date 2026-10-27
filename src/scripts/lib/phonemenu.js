/**
 * Das Menue — in zwei Fassungen, je nachdem wie viel Platz da ist.
 *
 *   breit    Alle Eintraege nebeneinander als Symbole in Kaesten, wie
 *            Programmsymbole auf einem Bildschirm.
 *   schmal   Immer nur ein Symbol, darueber und darunter ein Pfeil —
 *            wie das Menue eines Nokia 3310.
 *
 * Ohne JavaScript bleibt es eine normale Liste aus Links. Erst wenn
 * dieses Skript laeuft, bekommt das Menue die Klasse .is-ready.
 *
 * Geblaettert wird mit den Pfeil-Knoepfen, den Pfeiltasten (sobald das
 * Menue den Fokus hat) oder mit einem Wisch nach oben und unten. Hinter
 * dem letzten Eintrag geht es wieder von vorn los.
 */

const SCHMAL = '(max-width: 48rem)';

export function initPhoneMenu(root) {
  const items = [...(root?.querySelectorAll('.phone__item') ?? [])];
  if (items.length === 0) return;

  const screen = root.querySelector('.phone__screen');
  const list = root.querySelector('.phone__list');
  const schmal = window.matchMedia?.(SCHMAL);

  let einzeln = schmal?.matches ?? false;
  let aktuell = 0;

  function zeige(i) {
    aktuell = (i + items.length) % items.length;
    // Im Raster ist alles zu sehen; hervorgehoben wird trotzdem, damit
    // die Pfeiltasten eine sichtbare Spur hinterlassen.
    items.forEach((item, k) => item.classList.toggle('is-active', k === aktuell));
  }

  function setzeModus(istSchmal) {
    einzeln = istSchmal;
    root.classList.toggle('is-einzeln', istSchmal);
    root.classList.toggle('is-raster', !istSchmal);
    zeige(aktuell);
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

  // Wischen — im Einzelmodus nach oben und unten, so wie geblaettert wird.
  // Ein Wisch ist kein Klick, der Link darf dann nicht oeffnen.
  let start = null;
  let gewischt = false;

  list.addEventListener('pointerdown', (event) => {
    start = { x: event.clientX, y: event.clientY };
    gewischt = false;
  });

  list.addEventListener('pointerup', (event) => {
    if (!start || !einzeln) {
      start = null;
      return;
    }
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    start = null;
    if (Math.abs(dy) < 40 || Math.abs(dy) < Math.abs(dx)) return;
    gewischt = true;
    zeige(aktuell + (dy < 0 ? 1 : -1));
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

  schmal?.addEventListener?.('change', (ereignis) => setzeModus(ereignis.matches));

  root.classList.add('is-ready');
  setzeModus(einzeln);
}
