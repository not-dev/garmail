
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import type { Theme } from '@material-ui/core/styles'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import React from 'react'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
    },
    content: {
    },
    action: {
      marginRight: theme.spacing(3),
      padding: theme.spacing(2, 1)
    }
  })
)

type DeleteConfirmProps = {
  open: boolean
  onClose: () => void
  onClick: () => void
  title?: string
  msg?: string
}

const DeleteConfirm:React.FC<DeleteConfirmProps> = (props) => {
  const classes = useStyles()

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      className={classes.root}
      maxWidth='sm'
      fullWidth
    >
      <DialogTitle>
        { props.title || 'DELETE' }
      </DialogTitle>
      <DialogContent
        className={classes.content}
      >
        <DialogContentText>
          {props.msg || 'Are you Confirmed?'}
        </DialogContentText>
      </DialogContent>
      <DialogActions className={classes.action}>
        <Button onClick={props.onClose}>
          CANCEL
        </Button>
        <Button variant='contained' color='primary' onClick={() => {
          props.onClick()
          props.onClose()
        }}>
          DELETE
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export { DeleteConfirm }
