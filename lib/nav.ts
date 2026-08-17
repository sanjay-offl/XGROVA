'use client'

/** Single navigation configuration — the only place section names exist.
 *  Consumed by the Navbar (active detection, mobile menu) and the Footer. */
export interface NavItem {
  /** nav link id (key) */
  id: string
  label: string
  /** id of the section this link scrolls to */
  target: string
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'story',      label: 'STORY',      target: 'story' },
  { id: 'technology', label: 'TECHNOLOGY', target: 'technology' },
  { id: 'impact',     label: 'IMPACT',     target: 'impact' },
  { id: 'contact',    label: 'CONTACT',    target: 'contact' },
]