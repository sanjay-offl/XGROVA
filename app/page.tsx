'use client'

import { useEffect } from 'react'
import Navbar from '@/components/Navbar'
import HudRail from '@/components/HudRail'
import ChapterTimeline from '@/components/ChapterTimeline'
import ProgressBar from '@/components/ProgressBar'
import CinematicCanvas from '@/components/ScrollytellingCanvas'
import ImpactSection from '@/components/ImpactSection'
import TargetMarketSection from '@/components/TargetMarketSection'
import InnovationSection from '@/components/InnovationSection'
import RoadmapSection from '@/components/RoadmapSection'
import FinalRevealSection from '@/components/FinalRevealSection'
import Footer from '@/components/Footer'
import { initLenis } from '@/lib/lenis'

export default function Home() {
  useEffect(() => {
    initLenis()
  }, [])

  return (
    <main style={{ background: 'var(--xg-bg)' }}>
      {/* ─── Persistent engineering frame ─── */}
      <HudRail />
      <Navbar />
      <ChapterTimeline />
      <ProgressBar />

      {/* ─── Cinematic canvas — 151 frames, GSAP pin, scrub ─── */}
      <CinematicCanvas />

      {/* ─── Editorial chapters below the scroll ─── */}
      <ImpactSection />
      <TargetMarketSection />
      <InnovationSection />
      <RoadmapSection />
      <FinalRevealSection />
      <Footer />
    </main>
  )
}