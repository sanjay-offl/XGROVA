'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import SectionEyebrow from './SectionEyebrow'

interface SectionHeaderProps {
  num: string
  tag: string
  title: ReactNode
  body?: string
}

const ease = [0.22, 1, 0.36, 1] as const

/** Section header — vertical rhythm: eyebrow → 32px → title → 28px → body → 72px → content.
 *  Staggered reveal: eyebrow 12px → heading 20px → body 16px. */
export default function SectionHeader({ num, tag, title, body }: SectionHeaderProps) {
  return (
    <motion.header
      className="xg-section-head"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.08 } },
      }}
    >
      <motion.div variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}>
        <SectionEyebrow num={num} label={tag} />
      </motion.div>
      <motion.h2
        className="xg-section-title"
        variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}
      >
        {title}
      </motion.h2>
      {body && (
        <motion.p
          className="xg-section-body"
          variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } } }}
        >
          {body}
        </motion.p>
      )}
    </motion.header>
  )
}