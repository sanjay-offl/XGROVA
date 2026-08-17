'use client'

import StoryRail from './StoryRail'
import ChapterTimeline from './ChapterTimeline'
import DiscoveryProgress from './DiscoveryProgress'

/** Cinematic HUD — absolutely positioned inside the pinned story section.
 *  Renders nothing below the story: it scrolls away with the section. */
export default function CinematicHUD() {
  return (
    <div className="xg-hud" aria-hidden="true">
      <StoryRail />
      <ChapterTimeline />
      <DiscoveryProgress />
    </div>
  )
}