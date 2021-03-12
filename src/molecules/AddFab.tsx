
import { Box, Fab } from '@material-ui/core'
import type { Theme } from '@material-ui/core/styles'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { Add as AddIcon } from '@material-ui/icons'
import React from 'react'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      display: 'flex',
      justifyContent: 'center',
      margin: theme.spacing(2)
    },
    fab: {

    }
  })
)

type AddFabProps = {
  onClick: () => void
}

const AddFab:React.FC<AddFabProps> = (props) => {
  const classes = useStyles()

  return (
    <Box className={classes.wrapper}>
      <Fab size='small' color='primary' className={classes.fab} onClick={props.onClick}>
        <AddIcon/>
      </Fab>
    </Box>
  )
}

export { AddFab }
