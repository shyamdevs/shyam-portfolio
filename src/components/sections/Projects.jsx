import { useMemo } from 'react'
import SectionHeading from '../ui/SectionHeading.jsx'
import ProjectCard from '../ui/ProjectCard.jsx'
import { ProjectCardSkeleton } from '../ui/Skeleton.jsx'
import { usePortfolio } from '../../lib/portfolioStore.js'

export default function Projects() {
  const { data, status } = usePortfolio()

  const projects = useMemo(
    () => (data?.projects || []).map((p, i) => ({ ...p, index: String(i + 1).padStart(2, '0') })),
    [data]
  )

  return (
    <section id="projects" className="py-24 md:py-36">
      <div className="container-luxe">
        <div className="mb-14 flex flex-col justify-between gap-8 md:mb-16 md:flex-row md:items-end">
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
          <p className="max-w-xs text-sm leading-relaxed text-ink-faint">
            A selection of applications built end to end — from schema design to deployed interface.
          </p>
        </div>

        {!data && status === 'loading' ? (
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-3" aria-busy="true">
            {[0, 1, 2].map((i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <p className="text-sm text-ink-faint">
            {status === 'error' ? 'Projects could not be loaded right now. Please try again shortly.' : 'Projects coming soon.'}
          </p>
        ) : (
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((p, i) => (
              <ProjectCard key={p._id} project={p} delay={(i % 3) * 0.08} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
