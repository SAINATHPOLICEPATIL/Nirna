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
import { WeightPicker } from './WeightPicker'
import { fontWeights } from '../weightMapping'
import type { TextNodeStyles } from '@/fields/fontColorFeature/components/DropdownColorPicker'
import { mergeStyles } from '@/components/RichText/utils/parseInlineStyles'

type Props = {
  item: ToolbarGroupItem & {
    current?: () => string | null
  }
}

interface WeightOption {
  class: string
  value: string
}

interface WeightContext {
  weightClass: string | null
  weightOption: WeightOption | null
}

function getWeightOption(weightClass: string | null): WeightOption | null {
  if (!weightClass) return null
  return fontWeights.find((weight) => weight.class === weightClass) || null
}

function createStyledNode(text: string, baseStyle: string, baseNode: TextNode): TextNode {
  const node = $createTextNode(text)
  node.setStyle(baseStyle)
  ;(node as TextNodeStyles).__textColorClass = (baseNode as TextNodeStyles).__textColorClass
  ;(node as TextNodeStyles).__fontWeightClass = (baseNode as TextNodeStyles).__fontWeightClass
  return node
}

function applyWeightToNode(node: TextNode, context: WeightContext): void {
  const writableNode = node.getWritable()
  const nodeStyle = node.getStyle()

  if (context.weightClass && context.weightOption) {
    const newStyle = mergeStyles(nodeStyle, { 'font-weight': context.weightOption.value })
    writableNode.setStyle(newStyle)
    ;(writableNode as TextNodeStyles).__fontWeightClass = context.weightClass
  } else {
    const newStyle = mergeStyles(nodeStyle, { 'font-weight': null })
    writableNode.setStyle(newStyle)
    delete (writableNode as TextNodeStyles).__fontWeightClass
  }

  // Preserve text color
  const textColorClass = (node as TextNodeStyles).__textColorClass
  if (textColorClass) {
    ;(writableNode as TextNodeStyles).__textColorClass = textColorClass
  }
}

function splitAndApplyWeight(
  node: TextNode,
  anchorOffset: number,
  focusOffset: number,
  context: WeightContext,
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

    if (context.weightClass && context.weightOption) {
      const newStyle = mergeStyles(nodeStyle, { 'font-weight': context.weightOption.value })
      selectedNode.setStyle(newStyle)
      ;(selectedNode as TextNodeStyles).__fontWeightClass = context.weightClass
    } else {
      const newStyle = mergeStyles(nodeStyle, { 'font-weight': null })
      selectedNode.setStyle(newStyle)
    }

    // Preserve text color
    const textColorClass = (node as TextNodeStyles).__textColorClass
    if (textColorClass) {
      ;(selectedNode as TextNodeStyles).__textColorClass = textColorClass
    }

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

function applyFontWeight(weightClass: string | null): void {
  const selection = $getSelection()
  if (!$isRangeSelection(selection)) return

  const weightOption = getWeightOption(weightClass)
  if (weightClass && !weightOption) return

  const context: WeightContext = { weightClass, weightOption }
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
        splitAndApplyWeight(node, anchorOffset, focusOffset, context)
      } else {
        applyWeightToNode(node, context)
      }
    } else {
      // Node is fully selected
      applyWeightToNode(node, context)
    }
  })
}

export const DropdownWeightPicker: React.FC<Props> = ({ item }) => {
  const [editor] = useLexicalComposerContext()
  const [selectedWeight, setSelectedWeight] = useState<string>('')

  useEffect(
    () =>
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          const currentWeight = item?.current?.() || null
          setSelectedWeight(currentWeight || '')
        })
      }),
    [editor, item],
  )

  const handleWeightSelect = (weightClass: string | null) => {
    editor.update(() => {
      applyFontWeight(weightClass)
      setSelectedWeight(weightClass || '')
    })
  }

  return <WeightPicker onWeightSelect={handleWeightSelect} selectedWeight={selectedWeight} />
}
