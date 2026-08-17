'use client'

import { useEffect, useRef, useState } from 'react'
import { CHAPTERS, TOTAL, SCROLL_PX, chapterAt } from '@/lib/chapters'
import { scrollStore } from '@/lib/scrollStore'
import { getLenis, smoothScrollToElement } from '@/lib/lenis'
import { sound } from '@/lib/sound'
import EngineeringAnnotations from './EngineeringAnnotations'
import CinematicHUD from './CinematicHUD'
import ChapterCopy from './ChapterCopy'
import FutureReveal from './FutureReveal'

// ─────────────────────────────────────────────────────────────────────────────
// Canvas draw region — cinematic grid:
//   text column  ~12–45%   (editorial copy)
//   product      ~46–82%   (contain-fit within the region)
//   annotations  ~82–91%   (label column between product and chapter rail)
//   chapter rail ~93–100%  (right, inside the story section)
// ─────────────────────────────────────────────────────────────────────────────
function getRegion() {
  const W = window.innerWidth
  const H = window.innerHeight
  if (W >= 1280) {
    return { x: W * 0.46, cy: (H + 84) / 2, w: W * 0.36, h: H * 0.92 }
  }
  if (W >= 768) {
    return { x: W * 0.40, cy: (H + 84) / 2, w: W - W * 0.40 - 160, h: H * 0.92 }
  }
  // mobile — canvas below the text block
  return { x: 0, cy: H * 0.64, w: W, h: H * 0.68 }
}

// ─────────────────────────────────────────────────────────────────────────────
// KingAI 3.0 attribution mask — normalized coordinates relative to the source
// frame (1924×1076). Measured watermark bounds: x 1694–1881, y 1007–1042.
// Padding added for anti-aliasing halos. Positioned over the *rendered* image
// bounds so it follows contain-fit scaling, DPR, and resize automatically.
// ─────────────────────────────────────────────────────────────────────────────
const KINGAI_MASK = { x: 0.872, y: 0.921, w: 0.117, h: 0.062 }
const FRAME_IR    = 1924 / 1076   // source frame aspect ratio

/** Contain-fit bounds shared by the canvas draw, the KingAI mask, and the
 *  hardware annotations — everything stays locked to the product. */
function getImageBounds() {
  const { x, cy, w, h } = getRegion()
  const fit = Math.min(w / (FRAME_IR * h), 1) * 0.94
  const dh  = h * fit
  const dw  = dh * FRAME_IR
  return { dx: x + (w - dw) / 2, dy: cy - dh / 2, dw, dh }
}

// ─────────────────────────────────────────────────────────────────────────────
// Component — the pinned cinematic story section. Owns the canvas stage
// (canvas → KingAI mask → annotations), the HUD, and the chapter overlays.
// The HUD lives INSIDE this section, so it scrolls away with the story —
// nothing stays fixed on the page below the pin.
// ─────────────────────────────────────────────────────────────────────────────
export default function ScrollytellingSection() {
  const sectionRef  = useRef<HTMLDivElement>(null)  // GSAP pins this
  const canvasRef   = useRef<HTMLCanvasElement>(null)
  const imgsRef     = useRef<(HTMLImageElement | null)[]>(Array(TOTAL).fill(null))
  const playheadRef = useRef({ frame: 0 })
  const maskRef     = useRef<HTMLDivElement>(null)   // KingAI attribution mask
  const maskKeyRef  = useRef('')
  const tickRef     = useRef(-1)                     // last haptic-tick frame guard

  const [loaded,      setLoaded]      = useState(0)
  const [isReady,     setIsReady]     = useState(false)
  const [chapIdx,     setChapIdx]     = useState(0)
  const [scrollProg,  setScrollProg]  = useState(0)
  const [showLabels,  setShowLabels]  = useState(false)
  const [labelOpacity,setLabelOpacity] = useState(0)
  const [imgBounds,   setImgBounds]   = useState<{ dx: number; dy: number; dw: number; dh: number } | null>(null)
  const boundsKeyRef  = useRef('')

  // ── Chapter cross-fade — the outgoing chapter keeps rendering briefly ────
  const [leavingChap, setLeavingChap] = useState<number | null>(null)
  const chapRef = useRef(0)
  useEffect(() => {
    if (chapIdx === chapRef.current) return
    setLeavingChap(chapRef.current)
    chapRef.current = chapIdx
    const t = setTimeout(() => setLeavingChap(null), 380)
    return () => clearTimeout(t)
  }, [chapIdx])

  // ── Canvas helpers ─────────────────────────────────────────────────────────
  function sizeCanvas() {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const W = window.innerWidth
    const H = window.innerHeight
    canvas.width        = W * dpr
    canvas.height       = H * dpr
    canvas.style.width  = W + 'px'
    canvas.style.height = H + 'px'
  }

  // ── KingAI mask — follows the rendered image bounds ──────────────────────
  function positionMask(dx: number, dy: number, dw: number, dh: number) {
    const el = maskRef.current
    if (!el) return
    const m = KINGAI_MASK
    const left   = dx + m.x * dw
    const top    = dy + m.y * dh
    const width  = m.w * dw
    const height = m.h * dh
    const key = `${left.toFixed(1)}|${top.toFixed(1)}|${width.toFixed(1)}|${height.toFixed(1)}`
    if (maskKeyRef.current === key) return
    maskKeyRef.current = key
    el.style.left   = left + 'px'
    el.style.top    = top + 'px'
    el.style.width  = width + 'px'
    el.style.height = height + 'px'
    el.style.display = 'block'
  }

  function hideMask() {
    const el = maskRef.current
    if (!el) return
    if (el.style.display === 'none') return
    el.style.display = 'none'
  }

  function drawFrame(idx: number) {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    idx = Math.max(0, Math.min(TOTAL - 1, Math.round(idx)))
    const img = imgsRef.current[idx]

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const W   = canvas.width  / dpr
    const H   = canvas.height / dpr

    // always fill background
    ctx.fillStyle = '#050505'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    if (!img || !img.complete || img.naturalWidth === 0) {
      hideMask()
      return
    }

    // shared contain-fit bounds — product, mask, and annotations all agree
    const b = getImageBounds()
    const key = `${b.dx.toFixed(1)}|${b.dy.toFixed(1)}|${b.dw.toFixed(1)}|${b.dh.toFixed(1)}`
    if (boundsKeyRef.current !== key) {
      boundsKeyRef.current = key
      setImgBounds(b)
    }

    // keep the KingAI mask locked to the rendered image bounds
    positionMask(b.dx, b.dy, b.dw, b.dh)

    ctx.save()
    ctx.scale(dpr, dpr)
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'
    ctx.drawImage(img, b.dx, b.dy, b.dw, b.dh)
    ctx.restore()
  }

  // ── Preload all 151 frames ─────────────────────────────────────────────────
  useEffect(() => {
    let n = 0
    const load = (i: number) => {
      const img = new Image()
      img.src = `/frames/ezgif-frame-${String(i + 1).padStart(3, '0')}.jpg`
      img.onload = img.onerror = () => {
        n++
        setLoaded(n)
        // render frame 0 as soon as it lands
        if (i === 0) { sizeCanvas(); drawFrame(0) }
        if (n === TOTAL) setTimeout(() => setIsReady(true), 300)
      }
      imgsRef.current[i] = img
    }
    // load frame 0 first, then batch the rest
    load(0)
    let b = 1
    const batch = () => {
      const end = Math.min(b + 12, TOTAL)
      for (let i = b; i < end; i++) load(i)
      b = end
      if (b < TOTAL) requestAnimationFrame(batch)
    }
    requestAnimationFrame(batch)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // ── GSAP ScrollTrigger — initialises only after images are loaded ──────────
  useEffect(() => {
    if (!isReady) return

    let cleanup: (() => void) | undefined

    ;(async () => {
      const { default: gsap }  = await import('gsap')
      const { ScrollTrigger }  = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      // keep Lenis and ScrollTrigger synchronized
      const lenis = getLenis()
      if (lenis) lenis.on('scroll', ScrollTrigger.update)

      sizeCanvas()
      drawFrame(0)

      const ph = playheadRef.current   // { frame: 0 }

      const tween = gsap.to(ph, {
        frame : TOTAL - 1,   // 0 → 150 (all 151 frames)
        ease  : 'none',
        scrollTrigger: {
          trigger       : sectionRef.current,
          start         : 'top top',
          end           : `+=${SCROLL_PX}`,
          scrub         : 0.8,          // slight inertia for cinematic feel
          pin           : true,
          anticipatePin : 1,
          pinSpacing    : true,         // GSAP adds the spacer — no manual height needed
          onUpdate(self) {
            const p  = self.progress
            const fi = Math.max(0, Math.min(TOTAL - 1, Math.round(ph.frame)))

            // draw to canvas
            drawFrame(fi)

            // subtle haptic tick every 10 frames — quiet, guarded, never spammed
            if (fi % 10 === 0 && fi !== tickRef.current) {
              tickRef.current = fi
              sound.playHapticTick(300, 0.012)
            }

            // update React UI state + shared HUD store
            setScrollProg(p)
            // annotations fade in as the exploded view settles into formation
            setShowLabels(p >= 0.50 && p <= 0.66)
            setLabelOpacity(Math.max(0, Math.min(1, Math.min((p - 0.50) / 0.03, (0.66 - p) / 0.03))))
            const ci = chapterAt(p)
            setChapIdx(ci)
            scrollStore.set({ progress: p, frame: fi + 1, chapter: ci, ready: true })
          },
        },
      })

      const onResize = () => {
        sizeCanvas()
        drawFrame(Math.round(ph.frame))
        ScrollTrigger.refresh()
      }
      window.addEventListener('resize', onResize)

      cleanup = () => {
        tween.kill()
        ScrollTrigger.getAll().forEach(t => t.kill())
        window.removeEventListener('resize', onResize)
      }
    })()

    return () => { cleanup?.() }
  }, [isReady]) // eslint-disable-line react-hooks/exhaustive-deps

  const chapter = CHAPTERS[chapIdx] ?? CHAPTERS[0]

  const goTo = (id: string, tone: 'select' | 'soft' = 'select') => {
    if (tone === 'soft') sound.playKeyClick()
    else sound.playSelect()
    smoothScrollToElement(document.getElementById(id))
  }

  return (
    <>
      {/* ── Loading screen — hardware initialization ─────────────────────── */}
      <div
        className={`loading-screen${isReady ? ' done' : ''}`}
        style={{ pointerEvents: isReady ? 'none' : 'auto' }}
      >
        <p className="t-label" style={{ letterSpacing: '0.22em' }}>XGROVA SYSTEM</p>
        <p className="t-label" style={{ color: 'var(--xg-green)' }}>INITIALIZING HARDWARE SEQUENCE</p>
        <div style={{ width: 240, height: 1, background: 'rgba(255,255,255,0.08)', margin: '8px 0' }}>
          <div
            style={{
              height: '100%',
              background: 'var(--xg-green)',
              width: `${(loaded / TOTAL) * 100}%`,
              transition: 'width 80ms linear',
            }}
          />
        </div>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 34, fontWeight: 600, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1 }}>
          {String(loaded).padStart(3, '0')}
          <span style={{ fontSize: 15, color: 'rgba(255,255,255,0.3)', fontWeight: 400, marginLeft: 6 }}>/ {TOTAL}</span>
        </p>
      </div>

      {/* ── Sequence section — GSAP pins this element. The HUD lives here as
             absolute children, so it leaves the viewport with the section. ── */}
      <div
        ref={sectionRef}
        id="story"
        className="xg-story"
      >
        {/* ── Canvas stage: canvas → KingAI mask → annotations ────────────── */}
        <div className="canvas-stage">
          <canvas ref={canvasRef} className="xg-canvas" />

          {/* KingAI 3.0 attribution mask — blends into the black canvas,
              positioned over the rendered image bounds (below annotations) */}
          <div ref={maskRef} className="kingai-mask" aria-hidden="true" />

          {/* Hardware annotations — ENGINEERED chapter, slot-grid layout */}
          <EngineeringAnnotations visible={showLabels} opacity={labelOpacity} rect={imgBounds} />
        </div>

        {/* ── Cinematic HUD — absolute inside the pinned section ──────────── */}
        <CinematicHUD />

        {/* ── Chapter 01 — HERO (fades out over the first 12%) ─────────────── */}
        <div
          className="xg-col-overlay"
          style={{
            opacity   : chapIdx === 0 ? Math.max(0, 1 - scrollProg / 0.12) : 0,
            transition: 'opacity 250ms ease',
          }}
        >
          <h1
            style={{
              fontSize   : 'clamp(3.5rem, 5vw, 5.4rem)',
              fontWeight : 800,
              lineHeight : 0.98,
              letterSpacing: '-0.04em',
              color      : '#fff',
              marginBottom: 40,
            }}
          >
            Waste becomes
            <br />a system of
            <br />
            <span style={{ color: '#39D353' }}>possibilities.</span>
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: 'rgba(255,255,255,0.62)', maxWidth: 500, marginBottom: 48 }}>
            XGROVA salvages functional components at the system level — not simply
            reselling discarded devices. Each part is evaluated, recovered, and
            given a new role.
          </p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', pointerEvents: chapIdx === 0 ? 'auto' : 'none' }}>
            <button className="xg-btn xg-btn-primary" onClick={() => goTo('technology')}>
              Explore Technology
            </button>
            <button className="xg-btn xg-btn-secondary" onClick={() => goTo('impact', 'soft')}>
              Our Impact
            </button>
          </div>
          <div className="xg-scroll-indicator">
            <span className="xg-scroll-dial">↓</span>
            <span className="xg-scroll-label">Scroll to explore</span>
          </div>
        </div>

        {/* ── Chapters 02–05: left editorial column (cross-fade) ──────────── */}
        {leavingChap !== null && leavingChap >= 1 && leavingChap <= 4 && (
          <ChapterCopy key={`leave-${leavingChap}`} chapter={CHAPTERS[leavingChap]} leaving />
        )}
        {chapIdx >= 1 && chapIdx <= 4 && (
          <ChapterCopy key={`enter-${chapIdx}`} chapter={chapter} />
        )}

        {/* ── Chapter 06 — FUTURE: left editorial zone, laptop stays right ─── */}
        {chapIdx === 5 && <FutureReveal progress={scrollProg} />}
      </div>
    </>
  )
}