import { AboutSection } from '@/components/homepage/AboutSection'
import type { AboutBlock as AboutBlockProps } from '@/payload-types'
import { resolveImage } from '@/utilities/media'
import { getVillageProfile } from '@/utilities/queries'

import { type BlockContext, toCTA } from '../shared'

export async function AboutBlockComponent({
  block,
  locale,
  t,
}: { block: AboutBlockProps } & BlockContext) {
  const profile = await getVillageProfile(locale)

  return (
    <AboutSection
      heading={block.heading}
      text={block.text || profile.shortDescription}
      cta={toCTA(block.cta, locale)}
      image={resolveImage(block.image) ?? resolveImage(profile.coverImage)}
      placeholderAlt={t.placeholder.photoAlt(profile.name ?? '')}
      placeholderLabel={t.placeholder.photo}
      illustrativeLabel={t.placeholder.illustrative}
    />
  )
}
