import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { FiArrowUpRight, FiGithub } from 'react-icons/fi'
import Reveal from './Reveal.jsx'

export default function ProjectCard({ project, delay = 0 }) {
  const ref = useRef(null)
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)

  const rotateX = useSpring(useTransform(y, [0, 1], [7, -7]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(x, [0, 1], [-7, 7]), { stiffness: 200, damping: 20 })
  const glowX = useTransform(x, (v) => `${v * 100}%`)
  const glowY = useTransform(y, (v) => `${v * 100}%`)

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width)
    y.set((e.clientY - rect.top) / rect.height)
  }
  const handleLeave = () => {
    x.set(0.5)
    y.set(0.5)
  }

  return (
    <Reveal delay={delay}>
      <motion.article
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, transformPerspective: 1000 }}
        className="group relative rounded-[28px] bg-white/60 border border-line overflow-hidden shadow-card hover:shadow-cardHover transition-shadow duration-500"
      >
        {/* radial glow that follows the cursor */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
          style={{
            background: `radial-gradient(360px circle at ${glowX} ${glowY}, rgba(85,107,79,0.14), transparent 70%)`,
          }}
        />

        <div className="relative overflow-hidden aspect-[16/11]">
          <img
            src={project.image}
            alt={`${project.title} preview`}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent" />
          <span className="absolute top-5 left-5 font-display italic text-2xl text-cream/90">
            {project.index}
          </span>
        </div>

        <div className="relative p-7 md:p-8">
          <p className="eyebrow mb-2">{project.category}</p>
          <h3 className="text-2xl md:text-[26px] text-ink mb-3">{project.title}</h3>
          <p className="text-ink-faint text-[15px] leading-relaxed mb-6">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-7">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="text-xs font-mono px-3 py-1.5 rounded-full bg-olive-50 text-olive-dark border border-olive/15"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-5 hairline pt-5">
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              data-cursor-hover
              className="inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-olive transition-colors"
            >
              Live Demo <FiArrowUpRight />
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              data-cursor-hover
              className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-faint hover:text-olive transition-colors"
            >
              <FiGithub /> Source
            </a>
          </div>
        </div>
      </motion.article>
    </Reveal>
  )
}
