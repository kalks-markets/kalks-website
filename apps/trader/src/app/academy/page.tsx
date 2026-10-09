import type { Metadata } from 'next';
import { PageHero } from '@/components/kx/PageHero';
import { StatRow } from '@/components/kx/StatRow';
import { Btn } from '@/components/ui/Button';
import { Section, SectionHead, Feature } from '@/components/ui/Section';
import { ACADEMY } from '@/content/facts';
import { REGISTER_HREF } from '@/lib/crm';

export const metadata: Metadata = {
  title: `Kalks Academy: ${ACADEMY.lessons} lessons in ${ACADEMY.phases} phases`,
  description: `Learn to trade with Kalks Academy: ${ACADEMY.lessons} lessons from markets and instruments to macro regimes and FX options, a quiz after every lesson, phase exams and verifiable certificates.`,
  alternates: { canonical: '/academy' },
};

const LEVEL: Record<string, string> = {
  Beginner: 'st-info',
  Intermediate: 'st-warn',
  Advanced: 'st-bad',
  Professional: 'st-ok',
};

export default function AcademyPage() {
  return (
    <>
      <PageHero
        kicker="KALKS ACADEMY"
        title="Learn it properly. Then trade it."
        lede={`${ACADEMY.lessons} lessons in ${ACADEMY.phases} phases, from how markets work to macro regimes and FX options. A quiz after every lesson and certificates anyone can verify.`}
        photo="academy"
        actions={
          <>
            <Btn href={REGISTER_HREF} v="red" s={56} arrow>
              Start learning
            </Btn>
            <Btn href="#phases" v="ghost" s={56}>
              See the phases
            </Btn>
          </>
        }
      >
        <StatRow items={[
          { v: String(ACADEMY.phases), l: 'Phases, beginner to professional' },
          { v: String(ACADEMY.lessons), l: 'Lessons, each with a quiz' },
          { v: String(ACADEMY.quizQuestions), l: 'Quiz questions' },
          { v: String(ACADEMY.glossary), l: 'Terms in the glossary' },
        ]} />
      </PageHero>

      <Section id="phases" labelledBy="phases-title">
        <SectionHead
          id="phases-title"
          kicker="01 — THE PATH"
          title="Nine phases, one direction."
          lede={`Phases 1 to 8 each have a fundamental and a technical track. Phase 9 is an elective on Kalks FX Options. Pass a phase exam with ${ACADEMY.passMark} to earn its certificate.`}
        />
        <ol className="card px-2 py-2">
          {ACADEMY.list.map((p) => (
            <li
              key={p.n}
              className="grid grid-cols-[auto_1fr] items-center gap-x-5 gap-y-2 rounded-[16px] px-4 py-4 transition-colors hover:bg-s3 sm:grid-cols-[auto_1fr_auto_auto] [&+li]:shadow-[inset_0_1px_0_var(--line)]"
            >
              <span className="step-n">{String(p.n).padStart(2, '0')}</span>
              <h3 className="d-wide text-[clamp(17px,1.8vw,22px)]">{p.title}</h3>
              <span className={`st ${LEVEL[p.level]} col-start-2 justify-self-start sm:col-start-auto`}>{p.level}</span>
              <span className="col-start-2 font-mono text-[13px] text-tx2 sm:col-start-auto sm:w-24 sm:text-right">{p.lessons} lessons</span>
            </li>
          ))}
        </ol>
      </Section>

      <Section labelledBy="how-ac" className="sec-last">
        <SectionHead id="how-ac" kicker="02 — HOW IT WORKS" title="Short lessons. Real exams." />
        <div className="grid gap-4 lg:grid-cols-3">
          <Feature t="Lessons that fit a coffee break" d="Short, focused lessons with examples from real markets, each followed by a quiz that checks you understood it." />
          <Feature t="Exams with a pass mark" d={`Every phase ends with a 15-question exam. Score ${ACADEMY.passMark} and the certificate is yours, with a code anyone can verify.`} />
          <Feature t="A glossary for every term" d={`${ACADEMY.glossary} trading terms in plain language, linked from the lessons that use them.`} />
        </div>
      </Section>
    </>
  );
}
