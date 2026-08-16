'use client'

import { useSyncExternalStore } from 'react'

export interface ScrollState {
  /** 0..1 progress through the pinned canvas sequence */
  progress: number
  /** 1..151 current frame number */
  frame: number
  /** 0..5 active chapter index */
  chapter: number
  /** GSAP pin engaged */
  ready: boolean
  /** the pinned cinematic section is currently in view */
  storyActive: boolean
}

let state: ScrollState = {
  progress: 0,
  frame: 1,
  chapter: 0,
  ready: false,
  storyActive: false,
}

const listeners = new Set<() => void>()

export const scrollStore = {
  get: () => state,
  set: (partial: Partial<ScrollState>) => {
    state = { ...state, ...partial }
    listeners.forEach(l => l())
  },
  subscribe: (listener: () => void) => {
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  },
}

export function useScrollState(): ScrollState {
  return useSyncExternalStore(scrollStore.subscribe, scrollStore.get, () => state)
}