'use client'

import { useEffect, useRef, useState } from 'react'
import { NAV_ITEMS } from '@/lib/nav'
import { getLenis, smoothScrollToElement } from '@/lib/lenis'
import { sound } from '@/lib/sound'

/**
 * Active-section detection — deterministic, works with the GSAP-pinned story:
 * the last nav section whose top has crossed the viewport middle wins.
 * During the pin the story element stays fixed at top:0, so STORY stays
 * active for the whole cinematic sequence; afterwards the editorial sections
 * take over as their tops cross the middle band.
 */
export default function Navbar() {
  const [active, setActive] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const compute = () => {
      const vh = window.innerHeight || 1
      let idx = 0
      for (let i = 0; i < NAV_ITEMS.length; i++) {
        const el = document.getElementById(NAV_ITEMS[i].target)
        if (el && el.getBoundingClientRect().top <= vh * 0.5) idx = i
      }
      setActive(idx)
      setScrolled(idx !== 0)
    }
    compute()
    window.addEventListener('scroll', compute, { passive: true })
    window.addEventListener('resize', compute)
    return () => {
      window.removeEventListener('scroll', compute)
      window.removeEventListener('resize', compute)
    }
  }, [])

  // Lock page scroll while the mobile menu is open
  useEffect(() => {
    const lenis = getLenis()
    if (menuOpen) lenis?.stop()
    else lenis?.start()
  }, [menuOpen])

  const go = (target: string) => {
    sound.playSelect()
    if (target === 'story') {
      smoothScrollToElement(document.getElementById('story'), -70)
    } else {
      smoothScrollToElement(document.getElementById(target))
    }
  }

  const toggleMenu = () => {
    sound.playSelect()
    setMenuOpen(v => !v)
  }

  const goMobile = (target: string) => {
    setMenuOpen(false)
    go(target)
  }

  return (
    <>
      <header className={`xg-nav${scrolled ? ' solid' : ''}`}>
        <a
          className="xg-nav-brand"
          href="#"
          onClick={e => {
            e.preventDefault()
            go('story')
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/xgrova.png"
            alt=""
            aria-hidden="true"
            width={28}
            height={28}
            style={{ objectFit: 'contain', flexShrink: 0 }}
            draggable={false}
          />
          XGROVA
          <span className="xg-nav-brand-mark">◉</span>
        </a>

        <nav className="xg-nav-links" aria-label="Primary">
          {NAV_ITEMS.map((item, i) => (
            <a
              key={item.id}
              className={`xg-nav-link${active === i ? ' active' : ''}`}
              href={`#${item.target}`}
              onMouseEnter={() => sound.playHoverHum()}
              onClick={e => {
                e.preventDefault()
                go(item.target)
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile menu toggle */}
        <button
          className="xg-nav-burger"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={toggleMenu}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      {/* Mobile fullscreen navigation panel */}
      <div className={`xg-nav-menu${menuOpen ? ' open' : ''}`} aria-hidden={!menuOpen}>
        <nav aria-label="Mobile">
          {NAV_ITEMS.map((item, i) => (
            <a
              key={item.id}
              className={`xg-nav-menu-item${active === i ? ' active' : ''}`}
              style={{ ['--i' as string]: i }}
              href={`#${item.target}`}
              onClick={e => {
                e.preventDefault()
                goMobile(item.target)
              }}
            >
              <span className="xg-nav-menu-num">{String(i + 1).padStart(2, '0')}</span>
              {item.label}
            </a>
          ))}
        </nav>
        <p className="xg-nav-menu-foot">XGROVA — CIRCULAR COMPUTING SYSTEM</p>
      </div>
    </>
  )
}