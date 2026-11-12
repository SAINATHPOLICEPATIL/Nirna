'use client'

import React, { useState, useEffect } from 'react'
import { useLexicalComposerContext } from '@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext'
import type { ToolbarGroupItem } from '@payloadcms/richtext-lexical'
import {
  $getSelection,
  $isRangeSelection,
  $isTextNode,
  $createTextNode,
  type TextNode,
} from '@payloadcms/richtext-lexical/lexical'
import { TransformPicker } from './TransformPicker'
import { textTransforms } from '../transformMapping'
import type { TextNodeStyles } from '@/fields/fontColorFeature/components/DropdownColorPicker'
import { mergeStyles } from '@/components/RichText/utils/parseInlineStyles'

type Props = {
  item: ToolbarGroupItem & {
    current?: () => string | null
  }
}

interface TransformOption {
  class: string
}

interface TransformContext {
  transformClass: string | null
  transformOption: TransformOption | null
}

function getTransformOption(transformClass: string | null): TransformOption | null {
  if (!transformClass) return null
  return textTransforms.find((t) => t.class === transformClass) || null
}

function getCssTransformValue(transformClass: string): string {
  return transformClass === 'normal-case' ? 'none' : transformClass
}

function createStyledNode(text: string, baseStyle: string, baseNode: TextNode): TextNode {
  const node = $createTextNode(text)
  node.setStyle(baseStyle)
  ;(node as TextNodeStyles).__textColorClass = (baseNode as TextNodeStyles).__textColorClass
  ;(node as TextNodeStyles).__fontWeightClass = (baseNode as TextNodeStyles).__fontWeightClass
  ;(node as TextNodeStyles).__textTransformClass = (baseNode as TextNodeStyles).__textTransformClass
  return node
}

function preserveNodeStyles(targetNode: TextNode, sourceNode: TextNode): void {
  const textColorClass = (sourceNode as TextNodeStyles).__textColorClass
  if (textColorClass) {
    ;(targetNode as TextNodeStyles).__textColorClass = textColorClass
  }

  const fontWeightClass = (sourceNode as TextNodeStyles).__fontWeightClass
  if (fontWeightClass) {
    ;(targetNode as TextNodeStyles).__fontWeightClass = fontWeightClass
  }
}

function applyTransformToNode(node: TextNode, context: TransformContext): void {
  const writableNode = node.getWritable()
  const nodeStyle = node.getStyle()

  if (context.transformClass && context.transformOption) {
    const cssTransform = getCssTransformValue(context.transformClass)
    const newStyle = mergeStyles(nodeStyle, { 'text-transform': cssTransform })
    writableNode.setStyle(newStyle)
    ;(writableNode as TextNodeStyles).__textTransformClass = context.transformClass
  } else {
    const newStyle = mergeStyles(nodeStyle, { 'text-transform': null })
    writableNode.setStyle(newStyle)
    delete (writableNode as TextNodeStyles).__textTransformClass
  }

  // Preserve other styles
  preserveNodeStyles(writableNode, node)
}

function splitAndApplyTransform(
  node: TextNode,
  anchorOffset: number,
  focusOffset: number,
  context: TransformContext,
): void {
  const nodeText = node.getTextContent()
  const nodeStyle = node.getStyle()

  const startOffset = Math.min(anchorOffset, focusOffset)
  const endOffset = Math.max(anchorOffset, focusOffset)

  const beforeText = nodeText.substring(0, startOffset)
  const selectedText = nodeText.substring(startOffset, endOffset)
  const afterText = nodeText.substring(endOffset)

  const nodesToInsert: TextNode[] = []

  if (beforeText) {
    nodesToInsert.push(createStyledNode(beforeText, nodeStyle, node))
  }

  if (selectedText) {
    const selectedNode = $createTextNode(selectedText)

    if (context.transformClass && context.transformOption) {
      const cssTransform = getCssTransformValue(context.transformClass)
      const newStyle = mergeStyles(nodeStyle, { 'text-transform': cssTransform })
      selectedNode.setStyle(newStyle)
      ;(selectedNode as TextNodeStyles).__textTransformClass = context.transformClass
    } else {
      const newStyle = mergeStyles(nodeStyle, { 'text-transform': null })
      selectedNode.setStyle(newStyle)
    }

    // Preserve other styles
    preserveNodeStyles(selectedNode, node)

    nodesToInsert.push(selectedNode)
  }

  if (afterText) {
    nodesToInsert.push(createStyledNode(afterText, nodeStyle, node))
  }

  if (nodesToInsert.length > 0) {
    const firstNode = nodesToInsert[0]
    node.replace(firstNode)

    let previousNode = firstNode
    for (let i = 1; i < nodesToInsert.length; i++) {
      previousNode.insertAfter(nodesToInsert[i])
      previousNode = nodesToInsert[i]
    }
  }
}

/**
 * Apply text transform - preserves other inline styles
 */
function applyTextTransform(transformClass: string | null): void {
  const selection = $getSelection()
  if (!$isRangeSelection(selection)) return

  const transformOption = getTransformOption(transformClass)
  if (transformClass && !transformOption) return

  const context: TransformContext = { transformClass, transformOption }
  const { anchor, focus } = selection
  const nodes = selection.getNodes()

  nodes.forEach((node) => {
    if (!$isTextNode(node)) return

    const nodeKey = node.getKey()
    const nodeText = node.getTextContent()
    const isAnchorInNode = anchor.key === nodeKey
    const isFocusInNode = focus.key === nodeKey

    // Handle partial selection within the node
    if (isAnchorInNode || isFocusInNode) {
      const anchorOffset = isAnchorInNode ? anchor.offset : 0
      const focusOffset = isFocusInNode ? focus.offset : nodeText.length
      const startOffset = Math.min(anchorOffset, focusOffset)
      const endOffset = Math.max(anchorOffset, focusOffset)

      const isPartialSelection = startOffset > 0 || endOffset < nodeText.length

      if (isPartialSelection) {
        splitAndApplyTransform(node, anchorOffset, focusOffset, context)
      } else {
        applyTransformToNode(node, context)
      }
    } else {
      // Node is fully selected
      applyTransformToNode(node, context)
    }
  })
}

export const DropdownTransformPicker: React.FC<Props> = ({ item }) => {
  const [editor] = useLexicalComposerContext()
  const [selectedTransform, setSelectedTransform] = useState<string>('')

  useEffect(
    () =>
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          const currentTransform = item?.current?.() || null
          setSelectedTransform(currentTransform || '')
        })
      }),
    [editor, item],
  )

  const handleTransformSelect = (transformClass: string | null) => {
    editor.update(() => {
      applyTextTransform(transformClass)
      setSelectedTransform(transformClass || '')
    })
  }

  return (
    <TransformPicker
      onTransformSelect={handleTransformSelect}
      selectedTransform={selectedTransform}
    />
  )
}
