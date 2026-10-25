const LATIN = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#%&*+=?';
const PERSIAN = 'ابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی۰۱۲۳۴۵۶۷۸۹';
const DURATION = 2000; // window in which characters lock in, in random order
const MIN_SCRAMBLE = 400; // every character stays scrambled at least this long
const TICK = 60;
const FLIP = 0.35; // chance an unlocked character changes on a given tick
const FADE = 220; // fade-in time for each newly shown character

const pick = (set) => set[Math.floor(Math.random() * set.length)];
const randomChar = () => (Math.random() < 0.5 ? pick(PERSIAN) : pick(LATIN));

// Each character gets its own slot, fixed to the width of its final glyph,
// so the scrambled text never changes the overall length.
const show = (slot, c) => {
  if (slot.textContent === c) return;
  slot.textContent = c;
  slot.animate([{ opacity: 0.1 }, { opacity: 1 }], { duration: FADE, easing: 'ease-out' });
};

const decipher = (el, delay = 0) => {
  const text = [...el.textContent];
  el.setAttribute('aria-label', el.textContent);

  el.textContent = '';
  const slots = text.map((c) => {
    if (c === ' ') return el.appendChild(document.createTextNode(' '));
    const slot = el.appendChild(document.createElement('span'));
    slot.className = 'slot';
    slot.textContent = c;
    return slot;
  });
  slots.forEach((slot) => {
    if (slot.nodeType === Node.ELEMENT_NODE) slot.style.width = `${slot.getBoundingClientRect().width}px`;
  });

  const lockAt = text.map(() => delay + MIN_SCRAMBLE + Math.random() * DURATION);
  const end = Math.max(...lockAt);
  text.forEach((c, i) => {
    if (c !== ' ') slots[i].textContent = randomChar();
  });

  const start = performance.now();
  let last = 0;

  const frame = (now) => {
    const elapsed = now - start;
    if (now - last >= TICK) {
      text.forEach((c, i) => {
        if (c === ' ') return;
        if (elapsed >= lockAt[i]) show(slots[i], c);
        // Unlocked characters flicker sporadically, sometimes landing on the real one for a moment.
        else if (Math.random() < FLIP) show(slots[i], Math.random() < 0.1 ? c : randomChar());
      });
      last = now;
    }
    if (elapsed < end) requestAnimationFrame(frame);
    // The last frame can land between ticks, so settle every slot explicitly.
    else text.forEach((c, i) => c !== ' ' && show(slots[i], c));
  };
  requestAnimationFrame(frame);
};

if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const targets = [document.querySelector('h1'), document.querySelector('.links a')];
  // Hide until the web fonts are in, so slot widths are measured with the final fonts.
  targets.forEach((el) => (el.style.visibility = 'hidden'));
  document.fonts.ready.then(() => {
    targets.forEach((el, i) => {
      decipher(el, i * 300);
      el.style.visibility = '';
    });
  });
}
