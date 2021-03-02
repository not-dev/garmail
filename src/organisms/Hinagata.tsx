
import { Fab, IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Menu, MenuItem, Paper } from '@material-ui/core'
import type { Theme } from '@material-ui/core/styles'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { Add as AddIcon, MailOutline as MailOutlineIcon, MoreVert as MoreVertIcon } from '@material-ui/icons'
import type { ConfigItem } from '@organisms'
import { Config } from '@organisms'
import React from 'react'
import { v4 as uuid4 } from 'uuid'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      padding: 0
    },
    item: {
      padding: theme.spacing(2, 2),
      paddingRight: theme.spacing(0),
      background: theme.palette.common.white
    },
    listicon: {
    },
    action: {
      justifyContent: 'flex-end'
    },
    fab: {
      margin: theme.spacing(2),
      float: 'right'
    }
  })
)

type HinagataProps = {
  items: Record<string, ConfigItem>
}

type entries = [string, ConfigItem]

const Hinagata:React.FC<HinagataProps> = (props) => {
  const classes = useStyles()

  const [open, setOpen] = React.useState(false)
  const [select, setSelect] = React.useState<entries|undefined>(undefined)

  const [menu, setMenu] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
    setMenu(true)
  }

  const closeMenu = () => { setMenu(false) }

  const [items, setItems] = React.useState(props.items)

  const updateConfig = ([key, item]: entries) => {
    setItems({
      ...items,
      [key]: item
    })
  }

  const addItem = () => {
    setSelect([uuid4(), { name: 'new Template' }])
    setOpen(true)
  }

  const rmItem = (key: string) => {
    const cp = { ...items }
    delete cp[key]
    setItems(cp)
  }

  return (
    <React.Fragment>
      <Paper>
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
                onClick={(e) => {
                  console.log([key, item])
                  e.stopPropagation()
                }}
                >
                <ListItemIcon
                  className={classes.listicon}
                  onMouseDown={e => e.stopPropagation()}
                >
                  <MailOutlineIcon/>
                </ListItemIcon>
                <ListItemText primary={item.name} />
                <ListItemSecondaryAction className={classes.action}>
                  <IconButton onClick={(e) => {
                    setSelect(entry)
                    openMenu(e)
                  }}>
                    <MoreVertIcon fontSize='small'/>
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            )
          })
        }
        </List>
      </Paper>
      {
        (typeof select !== 'undefined') &&
        <Config
          config={select[1]}
          setConfig={(newItem) => { updateConfig([select[0], newItem]) }}
          open={open}
          onClose={() => { setOpen(false) }}
        />
      }
      <Menu
        open={menu}
        onClose={closeMenu}
        anchorEl={anchorEl}
        keepMounted
      >
        <MenuItem
          onClick={() => {
            setOpen(true)
            closeMenu()
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            select && rmItem(select[0])
            closeMenu()
          }
        }>
          Delete
        </MenuItem>
      </Menu>
      <Fab size='small' className={classes.fab} onClick={addItem}>
        <AddIcon/>
      </Fab>
    </React.Fragment>
  )
}

export { Hinagata }
export type { HinagataProps }
