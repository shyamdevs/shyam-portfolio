import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionHeading from '../ui/SectionHeading.jsx'
import { getSkillIcon } from '../../data/skillIcons.js'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const categoryOrder = ['Frontend', 'Backend', 'Tools', 'Other']

function SkillGroup({ label, skills, delay }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 })
  if (skills.length === 0) return null

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="rounded-[28px] border border-line bg-white/60 p-8"
    >
      <p className="eyebrow mb-6">{label}</p>
      <div className="flex flex-wrap gap-3">
        {skills.map((s, i) => {
          const Icon = getSkillIcon(s.name)
          return (
            <motion.div
              key={s._id}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: delay + i * 0.05 }}
              whileHover={{ y: -3, borderColor: '#556B4F' }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-line text-sm text-ink-soft transition-colors"
            >
              <Icon className="text-olive" size={15} />
              {s.name}
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const [skills, setSkills] = useState([])

  useEffect(() => {
    fetch(`${API_URL}/skills`)
      .then((r) => r.json())
      .then(setSkills)
      .catch(() => setSkills([]))
  }, [])

  return (
    <section id="skills" className="py-28 md:py-36">
      <div className="container-luxe">
        <SectionHeading
          eyebrow="Capabilities"
          title={<>Tools I reach for,<br /><span className="italic text-olive">and trust.</span></>}
        />
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {categoryOrder.map((cat, i) => (
            <SkillGroup
              key={cat}
              label={cat}
              skills={skills.filter((s) => s.category === cat)}
              delay={i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}