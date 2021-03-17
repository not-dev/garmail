
import { IndexedDB } from '@api/storage'
import { Box, Container, IconButton, Link, Toolbar, Tooltip, Typography } from '@material-ui/core'
import type { Theme } from '@material-ui/core/styles'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { HelpOutline as HelpIcon } from '@material-ui/icons'
import type { Signature } from '@molecules'
import { Loading } from '@molecules'
import type { Entry } from '@organisms'
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

const stopPropagation = (event: React.MouseEvent<HTMLElement>) => {
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
}

const db = new IndexedDB<Record<Entry[0], Entry[1]>>('GM-Items')

const App: React.FC<AppProps> = (props) => {
  const classes = useStyles()

  console.log('# Render App')

  const SuspenseMain = () => {
    const promise = async () => await Promise.all([db.getItemsAll(), getSignature(accountId)])
    const data = usePromise(promise, [])
    const [items, signatures] = data
    const entries = Object.entries(items)
    const ordered:Entry[] = entries.sort((a, b) => (a[1].index - b[1].index))

    const onAdd = async (record: Record<Entry[0], Entry[1]>) => {
      await db.setItem(record)
    }
    const onRemove = async (k: string) => await db.removeItem(k)

    return (
      <React.Suspense fallback={<Loading />}>
        <Main
          initEntries={ordered}
          onAdd={onAdd}
          onRemove={onRemove}
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
                <IconButton><HelpIcon /></IconButton>
              </Tooltip>
            </Link>
          </Box>
        </Toolbar>
        <React.Suspense fallback={<Loading />}>
          <SuspenseMain />
        </React.Suspense>
      </Container>
    </Box>
  )
}

export { App }
