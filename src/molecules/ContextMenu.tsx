import { Box, ListItemIcon, ListItemText, Menu, MenuItem } from '@material-ui/core'
import type { Theme } from '@material-ui/core/styles'
import { createStyles, makeStyles, styled } from '@material-ui/core/styles'
import { Delete as DeleteIcon } from '@material-ui/icons'
import { DeleteConfirm } from '@molecules'
import React from 'react'

const StyledMenuItem = styled(MenuItem)(({ theme }: {theme: Theme}) => ({
  padding: theme.spacing(1, 2)
}))

const FlexBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}))

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiMenu-list': {
        minWidth: theme.spacing(20)
      }
    },
    icon: {
      marginRight: theme.spacing(2),
      minWidth: theme.typography.button.fontSize
    }
  })
)

type ContextMenuProps = {
  open: boolean
  onClose: () => void
  anchorEl?: HTMLElement | null
  anchorPosition?: {top: number, left:number}
  onClickDelete: () => void
  deletemsg?: string
}

const ContextMenu:React.FC<ContextMenuProps> = (props) => {
  const classes = useStyles()

  const [confirm, setConfirm] = React.useState(false)

  const handleClickDelete = () => { setConfirm(true) }

  return (
    <React.Fragment>
    <Menu
      className={classes.root}
      open={props.open}
      onClick={props.onClose}
      onContextMenu={props.onClose}
      onClose={props.onClose}
      anchorEl={props.anchorEl}
      anchorPosition={props.anchorPosition}
      anchorReference={props.anchorPosition ? 'anchorPosition' : 'anchorEl'}
      keepMounted
    >
      <StyledMenuItem onClick={handleClickDelete}>
        <FlexBox mb={0.25}>
          <ListItemIcon className={classes.icon}><DeleteIcon fontSize='small'/></ListItemIcon>
        </FlexBox>
        <ListItemText primary='Delete'/>
      </StyledMenuItem>
    </Menu>
    <DeleteConfirm
      open={confirm}
      onClose={() => {
        setConfirm(false)
        props.onClose()
      }}
      onClick={props.onClickDelete}
      msg={props.deletemsg}
    />
    </React.Fragment>
  )
}

export { ContextMenu }
