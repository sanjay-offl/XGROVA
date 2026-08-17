'use client'

import { useScrollState } from '@/lib/scrollStore'
import { CHAPTERS } from '@/lib/chapters'

export default function DiscoveryProgress() {
  const { progress, chapter } = useScrollState()
  const raw = Math.min(100, Math.max(0, progress * 100))
  const pct = raw >= 99.95 ? '100' : raw.toFixed(1)
  const ch = CHAPTERS[chapter]

  return (
    <div className="xg-progress-hud" aria-hidden="true">
      <div className="xg-progress-track">
        <div className="xg-progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <span className="xg-progress-chapter">
        {ch.num} {ch.label}
      </span>
      <span className="xg-progress-status">
        <b>{pct}%</b> DISCOVERY
      </span>
    </div>
  )
}