'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { sound } from '@/lib/sound'

const PIPELINE_STEPS = [
  {
    step: '01',
    title: 'Decommission Intake & Silicon Audit',
    desc: 'Harvested from enterprise server rooms and university fleets. Motherboards undergo a rigorous 14-point hardware diagnostics protocol testing memory trace integrity, power delivery stages, and VRMs.',
    metric: '100% Bench Certified',
    color: '#39D353',
    tags: ['VRM Diagnostics', 'PCIe Lane Scan', 'Zero Trace Corrosion'],
  },
  {
    step: '02',
    title: 'Phase-Change Repaste & Thermal Tuning',
    desc: 'Original thermal paste is stripped and replaced with industrial phase-change thermal compound. Fan impellers are ultrasonically cleaned and re-lubricated to restore acoustic zero-noise profiles.',
    metric: '< 18 dBA Noise Floor',
    color: '#4ADE55',
    tags: ['Phase-Change Paste', 'Ultrasonic Clean', 'Dynamic PWM Fan Curve'],
  },
  {
    step: '03',
    title: 'Battery Cell Balancing & Re-Certification',
    desc: 'Lithium-ion cells are capacity-tested. Sub-80% health cells are responsibly recycled; healthy cells are re-balanced with modern smart BMS boards providing over 8+ hours of continuous offline productivity.',
    metric: '8+ Hours Verified Runtime',
    color: '#7FA872',
    tags: ['Active Cell Balancing', 'BMS Overcurrent Guard', 'USB-C PD 65W'],
  },
  {
    step: '04',
    title: 'Post-Consumer Modular Shell Assembly',
    desc: 'Enclosures are injection-molded or precision 3D-printed using 85% post-consumer recycled polymer and bio-PLA. Standard M2 fasteners guarantee total field repairability with a single screwdriver.',
    metric: '100% Right-to-Repair',
    color: '#8DB87F',
    tags: ['Standard M2 Fasteners', 'Drop-Resistant Bumper', 'Zero Glue/Adhesive'],
  },
  {
    step: '05',
    title: 'Custom Lightweight EcoOS Deployment',
    desc: 'Each unit is flashed with our custom-tuned lightweight Linux kernel. Pre-loaded with offline STEM education tools, Python, LibreOffice, and typing tutors, operating at under 480MB idle RAM.',
    metric: '< 480 MB Idle RAM',
    color: '#39D353',
    tags: ['8.4s Fast Boot', 'Offline STEM Suite', 'Zero Telemetry Bloat'],
  },
]

export default function BlueprintSection() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <section
      id="blueprint"
      className="bg-dots section-pad"
      style={{ borderTop: '1px solid rgba(57, 211, 83, 0.18)' }}
    >
      <div className="container">
        <div style={{ maxWidth: 760, marginBottom: 56 }}>
          <p className="label-copper" style={{ marginBottom: 12 }}>
            CIRCULAR ENGINEERING BLUEPRINT
          </p>
          <h2 className="heading-xl" style={{ marginBottom: 18 }}>
            FROM E-WASTE<br />TO EMPOWERMENT
          </h2>
          <p className="body-text">
            Every XGROVA laptop follows an open, standardized 5-stage transformation pipeline designed to turn decommissioned enterprise hardware into resilient, high-efficiency educational workstations.
          </p>
        </div>

        {/* Interactive Step Navigator & Detail Card */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 24,
            alignItems: 'start',
          }}
        >
          {/* Step Selector List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {PIPELINE_STEPS.map((item, idx) => {
              const isSelected = activeStep === idx
              return (
                <button
                  key={item.step}
                  onClick={() => {
                    sound.playSelect()
                    setActiveStep(idx)
                  }}
                  onMouseEnter={() => sound.playHoverHum()}
                  style={{
                    background: isSelected ? 'rgba(57, 211, 83, 0.14)' : 'rgba(11, 11, 11, 0.65)',
                    border: `1px solid ${isSelected ? 'rgba(57, 211, 83, 0.45)' : 'rgba(255, 255, 255, 0.08)'}`,
                    borderRadius: 12,
                    padding: '16px 20px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 200ms ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        color: isSelected ? '#39D353' : 'rgba(255, 255, 255, 0.4)',
                      }}
                    >
                      {item.step}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.92rem',
                        fontWeight: isSelected ? 600 : 500,
                        color: isSelected ? '#FFFFFF' : 'rgba(255, 255, 255, 0.75)',
                      }}
                    >
                      {item.title}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: item.color,
                      opacity: isSelected ? 1 : 0.6,
                    }}
                  >
                    →
                  </span>
                </button>
              )
            })}
          </div>

          {/* Active Step Deep-Dive Showcase */}
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="glass-card"
            style={{
              padding: '36px 32px',
              minHeight: 380,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              background: 'rgba(11, 11, 11, 0.85)',
              border: '1px solid rgba(57, 211, 83, 0.3)',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <span className="label-copper">
                  STAGE {PIPELINE_STEPS[activeStep].step} OF 05
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: PIPELINE_STEPS[activeStep].color,
                    background: 'rgba(255,255,255,0.05)',
                    padding: '4px 10px',
                    borderRadius: 6,
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  {PIPELINE_STEPS[activeStep].metric}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.6rem, 2.6vw, 2.2rem)',
                  lineHeight: 1.05,
                  color: '#FFFFFF',
                  marginBottom: 16,
                }}
              >
                {PIPELINE_STEPS[activeStep].title}
              </h3>

              <p className="body-text" style={{ fontSize: '0.95rem', marginBottom: 24 }}>
                {PIPELINE_STEPS[activeStep].desc}
              </p>
            </div>

            <div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: 18 }}>
                {PIPELINE_STEPS[activeStep].tags.map(tag => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      color: 'rgba(255, 255, 255, 0.7)',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      padding: '4px 10px',
                      borderRadius: 9999,
                    }}
                  >
                    ✓ {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
