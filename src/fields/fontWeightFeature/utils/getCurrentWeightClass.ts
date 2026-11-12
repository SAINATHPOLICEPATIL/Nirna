import {
  $getSelection,
  $isRangeSelection,
  $isTextNode,
  $isElementNode,
  type TextNode,
  type ElementNode,
} from '@payloadcms/richtext-lexical/lexical'
import { fontWeights } from '../weightMapping'
import type { TextNodeStyles } from '@/fields/fontColorFeature/components/DropdownColorPicker'

export function getCurrentWeightClass(): string | null {
  const selection = $getSelection()
  if (!$isRangeSelection(selection)) {
    return null
  }

  const nodes = selection.getNodes()

  for (const node of nodes) {
    if (!$isTextNode(node)) continue

    // Check for weight class from node properties
    const weightFromNode = getWeightClassFromNode(node)
    if (weightFromNode) return weightFromNode

    // Check parent span elements
    const weightFromParent = getWeightClassFromParent(node)
    if (weightFromParent) return weightFromParent
  }

  return null
}

function getWeightClassFromNode(node: TextNode): string | null {
  // Check detail property first (this is what serializes)
  const detail = node.getDetail()
  let textWeightClass: string | null = null

  if (typeof detail === 'object' && detail !== null) {
    textWeightClass = (detail as TextNodeStyles).__fontWeightClass || null
  }

  // Fallback to direct property (for immediate access)
  if (!textWeightClass) {
    textWeightClass = (node as unknown as TextNodeStyles).__fontWeightClass || null
  }

  if (!textWeightClass) return null

  const weightOption = fontWeights.find((weight) => weight.class === textWeightClass)
  return weightOption ? textWeightClass : null
}

interface SpanElementNode extends ElementNode {
  getClassName?: () => string
}

function getWeightClassFromParent(node: TextNode): string | null {
  const parent = node.getParent()

  if (!$isElementNode(parent) || parent.getType() !== 'span') {
    return null
  }

  const spanParent = parent as SpanElementNode
  const className = spanParent.getClassName?.() || ''
  if (!className) return null

  const weightOption = fontWeights.find(
    (weight) => className === weight.class || className.includes(weight.class),
  )

  return weightOption ? weightOption.class : null
}
