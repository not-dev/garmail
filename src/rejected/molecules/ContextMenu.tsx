/* eslint-disable */
// @ts-nocheck
/*
import { Menu, MenuItem } from '@material-ui/core'
import { DeleteConfirm } from '@molecules'
import React from 'react'

type ContextMenuProps = {
  open: boolean
  onClose: () => void
  anchorEl?: HTMLElement | null
  anchorPosition?: {top: number, left:number}
  onClickEdit: () => void
  onClickDelete: () => void
  deletemsg?: string
}

const ContextMenu:React.FC<ContextMenuProps> = (props) => {
  const [confirm, setConfirm] = React.useState(false)

  return (
    <React.Fragment>
    <Menu
      open={props.open}
      onClose={props.onClose}
      anchorEl={props.anchorEl}
      anchorPosition={props.anchorPosition}
      anchorReference={props.anchorPosition ? 'anchorPosition' : 'anchorEl'}
      keepMounted
    >
      <MenuItem
        onClick={props.onClickEdit}
      >
        Edit
      </MenuItem>
      <MenuItem
        onClick={() => { setConfirm(true) }}>
        Delete
      </MenuItem>
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
*/
