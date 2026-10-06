import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from 'react-icons/fi'
import Magnetic from '../ui/Magnetic.jsx'
import { social } from '../../data/content.js'

const icons = { github: FiGithub, linkedin: FiLinkedin, mail: FiMail }

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="bg-ink text-cream">
      <div className="container-luxe py-14 md:py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div>
            <p className="font-display italic text-2xl sm:text-3xl mb-3">Let's build something considered.</p>
            <a
              href="mailto:shyamsharma729785@gmail.com"
              data-cursor-hover
              className="text-cream/60 hover:text-olive-light transition-colors text-sm"
            >
              shyamsharma729785@gmail.com
            </a>
          </div>

          <ul aria-label="Social links" className="flex items-center gap-4 sm:gap-5">
            {social.map(({ name, url, icon }) => {
              const Icon = icons[icon]
              return (
                <li key={name}>
                  <a
                    href={url}
                    target={url.startsWith('mailto:') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    aria-label={name}
                    data-cursor-hover
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/15 transition-colors hover:border-olive hover:bg-olive"
                  >
                    <Icon aria-hidden="true" />
                  </a>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="mt-14 pt-8 border-t border-cream/10 flex flex-col-reverse md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-cream/40 font-mono">
            © {new Date().getFullYear()} Shyam Sharma. All rights reserved.
          </p>
          <Magnetic>
            <button
              onClick={scrollTop}
              data-cursor-hover
              type="button"
              className="flex items-center gap-2 py-2 text-xs font-mono uppercase tracking-widest2 text-cream/60 hover:text-cream transition-colors"
            >
              Back to top <FiArrowUp />
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  )
}
