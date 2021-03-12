
import { Box, Button, FormControl, InputLabel, Select, TextField } from '@material-ui/core'
import type { Theme } from '@material-ui/core/styles'
import { createStyles, makeStyles, styled } from '@material-ui/core/styles'
import { ChipInputGrnMail, DeleteConfirm } from '@molecules'
import React from 'react'

const Wrapper = styled('div')(({ theme }: {theme: Theme}) => ({
  display: 'flex',
  flex: 1,
  padding: theme.spacing(1, 0)
}))

const InnerWrapper = styled('div')(({ theme }: {theme: Theme}) => ({
  flex: 1,
  padding: theme.spacing(1, 0),
  marginRight: theme.spacing(1)
}))

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: 1,
      padding: theme.spacing(0, 2)
    },
    column: {
      flexDirection: 'column'
    },
    boxForm: {
      marginTop: theme.spacing(2)
    },
    action: {
      marginRight: theme.spacing(2),
      justifyContent: 'flex-end'
    },
    delete: {
      color: theme.palette.error.contrastText,
      background: theme.palette.error.main,
      transition: theme.transitions.create(['background'], {
        duration: theme.transitions.duration.standard,
        easing: theme.transitions.easing.easeOut
      }),
      '&:hover': {
        background: theme.palette.error.dark
      }
    }
  })
)

type ConfigItem = {
  name: string
  to?: string[]
  cc?: string[]
  body?: string
}

type ConfigProps = {
  config: ConfigItem
  setConfig: (config:ConfigItem) => void
  handleDelete: () => void
}

const Config:React.FC<ConfigProps> = (props) => {
  console.log('# Render Config')
  const classes = useStyles()

  const [confirm, setConfirm] = React.useState(false)

  const handleDelete = () => {
    setConfirm(true)
  }

  const [config, setConfig] = React.useState(props.config)

  React.useEffect(() => {
    console.log('## Effect Config props.config')
    setConfig(props.config)
  }, [props.config])

  type HandleOnChange = {
    (key: 'name', value: string): void
    (key: 'to', value: string[]): void
    (key: 'cc', value: string[]): void
    (key: 'body', value: string): void
  }

  const timer = React.useRef<number|undefined>(undefined)

  const handleOnChange:HandleOnChange = (key: string, value: string|string[]): void => {
    const newConfig = { ...config, [key]: value }
    setConfig(newConfig)
    window.clearTimeout(timer.current)
    const newTimer = window.setTimeout(() => {
      props.setConfig(newConfig)
    }, 900)
    timer.current = newTimer
  }

  return (
    <React.Fragment>
    <Box className={classes.root}>
      <Wrapper>
        <form noValidate autoComplete='off'>
          <TextField label='Template Name'
            value={config.name}
            onChange={e => handleOnChange('name', e.target.value)}
          />
        </form>
      </Wrapper>
      <Wrapper className={classes.column}>
        <InnerWrapper>
        <form noValidate autoComplete='off'>
          <ChipInputGrnMail label='to'
            fullWidth
            multiline
            rowsMax={4}
            chips={config.to}
            onChangeChips={(chips) => handleOnChange('to', chips)}
          />
        </form>
        </InnerWrapper>
        <InnerWrapper>
        <form noValidate autoComplete='off'>
          <ChipInputGrnMail label='cc'
            fullWidth
            multiline
            rowsMax={4}
            chips={config.cc}
            onChangeChips={(chips) => handleOnChange('cc', chips)}
          />
        </form>
        </InnerWrapper>
      </Wrapper>
      <Box mb={1}>
      <Wrapper>
        <TextField variant='outlined' label='body'
          fullWidth
          multiline
          rows={5}
          rowsMax={20}
          className={classes.boxForm}
          value={config.body}
          onChange={e => handleOnChange('body', e.target.value)}
        />
      </Wrapper>
      </Box>
      <Wrapper>
        <Box minWidth={120}>
          <FormControl fullWidth>
            <InputLabel id='signature-label' shrink>signature</InputLabel>
            <Select
              native
              label='signature'
              labelId='signature-label'
              value=''
            >
              <option value=''>None</option>
              <option value={10}>Ten</option>
              <option value={20}>Twenty</option>
              <option value={30}>Thirty</option>
            </Select>
          </FormControl>
        </Box>
      </Wrapper>
    <Wrapper className={classes.action}>
      <Button variant='contained' color='inherit'
        className={classes.delete}
        onClick={handleDelete}
        >
        DELETE
      </Button>
    </Wrapper>
    </Box>
    <DeleteConfirm
      open={confirm}
      onClose={() => {
        setConfirm(false)
      }}
      onClick={props.handleDelete}
      msg={`テンプレート「${config.name}」を削除します`}
    />
  </React.Fragment>
  )
}

export { Config }
export type { ConfigProps, ConfigItem }