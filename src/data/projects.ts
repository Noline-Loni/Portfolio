export interface ProjectSection {
  type: 'text' | 'image' | 'image-grid' | 'quote'
  heading?: string
  content?: string
  src?: string
  alt?: string
  images?: { src: string; alt: string }[]
}

export interface Project {
  slug: string
  title: string
  subtitle: string
  category: string
  year: string
  cover: string
  coverPosition?: string
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
    cover: '/images/works/lubalabs/Logo Mockup_LubaLabs_hell.png',
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
        src: '/images/works/lubalabs/Logo Mockup_LubaLabs_erweitert.png',
        alt: 'Luba Labs Logo auf strukturiertem braunem Hintergrund',
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
            src: '/images/works/lubalabs/LubaLabs_Logo_gold-darkblack.png',
            alt: 'Luba Labs Logo Gold auf Schwarz',
          },
          {
            src: '/images/works/lubalabs/LubaLabs_Logo_gold-creme.png',
            alt: 'Luba Labs Logo Gold auf Creme',
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
        src: '/images/works/lubalabs/LubaLabs_Jewelry_3D_new-Kamera.png',
        alt: 'Luba Labs Schmuck 3D-Rendering — goldene Ohrringe',
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
            src: '/images/works/lubalabs/Clothing Package mock up_LubaLabs_neu.png',
            alt: 'Luba Labs Verpackungs-Mockup',
          },
          {
            src: '/images/works/lubalabs/Clothing Label mock up_LubaLabs.png',
            alt: 'Luba Labs Clothing Label Mockup',
          },
        ],
      },
      {
        type: 'image',
        src: '/images/works/lubalabs/Letter Mockup_LubaLabs.png',
        alt: 'Luba Labs Geschäftsbrief Mockup',
      },
      {
        type: 'text',
        heading: 'Social Media',
        content:
          'Das Social-Media-Konzept transportiert die Markenwerte über Instagram: Tradition trifft Moderne, Nachhaltigkeit als Haltung, authentische Bildsprache mit warmen Erdtönen und dem goldenen Akzent des Logomarks.',
      },
      {
        type: 'image',
        src: '/images/works/lubalabs/IG_Mockup_LubaLabs.png',
        alt: 'Luba Labs Instagram Mockup mit Posts und Stories',
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
    cover: '/images/works/cremas-lakay.jpg',
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
        src: '/images/works/cremas-lakay/Logo.png',
        alt: 'Cremas Lakay Logo',
      },
      {
        type: 'text',
        heading: 'Moodboard & Gestaltung',
        content:
          'Basierend auf den festgelegten Markenwerten wurde ein Moodboard erstellt, das Bilder und Kunst aus Haiti einbezieht, um den Ursprung des Getränks widerzuspiegeln und eine visuelle Richtung für die Marke zu definieren.',
      },
      {
        type: 'image',
        src: '/images/works/cremas-lakay/Moodboard-30.jpg',
        alt: 'Cremas Lakay Moodboard — Haitianische Inspirationen und Farbpalette',
      },
      {
        type: 'text',
        heading: 'Flaschenlabel & Verpackung',
        content:
          'Das Etikettendesign verbindet traditionelle haitianische Elemente mit einer modernen, hochwertigen Anmutung. Sowohl die Vorder- als auch die Rückseite wurden gestaltet, ergänzt durch eine passende Geschenkverpackung.',
      },
      {
        type: 'image',
        src: '/images/works/cremas-lakay/CL_Bottle_Mockup_2cremas.jpg',
        alt: 'Cremas Lakay Flaschen-Mockup Vorderseite',
      },
      {
        type: 'image-grid',
        images: [
          {
            src: '/images/works/cremas-lakay/CL_Bottle_Mockup_2cremas_hinten.jpg',
            alt: 'Cremas Lakay Flaschen-Mockup Rückseite',
          },
          {
            src: '/images/works/cremas-lakay/CL_Box-Mockup_transparent.png',
            alt: 'Cremas Lakay Geschenkbox Mockup',
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
        src: '/images/works/cremas-lakay/Anzeige_Mockup.jpg',
        alt: 'Cremas Lakay Anzeigen-Mockup',
      },
      {
        type: 'image',
        src: '/images/works/cremas-lakay/Web 1920 – 2.png',
        alt: 'Cremas Lakay Branding Übersicht und CI-Styleguide',
      },
      {
        type: 'image-grid',
        images: [
          {
            src: '/images/works/cremas-lakay/Instagram-Post – 3.png',
            alt: 'Cremas Lakay Instagram Post',
          },
          {
            src: '/images/works/cremas-lakay/Instagram-Post – 4.png',
            alt: 'Cremas Lakay Instagram Post',
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
    cover: '/images/works/haiti-med.png',
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
        src: '/images/works/haiti-med/before-after.png',
        alt: 'Haiti-Med Logo Vorher-Nachher Vergleich',
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
        src: '/images/works/haiti-med/redesign-overview.png',
        alt: 'Redesign Übersicht mit Logo-Variationen und CI-System',
      },
      {
        type: 'image',
        src: '/images/works/haiti-med/ci-guidelines.png',
        alt: 'Corporate Identity Guidelines mit Typografie und Farbpalette',
      },
      {
        type: 'text',
        heading: 'CI & Social Media',
        content:
          'Zum Abschluss wurden Mockups erstellt, die die Marke in Aktion zeigen — darunter Social-Media-Posts und umfassende Corporate-Identity-Guidelines, die sowohl für digitale als auch für gedruckte Materialien geeignet sind.',
      },
      {
        type: 'image',
        src: '/images/works/haiti-med/social-media.png',
        alt: 'Social Media Posts und Mobile Mockups für Haiti-Med e.V.',
      },
      {
        type: 'image-grid',
        images: [
          {
            src: '/images/works/haiti-med/08_2025-Instagram_Post_HaitiKonbit2025_Vormerken_1080x1080px.png',
            alt: 'Haiti Konbit 2025 Instagram Post',
          },
          {
            src: '/images/works/haiti-med/2025_08-Instagram_Post_HaitiKonbit2025_Kuenstlerspotlight-WAWA_1080x1080px.png',
            alt: 'Haiti Konbit 2025 Künstlerspotlight',
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
    cover: '/images/works/nutrition-pets.png',
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
        src: '/images/works/nutrition-pets/overview.png',
        alt: 'NUTRITIONfurPETS App Screens Übersicht',
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
            src: '/images/works/nutrition-pets/Gruppe maskieren 25.png',
            alt: 'Crazy Eights Skizzen',
          },
          {
            src: '/images/works/nutrition-pets/Web 1920 – 3.png',
            alt: 'NUTRITIONfurPETS Wireframes',
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
        src: '/images/works/nutrition-pets/Web 1920 – 4.png',
        alt: 'NUTRITIONfurPETS High-Fidelity Screens',
      },
    ],
    nextProject: 'luba-labs',
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
