const LATIN = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#%&*+=?';
const PERSIAN = 'ابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی۰۱۲۳۴۵۶۷۸۹';
const ZWNJ = '‌'; // keeps adjacent Persian letters from joining
const DURATION = 1400;
const TICK = 45;

const pick = (set) => set[Math.floor(Math.random() * set.length)];
const randomChar = () => (Math.random() < 0.5 ? pick(PERSIAN) + ZWNJ : pick(LATIN));

const decipher = (el, delay = 0) => {
  const text = el.textContent;
  el.setAttribute('aria-label', text);

  // Each character locks in at a staggered time, left to right with some jitter.
  const revealAt = [...text].map((_, i) =>
    delay + (i / text.length) * DURATION * 0.75 + Math.random() * DURATION * 0.25
  );

  const scramble = (elapsed) =>
    [...text].map((c, i) => (c === ' ' || elapsed >= revealAt[i] ? c : randomChar())).join('');

  el.textContent = scramble(0);
  const start = performance.now();
  let last = 0;

  const frame = (now) => {
    const elapsed = now - start;
    if (now - last >= TICK) {
      el.textContent = scramble(elapsed);
      last = now;
    }
    if (elapsed < delay + DURATION) requestAnimationFrame(frame);
    else el.textContent = text;
  };
  requestAnimationFrame(frame);
};

if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  decipher(document.querySelector('h1'));
  decipher(document.querySelector('.links a'), 300);
}
