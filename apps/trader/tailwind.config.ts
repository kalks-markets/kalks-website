import type { Config } from 'tailwindcss';

/**
 * Kalks 2 website tokens (docs/design/KALKS2.md in the platform repo). Every colour is a CSS variable defined in
 * src/app/globals.css for light, dark and the coloured hero tones, so one class works in every theme. Brand constants
 * (k-red, k-yel, k-ink) are fixed hex and accept opacity modifiers.
 */
const v = (name: string) => `var(--${name})`;

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    screens: {
      sm: '640px',
      md: '761px',
      lg: '1024px',
      xl: '1181px',
      '2xl': '1440px',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      black: '#000000',
      page: v('page'),
      bg: v('bg'),
      bg2: v('bg2'),
      s1: v('s1'),
      s2: v('s2'),
      s3: v('s3'),
      s4: v('s4'),
      line: v('line'),
      line2: v('line2'),
      tx: v('tx'),
      tx2: v('tx2'),
      tx3: v('tx3'),
      red: { DEFAULT: v('red'), edge: v('red-edge'), tx: v('red-tx'), soft: v('red-soft') },
      yel: { DEFAULT: v('yel'), edge: v('yel-edge'), tx: v('yel-tx'), soft: v('yel-soft') },
      up: { DEFAULT: v('up'), face: v('up-face'), tx: v('up-tx'), soft: v('up-soft') },
      dn: { DEFAULT: v('dn'), tx: v('dn-tx'), soft: v('dn-soft') },
      ok: { DEFAULT: v('ok'), soft: v('ok-soft') },
      k: {
        red: '#D4112A',
        yel: '#FFD21F',
        ink: '#0B0809',
        wine: '#3A0A12',
        'img-yel': '#FFD224',
        'img-red': '#E00302',
        warm: '#F6EEE8',
      },
    },
    fontFamily: {
      sans: v('f-text'),
      disp: v('f-disp'),
      mono: v('f-mono'),
    },
    extend: {
      borderRadius: {
        '2.5xl': '20px',
        '3xl': '24px',
        '4xl': '28px',
        '5xl': '30px',
      },
      maxWidth: {
        site: '1440px',
      },
    },
  },
  plugins: [],
};

export default config;
