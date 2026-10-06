import { motion } from 'framer-motion'
import AnimatedCounter from '../ui/AnimatedCounter.jsx'
import { Skeleton } from '../ui/Skeleton.jsx'
import { usePortfolioStats } from '../../hooks/usePortfolioStats.js'

export default function HeroStats() {
  const stats = usePortfolioStats()

  return (
    <motion.dl
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.55 }}
      className="mt-12 grid max-w-md grid-cols-3 gap-4 sm:gap-10 md:mt-14"
    >
      {(stats || [0, 1, 2]).map((s, i) => (
        <div key={s.label || i} className="min-h-[3.75rem]">
          {s.label ? (
            <>
              <dd className="font-display text-3xl text-ink">
                <AnimatedCounter value={s.value} suffix={s.suffix} />
              </dd>
              <dt className="mt-1 max-w-[7rem] font-mono text-xs text-ink-faint">{s.label}</dt>
            </>
          ) : (
            <>
              <Skeleton className="h-8 w-10" />
              <Skeleton className="mt-2 h-3 w-16" />
            </>
          )}
        </div>
      ))}
    </motion.dl>
  )
}
