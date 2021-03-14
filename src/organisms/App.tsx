
import { IndexedDB } from '@api/storage'
import { Box, Container, IconButton, Link, Toolbar, Tooltip, Typography } from '@material-ui/core'
import type { Theme } from '@material-ui/core/styles'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { HelpOutline as HelpIcon } from '@material-ui/icons'
import type { Signature } from '@molecules'
import { Loading } from '@molecules'
import type { ConfigItem } from '@organisms'
import { Main } from '@organisms'
import { sleep } from '@utils'
import React from 'react'
import usePromise from 'react-promise-suspense'

const accountId = 0
const getSignature = async (id: number): Promise<Signature[]> => {
  console.log(['id', id])
  await sleep(1)
  return (
    [{ id: 1, name: '署名1', value: 'hoge' }, { id: 2, name: '署名2', value: 'foo' }]
  )
}

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
    const promise = async () => await Promise.all([db.getItemsAll(), getSignature(accountId)])
    const data: unknown = usePromise(promise, [])
    const [items, signatures] = data as [Record<string, ConfigItem>, Signature[]]
    const entries = Object.entries(items)
    entries.sort((a, b) => {
      const nameA = a[1].name.toUpperCase()
      const nameB = b[1].name.toUpperCase()
      if (nameA < nameB) return -1
      if (nameA > nameB) return 1
      return 0
    })
    return (
      <React.Suspense fallback={<Loading />}>
        <Main
          initItems={Object.fromEntries(entries)}
          onAdd={db.setItem}
          onRemove={db.removeItem}
          signatures={signatures}
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
