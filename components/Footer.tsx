'use client'

import { sound } from '@/lib/sound'
import { smoothScrollToElement } from '@/lib/lenis'

const LINKS = [
  { label: 'STORY', id: 'story' },
  { label: 'TECHNOLOGY', id: 'technology' },
  { label: 'IMPACT', id: 'impact' },
  { label: 'CONTACT', id: 'contact' },
]

export default function Footer() {
  const go = (id: string) => {
    sound.playSelect()
    smoothScrollToElement(document.getElementById(id), id === 'story' ? -70 : 0)
  }

  return (
    <footer
      style={{
        borderTop: '1px solid var(--xg-border)',
        backgroundColor: 'var(--xg-bg)',
      }}
    >
      <div className="xg-shell">
        <div className="xg-col">
          <div className="xg-footer-grid">
            <div>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', color: '#fff', display: 'block', marginBottom: 8 }}>
                XGROVA
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.2em', color: 'var(--xg-green)', textTransform: 'uppercase' }}>
                Circular Computing System
              </span>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 12 }}>
              {LINKS.map(l => (
                <a
                  key={l.label}
                  href={`#${l.id}`}
                  onClick={e => {
                    e.preventDefault()
                    go(l.id)
                  }}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    letterSpacing: '0.12em',
                    color: 'rgba(255,255,255,0.55)',
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    transition: 'color 250ms ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#39D353')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                >
                  {l.label}
                </a>
              ))}
            </nav>

            <div className="xg-footer-end">
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.38)', textTransform: 'uppercase' }}>
                Presented by Sanjay S
              </span>
              <button
                onClick={() => go('story')}
                onMouseEnter={() => {
                  sound.playHoverHum()
                  const el = document.getElementById('top-btn')
                  if (el) {
                    el.style.borderColor = '#39D353'
                    el.style.color = '#39D353'
                  }
                }}
                onMouseLeave={() => {
                  const el = document.getElementById('top-btn')
                  if (el) {
                    el.style.borderColor = 'var(--xg-border)'
                    el.style.color = 'rgba(255,255,255,0.62)'
                  }
                }}
                id="top-btn"
                style={{
                  background: 'none',
                  border: '1px solid var(--xg-border)',
                  borderRadius: 2,
                  color: 'rgba(255,255,255,0.62)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  letterSpacing: '0.14em',
                  cursor: 'pointer',
                  padding: '8px 16px',
                  textTransform: 'uppercase',
                  transition: 'border-color 250ms ease, color 250ms ease',
                }}
              >
                Top ↑
              </button>
            </div>
          </div>

          <div className="xg-footer-bottom">
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.3)' }}>
              © XGROVA
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.3)' }}>
              UPcycling E-WASTE · AFFORDABLE COMPUTING
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}