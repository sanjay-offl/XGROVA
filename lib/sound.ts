'use client'

/**
 * EcoReboot Web Audio Synthesizer
 * Zero external audio assets — generates warm, tactile acoustic feedback
 */
class SoundEngine {
  private ctx: AudioContext | null = null
  private enabled: boolean = false

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ecoreboot_sound_enabled')
      this.enabled = saved === 'true'
    }
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  public toggle(): boolean {
    this.enabled = !this.enabled
    if (typeof window !== 'undefined') {
      localStorage.setItem('ecoreboot_sound_enabled', String(this.enabled))
    }
    if (this.enabled) {
      this.initContext()
      this.playSelect()
    }
    return this.enabled
  }

  public isEnabled(): boolean {
    return this.enabled
  }

  /**
   * Subtle haptic tick for frame scrub and milestone passage
   */
  public playHapticTick(freq = 240, gainVal = 0.02) {
    if (!this.enabled) return
    this.initContext()
    if (!this.ctx) return

    try {
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.03)

      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.03)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start()
      osc.stop(this.ctx.currentTime + 0.03)
    } catch {
      // AudioContext fallback
    }
  }

  /**
   * Tactile scissor keyclick simulation
   */
  public playKeyClick() {
    if (!this.enabled) return
    this.initContext()
    if (!this.ctx) return

    try {
      const now = this.ctx.currentTime

      // Fast acoustic transient
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(1400, now)
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.025)

      gain.gain.setValueAtTime(0.04, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      osc.stop(now + 0.025)
    } catch {}
  }

  /**
   * Warm harmonic hover resonance
   */
  public playHoverHum() {
    if (!this.enabled) return
    this.initContext()
    if (!this.ctx) return

    try {
      const now = this.ctx.currentTime
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(380, now)
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.08)

      gain.gain.setValueAtTime(0.015, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      osc.stop(now + 0.08)
    } catch {}
  }

  /**
   * High-tech select tone
   */
  public playSelect() {
    if (!this.enabled) return
    this.initContext()
    if (!this.ctx) return

    try {
      const now = this.ctx.currentTime
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(520, now)
      osc.frequency.setValueAtTime(780, now + 0.04)

      gain.gain.setValueAtTime(0.03, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      osc.stop(now + 0.09)
    } catch {}
  }

  /**
   * Warm major chord chime for order / milestone confirmation
   */
  public playSuccessChime() {
    if (!this.enabled) return
    this.initContext()
    if (!this.ctx) return

    try {
      const notes = [440, 554.37, 659.25, 880] // A Major
      const now = this.ctx.currentTime

      notes.forEach((freq, i) => {
        if (!this.ctx) return
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()

        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, now + i * 0.05)

        gain.gain.setValueAtTime(0.025, now + i * 0.05)
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.05 + 0.35)

        osc.connect(gain)
        gain.connect(this.ctx.destination)

        osc.start(now + i * 0.05)
        osc.stop(now + i * 0.05 + 0.35)
      })
    } catch {}
  }
}

export const sound = new SoundEngine()
