'use client'

import { sound } from '@/lib/sound'

const FEASIBILITY_STEPS = [
  {
    title: 'EXISTING RESOURCES',
    desc: 'Discarded laptops are already abundantly available through university fleet refreshes, corporate IT decommission cycles, CSR donation channels, and e-waste drives.',
  },
  {
    title: 'SIMPLE EXECUTION',
    desc: 'A systematic 5-stage pipeline: triage diagnostics, component salvage, thermal tuning, custom modular housing assembly, lightweight OS flashing, and institutional delivery.',
  },
  {
    title: 'LOW-COST SCALE',
    desc: 'Modular standardized fasteners, bio-compatible local polymers, and decentralized youth technician training hubs make the model affordable, repeatable, and globally scalable.',
  },
]

export default function FeasibilitySection() {
  return (
    <section id="technology" className="section-editorial" style={{ borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container-editorial">
        <div style={{ maxWidth: 840, marginBottom: 64 }}>
          <p className="text-label-blue" style={{ marginBottom: 14 }}>
            CHAPTER 12 · CIRCULAR FEASIBILITY
          </p>
          <h2 className="text-headline" style={{ marginBottom: 20 }}>
            Built on what<br />already exists.
          </h2>
          <p className="text-body">
            XGROVA eliminates the need for expensive new silicon mining by leveraging the massive surplus of decommissioned hardware already sitting in enterprise server rooms and institutional closets.
          </p>
        </div>

        {/* 3 Columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 32,
          }}
        >
          {FEASIBILITY_STEPS.map((step, idx) => (
            <div
              key={step.title}
              onMouseEnter={() => sound.playHoverHum()}
              style={{
                borderLeft: '1px solid var(--border-subtle)',
                paddingLeft: 28,
                paddingBottom: 16,
                transition: 'border-color 300ms ease',
              }}
            >
              <span className="text-label-blue" style={{ display: 'block', marginBottom: 12 }}>
                0{idx + 1} · INFRASTRUCTURE
              </span>
              <h3
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1.4rem',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  marginBottom: 14,
                  letterSpacing: '-0.02em',
                }}
              >
                {step.title}
              </h3>
              <p className="text-body" style={{ fontSize: '0.94rem' }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
