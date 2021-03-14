import { Box, Button, TextField } from '@material-ui/core'
import type { Theme } from '@material-ui/core/styles'
import { createStyles, makeStyles, styled } from '@material-ui/core/styles'
import type { Signature } from '@molecules'
import { ChipInputGrnMail, DeleteConfirm, SelectSignature } from '@molecules'
import React from 'react'

const Wrapper = styled('div')(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  flex: 1,
  padding: theme.spacing(1, 0)
}))

const InnerWrapper = styled('div')(({ theme }: { theme: Theme }) => ({
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
  body?: string,
  signature?: Signature['id']
}

type ConfigProps = {
  config: ConfigItem
  setConfig: (config: ConfigItem) => void
  handleDelete: () => void
  signatures: Signature[]
}

const Config: React.FC<ConfigProps> = (props) => {
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
    (key: 'signature', value: number | undefined): void
  }

  const [timer, setTimer] = React.useState(0)

  const handleOnChange: HandleOnChange = (key: string, value: string | string[] | number | undefined): void => {
    const newConfig = { ...config, [key]: value }
    setConfig(newConfig)
    window.clearTimeout(timer)
    const newTimer = window.setTimeout(() => {
      props.setConfig(newConfig)
    }, 900)
    setTimer(newTimer)
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
          <SelectSignature
            id={props.config.signature}
            setId={id => handleOnChange('signature', id)}
            signatures={props.signatures}
          />
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
