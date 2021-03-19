import { Box, Button, TextField } from '@material-ui/core'
import type { Theme } from '@material-ui/core/styles'
import { createStyles, makeStyles, styled } from '@material-ui/core/styles'
import { ChipInputGrnMail, DeleteConfirm, SelectForm } from '@molecules'
import React from 'react'

type Signature = { name: string, content: string } | undefined

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

type ConfigItem = Partial<{
  name: string
  to: string[]
  cc: string[]
  body: string,
  signature: Signature
}>

type ConfigProps = {
  config: ConfigItem
  setConfig: (config: ConfigProps['config']) => void
  handleDelete: () => void
  signatureList: Signature[]
}

const defaultConfig = {
  name: '',
  to: [],
  cc: [],
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

  // 親stateのrender抑制のためstate作成
  const [config, setConfig] = React.useState<ConfigItem & Required<Pick<ConfigItem, 'name'|'to'|'cc'|'body'>>>(defaultConfig)

  React.useEffect(() => {
    console.log('## Effect Config props.config')
    setConfig({ ...defaultConfig, ...props.config })
  }, [props.config])

  type HandleOnChange = {
    (key: 'name', value: string): void
    (key: 'to', value: string[]): void
    (key: 'cc', value: string[]): void
    (key: 'body', value: string): void
    (key: 'signature', value: Signature): void
  }

  const [timer, setTimer] = React.useState(0)

  const handleOnChange: HandleOnChange = (key: string, value: string | string[] | Signature): void => {
    const newConfig = { ...config, [key]: value }
    setConfig(newConfig)
    window.clearTimeout(timer)
    const newTimer = window.setTimeout(() => {
      props.setConfig(newConfig)
    }, 900)
    setTimer(newTimer)
  }

  const handleSelectForm = (name: string|undefined) => {
    const signature = props.signatureList.filter(s => (s?.name === name))[0]
    handleOnChange('signature', signature)
  }

  const signatureList = props.signatureList.map(s => s?.name)

  return (
    <React.Fragment>
      <Box className={classes.root}>
        <Wrapper>
          <TextField label='Template Name'
            value={config.name}
            onChange={e => handleOnChange('name', e.target.value)}
          />
        </Wrapper>
        <Wrapper className={classes.column}>
          <InnerWrapper>
            <ChipInputGrnMail label='to'
              fullWidth
              multiline
              rowsMax={4}
              chips={config.to}
              onChangeChips={(chips) => handleOnChange('to', chips)}
            />
          </InnerWrapper>
          <InnerWrapper>
            <ChipInputGrnMail label='cc'
              fullWidth
              multiline
              rowsMax={4}
              chips={config.cc}
              onChangeChips={(chips) => handleOnChange('cc', chips)}
            />
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
          <SelectForm<string|undefined>
            value={props.config.signature?.name}
            setValue={handleSelectForm}
            valueList={signatureList}
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
        message={`テンプレート「${config.name}」を削除します`}
      />
    </React.Fragment>
  )
}

export { Config }
export type { ConfigProps, ConfigItem, Signature }
