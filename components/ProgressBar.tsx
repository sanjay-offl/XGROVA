'use client'

import { useScrollState } from '@/lib/scrollStore'
import { CHAPTERS } from '@/lib/chapters'

export default function ProgressBar() {
  const { progress, chapter } = useScrollState()
  const pct = Math.round(progress * 100)
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