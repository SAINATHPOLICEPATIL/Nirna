import { createNode, createServerFeature } from '@payloadcms/richtext-lexical'

import { TypographyBlockNode } from './nodes/TypographyBlockNode'

export const TypographyBlockFeature = createServerFeature({
  key: 'typographyBlock',

  feature: {
    ClientFeature: '@/fields/typographyBlockFeature/feature.client#TypographyBlockFeatureClient',

    nodes: [
      createNode({
        node: TypographyBlockNode,

        converters: {
          html: {
            converter: ({ node }) => {
              const variant = (node as { variant?: string }).variant ?? 'label'

              return `<div data-typography-variant="${variant}"></div>`
            },

            nodeTypes: [TypographyBlockNode.getType()],
          },
        },
      }),
    ],
  },
})
