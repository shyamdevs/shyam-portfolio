import { useMemo } from 'react'
import { usePortfolio } from '../lib/portfolioStore.js'
import { getLearningDuration } from '../utils/duration.js'
import { staticStats } from '../data/skills.js'

// Hero stats are derived from the shared portfolio data — no extra requests.
// Returns null until real data exists, so nothing fake is ever shown.
export function usePortfolioStats() {
  const { data } = usePortfolio()
  return useMemo(() => {
    if (!data) return null
    const years = getLearningDuration(data.experience)
    return staticStats.map((s) => {
      if (s.key === 'projects') return { ...s, value: data.projects.length }
      if (s.key === 'technologies') return { ...s, value: data.skills.length }
      if (s.key === 'years' && years) return { ...s, ...years }
      return s
    })
  }, [data])
}
