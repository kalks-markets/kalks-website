/**
 * The founder's photos (public/images/photos, see SOURCES.md). `w` × `h` are the file's pixels; a photo is never
 * shown wider than w / 2 CSS pixels (full-bleed page heroes excepted, at the founder's request). `pos` keeps the
 * subject in frame when it is cropped (object-position); `shift` (heroes) widens the photo to the left by that share
 * of the width, moving a centred subject to the right of the title.
 */
export const PHOTOS = {
  wallLight: { src: '/images/photos/wall-light.jpg', w: 810, h: 1440, pos: '50% 62%', alt: 'A lone figure in front of a glowing band of light on a concrete wall' },
  binoculars: { src: '/images/photos/binoculars.jpg', w: 683, h: 1024, pos: '50% 40%', alt: 'A man in a suit looking ahead through binoculars' },
  towerWindows: { src: '/images/photos/tower-windows.jpg', w: 736, h: 1472, pos: '50% 55%', alt: 'A tower in teal fog with a line of lit windows running up it' },
  cloudRest: { src: '/images/photos/cloud-rest.jpg', w: 720, h: 960, pos: '50% 50%', alt: 'A man in a suit resting on a small cloud' },
  brutalistRed: { src: '/images/photos/brutalist-red.jpg', w: 1200, h: 2133, pos: '50% 45%', alt: 'A brutalist building in black and white with a red band behind it' },
  redMoon: { src: '/images/photos/red-moon.jpg', w: 720, h: 1200, pos: '50% 92%', alt: 'Black towers and a white moon against a red sky' },
  towersUp: { src: '/images/photos/towers-up.jpg', w: 698, h: 1280, pos: '50% 50%', alt: 'Looking straight up between four towers to a cross of white sky' },
  handshake: { src: '/images/photos/handshake.jpg', w: 512, h: 857, pos: '50% 50%', alt: 'An engraved handshake on yellow' },
  heroMarkets: { src: '/images/photos/hero-markets.jpg', w: 1184, h: 814, shift: 0.22, pos: '50% 62%', alt: 'A giant hand beneath a ring of blue star trails, a tiny figure standing below' },
  heroAccounts: { src: '/images/photos/hero-accounts.jpg', w: 1200, h: 675, shift: 0.5, pos: '50% 58%', alt: 'A lone small house in a misty green valley' },
} as const;

export type PhotoKey = keyof typeof PHOTOS;
