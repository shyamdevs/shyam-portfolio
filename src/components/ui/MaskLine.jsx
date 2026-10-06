import { motion } from 'framer-motion'
import { useMotionPrefs } from '../../hooks/useMotionPrefs.js'

// Headline line that rises out of a clipping mask. Padding/negative margin keep
// descenders and italic overhang from being cropped by the mask.
export default function MaskLine({ children, delay = 0, className = '' }) {
  const { reduced } = useMotionPrefs()
  return (
    <span className="block overflow-hidden pb-[0.14em] -mb-[0.14em] pr-[0.1em] -mr-[0.1em]">
      <motion.span
        className={`block ${className}`}
        initial={reduced ? false : { y: '110%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.95, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
    </span>
  )
}
