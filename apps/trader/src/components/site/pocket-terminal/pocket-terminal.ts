/**
 * The pinned scroll story of "The same terminal in your pocket." (PocketTerminal.tsx, pocket-terminal.css).
 * Progress p runs 0 → 1 while the 320vh section (260vh on phones) scrolls past its sticky 100svh stage:
 *   0 → .16  the head fades up and blurs out
 *   0 → .28  the phone rises from 72 % of the viewport to its place under the nav, scale .92 → 1
 *   .26 → .88 the screen scrolls each page to its exact bottom, sliding sideways to the next one
 *   notes    slide in from the sides at their data-in window (phones: drop in from the top, data-in-m / data-out-m)
 *   .88 → 1  hold, then the section unpins
 * Scroll-linked only (no time-based animation), transform / opacity / filter only. Framework-agnostic: returns its
 * own cleanup. Reduced motion: nothing pins or moves (class is-static).
 */
export function initPocketTerminal(root: HTMLElement | null): () => void {
  if (!root) return () => {};
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    root.classList.add('is-static');
    return () => root.classList.remove('is-static');
  }
  root.classList.add('is-js');

  const q = <T extends HTMLElement>(s: string) => root.querySelector<T>(s);
  const head = q('[data-pt="head"]');
  const device = q('[data-pt="device"]');
  const pagesEl = q('[data-pt="pages"]');
  if (!head || !device) return () => root.classList.remove('is-js');
  const pages = [...root.querySelectorAll<HTMLElement>('.pt-page')];
  const tracks = pages.map((p) => p.querySelector<HTMLElement>('.pt-page-track')!);
  const notes = [...root.querySelectorAll<HTMLElement>('[data-pt-note]')];
  const mobile = matchMedia('(max-width: 767px)');

  const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
  const range = (v: number, a: number, b: number) => clamp01((v - a) / (b - a));
  const ease = (t: number) => 1 - Math.pow(1 - t, 3);
  const win = (s?: string) => (s ? s.split(',').map(Number) : null);
  // Lenis already smooths the page scroll (Motion.tsx), so follow it more tightly
  const follow = () => (document.documentElement.classList.contains('lenis') ? 0.3 : 0.14);

  let maxScroll: number[] = [];
  let startY = 0;
  let target = 0;
  let current = 0;
  let raf = 0;
  let active = false;

  function measure() {
    maxScroll = pages.map((p, i) => Math.max(0, tracks[i].scrollHeight - p.clientHeight));
    startY = Math.max(0, innerHeight * (mobile.matches ? 0.7 : 0.72) - device!.offsetTop);
  }

  function readTarget() {
    const r = root!.getBoundingClientRect();
    const total = r.height - innerHeight;
    target = total > 0 ? clamp01(-r.top / total) : 0;
  }

  function render(p: number) {
    // 1. the head out
    const h = ease(range(p, 0, 0.16));
    head!.style.opacity = String(1 - h);
    head!.style.transform = `translate3d(0, ${-60 * h}px, 0)`;
    head!.style.filter = h > 0 ? `blur(${6 * h}px)` : '';
    head!.style.pointerEvents = h > 0.5 ? 'none' : '';

    // 2. the phone rises
    const d = ease(range(p, 0, 0.28));
    device!.style.transform = `translate3d(-50%, ${startY * (1 - d)}px, 0) scale(${0.92 + 0.08 * d})`;

    // 3. the screen scrolls (+ slides sideways between screens)
    const n = pages.length;
    const a = 0.26;
    const b = 0.88;
    const seg = (b - a) / Math.max(1, n);
    let x = 0;
    pages.forEach((_, i) => {
      const t = range(p, a + seg * i, a + seg * (i + 1));
      const last = i === n - 1;
      const s = last ? t : range(t, 0, 0.8);
      tracks[i].style.transform = `translate3d(0, ${-maxScroll[i] * s}px, 0)`;
      if (!last) x += ease(range(t, 0.8, 1));
    });
    if (pagesEl) pagesEl.style.transform = `translate3d(${-x * 100}%, 0, 0)`;
    // the tab bar marks the screen in view
    const shown = String(Math.round(x));
    if (root!.dataset.ptPage !== shown) root!.dataset.ptPage = shown;

    // 4. the notification cards
    const m = mobile.matches;
    notes.forEach((el) => {
      const inW = win(m ? el.dataset.inM : el.dataset.in);
      if (!inW) {
        el.style.visibility = 'hidden';
        return;
      }
      const outW = win(m ? el.dataset.outM : el.dataset.out);
      let v = ease(range(p, inW[0], inW[1]));
      if (outW) v *= 1 - ease(range(p, outW[0], outW[1]));
      const off = 64 * (1 - v);
      const from = m ? 'top' : el.dataset.from;
      const tr = from === 'top' ? `translate3d(-50%, ${-off * 0.6}px, 0)` : `translate3d(${from === 'right' ? off : -off}px, 0, 0)`;
      el.style.transform = `${tr} scale(${0.96 + 0.04 * v})`;
      el.style.opacity = String(v);
      el.style.visibility = v > 0.001 ? 'visible' : 'hidden';
    });
  }

  function loop() {
    current += (target - current) * follow();
    if (Math.abs(target - current) < 0.0005) current = target;
    render(current);
    raf = current === target ? 0 : requestAnimationFrame(loop);
  }

  function onScroll() {
    if (!active) return;
    readTarget();
    if (!raf) raf = requestAnimationFrame(loop);
  }

  function refresh() {
    measure();
    readTarget();
    current = target;
    render(current);
  }

  const io = new IntersectionObserver(
    ([e]) => {
      active = e.isIntersecting;
      if (active) refresh();
    },
    { rootMargin: '200px 0px' },
  );
  const ro = new ResizeObserver(refresh);

  io.observe(root);
  ro.observe(root);
  tracks.forEach((t) => ro.observe(t));
  addEventListener('scroll', onScroll, { passive: true });
  mobile.addEventListener('change', refresh);
  refresh();

  return () => {
    cancelAnimationFrame(raf);
    io.disconnect();
    ro.disconnect();
    removeEventListener('scroll', onScroll);
    mobile.removeEventListener('change', refresh);
    root.classList.remove('is-js');
  };
}
