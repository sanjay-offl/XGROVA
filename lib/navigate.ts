'use client'

import { CHAPTERS } from './chapters'
import { smoothScrollTo } from './lenis'

/**
 * Scroll to the start of a pinned-canvas chapter.
 * Uses the first ScrollTrigger (the canvas pin) to compute the pixel range.
 */
export async function jumpToChapter(ci: number): Promise<void> {
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  const st = ScrollTrigger.getAll()[0]
  if (!st) return
  const startPx = st.start
  const rangePx = st.end - st.start
  const target = startPx + CHAPTERS[ci].start * rangePx
  smoothScrollTo(Math.max(0, target))
}