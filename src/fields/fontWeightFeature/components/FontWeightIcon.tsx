'use client'

import React, { useState, useEffect } from 'react'
import { useLexicalComposerContext } from '@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext'
import { getCurrentWeightClass } from '../utils/getCurrentWeightClass'

export function FontWeightIcon() {
  const [editor] = useLexicalComposerContext()
  const [weightClass, setWeightClass] = useState<string | null>(null)

  // Read current selection's font weight class
  useEffect(
    () =>
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          const currentWeight = getCurrentWeightClass()
          setWeightClass(currentWeight)
        })
      }),
    [editor],
  )

  return (
    <div
      className="mt-1 flex w-full flex-col items-center justify-center"
      id="lexical-font-weight-icon"
      aria-label="Font weight"
    >
      {/* Bold "B" Icon */}
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="opacity-70 transition-opacity hover:opacity-90"
        aria-hidden="true"
      >
        <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
        <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
      </svg>

      {/* Weight indicator line (only show when a weight is selected) */}
      {weightClass && (
        <div
          className={`${weightClass} mt-0.5 h-0.5 w-5 rounded-sm`}
          aria-label={`Selected weight: ${weightClass}`}
        />
      )}
    </div>
  )
}
