import type { Field, GroupField } from 'payload'

import deepMerge from '@/utilities/deepMerge'
import { LINKABLE_COLLECTIONS } from '@/utilities/routes'

export type LinkAppearances = 'filled' | 'outlined' | 'text' | 'tonal' | 'link-button'

export const appearanceOptions: Record<LinkAppearances, { label: string; value: string }> = {
  filled: {
    label: 'Filled',
    value: 'filled',
  },
  outlined: {
    label: 'Outlined',
    value: 'outlined',
  },
  text: {
    label: 'Text',
    value: 'text',
  },

  tonal: {
    label: 'Tonal',
    value: 'tonal',
  },
  'link-button': { label: 'Link button', value: 'link-button' },
}

type LinkType = (options?: {
  appearances?: LinkAppearances[] | false
  disableLabel?: boolean
  /** Lets editors leave the link empty (no label, document or URL). */
  optional?: boolean
  overrides?: Partial<GroupField>
}) => Field

export const link: LinkType = ({
  appearances,
  disableLabel = false,
  optional = false,
  overrides = {},
} = {}) => {
  const linkResult: GroupField = {
    name: 'link',
    type: 'group',
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'type',
            type: 'radio',
            admin: {
              layout: 'horizontal',
              width: '50%',
            },
            defaultValue: 'reference',
            options: [
              {
                label: 'Internal link',
                value: 'reference',
              },
              {
                label: 'Custom URL',
                value: 'custom',
              },
            ],
          },
          {
            name: 'newTab',
            type: 'checkbox',
            admin: {
              style: {
                alignSelf: 'flex-end',
              },
              width: '50%',
            },
            label: 'Open in new tab',
          },
        ],
      },
    ],
  }

  const linkTypes: Field[] = [
    {
      name: 'reference',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'reference',
      },
      label: 'Document to link to',
      relationTo: [...LINKABLE_COLLECTIONS],
      // Drafts can be picked; the frontend drops a link whose target is still a draft
      // (`resolveLink`), so nothing 404s.
      required: !optional,
    },
    {
      name: 'url',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'custom',
      },
      label: 'Custom URL',
      required: !optional,
    },
  ]

  if (!disableLabel) {
    const halfWidthLinkTypes = linkTypes.map((linkType) => ({
      ...linkType,
      admin: {
        ...linkType.admin,
        width: '50%',
      },
    })) as Field[]

    linkResult.fields.push({
      type: 'row',
      fields: [
        ...halfWidthLinkTypes,
        {
          name: 'label',
          type: 'text',
          admin: {
            width: '50%',
          },
          label: 'Label',
          // Kannada and English labels (the site's content is localized).
          localized: true,
          required: !optional,
        },
      ],
    })
  } else {
    linkResult.fields = [...linkResult.fields, ...linkTypes]
  }

  if (appearances !== false) {
    let appearanceOptionsToUse = [
      appearanceOptions.filled,
      appearanceOptions.outlined,
      appearanceOptions.text,
      appearanceOptions.tonal,
    ]

    if (appearances) {
      appearanceOptionsToUse = appearances.map((appearance) => appearanceOptions[appearance])
    }

    linkResult.fields.push({
      name: 'appearance',
      type: 'select',
      dbName: 'app',
      admin: {
        description: 'Choose how the link should be rendered.',
      },
      defaultValue: 'filled',
      options: appearanceOptionsToUse,
    })
  }

  return deepMerge(linkResult, overrides)
}
