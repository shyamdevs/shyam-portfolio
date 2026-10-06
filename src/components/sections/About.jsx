import { useRef } from 'react'
import { motion, useScroll } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'
import Reveal from '../ui/Reveal.jsx'
import Magnetic from '../ui/Magnetic.jsx'
import ResponsiveImage from '../ui/ResponsiveImage.jsx'
import { useMotionPrefs } from '../../hooks/useMotionPrefs.js'
import { useParallax } from '../../hooks/useParallax.js'
import { usePortfolio } from '../../lib/portfolioStore.js'

const chips = ['Clean Architecture', 'REST APIs', 'JWT Auth', 'Responsive UI', 'CRUD Systems', 'Git Workflow']

export default function About() {
  const ref = useRef(null)
  const { depth } = useMotionPrefs()
  const { data, status } = usePortfolio()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  // photo drifts slower than the page, the quote block faster: two layers, one scene
  const photoY = useParallax(scrollYProgress, 40, depth)
  const quoteY = useParallax(scrollYProgress, -50, depth)

  // no flash of the static fallback: wait for the real image URL (or a failed request)
  const src = data ? data.settings?.aboutImage || '/about.svg' : status === 'error' ? '/about.svg' : ''

  return (
    <section ref={ref} id="about" className="bg-cream-soft py-24 md:py-36">
      <div className="container-luxe grid items-center gap-16 lg:grid-cols-2">
        <Reveal>
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="aspect-[4/5] overflow-hidden rounded-[24px] border border-line bg-olive-50 shadow-glass">
              <motion.div style={{ y: photoY, scale: 1.1 }} className="h-full w-full">
                {src && (
                  <ResponsiveImage
                    src={src}
                    fallback="/about.jpeg"
                    alt="Shyam Sharma at his desk"
                    ratio={4 / 5}
                    widths={[400, 640, 880]}
                    sizes="(min-width:1024px) 40vw, 90vw"
                  />
                )}
              </motion.div>
            </div>
            <motion.figure
              style={{ y: quoteY }}
              className="absolute -bottom-8 right-2 max-w-[200px] rounded-2xl bg-ink p-5 text-cream shadow-glass sm:p-6 md:-right-10 md:max-w-[220px]"
            >
              <blockquote className="font-display text-lg italic leading-snug">“Consistency compounds. Keep building.”</blockquote>
            </motion.figure>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="eyebrow mb-4">About Me</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mb-7 text-4xl leading-[1.05] tracking-tightest text-ink md:text-5xl lg:text-6xl">
              A curious developer who loves to build.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="max-w-xl space-y-5 text-lg leading-relaxed text-ink-faint">
              <p>
                I enjoy turning ideas into real-world applications — currently focused on building scalable,
                full-stack products with clean, efficient code.
              </p>
              <p>
                Based in Jaipur, I work across the MERN stack, from designing REST APIs and database schemas to
                shipping polished, responsive interfaces that people actually enjoy using.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <ul className="mt-9 flex flex-wrap gap-3">
              {chips.map((c) => (
                <li
                  key={c}
                  className="rounded-full border border-line px-4 py-2 font-mono text-xs text-ink-soft transition-colors duration-300 hover:border-olive hover:text-olive"
                >
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.3}>
            <Magnetic className="mt-10 inline-block">
              <a href="#contact" data-cursor-hover className="btn-secondary">
                Read More About Me <FiArrowUpRight />
              </a>
            </Magnetic>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
