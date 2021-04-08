
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

type DeleteConfirmProps = {
  open: boolean
  onClose: () => void
  onClick: () => void
  title?: string
  message?: string
}

const DeleteConfirm:React.FC<DeleteConfirmProps> = (props) => {
  const classes = useStyles()

  const handleDelete = ():void => {
    props.onClick()
    props.onClose()
  }

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      className={classes.root}
      maxWidth='sm'
      fullWidth
    >
      <DialogTitle>
        {props.title}
      </DialogTitle>
      <DialogContent
        className={classes.content}
      >
        <DialogContentText>
          {props.message}
        </DialogContentText>
      </DialogContent>
      <DialogActions className={classes.action}>
        <Button onClick={props.onClose}>
          CANCEL
        </Button>
        <Button variant='contained' color='inherit' className={classes.delete}
          onClick={handleDelete}>
          DELETE
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export { DeleteConfirm }
