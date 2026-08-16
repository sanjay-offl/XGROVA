'use client'

import { useState } from 'react'
import { sound } from '@/lib/sound'

export default function GetInvolvedSection() {
  const [role, setRole] = useState<'school' | 'enterprise' | 'volunteer'>('school')
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: '', org: '', email: '', count: '25' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sound.playSuccessChime()
    setSubmitted(true)
  }

  return (
    <section
      id="get-involved"
      className="bg-dots section-pad"
      style={{ borderTop: '1px solid rgba(57, 211, 83, 0.2)' }}
    >
      <div className="container">
        <div
          className="glass-card"
          style={{
            maxWidth: 880,
            margin: '0 auto',
            padding: 'clamp(36px, 5vw, 64px) clamp(24px, 4vw, 56px)',
            background: 'rgba(11, 11, 11, 0.92)',
            border: '1px solid rgba(57, 211, 83, 0.38)',
            boxShadow: '0 24px 80px rgba(0,0,0,0.85), 0 0 50px rgba(57,211,83,0.15)',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <p className="label-copper" style={{ marginBottom: 12 }}>JOIN THE CIRCULAR MOVEMENT</p>
            <h2 className="heading-xl" style={{ marginBottom: 16 }}>
              JOIN THE PILOT.<br />DONATE HARDWARE.
            </h2>
            <p className="body-text" style={{ maxWidth: 540, margin: '0 auto', fontSize: '0.95rem' }}>
              Whether you are an educational institution in need of laptops or an enterprise ready to decommission corporate hardware, join the EcoReboot initiative.
            </p>
          </div>

          {/* Role Pill Switcher */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 8,
              marginBottom: 32,
              flexWrap: 'wrap',
            }}
          >
            {[
              { key: 'school', label: 'School / Non-Profit Request' },
              { key: 'enterprise', label: 'Corporate Hardware Donation' },
              { key: 'volunteer', label: 'Open-Source Developer' },
            ].map(tab => {
              const isSelected = role === tab.key
              return (
                <button
                  key={tab.key}
                  onClick={() => {
                    sound.playSelect()
                    setRole(tab.key as typeof role)
                  }}
                  onMouseEnter={() => sound.playHoverHum()}
                  style={{
                    background: isSelected ? 'rgba(57, 211, 83, 0.22)' : 'rgba(255, 255, 255, 0.04)',
                    border: `1px solid ${isSelected ? 'rgba(57, 211, 83, 0.5)' : 'rgba(255, 255, 255, 0.1)'}`,
                    color: isSelected ? '#FFFFFF' : 'rgba(255, 255, 255, 0.65)',
                    padding: '8px 18px',
                    borderRadius: 9999,
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.82rem',
                    fontWeight: isSelected ? 600 : 400,
                    cursor: 'pointer',
                    transition: 'all 200ms ease',
                  }}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>

          {submitted ? (
            <div
              style={{
                textAlign: 'center',
                padding: '40px 20px',
                background: 'rgba(57, 211, 83, 0.1)',
                border: '1px solid rgba(57, 211, 83, 0.3)',
                borderRadius: 16,
              }}
            >
              <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: 12 }}>✦</span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: '#7FA872', marginBottom: 8 }}>
                APPLICATION RECEIVED
              </h3>
              <p className="body-text" style={{ maxWidth: 440, margin: '0 auto 20px', fontSize: '0.9rem' }}>
                Thank you for powering the circular reboot. Our deployment coordinator will contact you within 24 hours with allocation details.
              </p>
              <button
                className="btn-outline"
                onClick={() => setSubmitted(false)}
                style={{ fontSize: '0.8rem', padding: '8px 20px' }}
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
                <div>
                  <label className="label" style={{ display: 'block', marginBottom: 6 }}>Full Name / Lead</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Priya Sharma"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: 8,
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      color: '#fff',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9rem',
                      outline: 'none',
                    }}
                  />
                </div>
                <div>
                  <label className="label" style={{ display: 'block', marginBottom: 6 }}>Institution / Company</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Riverdale Community High"
                    value={formData.org}
                    onChange={e => setFormData({ ...formData, org: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: 8,
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      color: '#fff',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9rem',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
                <div>
                  <label className="label" style={{ display: 'block', marginBottom: 6 }}>Contact Email</label>
                  <input
                    type="email"
                    required
                    placeholder="name@organization.org"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: 8,
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      color: '#fff',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9rem',
                      outline: 'none',
                    }}
                  />
                </div>
                <div>
                  <label className="label" style={{ display: 'block', marginBottom: 6 }}>
                    {role === 'enterprise' ? 'Approx. Units to Decommission' : 'Units Needed in Cohort'}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="1000"
                    value={formData.count}
                    onChange={e => setFormData({ ...formData, count: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: 8,
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      color: '#fff',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9rem',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '16px',
                  fontSize: '0.95rem',
                  marginTop: 10,
                }}
                onMouseEnter={() => sound.playHoverHum()}
              >
                Submit Application for Cohort 2025 →
              </button>

              <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 12 }}>
                <span className="label" style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.45)' }}>
                  ✓ 100% Tax-Deductible CSR Partner
                </span>
                <span className="label" style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.45)' }}>
                  ✓ Zero Software Licensing Overhead
                </span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
