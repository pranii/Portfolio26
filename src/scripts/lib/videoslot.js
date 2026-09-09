/**
 * Reservierte Videoplaetze.
 *
 * Im HTML steht schon ein <video>. Kann der Browser die Quelle nicht laden,
 * ist die Datei noch nicht da — dann zeigen wir statt des schwarzen Kastens
 * einen beschrifteten Rahmen mit dem erwarteten Dateinamen.
 */

export function initVideoSlots(selector = '[data-slot-video]') {
  document.querySelectorAll(selector).forEach((slot) => {
    const video = slot.querySelector('video');
    const note = slot.querySelector('.slot__note');
    if (!video || !note) return;

    const fehlt = () => {
      slot.classList.add('is-empty');
      video.hidden = true;
      note.hidden = false;
    };

    // Der error-Event feuert am <source>, nicht am <video>.
    video.querySelector('source')?.addEventListener('error', fehlt);
    video.addEventListener('error', fehlt);

    // Sicherheitsnetz: manche Browser melden nur ueber den Netzwerkstatus.
    video.addEventListener('loadedmetadata', () => {
      slot.classList.remove('is-empty');
      note.hidden = true;
      video.hidden = false;
    });
  });
}
