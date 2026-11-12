import React from 'react'
import type { IconButtonProps } from './types'
import { useIconButtonState } from './hooks'

export const IconButton: React.FC<IconButtonProps> = (props) => {
  const { commonProps, icon } = useIconButtonState(props)

  return <button {...commonProps}>{icon}</button>
}
