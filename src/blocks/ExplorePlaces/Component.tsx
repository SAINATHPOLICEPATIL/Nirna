import { ExploreSection } from '@/components/homepage/ExploreSection'
import { localeTags } from '@/i18n/config'
import type { ExplorePlacesBlock as ExplorePlacesBlockProps } from '@/payload-types'
import { resolveImage } from '@/utilities/media'
import { getPlaceNames, getPlaces } from '@/utilities/queries'
import { docPath } from '@/utilities/routes'

import { type BlockContext, otherLocale, toCTA } from '../shared'

export async function ExplorePlacesBlockComponent({
  block,
  locale,
  t,
}: { block: ExplorePlacesBlockProps } & BlockContext) {
  const ids =
    block.populateBy === 'selection'
      ? (block.places ?? []).map((p) => (typeof p === 'object' ? p.id : p))
      : undefined

  const places = await getPlaces(locale, {
    featuredOnly: block.populateBy !== 'selection',
    ids,
    limit: block.populateBy === 'selection' ? (ids?.length ?? 0) || 1 : (block.limit ?? 4),
  })
  // Places without a name in this language are not shown (no silent fallback, §7.4).
  const visible = places.filter((place) => place.name)

  const other = otherLocale(locale)
  const otherNames =
    block.showOtherLanguageName !== false
      ? await getPlaceNames(
          other,
          visible.map((p) => p.id),
        )
      : new Map<number, string>()

  return (
    <ExploreSection
      heading={block.heading}
      subheading={block.subheading}
      viewAll={toCTA(block.viewAll, locale)}
      emptyLabel={block.emptyText}
      placeholderLabel={t.placeholder.photo}
      illustrativeLabel={t.placeholder.illustrative}
      places={visible.map((place) => ({
        id: place.id,
        href: docPath('places', place.slug, locale),
        name: place.name,
        altName: otherNames.get(place.id),
        altNameLang: localeTags[other],
        image: resolveImage(place.images?.[0]),
        placeholderAlt: t.placeholder.photoAlt(place.name),
      }))}
    />
  )
}
