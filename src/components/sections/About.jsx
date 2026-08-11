import Reveal from '../ui/Reveal.jsx'
import Magnetic from '../ui/Magnetic.jsx'
import { FiArrowUpRight } from 'react-icons/fi'

const chips = ['Clean Architecture', 'REST APIs', 'JWT Auth', 'Responsive UI', 'CRUD Systems', 'Git Workflow']

export default function About() {
  return (
    <section id="about" className="py-28 md:py-36 bg-cream-soft">
      <div className="container-luxe grid lg:grid-cols-2 gap-16 items-center">
        <Reveal>
          <div className="relative">
            <div className="rounded-[32px] overflow-hidden border border-line shadow-glass aspect-[4/5] bg-olive-50">
              <img
                src="/about.jpeg"
                alt="Shyam Sharma at his desk"
                loading="lazy"
                className="w-full h-full object-cover hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="absolute -bottom-8 -right-6 md:-right-10 bg-ink text-cream rounded-3xl p-6 max-w-[220px] shadow-glass">
              <p className="font-display italic text-lg leading-snug">
                "Consistency compounds. Keep building."
              </p>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="eyebrow mb-4">About Me</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tightest leading-[1.05] text-ink mb-7">
              A curious developer who loves to build.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="space-y-5 text-ink-faint text-lg leading-relaxed max-w-xl">
              <p>
                I enjoy turning ideas into real-world applications — currently focused on
                building scalable, full-stack products with clean, efficient code.
              </p>
              <p>
                Based in Jaipur, I work across the MERN stack, from designing REST APIs
                and database schemas to shipping polished, responsive interfaces that
                people actually enjoy using.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="flex flex-wrap gap-3 mt-9">
              {chips.map((c, i) => (
                <span
                  key={c}
                  className="text-xs font-mono px-4 py-2 rounded-full border border-line text-ink-soft hover:border-olive hover:text-olive transition-colors duration-300"
                  style={{ transitionDelay: `${i * 30}ms` }}
                >
                  {c}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <Magnetic className="inline-block mt-10">
              <a href="#contact" data-cursor-hover className="btn-secondary">
                Let's Connect <FiArrowUpRight />
              </a>
            </Magnetic>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
