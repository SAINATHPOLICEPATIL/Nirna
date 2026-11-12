'use client'

import { ColorOption, defaultColors } from '@/components/RichText/utils/colorMappings'
import React, { useMemo } from 'react'

type Props = {
  onColorSelect: (textClass: string | null) => void
  selectedColor?: string
}

const ColorSwitch = ({ color, isSelected }: { color: ColorOption; isSelected: boolean }) => (
  <div
    style={{
      width: '24px',
      height: '24px',
      borderRadius: '4px',
      border: '1px solid #d1d5db',
      backgroundColor: color.oklchValue,
      position: 'relative',
      boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    }}
  >
    {isSelected && (
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.9) 0, transparent 70%)',
        }}
      >
        <svg
          width="10"
          height="10"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 3L4.5 8.5L2 6"
            stroke="#FF2727"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    )}
  </div>
)
const ColorLabel = ({ color }: { color: ColorOption }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
    }}
  >
    <span
      style={{
        fontSize: '12px',
        fontWeight: 500,
        color: '#111827',
        textTransform: 'none',
      }}
    >
      {color.label}
    </span>
    <span
      style={{
        fontSize: '11px',
        color: '#6b7280',
      }}
    >
      {color.oklchValue}
    </span>
  </div>
)
const ClearButton = ({ onClick }: { onClick: React.MouseEventHandler<HTMLButtonElement> }) => {
  const clearButtonStyle = {
    width: '100%',
    padding: '8px 12px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#6b7280',
    backgroundColor: 'transparent',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    outline: 'none',
  }

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.color = '#1f2937'
    e.currentTarget.style.backgroundColor = '#f3f4f6'
    e.currentTarget.style.borderColor = '#d1d5db'
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.color = '#6b7280'
    e.currentTarget.style.backgroundColor = 'transparent'
    e.currentTarget.style.borderColor = '#e5e7eb'
  }

  const handleFocus = (e: React.FocusEvent<HTMLButtonElement>) => {
    e.currentTarget.style.outline = '2px solid rgba(255, 39, 39, 0.3)'
    e.currentTarget.style.outlineOffset = '2px'
  }

  const handleBlur = (e: React.FocusEvent<HTMLButtonElement>) => {
    e.currentTarget.style.outline = 'none'
  }

  return (
    <div
      style={{
        paddingTop: '10px',
        borderTop: '1px solid #e5e7eb',
        flexShrink: 0,
      }}
    >
      <button
        onClick={onClick}
        type="button"
        style={clearButtonStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        aria-label="Clear text color"
      >
        Clear Color
      </button>
    </div>
  )
}

export const ColorPicker: React.FC<Props> = ({ onColorSelect, selectedColor }) => {
  const colorList = useMemo(() => defaultColors, [])
  return (
    <div
      style={{
        padding: '16px',
        minWidth: '200px',
        maxWidth: '220px',
        height: '340px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          marginBottom: '12px',
          fontSize: '13px',
          fontWeight: '600',
          color: '#1f2937',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          flexShrink: 0,
        }}
      >
        Text Color
      </div>
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          paddingRight: '4px',
          marginBottom: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        {colorList.map((color) => {
          const isSelected = selectedColor === color.textClass
          return (
            <button
              key={color.label}
              onClick={() => onColorSelect(color.textClass)}
              type="button"
              style={{
                border: isSelected ? '2px solid #FF2727' : '1px solid #e5e7eb',
                backgroundColor: isSelected ? '#f3f4f6' : 'transparent',
                padding: '6px 8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                borderRadius: '6px',
                outline: 'none',
                transition: 'all 0.15s ease',
              }}
              title={`${color.label} (${color.oklchValue})`}
              aria-label={`Select ${color.label} color`}
              aria-pressed={isSelected}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.backgroundColor = '#f3f4f6'
                  e.currentTarget.style.borderColor = '#d1d5db'
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.borderColor = '#e5e7eb'
                }
              }}
              onFocus={(e) => {
                e.currentTarget.style.outline = '2px solid rgba(255, 39, 39, 0.3)'
                e.currentTarget.style.outlineOffset = '2px'
              }}
              onBlur={(e) => {
                e.currentTarget.style.outline = 'none'
              }}
            >
              <ColorSwitch color={color} isSelected={isSelected} />
              <ColorLabel color={color} />
            </button>
          )
        })}
      </div>

      <ClearButton onClick={() => onColorSelect(null)} />
    </div>
  )
}
