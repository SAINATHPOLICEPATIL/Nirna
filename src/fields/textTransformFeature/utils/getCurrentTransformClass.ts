import {
  $getSelection,
  $isRangeSelection,
  $isTextNode,
  $isElementNode,
  type TextNode,
  type ElementNode,
} from '@payloadcms/richtext-lexical/lexical'
import { textTransforms } from '../transformMapping'
import type { TextNodeStyles } from '@/fields/fontColorFeature/components/DropdownColorPicker'

export function getCurrentTransformClass(): string | null {
  const selection = $getSelection()
  if (!$isRangeSelection(selection)) {
    return null
  }

  const nodes = selection.getNodes()

  for (const node of nodes) {
    if (!$isTextNode(node)) continue

    // Check for transform class from node properties
    const transformFromNode = getTransformClassFromNode(node)
    if (transformFromNode) return transformFromNode

    // Check parent span elements
    const transformFromParent = getTransformClassFromParent(node)
    if (transformFromParent) return transformFromParent
  }

  return null
}

function getTransformClassFromNode(node: TextNode): string | null {
  // Check detail property (serialized)
  const detail = node.getDetail()
  let textTransformClass: string | null = null

  if (typeof detail === 'object' && detail !== null) {
    textTransformClass = (detail as TextNodeStyles).__textTransformClass || null
  }

  // Fallback to direct property
  if (!textTransformClass) {
    textTransformClass = (node as unknown as TextNodeStyles).__textTransformClass || null
  }

  if (!textTransformClass) return null

  const transformOption = textTransforms.find((t) => t.class === textTransformClass)
  return transformOption ? textTransformClass : null
}

interface SpanElementNode extends ElementNode {
  getClassName?: () => string
}

function getTransformClassFromParent(node: TextNode): string | null {
  const parent = node.getParent()

  if (!$isElementNode(parent) || parent.getType() !== 'span') {
    return null
  }

  const spanParent = parent as SpanElementNode
  const className = spanParent.getClassName?.() || ''
  if (!className) return null

  const transformOption = textTransforms.find(
    (t) => className === t.class || className.includes(t.class),
  )

  return transformOption ? transformOption.class : null
}
