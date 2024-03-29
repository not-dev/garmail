import { IndentTextField } from '@components/atoms'
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
      left: 0,
      maxHeight: (props: { rowsMax: number }) => `${40 * props.rowsMax + 8}px`,
      width: '100%',
      overflow: 'scroll'
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
  const {
    seps = [',', '\n'], chips, setChips, validate,
    muiChipProps,
    ...muiTextFieldProps
  } = props

  const classes = useStyles({ rowsMax: (typeof muiTextFieldProps.rowsMax === 'number') ? muiTextFieldProps.rowsMax : parseInt(muiTextFieldProps.rowsMax || '3') })

  const [input, setInput] = React.useState('')

  const refInput = React.useRef<HTMLInputElement>(null)
  const refChipBox = React.useRef<HTMLDivElement>(null)

  const [width, setWidth] = React.useState(refChipBox.current?.offsetWidth || 0)
  const [height, setHeight] = React.useState(refChipBox.current?.offsetHeight || 0)

  const [maxWidth, setMaxWidth] = React.useState(refInput.current?.offsetWidth || 0)

  const [focus, setFocus] = React.useState(false)

  React.useEffect(() => {
    setWidth(refChipBox.current?.offsetWidth || 0)
    setHeight(refChipBox.current?.offsetHeight || 0)
    setMaxWidth(refInput.current?.offsetWidth || 0)
    console.log('iw', refInput.current?.offsetWidth)
    console.log('cw', refChipBox.current?.offsetWidth)
    console.log('ch', refChipBox.current?.offsetHeight)
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
    if (e.key === 'Enter') {
      e.preventDefault()
      handleBlurInput()
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
        fullWidth
        multiline
        value={input}
        onChange ={handleChangeInput}
        indent={((width !== 0) && (width < maxWidth)) ? `${width + 8}px` : 0}
        style={{
          paddingTop: (width < maxWidth) ? 0 : height
        }}
        onFocus={handleFocusInput}
        onBlur={handleBlurInput}
        InputLabelProps={{
          shrink: shrink
        }}
        onKeyDown={handleKeyDown}
        { ...muiTextFieldProps }
      />
      {
        (chips.length > 0) &&
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
      }
    </Box>
  )
}

export { ChipInput }
export type { ChipInputProps }
