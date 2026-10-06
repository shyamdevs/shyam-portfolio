import { useRef } from 'react'
import { motion, useScroll } from 'framer-motion'
import { FiArrowUpRight, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import Magnetic from '../ui/Magnetic.jsx'
import MaskLine from '../ui/MaskLine.jsx'
import HeroStats from '../home/HeroStats.jsx'
import HeroPortrait from '../home/HeroPortrait.jsx'
import { useMotionPrefs } from '../../hooks/useMotionPrefs.js'
import { useParallax } from '../../hooks/useParallax.js'
import { social } from '../../data/content.js'

const socialIcons = { github: FiGithub, linkedin: FiLinkedin, mail: FiMail }

export default function Hero() {
  const ref = useRef(null)
  const { depth } = useMotionPrefs()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  // layered depth: far layers drift most slowly, copy lags slightly behind the page
  const blobA = useParallax(scrollYProgress, 160, depth)
  const blobB = useParallax(scrollYProgress, -90, depth)
  const copyY = useParallax(scrollYProgress, 50, depth)

  return (
    <section ref={ref} id="home" className="relative overflow-hidden pb-24 pt-36 md:pb-36 md:pt-48">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <motion.div style={{ y: blobA }} className="absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full bg-olive/10 blur-[120px]" />
        <motion.div style={{ y: blobB }} className="absolute -left-40 top-1/3 h-[440px] w-[440px] rounded-full bg-olive/[0.07] blur-[110px]" />
        <div className="absolute inset-0 bg-grain" />
      </div>

      <div className="container-luxe">
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
          <motion.div style={{ y: copyY }}>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="eyebrow mb-6"
            >
              Full Stack MERN Developer — Jaipur, India
            </motion.p>

            <h1 className="text-[15vw] leading-[0.94] tracking-tightest text-ink sm:text-7xl md:text-8xl lg:text-[6.4rem]">
              <MaskLine delay={0.1}>Shyam</MaskLine>
              <MaskLine delay={0.22} className="italic text-olive">Sharma</MaskLine>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="mt-8 max-w-md text-lg leading-relaxed text-ink-faint"
            >
              I design and build scalable, considered web applications with the MERN stack — where clean engineering
              meets a quiet sense of craft.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Magnetic>
                <a href="#projects" data-cursor-hover className="btn-primary">
                  View My Work <FiArrowUpRight />
                </a>
              </Magnetic>
              <Magnetic>
                <a href="#contact" data-cursor-hover className="btn-secondary">
                  Contact Me
                </a>
              </Magnetic>
            </motion.div>

            <HeroStats />
          </motion.div>

          <div className="relative flex justify-center lg:justify-end">
            <HeroPortrait scrollYProgress={scrollYProgress} />

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              aria-label="Social links"
              className="absolute -right-2 top-1/2 hidden -translate-y-1/2 flex-col gap-4 md:flex lg:-right-14"
            >
              {social.map(({ name, url, icon }) => {
                const Icon = socialIcons[icon]
                return (
                  <li key={name}>
                    <a
                      href={url}
                      target={url.startsWith('mailto:') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      aria-label={name}
                      data-cursor-hover
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-olive hover:text-olive"
                    >
                      <Icon size={16} aria-hidden="true" />
                    </a>
                  </li>
                )
              })}
            </motion.ul>
          </div>
        </div>
      </div>

      <a
        href="#projects"
        data-cursor-hover
        aria-label="Scroll to projects"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-ink-faint sm:flex"
      >
        <span className="font-mono text-[11px] uppercase tracking-widest2">Scroll</span>
        <span aria-hidden="true" className="block h-8 w-px animate-float-slow bg-gradient-to-b from-ink-faint to-transparent" />
      </a>
    </section>
  )
}
