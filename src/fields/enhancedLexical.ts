import { LINKABLE_COLLECTIONS } from '@/utilities/routes'
import {
  AlignFeature,
  FixedToolbarFeature,
  HeadingFeature,
  IndentFeature,
  InlineToolbarFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  UnorderedListFeature,
  type LinkFields,
} from '@payloadcms/richtext-lexical'
import type { TextFieldSingleValidation } from 'payload'
import { FontColorFeature } from './fontColorFeature/feature.server'
import { FontWeightFeature } from './fontWeightFeature/feature.server'
import { TextTransformFeature } from './textTransformFeature/feature.server'
import { TypographyBlockFeature } from './typographyBlockFeature/feature.server'

export const enhancedLexical = lexicalEditor({
  features: [
    // Core paragraph
    ParagraphFeature(),

    // Heading structure
    HeadingFeature({
      enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5'],
    }),
    ItalicFeature(),
    // Text alignment and indentation
    AlignFeature(),
    IndentFeature(),

    TypographyBlockFeature(),

    // Lists
    UnorderedListFeature(),
    OrderedListFeature(),

    // Link feature with custom URL validation
    LinkFeature({
      enabledCollections: [...LINKABLE_COLLECTIONS],
      fields: ({ defaultFields }) => {
        const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
          if ('name' in field && field.name === 'url') return false
          return true
        })

        return [
          ...defaultFieldsWithoutUrl,
          {
            name: 'url',
            type: 'text',
            admin: {
              condition: (_data, siblingData) => siblingData?.linkType !== 'internal',
            },
            label: ({ t }) => t('fields:enterURL'),
            required: true,
            validate: ((value, options) => {
              if ((options?.siblingData as LinkFields)?.linkType === 'internal') {
                return true // no validation needed, as no url should exist for internal links
              }
              return value ? true : 'URL is required'
            }) as TextFieldSingleValidation,
          },
        ]
      },
    }),

    //Colors
    FontColorFeature(),
    FontWeightFeature(),
    TextTransformFeature(),

    // Toolbar configurations
    FixedToolbarFeature(),
    InlineToolbarFeature(),
  ],
})
