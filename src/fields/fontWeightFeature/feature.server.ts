import { createServerFeature } from '@payloadcms/richtext-lexical'

export const FontWeightFeature = createServerFeature({
  feature() {
    return {
      ClientFeature: '@/fields/fontWeightFeature/feature.client.tsx#default',
    }
  },
  key: 'fontWeight',
})
