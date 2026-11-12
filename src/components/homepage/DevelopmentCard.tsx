import { ButtonLink } from '@/components/shared/ButtonLink'
import { Card, CardHeading } from '@/components/shared/Card'

import type { CTA } from './HeroSection'

type Props = {
  heading?: string | null
  subheading?: string | null
  cta?: CTA
}

/**
 * Link card to the Development Dashboard. The bars are decorative only — no numbers,
 * axes or percentages, because no verified project data exists yet (§5.9, §13).
 */
export function DevelopmentCard({ heading, subheading, cta }: Props) {
  return (
    <Card
      labelledBy="dev-title"
      className="h-full bg-gradient-to-b from-surface via-surface to-primary-soft"
    >
      {heading && (
        <CardHeading
          id="dev-title"
          icon="chart"
          title={heading}
          subtitle={subheading ?? undefined}
        />
      )}

      <svg aria-hidden viewBox="0 0 260 120" className="mx-auto mt-4 h-28 w-full max-w-xs flex-1">
        <path d="M0 110 C60 95 120 105 260 92 V120 H0z" className="fill-leaf/30" />
        <path
          d="M70 80 C110 60 150 50 200 22"
          className="stroke-leaf/60"
          strokeWidth="3"
          fill="none"
          strokeDasharray="2 6"
          strokeLinecap="round"
        />
        {[
          [70, 82],
          [100, 68],
          [130, 54],
          [160, 36],
        ].map(([x, y]) => (
          <rect key={x} x={x} y={y} width="20" height={112 - y} rx="2" className="fill-primary" />
        ))}
        <path
          d="M215 112 C214 90 218 70 228 52"
          className="stroke-primary"
          strokeWidth="2.5"
          fill="none"
        />
        <ellipse
          cx="226"
          cy="70"
          rx="12"
          ry="5"
          transform="rotate(-40 226 70)"
          className="fill-leaf"
        />
        <ellipse
          cx="214"
          cy="86"
          rx="12"
          ry="5"
          transform="rotate(35 214 86)"
          className="fill-leaf"
        />
        <ellipse
          cx="232"
          cy="56"
          rx="10"
          ry="4"
          transform="rotate(-60 232 56)"
          className="fill-leaf"
        />
      </svg>

      {cta && (
        <div className="mt-4 flex justify-center">
          <ButtonLink href={cta.href} newTab={cta.newTab}>
            {cta.label}
          </ButtonLink>
        </div>
      )}
    </Card>
  )
}
