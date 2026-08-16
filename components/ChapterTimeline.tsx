'use client'

import { useScrollState } from '@/lib/scrollStore'
import { CHAPTERS } from '@/lib/chapters'
import { jumpToChapter } from '@/lib/navigate'
import { sound } from '@/lib/sound'

export default function ChapterTimeline() {
  const { chapter, storyActive } = useScrollState()

  return (
    <nav className={`xg-timeline${storyActive ? '' : ' xg-hud-hidden'}`} aria-label="Chapters">
      {CHAPTERS.map((c, i) => (
        <div key={c.num} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          {i > 0 && <div className={`xg-timeline-connector${i <= chapter ? ' on' : ''}`} />}
          <button
            className={`xg-timeline-item${chapter === i ? ' active' : ''}`}
            onClick={() => {
              sound.playSelect()
              void jumpToChapter(i)
            }}
          >
            <span className="xg-timeline-meta">
              <span className="xg-timeline-num">{c.num}</span>
              <span className="xg-timeline-title">{c.label}</span>
            </span>
            <span className={`xg-timeline-node${chapter >= i ? ' on' : ''}`} />
          </button>
        </div>
      ))}
    </nav>
  )
}