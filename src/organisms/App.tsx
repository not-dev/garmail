
import { IndexedDB } from '@api/storage'
import { Box, Container, IconButton, Link, Toolbar, Tooltip } from '@material-ui/core'
import type { Theme } from '@material-ui/core/styles'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { HelpOutline as HelpIcon } from '@material-ui/icons'
import { Loading } from '@molecules'
import type { Entry, MainProps } from '@organisms'
import { Main } from '@organisms'
import React from 'react'
import usePromise from 'react-promise-suspense'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(4)
    },
    toolbar: {
      padding: theme.spacing(2)
    }
  })
)

type AppProps = {
  title: string | React.ReactElement
  url: string
  dbPrefix: string
  text: {
    tooltip: {
      help: string
    },
    main: MainProps['text']
  }
  examples?: Record<Entry[0], Entry[1]>
}

const App: React.FC<AppProps> = (props) => {
  const classes = useStyles()

  console.log('# Render App')

  const db = new IndexedDB<Record<Entry[0], Entry[1]>>(`${props.dbPrefix}-Items`)

  const onAdd = (record: Record<Entry[0], Entry[1]>): void => {
    db.setItem(record).catch(e => { throw e })
  }
  const onRemove = (k: string): void => {
    db.removeItem(k).catch(e => { throw e })
  }

  const SuspenseMain = () => {
    console.log('Suspense')
    const promise = async () => await db.getItemsAll()
    const data = usePromise(promise, [])
    const entries = Object.entries(data)
    if ((entries.length === 0) && (typeof props.examples !== 'undefined')) {
      entries.push(...Object.entries(props.examples))
      onAdd(props.examples)
    }
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
    const ordered: Entry[] = correct.sort((a, b) => (a[1].index - b[1].index))

    return (
      <React.Suspense fallback={<Loading />}>
        <Main
          initEntries={ordered}
          onAdd={onAdd}
          onRemove={onRemove}
          text={props.text.main}
        />
      </React.Suspense>
    )
  }

  return (
    <Container maxWidth='sm' className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <Box flex={1}>
          {props.title}
        </Box>
        <Box>
          <Link href={props.url} target='_blank' rel='noreferrer'>
            <Tooltip title={props.text.tooltip.help} enterDelay={300}>
              <IconButton><HelpIcon /></IconButton>
            </Tooltip>
          </Link>
        </Box>
      </Toolbar>
      <React.Suspense fallback={<Loading />}>
        <SuspenseMain />
      </React.Suspense>
    </Container>
  )
}

export { App }
