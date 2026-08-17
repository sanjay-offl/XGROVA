'use client'

import { useEffect } from 'react'
import Navbar from '@/components/Navbar'
import ScrollytellingSection from '@/components/ScrollytellingSection'
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
      {/* ─── Global navigation — full width, above the story ─── */}
      <Navbar />

      {/* ─── Cinematic story — pinned section owns canvas, HUD, annotations ─── */}
      <ScrollytellingSection />

      {/* ─── Editorial chapters — own centered 1180px grid ─── */}
      <ImpactSection />
      <TargetMarketSection />
      <InnovationSection />
      <RoadmapSection />
      <FinalRevealSection />
      <Footer />
    </main>
  )
}