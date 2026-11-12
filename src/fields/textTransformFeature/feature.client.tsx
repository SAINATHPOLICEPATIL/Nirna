'use client'

import type { ToolbarGroup, ToolbarGroupItem } from '@payloadcms/richtext-lexical'
import { createClientFeature } from '@payloadcms/richtext-lexical/client'
import { DropdownTransformPicker } from './components/DropdownTransformPicker'
import { TextTransformIcon } from './components/TextTransformIcon'
import { getCurrentTransformClass } from './utils/getCurrentTransformClass'

export const TextTransformFeatureClient = createClientFeature(() => {
  const textTransformItem: ToolbarGroupItem & {
    current?: () => string | null
  } = {
    key: 'textTransform',
    current() {
      return getCurrentTransformClass()
    },
  }

  const DropdownComponent: ToolbarGroup = {
    type: 'dropdown',
    ChildComponent: TextTransformIcon,
    items: [
      {
        Component: () => <DropdownTransformPicker item={textTransformItem} />,
        key: 'textTransform',
      },
    ],
    key: 'textTransformDropdown',
    order: 62, // After color (60) and weight (61)
  }

  return {
    toolbarFixed: {
      groups: [DropdownComponent],
    },
    toolbarInline: {
      groups: [DropdownComponent],
    },
  }
})

export default TextTransformFeatureClient
