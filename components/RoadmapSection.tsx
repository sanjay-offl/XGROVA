'use client'

import SectionHeader from './SectionHeader'
import { motion } from 'framer-motion'

const QUARTERS = [
  { q: 'Q1', title: 'Collection & Setup',     body: 'Partner with colleges, IT firms, and CSR programs. Collect decommissioned fleets and establish the automated diagnostic pipeline.', metric: '14-Point Diagnostic Pipeline' },
  { q: 'Q2', title: 'Rebuild & Optimization', body: 'Triage and recover functional silicon. Assemble the pilot units in bio-polymer chassis and install the tuned lightweight EcoOS Linux kernel.', metric: 'Pilot Units Assembled' },
  { q: 'Q3', title: 'Pilot Deployment',       body: 'Distribute 250 laptops across rural schools, NGOs, and coding academies. Collect real-world thermal, battery, and educational-impact telemetry.', metric: '250 Laptops Deployed' },
  { q: 'Q4', title: 'Scale & Expansion',      body: 'Train local youth technicians in repair and micro-hub operations. Expand into 10+ regions and release the open-source hardware blueprint v1.0.', metric: '10+ Regions Live' },
]

export default function RoadmapSection() {
  return (
    <section className="section-pad xg-shell" style={{ background: 'var(--xg-bg)' }}>
      <div className="xg-col">
        <SectionHeader
          num="04"
          tag="Roadmap — Four Quarters"
          title={<>Four quarters to<br />sustainable scale.</>}
          body="A disciplined, phased operational roadmap transforming laboratory prototypes into an expansive, decentralized circular technology network."
        />

        <div className="xg-roadmap-line">
          <div className="fill" />
        </div>

        <div className="xg-quarters">
          {QUARTERS.map((t, i) => (
            <motion.div
              key={t.q}
              className="xg-quarter"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="xg-quarter-q">{t.q}</p>
              <h3 className="xg-quarter-title">{t.title}</h3>
              <p className="xg-quarter-body">{t.body}</p>
              <p className="xg-quarter-metric">{t.metric}</p>
            </motion.div>
          ))}
        </div>

        {/* Year-1 target deliverables */}
        <motion.div
          className="xg-deliverables"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="xg-deliverable">
            <div className="xg-deliverable-num">1,000<small>+</small></div>
            <p className="xg-deliverable-label">Laptops refurbished and distributed<br />to active learners.</p>
          </div>
          <div className="xg-deliverable">
            <div className="xg-deliverable-num">10<small>+</small></div>
            <p className="xg-deliverable-label">Rural and semi-urban regions<br />enabled with digital hubs.</p>
          </div>
          <div className="xg-deliverable">
            <div className="xg-deliverable-num">14,800<small> KG</small></div>
            <p className="xg-deliverable-label">E-waste diverted from landfill —<br />scalable circular-tech model established.</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}