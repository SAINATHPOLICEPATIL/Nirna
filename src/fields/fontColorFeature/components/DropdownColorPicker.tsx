'use client'

import { defaultColors } from '@/components/RichText/utils/colorMappings'
import { mergeStyles } from '@/components/RichText/utils/parseInlineStyles'
import type { ToolbarGroupItem } from '@payloadcms/richtext-lexical'
import {
  $createTextNode,
  $getSelection,
  $isRangeSelection,
  $isTextNode,
  type TextNode,
} from '@payloadcms/richtext-lexical/lexical'
import { useLexicalComposerContext } from '@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext'
import React, { useEffect, useState } from 'react'
import { ColorPicker } from './ColorPicker'

type Props = {
  item: ToolbarGroupItem & {
    current?: () => string | null
  }
}

export interface TextNodeStyles {
  __textColorClass?: string
  __fontWeightClass?: string
  __textTransformClass?: string
}

function getColorOption(textClass: string | null) {
  if (!textClass) return null
  return defaultColors.find((color) => color.textClass === textClass) || null
}

function createStyledNode(text: string, baseStyle: string, baseNode: TextNode) {
  const node = $createTextNode(text)
  node.setStyle(baseStyle)
  ;(node as TextNodeStyles).__textColorClass = (baseNode as TextNodeStyles).__textColorClass
  ;(node as TextNodeStyles).__fontWeightClass = (baseNode as TextNodeStyles).__fontWeightClass
  return node
}

interface ColorOption {
  textClass: string
  oklchValue: string
}

interface ColorContext {
  textClass: string | null
  colorOption: ColorOption | null
}

function applyColorToNode(node: TextNode, context: ColorContext) {
  const writableNode = node.getWritable()
  const nodeStyle = node.getStyle()

  if (context.textClass && context.colorOption) {
    const newStyle = mergeStyles(nodeStyle, { color: context.colorOption.oklchValue })
    writableNode.setStyle(newStyle)
    ;(writableNode as TextNodeStyles).__textColorClass = context.textClass
  } else {
    const newStyle = mergeStyles(nodeStyle, { color: null })
    writableNode.setStyle(newStyle)
    delete (writableNode as TextNodeStyles).__textColorClass
  }

  // Preserve font weight
  const fontWeightClass = (node as TextNodeStyles).__fontWeightClass
  if (fontWeightClass) {
    ;(writableNode as TextNodeStyles).__fontWeightClass = fontWeightClass
  }
}

function splitAndColorNode(
  node: TextNode,
  anchorOffset: number,
  focusOffset: number,
  context: ColorContext,
) {
  const nodeText = node.getTextContent()
  const nodeStyle = node.getStyle()

  const startOffset = Math.min(anchorOffset, focusOffset)
  const endOffset = Math.max(anchorOffset, focusOffset)

  const beforeText = nodeText.substring(0, startOffset)
  const selectedText = nodeText.substring(startOffset, endOffset)
  const afterText = nodeText.substring(endOffset)

  const nodesToInsert: ReturnType<typeof $createTextNode>[] = []

  if (beforeText) {
    nodesToInsert.push(createStyledNode(beforeText, nodeStyle, node))
  }

  if (selectedText) {
    const selectedNode = $createTextNode(selectedText)

    if (context.textClass && context.colorOption) {
      const newStyle = mergeStyles(nodeStyle, { color: context.colorOption.oklchValue })
      selectedNode.setStyle(newStyle)
      ;(selectedNode as TextNodeStyles).__textColorClass = context.textClass
    } else {
      const newStyle = mergeStyles(nodeStyle, { color: null })
      selectedNode.setStyle(newStyle)
    }

    // Preserve font weight
    const fontWeightClass = (node as TextNodeStyles).__fontWeightClass
    if (fontWeightClass) {
      ;(selectedNode as TextNodeStyles).__fontWeightClass = fontWeightClass
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

function applyTextColor(textClass: string | null) {
  const selection = $getSelection()
  if (!$isRangeSelection(selection)) return

  const colorOption = getColorOption(textClass)
  if (textClass && !colorOption) return

  const context: ColorContext = { textClass, colorOption }
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
        splitAndColorNode(node, anchorOffset, focusOffset, context)
      } else {
        applyColorToNode(node, context)
      }
    } else {
      // Node is fully selected
      applyColorToNode(node, context)
    }
  })
}

export const DropdownColorPicker: React.FC<Props> = ({ item }) => {
  const [editor] = useLexicalComposerContext()
  const [selectedColor, setSelectedColor] = useState<string>('')

  useEffect(
    () =>
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          const currentColor = item?.current?.() || null
          setSelectedColor(currentColor || '')
        })
      }),
    [editor, item],
  )

  const handleColorSelect = (textClass: string | null) => {
    editor.update(() => {
      applyTextColor(textClass)
      setSelectedColor(textClass || '')
    })
  }

  return <ColorPicker onColorSelect={handleColorSelect} selectedColor={selectedColor} />
}
