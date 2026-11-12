import { createServerFeature } from '@payloadcms/richtext-lexical'

export const TextTransformFeature = createServerFeature({
  feature() {
    return {
      ClientFeature: '@/fields/textTransformFeature/feature.client.tsx#default',
    }
  },
  key: 'textTransform',
})
