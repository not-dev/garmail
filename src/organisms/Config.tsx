
import { Button, Dialog, DialogActions, DialogContent, TextField } from '@material-ui/core'
import type { Theme } from '@material-ui/core/styles'
import { createStyles, makeStyles, styled } from '@material-ui/core/styles'
import React from 'react'

const Wrapper = styled('div')(({ theme }: {theme: Theme}) => ({
  display: 'flex',
  padding: theme.spacing(2)
}))

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: 'rgba(0,0,0,0)'
    },
    content: {
    },
    action: {
      marginRight: theme.spacing(3),
      padding: theme.spacing(2, 1)
    }
  })
)

type ConfigItem = {
  name: string
  to?: string
}

type ConfigProps = {
  config: ConfigItem
  setConfig: (v:ConfigItem) => void
  open: boolean
  onClose: () => void
}

const Config:React.FC<ConfigProps> = (props) => {
  const classes = useStyles()
  const [name, setName] = React.useState(props.config.name)

  React.useEffect(() => {
    setName(props.config.name)
  }, [props.config])

  const handleSave = () => {
    props.setConfig({
      name: name
    })
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
        if (e.key === 'Enter') {
          e.preventDefault()
          handleSave()
        }
      }}
    >
      <DialogContent
        className={classes.content}
      >
        <Wrapper>
          <form noValidate autoComplete='off'>
            <TextField
              label='name'
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </form>
        </Wrapper>
        <Wrapper>
          <form noValidate autoComplete='off'>
            <TextField label='To'/>
          </form>
        </Wrapper>
        <Wrapper>
          <TextField variant='outlined' label='body'
            fullWidth
            multiline
            rows={5}
            rowsMax={20}
          />
        </Wrapper>
      </DialogContent>
      <DialogActions className={classes.action}>
        <Button onClick={() => {
          props.onClose()
        }}>
          CANCEL
        </Button>
        <Button variant='contained' color='primary' onClick={handleSave}>
          SAVE
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export { Config }
export type { ConfigProps, ConfigItem }
