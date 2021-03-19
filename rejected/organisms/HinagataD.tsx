import { IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Paper } from '@material-ui/core'
import type { Theme } from '@material-ui/core/styles'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { MailOutline as MailOutlineIcon, MoreVert as MoreVertIcon} from '@material-ui/icons'
import { AddFab, ContextMenu } from '@molecules'
import type { ConfigItem } from '@organisms'
import { Config } from '@organisms'
import React from 'react'
import { v4 as uuid4 } from 'uuid'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(1)
    },
    list: {
      padding: theme.spacing(0)
    },
    item: {
      padding: theme.spacing(2, 2),
      paddingRight: theme.spacing(0),
      background: theme.palette.common.white
    },
    listicon: {
      marginRight: theme.spacing(2),
      minWidth: theme.spacing(2)
    }
  })
)

type Entry = [string, ConfigItem]

type HinagataProps = {
  items?: Record<string, ConfigItem>
  db?: {
    update: (entry:Entry) => void
    remove: (entry:Entry[0]) => void
  },
  onClick: (entry:Entry) => void
}

const Hinagata:React.FC<HinagataProps> = (props) => {
  console.log('# Render Hinagata')

  if (typeof props.db === 'undefined') { console.warn('props.db is undefined. No data will be saved.') }

  const classes = useStyles()

  const [openConfig, setOpenConfig] = React.useState(false)

  const [openContext, setOpenContext] = React.useState(false)
  const [anchor, setAnchor] = React.useState({ x: 0, y: 0 })

  const [items, setItems] = React.useState(props.items || {})

  const [select, setSelect] = React.useState<Entry>(['0', { name: '' }])

  React.useEffect(() => {
    console.log('## Effect props.item')
    props.items && setItems(props.items)
  }, [props.items])

  const updateItem = ([key, item]: Entry) => {
    setItems({
      ...items,
      [key]: item
    })
    props.db?.update([key, item])
  }

  const removeItem = (key: Entry[0]) => {
    const cp = { ...items }
    delete cp[key]
    setItems(cp)
    props.db?.remove(key)
  }

  const handleClickAddButton = () => {
    setSelect([uuid4(), { name: 'New Template' }])
    setOpenConfig(true)
  }

  const handleClickListItem = (event:React.MouseEvent<HTMLElement>, entry: Entry) => {
    event.stopPropagation()
    event.preventDefault()
    setSelect(entry)
  }

  const handleAction = (event:React.MouseEvent<HTMLElement>, entry: Entry) => {
    handleClickListItem(event, entry)
    props.onClick(entry)
  }

  const handleClickContextMenu = (event:React.MouseEvent<HTMLElement>, entry: Entry) => {
    handleClickListItem(event, entry)
    setAnchor({
      x: event.clientX,
      y: event.clientY
    })
    setOpenContext(true)
  }

  const handleClickEdit = () => {
    setOpenConfig(true)
    setOpenContext(false)
  }

  const handleClickDelete = (key: Entry[0]) => {
    removeItem(key)
    setOpenContext(false)
  }

  const handleCloseConfig = () => { setOpenConfig(false) }

  const handleCloseContextMenu = () => { setOpenContext(false) }

  return (
    <React.Fragment>
      <Paper className={classes.root}>
        <List className={classes.list}>
        {
          Object.entries(items).map((entry) => {
            const [key, item] = entry
            return (
              <ListItem
                key={key}
                button
                divider
                className={classes.item}
                onClick={event => { handleAction(event, entry) }}
                onContextMenu={event => { handleClickContextMenu(event, entry) }}
                >
                <ListItemIcon
                  className={classes.listicon}
                >
                  <MailOutlineIcon/>
                </ListItemIcon>
                <ListItemText primary={item.name} />
                <ListItemSecondaryAction>
                  <IconButton onClick={event => { handleClickContextMenu(event, entry) }}>
                    <MoreVertIcon fontSize='small'/>
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            )
          })
        }
        </List>
      </Paper>
      <ContextMenu
        open={openContext}
        onClose={handleCloseContextMenu}
        onClickEdit={handleClickEdit}
        onClickDelete={() => handleClickDelete(select[0])}
        anchorPosition={{ top: anchor.y - 8, left: anchor.x - 4 }}
        deletemsg={`「${select[1].name}」を削除します`}
      />
      <Config
        config={select[1]}
        setConfig={(newItem) => updateItem([select[0], newItem])}
        open={openConfig}
        onClose={handleCloseConfig}
      />
      <AddFab
        onClick={handleClickAddButton}
      />
    </React.Fragment>
  )
}

export { Hinagata }
export type { HinagataProps, Entry }
