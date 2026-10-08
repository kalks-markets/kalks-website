import { og, OG_SIZE, OG_TYPE } from './_og/og';

export const alt = 'Kalks: options on forex, made simple';
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return og({ tone: 'yellow', kicker: 'NEW · KALKS FX OPTIONS', title: 'Options on forex, made simple.', sub: 'Buy an option and the premium is the most you can lose.', img: 'figure-og.jpg' });
}
