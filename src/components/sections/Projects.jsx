import { useEffect, useState } from 'react'
import SectionHeading from '../ui/SectionHeading.jsx'
import ProjectCard from '../ui/ProjectCard.jsx'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_URL}/projects`)
      .then((r) => r.json())
      .then((data) => {
        const withIndex = data.map((p, i) => ({
          ...p,
          index: String(i + 1).padStart(2, '0'),
          image: p.image?.trim() ? p.image : '/projects/placeholder.svg',
        }))
        setProjects(withIndex)
      })
      .catch(() => setProjects([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section id="projects" className="py-28 md:py-36">
      <div className="container-luxe">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <SectionHeading
            eyebrow="Featured Work"
            title={
              <>
                Projects that
                <br />
                <span className="italic text-olive">make impact.</span>
              </>
            }
          />
          <p className="max-w-xs text-ink-faint text-sm leading-relaxed">
            A selection of applications built end to end — from schema design to
            deployed interface.
          </p>
        </div>

        {loading ? (
          <p className="text-ink-faint text-sm">Loading projects…</p>
        ) : projects.length === 0 ? (
          <p className="text-ink-faint text-sm">Projects coming soon.</p>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {projects.map((p, i) => (
              <ProjectCard key={p._id} project={p} delay={i * 0.1} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}