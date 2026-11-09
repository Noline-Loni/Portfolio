import type { ReactNode } from 'react'
import Seo from './Seo'
import ArrowLink from './ArrowLink'
import { ga4Available, getConsent, revokeConsent } from '../lib/analytics'

/* ------------------------------------------------------------------ */
/* Shared layout                                                       */
/* ------------------------------------------------------------------ */

function LegalLayout({
  title,
  path,
  description,
  children,
}: {
  title: string
  path: string
  description: string
  children: ReactNode
}) {
  return (
    <>
      <Seo
        title={`${title} · Noline Lindor`}
        description={description}
        path={path}
        noindex
      />
      <main className="px-6 pb-28 pt-36 md:px-12 md:pt-44 lg:px-24">
        <article className="mx-auto max-w-3xl">
          <div className="mb-10 flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-accent" />
            <span className="font-body text-xs uppercase tracking-[0.3em] text-content-tertiary">
              Rechtliches
            </span>
          </div>
          <h1 className="font-display text-3xl tracking-[-0.01em] text-content md:text-4xl">
            {title}
          </h1>
          <div className="legal mt-12 font-body text-sm font-light leading-relaxed text-content-secondary md:text-base">
            {children}
          </div>
          <ArrowLink to="/" arrow="left" className="mt-16">
            Zur Startseite
          </ArrowLink>
        </article>
      </main>
    </>
  )
}

function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-3 mt-12 font-display text-xl text-content first:mt-0 md:text-2xl">
      {children}
    </h2>
  )
}

function H3({ children }: { children: ReactNode }) {
  return <h3 className="mb-2 mt-8 font-body text-base font-medium text-content">{children}</h3>
}

function P({ children }: { children: ReactNode }) {
  return <p className="mb-4">{children}</p>
}

function A({ href, children }: { href: string; children: ReactNode }) {
  const external = href.startsWith('http')
  return (
    <a
      href={href}
      className="text-content underline underline-offset-2 hover:text-accent"
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      data-hover
    >
      {children}
    </a>
  )
}

const ADDRESS = (
  <>
    Noline Lindor
    <br />
    Auf dem Backenberg 13
    <br />
    44801 Bochum
    <br />
    Deutschland
  </>
)

/* ------------------------------------------------------------------ */
/* Impressum                                                           */
/* ------------------------------------------------------------------ */

export function Impressum() {
  return (
    <LegalLayout
      title="Impressum"
      path="/impressum"
      description="Impressum von nolinelindor.com — Anbieterkennzeichnung nach § 5 DDG."
    >
      <H2>Angaben gemäß § 5 DDG</H2>
      <P>{ADDRESS}</P>

      <H2>Kontakt</H2>
      <P>
        Telefon: <A href="tel:+491633150786">0163 3150786</A>
        <br />
        E-Mail: <A href="mailto:nolinelindor@gmail.com">nolinelindor@gmail.com</A>
      </P>

      <H2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</H2>
      <P>Noline Lindor, Anschrift wie oben.</P>

      <H2>Haftung für Inhalte</H2>
      <P>
        Die Inhalte dieser Seite wurden mit größter Sorgfalt erstellt. Für die
        Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann ich jedoch
        keine Gewähr übernehmen. Als Diensteanbieterin bin ich nach den
        allgemeinen Gesetzen für eigene Inhalte auf diesen Seiten verantwortlich.
      </P>

      <H2>Haftung für Links</H2>
      <P>
        Diese Seite enthält Links zu externen Webseiten Dritter, auf deren
        Inhalte ich keinen Einfluss habe. Für die Inhalte der verlinkten Seiten
        ist stets der jeweilige Anbieter oder Betreiber verantwortlich. Zum
        Zeitpunkt der Verlinkung waren keine Rechtsverstöße erkennbar. Werden
        mir Rechtsverletzungen bekannt, entferne ich derartige Links umgehend.
      </P>

      <H2>Urheberrecht</H2>
      <P>
        Die auf dieser Seite gezeigten Arbeiten, Texte und Bilder unterliegen
        dem deutschen Urheberrecht. Vervielfältigung, Bearbeitung und jede Art
        der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der
        schriftlichen Zustimmung. Marken und Logos der gezeigten Kundenprojekte
        gehören den jeweiligen Inhaber:innen.
      </P>
    </LegalLayout>
  )
}

/* ------------------------------------------------------------------ */
/* Datenschutzerklärung                                                */
/* ------------------------------------------------------------------ */

function ConsentControl() {
  if (!ga4Available()) {
    return (
      <P>
        Google Analytics ist auf dieser Seite derzeit nicht aktiv. Es werden
        keine Statistikdaten erhoben.
      </P>
    )
  }
  const consent = getConsent()
  return (
    <div className="mb-4 rounded-md border border-stroke-subtle/60 bg-surface-secondary/60 p-5">
      <p className="mb-4">
        Aktueller Status:{' '}
        <strong className="font-medium text-content">
          {consent === 'granted'
            ? 'Eingewilligt'
            : consent === 'denied'
              ? 'Abgelehnt'
              : 'Noch keine Auswahl getroffen'}
        </strong>
      </p>
      {consent === 'granted' && (
        <button
          type="button"
          onClick={revokeConsent}
          className="rounded-sm border border-content/40 px-5 py-2 font-body text-xs font-bold uppercase tracking-[0.15em] text-content transition-all duration-base ease-smooth hover:bg-content/10"
          data-hover
        >
          Einwilligung widerrufen
        </button>
      )}
    </div>
  )
}

export function Datenschutz() {
  return (
    <LegalLayout
      title="Datenschutzerklärung"
      path="/datenschutz"
      description="Datenschutzerklärung von nolinelindor.com — welche Daten beim Besuch verarbeitet werden und welche Rechte du hast."
    >
      <H2>1. Verantwortliche</H2>
      <P>
        Verantwortlich für die Datenverarbeitung auf dieser Webseite im Sinne der
        Datenschutz-Grundverordnung (DSGVO) ist:
      </P>
      <P>
        {ADDRESS}
        <br />
        E-Mail: <A href="mailto:nolinelindor@gmail.com">nolinelindor@gmail.com</A>
      </P>

      <H2>2. Überblick</H2>
      <P>
        Diese Webseite ist ein persönliches Portfolio. Es gibt kein
        Kundenkonto, keinen Newsletter und kein Kontaktformular. Personenbezogene
        Daten werden nur verarbeitet, soweit das für den technischen Betrieb
        nötig ist (Hosting), wenn du mich selbst kontaktierst oder wenn du in die
        Statistik mit Google Analytics einwilligst.
      </P>

      <H2>3. Hosting bei Vercel</H2>
      <P>
        Diese Webseite wird bei der Vercel Inc., 440 N Barranca Ave #4133,
        Covina, CA 91723, USA gehostet. Beim Aufruf der Seite verarbeitet Vercel
        technisch notwendige Daten, insbesondere deine IP-Adresse, Datum und
        Uhrzeit des Zugriffs, die aufgerufene Seite, die Referrer-URL sowie
        Browser- und Geräteinformationen (Server-Logfiles). Das ist nötig, um
        die Seite auszuliefern, sicher und stabil zu betreiben und Angriffe
        abzuwehren.
      </P>
      <P>
        Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Mein berechtigtes
        Interesse liegt in der sicheren und zuverlässigen Bereitstellung der
        Webseite. Mit Vercel besteht ein Vertrag zur Auftragsverarbeitung. Vercel
        ist nach dem EU-US Data Privacy Framework zertifiziert, auf dessen
        Grundlage Daten in die USA übermittelt werden dürfen
        (Angemessenheitsbeschluss nach Art. 45 DSGVO). Weitere Informationen:{' '}
        <A href="https://vercel.com/legal/privacy-policy">
          Datenschutzerklärung von Vercel
        </A>
        .
      </P>

      <H2>4. Schriftarten</H2>
      <P>
        Die Schriftarten dieser Seite (Poppins und Playfair Display) sind lokal
        eingebunden und werden vom eigenen Server ausgeliefert. Beim Laden der
        Schriften findet keine Verbindung zu Google oder anderen Drittanbietern
        statt.
      </P>

      <H2>5. Speicherung deiner Statistik-Auswahl</H2>
      <P>
        Wenn du im Banner „Zustimmen“ oder „Ablehnen“ wählst, wird diese
        Entscheidung im lokalen Speicher deines Browsers (localStorage) unter dem
        Schlüssel <code className="text-content">nl-analytics-consent</code>{' '}
        abgelegt, damit das Banner nicht bei jedem Besuch erneut erscheint. Diese
        Information verlässt deinen Browser nicht. Rechtsgrundlage ist § 25 Abs.
        2 Nr. 2 TDDDG, da die Speicherung für den von dir gewünschten Dienst
        unbedingt erforderlich ist. Du kannst sie jederzeit über die
        Browsereinstellungen löschen.
      </P>

      <H2>6. Statistik mit Google Analytics 4</H2>
      <P>
        Nur wenn du ausdrücklich einwilligst, nutzt diese Seite Google Analytics
        4, einen Webanalysedienst der Google Ireland Limited, Gordon House,
        Barrow Street, Dublin 4, Irland („Google“). Ohne Einwilligung wird Google
        Analytics nicht geladen.
      </P>
      <P>
        Google Analytics speichert Cookies (<code className="text-content">_ga</code>,{' '}
        <code className="text-content">_ga_ZVSL24D3NM</code>, Laufzeit bis zu 2
        Jahre) und erfasst Informationen über deine Nutzung der Seite, etwa
        aufgerufene Seiten, Verweildauer, ungefährer Standort (Land/Stadt),
        Gerätetyp, Browser und die Herkunft des Besuchs. In Google Analytics 4
        werden IP-Adressen nach Angaben von Google nicht protokolliert oder
        gespeichert. Die Daten nutze ich ausschließlich, um zu verstehen, welche
        Inhalte ankommen, und um die Seite zu verbessern.
      </P>
      <P>
        Rechtsgrundlage ist deine Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO
        und § 25 Abs. 1 TDDDG. Es kann nicht ausgeschlossen werden, dass Daten
        an die Google LLC in den USA übermittelt werden. Google LLC ist nach dem
        EU-US Data Privacy Framework zertifiziert (Art. 45 DSGVO). Die
        Analysedaten werden in Google Analytics nach der dort eingestellten
        Aufbewahrungsdauer automatisch gelöscht. Weitere Informationen:{' '}
        <A href="https://policies.google.com/privacy">
          Datenschutzerklärung von Google
        </A>
        .
      </P>
      <H3>Einwilligung widerrufen</H3>
      <P>
        Du kannst deine Einwilligung jederzeit mit Wirkung für die Zukunft
        widerrufen. Die Rechtmäßigkeit der bis dahin erfolgten Verarbeitung
        bleibt davon unberührt.
      </P>
      <ConsentControl />

      <H2>7. Space Jump</H2>
      <P>
        Auf der Startseite wird das Spiel „Space Jump“ nur als Standbild
        gezeigt. Erst wenn du auf „Jetzt spielen“ klickst, öffnet sich das Spiel
        in einem neuen Tab unter space-jump-ten.vercel.app. Dort gelten die
        Angaben zum Hosting bei Vercel entsprechend. Das Spiel lädt zusätzlich
        Schriftarten von Google Fonts (Google Ireland Limited), wobei deine
        IP-Adresse an Google übermittelt wird.
      </P>

      <H2>8. Links zu sozialen Netzwerken</H2>
      <P>
        Diese Seite enthält einfache Links zu LinkedIn, GitHub, Instagram und
        Facebook. Es handelt sich nicht um eingebettete Plugins. Beim bloßen
        Besuch dieser Seite werden keine Daten an diese Netzwerke übertragen.
        Erst wenn du einen Link anklickst, gelten die Datenschutzbestimmungen
        des jeweiligen Anbieters.
      </P>

      <H2>9. Kontakt per E-Mail oder Telefon</H2>
      <P>
        Wenn du mich per E-Mail oder Telefon kontaktierst, verarbeite ich deine
        Angaben (z. B. Name, E-Mail-Adresse, Telefonnummer und Inhalt der
        Nachricht), um deine Anfrage zu beantworten. Rechtsgrundlage ist Art. 6
        Abs. 1 lit. b DSGVO, wenn deine Anfrage auf einen Vertrag oder
        vorvertragliche Maßnahmen zielt, ansonsten Art. 6 Abs. 1 lit. f DSGVO
        (berechtigtes Interesse an der Beantwortung von Anfragen). Die Daten
        lösche ich, sobald die Anfrage abschließend bearbeitet ist und keine
        gesetzlichen Aufbewahrungspflichten entgegenstehen. Für E-Mails nutze
        ich Gmail (Google Ireland Limited).
      </P>

      <H2>10. Deine Rechte</H2>
      <P>Du hast jederzeit das Recht auf</P>
      <ul className="mb-4 list-disc space-y-1 pl-5 marker:text-accent">
        <li>Auskunft über deine gespeicherten Daten (Art. 15 DSGVO),</li>
        <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO),</li>
        <li>Löschung (Art. 17 DSGVO),</li>
        <li>Einschränkung der Verarbeitung (Art. 18 DSGVO),</li>
        <li>Datenübertragbarkeit (Art. 20 DSGVO),</li>
        <li>
          Widerspruch gegen Verarbeitungen auf Grundlage von Art. 6 Abs. 1 lit. f
          DSGVO (Art. 21 DSGVO),
        </li>
        <li>
          Widerruf einer erteilten Einwilligung mit Wirkung für die Zukunft (Art.
          7 Abs. 3 DSGVO).
        </li>
      </ul>
      <P>
        Eine formlose E-Mail an{' '}
        <A href="mailto:nolinelindor@gmail.com">nolinelindor@gmail.com</A>{' '}
        genügt.
      </P>
      <H3>Beschwerderecht</H3>
      <P>
        Du kannst dich außerdem bei einer Datenschutz-Aufsichtsbehörde
        beschweren. Zuständig für mich ist die Landesbeauftragte für Datenschutz
        und Informationsfreiheit Nordrhein-Westfalen, Kavalleriestraße 2–4,
        40213 Düsseldorf,{' '}
        <A href="https://www.ldi.nrw.de">www.ldi.nrw.de</A>.
      </P>

      <H2>11. Aktualität</H2>
      <P>Stand: November 2026.</P>
    </LegalLayout>
  )
}
