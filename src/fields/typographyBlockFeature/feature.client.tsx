'use client'

import type { SlashMenuGroup, ToolbarGroup, ToolbarGroupItem } from '@payloadcms/richtext-lexical'
import { createClientFeature } from '@payloadcms/richtext-lexical/client'
import {
  $getSelection,
  $isRangeSelection,
  LexicalEditor,
} from '@payloadcms/richtext-lexical/lexical'
import { $setBlocksType } from '@payloadcms/richtext-lexical/lexical/selection'

import {
  $createTypographyBlockNode,
  $isTypographyBlockNode,
  TypographyBlockNode,
} from './nodes/TypographyBlockNode'
import type { TypographyBlockVariant } from './types'

function toggleTypographyBlock(editor: LexicalEditor, variant: TypographyBlockVariant) {
  editor.update(() => {
    const selection = $getSelection()
    if (!$isRangeSelection(selection)) return
    $setBlocksType(selection, () => $createTypographyBlockNode(variant))
  })
}

function isVariantActive(selection: unknown, variant: TypographyBlockVariant): boolean {
  if (!$isRangeSelection(selection)) return false
  const node = selection.getNodes()[0]
  const block = node.getTopLevelElementOrThrow?.() ?? node
  return $isTypographyBlockNode(block) && block.getVariant() === variant
}

// Small badge shown next to each item — mirrors Payload's "H1"/"H2" style
function VariantIcon({ text }: { text: string }) {
  return (
    <span
      style={{
        display: 'inline-block',
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: '0.02em',
        opacity: 0.7,
        minWidth: 20,
      }}
    >
      {text}
    </span>
  )
}

// Trigger icon for the dropdown button itself (S / L / D)
function GroupTriggerIcon({ text }: { text: string }) {
  return <span style={{ fontSize: 12, fontWeight: 700 }}>{text}</span>
}

function buildToolbarItems(
  variants: readonly TypographyBlockVariant[],
  labelPrefix: string,
): ToolbarGroupItem[] {
  return variants.map((variant, index) => ({
    key: `typographyBlock-${variant}`,
    label: `${labelPrefix} ${index + 1}`,
    ChildComponent: () => <VariantIcon text={variant.toUpperCase()} />,
    isActive: ({ selection }: { selection: unknown }) => isVariantActive(selection, variant),
    onSelect: ({ editor }: { editor: LexicalEditor }) => toggleTypographyBlock(editor, variant),
  }))
}

function buildSlashGroup(
  key: string,
  label: string,
  variants: readonly TypographyBlockVariant[],
  labelPrefix: string,
): SlashMenuGroup {
  return {
    key,
    label,
    items: variants.map((variant, index) => ({
      Icon: () => null,
      key: `typographyBlock-${variant}`,
      label: `${labelPrefix} ${index + 1}`,
      keywords: [variant, label.toLowerCase()],
      onSelect: ({ editor }: { editor: LexicalEditor }) => toggleTypographyBlock(editor, variant),
    })),
  }
}

const SUBHEADING_VARIANTS: TypographyBlockVariant[] = ['s1', 's2', 's3']
const LABEL_VARIANTS: TypographyBlockVariant[] = ['l1', 'l2', 'l3', 'l4', 'l5', 'l6', 'l7', 'l8']
const DISPLAY_VARIANTS: TypographyBlockVariant[] = ['d1', 'd2', 'd3', 'd4', 'd5']

const subHeadingGroup: ToolbarGroup = {
  type: 'dropdown',
  key: 'typographySubHeading',
  ChildComponent: () => <GroupTriggerIcon text="S" />,
  order: 20,
  items: buildToolbarItems(SUBHEADING_VARIANTS, 'Subheading'),
}

const labelGroup: ToolbarGroup = {
  type: 'dropdown',
  key: 'typographyLabel',
  ChildComponent: () => <GroupTriggerIcon text="L" />,
  order: 21,
  items: buildToolbarItems(LABEL_VARIANTS, 'Label'),
}

const displayGroup: ToolbarGroup = {
  type: 'dropdown',
  key: 'typographyDisplay',
  ChildComponent: () => <GroupTriggerIcon text="D" />,
  order: 22,
  items: buildToolbarItems(DISPLAY_VARIANTS, 'Display'),
}

export const TypographyBlockFeatureClient = createClientFeature({
  nodes: [TypographyBlockNode],
  toolbarFixed: { groups: [subHeadingGroup, labelGroup, displayGroup] },
  toolbarInline: { groups: [subHeadingGroup, labelGroup, displayGroup] },
  slashMenu: {
    groups: [
      buildSlashGroup('typography-subheading', 'Subheadings', SUBHEADING_VARIANTS, 'Subheading'),
      buildSlashGroup('typography-label', 'Labels', LABEL_VARIANTS, 'Label'),
      buildSlashGroup('typography-display', 'Display', DISPLAY_VARIANTS, 'Display'),
    ],
  },
})
