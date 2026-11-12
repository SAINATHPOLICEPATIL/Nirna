import { MapPreviewCard } from '@/components/homepage/MapPreviewCard'
import type { MapPreviewBlock as MapPreviewBlockProps } from '@/payload-types'
import { countMapLocations } from '@/utilities/queries'

import { type BlockContext, numberFormat, toCTA } from '../shared'

export async function MapPreviewBlockComponent({
  block,
  locale,
}: { block: MapPreviewBlockProps } & BlockContext) {
  // Only published map locations are counted, and publishing requires verified coordinates.
  const count = await countMapLocations()
  const statusText =
    count > 0 && block.availableText
      ? block.availableText.replace('{count}', numberFormat.format(count))
      : block.pendingText

  return (
    <MapPreviewCard
      heading={block.heading}
      subheading={block.subheading}
      statusText={statusText}
      cta={toCTA(block.cta, locale)}
    />
  )
}
