
import { IndexedDB } from '@api/storage'
import { Box, Container, IconButton, Link, Toolbar, Tooltip, Typography } from '@material-ui/core'
import type { Theme } from '@material-ui/core/styles'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { HelpOutline as HelpIcon } from '@material-ui/icons'
import { Loading } from '@molecules'
import type { ConfigItem } from '@organisms'
import { Main } from '@organisms'
import React from 'react'
import usePromise from 'react-promise-suspense'

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

  const SuspenseMain = () => {
    const data: unknown = usePromise(db.getItemsAll, [])
    return (
      <React.Suspense fallback={<Loading />}>
        <Main
          initItems={data as Record<string, ConfigItem>}
          onAdd={db.setItem}
          onRemove={db.removeItem}
          />
      </React.Suspense>
    )
  }

  return (
    <Box onContextMenu={stopPropagation}>
      <Container maxWidth='sm' className={classes.root}>
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
          </Box>
        </Toolbar>
        <React.Suspense fallback={<Loading/>}>
          <SuspenseMain/>
        </React.Suspense>
      </Container>
    </Box>
  )
}

export { App }
