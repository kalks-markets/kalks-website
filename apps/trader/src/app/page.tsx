import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Check } from 'lucide-react';
import { Hero, Eyebrow } from '@/components/ui/Hero';
import { Btn, RoundArrow } from '@/components/ui/Button';
import { Picture } from '@/components/ui/Picture';
import { Section, SectionHead } from '@/components/ui/Section';
import { RiskNote } from '@/components/ui/RiskNote';
import { PriceStrip, type StripRow } from '@/components/market/PriceStrip';
import { NewsTicker } from '@/components/news/NewsTicker';
import { QuickTicket } from '@/components/mock/QuickTicket';
import { TraderMock } from '@/components/mock/TraderMock';
import { PayoffMini } from '@/components/art/PayoffMini';
import { HERO } from '@/content/site';
import { ACADEMY, ACCOUNTS, FUNDING, INSTRUMENTS, LEVERAGE, OPTIONS, OPTIONS_ACCOUNTS, TRADER } from '@/content/facts';
import { DEMO_HREF, REGISTER_HREF, TRADER_URL } from '@/lib/crm';
import { getQuotes } from '@/lib/quotes';
import { getMarketNews } from '@/lib/marketNews';
import { CRM_URL } from '@/lib/crm';

export const revalidate = 60;

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

const STRIP: StripRow[] = [
  { s: 'EURUSD', label: 'EUR/USD', digits: 5 },
  { s: 'USDJPY', label: 'USD/JPY', digits: 3 },
  { s: 'XAUUSD', label: 'XAU/USD', digits: 2 },
  { s: 'GBPUSD', label: 'GBP/USD', digits: 5 },
  { s: 'USOIL', label: 'US Oil', digits: 2 },
];

export default async function HomePage() {
  const [quotes, news] = await Promise.all([getQuotes(STRIP.map((r) => r.s)), getMarketNews(`${CRM_URL}/calendar`)]);
  const opt = OPTIONS_ACCOUNTS[0];
  return (
    <>
      <Hero
        tone="yellow"
        className="hero--figure"
        eyebrow={<Eyebrow>{HERO.eyebrow}</Eyebrow>}
        title={
          <>
            {HERO.headline[0]}
            <br />
            {HERO.headline[1]}
          </>
        }
        style={{ ['--h1' as string]: 'clamp(46px, 5.6vw, 82px)', ['--h1-s' as string]: '46px' }}
        lede={HERO.subline}
        actions={
          <>
            <Btn href={REGISTER_HREF} v="red" s={56} arrow>
              Open account
            </Btn>
            <Btn href={DEMO_HREF} v="ghost" s={56}>
              Try the demo
            </Btn>
          </>
        }
        facts={HERO.facts}
        backdrop={
          <div className="home-fig">
            <Picture
              name="/images/k2/figure"
              widths={[736, 480]}
              w={736}
              h={1086}
              priority
              sizes="(max-width: 760px) 340px, 480px"
              alt="A glossy black figure with yellow circuit lines and a yellow halo, seated cross-legged on a flat yellow backdrop"
            />
          </div>
        }
        strip={[
          { v: OPTIONS.underlyingsLive.length, l: `Live underlyings: ${OPTIONS.fxPairsLive} FX pairs, gold, silver, US and UK oil` },
          { v: 'Daily', l: 'Plus weekly and monthly expiries, cut at 10:00 New York' },
          { v: '$0.25', l: 'Per contract, capped at 10% of the premium' },
          { v: 'USD', l: 'Settled in cash, straight to your balance' },
        ]}
      />

      <div className="wrap mt-4 flex flex-col gap-3">
        <PriceStrip rows={STRIP} initial={quotes} />
        <NewsTicker initial={news} />
      </div>

      {/* Products */}
      <Section labelledBy="products-title" className="!pt-14">
        <h2 id="products-title" className="sr-only">
          What you can trade
        </h2>
        <div className="grid gap-4 lg:grid-cols-[1.25fr_1fr_1fr]">
          <Link href="/options" className="pcard pc-red">
            <PayoffMini className="absolute right-[26px] top-[28px] w-[28%] max-sm:w-[34%]" />
            <span className="k">KALKS FX OPTIONS</span>
            <h3 className="!max-w-[9.5ch]">Know your risk before you trade.</h3>
            <p className="!max-w-[30ch]">Buy a call or a put and your loss is capped at the premium you pay. Daily, weekly and monthly expiries.</p>
            <span className="go">
              Explore options <RoundArrow />
            </span>
          </Link>
          <Link href="/accounts" className="pcard pc-ink">
            <span className="k">CFDs</span>
            <h3>Six asset classes. Start with $10.</h3>
            <p>
              Forex, metals, energies, indices, crypto and stocks: {INSTRUMENTS.liveMarkets} markets live. All-in spreads or raw pricing
              with commission. Leverage up to 1:{LEVERAGE.accountMax}.
            </p>
            <span className="go">
              Compare accounts <RoundArrow />
            </span>
          </Link>
          <Link href="/prop" className="pcard pc-yel">
            <span className="k">PROP CHALLENGES</span>
            <h3>Get funded. Keep up to 90%.</h3>
            <p>A 1-step or 2-step evaluation, or instant funding. Simulated accounts from $5k to $200k.</p>
            <span className="go">
              See the plans <RoundArrow />
            </span>
          </Link>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {[
            { href: '/copy-trading', k: 'COPY TRADING · PAMM', t: 'Follow a master. Or become one.' },
            { href: '/partners', k: 'PARTNERS', t: 'Earn on every lot your network trades.' },
            { href: '/academy', k: 'ACADEMY', t: `${ACADEMY.lessons} lessons in ${ACADEMY.phases} phases.` },
          ].map((c) => (
            <Link key={c.href} href={c.href} className="pcard pc-s1 !min-h-[200px]">
              <span className="k !text-red-tx">{c.k}</span>
              <h3 className="!max-w-[14ch] !text-[26px]">{c.t}</h3>
              <span className="go">
                <span />
                <RoundArrow s={40} />
              </span>
            </Link>
          ))}
        </div>
        <RiskNote options className="mt-6" />
      </Section>

      {/* Quick trade */}
      <Section labelledBy="qt-title">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-20">
          <div>
            <SectionHead id="qt-title" kicker="01 — QUICK TRADE" title="An option in three taps." className="!mb-8" />
            <p className="lede max-w-[44ch]">
              Pick up or down, a date and how far. Before you confirm, the ticket shows what you pay and the most you can lose.
            </p>
            <ol className="mt-8 flex flex-col">
              {[
                ['Up or down?', 'Up buys a call. Down buys a put.'],
                ['By when?', 'Today, tomorrow, Friday or month-end.'],
                ['How far?', 'Pick a strike. Kalks shows the chance the model gives it.'],
              ].map(([t, d], i) => (
                <li key={t} className="flex items-start gap-4 border-t border-line py-4">
                  <span className="step-n">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="text-[16px] font-semibold">{t}</h3>
                    <p className="body mt-0.5">{d}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-6 flex flex-wrap gap-3">
              <Btn href="/options" v="ink">
                Explore options
              </Btn>
              <Btn href={DEMO_HREF} v="ghost">
                Try the demo
              </Btn>
            </div>
          </div>
          <QuickTicket className="mx-auto" />
        </div>
      </Section>

      {/* Kalks Trader */}
      <Section labelledBy="tr-title">
        <SectionHead
          id="tr-title"
          kicker="02 — KALKS TRADER"
          title="A big chart. Nothing to install."
          lede={`Kalks Trader runs in your browser and on Android: ${TRADER.indicators} indicators, ${TRADER.timeframes.length} timeframes, one-click trading, and stop loss and take profit you drag on the chart.`}
          action={
            <div className="flex flex-wrap gap-3">
              <Btn href={TRADER_URL} v="ink" arrow>
                Open Kalks Trader
              </Btn>
              <Btn href="/platforms" v="ghost">
                See platforms
              </Btn>
            </div>
          }
        />
        <TraderMock className="h-[560px] max-lg:h-[440px] max-sm:h-[360px]" />
        <p className="mt-3 font-mono text-[11.5px] text-tx3">Illustrative chart. Up candles are blue, down candles red.</p>
      </Section>

      {/* Accounts */}
      <Section labelledBy="acc-title">
        <SectionHead
          id="acc-title"
          kicker="03 — ACCOUNTS"
          title="CFDs or options. One account each."
          lede="An account trades one product. Open both side by side and fund them from one USDT wallet."
          action={
            <Btn href="/accounts" v="ink">
              Compare accounts
            </Btn>
          }
        />
        <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <div className="card overflow-hidden px-2 pb-2 pt-5">
            <div className="flex items-center gap-2 px-4 pb-3">
              <span className="tag cfd">CFD</span>
              <h3 className="t-h3">Five CFD accounts</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="tb min-w-[520px]">
                <thead>
                  <tr>
                    <th scope="col">Account</th>
                    <th scope="col" className="r">
                      From
                    </th>
                    <th scope="col" className="r">
                      Leverage
                    </th>
                    <th scope="col">Pricing</th>
                  </tr>
                </thead>
                <tbody>
                  {ACCOUNTS.map((a) => (
                    <tr key={a.id}>
                      <th scope="row">
                        <Link href={`/accounts#${a.id}`} className="flex items-center gap-2">
                          {a.name}
                          {a.highlight && <span className="tag new">Popular</span>}
                        </Link>
                      </th>
                      <td className="r m">{a.minDeposit}</td>
                      <td className="r m">{a.leverage}</td>
                      <td className="text-tx2">{a.spread}{a.commission !== 'None' ? ` + ${a.commission.replace(' per lot round turn', '/lot')}` : ''}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="card flex flex-col p-6">
            <div className="flex items-center gap-2">
              <span className="tag opt">Options</span>
              <h3 className="t-h3">{opt.name}</h3>
            </div>
            <p className="body mt-3">{opt.tagline} Buy or sell calls and puts with daily, weekly and monthly expiries.</p>
            <ul className="mt-5 flex flex-col gap-2.5 text-[14.5px]">
              {[opt.minDeposit, opt.commission, opt.leverage, 'Free demo with virtual funds'].map((x) => (
                <li key={x} className="flex gap-2.5">
                  <Check size={18} className="mt-0.5 flex-none text-up-tx" aria-hidden />
                  {x}
                </li>
              ))}
            </ul>
            <div className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-4 text-[13.5px]">
              <span className="font-semibold">{OPTIONS_ACCOUNTS[1].name}</span>
              <span className="st st-warn">Coming soon</span>
            </div>
          </div>
        </div>
      </Section>

      {/* Funding + languages */}
      <Section labelledBy="fund-title" className="sec-last">
        <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
          <div className="pcard pc-ink !min-h-0 justify-between gap-10">
            <div>
              <span className="k !text-k-yel">04 — FUNDING</span>
              <h2 id="fund-title" className="d mt-4 max-w-[12ch] text-[clamp(32px,3.4vw,46px)] leading-[0.95]">
                Deposit USDT. Trade in a minute.
              </h2>
              <p className="mt-4 max-w-[42ch] text-[15.5px] leading-relaxed text-[#B8AAA5]">
                {FUNDING.methods}, from MetaMask, TronLink or any wallet. Credited 1:1 as US dollars, {FUNDING.creditTime}.
              </p>
            </div>
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[18px] bg-[rgba(255,255,255,0.08)]">
              {[
                ['10 USDT', 'Minimum deposit'],
                ['~1 min', 'Usual time to credit'],
                ['$0', 'Wallet to account, instant'],
                ['1 USDT', 'Flat withdrawal fee'],
              ].map(([v, l]) => (
                <div key={l} className="flex flex-col-reverse bg-[#0B0809] p-4">
                  <dt className="mt-1 text-[12.5px] text-[#B8AAA5]">{l}</dt>
                  <dd className="money text-[26px] text-white">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="card flex flex-col justify-between gap-8 p-7">
            <div>
              <span className="kicker">05 — EVERYWHERE</span>
              <h2 className="d mt-4 max-w-[14ch] text-[clamp(28px,2.8vw,38px)] leading-[0.95]">Your language. Light or dark.</h2>
              <p className="body mt-4 max-w-[46ch]">
                Kalks Trader and the Client Area speak 22 languages, Arabic, Urdu and Persian right to left, in light and dark.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {['English', 'हिन्दी', 'العربية', 'Español', 'Português', 'Français', 'Русский', 'Türkçe', 'Bahasa', 'Tiếng Việt', '中文', '日本語'].map(
                (l) => (
                  <span key={l} className="chip notranslate" translate="no">
                    {l}
                  </span>
                ),
              )}
              <span className="chip sel">+10 more</span>
            </div>
            <a href="/platforms#mobile" className="flex items-center gap-2 text-[14px] font-semibold">
              Get the Android app <ArrowUpRight size={16} aria-hidden />
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
