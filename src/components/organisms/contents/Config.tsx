import { ChipInputGrnMail, DeleteConfirm } from '@components/molecules'
import { Box, Button, TextField } from '@material-ui/core'
import type { Theme } from '@material-ui/core/styles'
import { createStyles, makeStyles, styled } from '@material-ui/core/styles'
import React from 'react'

const Wrapper = styled(Box)(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  flex: 1,
  padding: theme.spacing(1, 0)
}))

const InnerWrapper = styled(Box)(({ theme }: { theme: Theme }) => ({
  flex: 1,
  padding: theme.spacing(1, 0)
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

type ConfigItem = Partial<{
  to: string[]
  cc: string[]
  subject: string,
  body: string
}>

type ConfigProps = {
  config: ConfigItem
  setConfig: (config: ConfigProps['config']) => void
  handleDelete: () => void
  text: {
    label: {
      to: string,
      cc: string,
      subject: string,
      body: string
    },
    deleteConfirm: {
      title: string,
      message: string
    },
    button: {
      delete: string
    }
  }
}

const defaultConfig = {
  to: [],
  cc: [],
  subject: '',
  body: '',
  signature: undefined
}

const Config: React.FC<ConfigProps> = (props) => {
  console.log('# Render Config')
  const classes = useStyles()

  const [confirm, setConfirm] = React.useState(false)

  const handleDelete = () => {
    setConfirm(true)
  }

  const onCloseConfirm = (): void => {
    setConfirm(false)
  }

  // 親stateのrender抑制のためstate作成
  const [config, setConfig] = React.useState<ConfigItem & Required<Pick<ConfigItem, 'to'|'cc'|'subject'|'body'>>>(defaultConfig)

  React.useEffect(() => {
    console.log('## Effect Config props.config')
    setConfig({ ...defaultConfig, ...props.config })
  }, [props.config])

  type HandleOnChange = {
    (key: 'to', value: string[]): void
    (key: 'cc', value: string[]): void
    (key: 'subject', value: string): void
    (key: 'body', value: string): void
  }

  const [timer, setTimer] = React.useState(0)

  const handleOnChange: HandleOnChange = (key: string, value: string | string[]): void => {
    const newConfig = { ...config, [key]: value }
    setConfig(newConfig)
    window.clearTimeout(timer)
    const newTimer = window.setTimeout(() => {
      props.setConfig(newConfig)
    }, 900)
    setTimer(newTimer)
  }

  const setState = {
    to: (chips: typeof config.to): void => handleOnChange('to', chips),
    cc: (chips: typeof config.cc): void => handleOnChange('cc', chips),
    subject: (e: React.ChangeEvent<HTMLTextAreaElement>): void => handleOnChange('subject', e.target.value),
    body: (e: React.ChangeEvent<HTMLTextAreaElement>): void => handleOnChange('body', e.target.value)
  }

  return (
    <React.Fragment>
      <Box className={classes.root}>
        <Wrapper className={classes.column} mb={2}>
          <InnerWrapper>
            <ChipInputGrnMail label={props.text.label.to}
              chips={config.to}
              setChips={setState.to}
            />
          </InnerWrapper>
          <InnerWrapper>
            <ChipInputGrnMail label={props.text.label.cc}
              chips={config.cc}
              setChips={setState.cc}
            />
          </InnerWrapper>
        </Wrapper>
        <Wrapper>
          <TextField variant='outlined' label={props.text.label.subject}
            fullWidth
            value={config.subject}
            onChange={setState.subject}
          />
        </Wrapper>
        <Box mb={1}>
          <Wrapper>
            <TextField variant='outlined' label={props.text.label.body}
              fullWidth
              multiline
              rows={5}
              rowsMax={15}
              className={classes.boxForm}
              value={config.body}
              onChange={setState.body}
            />
          </Wrapper>
        </Box>
        <Wrapper className={classes.action}>
          <Button variant='contained' color='inherit'
            className={classes.delete}
            onClick={handleDelete}
          >
            {props.text.button.delete}
      </Button>
        </Wrapper>
      </Box>
      <DeleteConfirm
        open={confirm}
        onClose={onCloseConfirm}
        onClick={props.handleDelete}
        title={props.text.deleteConfirm.title}
        message={props.text.deleteConfirm.message}
      />
    </React.Fragment>
  )
}

export { Config }
export type { ConfigProps, ConfigItem }
