'use client';

import { useEffect, useRef } from 'react';

/**
 * The page background: ONE fixed, full-viewport canvas of tiny arrows on the bright royal-blue gradient, behind
 * every section between the hero and the footer (both are opaque and simply cover it). The arrows turn away from
 * the pointer and swell; a click anywhere sends a ring out through the field; on their own they shimmer slowly.
 * Cheap on purpose: DPR capped at 2, one requestAnimationFrame loop that sleeps when the tab is hidden, while an
 * opaque block (the hero, [data-cover]) fills the viewport, and after a few idle seconds; reduced motion = static.
 */
const TAU = Math.PI * 2;
const ease = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
const wrap = (a: number) => {
  let r = (((a + Math.PI) % TAU) + TAU) % TAU - Math.PI;
  if (r === -Math.PI) r = Math.PI;
  return r;
};
function seeded(seed: number) {
  let s = seed >>> 0 || 1;
  return () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    return ((s >>> 0) % 100000) / 100000;
  };
}
function sprite(color: string, cell: number, dpr: number) {
  const c = document.createElement('canvas');
  const px = Math.ceil(cell * dpr * 2);
  c.width = c.height = px;
  const g = c.getContext('2d');
  if (!g) return c;
  g.scale(px / cell, px / cell);
  g.strokeStyle = color;
  g.lineWidth = Math.max(1.05, cell * 0.1);
  g.lineCap = 'square';
  const m = cell / 2;
  const h = cell * 0.3;
  g.beginPath();
  g.moveTo(m - h, m + h);
  g.lineTo(m + h, m - h);
  g.moveTo(m - h * 0.1, m - h);
  g.lineTo(m + h, m - h);
  g.lineTo(m + h, m + h * 0.1);
  g.stroke();
  return c;
}

export function FieldBackdrop({ cell = 13 }: { cell?: number }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const cvRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const cv = cvRef.current;
    const ctx = cv?.getContext('2d');
    if (!box || !cv || !ctx) return;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let W = 1;
    let H = 1;
    let dpr = 1;
    let n = 0;
    let X = new Float32Array(0);
    let Y = new Float32Array(0);
    let WL = new Float32Array(0);
    let WD = new Float32Array(0);
    let GR = new Float32Array(0);
    let ROT = new Float32Array(0);
    let SC = new Float32Array(0);
    let sL: HTMLCanvasElement | null = null;
    let sD: HTMLCanvasElement | null = null;
    const ptr = { x: 0, y: 0, in: false };
    const rings: { x: number; y: number; t: number }[] = [];
    let raf = 0;
    let lastInput = performance.now();
    const half = cell / 2;

    const build = () => {
      W = Math.max(1, window.innerWidth);
      H = Math.max(1, window.innerHeight);
      dpr = Math.min(2, window.devicePixelRatio || 1);
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      cv.style.width = `${W}px`;
      cv.style.height = `${H}px`;
      const cols = Math.ceil(W / cell) + 1;
      const rows = Math.ceil(H / cell) + 1;
      n = cols * rows;
      X = new Float32Array(n);
      Y = new Float32Array(n);
      WL = new Float32Array(n);
      WD = new Float32Array(n);
      GR = new Float32Array(n);
      ROT = new Float32Array(n);
      SC = new Float32Array(n).fill(1);
      const ox = (W - (cols - 1) * cell) / 2;
      const oy = (H - (rows - 1) * cell) / 2;
      const rnd = seeded(cols * 7919 + rows * 104729);
      let k = 0;
      for (let j = 0; j < rows; j++)
        for (let i = 0; i < cols; i++, k++) {
          const x = ox + i * cell;
          const y = oy + j * cell;
          const u = x / W;
          const v = y / H;
          // light arrows build up towards the brighter lower half; darker blue ones carry the navy top
          const edge = 0.55 + 0.45 * ease(0, 0.35, Math.min(u, 1 - u));
          X[k] = x;
          Y[k] = y;
          WL[k] = (0.2 + 0.3 * ease(0.1, 1, v)) * edge;
          WD[k] = (0.22 * (1 - ease(0.3, 0.9, v)) + 0.08) * edge;
          GR[k] = 0.4 + 0.6 * rnd();
        }
      sL = sprite('#e6edff', cell, dpr);
      sD = sprite('#1f3fd6', cell, dpr);
    };

    /** true while an opaque block (the hero) covers the whole viewport: nothing of the field is visible */
    const covered = () => {
      for (const el of Array.from(document.querySelectorAll<HTMLElement>('[data-cover]'))) {
        const r = el.getBoundingClientRect();
        if (r.top <= 0 && r.bottom >= window.innerHeight) return true;
      }
      return false;
    };

    const paint = (now: number) => {
      if (!sL || !sD) return false;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, cv.width, cv.height);
      for (let q = rings.length - 1; q >= 0; q--) if (now - rings[q].t > 2000) rings.splice(q, 1);
      const R = 160;
      let busy = rings.length > 0;
      for (let i = 0; i < n; i++) {
        const wl = WL[i];
        const wd = WD[i];
        const sum = wl + wd;
        const x = X[i];
        const y = Y[i];
        let rot = 0;
        let sc = 1;
        let lift = 0;
        if (!still) {
          if (ptr.in) {
            const dx = x - ptr.x;
            const dy = y - ptr.y;
            const d = Math.hypot(dx, dy);
            if (d < R) {
              const w = ease(0, 1, 1 - d / R);
              rot = wrap(Math.atan2(dy, dx) + Math.PI / 4) * w;
              sc = 1 + 0.8 * w;
              lift = 0.6 * w;
            }
          }
          for (const g of rings) {
            const age = now - g.t;
            const off = Math.abs(Math.hypot(x - g.x, y - g.y) - age * 0.6);
            if (off < 60) {
              const k = (1 - off / 60) * (1 - age / 2000);
              sc += 0.9 * k;
              lift += 0.7 * k;
              rot += wrap(Math.atan2(y - g.y, x - g.x) + Math.PI / 4) * k * 0.6;
            }
          }
          ROT[i] += (rot - ROT[i]) * 0.12;
          SC[i] += (sc - SC[i]) * 0.16;
          if (Math.abs(ROT[i] - rot) > 0.004 || Math.abs(SC[i] - sc) > 0.004) busy = true;
        }
        const glint = still ? 1 : 0.78 + 0.22 * Math.sin((x * 1.1 + y * 0.7) * 0.011 - now * 0.0011);
        const g = GR[i] * glint;
        const aL = Math.min(1, wl * g + lift * (wl / sum) * 0.9);
        const aD = Math.min(1, wd * g + lift * (wd / sum) * 0.6);
        const a = ROT[i];
        const s = SC[i];
        if (Math.abs(a) < 0.003 && Math.abs(s - 1) < 0.003) ctx.setTransform(dpr, 0, 0, dpr, dpr * x, dpr * y);
        else {
          const c = Math.cos(a) * s * dpr;
          const sn = Math.sin(a) * s * dpr;
          ctx.setTransform(c, sn, -sn, c, dpr * x, dpr * y);
        }
        if (aD > 0.01) {
          ctx.globalAlpha = aD;
          ctx.drawImage(sD, -half, -half, cell, cell);
        }
        if (aL > 0.01) {
          ctx.globalAlpha = aL;
          ctx.drawImage(sL, -half, -half, cell, cell);
        }
      }
      ctx.globalAlpha = 1;
      return busy;
    };

    // whether an opaque block covers the screen is read on scroll / resize only (never per frame: no forced layout)
    let hidden = covered();
    let built = false;
    const ensure = () => {
      if (built) return;
      built = true;
      build();
      paint(performance.now());
    };
    const loop = (t: number) => {
      raf = 0;
      if (document.hidden || hidden) return;
      const busy = paint(t);
      // keep shimmering while the visitor is active; fall asleep after 6 idle seconds
      if (busy || t - lastInput < 6000) raf = requestAnimationFrame(loop);
    };
    const wake = () => {
      lastInput = performance.now();
      if (hidden) return;
      ensure();
      if (!raf && !still && !document.hidden) raf = requestAnimationFrame(loop);
    };
    const onScroll = () => {
      hidden = covered();
      wake();
    };

    // the first drawing waits for an idle moment, and for the field to be visible at all
    const hasIdle = 'requestIdleCallback' in window;
    const kick = () => {
      hidden = covered();
      if (!hidden) wake();
    };
    const idleId = hasIdle ? window.requestIdleCallback(kick, { timeout: 1500 }) : window.setTimeout(kick, 300);

    let rt = 0;
    const onResize = () => {
      clearTimeout(rt);
      rt = window.setTimeout(() => {
        // phones resize on every scroll as the address bar moves: rebuild only for real size changes
        if (Math.abs(window.innerWidth - W) < 2 && Math.abs(window.innerHeight - H) < 120) return;
        hidden = covered();
        if (!built) return;
        build();
        if (!hidden) paint(performance.now());
      }, 150);
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      ptr.x = e.clientX;
      ptr.y = e.clientY;
      ptr.in = true;
      wake();
    };
    const leave = () => {
      ptr.in = false;
    };
    const down = (e: PointerEvent) => {
      if (still) return;
      const t = e.target as HTMLElement | null;
      if (t?.closest?.('a,button,input,select,textarea,label,[data-cover],footer,header,[role="dialog"]')) return;
      rings.push({ x: e.clientX, y: e.clientY, t: performance.now() });
      if (rings.length > 4) rings.shift();
      wake();
    };
    const vis = () => {
      if (!document.hidden) wake();
    };
    window.addEventListener('resize', onResize);
    window.addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('pointerleave', leave);
    window.addEventListener('pointerdown', down, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', vis);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(rt);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', leave);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('scroll', onScroll);
      if (hasIdle) window.cancelIdleCallback(idleId);
      else clearTimeout(idleId);
      document.removeEventListener('visibilitychange', vis);
    };
  }, [cell]);

  return (
    <div ref={boxRef} className="kx-backdrop" aria-hidden="true">
      <canvas ref={cvRef} />
    </div>
  );
}
