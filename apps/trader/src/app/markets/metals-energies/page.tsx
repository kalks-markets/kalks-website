import type { Metadata } from 'next';
import { ClassPage } from '@/components/site/markets/ClassPage';
import { PinTour } from '@/components/site/markets/PinTour';
import type { Pin, ShotDef } from '@/components/site/Shot';
import { Btn } from '@/components/site/ui';
import { FAQ_GROUPS } from '@/content/faq';
import { HOURS, INSTRUMENTS, LEVERAGE, OPTIONS } from '@/content/facts';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Metals & energies: gold, silver, oil and gas',
  description: `Trade ${INSTRUMENTS.byClass.metals.live} metals and ${INSTRUMENTS.byClass.energies.live} energies as CFDs on Kalks, with options on gold, silver, US and UK oil.`,
  alternates: { canonical: '/markets/metals-energies' },
};

/** crop of the Kalks FX Options underlyings list (trader-options.webp) */
const UNDERLYINGS: ShotDef = {
  src: '/site/shots/markets-underlyings.webp',
  w: 690,
  h: 415,
  alt: 'Kalks Trader options mode: gold, silver, WTI and Brent as option underlyings with live spot prices and the day’s change',
};

const PINS: Pin[] = [
  { x: 21, y: 6.8, title: 'Gold and silver', text: `Calls and puts on XAUUSD and XAGUSD. One contract is ${OPTIONS.contract.xau} of gold or ${OPTIONS.contract.xag} of silver.` },
  { x: 57, y: 23.4, title: 'Live spot and the day’s change', text: 'The live price of each underlying and its change on the day, beside the chain.' },
  { x: 24, y: 57, title: 'WTI and Brent', text: `Calls and puts on US and UK crude oil, ${OPTIONS.contract.oil} a contract.` },
];

const metalsAndOil = OPTIONS.underlyingsLive.filter((s) => s.startsWith('XA') || s.endsWith('OIL')).length;
const FAQ = [...FAQ_GROUPS.find((g) => g.id === 'trading')!.items, FAQ_GROUPS.find((g) => g.id === 'options')!.items[0]];

export default function MetalsPage() {
  return (
    <ClassPage
      self="/markets/metals-energies"
      eyebrow="Metals & energies"
      title={
        <>
          Gold, silver, oil. <span className="s-mute">Long or short.</span>
        </>
      }
      lead={`${INSTRUMENTS.byClass.metals.live} metals and ${INSTRUMENTS.byClass.energies.live} energies on real money, from gold and silver to copper, crude and natural gas. Options on gold, silver and both oils.`}
      heroFacts={[`${INSTRUMENTS.byClass.metals.live} metals live`, `${INSTRUMENTS.byClass.energies.live} energies live`, 'Options on gold, silver and oil']}
      glass={[
        { v: `1:${LEVERAGE.coreCaps.metals}`, l: 'Highest leverage on metals' },
        { v: metalsAndOil, l: 'Option underlyings: gold, silver, WTI and Brent' },
      ]}
      statement={
        <>
          The metals and the oils, as CFDs or options. <span className="s-mute">Trade gold, silver, copper, crude and natural gas long or short, or buy a call or a put on gold, silver or oil, where the premium is the most you can lose.</span>
        </>
      }
      chips={['Gold', 'Silver', 'Crude oil']}
      stats={[
        { v: INSTRUMENTS.byClass.metals.live, l: 'Metals live', sub: 'Gold, silver, platinum, copper and more' },
        { v: INSTRUMENTS.byClass.energies.live, l: 'Energies live', sub: 'WTI, Brent and natural gas' },
        { v: `1:${LEVERAGE.coreCaps.metals}`, l: 'Metals leverage', sub: 'Account and market caps apply' },
        { v: `1:${LEVERAGE.coreCaps.energies}`, l: 'Energies leverage', sub: 'Account and market caps apply' },
      ]}
      rows={[
        { s: 'XAUUSD', name: 'Gold / US Dollar', digits: 2 },
        { s: 'XAGUSD', name: 'Silver / US Dollar', digits: 3 },
        { s: 'XPDUSD', name: 'Palladium / US Dollar', digits: 2 },
        { s: 'XCUUSD', name: 'Copper / US Dollar', digits: 4 },
        { s: 'USOIL', name: 'US crude oil (WTI)', digits: 2 },
        { s: 'UKOIL', name: 'UK crude oil (Brent)', digits: 2 },
        { s: 'NGAS', name: 'Natural gas', digits: 3 },
      ]}
      liveTitle={
        <>
          Metals and energies, <span className="s-mute">live.</span>
        </>
      }
      liveIntro="Gold, silver and oil are also the underlyings for Kalks FX Options."
      terms={[
        ['Leverage', `Metals up to 1:${LEVERAGE.coreCaps.metals}, energies up to 1:${LEVERAGE.coreCaps.energies}`],
        ['Pricing', 'All-in spread, or raw spread + commission on ECN and VIP'],
        ['Options contracts', `Gold ${OPTIONS.contract.xau} · silver ${OPTIONS.contract.xag} · oil ${OPTIONS.contract.oil}`],
      ]}
      hours={[
        ['Trading week', HOURS.fxWeek],
        ['Daily rollover', `${HOURS.rolloverNy} New York`],
        ['Triple financing', `Metals ${HOURS.tripleSwap.forexMetals}, energies ${HOURS.tripleSwap.indicesEnergies}`],
      ]}
      trader={{
        eyebrow: 'Kalks FX Options',
        title: (
          <>
            Gold and oil, <span className="s-mute">as options too.</span>
          </>
        ),
        lead: `Switch Kalks Trader to Options and gold, silver, WTI and Brent sit beside the ${OPTIONS.fxPairsLive} FX pairs, with daily, weekly and monthly expiries settled in cash at ${OPTIONS.cut}.`,
        body: (
          <PinTour
            shot={UNDERLYINGS}
            pins={PINS}
            maxW="max-w-[600px]"
            cols="lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]"
            outro={
              <div className="mt-8">
                <Btn href="/options" variant="ghost">
                  How options work
                </Btn>
              </div>
            }
          />
        ),
      }}
      faq={FAQ}
    />
  );
}
