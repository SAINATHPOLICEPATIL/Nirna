'use client'

import React, { useState, useEffect } from 'react'
import { useLexicalComposerContext } from '@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext'
import { getCurrentTransformClass } from '../utils/getCurrentTransformClass'

export function TextTransformIcon() {
  const [editor] = useLexicalComposerContext()
  const [transformClass, setTransformClass] = useState<string | null>(null)

  useEffect(
    () =>
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          const currentTransform = getCurrentTransformClass()
          setTransformClass(currentTransform)
        })
      }),
    [editor],
  )

  return (
    <div
      className="mt-1 flex w-full flex-col items-center justify-center"
      id="lexical-text-transform-icon"
      aria-label="Text transform"
    >
      {/* Aa Icon for text transform */}
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="opacity-70 transition-opacity hover:opacity-90"
      >
        {/* Capital A */}
        <path d="M4 20L8 7L12 20" />
        <path d="M5.5 15H10.5" />

        {/* Small a */}
        <circle cx="18" cy="15" r="3" />
        <path d="M21 12V20" />
      </svg>

      {/* Transform indicator line */}
      {transformClass && (
        <div
          className="bg-primary-600 mt-0.5 h-0.5 w-5 rounded-sm"
          aria-label={`Selected transform: ${transformClass}`}
        />
      )}
    </div>
  )
}
