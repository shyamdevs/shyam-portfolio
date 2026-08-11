import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiArrowUpRight } from 'react-icons/fi'
import Magnetic from '../ui/Magnetic.jsx'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [resumeUrl, setResumeUrl] = useState('/Shyam_Sharma_Resume.pdf') // static fallback

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

useEffect(() => {
  fetch(`${API_URL}/resume`)
    .then((r) => r.json())
    .then((data) => {
      if (data?.url) setResumeUrl(data.url)
    })
    .catch(() => {})
}, [])

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-3' : 'py-6'
        }`}
      >
        <div className="container-luxe">
          <div
            className={`flex items-center justify-between rounded-full transition-all duration-500 px-5 md:px-6 ${
              scrolled
                ? 'bg-cream/80 backdrop-blur-xl border border-line shadow-glass py-2.5'
                : 'bg-transparent py-1'
            }`}
          >
            <a href="#home" data-cursor-hover className="font-display text-xl tracking-tight text-ink">
              Shyam<span className="text-olive">.</span>
            </a>

            <nav className="hidden lg:flex items-center gap-9">
              {links.map((l) => (
                
                 <a  key={l.href}
                  href={l.href}
                  data-cursor-hover
                  className="text-[13px] uppercase tracking-widest2 font-mono text-ink-soft hover:text-olive transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </nav>

            <div className="hidden lg:block">
              <Magnetic>
                
                 <a href={resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor-hover
                  className="inline-flex items-center gap-2 bg-ink text-cream text-sm px-5 py-2.5 rounded-full hover:bg-olive-dark transition-colors"
                >
                  Resume <FiArrowUpRight size={15} />
                </a>
              </Magnetic>
            </div>

            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden text-ink p-2"
            >
              {open ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-cream lg:hidden flex flex-col items-center justify-center gap-8"
          >
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="font-display text-3xl text-ink"
              >
                {l.label}
              </motion.a>
            ))}
            
             <a href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 btn-primary"
            >
              Resume <FiArrowUpRight />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}