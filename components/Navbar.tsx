'use client'

import { useEffect, useState } from 'react'
import { smoothScrollToElement } from '@/lib/lenis'
import { sound } from '@/lib/sound'

const LINKS = [
  { label: 'STORY', id: 'story' },
  { label: 'TECHNOLOGY', id: 'technology' },
  { label: 'IMPACT', id: 'impact' },
  { label: 'CONTACT', id: 'contact' },
]

export default function Navbar() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const fn = () => {
      const els = LINKS.map(l => document.getElementById(l.id))
      let idx = 0
      els.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= 160) idx = i
      })
      setActive(idx)
    }
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    window.addEventListener('resize', fn)
    return () => {
      window.removeEventListener('scroll', fn)
      window.removeEventListener('resize', fn)
    }
  }, [])

  const go = (id: string) => {
    sound.playSelect()
    if (id === 'story') {
      smoothScrollToElement(document.getElementById('story'), -70)
    } else {
      smoothScrollToElement(document.getElementById(id))
    }
  }

  return (
    <header className="xg-nav">
      <a
        className="xg-nav-brand"
        href="#"
        onClick={e => {
          e.preventDefault()
          sound.playSelect()
          smoothScrollToElement(document.getElementById('story'), -70)
        }}
      >
        XGROVA
        <span className="xg-nav-brand-mark">◉</span>
      </a>

      <nav className="xg-nav-links" aria-label="Primary">
        {LINKS.map((l, i) => (
          <a
            key={l.label}
            className={`xg-nav-link${active === i ? ' active' : ''}`}
            href={`#${l.id}`}
            onClick={e => {
              e.preventDefault()
              go(l.id)
            }}
          >
            {l.label}
          </a>
        ))}
      </nav>
    </header>
  )
}