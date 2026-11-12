'use client'

import type { ToolbarGroup, ToolbarGroupItem } from '@payloadcms/richtext-lexical'
import { createClientFeature } from '@payloadcms/richtext-lexical/client'
import { DropdownColorPicker } from './components/DropdownColorPicker'
import { FontColorIcon } from './components/FontColorIcon'
import { getCurrentColorClass } from './utils/getCurrentColorClass'

export const FontColorFeatureClient = createClientFeature(() => {
  // Create the item with current() function that will be shared between ChildComponent and Component
  const fontColorItem: ToolbarGroupItem & {
    current?: () => string | null
  } = {
    key: 'fontColor',
    current() {
      // Get current color class from selection
      return getCurrentColorClass()
    },
  }

  const DropdownComponent: ToolbarGroup = {
    type: 'dropdown',
    ChildComponent: FontColorIcon,
    items: [
      {
        Component: () => <DropdownColorPicker item={fontColorItem} />,
        key: 'fontColor',
      },
    ],
    key: 'fontColorDropdown',
    order: 60,
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

export default FontColorFeatureClient
