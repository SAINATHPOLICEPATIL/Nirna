import { ButtonLink } from '@/components/shared/ButtonLink'
import { Card, CardHeading } from '@/components/shared/Card'
import { Icon } from '@/components/shared/Icon'

import type { CTA } from './HeroSection'

type Column = { label?: string | null; lines: string[] }

type Props = {
  heading?: string | null
  subheading?: string | null
  schools: Column
  hospitals: Column
  cta?: CTA
}

export function EducationHealthCard({ heading, subheading, schools, hospitals, cta }: Props) {
  return (
    <Card labelledBy="edu-title" className="h-full">
      {heading && (
        <CardHeading
          id="edu-title"
          icon="graduation"
          title={heading}
          subtitle={subheading ?? undefined}
        />
      )}

      <div className="mt-6 grid flex-1 grid-cols-2 divide-x divide-border">
        <FacilityColumn icon="graduation" label={schools.label} lines={schools.lines} />
        <FacilityColumn
          icon="medical"
          iconClass="text-red-600"
          label={hospitals.label}
          lines={hospitals.lines}
          className="pl-4"
        />
      </div>

      {cta && (
        <div className="mt-6 flex justify-center">
          <ButtonLink href={cta.href} newTab={cta.newTab}>
            {cta.label}
          </ButtonLink>
        </div>
      )}
    </Card>
  )
}

function FacilityColumn({
  icon,
  iconClass = 'text-primary',
  label,
  lines,
  className = 'pr-4',
}: {
  icon: 'graduation' | 'medical'
  iconClass?: string
  label?: string | null
  lines: string[]
  className?: string
}) {
  return (
    <div className={`flex gap-2.5 ${className}`}>
      <Icon name={icon} className={`mt-0.5 size-6 shrink-0 ${iconClass}`} />
      <div className="min-w-0 text-sm">
        {label && <h3 className="font-semibold text-ink">{label}</h3>}
        <ul className="mt-1 space-y-0.5 text-ink-muted">
          {lines.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
