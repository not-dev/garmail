import { IndentTextField } from '@atoms'
import { Box, Chip, ChipProps, RootRef, TextFieldProps } from '@material-ui/core'
import type { Theme } from '@material-ui/core/styles'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { unusedVars } from '@utils'
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
  sep?: string
  chips?: string[]
  onChangeChips?: (chips: string[]) => void
  onDelete?: (chip: string, index:number) => void
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
    sep = ',', chips: _chips = [],
    onChangeChips: _onChangeChips = () => undefined,
    onDelete: _onDelete = () => undefined,
    validate: _validate = () => undefined,
    muiChipProps,
    ...muiTextFieldProps
  } = props

  unusedVars(_onChangeChips, _onDelete, _validate)

  const [chips, setChips] = React.useState(_chips)

  const [input, setInput] = React.useState('')

  const refInput = React.useRef<HTMLInputElement>(null)
  const refChipBox = React.useRef<HTMLDivElement>(null)

  const [focus, setFocus] = React.useState(false)

  React.useEffect(() => {
    setIndent(refChipBox.current?.offsetWidth || 0)
    setHeight(refChipBox.current?.offsetHeight || 0)
  }, [chips])

  const isFirstLoad = React.useRef(true)

  React.useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false
    } else {
      props.onChangeChips && props.onChangeChips(chips)
    }
  }, [chips])

  return (
    <Box position='relative'>
      <IndentTextField inputRef={refInput} className={classes.chipText}
        value={input}
        onChange ={e => {
          const _input = e.target.value
          setInput(_input)
          if (_input.includes(sep)) {
            const [rest, ..._chips] = _input.split(sep).reverse()
            setInput(rest || '')
            setChips([...chips, ..._chips.filter(s => s.trim() && (s !== sep))])
          }
        }}
        indent={((indent !== 0) && (indent < (refInput.current?.offsetWidth || 0))) ? `${indent + 8}px` : 0}
        style={{
          paddingTop: (indent < (refInput.current?.offsetWidth || 0)) ? 0 : height
        }}
        onFocus={() => setFocus(true)}
        onBlur={() => {
          setFocus(false)
          const [..._chips] = input.split(sep).reverse()
          setInput('')
          setChips([...chips, ..._chips.filter(s => s.trim() && (s !== sep))])
        }}
        InputLabelProps={{
          shrink: focus || !!input || (chips.length > 0)
        }}
        onKeyDown={e => {
          if (e.key === 'Backspace' && (refInput?.current?.selectionStart === 0) && (chips.length > 0)) {
            e.preventDefault()
            const [end, ...rest] = chips.reverse()
            setChips(rest)
            props.onDelete && props.onDelete(end || '', chips.length - 1)
          }
        }}
        { ...muiTextFieldProps }
      />
      <RootRef rootRef={refChipBox}>
        <Box className={classes.chipBox}>
          {
            chips.map((chip, index) => {
              const invalid = (typeof props.validate !== 'undefined') ? !props.validate(chip) : false
              return (
                <Chip key={`${chip}-${index}`} className={clsx(classes.chip, invalid && classes.invalidChip)}
                  label={chip}
                  clickable
                  variant={invalid ? 'outlined' : 'default'}
                  onClick={() => {
                    console.log(chip)
                  }}
                  onDoubleClick={() => {
                    refInput.current?.focus()
                    setInput(chip)
                    setChips(chips.filter((_, i) => i !== index))
                    props.onDelete && props.onDelete(chip, index)
                  }}
                  onDelete={() => {
                    setChips(chips.filter((_, i) => i !== index))
                    props.onDelete && props.onDelete(chip, index)
                  }}
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
