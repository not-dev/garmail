import { Box } from '@material-ui/core'
import type { Theme } from '@material-ui/core/styles'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { Pagination } from '@material-ui/lab'
import { AddFab } from '@molecules'
import type { ConfigItem, Entry } from '@organisms'
import { Hinagata, Mailer } from '@organisms'
import React from 'react'
import { v4 as uuid4 } from 'uuid'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(1),
      background: 'rgba(0,0,0,0)'
    }
  })
)

type MainProps = {
  initItems: Record<string, ConfigItem>
  onAdd?: (entry: Entry) => void
  onRemove?: (entry: Entry[0]) => void
}

const Main: React.FC<MainProps> = (props) => {
  console.log('# Render Main')

  if (typeof props.onAdd === 'undefined') { console.warn('props.onAdd is undefined. No data will be saved.') }
  if (typeof props.onRemove === 'undefined') { console.warn('props.remove is undefined. No data will be saved.') }

  const classes = useStyles()

  const [items, setItems] = React.useState<Record<string, ConfigItem>>(props.initItems)

  const handleClickAddButton = () => {
    const newEntry: Entry = [uuid4(), { name: 'New Template' }]
    setItems({
      ...items,
      [newEntry[0]]: newEntry[1]
    })
    props.onAdd?.(newEntry)
  }

  const [mail, setMail] = React.useState<ConfigItem | null>(null)

  const onCloseMail = () => { setMail(null) }

  const handleAction = (entry: Entry) => {
    setMail(entry[1])
  }

  const addItem = ([key, item]: Entry) => {
    setItems({
      ...items,
      [key]: item
    })
    props.onAdd?.([key, item])
  }

  const removeItem = (key: Entry[0]) => {
    const cp = { ...items }
    delete cp[key]
    setItems(cp)
    props.onRemove?.(key)
  }

  const count = Object.keys(items).length
  const N = 8

  const [page, setPage] = React.useState(1)
  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  return (
    <React.Fragment>
      <Box display={count <= N ? 'none' : 'flex'} justifyContent='center' p={2}>
        <Pagination count={Math.ceil(Object.keys(items).length / N)} page={page} onChange={handleChange}/>
      </Box>
      <Box className={classes.root}>
        {
          Object.entries(items).slice(N * (page - 1), N * page).map((entry, i) => {
            return (
              <React.Fragment key={`${entry[0]}-${i}`}>
                <Hinagata
                  entry={entry}
                  onClick={handleAction}
                  addEntry={addItem}
                  removeEntry={removeItem}
                />
              </React.Fragment>
            )
          })
        }
      </Box>
      <AddFab
        onClick={handleClickAddButton}
      />
      <Mailer
        config={mail || {}}
        open={!!mail}
        onClose={onCloseMail}
      />
    </React.Fragment>
  )
}

export { Main }
export type { MainProps }
