import type { Metadata } from 'next';
import { Hero } from '@/components/ui/Hero';
import { Btn } from '@/components/ui/Button';
import { Section, SectionHead, Steps, Feature } from '@/components/ui/Section';
import { Faq } from '@/components/ui/Faq';
import { NetworkArt } from '@/components/art/HeroArt';
import { IB, IB_LEVELS } from '@/content/facts';
import { REGISTER_HREF } from '@/lib/crm';
import { cn } from '@/lib/cn';

export const metadata: Metadata = {
  title: 'Partners: earn on every lot your network trades',
  description:
    'Every Kalks client is a partner from sign-up. Per-lot commission on three tiers of referrals, CPA rewards, five levels from Bronze to Diamond, weekly payouts in USDT.',
  alternates: { canonical: '/partners' },
};

const FAQ = [
  {
    q: 'Who can become a partner?',
    a: 'Every Kalks client. Your partner dashboard, link and code are in the Client Area from day one; there is no separate application.',
  },
  {
    q: 'What counts towards commission?',
    a: 'Closed trades on your clients’ live accounts that were held for at least two minutes. Prop accounts do not count.',
  },
  {
    q: 'What is CPA?',
    a: 'A one-off reward for each new client who deposits at least $500 and places a first trade, paid after a 30-day hold: $200 at Bronze and Silver, $300 from Gold.',
  },
  {
    q: 'Can I give part of my commission back?',
    a: 'Yes. Pass up to 50% to clients as a rebate and up to 50% to your sub-partners.',
  },
  {
    q: 'How do levels work?',
    a: 'You start at Bronze. Levels rise with your active clients and the lots they trade each month, and every level raises your per-lot rates.',
  },
];

export default function PartnersPage() {
  const top = IB_LEVELS[IB_LEVELS.length - 1];
  return (
    <>
      <Hero
        tone="red"
        kicker="PARTNERS"
        title="Earn on every lot your network trades."
        lede="Every Kalks client is a partner from day one. Share your link, earn per lot on three tiers of referrals, and get paid every Monday in USDT."
        actions={
          <>
            <Btn href={REGISTER_HREF} v="wht" s={56} arrow>
              Become a partner
            </Btn>
            <Btn href="#levels" v="ghost" s={56}>
              See the rates
            </Btn>
          </>
        }
        facts="No application · no minimum to start"
        art={<NetworkArt />}
        strip={[
          { v: `$${top.fxMajor}`, l: `Per FX major lot at ${top.name}` },
          { v: IB.tiers, l: `Tiers deep: ${IB.tierShares} of the rate` },
          { v: 'Weekly', l: 'Paid every Monday to your USDT wallet' },
          { v: IB.minPayout, l: 'Minimum payout' },
        ]}
      />

      <Section labelledBy="ph-title">
        <SectionHead id="ph-title" kicker="01 — HOW IT WORKS" title="Share, earn, get paid." />
        <Steps
          steps={[
            { t: 'Share your link', d: 'Your link and code are ready when you sign up, with campaign links and a QR code for each channel.' },
            { t: 'Clients trade', d: 'Earn a fixed amount per lot your clients trade, set by asset class and your level.' },
            { t: 'Your network grows', d: `Earn on three tiers: ${IB.tierShares} of the per-lot rate. Share part with sub-partners or as a rebate.` },
            { t: 'Get paid weekly', d: `${IB.payout}, from ${IB.minPayout}.` },
          ]}
        />
      </Section>

      <Section id="levels" labelledBy="lv-title">
        <SectionHead
          id="lv-title"
          kicker="02 — LEVELS"
          title="Five levels. Higher rates at each."
          lede="Commission in US dollars per standard lot traded by your direct clients. Your level updates as your network grows."
        />
        <div className="card overflow-hidden p-2">
          <div className="overflow-x-auto">
            <table className="tb min-w-[760px]">
              <thead>
                <tr>
                  <th scope="col">Level</th>
                  <th scope="col" className="r">
                    FX majors
                  </th>
                  <th scope="col" className="r">
                    Metals
                  </th>
                  <th scope="col" className="r">
                    Crypto
                  </th>
                  <th scope="col" className="r">
                    CPA
                  </th>
                  <th scope="col">To reach it</th>
                </tr>
              </thead>
              <tbody>
                {IB_LEVELS.map((l, i) => (
                  <tr key={l.name}>
                    <th scope="row">
                      <span className="flex items-center gap-2.5">
                        <span
                          className={cn('h-3 w-3 rounded-full', i === IB_LEVELS.length - 1 ? 'bg-k-yel' : 'bg-s4')}
                          style={{ opacity: 0.35 + i * 0.16 }}
                          aria-hidden
                        />
                        {l.name}
                      </span>
                    </th>
                    <td className="r m">${l.fxMajor}</td>
                    <td className="r m">${l.metals}</td>
                    <td className="r m">${l.crypto}</td>
                    <td className="r m">${l.cpa}</td>
                    <td className="text-tx2">{l.needs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="mt-4 text-[12.5px] text-tx3">
          FX minors, indices, energies and stocks have their own rates at each level, shown in your partner dashboard. These are the
          current default rates and can change.
        </p>
      </Section>

      <Section labelledBy="pt-title">
        <h2 id="pt-title" className="sr-only">
          More for partners
        </h2>
        <div className="grid gap-4 lg:grid-cols-3">
          <Feature t="Three tiers deep" d={`Earn on clients referred by your clients: ${IB.tierShares} of the per-lot rate.`} />
          <Feature t="Campaign links" d="One link per channel, with clicks, sign-ups and first deposits tracked for each." />
          <Feature t="White-label ready" d="Bringing a whole business? Run your own brand on the Kalks platform." />
        </div>
      </Section>

      <Section labelledBy="pfq-title" className="sec-last">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHead id="pfq-title" kicker="03 — QUESTIONS" title="Partners, answered." />
          <Faq items={FAQ} schema />
        </div>
      </Section>
    </>
  );
}
