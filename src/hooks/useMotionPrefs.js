import { useSyncExternalStore } from 'react'

// Single source of truth for "how much motion is appropriate on this device".
//  - reduced : the user asked for less motion (prefers-reduced-motion)
//  - finePointer : a real mouse/trackpad exists, so hover tilt/magnetic effects make sense
// Parallax scroll effects scale by `depth` (0 = off, 0.5 = touch/mobile, 1 = desktop).
const queries =
  typeof window === 'undefined'
    ? null
    : {
        reduced: window.matchMedia('(prefers-reduced-motion: reduce)'),
        fine: window.matchMedia('(hover: hover) and (pointer: fine)'),
        small: window.matchMedia('(max-width: 767px)'),
      }

let snapshot = null
const compute = () => {
  const next = queries
    ? {
        reduced: queries.reduced.matches,
        finePointer: queries.fine.matches,
        depth: queries.reduced.matches ? 0 : queries.small.matches || !queries.fine.matches ? 0.5 : 1,
      }
    : { reduced: false, finePointer: false, depth: 0 }
  // keep the same object when nothing changed (required by useSyncExternalStore)
  if (!snapshot || JSON.stringify(snapshot) !== JSON.stringify(next)) snapshot = next
  return snapshot
}

const subscribe = (cb) => {
  if (!queries) return () => {}
  Object.values(queries).forEach((q) => q.addEventListener('change', cb))
  return () => Object.values(queries).forEach((q) => q.removeEventListener('change', cb))
}

export function useMotionPrefs() {
  return useSyncExternalStore(subscribe, compute, compute)
}
