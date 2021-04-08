import type { TextFieldProps } from '@material-ui/core'
import { TextField } from '@material-ui/core'
import type { Theme } from '@material-ui/core/styles'
import { styled } from '@material-ui/core/styles'
import React from 'react'

type CSSTextIndent = number|string

const StyledTextField = styled(TextField)(({ theme, indent }: { theme: Theme, indent?: CSSTextIndent }) => ({
  '& .MuiInput-input': {
    textIndent: () => {
      if (typeof indent === 'string') {
        return indent
      } else if (typeof indent === 'number') {
        return `${theme.spacing(indent)}px`
      } else {
        return undefined
      }
    }
  }
}))

type IndentTextFieldProps = TextFieldProps & {
  indent?: CSSTextIndent
}

const IndentTextField:React.FC<IndentTextFieldProps> = (props) => {
  return (
    <StyledTextField
      {...props}
    />
  )
}

export { IndentTextField }
export type { IndentTextFieldProps }
