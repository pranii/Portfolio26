/**
 * Boot-Screen beim ersten Laden der Startseite: Opener-GIF im
 * Hintergrund, Titel blendet nach 0,4s ein, Unterzeile nach 0,8s und
 * blinkt dazu mit einem kurzen Signalton. Nach 2s verschwindet der
 * Launcher und gibt die Startseite frei.
 */

function beep(freq = 1400, duration = 0.05) {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
    osc.onended = () => ctx.close();
  } catch {
    // Autoplay-Richtlinien koennen Ton vor der ersten Interaktion blockieren —
    // der Launcher laeuft dann stumm weiter, das ist kein Fehler.
  }
}

export function initLauncher(selector = '[data-slot="launcher"]') {
  const launcher = document.querySelector(selector);
  if (!launcher) return;

  const title = launcher.querySelector('.launcher__title');
  const subtitle = launcher.querySelector('.launcher__subtitle');
  const timers = [];

  document.documentElement.classList.add('launcher-active');

  const finish = () => {
    timers.forEach((id) => {
      clearTimeout(id);
      clearInterval(id);
    });
    launcher.classList.add('is-leaving');
    document.documentElement.classList.remove('launcher-active');
    setTimeout(() => launcher.remove(), 400);
  };

  timers.push(setTimeout(() => title.classList.add('is-visible'), 400));

  timers.push(
    setTimeout(() => {
      subtitle.classList.add('is-visible');
      let on = true;
      beep();
      const blink = setInterval(() => {
        on = !on;
        subtitle.style.opacity = on ? '1' : '0.1';
        if (on) beep();
      }, 220);
      timers.push(blink);
    }, 800),
  );

  timers.push(setTimeout(finish, 2000));

  // Ungeduldige Besucher koennen den Boot-Screen ueberspringen.
  launcher.addEventListener('click', finish, { once: true });
}
