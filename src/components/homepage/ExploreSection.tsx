import { PlaceCard } from '@/components/cards/PlaceCard'
import { ButtonLink } from '@/components/shared/ButtonLink'
import type { ResolvedImage } from '@/utilities/media'

import type { CTA } from './HeroSection'

export type ExplorePlace = {
  id: number
  href: string
  name: string
  altName?: string | null
  altNameLang: string
  image?: ResolvedImage
  placeholderAlt: string
}

type Props = {
  heading?: string | null
  subheading?: string | null
  viewAll?: CTA
  places: ExplorePlace[]
  emptyLabel?: string | null
  placeholderLabel: string
  illustrativeLabel: string
}

/** Selected temples and landmarks. Horizontal scroll on phones, a row of four from sm up. */
export function ExploreSection({
  heading,
  subheading,
  viewAll,
  places,
  emptyLabel,
  placeholderLabel,
  illustrativeLabel,
}: Props) {
  return (
    <section
      aria-labelledby="explore-title"
      className="h-full rounded-(--radius-card) border border-border bg-surface p-5 shadow-(--shadow-card) sm:p-6"
    >
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
        <div>
          {heading && (
            <h2
              id="explore-title"
              className="font-heading text-3xl font-bold text-primary sm:text-4xl"
            >
              {heading}
            </h2>
          )}
          {subheading && <p className="mt-1 text-base text-ink-muted sm:text-lg">{subheading}</p>}
        </div>
        {viewAll && (
          <ButtonLink href={viewAll.href} newTab={viewAll.newTab} variant="text" className="mb-1">
            {viewAll.label}
          </ButtonLink>
        )}
      </div>

      {places.length === 0 ? (
        emptyLabel && (
          <p className="mt-5 rounded-lg bg-surface-muted px-4 py-6 text-center text-sm text-ink-muted">
            {emptyLabel}
          </p>
        )
      ) : (
        <ul className="-mx-5 mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-4 sm:overflow-visible sm:px-0 sm:pb-0">
          {places.map((place) => (
            <li
              key={place.id}
              className="w-[44%] min-w-[9.5rem] shrink-0 snap-start sm:w-auto sm:min-w-0"
            >
              <PlaceCard
                href={place.href}
                name={place.name}
                altName={place.altName}
                altNameLang={place.altNameLang}
                image={place.image}
                placeholderAlt={place.placeholderAlt}
                placeholderLabel={placeholderLabel}
                illustrativeLabel={illustrativeLabel}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
