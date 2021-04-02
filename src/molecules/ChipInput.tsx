import { IndentTextField } from '@atoms'
import { Box, Chip, ChipProps, RootRef, TextFieldProps } from '@material-ui/core'
import type { Theme } from '@material-ui/core/styles'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import React from 'react'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chipBox: {
      position: 'absolute',
      top: theme.spacing(2),
      left: 0
    },
    chip: {
      margin: theme.spacing(0.5)
    },
    chipText: {
      '& .MuiInputLabel-root.MuiInputLabel-shrink + .MuiInput-root > .MuiInput-input': {
        lineHeight: '30px'
      }
    },
    invalidChip: {
      color: theme.palette.error.main,
      borderColor: theme.palette.error.main,
      '&:hover': {
        background: theme.palette.error.main
      },
      '& svg': {
        color: theme.palette.error.main,
        '&:hover': {
          color: theme.palette.error.dark
        }
      }
    }
  })
)

type ChipInputPureProps = {
  seps?: string[]
  chips: string[]
  setChips: (chips: string[]) => void
  validate?: (chip: string) => boolean
}

type muiTextFieldProps = Omit<TextFieldProps, keyof ChipInputPureProps>

type ChipInputProps = ChipInputPureProps & muiTextFieldProps & {
  muiChipProps?: ChipProps
}

const ChipInput:React.FC<ChipInputProps> = (props) => {
  const [indent, setIndent] = React.useState(0)
  const [height, setHeight] = React.useState(0)

  const classes = useStyles()

  const {
    seps = [',', '\n'], chips, setChips, validate,
    muiChipProps,
    ...muiTextFieldProps
  } = props

  const [input, setInput] = React.useState('')

  const refInput = React.useRef<HTMLInputElement>(null)
  const refChipBox = React.useRef<HTMLDivElement>(null)

  const [focus, setFocus] = React.useState(false)

  React.useEffect(() => {
    setIndent(refChipBox.current?.offsetWidth || 0)
    setHeight(refChipBox.current?.offsetHeight || 0)
  }, [chips])

  const handleChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const _input = e.target.value
    setInput(_input)
    if (seps.some(sep => _input.includes(sep))) {
      const [rest, ..._chips] = _input.split(new RegExp(`[${seps.join()}]`)).reverse()
      setInput(rest || '')
      setChips([...chips, ..._chips.filter(s => s.trim() && (seps.every(sep => s !== sep)))])
    }
  }

  const handleFocusInput = (): void => setFocus(true)
  const handleBlurInput = (): void => {
    setFocus(false)
    const [..._chips] = input.split(new RegExp(`[${seps.join()}]`)).reverse()
    setInput('')
    setChips([...chips, ..._chips.filter(s => s.trim() && (seps.every(sep => s !== sep)))])
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && (refInput?.current?.selectionStart === 0) && (chips.length > 0)) {
      e.preventDefault()
      const [, ...rest] = chips.reverse()
      setChips(rest)
    }
  }

  const shrink = focus || !!input || (chips.length > 0)

  const handleDoubleClickChip = (chip: typeof chips[0], index: number): void => {
    refInput.current?.focus()
    setInput(chip)
    setChips(chips.filter((_, i) => i !== index))
  }

  const handleDeleteChip = (index: number): void => {
    setChips(chips.filter((_, i) => i !== index))
  }

  return (
    <Box position='relative'>
      <IndentTextField inputRef={refInput} className={classes.chipText}
        value={input}
        onChange ={handleChangeInput}
        indent={((indent !== 0) && (indent < (refInput.current?.offsetWidth || 0))) ? `${indent + 8}px` : 0}
        style={{
          paddingTop: (indent < (refInput.current?.offsetWidth || 0)) ? 0 : height
        }}
        onFocus={handleFocusInput}
        onBlur={handleBlurInput}
        InputLabelProps={{
          shrink: shrink
        }}
        onKeyDown={handleKeyDown}
        { ...muiTextFieldProps }
      />
      <RootRef rootRef={refChipBox}>
        <Box className={classes.chipBox}>
          {
            chips.map((chip, index) => {
              const invalid = (typeof validate !== 'undefined') ? !validate(chip) : false
              const handleDoubleClick = (): void => handleDoubleClickChip(chip, index)
              const handleDelete = (): void => handleDeleteChip(index)
              return (
                <Chip key={`${chip}-${index}`} className={clsx(classes.chip, invalid && classes.invalidChip)}
                  label={chip}
                  clickable
                  variant={invalid ? 'outlined' : 'default'}
                  onDoubleClick={handleDoubleClick}
                  onDelete={handleDelete}
                  { ...muiChipProps }
                />
              )
            })
          }
        </Box>
      </RootRef>
    </Box>
  )
}

export { ChipInput }
export type { ChipInputProps }
