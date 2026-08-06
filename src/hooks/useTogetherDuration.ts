import { useEffect, useState } from 'react'
import { getTogetherDuration, type DurationParts } from '../utils/date'

export function useTogetherDuration(startDateIso: string): DurationParts {
  const [duration, setDuration] = useState(() =>
    getTogetherDuration(startDateIso),
  )

  useEffect(() => {
    setDuration(getTogetherDuration(startDateIso))
    const id = window.setInterval(() => {
      setDuration(getTogetherDuration(startDateIso))
    }, 1000)
    return () => window.clearInterval(id)
  }, [startDateIso])

  return duration
}
