import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from 'react-icons/fi'
import Magnetic from '../ui/Magnetic.jsx'

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="bg-ink text-cream">
      <div className="container-luxe py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div>
            <p className="font-display italic text-3xl mb-3">Let's build something considered.</p>
            <a
              href="mailto:shyamsharma729785@gmail.com"
              data-cursor-hover
              className="text-cream/60 hover:text-olive-light transition-colors text-sm"
            >
              shyamsharma729785@gmail.com
            </a>
          </div>

          <div className="flex items-center gap-5">
            <a href="https://github.com/shyamdevs" target="_blank" rel="noreferrer" data-cursor-hover className="w-11 h-11 rounded-full border border-cream/15 flex items-center justify-center hover:bg-olive hover:border-olive transition-colors">
              <FiGithub />
            </a>
            <a href="https://linkedin.com/in/shyam-sharma2004" target="_blank" rel="noreferrer" data-cursor-hover className="w-11 h-11 rounded-full border border-cream/15 flex items-center justify-center hover:bg-olive hover:border-olive transition-colors">
              <FiLinkedin />
            </a>
            <a href="mailto:shyamsharma729785@gmail.com" data-cursor-hover className="w-11 h-11 rounded-full border border-cream/15 flex items-center justify-center hover:bg-olive hover:border-olive transition-colors">
              <FiMail />
            </a>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-cream/10 flex flex-col-reverse md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-cream/40 font-mono">
            © {new Date().getFullYear()} Shyam Sharma. All rights reserved.
          </p>
          <Magnetic>
            <button
              onClick={scrollTop}
              data-cursor-hover
              className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest2 text-cream/60 hover:text-cream transition-colors"
            >
              Back to top <FiArrowUp />
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  )
}
