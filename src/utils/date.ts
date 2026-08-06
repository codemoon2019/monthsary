export interface DurationParts {
  months: number
  days: number
  hours: number
  minutes: number
  seconds: number
}

/** Calendar-aware duration from an ISO start date (YYYY-MM-DD or full ISO) to `now`. */
export function getTogetherDuration(
  startDateIso: string,
  now: Date = new Date(),
): DurationParts {
  const start = new Date(startDateIso)
  if (Number.isNaN(start.getTime()) || now < start) {
    return { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  let months =
    (now.getFullYear() - start.getFullYear()) * 12 +
    (now.getMonth() - start.getMonth())

  const anchor = new Date(start)
  anchor.setMonth(anchor.getMonth() + months)

  if (now < anchor) {
    months -= 1
    anchor.setMonth(anchor.getMonth() - 1)
  }

  let remainingMs = now.getTime() - anchor.getTime()
  const days = Math.floor(remainingMs / (1000 * 60 * 60 * 24))
  remainingMs -= days * 1000 * 60 * 60 * 24
  const hours = Math.floor(remainingMs / (1000 * 60 * 60))
  remainingMs -= hours * 1000 * 60 * 60
  const minutes = Math.floor(remainingMs / (1000 * 60))
  remainingMs -= minutes * 1000 * 60
  const seconds = Math.floor(remainingMs / 1000)

  return { months, days, hours, minutes, seconds }
}

export function padTime(value: number): string {
  return String(value).padStart(2, '0')
}
