
import { Button, Dialog, DialogActions, DialogContent, TextField } from '@material-ui/core'
import type { Theme } from '@material-ui/core/styles'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import React from 'react'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {

    },
    content: {
      display: 'flex',
      padding: theme.spacing(2)
    },
    action: {
      marginRight: theme.spacing(3),
      padding: theme.spacing(2, 1)
    }
  })
)

type Content = string | Record<string, unknown>

const stringify = (obj:Content) => {
  if (typeof obj === 'string') {
    return obj
  } else {
    return JSON.stringify(obj, null, 2)
  }
}

type FDCommonProps = {
  open: boolean
  onClose: () => void
}

type FDStringProps = FDCommonProps & {
  content: string
  setContent: (content:string) => void
}

const isStringContent = (props: unknown):props is FDStringProps => {
  return typeof (props as Record<string, unknown>).content === 'string'
}

type FDRecordProps = FDCommonProps & {
  content: Record<string, unknown>
  setContent: (content:Record<string, unknown>) => void
}

const FormDialog:React.FC<FDStringProps | FDRecordProps> = (props) => {
  console.log('# Render FormDialog')
  const classes = useStyles()

  const [content, setContent] = React.useState('')

  React.useEffect(() => {
    setContent(stringify(props.content))
  }, [props.content])

  const handleSave = () => {
    if (isStringContent(props)) {
      props.setContent(content)
    } else {
      props.setContent(JSON.parse(content))
    }
    props.onClose()
  }

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      className={classes.root}
      maxWidth='sm'
      fullWidth
      onKeyDown={e => {
        if (e.ctrlKey && e.key === 'Enter') {
          e.preventDefault()
          handleSave()
        }
      }}
    >
      <DialogContent
        className={classes.content}
      >
        <TextField variant='outlined'
          fullWidth
          multiline
          rows={30}
          rowsMax={30}
          value={content}
          onChange={(e) => { setContent(e.target.value) }}
        />
      </DialogContent>
      <DialogActions className={classes.action}>
        <Button onClick={props.onClose}>
          CANCEL
        </Button>
        <Button variant='contained' color='primary' onClick={handleSave}>
          SAVE
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export { FormDialog }
