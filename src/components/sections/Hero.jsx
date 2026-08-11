import { motion } from 'framer-motion'
import { FiArrowUpRight, FiGithub, FiLinkedin, FiMail, FiArrowDown } from 'react-icons/fi'
import Magnetic from '../ui/Magnetic.jsx'
import AnimatedCounter from '../ui/AnimatedCounter.jsx'
// import { stats } from '../../data/skills.js'
import { usePortfolioStats } from '../../hooks/usePortfolioStats.js'
import { staticStats } from '../../data/skills.js'

const badges = [
  { label: 'React', style: 'top-[6%] -left-2 md:-left-8' },
  { label: 'Node.js', style: 'top-[38%] -right-4 md:-right-10' },
  { label: 'MongoDB', style: 'bottom-[10%] -left-6 md:-left-12' },
]

export default function Hero() {
  
const liveCounts = usePortfolioStats()

const stats = staticStats.map((s) => {
  if (s.key === 'projects' && liveCounts.projects !== null) {
    return { ...s, value: liveCounts.projects }
  }
  if (s.key === 'technologies' && liveCounts.technologies !== null) {
    return { ...s, value: liveCounts.technologies }
  }
  if (s.key === 'years' && liveCounts.years) {
    return { ...s, value: liveCounts.years.value, suffix: liveCounts.years.suffix, label: liveCounts.years.label }
  }
  return s
})





  return (
    <section id="home" className="relative overflow-hidden pt-40 pb-28 md:pt-48 md:pb-36">
      {/* background gradients */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -right-40 w-[560px] h-[560px] rounded-full bg-olive/10 blur-[120px]" />
        <div className="absolute top-1/3 -left-40 w-[440px] h-[440px] rounded-full bg-olive/[0.07] blur-[110px]" />
        <div className="absolute inset-0 bg-grain" />
      </div>

      <div className="container-luxe">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-16 lg:gap-8 items-center">
          {/* Left: copy */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="eyebrow mb-6"
            >
              Full Stack MERN Developer — Jaipur, India
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-[15vw] leading-[0.94] sm:text-7xl md:text-8xl lg:text-[6.4rem] tracking-tightest text-ink"
            >
              Shyam
              <br />
              <span className="italic text-olive">Sharma</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-8 max-w-md text-lg text-ink-faint leading-relaxed"
            >
              I design and build scalable, considered web applications with the MERN
              stack — where clean engineering meets a quiet sense of craft.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
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

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="mt-14 flex items-center gap-10"
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-3xl text-ink">
                    <AnimatedCounter value={s.value} suffix={s.suffix} />
                  </p>
                  <p className="text-xs text-ink-faint font-mono mt-1 max-w-[7rem]">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: portrait + floating badges + socials */}
          <div className="relative flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-[26rem] md:h-[26rem]"
            >
              <div className="absolute -inset-6 rounded-full bg-olive/15 blur-2xl" />
              <div className="relative w-full h-full rounded-full overflow-hidden border border-line shadow-glass bg-olive-50">
                <img
                  src="/profile.jpeg"
                  alt="Portrait of Shyam Sharma"
                  className="w-full h-full object-cover grayscale"
                  loading="eager"
                />
              </div>

              {badges.map((b, i) => (
                <motion.div
                  key={b.label}
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
                  className={`absolute ${b.style} px-4 py-2 rounded-full bg-cream/90 backdrop-blur-md border border-line shadow-glass text-xs font-mono text-ink-soft`}
                >
                  {b.label}
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="hidden md:flex flex-col gap-4 absolute -right-2 lg:-right-14 top-1/2 -translate-y-1/2"
            >
              {[
                { icon: FiGithub, href: 'https://github.com/shyamdevs' },
                { icon: FiLinkedin, href: 'https://linkedin.com/in/shyam-sharma2004' },
                { icon: FiMail, href: 'mailto:shyamsharma729785@gmail.com' },
              ].map(({ icon: Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor-hover
                  className="w-10 h-10 rounded-full border border-line flex items-center justify-center text-ink-soft hover:text-olive hover:border-olive transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <motion.a
        href="#projects"
        data-cursor-hover
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ink-faint"
      >
        <span className="text-[11px] font-mono uppercase tracking-widest2">Scroll</span>
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <FiArrowDown />
        </motion.span>
      </motion.a>
    </section>
  )
}
