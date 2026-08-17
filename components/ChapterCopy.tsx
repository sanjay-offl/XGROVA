'use client'

import type { Chapter } from '@/lib/chapters'

interface ChapterCopyProps {
  chapter: Chapter
  /** renders the outgoing overlay during a chapter cross-fade */
  leaving?: boolean
}

/** Editorial copy for chapters 02–05 — left column, keyed remount for the
 *  cross-fade (entering copy fades in, leaving copy fades out). */
export default function ChapterCopy({ chapter, leaving }: ChapterCopyProps) {
  return (
    <div
      className={`xg-col-overlay${leaving ? ' xg-chapter-leave' : ' xg-chapter-anim'}`}
      style={{ maxWidth: 500 }}
      aria-hidden={leaving}
    >
      <div style={{ width: 56, height: 1, background: 'var(--xg-green)', marginBottom: 24 }} />
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', color: 'var(--xg-green)', textTransform: 'uppercase', marginBottom: 20 }}>
        {chapter.num} · {chapter.label}
      </p>
      <h2
        style={{
          fontSize    : 'clamp(1.9rem, 3.2vw, 2.9rem)',
          fontWeight  : 700,
          letterSpacing: '-0.03em',
          lineHeight  : 1.05,
          color       : '#fff',
          marginBottom: 20,
          whiteSpace  : 'pre-line',
        }}
      >
        {chapter.title}
      </h2>
      <p style={{ fontSize: 15.5, lineHeight: 1.75, color: 'rgba(255,255,255,0.6)' }}>
        {chapter.body}
      </p>
    </div>
  )
}