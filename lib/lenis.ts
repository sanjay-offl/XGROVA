'use client'

import Lenis from '@studio-freight/lenis'

let instance: Lenis | null = null

/**
 * Lenis smooth scrolling — synchronized with GSAP ScrollTrigger
 * via `lenis.on('scroll', ScrollTrigger.update)` in the canvas setup.
 */
export function initLenis(): Lenis | null {
  if (typeof window === 'undefined') return null
  if (instance) return instance

  instance = new Lenis({
    duration: 1.15,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.6,
  })

  const raf = (time: number) => {
    instance?.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)

  return instance
}

export function getLenis(): Lenis | null {
  return instance
}

export function smoothScrollTo(target: number, duration = 1.4) {
  if (instance) {
    instance.scrollTo(target, { duration })
  } else {
    window.scrollTo({ top: target, behavior: 'smooth' })
  }
}

export function smoothScrollToElement(el: HTMLElement | null, offset = 0, duration = 1.4) {
  if (!el) return
  const y = el.getBoundingClientRect().top + window.scrollY + offset
  smoothScrollTo(Math.max(0, y), duration)
}