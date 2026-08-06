import { content } from '../data/content'
import { Section } from './ui/Section'
import { GlassCard } from './ui/GlassCard'

export function Reasons() {
  return (
    <Section
      id="reasons"
      title="Reasons I Love You"
      subtitle={`Twelve of countless reasons, ${content.girlfriendName}.`}
      className="bg-gradient-to-b from-transparent via-blush-soft/15 to-transparent"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {content.reasons.map((reason, index) => (
          <GlassCard
            key={reason.id}
            hover
            className="!p-5 md:!p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
              duration: 0.45,
              delay: (index % 6) * 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span className="font-display text-3xl font-medium text-blush/50">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-3 font-display text-xl font-medium text-ink md:text-2xl">
              {reason.title}
            </h3>
            <p className="mt-2 text-sm font-light leading-relaxed text-ink-muted">
              {reason.description}
            </p>
          </GlassCard>
        ))}
      </div>
    </Section>
  )
}
