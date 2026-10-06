import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionHeading from '../ui/SectionHeading.jsx'
import { Skeleton } from '../ui/Skeleton.jsx'
import { usePortfolio } from '../../lib/portfolioStore.js'

function TimelineItem({ item }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <li ref={ref} className="relative pb-14 pl-12 last:pb-0 md:pl-16">
      <motion.span
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, ease: 'backOut' }}
        className="absolute left-0 top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-olive bg-cream md:h-7 md:w-7"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-olive" />
      </motion.span>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <span className="mb-3 inline-block rounded-full bg-olive-50 px-3 py-1 font-mono text-xs text-olive-dark">{item.date}</span>
        <h3 className="font-display text-2xl text-ink">{item.role}</h3>
        <p className="mb-3 mt-1 text-sm font-medium text-olive">{item.org}</p>
        <p className="max-w-lg leading-relaxed text-ink-faint">{item.description}</p>
      </motion.div>
    </li>
  )
}

function Timeline({ items }) {
  const ref = useRef(null)
  // the olive line draws itself as the list scrolls through the viewport
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const draw = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 })

  return (
    <ol ref={ref} className="relative">
      <span aria-hidden="true" className="absolute bottom-2 left-[9px] top-3 w-px bg-line md:left-[13px]" />
      <motion.span
        aria-hidden="true"
        style={{ scaleY: draw, transformOrigin: 'top' }}
        className="absolute bottom-2 left-[9px] top-3 w-px bg-olive md:left-[13px]"
      />
      {items.map((item) => (
        <TimelineItem key={item._id} item={item} />
      ))}
    </ol>
  )
}

export default function Experience() {
  const { data, status } = usePortfolio()
  const experience = data?.experience || []
  const education = data?.education || []
  const loading = !data && status === 'loading'

  return (
    <section id="experience" className="bg-cream-soft py-24 md:py-36">
      <div className="container-luxe grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionHeading
            eyebrow="Career Path"
            title={<>Where I've<br /><span className="italic text-olive">put in the work.</span></>}
          />
          <div className="hairline mt-10 max-w-sm space-y-4 pt-8">
            <p className="eyebrow mb-2">Education</p>
            {loading ? (
              <div aria-busy="true" className="space-y-2">
                <Skeleton className="h-5 w-4/5" />
                <Skeleton className="h-3 w-12" />
              </div>
            ) : education.length === 0 ? (
              <p className="text-sm text-ink-faint">Details coming soon.</p>
            ) : (
              education.map((edu) => (
                <div key={edu._id}>
                  <p className="font-display text-lg text-ink">{edu.degree}</p>
                  <p className="mt-0.5 text-sm text-ink-faint">{edu.year}</p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="pt-2">
          {loading ? (
            <div aria-busy="true" className="space-y-10 pl-12 md:pl-16">
              {[0, 1, 2].map((i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-6 w-32 rounded-full" />
                  <Skeleton className="h-6 w-2/3" />
                  <Skeleton className="h-4 w-full max-w-lg" />
                </div>
              ))}
            </div>
          ) : experience.length === 0 ? (
            <p className="text-sm text-ink-faint">{status === 'error' ? 'Experience could not be loaded right now.' : 'Experience details coming soon.'}</p>
          ) : (
            <Timeline items={experience} />
          )}
        </div>
      </div>
    </section>
  )
}
