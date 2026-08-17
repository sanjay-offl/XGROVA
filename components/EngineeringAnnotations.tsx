'use client'

import { useEffect, useState } from 'react'
import { ENG_LABELS } from '@/lib/chapters'

interface ImageRect {
  dx: number
  dy: number
  dw: number
  dh: number
}

interface EngineeringAnnotationsProps {
  /** ENGINEERED chapter active (0.50–0.66) */
  visible: boolean
  /** fade-in/out opacity */
  opacity: number
  /** contain-fit bounds of the rendered product (shared with the canvas) */
  rect: ImageRect | null
}

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))

/** approximate mono text width: 9px font, 0.14em letter-spacing + padding */
function textWidth(text: string) {
  return text.length * 6.7 + 10
}

/** Minimum vertical gap between labels (24px hard floor, 32px preferred) */
const MIN_GAP = 24
const PREF_GAP = 32

/**
 * Hardware annotation layer — lives inside the canvas-stage, positioned to the
 * right of the product (between the product edge and the chapter rail).
 *
 * Layout rules:
 *  - labels ordered by anchor Y, distributed over an even vertical slot grid
 *    (row height ≥ 32px) so no two labels ever collide
 *  - label column clamped to the annotation safe area (ends before the rail)
 *  - lines are drawn before text, so they can never cross label text
 *  - secondary labels (MEMORY, BATTERY) drop first when space is tight
 */
export default function EngineeringAnnotations({ visible, opacity, rect }: EngineeringAnnotationsProps) {
  const [stage, setStage] = useState({ w: 0, h: 0 })

  useEffect(() => {
    const onR = () => setStage({ w: window.innerWidth, h: window.innerHeight })
    onR()
    window.addEventListener('resize', onR)
    return () => window.removeEventListener('resize', onR)
  }, [])

  if (!visible || opacity <= 0.001 || !rect || stage.w < 768) return null

  const { dx, dy, dw, dh } = rect

  // chapter rail sits at right: clamp(24px, 3vw, 48px), ~56px wide
  const railLeft = stage.w - clamp(24, stage.w * 0.03, 48) - 56
  const maxRight = railLeft - 16

  let labels = [...ENG_LABELS].sort((a, b) => a.anchorY - b.anchorY)

  // below ~1360px viewports, secondary labels drop out first
  if (stage.w < 1360) labels = labels.filter(l => l.priority === 'primary')

  const top = dy + 16
  const bottom = dy + dh - 16
  const avail = bottom - top
  let slotH = Math.max(PREF_GAP, avail / labels.length)
  if (slotH < PREF_GAP && labels.length > 5) {
    // too tight for all labels — keep only primary
    labels = labels.filter(l => l.priority === 'primary')
    slotH = Math.max(PREF_GAP, avail / labels.length)
  }
  if (slotH < MIN_GAP) return null // no room at all — drop the layer

  const maxLabelW = Math.max(...labels.map(l => textWidth(l.text)))
  // label column: product edge + 24px, clamped into the safe area
  const labelX = Math.min(dx + dw + 24, Math.max(dx + dw + 4, maxRight - maxLabelW))

  return (
    <svg
      className="xg-annotations"
      style={{ opacity }}
      aria-hidden="true"
    >
      {labels.map((l, i) => {
        const ax = dx + l.anchorX * dw
        const ay = dy + l.anchorY * dh
        const ly = clamp(top + slotH * (i + 0.5), top, bottom)
        const d = i * 0.18
        return (
          <g key={l.id} className="xg-annotation">
            <line
              x1={ax} y1={ay}
              x2={labelX} y2={ly}
              stroke="rgba(57,211,83,0.4)" strokeWidth="1" strokeDasharray="2 4"
              style={{ animationDelay: `${d + 0.08}s` }}
            />
            <circle
              className="xg-annotation-dot"
              cx={ax} cy={ay} r="3" fill="#39D353"
              style={{ animationDelay: `${d}s` }}
            />
            <circle
              cx={ax} cy={ay} r="6" fill="none" stroke="rgba(57,211,83,0.25)" strokeWidth="1"
              style={{ animationDelay: `${d}s` }}
            />
            <text
              x={labelX} y={ly}
              textAnchor="start" dominantBaseline="middle"
              fill="rgba(255,255,255,0.75)"
              style={{ fontSize: 9, fontFamily: 'var(--font-mono)', letterSpacing: '0.14em', textTransform: 'uppercase', animationDelay: `${d + 0.16}s` }}
            >
              {l.text}
            </text>
          </g>
        )
      })}
    </svg>
  )
}