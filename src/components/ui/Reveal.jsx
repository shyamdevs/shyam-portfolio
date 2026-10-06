import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useMotionPrefs } from '../../hooks/useMotionPrefs.js'

// Fade-up scroll reveal. `delay` in seconds, `y` starting offset in px.
export default function Reveal({ children, delay = 0, y = 28, className = '', once = true }) {
  const { ref, inView } = useInView({ triggerOnce: once, threshold: 0.1, rootMargin: '0px 0px -6% 0px' })
  const { reduced } = useMotionPrefs()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
