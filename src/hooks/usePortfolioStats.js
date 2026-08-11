import { useEffect, useState } from 'react'
import { getLearningDuration } from '../utils/duration.js'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export function usePortfolioStats() {
  const [counts, setCounts] = useState({ projects: null, technologies: null, years: null })

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/projects`).then((r) => r.json()),
      fetch(`${API_URL}/skills`).then((r) => r.json()),
      fetch(`${API_URL}/experience`).then((r) => r.json()),
    ])
      .then(([projects, skills, experience]) => {
        setCounts({
          projects: projects.length,
          technologies: skills.length,
          years: getLearningDuration(experience),
        })
      })
      .catch(() => {})
  }, [])

  return counts
}