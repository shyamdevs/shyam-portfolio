import { useRef } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { FiArrowUpRight, FiGithub } from 'react-icons/fi'
import Reveal from './Reveal.jsx'
import ResponsiveImage from './ResponsiveImage.jsx'
import { useMotionPrefs } from '../../hooks/useMotionPrefs.js'

const RATIO = 16 / 11
const spring = { stiffness: 180, damping: 22, mass: 0.6 }

export default function ProjectCard({ project, delay = 0 }) {
  const ref = useRef(null)
  const { finePointer, reduced, depth } = useMotionPrefs()
  const tilt = finePointer && !reduced

  // pointer position inside the card, 0..1 (MotionValues: no re-render per move)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(py, [0, 1], [4, -4]), spring)
  const rotateY = useSpring(useTransform(px, [0, 1], [-4, 4]), spring)

  // the photo moves independently of the card: slow scroll drift + counter-move to the pointer
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const drift = useTransform(scrollYProgress, [0, 1], [-18 * depth, 18 * depth])
  const imgX = useSpring(useTransform(px, [0, 1], [8, -8]), spring)
  const imgPointerY = useSpring(useTransform(py, [0, 1], [6, -6]), spring)
  const imgY = useTransform([drift, imgPointerY], ([d, p]) => d + (tilt ? p : 0))

  const onMove = (e) => {
    if (!tilt || e.pointerType !== 'mouse') return
    const r = ref.current.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
  }
  const onLeave = () => {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <Reveal delay={delay} className="h-full [perspective:1100px]">
      <motion.article
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={tilt ? { rotateX, rotateY } : undefined}
        className="group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-line bg-white/60 shadow-card transition-shadow duration-500 will-change-transform hover:shadow-cardHover"
      >
        <div className="relative aspect-[16/11] overflow-hidden bg-olive-50">
          <motion.div
            style={{ x: tilt ? imgX : 0, y: imgY, scale: 1.14 }}
            className="absolute inset-0 transition-[filter] duration-700 group-hover:brightness-[1.03]"
          >
            <ResponsiveImage
              src={project.image}
              fallback="/projects/placeholder.svg"
              alt={`${project.title} — ${project.category || 'project'} screenshot`}
              ratio={RATIO}
              widths={[480, 720, 960, 1280]}
              sizes="(min-width:1280px) 30vw, (min-width:768px) 46vw, 92vw"
            />
          </motion.div>
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent" />
          <span aria-hidden="true" className="absolute left-5 top-4 font-display text-2xl italic text-cream/90">
            {project.index}
          </span>
        </div>

        <div className="relative flex flex-1 flex-col p-6 sm:p-7 md:p-8">
          {project.category && <p className="eyebrow mb-2">{project.category}</p>}
          <h3 className="mb-3 text-2xl text-ink md:text-[26px]">{project.title}</h3>
          <p className="mb-6 text-[15px] leading-relaxed text-ink-faint">{project.description}</p>

          {project.stack?.length > 0 && (
            <ul className="mb-7 flex flex-wrap gap-2" aria-label="Technologies used">
              {project.stack.map((tech) => (
                <li key={tech} className="rounded-full border border-olive/15 bg-olive-50 px-3 py-1.5 font-mono text-xs text-olive-dark">
                  {tech}
                </li>
              ))}
            </ul>
          )}

          <div className="hairline mt-auto flex items-center gap-5 pt-5">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                aria-label={`${project.title} — live demo (opens in a new tab)`}
                className="inline-flex items-center gap-1.5 py-1 text-sm font-medium text-ink transition-colors hover:text-olive"
              >
                Live Demo <FiArrowUpRight />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                aria-label={`${project.title} — source code on GitHub (opens in a new tab)`}
                className="inline-flex items-center gap-1.5 py-1 text-sm font-medium text-ink-faint transition-colors hover:text-olive"
              >
                <FiGithub /> Source
              </a>
            )}
          </div>
        </div>
      </motion.article>
    </Reveal>
  )
}
