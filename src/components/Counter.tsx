import { content } from '../data/content'
import { useTogetherDuration } from '../hooks/useTogetherDuration'
import { padTime } from '../utils/date'
import { Section } from './ui/Section'
import { GlassCard } from './ui/GlassCard'

export function Counter() {
  const duration = useTogetherDuration(content.relationshipStartDate)

  const units = [
    { label: 'Months', value: String(duration.months) },
    { label: 'Days', value: String(duration.days) },
    { label: 'Hours', value: padTime(duration.hours) },
    { label: 'Minutes', value: padTime(duration.minutes) },
    { label: 'Seconds', value: padTime(duration.seconds) },
  ]

  return (
    <Section
      id="counter"
      title="We've been together for..."
      subtitle="Every second with you counts."
      className="bg-gradient-to-b from-lavender/10 via-transparent to-blush-soft/10"
    >
      <GlassCard className="!p-6 md:!p-10">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 md:gap-3">
          {units.map((unit) => (
            <div
              key={unit.label}
              className="rounded-2xl bg-cream/70 px-3 py-5 text-center"
            >
              <div className="font-display text-4xl font-medium tracking-tight text-blush md:text-5xl">
                {unit.value}
              </div>
              <div className="mt-2 text-xs font-medium uppercase tracking-[0.16em] text-ink-muted">
                {unit.label}
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </Section>
  )
}
