import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@material-ui/core'
import type { Theme } from '@material-ui/core/styles'
import { createStyles, makeStyles, styled } from '@material-ui/core/styles'
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
      marginRight: theme.spacing(3),
      padding: theme.spacing(2, 1)
    }
  })
)

type ConfigItem = {
  name: string
  to?: string
  cc?: string
  body?: string
}

type ConfigProps = {
  config: ConfigItem
  setConfig: (config:ConfigItem) => void
  open: boolean
  onClose: () => void
}

const Config:React.FC<ConfigProps> = (props) => {
  console.log('# Render Config')
  const classes = useStyles()
  const [name, setName] = React.useState(props.config.name)
  const [to, setTo] = React.useState(props.config.to)
  const [cc, setCc] = React.useState(props.config.cc)
  const [body, setBody] = React.useState(props.config.body)

  React.useEffect(() => {
    setName(props.config.name)
    setTo(props.config.to)
    setCc(props.config.cc)
    setBody(props.config.body)
  }, [props.config])

  const handleSave = () => {
    props.setConfig({ name, to, cc, body })
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
      <DialogTitle className={classes.title}>
        <Typography variant='subtitle1' color='textSecondary' gutterBottom>Template Editor</Typography>
      </DialogTitle>
      <DialogContent className={classes.content}>
        <Wrapper>
          <form noValidate autoComplete='off'>
            <TextField label='Template Name'
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </form>
        </Wrapper>
        <Wrapper>
          <Box flex={1}>
            <form noValidate autoComplete='off'>
              <TextField label='to'
                fullWidth
                multiline
                rowsMax={4}
                value={to}
                onChange={e => setTo(e.target.value)}
              />
            </form>
            <form noValidate autoComplete='off'>
              <TextField label='cc'
                fullWidth
                multiline
                rowsMax={4}
                value={cc}
                onChange={e => setCc(e.target.value)}
              />
            </form>
          </Box>
        </Wrapper>
        <Wrapper>
          <TextField variant='outlined' label='body'
            fullWidth
            multiline
            rows={5}
            rowsMax={20}
            value={body}
            onChange={e => setBody(e.target.value)}
          />
        </Wrapper>
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

export { Config }
export type { ConfigProps, ConfigItem }
