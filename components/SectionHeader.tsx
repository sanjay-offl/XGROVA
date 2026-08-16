'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface SectionHeaderProps {
  num: string
  tag: string
  title: ReactNode
  body?: string
}

export default function SectionHeader({ num, tag, title, body }: SectionHeaderProps) {
  return (
    <motion.header
      className="xg-section-head"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="xg-eyebrow">
        <span className="xg-eyebrow-num">{num}</span>
        {tag}
      </p>
      <h2 className="xg-section-title">{title}</h2>
      {body && <p className="xg-section-body">{body}</p>}
    </motion.header>
  )
}