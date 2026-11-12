import {
  $getSelection,
  $isRangeSelection,
  $isTextNode,
  $isElementNode,
  type TextNode,
  type ElementNode,
} from '@payloadcms/richtext-lexical/lexical'
import type { TextNodeStyles } from '@/fields/fontColorFeature/components/DropdownColorPicker'
import { defaultColors } from '@/components/RichText/utils/colorMappings'

/**
 * Gets the current text color class from the selection
 * Checks for:
 * 1. __textColorClass property on text nodes (for serialization compatibility)
 * 2. Parent span elements with className containing color classes
 */
export function getCurrentColorClass(): string | null {
  const selection = $getSelection()
  if (!$isRangeSelection(selection)) {
    return null
  }

  const nodes = selection.getNodes()

  for (const node of nodes) {
    if (!$isTextNode(node)) continue

    // Check for color class from node properties
    const colorFromNode = getColorClassFromNode(node)
    if (colorFromNode) return colorFromNode

    // Check parent span elements
    const colorFromParent = getColorClassFromParent(node)
    if (colorFromParent) return colorFromParent
  }

  return null
}

function getColorClassFromNode(node: TextNode): string | null {
  // Check detail property first (this is what serializes)
  const detail = node.getDetail()
  let textColorClass: string | null = null

  if (typeof detail === 'object' && detail !== null) {
    textColorClass = (detail as TextNodeStyles).__textColorClass || null
  }

  // Fallback to direct property (for immediate access)
  if (!textColorClass) {
    textColorClass = (node as unknown as TextNodeStyles).__textColorClass || null
  }

  if (!textColorClass) return null

  const colorOption = defaultColors.find((color) => color.textClass === textColorClass)
  return colorOption ? textColorClass : null
}

interface SpanElementNode extends ElementNode {
  getClassName?: () => string
}

function getColorClassFromParent(node: TextNode): string | null {
  const parent = node.getParent()

  if (!$isElementNode(parent) || parent.getType() !== 'span') {
    return null
  }

  const spanParent = parent as SpanElementNode
  const className = spanParent.getClassName?.() || ''
  if (!className) return null

  const colorOption = defaultColors.find(
    (color) => className === color.textClass || className.includes(color.textClass),
  )

  return colorOption ? colorOption.textClass : null
}
