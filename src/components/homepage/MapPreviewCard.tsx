import { ButtonLink } from '@/components/shared/ButtonLink'
import { Card, CardHeading } from '@/components/shared/Card'

import type { CTA } from './HeroSection'

type Props = {
  heading?: string | null
  subheading?: string | null
  statusText?: string | null
  cta?: CTA
}

/**
 * Compact map preview. An abstract illustration with NO markers or real geography: the
 * interactive Leaflet map (verified locations only) lives on the Map page (§5.6, §14).
 */
export function MapPreviewCard({ heading, subheading, statusText, cta }: Props) {
  return (
    <Card labelledBy="map-title" className="h-full">
      {heading && (
        <CardHeading id="map-title" icon="pin" title={heading} subtitle={subheading ?? undefined} />
      )}

      <div className="relative mt-4 flex min-h-56 flex-1 overflow-hidden rounded-xl border border-border bg-primary-soft">
        <svg
          aria-hidden
          viewBox="0 0 320 220"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 size-full"
        >
          <rect width="320" height="220" className="fill-primary-soft" />
          <path
            d="M0 150 C60 120 90 180 160 140 S270 90 320 120 V220 H0z"
            className="fill-leaf/25"
          />
          <path
            d="M-10 60 C80 90 140 40 330 80"
            className="stroke-white"
            strokeWidth="9"
            fill="none"
          />
          <path
            d="M60 230 C90 150 150 120 170 -10"
            className="stroke-white"
            strokeWidth="7"
            fill="none"
          />
          <path
            d="M200 230 C210 170 250 140 330 150"
            className="stroke-white/80"
            strokeWidth="5"
            fill="none"
          />
          <path
            d="M-10 60 C80 90 140 40 330 80"
            className="stroke-leaf/30"
            strokeWidth="1"
            fill="none"
          />
        </svg>
        {statusText && (
          <p className="relative m-auto max-w-[15rem] rounded-lg bg-white/90 px-3 py-2 text-center text-sm text-ink-muted shadow-sm">
            {statusText}
          </p>
        )}
        {cta && (
          <div className="absolute right-3 bottom-3">
            <ButtonLink href={cta.href} newTab={cta.newTab} className="px-4 py-2 text-sm">
              {cta.label}
            </ButtonLink>
          </div>
        )}
      </div>
    </Card>
  )
}
