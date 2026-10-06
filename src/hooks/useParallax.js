import { useTransform } from 'framer-motion'

/**
 * Map a scroll progress MotionValue (0 -> 1) to a pixel offset.
 * `distance` is the offset at progress = 1; `depth` (from useMotionPrefs) scales it,
 * and 0 flattens it completely for reduced-motion users. Pure MotionValue maths:
 * no React re-renders while scrolling.
 */
export function useParallax(progress, distance, depth = 1) {
  return useTransform(progress, [0, 1], [0, distance * depth])
}
