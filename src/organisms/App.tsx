
import { IndexedDB } from '@api/storage'
import { Box, CircularProgress, Container, IconButton, Link, Toolbar, Tooltip, Typography } from '@material-ui/core'
import type { Theme } from '@material-ui/core/styles'
import { createStyles, makeStyles, styled } from '@material-ui/core/styles'
import { Close as CloseIcon, ExitToApp as ExitToAppIcon, HelpOutline as HelpIcon, Launch as LaunchIcon } from '@material-ui/icons'
import type { ConfigItem } from '@organisms'
import { Main } from '@organisms'
import React from 'react'
import NewWindow from 'react-new-window'

const CenterIconBox = styled(Box)(({ theme }: {theme: Theme}) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
  padding: theme.spacing(5)
}))

const stopPropagation = (event:React.MouseEvent<HTMLElement>) => {
  event.stopPropagation()
  event.preventDefault()
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(4)
    },
    toolbar: {
      padding: theme.spacing(2)
    },
    progress: {
      color: theme.palette.text.secondary
    },
    exit: {
      height: '100vh',
      '& svg': {
        fontSize: '3rem'
      }
    }
  })
)

type AppProps = {
  title: string | React.ReactElement
  url: string
  sample?: Record<string, ConfigItem>
}

const db = new IndexedDB('GM-Items')

const App:React.FC<AppProps> = (props) => {
  const classes = useStyles()

  console.log('# Render App')

  const [dbItems, setDBItems] = React.useState<Record<string, ConfigItem>|undefined>(undefined)

  React.useEffect(() => {
    console.log('## Effect App Once')
    db.getItemsAll<ConfigItem>()
      .then(res => setDBItems(res))
      .catch(e => { throw e })
  }, [])

  const [popup, setPopup] = React.useState(false)

  const togglePopup = () => setPopup(!popup)
  const closePopup = () => setPopup(false)

  const Contents: React.FC = () => {
    return (
      <Box className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <Box flex={1}>
          {
          (typeof props.title === 'string')
            ? <Typography variant='h6' color='textSecondary'>{props.title}</Typography>
            : props.title
          }
        </Box>
        <Box>
          <Link href={props.url} target='_blank' rel='noreferrer'>
            <Tooltip title='Help' enterDelay={300}>
              <IconButton><HelpIcon/></IconButton>
            </Tooltip>
          </Link>
          <Tooltip title={ popup ? 'Close window' : 'Open window' } enterDelay={300}>
            <IconButton onClick={togglePopup}>
              { popup ? <CloseIcon/> : <LaunchIcon/> }
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
      {
        (typeof dbItems === 'undefined')
          ? <CenterIconBox className={classes.progress}><CircularProgress color='inherit'/></CenterIconBox>
          : <Main
            items={dbItems}
            onAdd={db.setItem}
            onRemove={db.removeItem}
          />
      }
      </Box>
    )
  }

  return (
    <Box onContextMenu={stopPropagation}>
      { popup
        ? <React.Fragment>
            <Container maxWidth='sm'><CenterIconBox className={classes.exit}>
              <IconButton onClick={closePopup} color='inherit'><ExitToAppIcon/></IconButton>
            </CenterIconBox></Container>
            <NewWindow onUnload={closePopup}><Contents/></NewWindow>
          </React.Fragment>
        : <Container maxWidth='sm'><Contents/></Container>
      }
    </Box>
  )
}

export { App }
