export interface ProjectMetric {
  value: string
  label: string
}

export interface ProcessStep {
  title: string
  desc: string
}

export interface ProjectSection {
  type:
    | 'text'
    | 'image'
    | 'image-grid'
    | 'quote'
    | 'metrics'
    | 'before-after'
    | 'process'
    | 'code'
    | 'tech-stack'
  heading?: string
  content?: string
  src?: string
  alt?: string
  images?: { src: string; alt: string }[]
  metrics?: ProjectMetric[]
  before?: string
  after?: string
  steps?: ProcessStep[]
  code?: string
  caption?: string
  stack?: string[]
}

export interface Project {
  slug: string
  title: string
  subtitle: string
  category: string
  year: string
  /** 'design' (default) shows an image cover; 'automation' uses a typographic/metric treatment */
  kind?: 'design' | 'automation'
  cover?: string
  /** Descriptive alt text for the cover image */
  coverAlt?: string
  coverPosition?: string
  /** Headline number for automation cards/hero (no cover image needed) */
  heroMetric?: ProjectMetric
  tags: string[]
  intro: string
  sections: ProjectSection[]
  nextProject?: string
  externalLink?: { label: string; url: string }
}

export const projects: Project[] = [
  {
    slug: 'luba-labs',
    title: 'Luba Labs',
    subtitle: 'Brand Identity Design',
    category: 'Branding / Fashion / Jewelry',
    year: '2025',
    cover: '/images/works/lubalabs/Logo Mockup_LubaLabs_hell.webp',
    coverAlt:
      'Luba Labs Markenlogo als goldenes Mockup auf hellem, strukturiertem Hintergrund',
    tags: ['Logo', 'CI-Styleguide', 'Packaging', 'Social Media', '3D Jewelry'],
    intro:
      'Komplette Markenidentität für ein nachhaltiges Schmuck- und Modelabel, das afrikanische Tradition mit moderner Ästhetik verbindet.',
    sections: [
      {
        type: 'text',
        heading: 'Die Marke',
        content:
          'Luba Labs steht für nachhaltige Mode und Schmuck, inspiriert von afrikanischer Handwerkskunst und Tradition. Das Ziel: eine authentische Marke zu schaffen, die Tradition trifft Moderne — mit einem starken visuellen Auftritt, der sich über alle Touchpoints erstreckt.',
      },
      {
        type: 'image',
        src: '/images/works/lubalabs/Logo Mockup_LubaLabs_erweitert.webp',
        alt: 'Luba Labs Logo in Gold und Creme auf einer dunkelbraunen Karte vor grünen, diagonal geschichteten Papierflächen',
      },
      {
        type: 'text',
        heading: 'Logo & Logomark',
        content:
          'Das Logomark basiert auf einem geometrischen, afrikanisch inspirierten Muster, das als goldenes Symbol auf dunklem Hintergrund leuchtet. Die Typografie verbindet klare, moderne Linien mit handwerklichem Charakter.',
      },
      {
        type: 'image-grid',
        images: [
          {
            src: '/images/works/lubalabs/LubaLabs_Logo_gold-darkblack.webp',
            alt: 'Luba Labs Logo: goldenes, labyrinthartiges Logomark mit schwarzem Schriftzug LUBA LABS',
          },
          {
            src: '/images/works/lubalabs/LubaLabs_Logo_gold-creme.webp',
            alt: 'Luba Labs Logo: goldenes, labyrinthartiges Logomark mit cremefarbenem Schriftzug LUBA LABS',
          },
        ],
      },
      {
        type: 'text',
        heading: '3D Schmuck-Visualisierung',
        content:
          'Um das Logomark als physisches Produkt erlebbar zu machen, wurde es als 3D-Schmuckstück in Gold modelliert. Die Ohrringe zeigen das geometrische Muster als tragbares Kunstwerk.',
      },
      {
        type: 'image',
        src: '/images/works/lubalabs/LubaLabs_Jewelry_3D_new-Kamera.webp',
        alt: '3D-Rendering: zwei goldene Ohrringe in Form des Luba-Labs-Logomarks, hängend auf einem Betonblock vor olivgrünem Hintergrund',
      },
      {
        type: 'text',
        heading: 'Packaging & Geschäftsausstattung',
        content:
          'Die Verpackung verbindet das geometrische Muster mit einer hochwertigen, minimalistischen Haptik. Von der Schmuckbox über Clothing Labels bis zur Rechnung — jeder Berührungspunkt spiegelt die Markenidentität wider.',
      },
      {
        type: 'image-grid',
        images: [
          {
            src: '/images/works/lubalabs/Clothing Package mock up_LubaLabs_hoch.webp',
            alt: 'Dunkelbraune Schmuckbox mit geometrischem Muster, goldenem Logomark und Luba-Labs-Schriftzug auf beigem Untergrund',
          },
          {
            src: '/images/works/lubalabs/Clothing Label mock up_LubaLabs.webp',
            alt: 'Zwei cremefarbene Kleidungsanhänger an Kordeln: vorne das goldene Luba-Labs-Logo, hinten „Nachhaltige Bekleidung aus Kongo“',
          },
        ],
      },
      {
        type: 'image',
        src: '/images/works/lubalabs/Letter Mockup_LubaLabs.webp',
        alt: 'Hand hält eine Luba-Labs-Rechnung mit goldenem Logo und grauem Labyrinthmuster vor dunkelbraunem Hintergrund',
      },
      {
        type: 'text',
        heading: 'Social Media',
        content:
          'Das Social-Media-Konzept transportiert die Markenwerte über Instagram: Tradition trifft Moderne, Nachhaltigkeit als Haltung, authentische Bildsprache mit warmen Erdtönen und dem goldenen Akzent des Logomarks.',
      },
      {
        type: 'image',
        src: '/images/works/lubalabs/IG_Mockup_LubaLabs.webp',
        alt: 'Luba Labs Instagram-Auftritt: Smartphone mit Story „Tradition trifft Moderne“ und drei Posts, darunter „Dafür stehen wir“ und ein Nachhaltigkeits-Zitat',
      },
    ],
    nextProject: 'cremas-lakay',
  },
  {
    slug: 'cremas-lakay',
    title: 'Cremas Lakay',
    subtitle: 'Brand Identity Design',
    category: 'Branding / Packaging',
    year: '2023',
    cover: '/images/works/cremas-lakay.webp',
    coverAlt:
      'Flaschen-Mockup des haitianischen Kokosnusslikörs Cremas Lakay mit gestaltetem Etikett',
    tags: ['Logo', 'Label', 'Packaging', 'CI-Styleguide', 'Social Media'],
    intro:
      'Logo und Labeldesign für einen traditionellen haitianischen Kokosnusslikör. Eine authentische Marke erschaffen, die Natürlichkeit, Tradition und Emotionalität verbindet.',
    sections: [
      {
        type: 'text',
        heading: 'Das Briefing',
        content:
          'Der Kunde wünschte sich ein Logo und Flaschenlabel für einen traditionellen, handgemachten Kokosnusslikör aus Haiti. Im Gespräch mit dem Kunden wurden drei Kernwerte der Marke identifiziert: natürlich, traditionell und emotional bewegend.',
      },
      {
        type: 'image',
        src: '/images/works/cremas-lakay/Logo.webp',
        alt: 'Cremas Lakay Logo als handgeschriebener, pinselartiger Schriftzug in Creme',
      },
      {
        type: 'text',
        heading: 'Moodboard & Gestaltung',
        content:
          'Basierend auf den festgelegten Markenwerten wurde ein Moodboard erstellt, das Bilder und Kunst aus Haiti einbezieht, um den Ursprung des Getränks widerzuspiegeln und eine visuelle Richtung für die Marke zu definieren.',
      },
      {
        type: 'image',
        src: '/images/works/cremas-lakay/Moodboard-30.webp',
        alt: 'Moodboard: Kokoslikör-Drinks mit Zimt, farbenfrohe haitianische Malerei mit Marktszenen, bunte Häuser, Handschrift-Typo und eine Palette aus Braun-, Beige- und Orangetönen',
      },
      {
        type: 'text',
        heading: 'Flaschenlabel & Verpackung',
        content:
          'Das Etikettendesign verbindet traditionelle haitianische Elemente mit einer modernen, hochwertigen Anmutung. Sowohl die Vorder- als auch die Rückseite wurden gestaltet, ergänzt durch eine passende Geschenkverpackung.',
      },
      {
        type: 'image',
        src: '/images/works/cremas-lakay/CL_Bottle_Mockup_2cremas.webp',
        alt: 'Cremas-Lakay-Flasche mit cremeweißem Likör und kupferbraunem Etikett, vorne, auf Sand vor einem dunklen Palmblatt',
      },
      {
        type: 'image-grid',
        images: [
          {
            src: '/images/works/cremas-lakay/CL_Bottle_Mockup_2cremas_hinten.webp',
            alt: 'Rückseite der Cremas-Lakay-Flasche mit Etikett-Text, auf Sand vor einem dunklen Palmblatt',
          },
          {
            src: '/images/works/cremas-lakay/CL_Box-Mockup_4zu3.webp',
            alt: 'Geschenkbox aus Karton in Sandfarbe mit verspieltem Linienmuster und rundem CL-Monogramm, an der Seite der Cremas-Lakay-Schriftzug',
          },
        ],
      },
      {
        type: 'text',
        heading: 'Werbung & Social Media',
        content:
          'Die fertige Markenidentität umfasst Logovariationen, Flaschenlabel, Verpackungs-Mockups, Werbematerial und Social-Media-Posts. Den Abschluss bildet ein CI-Style Sheet als dokumentierte Markenrichtlinie.',
      },
      {
        type: 'image',
        src: '/images/works/cremas-lakay/Anzeige_Mockup.webp',
        alt: 'Plakat an einer Bushaltestelle: „Gönn’ dir einen Schluck Karibik“ mit Cremas-Lakay-Flasche, Palmblättern und Kokosnuss',
      },
      {
        type: 'image',
        src: '/images/works/cremas-lakay/Web 1920 – 2.webp',
        alt: 'Web-Banner: „Gönn’ dir einen Schluck Karibik“, Cremas-Lakay-Flasche mit Kokosnuss und Palmblättern, Slogan „Vegan, Natürlich, Lecker“ und Button „Jetzt eintauchen“',
      },
      {
        type: 'image-grid',
        images: [
          {
            src: '/images/works/cremas-lakay/Instagram-Post – 3.webp',
            alt: 'Instagram-Story im Hochformat: „Gönn’ dir einen Schluck Karibik“ mit Cremas-Lakay-Flasche zwischen Palmblättern',
          },
          {
            src: '/images/works/cremas-lakay/Instagram-Post – 4.webp',
            alt: 'Quadratischer Instagram-Post: „Gönn’ dir einen Schluck Karibik“ mit Cremas-Lakay-Flasche und Button „Jetzt eintauchen“',
          },
        ],
      },
    ],
    nextProject: 'haiti-med',
  },
  {
    slug: 'haiti-med',
    title: 'Haiti-Med e.V.',
    subtitle: 'Logo Redesign',
    category: 'Logo Design / Corporate Identity',
    year: '2023',
    cover: '/images/works/haiti-med.webp',
    coverAlt:
      'Haiti-Med e.V. Logo-Redesign mit Buch-, Schlangen- und Palmen-Symbolik in kräftigen Farben',
    tags: ['Logo', 'Farben', 'CI-Guidelines', 'Social Media'],
    intro:
      'Redesign des Logos einer gemeinnützigen Organisation für Bildung und Gesundheitsversorgung in Haiti. Schrift verbessert, Farbpalette definiert und Kontrastfarbe ergänzt.',
    sections: [
      {
        type: 'text',
        heading: 'Die Ausgangslage',
        content:
          'Das bestehende Logo von Haiti-Med e.V. hatte einige Schwächen: verpixelte, keine Vektorgrafik vorhanden, die Schrift im Logo war zu klein und konnte nicht auf verschiedene Einsatzmöglichkeiten angepasst werden. Es fehlte eine Kontrastfarbe für CTAs und die Schriftart passte nicht zum Logomark.',
      },
      {
        type: 'image',
        src: '/images/works/haiti-med/before-after.webp',
        alt: 'Vorher-Nachher: links das alte, verpixelte Haiti-Med-Logo mit zu kleiner Schrift, rechts das neue Logo mit klarer Schrift in mehreren Anwendungen',
      },
      {
        type: 'text',
        heading: 'Die Inspiration',
        content:
          'Haiti ist ein unglaublich lautes und farbenfrohes Land. Die haitianische Kunst ist bekannt für ihre mutige, kühne Farbpalette, die gleichzeitig Weichheit und Sensibilität ausstrahlt. Diese kulturellen Merkmale flossen direkt in das Redesign ein.',
      },
      {
        type: 'text',
        heading: 'Die Symbolik',
        content:
          'Das Logo enthält drei zentrale Elemente: Das Buch steht für die Förderung von Bildung, die Schlange für Medizin und Gesundheitsversorgung, und die Palme für Haitis wunderschöne, farbenfrohe Landschaft.',
      },
      {
        type: 'image',
        src: '/images/works/haiti-med/redesign-overview.webp',
        alt: 'Redesign-Übersicht: altes Logo mit Schwachstellen, daneben vier neue Logo-Varianten in Farbe, Weiß und Schwarz sowie Typo-Hierarchie und Farbpalette mit rotem CTA',
      },
      {
        type: 'image',
        src: '/images/works/haiti-med/ci-guidelines.webp',
        alt: 'CI-Guidelines von Haiti-Med: Logo- und Logomark-Varianten, Schrift Rubik in vier Schnitten und sieben Markenfarben von Rot über Petrol bis Gelb',
      },
      {
        type: 'text',
        heading: 'CI & Social Media',
        content:
          'Zum Abschluss wurden Mockups erstellt, die die Marke in Aktion zeigen — darunter Social-Media-Posts und umfassende Corporate-Identity-Guidelines, die sowohl für digitale als auch für gedruckte Materialien geeignet sind.',
      },
      {
        type: 'image',
        src: '/images/works/haiti-med/social-media.webp',
        alt: 'Haiti Konbit 2024 in Anwendung: Instagram-Story mit haitianischem Essen, Website auf dem Smartphone und zwei Posts „Dieses Kulturfest ist bereits Tradition“',
      },
      {
        type: 'image-grid',
        images: [
          {
            src: '/images/works/haiti-med/2026_09-Instagram_Post_HaitiKonbit2026_Kuenstlerspotlight-TiCorn_1080x1080px.webp',
            alt: 'Instagram-Post Künstler-Spotlight Haiti Konbit 2026: Sängerin TiCorn mit Gitarre im Grünen, Termin 3. Oktober 2026 in Düsseldorf-Eller, Eintritt frei',
          },
          {
            src: '/images/works/haiti-med/2025_08-Instagram_Post_HaitiKonbit2025_Kuenstlerspotlight-WAWA_1080x1080px.webp',
            alt: 'Instagram-Post Künstler-Spotlight Haiti Konbit 2025: Sänger und Saxophonist WAWA auf der Bühne, Termin 4. Oktober 2025, Eintritt frei',
          },
        ],
      },
    ],
    nextProject: 'nutrition-pets',
  },
  {
    slug: 'nutrition-pets',
    title: 'NUTRITIONfurPETS',
    subtitle: 'Mobile App Design',
    category: 'UX Design / Mobile App',
    year: '2021',
    cover: '/images/works/nutrition-pets.webp',
    coverAlt:
      'High-Fidelity App-Screens der Haustier-Ernährungs-App NUTRITIONfurPETS',
    coverPosition: 'object-[center_60%]',
    tags: ['UX Research', 'Wireframes', 'Figma Prototype'],
    intro:
      'Eine App zur Nährwert-Kontrolle für Haustiere, erstellt im Rahmen des Google UX Design Kurses auf Coursera. Von User Research über Wireframes bis zum klickbaren High-Fidelity Prototyp.',
    externalLink: {
      label: 'Zum Figma Prototyp',
      url: 'https://www.figma.com/proto/BvZNbEkv90mYKPNn2xl943/Google-Kurs-Project_1?node-id=220-462&t=KeJmQPkKRHF5LrzP-1&scaling=scale-down&content-scaling=fixed&page-id=199%3A0',
    },
    sections: [
      {
        type: 'text',
        heading: 'Projektübersicht',
        content:
          'Das erste UX-Projekt mit dem Ziel, Recherchemethodik zu erlernen und einen ansprechenden Prototyp zu erstellen, der auf die Zielgruppe zugeschnitten ist.',
      },
      {
        type: 'text',
        heading: 'Das Problem',
        content:
          'Die Zielgruppenanalyse ergab zentrale Schmerzpunkte: Tierhalter haben zu wenig Zeit, jedes einzelne Gericht ihrem Vierbeiner zuzuordnen, besonders wenn sie mehrere Tiere haben. Sie wünschten sich eine multifunktionale App mit einem einfachen, selbsterklärenden Interface.',
      },
      {
        type: 'image',
        src: '/images/works/nutrition-pets/overview.webp',
        alt: 'Übersicht der NUTRITIONfurPETS-App in Grün und Beige: Haustier anlegen, Startseite mit Hund Bello, Nährwert-Diagramm und Bestätigung „Meal is Added!“',
      },
      {
        type: 'text',
        heading: 'Ideation & Wireframes',
        content:
          'Mit der Crazy Eight\'s Methode wurden in kurzer Zeit acht verschiedene Konzepte skizziert. Aus den besten Ideen entstanden Wireframes, die als Blaupause für das finale Design dienten.',
      },
      {
        type: 'image-grid',
        images: [
          {
            src: '/images/works/nutrition-pets/Gruppe maskieren 25.webp',
            alt: 'Crazy-Eights-Handskizzen in acht Feldern: Barcode-Scanner, Haustier wählen, Foto, Sprachen, Futtertipps, Medikamenten-Erinnerung, Profildaten, Wechsel zur Futter-Liefer-App',
          },
          {
            src: '/images/works/nutrition-pets/Web 1920 – 3.webp',
            alt: 'Graustufen-Wireframes von vier Screens: Startseite, Haustierprofil mit Nährwerten, Mahlzeit hinzufügen und Haustier anlegen',
          },
        ],
      },
      {
        type: 'text',
        heading: 'High-Fidelity Prototyp',
        content:
          'Der finale interaktive Prototyp bietet Barcode-Scanning für schnelle Mahlzeitenerfassung ohne manuelle Eingabe, Unterstützung für mehrere Haustiere sowie ein Erinnerungssystem für Tierarzttermine und Medikamentenpläne.',
      },
      {
        type: 'image',
        src: '/images/works/nutrition-pets/Web 1920 – 4.webp',
        alt: 'Acht High-Fidelity-Screens der App: Haustier anlegen, Startseite, Profil mit Nährwerten, Mahlzeit hinzufügen, Bestätigung, Menü und QR-Code-Scanner',
      },
    ],
    nextProject: 'luba-labs',
  },
  {
    slug: 'qr-stellencheck',
    title: 'QR-Code-Stellencheck',
    subtitle: 'Marketing Automation',
    category: 'Automation / Recruiting',
    year: '2026',
    kind: 'automation',
    cover: '/images/works/automation/qr.webp',
    coverAlt:
      'Abstrakte Visualisierung eines zerfallenden QR-Code-Rasters mit Koralle-Scanstrahl und Datennetz',
    heroMetric: { value: '199', label: 'tote Codes im ersten Lauf entdeckt' },
    tags: ['Python', 'QR.io API', 'softgarden', 'Task Scheduler', 'Claude'],
    intro:
      'Gedruckte Recruiting-Plakate eines Pflegekonzerns mit über 100 Standorten verlinken per QR-Code auf einzelne Stellenanzeigen — die ablaufen, ohne dass man es dem Code ansieht. Ein Python-Workflow prüft den gesamten Bestand wöchentlich und meldet jeden toten Link.',
    sections: [
      {
        type: 'metrics',
        metrics: [
          { value: '199', label: 'tote Codes im ersten Lauf' },
          { value: '610', label: 'Codes pro Woche geprüft' },
          { value: '0', label: 'manuelle Stichproben nötig' },
          { value: 'Mo 08:00', label: 'läuft vollautomatisch' },
        ],
      },
      {
        type: 'text',
        heading: 'Das Problem',
        content:
          'Auf Plakaten, Flyern und Großflächen kleben dynamische QR-Codes, die auf einzelne Stellenanzeigen verlinken. Läuft eine Stelle ab, sieht man das dem gedruckten Code nicht an — der Link führt ins Leere, die Bewerbung ist verloren. Geprüft wurde bisher nur stichprobenartig von Hand.',
      },
      {
        type: 'before-after',
        before:
          'Manuelle Stichproben. Abgelaufene Stellen-Links bleiben unbemerkt auf hunderten gedruckten Codes im Umlauf — verlorene Bewerbungen, verbranntes Mediabudget.',
        after:
          'Ein wöchentlicher Auto-Check prüft den kompletten Bestand. Ein Excel-Report listet jeden toten Code, sortiert nach Reichweite — bereit zum gezielten Austausch.',
      },
      {
        type: 'process',
        heading: 'Der Workflow',
        steps: [
          { title: 'Pull', desc: 'QR-Codes samt Ziel-URLs aus dem Dashboard ziehen.' },
          { title: 'Check', desc: 'Python ruft jede Stelle live auf und wertet den Redirect aus.' },
          { title: 'Report', desc: 'Excel-Report: abgelaufen / aktiv, nach Scans sortiert.' },
          { title: 'Replace', desc: 'Neue Links halbautomatisch ins Dashboard zurückspielen.' },
        ],
      },
      {
        type: 'text',
        heading: 'Die Lösung',
        content:
          'Der Check läuft lokal und ohne Login-Daten — er trifft nur die öffentliche Bewerbungs-URL und liest am Redirect ab, ob eine Stelle aktiv ist. Pull und Push laufen bewusst im eingeloggten Browser-Kontext, damit nie ein Session-Cookie das System verlässt. Eine Windows-Aufgabe stößt den Check jeden Montag um 08:00 automatisch an.',
      },
      {
        type: 'code',
        caption: 'check_qr_codes.py',
        code: `# Stelle abgelaufen? Redirect der Bewerbungs-URL auswerten
r = session.get(click_url, allow_redirects=True)

if "/jobposting/unavailable/" in r.url:
    status = "ABGELAUFEN"   # toter Code -> ersetzen
elif "career.softgarden.de/application" in r.url:
    status = "AKTIV"
else:
    status = "UNKLAR"       # manuell prüfen`,
      },
      {
        type: 'quote',
        content:
          'Tote Recruiting-Plakate fallen jetzt auf, bevor sie Bewerbungen kosten.',
      },
      {
        type: 'tech-stack',
        heading: 'Tech-Stack',
        stack: ['Python', 'QR.io API', 'softgarden', 'Windows Task Scheduler', 'Claude in Chrome'],
      },
    ],
    nextProject: 'indesign-automation',
  },
  {
    slug: 'indesign-automation',
    title: 'InDesign-Print-Automation',
    subtitle: 'Design Automation',
    category: 'Automation / Print',
    year: '2024',
    kind: 'automation',
    cover: '/images/works/automation/indesign.webp',
    coverAlt:
      'Abstrakte technische Blueprint-Layouts, die zu einer einheitlichen Plakatvorlage zusammenlaufen, mit Koralle-Passmarken',
    heroMetric: { value: '20 Min', label: 'statt 4 Stunden pro Plakat-Serie' },
    tags: ['Adobe InDesign', 'Daten-Merge', 'GREP', 'Reguläre Ausdrücke'],
    intro:
      'Jeden Monat 30 standortindividuelle Recruiting-Plakate — früher vier Stunden manuelle Copy-Paste-Arbeit mit hohem Fehlerrisiko. Mit Daten-Merge und GREP-Automatik entstehen sie heute in 20 Minuten, fehlerfrei und beliebig reproduzierbar.',
    sections: [
      {
        type: 'metrics',
        metrics: [
          { value: '4 h → 20 min', label: 'pro Plakat-Serie' },
          { value: '30', label: 'Plakate pro Lauf' },
          { value: '12×', label: 'schneller als manuell' },
          { value: '100+', label: 'Standorte versorgt' },
        ],
      },
      {
        type: 'text',
        heading: 'Das Problem',
        content:
          'Für jede Kampagne mussten 30 Plakate von Hand individualisiert werden: Standortadresse, PLZ, Telefonnummer und Ansprechpartner kopieren und einsetzen. Das kostete rund vier Stunden pro Serie — und jeder manuelle Eingriff war eine mögliche Fehlerquelle.',
      },
      {
        type: 'before-after',
        before:
          '30 Plakate von Hand: Adresse, PLZ und Telefon je Standort kopieren und einsetzen — rund vier Stunden, fehleranfällig, nicht reproduzierbar.',
        after:
          'Eine Datenquelle, ein Klick: Daten-Merge erzeugt alle 30 Layouts, GREP korrigiert die Typografie automatisch — 20 Minuten, identisch reproduzierbar.',
      },
      {
        type: 'process',
        heading: 'Der Workflow',
        steps: [
          { title: 'Daten', desc: 'Standortdaten als strukturierte Quelle (CSV) aufbereiten.' },
          { title: 'Merge', desc: 'Daten-Merge füllt das Plakat-Template für alle Standorte.' },
          { title: 'GREP', desc: 'Stilregeln korrigieren Typografie in einem Durchlauf.' },
          { title: 'Export', desc: 'Druckfertige PDFs — identisch reproduzierbar.' },
        ],
      },
      {
        type: 'text',
        heading: 'GREP & Typografie',
        content:
          'Wiederkehrende typografische Korrekturen — geschützte Leerzeichen vor Maßeinheiten, einheitliche Datumsformate, korrekte Schreibweise von Rechtsformen — laufen als gespeicherte GREP-Stilregeln. Was vorher hunderte manuelle Eingriffe waren, ist jetzt ein Klick. Dasselbe Regelset hält auch einen 80+ Seiten starken Geschäftsbericht konsistent.',
      },
      {
        type: 'code',
        caption: 'GREP-Stilregeln (Auszug)',
        code: `# Geschütztes Leerzeichen vor Maßeinheiten & Uhrzeiten
Suchen:   (\\d)\\s(km|m²|€|Uhr|Mitarbeiter)
Ersetzen: $1~S$2          # ~S = geschütztes Leerzeichen

# Datumsformat vereinheitlichen
Suchen:   (\\d{1,2})\\.(\\d{1,2})\\.(\\d{4})
Ersetzen: $1.$2.$3`,
      },
      {
        type: 'quote',
        content: 'Aus einem halben Arbeitstag wird ein Kaffee — bei null Tippfehlern.',
      },
      {
        type: 'tech-stack',
        heading: 'Tech-Stack',
        stack: ['Adobe InDesign', 'Daten-Merge', 'GREP', 'Reguläre Ausdrücke'],
      },
    ],
    nextProject: 'kpi-dashboard',
  },
  {
    slug: 'kpi-dashboard',
    title: 'KPI-Dashboard',
    subtitle: 'Full-Stack Development',
    category: 'Engineering / Data',
    year: '2026',
    kind: 'automation',
    cover: '/images/works/automation/kpi.webp',
    coverAlt:
      'Abstrakte Visualisierung dreier zusammenlaufender Datenströme zu einem Koralle-Fokuspunkt vor angedeuteter Diagrammkurve',
    heroMetric: { value: '3', label: 'Datenquellen in einem Dashboard vereint' },
    tags: ['Node.js', 'Fastify', 'PostgreSQL', 'React', 'REST APIs'],
    intro:
      'Ein B2B-Kunde brauchte eine einzige Sicht auf seine Marketing-Performance über HubSpot, LinkedIn und Web-Analytics hinweg. Ich habe das Dashboard eigenständig gebaut — von der API-Architektur bis zum DSGVO-konformen Deployment.',
    sections: [
      {
        type: 'metrics',
        metrics: [
          { value: '3', label: 'Datenquellen vereint' },
          { value: 'Full-Stack', label: 'Architektur bis Deployment' },
          { value: 'EU', label: 'DSGVO-konformes Hosting' },
          { value: '1', label: 'Single Source of Truth' },
        ],
      },
      {
        type: 'text',
        heading: 'Die Aufgabe',
        content:
          'Marketing-Daten lagen in drei getrennten Plattformen: HubSpot (CRM), LinkedIn (Kampagnen) und Web-Analytics. Drei Logins, manuelles Zusammenkopieren in Tabellen — und nie eine gemeinsame, aktuelle Sicht auf die Performance.',
      },
      {
        type: 'before-after',
        before:
          'Drei Plattformen, drei Logins, manuelles Zusammenkopieren in Tabellen — keine gemeinsame Sicht, keine Echtzeit.',
        after:
          'Ein Dashboard zieht alle drei Quellen über API-Adapter zusammen — konsolidiert, in Echtzeit, eine Quelle der Wahrheit.',
      },
      {
        type: 'process',
        heading: 'Architektur',
        steps: [
          { title: 'API-Adapter', desc: 'Je Quelle ein Adapter normalisiert die Rohdaten.' },
          { title: 'KPI-Registry', desc: 'Eine zentrale Registry definiert jede Kennzahl genau einmal.' },
          { title: 'PostgreSQL', desc: 'Schema speichert konsolidierte Zeitreihen.' },
          { title: 'React', desc: 'Frontend visualisiert die KPIs entscheidungsreif.' },
        ],
      },
      {
        type: 'code',
        caption: 'kpi-registry.ts',
        code: `// KPI-Registry: eine Definition, viele Quellen
registry.register({
  id: "leads_qualified",
  sources: ["hubspot", "linkedin", "web"],
  resolve: async (ctx) => sum(await ctx.fetchAll("leads_qualified")),
  format: "integer",
})`,
      },
      {
        type: 'text',
        heading: 'Eigenverantwortung',
        content:
          'Von der Anforderungsanalyse über die Architekturentscheidungen bis zum Deployment auf EU-Infrastruktur lag alles in meiner Hand — inklusive direkter Abstimmung mit Projektleitung und Kunde.',
      },
      {
        type: 'quote',
        content: 'Aus drei Datensilos wird eine Entscheidungsgrundlage.',
      },
      {
        type: 'tech-stack',
        heading: 'Tech-Stack',
        stack: ['Node.js', 'Fastify', 'PostgreSQL', 'React', 'REST APIs', 'Hetzner (EU)'],
      },
    ],
    nextProject: 'meta-campaigns',
  },
  {
    slug: 'meta-campaigns',
    title: 'Meta-Kampagnen-Automation',
    subtitle: 'Marketing Automation',
    category: 'Automation / Performance Marketing',
    year: '2025',
    kind: 'automation',
    cover: '/images/works/automation/meta-campaigns.webp',
    coverAlt:
      'Abstrakte Visualisierung: eine Master-Anzeige vervielfältigt sich über Koralle-Flusslinien in ein Raster vieler identischer Ad-Set-Kopien',
    heroMetric: { value: '~12 h → 2 h', label: 'manuelle Arbeit pro Monat' },
    tags: ['Python', 'Meta Marketing API', 'facebook-business', 'REST'],
    intro:
      'Jeden Monat mussten für einen Pflegekonzern mit über 100 Standorten hunderte Ad-Sets von Hand in Meta angelegt werden — ein wiederkehrender, fehleranfälliger Prozess von rund 12 Stunden. Ein Python-Skript über die Meta Marketing API erledigt das jetzt vollautomatisch.',
    sections: [
      {
        type: 'metrics',
        metrics: [
          { value: '~12 h → 2 h', label: 'manuelle Arbeit pro Monat' },
          { value: '100+', label: 'Standorte je Lauf' },
          { value: '1', label: 'Skript statt hunderter Klicks' },
          { value: '1×', label: 'vollautomatischer Lauf pro Monat' },
        ],
      },
      {
        type: 'text',
        heading: 'Das Problem',
        content:
          'Für die Recruiting-Kampagnen über 100+ Standorte mussten Monat für Monat hunderte Ad-Sets manuell im Meta Ads Manager dupliziert und je Standort angepasst werden — Targeting, Region, Budget. Rund zwölf Stunden monotone, fehleranfällige Klickarbeit.',
      },
      {
        type: 'before-after',
        before:
          'Jeden Monat hunderte Ad-Sets von Hand in Meta anlegen und je Standort anpassen — ~12 Stunden, monoton und fehleranfällig.',
        after:
          'Ein Python-Skript erzeugt alle Kampagnen und Ad-Sets über die Meta Marketing API — standortgenau, in Minuten, reproduzierbar.',
      },
      {
        type: 'process',
        heading: 'Der Workflow',
        steps: [
          { title: 'Standortdaten', desc: 'Standorte und Parameter aus einer zentralen Liste lesen.' },
          { title: 'Vorlage', desc: 'Kampagnen-Template einmal definieren.' },
          { title: 'API', desc: 'Meta Marketing API legt Kampagnen & Ad-Sets je Standort an.' },
          { title: 'Kontrolle', desc: 'Logging und Prüfung vor dem Aktivschalten.' },
        ],
      },
      {
        type: 'code',
        caption: 'create_campaigns.py',
        code: `# Pro Standort ein Ad-Set über die Meta Marketing API anlegen
for standort in standorte:
    AdSet(parent_id=campaign_id).remote_create(params={
        "name": f"{standort['name']} – Recruiting",
        "targeting": geo_targeting(standort["plz"], radius_km=25),
        "daily_budget": standort["budget"],
        "optimization_goal": "LEAD_GENERATION",
    })`,
      },
      {
        type: 'quote',
        content:
          'Ein halber Arbeitstag im Monat wird zu einem Skriptlauf von Minuten.',
      },
      {
        type: 'tech-stack',
        heading: 'Tech-Stack',
        stack: ['Python', 'Meta Marketing API', 'facebook-business SDK', 'REST'],
      },
    ],
    nextProject: 'qr-stellencheck',
  },
]

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getNextProject(slug: string): Project | undefined {
  const current = getProject(slug)
  if (!current?.nextProject) return undefined
  return getProject(current.nextProject)
}
