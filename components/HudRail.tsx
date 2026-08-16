'use client'

import { useScrollState } from '@/lib/scrollStore'
import { CHAPTERS, TOTAL } from '@/lib/chapters'
import { Recycle } from 'lucide-react'
import { smoothScrollToElement } from '@/lib/lenis'

function XgrovaMark() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
      <circle cx="22" cy="22" r="20" stroke="rgba(255,255,255,0.85)" strokeWidth="1" />
      <circle cx="22" cy="22" r="15" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
      <path
        d="M13 13 L31 31 M31 13 L13 31"
        stroke="rgba(255,255,255,0.9)"
        strokeWidth="2.4"
        strokeLinecap="square"
      />
      <circle cx="22" cy="22" r="2.4" fill="#39D353" />
    </svg>
  )
}

export default function HudRail() {
  const { progress, frame, chapter, ready } = useScrollState()
  const ch = CHAPTERS[chapter]
  const pct = (progress * 100).toFixed(1)

  return (
    <aside className="xg-rail" aria-label="System status">
      {/* ── Logo area ── */}
      <a
        className="xg-rail-logo"
        href="#"
        onClick={e => {
          e.preventDefault()
          smoothScrollToElement(document.getElementById('story'), -70)
        }}
      >
        <XgrovaMark />
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

      {/* ── Technical status information ── */}
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
    </aside>
  )
}