import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Seo from './Seo'
import ArrowLink from './ArrowLink'
import { trackEvent } from '../lib/analytics'
import { scrollToTop } from '../lib/scroll'
import {
  ROUNDS_PER_GAME,
  cta,
  drawRounds,
  results,
  type Round,
} from '../data/kennenlernen'

type Phase = 'intro' | 'round' | 'result'

interface Statement {
  text: string
  isTruth: boolean
}

const ease = [0.22, 1, 0.36, 1] as const

const screen = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <div className="h-2 w-2 rounded-full bg-accent" />
      <span className="font-body text-xs uppercase tracking-[0.3em] text-content-tertiary">
        {children}
      </span>
    </div>
  )
}

function PrimaryButton({
  children,
  onClick,
  btnRef,
}: {
  children: React.ReactNode
  onClick: () => void
  btnRef?: React.Ref<HTMLButtonElement>
}) {
  return (
    <button
      ref={btnRef}
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-center rounded-sm bg-accent px-8 py-3.5 font-body text-xs font-bold uppercase tracking-[0.15em] text-surface transition-all duration-base ease-smooth hover:scale-[1.02] hover:brightness-110"
      data-hover
    >
      {children}
    </button>
  )
}

export default function Kennenlernen() {
  const [phase, setPhase] = useState<Phase>('intro')
  const [rounds, setRounds] = useState<Round[]>([])
  const [index, setIndex] = useState(0)
  const [statements, setStatements] = useState<Statement[]>([])
  const [picked, setPicked] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const nextRef = useRef<HTMLButtonElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)

  const round = rounds[index]

  // New round → shuffle positions a/b
  useEffect(() => {
    if (!round) return
    const s: Statement[] = [
      { text: round.truth.text, isTruth: true },
      { text: round.lie.text, isTruth: false },
    ]
    setStatements(Math.random() < 0.5 ? s : [s[1], s[0]])
    setPicked(null)
  }, [round])

  // Move keyboard focus to the new screen's heading once it has animated in
  // (not on first page load, to keep the normal page entry behaviour)
  const started = useRef(false)
  const focusHeading = () => {
    if (started.current) headingRef.current?.focus({ preventScroll: true })
  }

  const start = () => {
    started.current = true
    scrollToTop()
    setRounds(drawRounds())
    setIndex(0)
    setScore(0)
    setPhase('round')
    trackEvent('game_start')
  }

  const pick = (i: number) => {
    if (picked !== null) return
    setPicked(i)
    if (statements[i].isTruth) setScore((s) => s + 1)
    setTimeout(() => nextRef.current?.focus(), 50)
  }

  const next = () => {
    scrollToTop()
    if (index + 1 < rounds.length) {
      setIndex(index + 1)
    } else {
      setPhase('result')
      trackEvent('game_complete', { score })
    }
  }

  const bucket = score === 3 ? results.high : score === 2 ? results.mid : results.low
  const mailto = `mailto:${cta.email}?subject=${encodeURIComponent(cta.subject)}&body=${encodeURIComponent(cta.body)}`
  const correct = picked !== null && statements[picked]?.isTruth

  return (
    <>
      <Seo
        title="1 Wahrheit, 1 Lüge – Lern Noline kennen"
        description="Ein kleines Spiel statt eines langen Anschreibens: Drei Runden, je zwei Aussagen über Noline Lindor. Eine stimmt, eine ist erfunden. Findest du die Wahrheit?"
        path="/kennenlernen"
        image="/og-kennenlernen.jpg"
      />
      {/* Same depth stage as the home page */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            'radial-gradient(70% 50% at 50% 0%, rgba(251,119,81,0.06), transparent 70%), radial-gradient(135% 115% at 50% 0%, #3B3B3B 0%, #353535 28%, #2B2B2B 62%, #1F1F1F 100%)',
        }}
      />

      <main className="min-h-screen px-6 pb-28 pt-36 md:px-12 md:pt-44">
        <div className="mx-auto max-w-2xl">
          <AnimatePresence mode="wait">
            {/* ───────── Intro ───────── */}
            {phase === 'intro' && (
              <motion.section key="intro" {...screen}>
                <Eyebrow>Ein kleines Spiel statt eines langen Anschreibens</Eyebrow>
                <h1
                  ref={headingRef}
                  tabIndex={-1}
                  className="font-display text-display leading-[1] tracking-[-0.02em] text-content outline-none"
                >
                  1 Wahrheit,
                  <br />
                  <em className="text-accent">1 Lüge.</em>
                </h1>
                <p className="mt-8 max-w-[46ch] font-body text-base font-light leading-relaxed text-content-secondary md:text-lg">
                  Drei Runden, jeweils zwei Aussagen über mich. Eine stimmt, eine ist frei
                  erfunden. Findest du raus, welche wahr ist?
                </p>
                <div className="mt-10">
                  <PrimaryButton onClick={start}>Los geht&apos;s</PrimaryButton>
                </div>
              </motion.section>
            )}

            {/* ───────── Round ───────── */}
            {phase === 'round' && round && (
              <motion.section key={`round-${index}`} {...screen} onAnimationComplete={focusHeading}>
                <Eyebrow>
                  Runde {index + 1} von {ROUNDS_PER_GAME}
                </Eyebrow>
                <h2
                  ref={headingRef}
                  tabIndex={-1}
                  className="font-display text-2xl leading-tight text-content outline-none md:text-3xl"
                >
                  Welche Aussage ist <em className="text-accent">wahr</em>?
                </h2>

                <div className="mt-10 grid gap-4" role="group" aria-label="Zwei Aussagen zur Auswahl">
                  {statements.map((s, i) => {
                    const done = picked !== null
                    const isPicked = picked === i
                    const state = !done
                      ? 'idle'
                      : isPicked
                        ? s.isTruth
                          ? 'hit'
                          : 'miss'
                        : 'other'
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => pick(i)}
                        disabled={done}
                        aria-pressed={isPicked}
                        className={[
                          'relative rounded-lg border-2 py-6 pl-16 pr-6 text-left font-body text-base font-medium leading-relaxed transition-all duration-base ease-smooth md:text-lg',
                          state === 'idle' &&
                            'border-transparent bg-content text-surface-deep shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)] hover:-translate-y-[3px] hover:border-accent hover:shadow-[0_14px_34px_-10px_rgba(251,119,81,0.35)]',
                          state === 'hit' && 'border-accent bg-content text-surface-deep',
                          state === 'miss' && 'border-accent bg-[#FDE3DA] text-surface-deep',
                          state === 'other' &&
                            (s.isTruth
                              ? 'border-transparent bg-content text-surface-deep'
                              : 'border-transparent bg-content text-surface-deep opacity-60'),
                        ]
                          .filter(Boolean)
                          .join(' ')}
                        data-hover
                      >
                        <span
                          aria-hidden
                          className="absolute left-6 top-5 font-display text-2xl italic text-accent"
                        >
                          {i === 0 ? 'a.' : 'b.'}
                        </span>
                        {s.text}
                        {done && (
                          <span
                            className={[
                              'mt-3 block w-fit rounded-full px-3 py-1 font-body text-[11px] font-bold uppercase tracking-[0.14em]',
                              s.isTruth ? 'bg-surface-deep text-content' : 'bg-accent text-surface-deep',
                            ].join(' ')}
                          >
                            {s.isTruth ? 'Wahrheit' : 'Lüge'}
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>

                {/* Reveal — announced to screen readers */}
                <div aria-live="polite">
                  {picked !== null && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0, transition: { duration: 0.35, ease } }}
                      className="mt-8 rounded-r-lg border-l-4 border-accent bg-surface-secondary/70 p-6"
                    >
                      <p className="font-display text-2xl text-content">
                        {correct ? 'Richtig!' : 'Reingefallen!'}
                      </p>
                      <p className="mt-3 font-body text-sm font-light leading-relaxed text-content-secondary md:text-base">
                        <span className="font-medium text-content">Die Wahrheit: </span>
                        {round.truth.reveal}
                      </p>
                      {round.truth.image && (
                        <img
                          src={round.truth.image.src}
                          alt={round.truth.image.alt}
                          width={round.truth.image.width}
                          height={round.truth.image.height}
                          loading="lazy"
                          decoding="async"
                          className="mt-4 w-full max-w-sm rounded-md"
                        />
                      )}
                      <p className="mt-4 font-body text-sm font-light leading-relaxed text-content-secondary md:text-base">
                        <span className="font-medium text-content">Die Lüge: </span>
                        {round.lie.lieReveal}
                      </p>
                    </motion.div>
                  )}
                </div>

                {picked !== null && (
                  <div className="mt-8">
                    <PrimaryButton onClick={next} btnRef={nextRef}>
                      {index + 1 < rounds.length ? 'Weiter' : 'Zum Ergebnis'}
                    </PrimaryButton>
                  </div>
                )}
              </motion.section>
            )}

            {/* ───────── Result ───────── */}
            {phase === 'result' && (
              <motion.section key="result" {...screen} onAnimationComplete={focusHeading}>
                <Eyebrow>Auflösung</Eyebrow>
                <p className="font-display leading-none text-content" aria-label={`${score} von ${ROUNDS_PER_GAME} Wahrheiten erkannt`}>
                  <span className="text-[clamp(4.5rem,16vw,7.5rem)] text-accent">{score}</span>
                  <span className="ml-2 font-body text-lg font-light text-content-tertiary">
                    / {ROUNDS_PER_GAME} Wahrheiten erkannt
                  </span>
                </p>
                <h2
                  ref={headingRef}
                  tabIndex={-1}
                  className="mt-8 font-display text-2xl leading-tight text-content outline-none md:text-3xl"
                >
                  {bucket.headline}
                </h2>
                <p className="mt-4 max-w-[46ch] font-body text-base font-light leading-relaxed text-content-secondary">
                  {bucket.text}
                </p>

                <div className="mt-12 rounded-lg bg-content p-8 text-surface-deep">
                  <h3 className="font-display text-2xl">{cta.headline}</h3>
                  <p className="mt-3 max-w-[44ch] font-body text-sm leading-relaxed text-surface-deep/75 md:text-base">
                    {cta.text}
                  </p>
                  <a
                    href={mailto}
                    onClick={() => trackEvent('game_mail_click', { score })}
                    className="mt-6 inline-flex items-center justify-center rounded-sm bg-accent px-8 py-3.5 font-body text-xs font-bold uppercase tracking-[0.15em] text-surface-deep transition-all duration-base ease-smooth hover:scale-[1.02] hover:brightness-110"
                    data-hover
                  >
                    Mail schreiben
                  </a>
                </div>

                <ArrowLink onClick={start} className="mt-8">
                  Nochmal spielen – mit neuen Runden
                </ArrowLink>
              </motion.section>
            )}
          </AnimatePresence>

          <p className="mt-20 font-body text-xs text-content-tertiary">
            Handgebaut von Noline · Creative Technologist
          </p>
        </div>
      </main>
    </>
  )
}
