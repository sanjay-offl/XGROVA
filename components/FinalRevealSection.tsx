'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { sound } from '@/lib/sound'
import { smoothScrollToElement } from '@/lib/lenis'

export default function FinalRevealSection() {
  const [done, setDone] = useState(false)
  const [email, setEmail] = useState('')

  return (
    <section id="contact" className="section-pad xg-shell" style={{ background: 'var(--xg-bg)' }}>
      <div className="xg-col" style={{ textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="xg-eyebrow" style={{ justifyContent: 'center' }}>
            <span className="xg-eyebrow-num">06</span>
            Final Sequence — Circular Computing
          </p>
          <h2
            style={{
              fontSize   : 'clamp(3rem, 6vw, 5.8rem)',
              fontWeight : 800,
              letterSpacing: '-0.04em',
              lineHeight : 0.98,
              color      : '#fff',
              marginBottom: 40,
            }}
          >
            Give technology
            <br />
            <span style={{ color: '#39D353' }}>another life.</span>
          </h2>
          <p className="xg-section-body" style={{ margin: '0 auto 48px', maxWidth: 480 }}>
            Circular technology for a more accessible future.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 96 }}>
            <button
              className="xg-btn xg-btn-primary"
              onClick={() => {
                sound.playSelect()
                smoothScrollToElement(document.getElementById('contact-form'))
              }}
            >
              Build with XGROVA
            </button>
          </div>
        </motion.div>

        {/* Inquiry form — minimal engineering panel */}
        <motion.div
          id="contact-form"
          className="card"
          style={{ maxWidth: 520, margin: '0 auto', padding: 'clamp(28px, 4vw, 44px)', textAlign: 'left' }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="xg-eyebrow" style={{ marginBottom: 16 }}>
            <span className="xg-eyebrow-num">IN</span>
            Connect with the Initiative
          </p>
          <p className="xg-section-body" style={{ fontSize: 14.5, marginBottom: 28 }}>
            For school pilot deployments, corporate e-waste decommissioning, or partnership inquiries.
          </p>

          {done ? (
            <div
              style={{
                padding: 20,
                border: '1px solid rgba(57,211,83,0.4)',
                background: 'var(--xg-green-soft)',
                borderRadius: 2,
              }}
            >
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#fff', letterSpacing: '0.04em' }}>
                <span style={{ color: '#39D353' }}>✓</span> Inquiry received. Sanjay and the XGROVA team will respond within 24 hours.
              </p>
            </div>
          ) : (
            <form
              onSubmit={e => {
                e.preventDefault()
                sound.playSuccessChime()
                setDone(true)
              }}
              style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
            >
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="xg-input"
              />
              <button
                type="submit"
                className="xg-btn xg-btn-primary"
                style={{ width: '100%' }}
                onMouseEnter={() => sound.playHoverHum()}
              >
                Submit Inquiry →
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}