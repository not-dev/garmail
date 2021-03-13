import { Box, CircularProgress } from '@material-ui/core'
import type { Theme } from '@material-ui/core/styles'
import { createStyles, makeStyles, styled } from '@material-ui/core/styles'
import React from 'react'

const CenterIconBox = styled(Box)(({ theme }: {theme: Theme}) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
  padding: theme.spacing(5)
}))

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(4)
    },
    toolbar: {
      padding: theme.spacing(2)
    },
    progress: {
      color: theme.palette.text.secondary
    },
    exit: {
      height: '100vh',
      '& svg': {
        fontSize: '3rem'
      }
    }
  })
)

const Loading:React.FC = () => {
  const classes = useStyles()

  return (
    <CenterIconBox className={classes.progress}><CircularProgress color='inherit'/></CenterIconBox>
  )
}

export { Loading }
