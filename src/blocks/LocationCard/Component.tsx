import { MiniMap } from '@/components/map/MiniMap'
import { ButtonLink } from '@/components/shared/ButtonLink'
import { Container } from '@/components/shared/Container'
import { Icon } from '@/components/shared/Icon'
import type { LocationCardBlock as LocationCardBlockProps } from '@/payload-types'
import { getVillageProfile } from '@/utilities/queries'

import { mapView } from '../VillageMap/mapData'
import { type BlockContext, toCTA } from '../shared'

export async function LocationCardBlockComponent({
  block,
  locale,
  t,
}: { block: LocationCardBlockProps } & BlockContext) {
  const profile = await getVillageProfile(locale)
  const view = mapView(profile)
  const cta = toCTA(block.cta, locale)
  const badge = block.badgeText || [profile.district, profile.state].filter(Boolean).join(', ')

  return (
    <Container className="py-8 sm:py-10">
      <section
        aria-labelledby="location-title"
        className="grid overflow-hidden rounded-2xl bg-primary-soft shadow-(--shadow-card) md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]"
      >
        <div className="p-6 sm:p-8">
          {block.heading && (
            <h2
              id="location-title"
              className="flex items-center gap-3 font-heading text-2xl font-bold text-primary sm:text-3xl"
            >
              <Icon name="pin" className="size-8" />
              {block.heading}
            </h2>
          )}
          {block.text && <p className="mt-3 text-base leading-relaxed text-ink">{block.text}</p>}
          {cta && (
            <div className="mt-5">
              <ButtonLink href={cta.href} newTab={cta.newTab}>
                {cta.label}
              </ButtonLink>
            </div>
          )}
        </div>

        <div className="relative min-h-56 md:min-h-64">
          {view.verified ? (
            <MiniMap
              center={view.center}
              zoom={view.zoom}
              label={profile.name ?? ''}
              ariaLabel={t.map.ariaLabel}
            />
          ) : (
            // Abstract illustration — no real geography until the village centre is verified.
            <svg
              aria-hidden
              viewBox="0 0 600 260"
              preserveAspectRatio="xMidYMid slice"
              className="absolute inset-0 size-full"
            >
              <rect width="600" height="260" className="fill-primary-soft" />
              <path
                d="M0 190 C120 150 220 220 330 180 S520 120 600 150 V260 H0z"
                className="fill-leaf/20"
              />
              <path
                d="M-10 70 C150 110 300 40 610 90"
                className="stroke-white"
                strokeWidth="10"
                fill="none"
              />
              <path
                d="M120 270 C170 170 260 120 300 -10"
                className="stroke-white"
                strokeWidth="8"
                fill="none"
              />
              <path
                d="M380 270 C400 200 470 160 610 170"
                className="stroke-white/80"
                strokeWidth="6"
                fill="none"
              />
            </svg>
          )}
          {badge && (
            <span className="absolute top-3 right-3 z-[500] rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-ink shadow-sm">
              {badge}
            </span>
          )}
        </div>
      </section>
    </Container>
  )
}
