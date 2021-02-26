
import { IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Paper } from '@material-ui/core'
import type { Theme } from '@material-ui/core/styles'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { Edit as EditIcon, MailOutline as MailOutlineIcon } from '@material-ui/icons'
import type { ConfigItem } from '@organisms'
import { Config } from '@organisms'
import React from 'react'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      padding: 0
    },
    item: {
      padding: theme.spacing(2, 2),
      background: theme.palette.common.white
    },
    listicon: {
      minWidth: 0,
      marginRight: theme.spacing(2)
    },
    action: {
      justifyContent: 'flex-end',
      marginRight: theme.spacing(1)
    }
  })
)

type HinagataProps = {
  items: Array<ConfigItem>
  updateConfig: (i:number, config:ConfigItem) => void
  handleDelete: (n:number) => void
  select: Array<boolean>
  setSelect: (select:Array<boolean>) => void
}

const Hinagata:React.FC<HinagataProps> = (props) => {
  const classes = useStyles()

  const [open, setOpen] = React.useState(false)
  const [select, setSelect] = React.useState<ConfigItem|undefined>(undefined)
  const [selectNum, setSelectNum] = React.useState(0)

  const handleEdit = (i:number, item:ConfigItem) => {
    setSelect(item)
    setSelectNum(i)
    setOpen(true)
  }

  return (
    <React.Fragment>
      <Paper>
        <List className={classes.list}>
        {
          props.items.map((item, i) => {
            return (
              <ListItem
                button
                divider
                className={classes.item}
                onClick={(event) => {
                  console.log(item)
                  event.stopPropagation()
                }}>
                <ListItemIcon
                  className={classes.listicon}
                  onMouseDown={e => e.stopPropagation()}
                >
                  <MailOutlineIcon/>
                </ListItemIcon>
                <ListItemText primary={item.name} />
                <ListItemSecondaryAction className={classes.action}>
                  <IconButton onClick={ () => handleEdit(i, item) }>
                    <EditIcon fontSize='small'/>
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            )
          })
        }
        </List>
      </Paper>
      <Config
        {...select}
        setConfig={(config:ConfigItem) => props.updateConfig(selectNum, config)}
        open={open}
        onClose={() => { setOpen(false) }}
      />
    </React.Fragment>
  )
}

export { Hinagata }
export type { HinagataProps }
