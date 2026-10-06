import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion'
import { FiMenu, FiX, FiArrowUpRight } from 'react-icons/fi'
import Magnetic from '../ui/Magnetic.jsx'
import { usePortfolio } from '../../lib/portfolioStore.js'
import { useScrollLock } from '../../hooks/useScrollLock.js'

const FALLBACK_RESUME = '/Shyam_S_Sharma_Final_Resume.pdf'

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
]

// One observer for the whole page; the section crossing the middle of the viewport is "active".
function useActiveSection() {
  const [active, setActive] = useState('home')
  useEffect(() => {
    const seen = new Map()
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => seen.set(e.target.id, e.isIntersecting))
        const current = links.map((l) => l.href.slice(1)).find((id) => seen.get(id))
        if (current) setActive(current)
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    // sections are lazy-loaded, so watch for them to appear
    const attach = () => links.forEach((l) => {
      const el = document.getElementById(l.href.slice(1))
      if (el && !seen.has(el.id)) { seen.set(el.id, false); io.observe(el) }
    })
    attach()
    const mo = new MutationObserver(attach)
    mo.observe(document.querySelector('main') || document.body, { childList: true })
    return () => { io.disconnect(); mo.disconnect() }
  }, [])
  return active
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { data } = usePortfolio()
  const resumeUrl = data?.resume?.url || FALLBACK_RESUME
  const active = useActiveSection()
  const { scrollY } = useScroll()

  // setState bails out when the value is unchanged, so this only renders when crossing 24px
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 24))
  useScrollLock(open)

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    const onResize = () => window.innerWidth >= 1024 && setOpen(false)
    document.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-[padding] duration-500 ${scrolled ? 'py-3' : 'py-5 md:py-6'}`}>
        <div className="container-luxe">
          <div
            className={`flex items-center justify-between rounded-full px-4 transition-all duration-500 md:px-6 ${
              scrolled && !open ? 'border border-line bg-cream/85 py-2.5 shadow-glass backdrop-blur-lg' : 'border border-transparent bg-transparent py-1'
            }`}
          >
            <a href="#home" data-cursor-hover aria-label="Shyam Sharma — home" className="font-display text-xl tracking-tight text-ink">
              Shyam<span className="text-olive">.</span>
            </a>

            <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex xl:gap-9">
              {links.map((l) => {
                const isActive = active === l.href.slice(1)
                return (
                  <a
                    key={l.href}
                    href={l.href}
                    data-cursor-hover
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative py-1 font-mono text-[13px] uppercase tracking-widest2 transition-colors hover:text-olive ${isActive ? 'text-olive' : 'text-ink-soft'}`}
                  >
                    {l.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-olive transition-transform duration-500 ${isActive ? 'scale-x-100' : 'scale-x-0'}`}
                    />
                  </a>
                )
              })}
            </nav>

            <div className="hidden lg:block">
              <Magnetic>
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm text-cream transition-colors hover:bg-olive-dark"
                >
                  Resume <FiArrowUpRight size={15} aria-hidden="true" />
                </a>
              </Magnetic>
            </div>

            <button
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className="-mr-2 flex h-11 w-11 items-center justify-center text-ink lg:hidden"
            >
              {open ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-5 overflow-y-auto bg-cream px-6 py-24 lg:hidden"
          >
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                aria-current={active === l.href.slice(1) ? 'true' : undefined}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className={`font-display text-3xl sm:text-4xl ${active === l.href.slice(1) ? 'text-olive' : 'text-ink'}`}
              >
                {l.label}
              </motion.a>
            ))}
            <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="btn-primary mt-4">
              Resume <FiArrowUpRight aria-hidden="true" />
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
