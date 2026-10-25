// The scramble only uses letters from the name (Latin and Persian), digits and symbols.
const unique = (str) => [...new Set(str.replace(/\s/g, ''))].join('');
const LATIN = unique('AmirBNasari') + '1934#%&*+=?.';
const PERSIAN = unique('امیربهادرناساری') + '۱۳۷۲۴';
// Persian words that flash through the name, each in the slots of one English word.
const GHOST_WORDS = [
  { word: 'امیربهادر', over: 'middle' }, // centered across the name
  { word: 'ناساری', over: 2 }, // over "Nasari"
];
const DURATION = 2000; // window in which characters lock in, in random order
const MIN_SCRAMBLE = 400; // every character stays scrambled at least this long
const TICK = 60;
const FLIP = 0.35; // chance an unlocked character changes on a given tick
const FADE = 220; // fade-in time for each newly shown character
const GHOSTS = [150, 750]; // when a Persian word flashes through the slots, one per word
const GHOST_LENGTH = 140;

const pick = (set) => set[Math.floor(Math.random() * set.length)];
const randomChar = () => (Math.random() < 0.5 ? pick(PERSIAN) : pick(LATIN));

// Letters that never connect to the letter after them.
const NON_JOINING = 'اآدذرزژو';
const ZWJ = '‍';
const isPersian = (c) => /[؀-ۿ]/.test(c);

// Shape a Persian word letter by letter. Zero-width joiners give each letter its connected
// form even though it sits in its own slot. Returned in visual (left-to-right) order.
const shapeWord = (word) => {
  const w = [...word];
  return w
    .map((c, i) => {
      if (!isPersian(c)) return c;
      const before = i > 0 && isPersian(w[i - 1]) && !NON_JOINING.includes(w[i - 1]);
      const after = i < w.length - 1 && isPersian(w[i + 1]) && !NON_JOINING.includes(c);
      return (before ? ZWJ : '') + c + (after ? ZWJ : '');
    })
    .reverse();
};

// Pick the slots (character indices, spaces excluded) a ghost word covers. A number means the
// English word at that index, right-aligned since Persian reads right to left. 'middle' means
// the run of slots closest to the center of the whole text.
const targetSlots = (text, over, length) => {
  const letters = text.map((c, i) => (c === ' ' ? -1 : i)).filter((i) => i >= 0);
  if (over === 'middle') {
    const center = (text.length - 1) / 2;
    const mean = (run) => run.reduce((a, b) => a + b, 0) / run.length;
    let best = [];
    for (let s = 0; s + length <= letters.length; s++) {
      const run = letters.slice(s, s + length);
      if (!best.length || Math.abs(mean(run) - center) < Math.abs(mean(best) - center)) best = run;
    }
    return best;
  }
  const wordIndex = (i) => text.slice(0, i).filter((c) => c === ' ').length;
  const word = letters.filter((i) => wordIndex(i) === over);
  return word.length >= length ? word.slice(word.length - length) : [];
};

// One entry per character of `text`: the shaped Persian letter to show there, or null.
const ghostFor = (text, { word, over }) => {
  const shaped = shapeWord(word);
  const ghost = text.map(() => null);
  targetSlots(text, over, shaped.length).forEach((slot, i) => (ghost[slot] = shaped[i]));
  return ghost;
};

const shuffle = (items) => [...items].sort(() => Math.random() - 0.5);

const show = (slot, c) => {
  if (slot.textContent === c) return;
  slot.textContent = c;
  slot.animate([{ opacity: 0.1 }, { opacity: 1 }], { duration: FADE, easing: 'ease-out' });
};

// Each character gets its own slot, fixed to the width of its final glyph,
// so the scrambled text never changes the overall length. Resolves once the text has settled.
const decipher = (el, delay = 0, ghostWords = []) => new Promise((done) => {
  const text = [...el.textContent];
  el.setAttribute('aria-label', el.textContent);
  // One ghost word per flash, in random order.
  const ghosts = shuffle(ghostWords).map((g) => ghostFor(text, g));

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
  // A slot used by a ghost word stays unlocked until that word's flash is over.
  ghosts.forEach((ghost, k) =>
    ghost.forEach((g, i) => {
      if (g && GHOSTS[k] !== undefined) lockAt[i] = Math.max(lockAt[i], delay + GHOSTS[k] + GHOST_LENGTH + TICK);
    })
  );
  const end = Math.max(...lockAt);
  text.forEach((c, i) => {
    if (c !== ' ') slots[i].textContent = randomChar();
  });

  const ghostAt = (elapsed) =>
    ghosts[GHOSTS.findIndex((t) => elapsed >= delay + t && elapsed < delay + t + GHOST_LENGTH)];

  const start = performance.now();
  let last = 0;

  const frame = (now) => {
    const elapsed = now - start;
    if (now - last >= TICK) {
      const ghost = ghostAt(elapsed);
      text.forEach((c, i) => {
        if (c === ' ') return;
        if (elapsed >= lockAt[i]) show(slots[i], c);
        else if (ghost?.[i]) show(slots[i], ghost[i]);
        // Unlocked characters flicker sporadically, sometimes landing on the real one for a moment.
        else if (Math.random() < FLIP) show(slots[i], Math.random() < 0.1 ? c : randomChar());
      });
      last = now;
    }
    if (elapsed < end) requestAnimationFrame(frame);
    else {
      // The last frame can land between ticks, so settle every slot explicitly.
      text.forEach((c, i) => c !== ' ' && show(slots[i], c));
      done();
    }
  };
  requestAnimationFrame(frame);
});

// Slide an element into view out from behind the name. Its container clips it, so it appears
// from the container's edge next to the name: `up` for the role above, `down` for the email below.
const slideOut = (el, direction) => {
  el.style.visibility = '';
  const from = direction === 'up' ? '100%' : '-100%';
  el.animate(
    [{ transform: `translateY(${from})`, opacity: 0 }, { transform: 'none', opacity: 1 }],
    { duration: 1300, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
  );
};

if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const name = document.querySelector('h1');
  const email = document.querySelector('.links a');
  const role = document.querySelector('.role');
  // Hide until the web fonts are in, so slot widths are measured with the final fonts.
  [name, email, role].forEach((el) => (el.style.visibility = 'hidden'));
  document.fonts.ready.then(() => {
    name.style.visibility = '';
    decipher(name, 0, GHOST_WORDS).then(() => {
      slideOut(role, 'up');
      slideOut(email, 'down');
    });
  });
}
