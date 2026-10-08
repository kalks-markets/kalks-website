'use client';

import { useEffect, useRef, useState } from 'react';
import { Globe, Check } from 'lucide-react';
import { GT_LANGUAGES, readLang, setLang } from '@/components/chrome/GoogleTranslate';
import { cn } from '@/lib/cn';

/** Desktop language popover (Google Translate for the website; the apps are fully translated). */
export function LanguagePicker({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [lang, setLangState] = useState('en');
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => setLangState(readLang()), []);
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const current = GT_LANGUAGES.find((l) => l.code === lang);
  return (
    <div ref={wrap} className={cn('notranslate relative', className)} translate="no">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={`Language: ${current?.label ?? 'English'}`}
        className="nav-lnk"
      >
        <Globe size={18} strokeWidth={1.75} aria-hidden />
        <span className="uppercase">{lang === 'zh-CN' ? 'ZH' : lang}</span>
      </button>
      {open && (
        <div role="listbox" aria-label="Choose a language" className="pop grid w-[440px] grid-cols-2 gap-1 p-2">
          {GT_LANGUAGES.map((l) => (
            <button
              key={l.code}
              role="option"
              aria-selected={l.code === lang}
              type="button"
              onClick={() => setLang(l.code)}
              className={cn(
                'flex items-center justify-between rounded-[12px] px-3.5 py-2.5 text-left text-[14px] transition-colors hover:bg-s3',
                l.code === lang ? 'font-semibold text-tx' : 'text-tx2',
              )}
            >
              {l.label}
              {l.code === lang && <Check size={15} className="text-red-tx" aria-hidden />}
            </button>
          ))}
          <p className="col-span-2 px-3.5 pb-1.5 pt-2 text-[11.5px] leading-relaxed text-tx3">
            The website is translated automatically. Kalks Trader and the Client Area are fully translated into all 22 languages.
          </p>
        </div>
      )}
    </div>
  );
}

/** Phones: native select. */
export function LanguageSelect() {
  const [lang, setLangState] = useState('en');
  useEffect(() => setLangState(readLang()), []);
  return (
    <label className="field notranslate" translate="no">
      <Globe size={18} strokeWidth={1.75} aria-hidden />
      <span className="sr-only">Language</span>
      <select value={lang} onChange={(e) => setLang(e.target.value)}>
        {GT_LANGUAGES.map((l) => (
          <option key={l.code} value={l.code}>
            {l.label}
          </option>
        ))}
      </select>
    </label>
  );
}
