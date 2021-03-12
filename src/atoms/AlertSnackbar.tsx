import { Container } from '@material-ui/core'
import Snackbar, { SnackbarProps } from '@material-ui/core/Snackbar'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import React from 'react'

const Alert: React.FC<AlertProps> = (props) => {
  return <MuiAlert elevation={6} variant='filled' {...props} />
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {

  },
  content: {
    minWidth: 320,
    color: theme.palette.common.white
  }
}))

type AlertSnackbarProps = SnackbarProps & {
  severity?: AlertProps['severity']
  message?: React.ReactNode
}

const AlertSnackbar: React.FC<AlertSnackbarProps> = ({ severity, message, action, ...props }) => {
  const classes = useStyles()

  return (
    <Container maxWidth='lg' fixed>
      <Snackbar className={classes.root}
        open={props.open}
        onClose={props.onClose}
        autoHideDuration={3000}
        { ...props }
        >
        <Alert className={classes.content}
          severity={severity}
          action={action}
          >
          { message }
        </Alert>
      </Snackbar>
    </Container>
  )
}

export { AlertSnackbar }
export type { AlertSnackbarProps }
