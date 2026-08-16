'use client'

import { useScrollState } from '@/lib/scrollStore'
import { CHAPTERS, TOTAL } from '@/lib/chapters'
import { Recycle } from 'lucide-react'
import { smoothScrollToElement } from '@/lib/lenis'

export default function HudRail() {
  const { progress, frame, chapter, ready, storyActive } = useScrollState()
  const ch = CHAPTERS[chapter]
  const pct = (progress * 100).toFixed(1)
  const hidden = !storyActive

  return (
    <aside className="xg-rail" aria-label="System status">
      {/* ── Logo area — actual brand asset ── */}
      <a
        className="xg-rail-logo"
        href="#"
        onClick={e => {
          e.preventDefault()
          smoothScrollToElement(document.getElementById('story'), -70)
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/xgrova.png"
          alt="XGROVA"
          width={44}
          height={44}
          style={{ objectFit: 'contain' }}
          draggable={false}
        />
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: '0.08em',
            color: 'var(--xg-white)',
          }}
        >
          XGROVA
        </span>
      </a>

      {/* ── Cinematic technical status — fades out below the pinned section ── */}
      <div className={`xg-rail-cinematic${hidden ? ' xg-hud-hidden' : ''}`}>
        <div className="xg-hud-block">
          <div className="xg-hud-label">Scroll</div>
          <div className="xg-hud-value">{pct}%</div>
        </div>

        <div className="xg-hud-block">
          <div className="xg-hud-label">Frame</div>
          <div className="xg-hud-value">
            {String(frame).padStart(3, '0')}
            <span className="xg-hud-value-white" style={{ opacity: 0.4 }}>
              {' '}
              / {TOTAL}
            </span>
          </div>
        </div>

        <div className="xg-hud-block">
          <div className="xg-hud-label">Chapter</div>
          <div className="xg-hud-value">
            {ch.num} {ch.label}
          </div>
        </div>

        <div className="xg-hud-block">
          <div className="xg-hud-label">GSAP Pin</div>
          <div className="xg-hud-value">{ready ? 'ACTIVE' : 'LOADING'}</div>
        </div>

        {/* ── Bottom system status ── */}
        <div className="xg-rail-footer">
          <div className="xg-hud-label">XGROVA SYSTEM</div>
          <div className="xg-rail-frame">{String(frame).padStart(3, '0')}</div>
          <div className="xg-rail-frame-total">/ {TOTAL} FRAMES</div>
          <Recycle size={20} strokeWidth={1.4} color="#39D353" style={{ marginTop: 6 }} />
        </div>
      </div>
    </aside>
  )
}