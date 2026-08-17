'use client'

interface SectionEyebrowProps {
  num: string
  label: string
  center?: boolean
}

/** Technical section eyebrow — mono, green rule, numbered. */
export default function SectionEyebrow({ num, label, center }: SectionEyebrowProps) {
  return (
    <p className={`xg-eyebrow${center ? ' xg-eyebrow-center' : ''}`}>
      <span className="xg-eyebrow-num">{num}</span>
      {label}
    </p>
  )
}