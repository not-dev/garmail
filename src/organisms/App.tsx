
import { getAccountId as grnGetAccountId, getSignature as grnGetSignature } from '@api/garoon'
import { IndexedDB } from '@api/storage'
import { Box, Container, IconButton, Link, Toolbar, Tooltip, Typography } from '@material-ui/core'
import type { Theme } from '@material-ui/core/styles'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { HelpOutline as HelpIcon } from '@material-ui/icons'
import { Loading } from '@molecules'
import type { Entry } from '@organisms'
import { Main } from '@organisms'
import React from 'react'
import usePromise from 'react-promise-suspense'

import { Signature } from './contents'

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

const App: React.FC<AppProps> = (props) => {
  const classes = useStyles()

  console.log('# Render App')

  const db = new IndexedDB<Record<Entry[0], Entry[1]>>('GM-Items')

  const onAdd = (record: Record<Entry[0], Entry[1]>) => {
    db.setItem(record).catch(e => { throw e })
  }
  const onRemove = (k: string) => {
    db.removeItem(k).catch(e => { throw e })
  }

  const getSignature = async (): Promise<Signature[]> => {
    const wrapper = async (): Promise<Signature[]> => {
      console.log('Garoon get signature...')
      if (process.env.NODE_ENV !== 'production') { throw new Error('NOT PRODUCTION') }
      const accountId = await grnGetAccountId()
      const signature = accountId && await grnGetSignature(accountId)
      if (!signature) { throw new Error('signature get error') }
      console.log(signature)
      return signature
    }
    const res = await wrapper().catch(e => {
      console.error(e)
      const dummy: Signature[] = [{ name: '署名1', content: '署名ダミー' }]
      return dummy
    })
    return res
  }

  const SuspenseMain = () => {
    const promise = async () => await Promise.all([db.getItemsAll(), getSignature()])
    const data = usePromise(promise, [])
    const [items, signatures] = data
    const entries = Object.entries(items)
    const correct = entries.filter(([key, { config, index }]) => {
      const rm = () => {
        onRemove(key)
        return false
      }
      if ((typeof config === 'undefined') || (typeof index === 'undefined')) return rm()
      if (typeof index !== 'number') return rm()
      if ((typeof config !== 'object') || (config == null) || Array.isArray(config)) return rm()
      return true
    })
    const ordered:Entry[] = correct.sort((a, b) => (a[1].index - b[1].index))

    return (
      <React.Suspense fallback={<Loading />}>
        <Main
          initEntries={ordered}
          onAdd={onAdd}
          onRemove={onRemove}
          hinagataProps={{
            configProps: {
              signatureList: signatures
            }
          }}
        />
      </React.Suspense>
    )
  }

  const stopPropagation = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    event.preventDefault()
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
