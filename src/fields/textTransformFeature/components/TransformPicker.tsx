'use client'

import React from 'react'
import { textTransforms } from '../transformMapping'

type Props = {
  onTransformSelect: (transformClass: string | null) => void
  selectedTransform?: string
}

type TransformOption = {
  class: string
  label: string
  description: string
}

const TransformButton = ({
  transform,
  isSelected,
  onClick,
}: {
  transform: TransformOption
  isSelected: boolean
  onClick: () => void
}) => (
  <button
    onClick={onClick}
    type="button"
    style={{
      width: '100%',
      padding: '10px 14px',
      fontSize: '14px',
      color: isSelected ? '#FF2727' : '#1f2937',
      backgroundColor: isSelected ? '#fff1f1' : 'transparent',
      border: isSelected ? '2px solid #FF2727' : '1px solid #e5e7eb',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'all 0.15s ease',
      outline: 'none',
      textAlign: 'left',
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
    }}
    onMouseEnter={(e) => {
      if (!isSelected) {
        e.currentTarget.style.backgroundColor = '#f9fafb'
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
    aria-label={`Select ${transform.label} transform`}
    aria-pressed={isSelected}
  >
    <TransformHeader label={transform.label} isSelected={isSelected} />
    <TransformDescription description={transform.description} />
  </button>
)

const TransformHeader = ({ label, isSelected }: { label: string; isSelected: boolean }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}
  >
    <span style={{ fontWeight: '500' }}>{label}</span>
    {isSelected && <CheckmarkIcon />}
  </div>
)

const TransformDescription = ({ description }: { description: string }) => (
  <span
    style={{
      fontSize: '12px',
      color: '#6b7280',
      fontWeight: '400',
    }}
  >
    {description}
  </span>
)

const CheckmarkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M13.3333 4L6 11.3333L2.66667 8"
      stroke="#FF2727"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const ClearButton = ({ onClick }: { onClick: React.MouseEventHandler<HTMLButtonElement> }) => {
  const clearButtonStyle = {
    width: '100%',
    padding: '10px 14px',
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
        paddingTop: '12px',
        borderTop: '1px solid #e5e7eb',
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
        aria-label="Clear text transform"
      >
        Clear Transform
      </button>
    </div>
  )
}

export const TransformPicker: React.FC<Props> = ({ onTransformSelect, selectedTransform }) => (
  <div
    style={{
      padding: '12px',
      minWidth: '200px',
      maxWidth: '240px',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
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
      }}
    >
      Text Transform
    </div>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        marginBottom: '12px',
      }}
    >
      {textTransforms.map((transform) => {
        const isSelected = selectedTransform === transform.class
        return (
          <TransformButton
            key={transform.class}
            transform={transform}
            isSelected={isSelected}
            onClick={() => onTransformSelect(transform.class)}
          />
        )
      })}
    </div>
    <ClearButton onClick={() => onTransformSelect(null)} />
  </div>
)
