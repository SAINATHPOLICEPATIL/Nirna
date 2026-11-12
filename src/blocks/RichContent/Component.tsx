import { RichText } from '@/components/RichText'
import { Container } from '@/components/shared/Container'
import type { RichContentBlock as RichContentBlockProps } from '@/payload-types'

import type { BlockContext } from '../shared'

export function RichContentBlockComponent({
  block,
  locale,
}: { block: RichContentBlockProps } & BlockContext) {
  if (!block.content) return null
  return (
    <Container className="py-10 sm:py-14">
      <RichText data={block.content} locale={locale} enableGutter={false} className="max-w-3xl" />
    </Container>
  )
}
