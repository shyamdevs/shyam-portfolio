import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionHeading from '../ui/SectionHeading.jsx'
import { Skeleton } from '../ui/Skeleton.jsx'
import { getSkillIcon } from '../../data/skillIcons.js'
import { usePortfolio } from '../../lib/portfolioStore.js'

const categoryOrder = ['Frontend', 'Backend', 'Tools', 'Other']

function SkillGroup({ label, skills, delay }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="rounded-[22px] border border-line bg-white/60 p-6 sm:p-8"
    >
      <h3 className="eyebrow mb-6 font-mono">{label}</h3>
      <ul className="flex flex-wrap gap-3">
        {skills.map((s, i) => {
          const Icon = getSkillIcon(s.name)
          return (
            <motion.li
              key={s._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: delay + i * 0.04 }}
              whileHover={{ y: -3, borderColor: '#556B4F' }}
              className="flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm text-ink-soft"
            >
              <Icon aria-hidden="true" className="text-olive" size={15} />
              {s.name}
            </motion.li>
          )
        })}
      </ul>
    </motion.div>
  )
}

export default function Skills() {
  const { data, status } = usePortfolio()
  const groups = useMemo(
    () => categoryOrder.map((cat) => ({ cat, skills: (data?.skills || []).filter((s) => s.category === cat) })).filter((g) => g.skills.length),
    [data]
  )

  return (
    <section id="skills" className="py-24 md:py-36">
      <div className="container-luxe">
        <SectionHeading
          eyebrow="Capabilities"
          title={<>Tools I reach for,<br /><span className="italic text-olive">and trust.</span></>}
        />
        {!data && status === 'loading' ? (
          <div className="mt-14 grid gap-6 md:mt-16 md:grid-cols-3" aria-busy="true">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-[22px] border border-line bg-white/60 p-6 sm:p-8">
                <Skeleton className="mb-6 h-3 w-20" />
                <div className="flex flex-wrap gap-3">
                  {[24, 28, 20, 26].map((w, j) => <Skeleton key={j} className="h-10 rounded-full" style={{ width: `${w * 4}px` }} />)}
                </div>
              </div>
            ))}
          </div>
        ) : groups.length === 0 ? (
          <p className="mt-14 text-sm text-ink-faint">{status === 'error' ? 'Skills could not be loaded right now.' : 'Skills coming soon.'}</p>
        ) : (
          <div className="mt-14 grid gap-6 md:mt-16 md:grid-cols-3">
            {groups.map((g, i) => (
              <SkillGroup key={g.cat} label={g.cat} skills={g.skills} delay={i * 0.1} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
