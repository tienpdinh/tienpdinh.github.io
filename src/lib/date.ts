/**
 * Formats a `YYYY-MM-DD` string without going through the local timezone,
 * which would otherwise shift early-morning dates back by a day.
 */
export function formatDate(date: string): string {
  const [year, month, day] = date.split('-').map(Number)
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}
