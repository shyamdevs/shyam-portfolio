import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionHeading from '../ui/SectionHeading.jsx'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

function TimelineItem({ item, isLast }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <div ref={ref} className="relative pl-12 md:pl-16 pb-14 last:pb-0">
      {!isLast && (
        <span className="absolute left-[9px] md:left-[13px] top-6 bottom-0 w-px bg-line" />
      )}
      <motion.span
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, ease: 'backOut' }}
        className="absolute left-0 top-1 w-5 h-5 md:w-7 md:h-7 rounded-full bg-cream border-2 border-olive flex items-center justify-center"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-olive" />
      </motion.span>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <span className="inline-block font-mono text-xs px-3 py-1 rounded-full bg-olive-50 text-olive-dark mb-3">
          {item.date}
        </span>
        <h3 className="text-2xl text-ink font-display">{item.role}</h3>
        <p className="text-olive text-sm mt-1 mb-3 font-medium">{item.org}</p>
        <p className="text-ink-faint leading-relaxed max-w-lg">{item.description}</p>
      </motion.div>
    </div>
  )
}

export default function Experience() {
  const [experience, setExperience] = useState([])
  const [educationList, setEducationList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/experience`).then((r) => r.json()),
      fetch(`${API_URL}/education`).then((r) => r.json()),
    ])
      .then(([expData, eduData]) => {
        setExperience(expData)
        setEducationList(eduData)
      })
      .catch(() => {
        setExperience([])
        setEducationList([])
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <section id="experience" className="py-28 md:py-36 bg-cream-soft">
      <div className="container-luxe grid lg:grid-cols-[0.8fr_1.2fr] gap-16">
        <div>
          <SectionHeading
            eyebrow="Career Path"
            title={
              <>
                Where I've
                <br />
                <span className="italic text-olive">put in the work.</span>
              </>
            }
          />
          <div className="mt-10 pt-8 hairline max-w-sm space-y-4">
            <p className="eyebrow mb-2">Education</p>
            {educationList.length === 0 ? (
              <p className="text-ink-faint text-sm">Details coming soon.</p>
            ) : (
              educationList.map((edu) => (
                <div key={edu._id}>
                  <p className="text-ink font-display text-lg">{edu.degree}</p>
                  <p className="text-ink-faint text-sm mt-0.5">{edu.year}</p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="pt-2">
          {loading ? (
            <p className="text-ink-faint text-sm">Loading experience…</p>
          ) : experience.length === 0 ? (
            <p className="text-ink-faint text-sm">Experience details coming soon.</p>
          ) : (
            experience.map((item, i) => (
              <TimelineItem key={item._id} item={item} isLast={i === experience.length - 1} />
            ))
          )}
        </div>
      </div>
    </section>
  )
}