import { Suspense, lazy, useCallback, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Seo from './Seo'
import ArrowLink from './ArrowLink'
import { truths } from '../data/kennenlernen'
import { trackEvent } from '../lib/analytics'
import type { SceneApi } from './NotFoundScene'

const NotFoundScene = lazy(() => import('./NotFoundScene'))

/** Share of blocks that must be down to count the wall as "abgerissen". */
const GOAL = 0.6

function hasWebGL(): boolean {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

export default function NotFound() {
  const apiRef = useRef<SceneApi | null>(null)
  const [sceneKey, setSceneKey] = useState(0)
  const [progress, setProgress] = useState({ down: 0, total: 0 })
  const [won, setWon] = useState(false)
  const [throws, setThrows] = useState(0)
  const webgl = useMemo(hasWebGL, [])

  // A random truth from the get-to-know game as the reward
  const [truthIndex, setTruthIndex] = useState(() => Math.floor(Math.random() * truths.length))
  const reward = truths[truthIndex]

  const onProgress = useCallback(
    (down: number, total: number) => {
      setProgress({ down, total })
      if (!won && total > 0 && down / total >= GOAL) {
        setWon(true)
        trackEvent('404_wall_down')
      }
    },
    [won]
  )

  const rebuild = () => {
    setWon(false)
    setProgress({ down: 0, total: 0 })
    setThrows(0)
    setTruthIndex((i) => (i + 1 + Math.floor(Math.random() * (truths.length - 1))) % truths.length)
    setSceneKey((k) => k + 1)
  }

  const pct = progress.total ? Math.round((progress.down / progress.total) * 100) : 0

  return (
    <>
      <Seo
        title="Sackgasse · Noline Lindor"
        description="Diese Seite gibt es nicht – aber eine Mauer, die du umwerfen kannst."
        path="/404"
        noindex
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            'radial-gradient(70% 50% at 50% 0%, rgba(251,119,81,0.06), transparent 70%), radial-gradient(135% 115% at 50% 0%, #3B3B3B 0%, #353535 28%, #2B2B2B 62%, #1F1F1F 100%)',
        }}
      />

      <main className="relative min-h-[100svh] overflow-hidden">
        {/* 3D wall (fills the screen, below the text) */}
        {webgl && (
          <div
            className="absolute inset-0 cursor-crosshair touch-none"
            onPointerDown={() => setThrows((t) => t + 1)}
          >
            <Suspense fallback={null}>
              <NotFoundScene key={sceneKey} apiRef={apiRef} onProgress={onProgress} />
            </Suspense>
          </div>
        )}

        {/* Text overlay — pointer-events off so clicks reach the canvas */}
        <div className="pointer-events-none relative z-10 px-6 pt-32 md:px-12 md:pt-36 lg:px-24">
          <div className="mb-5 flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-accent" />
            <span className="font-body text-xs uppercase tracking-[0.3em] text-content-tertiary">
              404 · Sackgasse
            </span>
          </div>
          <h1 className="font-display text-3xl leading-[1.05] tracking-[-0.01em] text-content md:text-4xl">
            Diese Seite gibt&apos;s nicht.
            <br />
            <em className="text-accent">Aber eine Mauer.</em>
          </h1>
          <p className="mt-4 max-w-[38ch] font-body text-sm font-light leading-relaxed text-content-secondary md:text-base">
            {webgl
              ? 'Wenn du schon in einer Sackgasse stehst: Reiß sie ab. Klick oder tipp, um zu werfen.'
              : 'Hier wäre eigentlich eine Mauer zum Umwerfen – dein Browser kann leider kein 3D. Dafür gibt es unten trotzdem einen Weg weiter.'}
          </p>

          <div className="pointer-events-auto mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <ArrowLink to="/" arrow="left">
              Zur Startseite
            </ArrowLink>
            {webgl && !won && (
              <button
                type="button"
                onClick={() => {
                  apiRef.current?.throwBall()
                  setThrows((t) => t + 1)
                }}
                className="rounded-sm border border-content/40 px-4 py-2 font-body text-[11px] font-bold uppercase tracking-[0.15em] text-content transition-colors duration-fast hover:bg-content/10"
                data-hover
              >
                Ball werfen
              </button>
            )}
          </div>
        </div>

        {/* Progress */}
        {webgl && !won && (
          <div
            className="pointer-events-none absolute bottom-8 left-6 right-6 z-10 md:left-12 lg:left-24"
            aria-live="polite"
          >
            <p className="font-body text-xs uppercase tracking-[0.2em] text-content-tertiary">
              {throws === 0 ? 'Noch steht sie.' : `${pct} % abgerissen`}
            </p>
            <div className="mt-2 h-[2px] w-48 bg-content/15">
              <div
                className="h-full bg-accent transition-[width] duration-300"
                style={{ width: `${Math.min(100, (pct / (GOAL * 100)) * 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Reward (also shown directly without WebGL) */}
        <AnimatePresence>
          {(won || !webgl) && (
            <motion.aside
              key="reward"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
              exit={{ opacity: 0, y: 12 }}
              className="absolute bottom-6 left-6 right-6 z-20 max-w-md rounded-lg bg-content p-6 text-surface-deep shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)] md:bottom-10 md:left-auto md:right-12 lg:right-24"
              aria-live="polite"
            >
              <p className="font-body text-[11px] font-bold uppercase tracking-[0.16em] text-accent">
                {webgl ? 'Sackgasse abgerissen' : 'Trostpreis'}
              </p>
              <p className="mt-2 font-display text-xl leading-snug md:text-2xl">
                Zur Belohnung ein kleiner Spoiler fürs Kennenlern-Spiel:
              </p>
              <p className="mt-3 font-body text-sm font-medium leading-relaxed">„{reward.text}“</p>
              <p className="mt-1 font-body text-sm leading-relaxed text-surface-deep/70">
                Stimmt wirklich. {reward.reveal}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
                <ArrowLink to="/kennenlernen" tone="dark">
                  Mehr davon: 1 Wahrheit, 1 Lüge
                </ArrowLink>
                <ArrowLink to="/" arrow="left" tone="dark">
                  Zur Startseite
                </ArrowLink>
                {webgl && (
                  <button
                    type="button"
                    onClick={rebuild}
                    className="font-body text-sm text-surface-deep/70 underline decoration-surface-deep/30 underline-offset-4 transition-colors hover:text-surface-deep"
                    data-hover
                  >
                    Wieder aufbauen
                  </button>
                )}
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </main>
    </>
  )
}
