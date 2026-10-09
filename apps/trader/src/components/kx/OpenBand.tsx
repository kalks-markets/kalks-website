'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { nextOptionsCut } from '@/lib/tz';

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * "Open your account": over the page's arrow field, with a live countdown to the next options cut (10:00 New York on a
 * weekday) and a one-field form. The form does not submit anything here: it opens Client Area registration with
 * the e-mail filled in.
 */
export function OpenBand({ registerUrl, demoUrl, title, sub }: { registerUrl: string; demoUrl: string; title: string; sub: string }) {
  const [now, setNow] = useState<number | null>(null);
  const [email, setEmail] = useState('');
  const [err, setErr] = useState('');
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const cut = now ? nextOptionsCut(now) : null;
  const left = cut && now ? Math.max(0, cut - now) : 0;
  const cells = [
    [Math.floor(left / 86400000), 'days'],
    [Math.floor(left / 3600000) % 24, 'hrs'],
    [Math.floor(left / 60000) % 60, 'min'],
    [Math.floor(left / 1000) % 60, 'sec'],
  ] as const;
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const v = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) {
      setErr('Enter a valid e-mail address.');
      return;
    }
    setErr('');
    const u = new URL(registerUrl);
    u.searchParams.set('email', v);
    window.location.href = u.toString();
  };
  return (
    <section className="kx-band" id="open-account" aria-labelledby="band-title">
      <div className="kx-wrap kx-band-grid">
        <div>
          <span className="kx-kicker">Live and demo</span>
          <h2 id="band-title" className="kx-band-title">
            {title}
          </h2>
          <p className="kx-band-sub">{sub}</p>
          <div className="kx-count" aria-live="off">
            <p className="kx-count-label">Next options cut in</p>
            <div className="kx-count-cells">
              {cells.map(([v, k]) => (
                <div key={k} className="kx-count-cell">
                  <b suppressHydrationWarning>{now ? pad(v) : '--'}</b>
                  <span>{k}</span>
                </div>
              ))}
            </div>
            <p className="kx-count-note">Daily, weekly and monthly expiries settle at 10:00 New York, Monday to Friday.</p>
          </div>
        </div>
        <div className="kx-formcard">
          <form onSubmit={submit} noValidate className="flex flex-col gap-3.5">
            <label htmlFor="kx-email" className="kx-label">
              E-mail
            </label>
            <input
              id="kx-email"
              type="email"
              autoComplete="email"
              inputMode="email"
              placeholder="you@example.com"
              className="kx-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={err ? true : undefined}
              aria-describedby={err ? 'kx-email-err' : undefined}
            />
            {err && (
              <p id="kx-email-err" className="kx-err">
                {err}
              </p>
            )}
            <button type="submit" className="kx-btn blue lg mt-1 w-full">
              Create my account <ArrowUpRight size={17} aria-hidden />
            </button>
            <a href={demoUrl} className="kx-btn ghost w-full">
              Try the demo first
            </a>
            <p className="kx-fine">You finish signing up in the Kalks Client Area. Fund later with USDT, from 10 USDT.</p>
          </form>
        </div>
      </div>
    </section>
  );
}
