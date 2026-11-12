import { DevelopmentCard } from '@/components/homepage/DevelopmentCard'
import type { DevelopmentPreviewBlock as DevelopmentPreviewBlockProps } from '@/payload-types'

import { type BlockContext, toCTA } from '../shared'

export function DevelopmentPreviewBlockComponent({
  block,
  locale,
}: { block: DevelopmentPreviewBlockProps } & BlockContext) {
  return (
    <DevelopmentCard
      heading={block.heading}
      subheading={block.subheading}
      cta={toCTA(block.cta, locale)}
    />
  )
}
