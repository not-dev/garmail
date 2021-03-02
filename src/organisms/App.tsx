
import { Container } from '@material-ui/core'
import type { Theme } from '@material-ui/core/styles'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { Hinagata } from '@organisms'
import React from 'react'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(4)
    }
  })
)

const dummy = {
  0: { name: 'Template' }
}

const App:React.FC = () => {
  const classes = useStyles()

  return (
    <Container maxWidth='xs' className={classes.root}>
      <Hinagata
        items={dummy}
      />
    </Container>
  )
}

export { App }
