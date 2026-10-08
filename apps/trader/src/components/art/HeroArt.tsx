import { Badges } from '@/components/ui/Flag';
import { KMark } from '@/components/brand/Logo';
import { Picture } from '@/components/ui/Picture';
import { CHAIN, usd } from '@/components/mock/chain';
import { OPTIONS_ACCOUNTS, ACCOUNTS, PROP, IB } from '@/content/facts';

/*
 * Solid-colour hero compositions (KALKS2 §8, IMAGE-BRIEF W-02 … W-10). Until the briefed photographs exist, each page
 * hero carries one flat subject built from the brand's own shapes: NeoPOP blocks with solid edges, never stock photos.
 */

/** W-02 Options (red): the long-call payoff as a NeoPOP line, the premium as a yellow sphere, plus the What happens card. */
export function PayoffArt() {
  const pick = CHAIN[4];
  const edge = [1, 2, 3, 4, 5, 6];
  const d = (o: number) => `M${24 + o} ${300 + o}H${292 + o}L${572 + o} ${36 + o}`;
  return (
    <div className="relative mx-auto h-full min-h-[420px] w-full max-w-[600px] max-xl:min-h-[360px]">
      <svg viewBox="0 0 600 420" className="absolute inset-x-0 bottom-0 h-auto w-full" aria-hidden>
        <line x1="10" y1="356" x2="590" y2="356" stroke="rgba(255,255,255,.4)" strokeWidth="2.5" strokeDasharray="5 9" />
        {edge.map((o) => (
          <path key={o} d={d(o)} fill="none" stroke="#5E0611" strokeWidth="16" strokeLinejoin="round" strokeLinecap="round" />
        ))}
        <path d={d(0)} fill="none" stroke="#fff" strokeWidth="16" strokeLinejoin="round" strokeLinecap="round" />
        {edge.map((o) => (
          <circle key={o} cx={292 + o} cy={300 + o} r="24" fill="#0B0809" />
        ))}
        <circle cx="292" cy="300" r="24" fill="#FFD21F" />
        <text x="24" y="392" fill="rgba(255,255,255,.82)" fontFamily="var(--f-mono)" fontSize="14" fontWeight="600">
          LOSS CAPPED AT THE PREMIUM
        </text>
        <text x="292" y="392" fill="rgba(255,255,255,.82)" fontFamily="var(--f-mono)" fontSize="14" fontWeight="600" textAnchor="middle">
          STRIKE
        </text>
        <text x="580" y="392" fill="rgba(255,255,255,.82)" fontFamily="var(--f-mono)" fontSize="14" fontWeight="600" textAnchor="end">
          PROFIT IF IT RISES
        </text>
      </svg>
      <div className="theme-dark absolute left-0 top-[2%] w-[290px] rounded-[20px] bg-[rgba(11,8,9,0.9)] p-4 text-tx shadow-[0_30px_60px_-24px_rgba(40,0,0,0.6),inset_0_0_0_1px_rgba(255,255,255,0.08)] max-sm:w-[260px]">
        <p className="font-mono text-[11.5px] font-semibold text-k-yel">WHAT HAPPENS · EXAMPLE</p>
        <p className="mt-2 flex items-center gap-2 text-[14.5px] font-semibold">
          <Badges symbol="EURUSD" size={18} /> Buy 1 EUR/USD {pick.k} call
        </p>
        <dl className="facts mt-2 [&>div]:py-2 [&>div]:text-[13px]">
          <div>
            <dt>You pay</dt>
            <dd className="font-mono">{usd(pick.c)}</dd>
          </div>
          <div>
            <dt>Most you can lose</dt>
            <dd className="font-mono">{usd(pick.c)}</dd>
          </div>
          <div>
            <dt>Profit if above</dt>
            <dd className="font-mono text-up-tx">{pick.cb}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

/** W-04 Accounts (ink): one CFD card with a red edge, one Options card with a yellow edge. */
export function AccountCardsArt() {
  const std = ACCOUNTS[0];
  const opt = OPTIONS_ACCOUNTS[0];
  const card =
    'absolute w-[min(370px,80%)] rounded-[24px] p-6 text-[#F6EEE8] [background:linear-gradient(160deg,#211a1c,#141011)]';
  const edge = (c: string) => ({ boxShadow: [1, 2, 3, 4, 5, 6, 7, 8].map((o) => `${o}px ${o}px 0 ${c}`).join(',') });
  return (
    <div className="relative mx-auto h-[440px] w-full max-w-[560px] max-xl:h-[380px] max-sm:h-[410px]" aria-hidden>
      <div className={`${card} left-0 top-[6%] -rotate-[5deg]`} style={edge('#D4112A')}>
        <div className="flex items-center justify-between">
          <span className="tag !bg-[#F6EEE8] !text-[#0B0809]">CFD</span>
          <KMark className="h-[22px] w-auto" />
        </div>
        <p className="d-wide mt-10 text-[24px]">{std.name}</p>
        <p className="mt-1 font-mono text-[12.5px] text-[#B8AAA5]">From {std.minDeposit} · up to {std.leverage}</p>
        <div className="mt-6 flex items-end justify-between">
          <span className="font-mono text-[12px] text-[#928380]">FOREX · METALS · INDICES · CRYPTO</span>
        </div>
      </div>
      <div className={`${card} bottom-[4%] right-0 rotate-[4deg]`} style={edge('#FFD21F')}>
        <div className="flex items-center justify-between">
          <span className="tag opt">Options</span>
          <KMark className="h-[22px] w-auto" />
        </div>
        <p className="d-wide mt-10 text-[24px]">{opt.name}</p>
        <p className="mt-1 font-mono text-[12.5px] text-[#B8AAA5]">$0.25 a contract · calls &amp; puts</p>
        <div className="mt-6 font-mono text-[12px] text-[#928380]">FOREX · GOLD · SILVER · OIL</div>
      </div>
    </div>
  );
}

/** W-06 Prop (red): the challenge progress card. */
export function PropArt() {
  const p = PROP[0];
  const Meter = ({ v, label, target, done }: { v: number; label: string; target: string; done?: boolean }) => (
    <div>
      <div className="flex items-baseline justify-between text-[13px]">
        <span className="font-semibold">{label}</span>
        <span className="font-mono text-tx3">{target}</span>
      </div>
      <div className="relative mt-2 h-[10px] rounded-full bg-s4 shadow-[inset_0_1px_2px_rgba(0,0,0,0.25)]">
        <span className="absolute inset-y-0 left-0 rounded-full bg-up" style={{ width: `${v}%` }} />
        <span className="absolute -top-[3px] h-4 w-[3px] rounded-full bg-tx" style={{ left: '100%', marginLeft: -3 }} />
      </div>
      {done && <p className="mt-1.5 text-[12px] text-up-tx">Target reached</p>}
    </div>
  );
  return (
    <div className="relative mx-auto flex h-full w-full max-w-[460px] items-center justify-center">
      <div className="theme-dark relative w-full rounded-[24px] bg-[rgba(11,8,9,0.92)] p-6 text-tx shadow-[0_40px_80px_-30px_rgba(40,0,0,0.6),inset_0_0_0_1px_rgba(255,255,255,0.08)]">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[12px] font-semibold text-k-yel">{p.name.toUpperCase()} · $100K</span>
          <span className="st st-info">Simulated</span>
        </div>
        <p className="money mt-4 text-[34px]">
          Up to <span className="text-k-yel">90%</span>
        </p>
        <p className="text-[13px] text-tx2">of the profit on a funded account, with scaling</p>
        <div className="mt-6 flex flex-col gap-5">
          <Meter v={100} label="Phase 1" target="8% target" done />
          <Meter v={58} label="Phase 2" target="5% target" />
          <div className="flex items-center justify-between rounded-[14px] bg-s2 px-4 py-3 shadow-[inset_0_0_0_1px_var(--line)]">
            <span className="text-[13px] font-semibold">Funded</span>
            <span className="font-mono text-[12.5px] text-tx2">{p.payouts.split(',')[0]}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/** W-08 Partners (red): three tiers of a network around you. */
export function NetworkArt() {
  const shares = IB.tierShares.split(' · ');
  const nodes = [
    { x: 300, y: 60, r: 44, t: 'YOU', you: true },
    { x: 140, y: 170, r: 30, t: shares[0] },
    { x: 300, y: 190, r: 30, t: shares[0] },
    { x: 460, y: 170, r: 30, t: shares[0] },
    { x: 80, y: 300, r: 22, t: shares[1] },
    { x: 200, y: 300, r: 22, t: shares[1] },
    { x: 400, y: 300, r: 22, t: shares[1] },
    { x: 520, y: 300, r: 22, t: shares[1] },
    { x: 140, y: 400, r: 16, t: shares[2] },
    { x: 460, y: 400, r: 16, t: shares[2] },
  ];
  const links = [
    [0, 1], [0, 2], [0, 3], [1, 4], [1, 5], [3, 6], [3, 7], [5, 8], [6, 9],
  ];
  return (
    <svg viewBox="0 0 600 440" className="mx-auto h-full max-h-[420px] w-full max-w-[600px]" aria-hidden>
      {links.map(([a, b]) => (
        <line key={`${a}-${b}`} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} stroke="rgba(255,255,255,.45)" strokeWidth="3" />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          {[2, 4, 6].map((o) => (
            <circle key={o} cx={n.x + o} cy={n.y + o} r={n.r} fill={n.you ? '#0B0809' : '#5E0611'} />
          ))}
          <circle cx={n.x} cy={n.y} r={n.r} fill={n.you ? '#FFD21F' : '#fff'} />
          <text
            x={n.x}
            y={n.y + (n.r > 20 ? 5 : 4)}
            textAnchor="middle"
            fontFamily="var(--f-mono)"
            fontWeight="700"
            fontSize={n.you ? 18 : n.r > 25 ? 14 : n.r > 20 ? 11 : 9}
            fill="#0B0809"
          >
            {n.t}
          </text>
        </g>
      ))}
    </svg>
  );
}

/** W-10 White-label (yellow): the Kalks app icon hands over to yours. */
export function BrandSwapArt() {
  const sq = 'grid place-items-center rounded-[34px] max-sm:rounded-[26px]';
  return (
    <div className="relative mx-auto flex h-full w-full max-w-[520px] items-center justify-center gap-6 py-6 max-sm:gap-4" aria-hidden>
      <div className="flex flex-col items-center gap-3">
        <div className={`${sq} h-[170px] w-[170px] bg-[#0B0809] shadow-[8px_8px_0_#5C4600] max-sm:h-[120px] max-sm:w-[120px]`}>
          <KMark className="h-[44%] w-auto" />
        </div>
        <span className="font-mono text-[12px] font-semibold text-[#4A3A20]">KALKS</span>
      </div>
      <span className="d text-[40px] text-[#0B0809]">→</span>
      <div className="flex flex-col items-center gap-3">
        <div
          className={`${sq} h-[170px] w-[170px] bg-white shadow-[8px_8px_0_#5C4600] max-sm:h-[120px] max-sm:w-[120px]`}
        >
          <span className="grid h-[58%] w-[58%] place-items-center rounded-[22px] border-[3px] border-dashed border-[#0B0809]/45 text-center font-mono text-[12px] font-semibold leading-tight text-[#0B0809]/70 max-sm:text-[10px]">
            YOUR
            <br />
            LOGO
          </span>
        </div>
        <span className="font-mono text-[12px] font-semibold text-[#4A3A20]">YOUR BRAND</span>
      </div>
    </div>
  );
}

/** A founder image in a hero column, edges faded into the card colour (the frame never ends). */
export function HeroImage({
  name,
  widths,
  w,
  h,
  alt,
  sizes,
  priority = true,
  mask = 'radial-gradient(75% 80% at 60% 45%, #000 55%, transparent 100%)',
  className,
}: {
  name: string;
  widths: number[];
  w: number;
  h: number;
  alt: string;
  sizes: string;
  priority?: boolean;
  mask?: string;
  className?: string;
}) {
  return (
    <div className={`relative flex h-full w-full items-center justify-center ${className ?? ''}`}>
      <Picture
        name={name}
        widths={widths}
        w={w}
        h={h}
        alt={alt}
        sizes={sizes}
        priority={priority}
        imgClassName="h-auto w-full object-contain"
        style={{ WebkitMaskImage: mask, maskImage: mask }}
      />
    </div>
  );
}

/** W-07 Copy trading (yellow): the master in front, a fainter follower half a step behind in the same pose. */
export function FigurePair() {
  const common = {
    name: '/images/k2/figure',
    widths: [736, 480],
    w: 736,
    h: 1086,
    sizes: '(max-width: 760px) 240px, 480px',
  };
  return (
    <div className="pair-fig">
      <div className="f1" aria-hidden>
        <Picture {...common} alt="" className="block h-full" />
      </div>
      <div className="f2">
        <Picture
          {...common}
          priority
          className="block h-full"
          alt="Two glossy black figures with yellow circuit lines seated in the same pose on flat yellow: a master and a follower"
        />
      </div>
    </div>
  );
}
