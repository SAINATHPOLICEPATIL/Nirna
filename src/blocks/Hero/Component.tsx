import { HeroSection } from '@/components/homepage/HeroSection'
import { localeTags } from '@/i18n/config'
import type { HeroBlock as HeroBlockProps } from '@/payload-types'
import { resolveImage } from '@/utilities/media'
import { getVillageProfile } from '@/utilities/queries'

import { type BlockContext, toCTA } from '../shared'

export async function HeroBlockComponent({
  block,
  locale,
  t,
}: { block: HeroBlockProps } & BlockContext) {
  const profile = await getVillageProfile(locale)

  return (
    <HeroSection
      lang={localeTags[locale]}
      primaryHeadline={block.kannadaHeadline}
      primaryLang={localeTags.kn}
      secondaryHeadline={block.englishHeadline}
      secondaryLang={localeTags.en}
      subtitle={block.subtitle}
      cta={toCTA(block.cta, locale)}
      image={resolveImage(block.image, 'hero')}
      placeholderAlt={t.placeholder.photoAlt(profile.name ?? '')}
      placeholderLabel={t.placeholder.photo}
      illustrativeLabel={t.placeholder.illustrative}
    />
  )
}
