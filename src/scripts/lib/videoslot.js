/**
 * Reservierte Videoplaetze.
 *
 * Im HTML steht schon ein <video>. Kann der Browser die Quelle nicht laden,
 * ist die Datei noch nicht da — dann bleibt statt des schwarzen Kastens ein
 * leerer Rahmen stehen.
 */

export function initVideoSlots(selector = '[data-slot-video]') {
  document.querySelectorAll(selector).forEach((slot) => {
    const video = slot.querySelector('video');
    if (!video) return;

    const fehlt = () => {
      slot.classList.add('is-empty');
      video.hidden = true;
    };

    // Der error-Event feuert am <source>, nicht am <video>.
    video.querySelector('source')?.addEventListener('error', fehlt);
    video.addEventListener('error', fehlt);

    // Sicherheitsnetz: manche Browser melden nur ueber den Netzwerkstatus.
    video.addEventListener('loadedmetadata', () => {
      slot.classList.remove('is-empty');
      video.hidden = false;
    });
  });
}
