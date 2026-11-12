'use client'

import type { ToolbarGroup, ToolbarGroupItem } from '@payloadcms/richtext-lexical'
import { createClientFeature } from '@payloadcms/richtext-lexical/client'
import { DropdownWeightPicker } from './components/DropdownWeightPicker'
import { FontWeightIcon } from './components/FontWeightIcon'
import { getCurrentWeightClass } from './utils/getCurrentWeightClass'

export const FontWeightFeatureClient = createClientFeature(() => {
  const fontWeightItem: ToolbarGroupItem & {
    current?: () => string | null
  } = {
    key: 'fontWeight',
    current() {
      return getCurrentWeightClass()
    },
  }

  const DropdownComponent: ToolbarGroup = {
    type: 'dropdown',
    ChildComponent: FontWeightIcon,
    items: [
      {
        Component: () => <DropdownWeightPicker item={fontWeightItem} />,
        key: 'fontWeight',
      },
    ],
    key: 'fontWeightDropdown',
    order: 61,
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

export default FontWeightFeatureClient
