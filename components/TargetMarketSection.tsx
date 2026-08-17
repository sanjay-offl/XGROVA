'use client'

import SectionHeader from './SectionHeader'
import { motion } from 'framer-motion'
import { sound } from '@/lib/sound'
import { smoothScrollToElement } from '@/lib/lenis'

const MARKETS = [
  { num: '01', title: 'Students',      body: 'Affordable computing for learning',                                  detail: 'Rural and semi-urban learners who need affordable laptops for education, online learning, and skill development.' },
  { num: '02', title: 'Small Businesses', body: 'Reliable hardware without new-device cost',                       detail: 'SMEs, shop owners, and MSMEs that need reliable computing for everyday operations without licensing overhead.' },
  { num: '03', title: 'NGOs & Institutions', body: 'Scalable access infrastructure',                               detail: 'Schools, government programs, and corporate CSR initiatives focused on digital inclusion and e-waste reduction.' },
]

export default function TargetMarketSection() {
  return (
    <section id="technology" className="section-pad" style={{ background: 'var(--xg-bg)' }}>
      <div className="xg-container">
        <SectionHeader
          num="02"
          tag="Target Market — Engineered for Access"
          title={<>Engineered for where<br />access matters most.</>}
          body="By removing financial and infrastructure barriers, XGROVA delivers high-utility computing directly to communities excluded by standard consumer hardware pricing."
        />

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {MARKETS.map((m, i) => (
            <motion.div
              key={m.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <a
                className="xg-market-row"
                href={`#${m.num === '03' ? 'contact' : 'impact'}`}
                onClick={e => {
                  e.preventDefault()
                  sound.playSelect()
                  smoothScrollToElement(document.getElementById(m.num === '03' ? 'contact' : 'impact'))
                }}
                title={m.detail}
              >
                <span className="xg-market-num">{m.num}</span>
                <span className="xg-market-title">{m.title}</span>
                <span className="xg-market-body">{m.body}</span>
                <span className="xg-market-arrow">→</span>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}