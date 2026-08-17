'use client'

import SectionHeader from './SectionHeader'
import { motion } from 'framer-motion'

const PILLARS = [
  {
    n: '01',
    label: 'Environmental',
    metric: '14.8',
    unit: 'KG',
    sub: 'E-WASTE DIVERTED\nPER UNIT',
    body: 'Every unit prevents heavy-metal landfill contamination and lowers the demand for new hardware production.',
  },
  {
    n: '02',
    label: 'Social',
    metric: '1.3',
    unit: 'B',
    sub: 'LEARNERS NEED\nAFFORDABLE ACCESS',
    body: 'Affordable laptops for students and underserved communities — improving education, digital literacy, and skills.',
  },
  {
    n: '03',
    label: 'Economic',
    metric: '70',
    unit: '%',
    sub: 'COST REDUCTION\nVS NEW HARDWARE',
    body: 'Local employment in assembly, repair, and maintenance via a repeatable micro-hub franchise model.',
  },
  {
    n: '04',
    label: 'Scalable',
    metric: '10',
    unit: '+',
    sub: 'REGIONS\nYEAR ONE',
    body: 'A repeatable circular-tech model expanding through NGOs, CSR programs, and institutional partnerships.',
  },
]

export default function ImpactSection() {
  return (
    <section id="impact" className="section-pad" style={{ background: 'var(--xg-bg)' }}>
      <div className="xg-container">
        <SectionHeader
          num="01"
          tag="Impact — Measurable Systemic Change"
          title={<>Four dimensions<br />of impact.</>}
          body="XGROVA operates at the intersection of environmental preservation and digital equity. By treating discarded hardware as functional raw assets, we create enduring planetary and human value."
        />

        <div className="xg-metric-grid">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.n}
              className="xg-metric"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="xg-eyebrow" style={{ marginBottom: 0 }}>
                <span className="xg-eyebrow-num">{p.n}</span>
                {p.label}
              </p>
              <div className="xg-metric-num">
                {p.metric}
                <span className="unit">{p.unit}</span>
              </div>
              <p className="xg-metric-labels" style={{ whiteSpace: 'pre-line' }}>{p.sub}</p>
              <p className="xg-metric-body">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}