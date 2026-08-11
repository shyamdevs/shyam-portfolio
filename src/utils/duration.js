const MONTH_NAMES = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
}

const SEPARATOR = /\s*(?:—|–|―|‒|−|-{1,2}|(?:\bto\b))\s*/i

function parseDatePart(rawText) {
  const text = rawText.trim().replace(/\s+/g, ' ')
  if (!text) return null
  if (/present|current|now/i.test(text)) return new Date()

  const monthYear = text.match(/^([A-Za-z]{3,})\.?,?\s*(\d{4})$/)
  if (monthYear) {
    const key = monthYear[1].slice(0, 3).toLowerCase()
    const month = MONTH_NAMES[key]
    const year = parseInt(monthYear[2], 10)
    if (month !== undefined && !Number.isNaN(year)) return new Date(year, month, 1)
  }

  const yearOnly = text.match(/^(\d{4})$/)
  if (yearOnly) {
    return new Date(parseInt(yearOnly[1], 10), 0, 1)
  }

  return null
}

function parseDateRange(dateStr) {
  if (!dateStr) return null
  const parts = dateStr.split(SEPARATOR).map((s) => s.trim()).filter(Boolean)
  if (parts.length < 2) {
    console.warn(`[duration] Could not split date range into two parts: "${dateStr}"`)
    return null
  }

  const start = parseDatePart(parts[0])
  const end = parseDatePart(parts[parts.length - 1])

  if (!start) {
    console.warn(`[duration] Could not parse start date from: "${parts[0]}" (full string: "${dateStr}")`)
    return null
  }

  return { start, end: end || new Date() }
}

const wholeMonthsBetween = (a, b) =>
  (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth())

export function getLearningDuration(experienceList) {
  if (!Array.isArray(experienceList) || experienceList.length === 0) return null

  let earliestStart = null
  for (const entry of experienceList) {
    const range = parseDateRange(entry.date)
    if (range?.start && (!earliestStart || range.start < earliestStart)) {
      earliestStart = range.start
    }
  }
  if (!earliestStart) return null

  const totalMonths = wholeMonthsBetween(earliestStart, new Date())
  if (totalMonths <= 0) return null

  if (totalMonths < 12) {
    return { value: totalMonths, suffix: '', label: 'Months Learning' }
  }

  const years = Math.floor(totalMonths / 12)
  const remainder = totalMonths % 12
  return {
    value: years,
    suffix: remainder === 0 ? '' : '+',
    label: 'Years Learning',
  }
}