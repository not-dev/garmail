
import { Dialog, DialogActions, DialogContent, IconButton, TextField } from '@material-ui/core'
import type { Theme } from '@material-ui/core/styles'
import { createStyles, makeStyles, styled } from '@material-ui/core/styles'
import { Clear as ClearIcon, Done as DoneIcon } from '@material-ui/icons'
import React from 'react'

const Wrapper = styled('div')(({ theme }: {theme: Theme}) => ({
  display: 'flex',
  padding: theme.spacing(2)
}))

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: 'rgba(0,0,0,0)',
      flex: 1
    },
    content: {
      padding: 0
    },
    formSm: {
      minWidth: 96
    },
    formLg: {
      flex: 1,
      '& .MuiInputBase-multiline': {
        minHeight: 128
      }
    },
    action: {
      justifyContent: 'flex-end',
      marginRight: theme.spacing(1)
    }
  })
)

type ConfigItem = {
  name?: string
}

type ConfigProps = ConfigItem & {
  setConfig: (v:ConfigItem) => void
  open: boolean
  onClose: () => void
}

const Config:React.FC<ConfigProps> = (props) => {
  const classes = useStyles()
  const [name, setName] = React.useState(props.name)
  console.log(name, props.name)

  React.useEffect(() => {
    setName(props.name)
  }, [props.name])

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      className={classes.root}
      maxWidth='sm'
      fullWidth
    >
      <DialogContent className={classes.content}>
        <Wrapper>
          <form noValidate autoComplete='off'>
            <TextField label='name' value={name} onChange={e => setName(e.target.value)}/>
          </form>
        </Wrapper>
        <Wrapper>
          <form noValidate autoComplete='off'>
            <TextField label='To'/>
          </form>
        </Wrapper>
        <Wrapper>
          <TextField variant='outlined' label='body' multiline className={classes.formLg}/>
        </Wrapper>
      </DialogContent>
      <DialogActions className={classes.action}>
        <IconButton onClick={() => {
          props.setConfig({
            name: name
          })
        }}>
          <ClearIcon/>
        </IconButton>
        <IconButton onClick={() => {
          props.setConfig({
            name: name
          })
        }}>
          <DoneIcon/>
        </IconButton>
      </DialogActions>
    </Dialog>
  )
}

export { Config }
export type { ConfigProps, ConfigItem }
