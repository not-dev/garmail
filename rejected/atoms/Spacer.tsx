import type { BoxProps } from '@material-ui/core'
import { Box } from '@material-ui/core'
import React from 'react'

type SpacerProps = BoxProps & {
  spacing?: number
  s?: number
}

const Spacer: React.FC<SpacerProps> = ({ spacing, s, children, ...props }) => {
  return (
    <Box mt={spacing || s || 10} { ...props }>
      { children }
    </Box>
  )
}

export { Spacer }
export type { SpacerProps }
