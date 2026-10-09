import type { Config } from 'tailwindcss';

/**
 * Website tokens. Every colour is a CSS variable (src/app/globals.css, overridden by src/app/kx.css for the
 * blue / white / navy website theme). Brand constants under `k` are fixed hex and accept opacity modifiers; the old
 * names (k-red, k-yel) are kept for older classes but now map to blue.
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
      /* the website's brand constants: royal blue, light blue, navy (no red, orange or yellow) */
      k: {
        red: '#2447E0',
        yel: '#A9C3F3',
        ink: '#0B1640',
        wine: '#0B1640',
        'img-yel': '#2447E0',
        'img-red': '#2447E0',
        warm: '#F5F7FF',
        blue: '#2447E0',
        navy: '#0B1640',
        light: '#A9C3F3',
        tint: '#E6EDFF',
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
