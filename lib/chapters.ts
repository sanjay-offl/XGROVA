export const TOTAL     = 151
export const SCROLL_PX = 8000

export interface Chapter {
  num: string
  label: string
  title: string
  body: string
  start: number
  end: number
}

export const CHAPTERS: Chapter[] = [
  { num: '01', label: 'STORY',      title: 'A second life\nfor technology.',            body: 'Every discarded laptop contains components that still have value. XGROVA transforms those components into affordable computing devices designed for a second life.',                                start: 0.00, end: 0.15 },
  { num: '02', label: 'BREAKDOWN',  title: 'Look closer.',                              body: 'What appears to be obsolete hardware still contains functional components. We begin the mechanical separation — a slow, deliberate disassembly of engineered systems.',                           start: 0.15, end: 0.32 },
  { num: '03', label: 'COMPONENTS', title: 'Waste becomes a\nsystem of possibilities.', body: 'XGROVA salvages functional components at the system level — not simply reselling discarded devices. Each part is evaluated, recovered, and given a new role.',                                  start: 0.32, end: 0.50 },
  { num: '04', label: 'ENGINEERED', title: 'Engineered apart.',                         body: 'The full exploded view reveals the engineering philosophy of XGROVA. Every component evaluated, every connection purposeful. This is the hardware truth behind circular computing.',              start: 0.50, end: 0.66 },
  { num: '05', label: 'REBUILD',    title: 'Rebuilt for access.',                       body: 'Modular hardware, sustainable bio-polymer materials, and a lightweight Linux operating system come together to create affordable computing for underserved communities.',                          start: 0.66, end: 0.82 },
  { num: '06', label: 'FUTURE',     title: 'Built for\nwhat comes next.',               body: 'XGROVA proves circular technology is not a compromise — it is the future of responsible, accessible computing. Give technology another life.',                                                    start: 0.82, end: 1.00 },
]

/**
 * Hardware annotations — anchored to the actual exploded components in the
 * source frames (1924×1076). Coordinates are normalized to the source frame,
 * then mapped to the *rendered* image bounds (contain-fit), so labels follow
 * the product on resize/DPR instead of floating at viewport percentages.
 *
 * Measured exploded-laptop bands (settled view, frames ~95–100):
 *   DISPLAY      top lid strip      y 164–187   x 379–1548
 *   KEYBOARD     key rows           y 373–421   x 461–1463
 *   MOTHERBOARD  main PCB block     y 423–672   x 381–1543
 *   MEMORY       RAM stick strip    y 494–590   x 1368–1535 (right edge of PCB)
 *   THERMAL SYS  copper pipe band   y 600–672   (warm tint confirmed)
 *   BATTERY      dark pack band     y 674–805
 *   FRAME        bottom chassis     y 813–968
 */
export interface HardwareAnnotation {
  text: string
  /** dot position on the product — normalized to the source frame (0–1) */
  anchorX: number
  anchorY: number
  /** label position — normalized to the source frame (may exceed 0–1) */
  labelX: number
  labelY: number
}

export const ENG_LABELS: HardwareAnnotation[] = [
  { text: 'DISPLAY',      anchorX: 0.50,  anchorY: 0.163, labelX: 1.04, labelY: 0.12  },
  { text: 'KEYBOARD',     anchorX: 0.50,  anchorY: 0.369, labelX: 1.04, labelY: 0.28  },
  { text: 'MOTHERBOARD',  anchorX: 0.50,  anchorY: 0.476, labelX: 1.04, labelY: 0.44  },
  { text: 'MEMORY',       anchorX: 0.754, anchorY: 0.504, labelX: 1.04, labelY: 0.52  },
  { text: 'THERMAL SYS',  anchorX: 0.50,  anchorY: 0.591, labelX: 1.04, labelY: 0.60  },
  { text: 'BATTERY',      anchorX: 0.50,  anchorY: 0.688, labelX: 1.04, labelY: 0.70  },
  { text: 'FRAME',        anchorX: 0.50,  anchorY: 0.827, labelX: 1.04, labelY: 0.84  },
]

export function chapterAt(progress: number): number {
  const ci = CHAPTERS.findIndex(c => progress >= c.start && progress < c.end)
  return ci === -1 ? CHAPTERS.length - 1 : ci
}