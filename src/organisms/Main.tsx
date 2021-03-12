
import { Box } from '@material-ui/core'
import type { Theme } from '@material-ui/core/styles'
import { createStyles, makeStyles } from '@material-ui/core/styles'
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
  items: Record<string, ConfigItem>
  onAdd?: (entry:Entry) => void
  onRemove?: (entry:Entry[0]) => void
}

const Main:React.FC<MainProps> = (props) => {
  console.log('# Render Main')

  if (typeof props.onAdd === 'undefined') { console.warn('props.onAdd is undefined. No data will be saved.') }
  if (typeof props.onRemove === 'undefined') { console.warn('props.remove is undefined. No data will be saved.') }

  const classes = useStyles()

  const [items, setItems] = React.useState(props.items)

  React.useEffect(() => {
    console.log('## Effect Main props.items')
    setItems(props.items)
  }, [props.items])

  const handleClickAddButton = () => {
    const newEntry: Entry = [uuid4(), { name: 'New Template' }]
    setItems({
      ...items,
      [newEntry[0]]: newEntry[1]
    })
    props.onAdd?.(newEntry)
  }

  const [mail, setMail] = React.useState<ConfigItem|null>(null)

  const handleOnCloseMail = () => { setMail(null) }

  const handleAction = (entry: Entry) => {
    setMail(entry[1])
  }

  const addItem = ([key, item]: Entry) => {
    setItems({
      ...props.items,
      [key]: item
    })
    props.onAdd?.([key, item])
  }

  const removeItem = (key: Entry[0]) => {
    const cp = { ...props.items }
    delete cp[key]
    setItems(cp)
    props.onRemove?.(key)
  }

  return (
    <React.Fragment>
      <Box className={classes.root}>
      {
        Object.entries(items).map((entry) => {
          return (
            <Hinagata
              entry={entry}
              onClick={handleAction}
              addEntry={addItem}
              removeEntry={removeItem}
            />
          )
        })
      }
      </Box>
      <AddFab
        onClick={handleClickAddButton}
      />
      {
        mail &&
          <Mailer
            config={mail || {}}
            open={!!mail}
            onClose={handleOnCloseMail}
          />
      }
    </React.Fragment>
  )
}

export { Main }
export type { MainProps }