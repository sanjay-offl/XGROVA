'use client'

import { useState } from 'react'
import { sound } from '@/lib/sound'

const SPEC_CATEGORIES = [
  {
    id: 'processor',
    label: 'Silicon & Compute',
    items: [
      { name: 'Architecture', val: 'Reclaimed & Stress-Tested Quad-Core (Intel i5/i7 or AMD Ryzen)' },
      { name: 'Thermal Compound', val: 'Phase-Change Industrial Interface Compound' },
      { name: 'Diagnostics', val: '14-Point Hardware Trace & VRM Stability Scan' },
      { name: 'Active Benchmark', val: 'Certified 100% Baseline Performance vs Factory New' },
    ],
  },
  {
    id: 'chassis',
    label: 'Chassis & Eco-Materials',
    items: [
      { name: 'Polymer Shell', val: '85% Post-Consumer Recycled Polymer + Bio-PLA' },
      { name: 'Fasteners', val: 'Universal M2 Machine Fasteners (Zero Glues/Adhesives)' },
      { name: 'Weight', val: '1.28 kg (2.82 lbs)' },
      { name: 'Repairability Score', val: '10 / 10 (Full Field Serviceability)' },
    ],
  },
  {
    id: 'os',
    label: 'Operating System & Software',
    items: [
      { name: 'Distribution', val: 'Custom Lightweight EcoOS (Linux Kernel 6.8 LTS)' },
      { name: 'Idle Memory Footprint', val: '< 480 MB RAM' },
      { name: 'Preloaded Software', val: 'LibreOffice, Scratch 3.0, Kiwix Offline Wikipedia, VS Code, Python 3' },
      { name: 'Boot Velocity', val: '8.4 Seconds Cold Boot' },
    ],
  },
  {
    id: 'battery',
    label: 'Battery & Power',
    items: [
      { name: 'Cell Condition', val: '100% Re-Balanced & Capacity Certified (Min 85% SOH)' },
      { name: 'Offline Runtime', val: '8+ Hours Continuous Educational Workflow' },
      { name: 'Charging Standard', val: 'Universal USB-C Power Delivery (65W Fast Charge)' },
      { name: 'Smart BMS', val: 'Overvoltage, Undercurrent & Thermal Thermal Throttling Guard' },
    ],
  },
]

export default function SpecsSection() {
  const [activeTab, setActiveTab] = useState('processor')

  const currentCategory = SPEC_CATEGORIES.find(c => c.id === activeTab) || SPEC_CATEGORIES[0]

  return (
    <section
      id="specs"
      className="bg-dots section-pad"
      style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}
    >
      <div className="container">
        <div style={{ maxWidth: 760, marginBottom: 48 }}>
          <p className="label-copper" style={{ marginBottom: 12 }}>
            TECHNICAL ARCHITECTURE SPECIFICATIONS
          </p>
          <h2 className="heading-xl" style={{ marginBottom: 18 }}>
            HARDWARE<br />INTELLIGENCE
          </h2>
          <p className="body-text">
            Transparent, open hardware engineering built for longevity, repairability, and extreme energy efficiency.
          </p>
        </div>

        {/* Tab Switcher */}
        <div
          style={{
            display: 'flex',
            gap: 8,
            overflowX: 'auto',
            paddingBottom: 8,
            marginBottom: 28,
          }}
        >
          {SPEC_CATEGORIES.map(cat => {
            const isSelected = activeTab === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => {
                  sound.playSelect()
                  setActiveTab(cat.id)
                }}
                onMouseEnter={() => sound.playHoverHum()}
                style={{
                  background: isSelected ? 'rgba(57, 211, 83, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                  border: `1px solid ${isSelected ? 'rgba(57, 211, 83, 0.45)' : 'rgba(255, 255, 255, 0.08)'}`,
                  color: isSelected ? '#FFFFFF' : 'rgba(255, 255, 255, 0.6)',
                  padding: '10px 20px',
                  borderRadius: 9999,
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  fontWeight: isSelected ? 600 : 400,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 200ms ease',
                }}
              >
                {cat.label}
              </button>
            )
          })}
        </div>

        {/* Specs Table */}
        <div
          className="glass-card"
          style={{
            padding: '36px 32px',
            background: 'rgba(11, 11, 11, 0.85)',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
            {currentCategory.items.map((item, idx) => (
              <div
                key={item.name}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: 12,
                  padding: '14px 0',
                  borderBottom: idx < currentCategory.items.length - 1 ? '1px solid rgba(255, 255, 255, 0.06)' : 'none',
                  alignItems: 'baseline',
                }}
              >
                <span className="label" style={{ color: '#39D353', fontSize: '0.75rem' }}>
                  {item.name}
                </span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: '#FFFFFF' }}>
                  {item.val}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
