/**
 * "1 Wahrheit, 1 Lüge" — content for /kennenlernen.
 * Source of truth for the texts: Obsidian Vault
 * 03-Personal_Brand/Wahrheit_Luege/1-wahrheit-1-luege-spec.md
 *
 * Two separate pools: every round pairs one random truth with one random lie.
 * `wild` = the statement sounds crazy. Each run contains at least one round
 * where the LIE is wild and the TRUTH is not, so "the crazy one is true"
 * stops working as a strategy.
 * `excludes` = ids that must never appear in the same run (e.g. a story that
 * would give away another round). Checked in both directions.
 */

export interface Truth {
  id: string
  text: string
  wild: boolean
  reveal: string
  excludes?: string[]
  image?: { src: string; alt: string; width: number; height: number }
}

export interface Lie {
  id: string
  text: string
  wild: boolean
  lieReveal: string
  excludes?: string[]
}

export const ROUNDS_PER_GAME = 3

export const truths: Truth[] = [
  {
    id: 'geburtsurkunde',
    text: 'Ich habe meine Geburtsurkunde erst ein Jahr nach meiner Geburt bekommen.',
    wild: true,
    reveal:
      'Geboren auf einem kleinen Berg in Haiti – ohne Arzt, nur Frauen und Hebammen. Die Urkunde kam mit einem Jahr Verspätung.',
  },
  {
    id: 'anke',
    text: 'Ich bin in der Duisburger Innenstadt mit Anke Engelke zusammengestoßen – es gibt ein Beweisfoto.',
    wild: true,
    reveal: 'Mitten in der Stadt, im Mai 2013: Zusammenstoß, Lachen, Foto.',
  },
  {
    id: 'heuschrecke',
    text: 'Ich habe schon mal Heuschrecken gegessen.',
    wild: true,
    reveal:
      '2016 bei der Familie meines Partners in Guinea. Sie hatten sie selbst zubereitet, ich habe probiert: knusprig – und schmeckt eigentlich nach nichts.',
    image: {
      src: '/images/kennenlernen/heuschrecken.webp',
      alt: 'Getrocknete Heuschrecken in einer Metallschale und auf einem gelben Sack, Guinea 2016',
      width: 960,
      height: 720,
    },
  },
  {
    id: 'kitty',
    text: 'Ich hatte ein Meerschweinchen namens „Kitty“ – nur damit ich nach der Schule „Hello Kitty“ sagen konnte.',
    wild: true,
    reveal:
      'Mit 13 oder 14. Im Sommer war ich mit meinem Cousin und seiner Familie in Dänemark – da waren wir jedes Jahr, echte Dänemark-Fans. Als ich zurückkam, war Kitty weg. Nie wieder gesehen.',
  },
  {
    id: 'pc',
    text: 'Mit 12 habe ich mit meinem Onkel meinen ersten PC zusammengebaut.',
    wild: true,
    reveal:
      'Mein Onkel hat mir alles Technische beigebracht – und mit 12 haben wir zusammen meinen ersten PC zusammengeschraubt. Seitdem bin ich Windows-Fan.',
    excludes: ['mac'],
  },
  {
    id: 'vogel',
    text: 'In der Grundschule hat mir ein Vogel den Rücken runtergeschissen.',
    wild: true,
    reveal: 'Ich weiß nur noch: Plötzlich wurde es warm am Rücken. Und es war unfassbar peinlich.',
  },
  {
    id: 'thunfisch',
    text: 'Ich habe beim Spaziergang am Rhein eine leere Thunfischdose aufgehoben – und mich komplett mit Thunfischwasser eingesaut.',
    wild: true,
    reveal:
      'Keine Ahnung, was mich da geritten hat. Die ganze Brühe lief über Jacke und Klamotten, es hat bestialisch gestunken – ins Auto durfte ich erst mal nicht. Wie wir das am Ende gelöst haben? Erfolgreich verdrängt.',
  },
  {
    id: 'buehne',
    text: 'Als Kind stand ich oft bei Spendenveranstaltungen auf der Bühne und habe haitianische Volkstänze getanzt.',
    wild: true,
    reveal:
      'Beim Haiti Konbit, dem Kulturfest unseres Vereins, war ich jedes Jahr dabei – irgendwann habe ich auch die Choreos übernommen.',
  },
  {
    id: 'musik',
    text: 'Ich kann nur mit Musik auf den Ohren arbeiten.',
    wild: false,
    reveal:
      'Und zwar wirklich alles: haitianische Musik, mit der ich aufgewachsen bin, Afrobeats, R&B, Hip-Hop, Rock, Lieder auf Hindi und Türkisch. Als Teenie haben mich Beyoncé, Ciara, Chris Brown und Omarion geprägt – und mit meiner besten Freundin habe ich in warmen Sommernächten Blink-182 und Linkin Park gehört und SingStar rauf und runter gespielt.',
  },
  {
    id: 'sonntags',
    text: 'Ich bin mit „Immer wieder sonntags“ aufgewachsen.',
    wild: false,
    reveal:
      'Viel Zeit bei meinem Cousin, dessen deutscher Vater wie ein Ersatz-Papa für mich ist. In vielem bin ich ziemlich deutsch sozialisiert.',
  },
  {
    id: 'schokolade',
    text: 'Ich mag keine Schokolade.',
    wild: false,
    reveal: 'Wirklich nicht. Auch keine dunkle. Kannst du komplett für dich behalten.',
  },
]

export const lies: Lie[] = [
  { id: 'mac', text: 'Ich bin ein echter Mac-Mensch.', wild: false, lieReveal: 'Mac? Nope.' },
  {
    id: 'tieraerztin',
    text: 'Als Kind wollte ich Tierärztin werden.',
    wild: false,
    lieReveal:
      'Auf keinen Fall. Tiere mochte ich – aber mich hat schon als Kind viel mehr interessiert, warum Menschen sich so verhalten, wie sie es tun. Heute heißt das User Experience.',
  },
  {
    id: 'kamera',
    text: 'Ich liebe es, vor der Kamera zu stehen.',
    wild: false,
    lieReveal:
      'Ganz im Gegenteil: Ich bin die hinter der Kamera. Die Ruhige, die beobachtet und alles aufsaugt – und dann Kirmes im Kopf hat und vor neuen Ideen sprüht.',
  },
  {
    id: 'werbung',
    text: 'Ich war als Kind in einer Werbung für Kinderschokolade.',
    wild: true,
    lieReveal: 'Eine Werbung? Leider nie.',
  },
  {
    id: 'wettendass',
    text: 'Ich saß als Kind bei „Wetten, dass..?“ im Publikum.',
    wild: true,
    lieReveal: '„Wetten, dass..?“ kenne ich nur vom Sofa.',
  },
  {
    id: 'musikvideo',
    text: 'Ich habe mal im Hintergrund eines Musikvideos mitgetanzt.',
    wild: true,
    lieReveal: 'Ein Musikvideo? Nur in meinem Kopf.',
  },
  {
    id: 'seilspringen',
    text: 'Ich stehe im Stadtrekord-Buch – fürs längste Seilspringen.',
    wild: true,
    lieReveal: 'Kein Rekord, kein Buch.',
  },
  {
    id: 'billgates',
    text: 'Ich hatte als Kind einen Hamster namens „Bill Gates“.',
    wild: true,
    lieReveal: 'Ein Hamster namens Bill Gates? Leider nicht – wäre aber passend gewesen.',
  },
  {
    id: 'gebaerden',
    text: 'Ich kann fließend Gebärdensprache.',
    wild: true,
    lieReveal: 'Gebärdensprache kann ich leider nicht.',
  },
]

export const results = {
  high: {
    headline: 'Entweder kennst du mich schon – oder wir sind auf einer Wellenlänge.',
    text: '3 von 3. Das schafft fast niemand beim ersten Versuch. Finden wir raus, ob der Rest auch so gut passt.',
  },
  mid: {
    headline: 'Solide! Du hast ein gutes Gespür.',
    text: '2 von 3 – die fehlende Wahrheit erzähle ich dir gern persönlich.',
  },
  low: {
    headline: 'Okay, wir kennen uns noch nicht gut genug.',
    text: 'Komm, lern mich besser kennen – oder lass uns live nochmal spielen, in einem kurzen Kennenlern-Call. =)',
  },
}

export const cta = {
  headline: 'Fair ist fair – jetzt bist du dran.',
  text: 'Du kennst jetzt drei Wahrheiten über mich. Schick mir eine Wahrheit und eine Lüge über dich per Mail – ich rate zurück. Bestes Eis-Brechen ever.',
  email: 'nolinelindor@gmail.com',
  subject: '1 Wahrheit & 1 Lüge – ich bin dran',
  body: 'Hi Noline,\n\nhier meine Runde:\n\nAussage 1: \nAussage 2: \n\nWelche ist die Lüge? :)',
}

/* ------------------------------------------------------------------ */
/* Draw logic                                                          */
/* ------------------------------------------------------------------ */

export interface Round {
  truth: Truth
  lie: Lie
}

const RECENT_KEY = 'nl-kennenlernen-recent'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function readRecent(): string[] {
  try {
    return JSON.parse(sessionStorage.getItem(RECENT_KEY) || '[]')
  } catch {
    return []
  }
}

function writeRecent(ids: string[]): void {
  try {
    sessionStorage.setItem(RECENT_KEY, JSON.stringify(ids))
  } catch {
    /* storage blocked — fine, just no recency */
  }
}

/** Shuffle, then move items played in the last run to the back. */
function freshFirst<T extends { id: string }>(items: T[], recent: string[]): T[] {
  const s = shuffle(items)
  return [...s.filter((x) => !recent.includes(x.id)), ...s.filter((x) => recent.includes(x.id))]
}

function conflicts(item: { id: string; excludes?: string[] }, chosen: { id: string; excludes?: string[] }[]) {
  return chosen.some(
    (c) => item.excludes?.includes(c.id) || c.excludes?.includes(item.id)
  )
}

/**
 * Draws ROUNDS_PER_GAME rounds: no repeats, no `excludes` conflicts, at least
 * one "pattern breaker" round (wild lie vs. unremarkable truth), round order
 * shuffled so the breaker is not always first.
 */
export function drawRounds(): Round[] {
  const recent = readRecent()
  const ts = freshFirst(truths, recent)
  const ls = freshFirst(lies, recent)
  const chosen: { id: string; excludes?: string[] }[] = []
  const rounds: Round[] = []

  const take = <T extends { id: string; excludes?: string[] }>(pool: T[], pred: (x: T) => boolean) => {
    const item = pool.find((x) => pred(x) && !chosen.some((c) => c.id === x.id) && !conflicts(x, chosen))
    if (item) chosen.push(item)
    return item
  }

  // 1. Pattern breaker
  const calmTruth = take(ts, (t) => !t.wild)
  const wildLie = take(ls, (l) => l.wild)
  if (calmTruth && wildLie) rounds.push({ truth: calmTruth, lie: wildLie })

  // 2. Fill the rest at random
  while (rounds.length < ROUNDS_PER_GAME) {
    const t = take(ts, () => true)
    const l = take(ls, () => true)
    if (!t || !l) break
    rounds.push({ truth: t, lie: l })
  }

  const result = shuffle(rounds)
  writeRecent(result.flatMap((r) => [r.truth.id, r.lie.id]))
  return result
}
