import type { SerializedElementNode, Spread } from '@payloadcms/richtext-lexical/lexical'

import type { DisplayVariant, LabelVariant, SubHeadingVariant } from '@/components/Typography'

export type TypographyBlockVariant = SubHeadingVariant | LabelVariant | DisplayVariant

export type SerializedTypographyBlockNode = Spread<
  {
    type: 'typographyBlock'
    variant: TypographyBlockVariant
    version: 1
  },
  SerializedElementNode
>
