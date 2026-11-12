import type {
  DOMConversionMap,
  DOMExportOutput,
  EditorConfig,
  LexicalNode,
  ParagraphNode,
  RangeSelection,
} from '@payloadcms/richtext-lexical/lexical'

import { TYPOGRAPHY_TOKENS } from '@/components/Typography/constants'
import {
  $applyNodeReplacement,
  $createParagraphNode,
  ElementNode,
} from '@payloadcms/richtext-lexical/lexical'
import type { SerializedTypographyBlockNode, TypographyBlockVariant } from '../types'

export class TypographyBlockNode extends ElementNode {
  __variant: TypographyBlockVariant

  constructor(variant: TypographyBlockVariant, key?: string) {
    super(key)
    this.__variant = variant
  }

  static getType(): string {
    return 'typographyBlock'
  }

  static clone(node: TypographyBlockNode): TypographyBlockNode {
    return new TypographyBlockNode(node.__variant, node.__key)
  }

  getVariant(): TypographyBlockVariant {
    return this.getLatest().__variant
  }

  setVariant(variant: TypographyBlockVariant): void {
    const writable = this.getWritable()
    writable.__variant = variant
  }

  createDOM(_config: EditorConfig): HTMLElement {
    const element = document.createElement('div')
    element.setAttribute('data-typography-variant', this.__variant)
    element.className = TYPOGRAPHY_TOKENS[this.__variant].classes
    return element
  }

  updateDOM(prevNode: TypographyBlockNode, dom: HTMLElement): boolean {
    if (prevNode.__variant !== this.__variant) {
      dom.setAttribute('data-typography-variant', this.__variant)
      dom.className = TYPOGRAPHY_TOKENS[this.__variant].classes
      return true
    }
    return false
  }

  static importDOM(): DOMConversionMap | null {
    return null
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement('div')
    element.setAttribute('data-typography-variant', this.__variant)
    return { element }
  }

  static importJSON(serializedNode: SerializedTypographyBlockNode): TypographyBlockNode {
    return $createTypographyBlockNode(serializedNode.variant)
  }

  exportJSON(): SerializedTypographyBlockNode {
    return {
      ...super.exportJSON(),
      type: 'typographyBlock',
      variant: this.__variant,
      version: 1,
    }
  }

  insertNewAfter(_selection?: RangeSelection, restoreSelection = true): ParagraphNode {
    const newParagraph = $createParagraphNode()
    const direction = this.getDirection()
    newParagraph.setDirection(direction)
    this.insertAfter(newParagraph, restoreSelection)
    return newParagraph
  }

  collapseAtStart(): boolean {
    return false
  }

  isShadowRoot(): boolean {
    return false
  }
}

export function $createTypographyBlockNode(variant: TypographyBlockVariant): TypographyBlockNode {
  return $applyNodeReplacement(new TypographyBlockNode(variant))
}

export function $isTypographyBlockNode(
  node: LexicalNode | null | undefined,
): node is TypographyBlockNode {
  return node instanceof TypographyBlockNode
}
