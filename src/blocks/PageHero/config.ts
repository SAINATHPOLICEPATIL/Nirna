import type { Block } from 'payload'

/** Banner at the top of inner pages (About, Village Map…): title, subtitle, photo, breadcrumb. */
export const PageHeroBlock: Block = {
  slug: 'pageHero',
  interfaceName: 'PageHeroBlock',
  labels: { singular: 'Page hero', plural: 'Page heroes' },
  fields: [
    { name: 'title', type: 'text', localized: true, required: true },
    { name: 'subtitle', type: 'text', localized: true },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Background photo. Use a genuine Nirna photo; other images are labelled "Illustrative".',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'showBreadcrumb',
          type: 'checkbox',
          defaultValue: true,
          admin: { width: '33%' },
        },
        {
          name: 'breadcrumbLabel',
          type: 'text',
          localized: true,
          admin: {
            width: '33%',
            description: 'Current page name in the breadcrumb. Defaults to the title.',
            condition: (_, sibling) => sibling?.showBreadcrumb !== false,
          },
        },
        {
          name: 'accentLine',
          type: 'checkbox',
          defaultValue: false,
          label: 'Gold line under the subtitle',
          admin: { width: '33%' },
        },
      ],
    },
  ],
}
