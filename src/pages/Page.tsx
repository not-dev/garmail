import { Logo } from '@assets'
import type { Theme } from '@material-ui/core/styles'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { App } from '@organisms'
import React from 'react'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logo: {
      display: 'block',
      fill: theme.palette.text.secondary,
      height: theme.typography.h6.fontSize
    }
  })
)

const Page:React.FC = () => {
  const classes = useStyles()

  return (
    <App
      title={<Logo className={classes.logo}/>}
      url='https://github.com/not-dev/garmail#garmail'
    />
  )
}

export { Page }
