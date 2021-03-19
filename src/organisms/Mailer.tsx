
import type { HttpResponse } from '@api'
import { validateGrn } from '@api/garoon'
import type { AlertSnackbarProps } from '@atoms'
import { AlertSnackbar } from '@atoms'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@material-ui/core'
import type { Theme } from '@material-ui/core/styles'
import { createStyles, makeStyles, styled } from '@material-ui/core/styles'
import { ChipInputGrnMail } from '@molecules'
import type { ConfigItem } from '@organisms'
import { sleep } from '@utils'
import React from 'react'

const Wrapper = styled('div')(({ theme }: {theme: Theme}) => ({
  display: 'flex',
  padding: theme.spacing(2)
}))

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    title: {
      paddingBottom: theme.spacing(0)
    },
    content: {
      padding: theme.spacing(0, 3)
    },
    action: {
      marginRight: theme.spacing(4),
      padding: theme.spacing(2, 1)
    }
  })
)

type MailerProps = {
  config: Omit<ConfigItem, 'name'>
  open: boolean
  onClose: () => void
}

const isNotEmpty = <T, >(v: T):v is Extract<T, Exclude<T, undefined|null>> => {
  if ((typeof v === 'undefined') || (v == null)) {
    return false
  } else if (typeof v === 'string') {
    return (v.trim() !== '')
  } else if (Array.isArray(v)) {
    if (v.length > 0) {
      return v.map(s => isNotEmpty(s)).some(t => t)
    } else {
      return false
    }
  } else if (typeof v === 'object') {
    return (Object.keys(v).length !== 0)
  } else {
    return true
  }
}

const Mailer:React.FC<MailerProps> = (props) => {
  console.log('# Render Mailer')
  const classes = useStyles()

  /** メールは独自State */
  const [to, setTo] = React.useState(props.config.to)
  const [cc, setCc] = React.useState(props.config.cc)
  const [body, setBody] = React.useState(props.config.body)

  const update = ({ to, cc, body }: { to?: string[], cc?:string[], body?: string }):void => {
    if (typeof to !== 'undefined') {
      setTo(to)
    }
    if (typeof cc !== 'undefined') {
      setCc(cc)
    }
    if (typeof body !== 'undefined') {
      setBody(body)
    }
  }

  React.useEffect(() => {
    console.log('## Effect Mailer props.config')
    update(props.config)
  }, [props.config])

  const validateTo = (): boolean => {
    if (isNotEmpty(to)) {
      const isValid = to.map((s) => validateGrn(s)).every(valid => valid)
      return isValid
    } else {
      return false
    }
  }

  const validateCc = ():boolean => {
    if (typeof cc === 'undefined') {
      return true
    } else {
      const isValid = cc.map((s) => validateGrn(s)).every(valid => valid)
      return isValid
    }
  }

  const [pending, setPending] = React.useState<AlertSnackbarProps>({
    open: false
  })
  const [result, setResult] = React.useState<AlertSnackbarProps>({
    open: false
  })

  const send = async ({ to, cc, body }: { to:string[], cc?:string[], body?:string }):Promise<HttpResponse> => {
    await sleep(5)
    console.log({ to, cc, body })
    const res = {
      statusCode: 200,
      body: {}
    }
    return res
  }

  const handleSend = async () => {
    const params = {
      to: to || [],
      cc,
      body
    }
    props.onClose()

    setPending({
      severity: 'info',
      message: '送信中'
    })

    const timeout = (ms: number):Promise<HttpResponse> => new Promise((resolve) => {
      window.setTimeout(() => { resolve({ statusCode: 408, body: {} }) }, ms)
    })
    const res = await Promise.race([send(params), timeout(30000)])

    if ((res.statusCode === 200)) {
      setResult({
        severity: 'success',
        message: '完了'
      })
    } else if ((res.statusCode === 408)) {
      setResult({
        severity: 'error',
        message: 'タイムアウト'
      })
    } else {
      setResult({
        severity: 'error',
        message: 'エラー'
      })
    }
  }

  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        className={classes.root}
        maxWidth='sm'
        fullWidth
        onKeyDown={async (e) => {
          if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault()
            await handleSend()
          }
        }}
      >
        <DialogTitle className={classes.title} disableTypography>
          <Typography variant='subtitle1' color='textSecondary' gutterBottom>Mail Editor</Typography>
        </DialogTitle>
        <DialogContent className={classes.content}>
          <Wrapper>
            <Box flex={1}>
              <Box>
              <ChipInputGrnMail label='to'
                fullWidth={true}
                multiline={true}
                rowsMax={4}
                required
                error={!validateTo()}
                helperText={isNotEmpty(to) ? !validateTo() && 'Invalid email address' : 'Required'}
                chips={to}
                onChangeChips={(chips) => update({ to: chips })}
              />
              </Box>
              <Box position='relative'>
                <ChipInputGrnMail label='cc'
                  fullWidth
                  multiline
                  rowsMax={4}
                  chips={cc}
                  onChangeChips={(chips) => update({ cc: chips })}
                  error={!validateCc()}
                  helperText={(!validateCc()) && 'Invalid email address'}
                />
              </Box>
            </Box>
          </Wrapper>
          <Wrapper>
            <TextField variant='outlined' label='body'
              fullWidth
              multiline
              rows={5}
              rowsMax={20}
              value={body}
              onChange={e => update({ body: e.target.value })}
            />
          </Wrapper>
        </DialogContent>
        <DialogActions className={classes.action}>
          <Button
            onClick={props.onClose}
            >
            CLOSE
          </Button>
          <Button variant='contained' color='primary'
            disabled={!(validateTo() && validateCc())}
            onClick={handleSend}
            >
            SEND
          </Button>
        </DialogActions>
      </Dialog>
      <AlertSnackbar {...pending}/>
      <AlertSnackbar {...result}/>
    </React.Fragment>
  )
}

export { Mailer }
