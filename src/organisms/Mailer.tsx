
import type { GrnHttpResponse } from '@api/garoon'
import { sendMail, validateGrn } from '@api/garoon'
import type { AlertSnackbarProps } from '@atoms'
import { AlertSnackbar } from '@atoms'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@material-ui/core'
import type { Theme } from '@material-ui/core/styles'
import { createStyles, makeStyles, styled } from '@material-ui/core/styles'
import { ChipInputGrnMail } from '@molecules'
import type { ConfigItem } from '@organisms'
import React from 'react'

import { replaceTemplate } from './helper'

const Wrapper = styled('div')(({ theme }: { theme: Theme }) => ({
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
  text: {
    title: string,
    snack: {
      pending: string,
      done: string,
      error: string,
      timeout: string
    },
    button: {
      send: string,
      cancel: string
    },
    label: {
      to: string,
      cc: string,
      subject: string,
      body: string,
    },
    helper: {
      invalidEmail: string,
      required: string
    }
  }
}

const isNotEmpty = <T, >(v: T): v is Extract<T, Exclude<T, undefined | null>> => {
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

const Mailer: React.FC<MailerProps> = (props) => {
  console.log('# Render Mailer')
  const classes = useStyles()

  /** メールは独自State */
  const [to, setTo] = React.useState(props.config.to || [])
  const [cc, setCc] = React.useState(props.config.cc || [])
  const [subject, setSubject] = React.useState(props.config.subject || '')
  const [body, setBody] = React.useState(props.config.body || '')

  React.useEffect(() => {
    console.log('## Effect Mailer props.config')
    setTo(props.config.to || [])
    setCc(props.config.cc || [])
    setSubject(props.config.subject || '')
    setBody(props.config.body || '')

    replaceTemplate(props.config.subject || '')
      .then(res => {
        setSubject(res)
      })
      .catch(e => { throw e })
    replaceTemplate(props.config.body || '')
      .then(res => {
        setBody(res)
      })
      .catch(e => { throw e })
  }, [props.config])

  const [pending, setPending] = React.useState<AlertSnackbarProps>({
    open: false
  })
  const [result, setResult] = React.useState<AlertSnackbarProps>({
    open: false
  })

  const grnSendMail: typeof sendMail = async (params): Promise<GrnHttpResponse> => {
    console.log('Garoon send mail...')
    return await sendMail(params).catch((e: Error) => {
      console.error(e)
      return ({
        statusCode: 500,
        body: e.toString()
      })
    })
  }

  const handleSend = async (): Promise<void> => {
    const params = {
      to: to || [],
      cc,
      subject: subject || '',
      body: body || ''
    }
    props.onClose()

    setPending({
      severity: 'info',
      message: props.text.snack.pending
    })

    const timeout = (ms: number): Promise<GrnHttpResponse> => new Promise((resolve) => {
      window.setTimeout(() => { resolve({ statusCode: 408, body: {} }) }, ms)
    })
    const res = await Promise.race([grnSendMail(params), timeout(30000)])

    if ((res.statusCode === 200)) {
      setResult({
        severity: 'success',
        message: props.text.snack.done
      })
    } else if ((res.statusCode === 408)) {
      setResult({
        severity: 'error',
        message: props.text.snack.timeout
      })
    } else {
      setResult({
        severity: 'error',
        message: props.text.snack.error
      })
    }
  }

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLDivElement>): Promise<void> => {
    if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault()
      await handleSend()
    }
  }

  const validateTo = (): boolean => {
    if (isNotEmpty(to)) {
      const isValid = to.map((s) => validateGrn(s)).every(valid => valid)
      return isValid
    } else {
      return false
    }
  }

  const validateCc = (): boolean => {
    if (typeof cc === 'undefined') {
      return true
    } else {
      const isValid = cc.map((s) => validateGrn(s)).every(valid => valid)
      return isValid
    }
  }

  const validateSubject = (): boolean => true

  const validateBody = (): boolean => true

  const isValid = {
    to: validateTo(),
    cc: validateCc(),
    subject: validateSubject(),
    body: validateBody(),
    send: validateTo() && validateCc() && validateSubject() && validateBody()
  }

  const helperText = {
    to: isNotEmpty(to) ? !isValid.to && props.text.helper.invalidEmail : props.text.helper.required,
    cc: !isValid.cc && 'Invalid email address',
    subject: !isValid.subject && '',
    body: !isValid.body && ''
  }
  const setState = {
    to: (chips: typeof to): void => setTo(chips),
    cc: (chips: typeof cc): void => setCc(chips),
    subject: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => setSubject(e.target.value),
    body: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => setBody(e.target.value)
  }

  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        className={classes.root}
        maxWidth='sm'
        fullWidth
        onKeyDown={handleKeyDown}
      >
        <DialogTitle className={classes.title} disableTypography>
          <Typography variant='subtitle1' color='textSecondary' gutterBottom>{props.text.title}</Typography>
        </DialogTitle>
        <DialogContent className={classes.content}>
          <Wrapper>
            <Box flex={1}>
              <Box>
                <ChipInputGrnMail label={props.text.label.to}
                  fullWidth={true}
                  multiline={true}
                  rowsMax={4}
                  required
                  error={!isValid.to}
                  helperText={helperText.to}
                  chips={to}
                  setChips={setState.to}
                />
              </Box>
              <Box position='relative'>
                <ChipInputGrnMail label={props.text.label.cc}
                  fullWidth
                  multiline
                  rowsMax={4}
                  chips={cc}
                  setChips={setState.cc}
                  error={!isValid.cc}
                  helperText={helperText.cc}
                />
              </Box>
            </Box>
          </Wrapper>
          <Wrapper>
            <TextField variant='outlined' label={props.text.label.subject}
              fullWidth
              value={subject}
              onChange={setState.subject}
              error={!isValid.subject}
              helperText={helperText.subject}
            />
          </Wrapper>
          <Wrapper>
            <TextField variant='outlined' label={props.text.label.body}
              fullWidth
              multiline
              rows={5}
              rowsMax={20}
              value={body}
              onChange={setState.body}
              error={!isValid.body}
              helperText={helperText.body}
            />
          </Wrapper>
        </DialogContent>
        <DialogActions className={classes.action}>
          <Button
            onClick={props.onClose}
          >
            {props.text.button.cancel}
          </Button>
          <Button variant='contained' color='primary'
            disabled={!isValid.send}
            onClick={handleSend}
          >
            {props.text.button.send}
          </Button>
        </DialogActions>
      </Dialog>
      <AlertSnackbar {...pending} />
      <AlertSnackbar {...result} />
    </React.Fragment>
  )
}

export { Mailer }
export type { MailerProps }
