import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useMotionPrefs } from '../../hooks/useMotionPrefs.js'

export default function CursorFollower() {
  const [isHovering, setIsHovering] = useState(false)
  const { finePointer, reduced } = useMotionPrefs()
  const enabled = finePointer && !reduced
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 })

  useEffect(() => {
    if (!enabled) return undefined

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    const over = (e) => {
      setIsHovering(!!e.target.closest('[data-cursor-hover]'))
    }
    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('mouseover', over, { passive: true })
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
    }
  }, [x, y, enabled])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[100] hidden h-[10px] w-[10px] rounded-full mix-blend-difference md:block"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
        backgroundColor: '#F8F6F2',
      }}
      animate={{
        scale: isHovering ? 5.6 : 1, // transform, not width/height: no layout work per hover
        opacity: isHovering ? 0.9 : 0.7,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    />
  )
}
