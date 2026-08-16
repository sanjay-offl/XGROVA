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

export const ENG_LABELS = [
  { text: 'DISPLAY',      dotX: 35, dotY: 27, textX: 20, textY: 18 },
  { text: 'THERMAL SYS', dotX: 65, dotY: 30, textX: 76, textY: 21 },
  { text: 'MOTHERBOARD', dotX: 37, dotY: 50, textX: 18, textY: 48 },
  { text: 'MEMORY',      dotX: 63, dotY: 50, textX: 78, textY: 44 },
  { text: 'BATTERY',     dotX: 37, dotY: 66, textX: 20, textY: 72 },
  { text: 'FRAME',       dotX: 62, dotY: 67, textX: 78, textY: 70 },
  { text: 'KEYBOARD',    dotX: 50, dotY: 74, textX: 50, textY: 83 },
]

export function chapterAt(progress: number): number {
  const ci = CHAPTERS.findIndex(c => progress >= c.start && progress < c.end)
  return ci === -1 ? CHAPTERS.length - 1 : ci
}