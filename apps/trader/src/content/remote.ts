/**
 * Free-licence photos, hotlinked from the Unsplash CDN until the founder approves self-hosting (see
 * scratchpad/ref/hero-manifest.md). Every one is under the Unsplash License: free for commercial use, no permission
 * or attribution needed (credited here anyway). w × h are the originals; page heroes only use originals ≥ 3840 px
 * wide, the "Who it's for" panels originals ≥ 2000 px.
 */
/** shift: widen the hero photo past the viewport to hide an edge (< 0 left, > 0 right), as a fraction of its width */
export type Remote = { base: string; w: number; h: number; pos: string; shift?: number; alt: string; author: string; page: string };

/** an imgix URL at a given width (Unsplash: auto format, quality 80, cropped to fit) */
export const cdn = (r: Remote, w: number) => `${r.base}?w=${w}&q=80&auto=format&fit=crop`;
export const cdnSet = (r: Remote, widths = [1280, 1920, 2880, 3840]) =>
  widths.filter((w) => w <= r.w).map((w) => `${cdn(r, w)} ${w}w`).join(", ");

export const REMOTE = {
  options: { base: "https://images.unsplash.com/photo-1787602039020-e55683d9d3f0", w: 4000, h: 2250, pos: "50% 50%", alt: "An aerial view of a road that forks in two through a dark pine forest", author: "Adam", page: "https://unsplash.com/photos/road-junction-through-pine-forest-SRpPfMNSY8M" },
  platforms: { base: "https://images.unsplash.com/photo-1482996207824-b0f01de61751", w: 5815, h: 3882, pos: "50% 50%", alt: "A curved glass curtain wall rising into a pale sky", author: "Etienne Boulanger", page: "https://unsplash.com/photos/architectural-photograph-of-building-curtain-wall-mDOao83l1iU" },
  prop: { base: "https://images.unsplash.com/photo-1616321499708-ababf145ad68", w: 4741, h: 3161, pos: "50% 45%", alt: "A slackliner walking a line high among the clouds", author: "Alan Wouda", page: "https://unsplash.com/photos/black-bird-flying-under-white-clouds-during-daytime-bjmh2cjcGMs" },
  copy: { base: "https://images.unsplash.com/photo-1678687974806-31251494b211", w: 5405, h: 3505, pos: "50% 40%", alt: "A flock of geese flying in formation across a blue sky", author: "Евгений Шевченко", page: "https://unsplash.com/photos/a-flock-of-birds-flying-through-a-blue-sky-PxlDehkIPX8" },
  partners: { base: "https://images.unsplash.com/photo-1728922841009-a0e6443f0196", w: 4928, h: 3264, pos: "50% 40%", alt: "Two bridge towers standing side by side against a clear blue sky", author: "Roger Starnes Sr", page: "https://unsplash.com/photos/a-traffic-light-on-a-bridge-with-a-blue-sky-in-the-background-cXPRkHwcdaY" },
  faq: { base: "https://images.unsplash.com/photo-1781458708730-c35e7c7ee998", w: 6774, h: 4492, pos: "50% 50%", alt: "Low stone walls forming a maze, in black and white", author: "Barney Goodman", page: "https://unsplash.com/photos/abstract-geometric-hedges-create-a-unique-garden-landscape-UlTMFMsqVBI" },
  contact: { base: "https://images.unsplash.com/photo-1776078879050-4d0305447781", w: 6000, h: 4000, pos: "60% 55%", alt: "A white building at night with a lit blue door", author: "Dhia Lumos", page: "https://unsplash.com/photos/white-building-with-blue-door-at-night-rJe9dLJcjKk" },
  trader: { base: "https://images.unsplash.com/photo-1662242723207-13ad21d3816f", w: 6000, h: 4000, pos: "50% 50%", alt: "An aircraft cockpit at night, its instruments glowing", author: "Johannes Blenke", page: "https://unsplash.com/photos/a-control-room-with-many-screens-WknOx0jEMQE" },
  android: { base: "https://images.unsplash.com/photo-1600856209809-8419414d351f", w: 3872, h: 2592, pos: "50% 50%", alt: "A finger touching a glowing phone screen in the dark", author: "Akshar Dave🌻", page: "https://unsplash.com/photos/person-holding-white-and-blue-box-qlGpYENt-ig" },
  api: { base: "https://images.unsplash.com/photo-1479293581560-aee98bb24f7f", w: 3913, h: 3423, pos: "50% 50%", alt: "A white facade of repeating angled glass fins against the sky", author: "Joel Filipe", page: "https://unsplash.com/photos/gray-glass-building-D1S4F_SKY2I" },
  academy: { base: "https://images.unsplash.com/photo-1591336538143-3a8838472199", w: 6720, h: 4480, pos: "50% 50%", alt: "Curved stone steps cut by a sharp diagonal shadow", author: "Jonas Denil", page: "https://unsplash.com/photos/black-and-white-concrete-stairs-KL63kujm9sU" },
  about: { base: "https://images.unsplash.com/photo-1619289979363-21457c2aecd2", w: 6000, h: 4000, pos: "50% 40%", alt: "Looking up between glass towers into a blue sky", author: "Minator Yang", page: "https://unsplash.com/photos/low-angle-photography-of-high-rise-buildings-ru_5Dpfng34" },
  whitelabel: { base: "https://images.unsplash.com/photo-1708184292458-ca9d13e7d96f", w: 3850, h: 2696, pos: "50% 60%", alt: "A plain white wall against a blue sky", author: "Mahdi Naserinejad", page: "https://unsplash.com/photos/a-white-wall-with-a-tree-in-the-background-cwu7f11VFSc" },
  clientarea: { base: "https://images.unsplash.com/photo-1523477593243-78bbf626fd3b", w: 4774, h: 3183, pos: "50% 50%", alt: "A blue glass facade in a pattern of angled panes", author: "Christian Ladewig", page: "https://unsplash.com/photos/architectural-photography-of-glass-building-T0iFfJw-rB0" },
  forex: { base: "https://images.unsplash.com/photo-1655919640606-28088c64edb0", w: 6964, h: 4643, pos: "50% 50%", shift: -0.22, alt: "A long, symmetrical airport hall with gates on both sides", author: "Big Dodzy", page: "https://unsplash.com/photos/a-person-walking-in-a-large-building-m5PcPzOIfTw" },
  metals: { base: "https://images.unsplash.com/photo-1588011930968-eadac80e6a5a", w: 6016, h: 4016, pos: "50% 60%", alt: "Refinery chimneys lit at blue hour", author: "Maksym Kaharlytskyi", page: "https://unsplash.com/photos/red-and-white-tower-under-blue-sky-during-night-time-u13zBF4r56A" },
  indices: { base: "https://images.unsplash.com/photo-1683558359013-9163cedb5a9a", w: 5913, h: 3824, pos: "50% 40%", alt: "Blue glass skyscrapers seen from below", author: "Robert Stump", page: "https://unsplash.com/photos/a-couple-of-tall-buildings-that-are-next-to-each-other-xeJ6ev1w1Sk" },
  crypto: { base: "https://images.unsplash.com/photo-1600935583305-444649cda349", w: 5913, h: 3947, pos: "50% 60%", alt: "A city skyline at night under a dark teal sky", author: "Ryunosuke Kikuno", page: "https://unsplash.com/photos/a-city-skyline-at-night-with-the-lights-on-nX0NgrGEwEc" },
  demo: { base: "https://images.unsplash.com/photo-1615754890634-69ac8bca7189", w: 6720, h: 4480, pos: "50% 60%", alt: "A lone figure standing in a single spotlight on a dark stage", author: "Luis Morera", page: "https://unsplash.com/photos/man-in-black-jacket-standing-on-the-ground-during-night-time-d5-GkHQVlIM" },
  funding: { base: "https://images.unsplash.com/photo-1652733361035-39064dcfa063", w: 4080, h: 3072, pos: "50% 50%", alt: "A large bridge disappearing into fog", author: "Jason Krieger", page: "https://unsplash.com/photos/a-foggy-view-of-a-large-bridge-Bwt2PAX9grc" },
  roleNew: { base: "https://images.unsplash.com/photo-1596002688763-49acab5d1216", w: 3324, h: 4986, pos: "50% 40%", alt: "White stairs climbing towards a blue sky", author: "Jennefer Zacarias", page: "https://unsplash.com/photos/white-concrete-staircase-under-blue-sky-during-daytime-m2tcFtczMVs" },
  roleActive: { base: "https://images.unsplash.com/photo-1750771480173-abdda5f75194", w: 6192, h: 4128, pos: "50% 55%", alt: "Light trails of traffic on a city street at night", author: "Sinan Sarıhan", page: "https://unsplash.com/photos/cars-create-light-trails-on-a-dark-city-street-x-4M4AFCObM" },
  roleOptions: { base: "https://images.unsplash.com/photo-1479292889369-1a48f234247e", w: 3436, h: 4211, pos: "50% 50%", alt: "A geometric glass facade of angled panels", author: "Joel Filipe", page: "https://unsplash.com/photos/clear-glass-building-ZMRMFULofus" },
  roleManager: { base: "https://images.unsplash.com/photo-1617761141732-d481912af1a9", w: 3573, h: 2859, pos: "62% 50%", alt: "A stepped glass tower against a clear blue sky", author: "Parrish Freeman", page: "https://unsplash.com/photos/modern-glass-skyscraper-with-stepped-facade-0d-z8cJGIR4" },
  rolePartner: { base: "https://images.unsplash.com/photo-1672435298407-c66789ad9f12", w: 6240, h: 4160, pos: "50% 45%", alt: "Two towers linked by a glass skybridge", author: "Precious Madubuike", page: "https://unsplash.com/photos/a-very-tall-building-with-a-bridge-going-over-it-s7ttf9R7Mrs" },
} satisfies Record<string, Remote>;

export type RemoteKey = keyof typeof REMOTE;
