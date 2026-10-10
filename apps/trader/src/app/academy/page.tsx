import type { Metadata } from 'next';
import { ACADEMY } from '@/content/facts';
import { REGISTER_HREF } from '@/lib/crm';
import { HeroGlass, PageHero } from '@/components/site/Heroes';
import { BentoCard, Btn, Cta, Head, StatStrip } from '@/components/site/ui';
import { Shot } from '@/components/site/Shot';
import { Rise } from '@/components/site/Rise';
import { HEROES } from '@/content/heroes';
import { cn } from '@/lib/cn';

export const metadata: Metadata = {
  title: `Kalks Academy: ${ACADEMY.lessons} lessons in ${ACADEMY.phases} phases`,
  description: `Learn to trade with Kalks Academy: ${ACADEMY.lessons} lessons from markets and instruments to macro regimes and FX options, a quiz after every lesson, phase exams and verifiable certificates.`,
  alternates: { canonical: '/academy' },
};

/** the Client Area's Academy shelf: each phase is a book (local screenshot, 2×) */
const BOOKS = { src: '/site/shots/academy-books.webp', w: 2632, h: 1948, alt: 'The Academy in the Client Area: each phase is a book, with its level, length and your progress' };

/** same finishes as the books in the Client Area */
const LEVEL_TONE: Record<string, string> = {
  Beginner: 'bg-[#f2600c] text-white',
  Intermediate: 'bg-[#a8582c] text-white',
  Advanced: 'bg-[#1d1d21] text-white ring-1 ring-white/15',
  Professional: 'bg-[#c8892b] text-[#2a1a04]',
};

export default function AcademyPage() {
  return (
    <>
      <PageHero
        photo="academy"
        eyebrow="Kalks Academy"
        title={
          <>
            Learn it properly. <span className="text-white/60">Then trade it.</span>
          </>
        }
        lead={`${ACADEMY.lessons} lessons in ${ACADEMY.phases} phases, from how markets work to macro regimes and FX options. A quiz after every lesson and certificates anyone can verify.`}
        actions={
          <>
            <Btn href={REGISTER_HREF}>Start learning</Btn>
            <Btn href="#phases" variant="ghost" icon={false}>
              See the phases
            </Btn>
          </>
        }
        aside={
          <HeroGlass>
            <div className="s-num text-[56px]">{ACADEMY.passMark}</div>
            <div className="mt-2 text-[13.5px] text-white/80">to pass a phase exam and earn its certificate</div>
          </HeroGlass>
        }
      />

      <section className="s-sec" aria-label="The Academy in numbers">
        <div className="s-wrap">
          <StatStrip
            items={[
              { v: ACADEMY.phases, l: 'Phases, beginner to professional' },
              { v: ACADEMY.lessons, l: 'Lessons, each with a quiz' },
              { v: ACADEMY.quizQuestions, l: 'Quiz questions' },
              { v: ACADEMY.glossary, l: 'Terms in the glossary' },
            ]}
          />
        </div>
      </section>

      <section className="s-sec s-band" aria-labelledby="shelf-title">
        <div className="s-wrap">
          <Head
            id="shelf-title"
            index="01"
            eyebrow="In the Client Area"
            title={
              <>
                Every phase <span className="s-mute">is a book.</span>
              </>
            }
            lead="Open a phase like a book and read it chapter by chapter. Your progress, the next lesson and every certificate you earn stay on your shelf."
          />
          <Rise>
            <Shot shot={BOOKS} />
          </Rise>
        </div>
      </section>

      <section id="phases" className="s-sec scroll-mt-24" aria-labelledby="phases-title">
        <div className="s-wrap">
          <Head
            id="phases-title"
            index="02"
            eyebrow="The path"
            title={
              <>
                Nine phases, <span className="s-mute">one direction.</span>
              </>
            }
            lead={`Phases 1 to 8 each have a fundamental and a technical track. Phase 9 is an elective on Kalks FX Options. Pass a phase exam with ${ACADEMY.passMark} to earn its certificate.`}
          />
          <ol className="border-t border-[var(--s-line)]">
            {ACADEMY.list.map((p, i) => (
              <Rise as="li" key={p.n} delay={i * 40} className="grid grid-cols-[56px_1fr] items-center gap-x-5 gap-y-2 border-b border-[var(--s-line)] py-6 sm:grid-cols-[72px_1fr_auto_120px]">
                <span className="s-num text-[34px] text-[var(--s-orange2)]">{String(p.n).padStart(2, '0')}</span>
                <h3 className="text-[clamp(20px,2vw,28px)] font-[450] leading-tight tracking-[-0.03em]">{p.title}</h3>
                <span className={cn('col-start-2 justify-self-start rounded-full px-3 py-1 text-[12px] font-semibold sm:col-start-auto', LEVEL_TONE[p.level])}>{p.level}</span>
                <span className="col-start-2 font-mono text-[13px] text-[var(--s-tx2)] sm:col-start-auto sm:text-end">{p.lessons} lessons</span>
              </Rise>
            ))}
          </ol>
        </div>
      </section>

      <section className="s-sec !pt-4" aria-labelledby="how-ac">
        <div className="s-wrap">
          <Head id="how-ac" index="03" eyebrow="How it works" title={<>Short lessons. <span className="s-mute">Real exams.</span></>} />
          <div className="grid gap-4 lg:grid-cols-3">
            <BentoCard tone="cream" title="Lessons that fit a coffee break" text="Short, focused lessons with examples from real markets, each followed by a quiz that checks you understood it." />
            <BentoCard tone="orange" delay={60} title="Exams with a pass mark" text={`Every phase ends with a 15-question exam. Score ${ACADEMY.passMark} and the certificate is yours, with a code anyone can verify.`} />
            <BentoCard tone="glass" delay={120} title="A glossary for every term" text={`${ACADEMY.glossary} trading terms in plain language, linked from the lessons that use them.`} />
          </div>
        </div>
      </section>

      <Cta
        title={
          <>
            Start with <span className="text-white/70">phase one.</span>
          </>
        }
        sub="The Academy is in the Client Area. Open an account and begin with Markets and instruments."
        primary={{ href: REGISTER_HREF, label: 'Start learning' }}
        image={HEROES.academy}
      />
    </>
  );
}
