const fmt = new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' })

export const formatNoteDate = (date) => {
  const d = new Date(date)
  return Number.isNaN(d.getTime()) ? '' : fmt.format(d)
}
