import { createServerFeature } from '@payloadcms/richtext-lexical'

export const FontColorFeature = createServerFeature({
  feature() {
    return {
      ClientFeature: '@/fields/fontColorFeature/feature.client.tsx#default',
    }
  },
  key: 'fontColor',
})
