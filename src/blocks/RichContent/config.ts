import type { Block } from 'payload'

import { enhancedLexical } from '@/fields/enhancedLexical'

/** Free-form text section for pages like About, Privacy policy, Terms. */
export const RichContentBlock: Block = {
  slug: 'richContent',
  interfaceName: 'RichContentBlock',
  labels: { singular: 'Text section', plural: 'Text sections' },
  fields: [{ name: 'content', type: 'richText', localized: true, editor: enhancedLexical }],
}
