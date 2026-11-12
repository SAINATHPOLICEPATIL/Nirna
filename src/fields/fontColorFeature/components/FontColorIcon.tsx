import React, { useState, useEffect } from 'react'
import { useLexicalComposerContext } from '@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext'
import { getCurrentColorClass } from '../utils/getCurrentColorClass'

export function FontColorIcon() {
  const [editor] = useLexicalComposerContext()
  const [textClass, setTextClass] = useState<string | null>(null)

  // Read current selection's color class
  useEffect(
    () =>
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          const currentColor = getCurrentColorClass()
          setTextClass(currentColor)
        })
      }),
    [editor],
  )

  return (
    <div
      className="mt-1 flex w-full flex-col items-center justify-center"
      id="lexical-font-color-icon"
      aria-label="Text color"
    >
      <svg
        width="22"
        height="20"
        viewBox="0 0 32 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 2H15M9 2V18" />

        <path d="M22 5C19 5 17 7.5 17 11C17 14.5 19 17 22 17C23.8 17 25 16.5 26 15.5" />
      </svg>

      {/* Color Indicator Line - only show when a color is selected */}
      {textClass && (
        <div
          className={`${textClass} mt-0.5 h-0.5 w-5 rounded-sm`}
          aria-label={`Selected color: ${textClass}`}
        />
      )}
    </div>
  )
}
