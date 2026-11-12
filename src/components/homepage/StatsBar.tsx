import { Icon, type IconName } from '@/components/shared/Icon'

export type StatItem = {
  icon: IconName
  value: string
  label: string
}

/** Five compact village statistics, overlapping the bottom of the hero on larger screens. */
export function StatsBar({ items, label }: { items: StatItem[]; label: string }) {
  return (
    <section
      aria-label={label}
      className="relative z-10 mx-auto -mt-14 max-w-6xl px-4 sm:-mt-16 sm:px-6 lg:px-8"
    >
      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border shadow-(--shadow-card) sm:grid-cols-3 lg:grid-cols-5">
        {items.map((item, i) => (
          <div
            key={item.label}
            className={`flex items-center gap-3 bg-cream px-4 py-4 sm:px-5 sm:py-5 ${
              // Last item spans the row when it would sit alone (2-col mobile grid).
              i === items.length - 1 && items.length % 2 === 1 ? 'col-span-2 sm:col-span-1' : ''
            }`}
          >
            <Icon name={item.icon} className="size-8 shrink-0 text-primary sm:size-9" />
            <div className="min-w-0">
              <dd className="text-lg leading-tight font-bold text-ink sm:text-xl">{item.value}</dd>
              <dt className="text-sm text-ink-muted">{item.label}</dt>
            </div>
          </div>
        ))}
      </dl>
    </section>
  )
}
