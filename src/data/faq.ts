export interface FaqItem {
  q: string
  a: string
}

/**
 * Q&A content — surfaced both as a visible FAQ section and as FAQPage JSON-LD
 * (the latter lands in the prerendered <head>, so AI crawlers that don't run JS
 * still read the answers). Phrased self-contained and in the third person for
 * entity clarity / citability.
 */
export const faqs: FaqItem[] = [
  {
    q: 'Was macht eine Creative Technologist?',
    a: 'Eine Creative Technologist verbindet Design und Technik: Sie gestaltet nicht nur Interfaces und Kampagnen, sondern baut auch die Automatisierung dahinter — von UI/UX über Performance-Marketing bis zu Python-Skripten, API-Anbindungen und Datendashboards. Noline Lindor deckt damit den Weg von der ersten Idee bis zur funktionierenden, messbaren Lösung ab.',
  },
  {
    q: 'Welche Leistungen bietet Noline Lindor an?',
    a: 'Im kreativen Bereich: UI/UX Design, Brand Identity und 3D-Visualisierung. Im technischen Bereich: Marketing Automation (Python, Meta Marketing API, Google Ads Scripts), KI-Workflows (Claude, n8n, eigene Agenten), Performance Marketing (Google & Meta Ads) sowie datengetriebene KPI-Dashboards. Der Schwerpunkt liegt darauf, wiederkehrende Marketing-Prozesse zu automatisieren und Design mit Technik zu verbinden.',
  },
  {
    q: 'Was unterscheidet Noline Lindor von einer klassischen Designerin?',
    a: 'Der Unterschied ist die Kombination aus Gestaltung und Technik. Noline bleibt nicht beim Entwurf stehen, sondern baut die Systeme dahinter — etwa ein Python-Skript, das einen rund 12-stündigen manuellen Kampagnen-Prozess über 100+ Standorte automatisiert. So wird aus einem Design ein System, das skaliert.',
  },
  {
    q: 'Mit welchen Tools und Technologien arbeitet Noline Lindor?',
    a: 'Design: Figma, Adobe XD, Photoshop, InDesign und Blender. Technik: Python, JavaScript/Node.js, React, PostgreSQL und REST-APIs (u. a. die Meta Marketing API), Google Ads Scripts. KI und Workflows: Claude, n8n und Cursor für eigene Agenten, Skills und Automatisierungen.',
  },
  {
    q: 'Ist Noline Lindor für neue Projekte verfügbar?',
    a: 'Ja. Noline ist offen für Projekte an der Schnittstelle von Design, Marketing und Automatisierung. Am besten direkt per E-Mail oder über das Kontaktformular anfragen — gern mit einer kurzen Beschreibung von Ziel, Rahmen und Zeitraum.',
  },
  {
    q: 'Wo arbeitet Noline Lindor?',
    a: 'Noline Lindor sitzt in Bochum (Deutschland) und arbeitet remote mit Teams und Kund:innen überall. Die Zusammenarbeit läuft je nach Projekt vor Ort oder vollständig digital.',
  },
]
