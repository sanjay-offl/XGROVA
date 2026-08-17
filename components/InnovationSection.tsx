'use client'

import SectionHeader from './SectionHeader'
import { motion } from 'framer-motion'

const INNOVATIONS = [
  {
    num: '01',
    title: 'System-Level Upcycling',
    body: 'Functional laptop components are salvaged, bench-tested to 14 technical checkpoints, and reused at the deep component level — not simply cleaned whole machines. Reclaimed motherboards, displays, and RAM are re-architected into fresh modular devices.',
    metrics: ['14-Point Bench Test', 'Component Salvage', 'Modular Re-Architecture'],
  },
  {
    num: '02',
    title: 'Eco-Friendly Hardware',
    body: 'Custom-molded housings utilizing post-consumer recycled polymers and bio-PLA eliminate virgin plastic dependency. Designed with universal M2 fastener standards for 100% field repairability without specialized tooling.',
    metrics: ['85% Recycled Polymer', 'M2 Standard Fasteners', '100% Right-to-Repair'],
  },
  {
    num: '03',
    title: 'Optimized Linux OS',
    body: 'A custom lightweight operating system stripped of background telemetry and bloatware. Consumes under 480 MB idle RAM, boots in under 8.4 seconds, and preloads offline STEM education utilities, Python, LibreOffice, and multilingual input.',
    metrics: ['<480 MB Idle RAM', '8.4s Cold Boot', 'Offline STEM Suite'],
  },
]

export default function InnovationSection() {
  return (
    <section className="section-pad" style={{ background: 'var(--xg-bg)' }}>
      <div className="xg-container">
        <SectionHeader
          num="03"
          tag="Innovation — Three Core Systems"
          title={<>Engineering the second<br />life of technology.</>}
          body="XGROVA reinvents the traditional computing supply chain through three foundational hardware, material, and software breakthroughs."
        />

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {INNOVATIONS.map((inv, i) => (
            <motion.div
              key={inv.num}
              className="xg-module"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="xg-module-num">{inv.num}</span>
              <div>
                <h3 className="xg-module-title">{inv.title}</h3>
                <p className="xg-module-body">{inv.body}</p>
              </div>
              <div className="xg-module-metrics">
                {inv.metrics.map(m => (
                  <span key={m} className="xg-chip">{m}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}