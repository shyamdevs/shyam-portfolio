import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import ResponsiveImage from '../ui/ResponsiveImage.jsx'
import { useMotionPrefs } from '../../hooks/useMotionPrefs.js'
import { useParallax } from '../../hooks/useParallax.js'
import { usePortfolio } from '../../lib/portfolioStore.js'

const badges = [
  { label: 'React', style: 'top-[6%] -left-2 md:-left-8', speed: -60 },
  { label: 'Node.js', style: 'top-[26%] -right-4 md:-right-10', speed: -110 },
  { label: 'MongoDB', style: 'bottom-[10%] -left-6 md:-left-12', speed: -35 },
]
const spring = { stiffness: 140, damping: 20, mass: 0.7 }

export default function HeroPortrait({ scrollYProgress }) {
  const ref = useRef(null)
  const { finePointer, reduced, depth } = useMotionPrefs()
  const { data, status } = usePortfolio()
  const tilt = finePointer && !reduced

  // Wait for the real URL rather than flashing the static fallback photo first.
  // (A sessionStorage snapshot makes repeat loads instant.)
  const src = data ? data.settings?.heroImage || '/profile.jpeg' : status === 'error' ? '/profile.jpeg' : ''

  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(py, [0, 1], [5, -5]), spring)
  const rotateY = useSpring(useTransform(px, [0, 1], [-6, 6]), spring)
  const ringX = useSpring(useTransform(px, [0, 1], [10, -10]), spring)
  const ringY = useSpring(useTransform(py, [0, 1], [10, -10]), spring)
  const y = useParallax(scrollYProgress, -50, depth)

  const onMove = (e) => {
    if (!tilt || e.pointerType !== 'mouse') return
    const r = ref.current.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
  }
  const onLeave = () => { px.set(0.5); py.set(0.5) }

  return (
    <motion.div style={{ y }} className="relative [perspective:1000px]">
      <motion.div
        ref={ref}
        initial={reduced ? false : { opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={tilt ? { rotateX, rotateY } : undefined}
        className="relative h-64 w-64 sm:h-80 sm:w-80 md:h-[26rem] md:w-[26rem]"
      >
        {/* back layer: offset ring that drifts opposite to the pointer */}
        <motion.div
          aria-hidden="true"
          style={tilt ? { x: ringX, y: ringY } : undefined}
          className="absolute -inset-4 rounded-full border border-olive/25 md:-inset-6"
        />
        <div aria-hidden="true" className="absolute -inset-6 rounded-full bg-olive/15 blur-2xl" />
        <div className="relative h-full w-full overflow-hidden rounded-full border border-line bg-olive-50 shadow-glass">
          {src && (
            <ResponsiveImage
              src={src}
              fallback="/profile.jpeg"
              alt="Portrait of Shyam Sharma"
              ratio={1}
              widths={[320, 520, 832]}
              sizes="(min-width:768px) 26rem, (min-width:640px) 20rem, 16rem"
              priority
            />
          )}
        </div>

        {badges.map((b) => (
          <FloatingBadge key={b.label} {...b} scrollYProgress={scrollYProgress} depth={depth} />
        ))}
      </motion.div>
    </motion.div>
  )
}

// outer element = scroll parallax (JS MotionValue), inner = idle float (CSS keyframes)
function FloatingBadge({ label, style, speed, scrollYProgress, depth }) {
  const y = useParallax(scrollYProgress, speed, depth)
  return (
    <motion.div style={{ y }} className={`absolute ${style}`}>
      <div className="animate-float-slow rounded-full border border-line bg-cream/90 px-4 py-2 font-mono text-xs text-ink-soft shadow-glass">
        {label}
      </div>
    </motion.div>
  )
}
