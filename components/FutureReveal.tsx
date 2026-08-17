'use client'

const clamp01 = (v: number) => Math.max(0, Math.min(1, v))
const smooth = (x: number) => x * x * (3 - 2 * x)

interface FutureRevealProps {
  /** overall story progress 0..1 (chapter 06 = 0.82–1.00) */
  progress: number
}

/**
 * Final Future composition — editorial two-column layout.
 * Text occupies the LEFT zone (CIRCULAR TECHNOLOGY / XGROVA / subtitle /
 * attribution); the laptop stays dominant on the RIGHT (the canvas).
 * All motion is scroll-linked and deterministic — no timers, no loops.
 */
export default function FutureReveal({ progress }: FutureRevealProps) {
  const p06 = clamp01((progress - 0.82) / 0.18)

  const stage = (a: number, b: number) => {
    const e = smooth(clamp01((p06 - a) / (b - a)))
    return { opacity: e, y: (1 - e) * 20 }
  }

  const eyebrow     = stage(0.04, 0.16)
  const title       = stage(0.12, 0.30)
  const subtitle    = stage(0.26, 0.42)
  const attribution = stage(0.40, 0.56)

  return (
    <div className="xg-col-overlay xg-future" style={{ pointerEvents: 'none' }}>
      <p
        className="xg-future-eyebrow"
        style={{ opacity: eyebrow.opacity, transform: `translateY(${eyebrow.y}px)` }}
      >
        Circular Technology
      </p>
      <h2
        className="xg-future-title"
        style={{
          opacity: title.opacity,
          transform: `translateY(${title.y}px)`,
          letterSpacing: `${-0.02 - 0.03 * title.opacity}em`,
        }}
      >
        XGROVA
      </h2>
      <p
        className="xg-future-subtitle"
        style={{ opacity: subtitle.opacity, transform: `translateY(${subtitle.y}px)` }}
      >
        Circular technology for a more accessible future.
      </p>
      <p
        className="xg-future-attribution"
        style={{ opacity: attribution.opacity, transform: `translateY(${attribution.y}px)` }}
      >
        Presented by <span className="xg-future-team">Team XGROVA</span>
      </p>
    </div>
  )
}