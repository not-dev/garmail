
import { Container, Fab } from '@material-ui/core'
import type { Theme } from '@material-ui/core/styles'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { Add as AddIcon, DeleteForever as DeleteForeverIcon } from '@material-ui/icons'
import type { HinagataProps } from '@organisms'
import { Hinagata } from '@organisms'
import React from 'react'

import { ConfigItem } from './Config'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(4)
    },
    fab: {
      margin: theme.spacing(2),
      float: 'right'
    }
  })
)

const blankConfig:ConfigItem = {
  name: 'Name'
}

const App:React.FC = () => {
  const classes = useStyles()
  const [config, setConfig] = React.useState<HinagataProps['items']>([blankConfig, { name: 'Name2' }])
  const [select, setSelect] = React.useState<Array<boolean>>(config.map(() => false))

  const handleDelete = (i:number) => {
    console.log(i)
    setConfig(config.filter((_, n) => n !== i))
  }

  const updateConfig = (i:number, newConfig:ConfigItem) => {
    const res = [...config]
    res.splice(i, 1, newConfig)
    setConfig(res)
  }

  const addItem = () => {
    setSelect([...select, false])
    setConfig([...config, blankConfig])
  }

  const removeItems = () => {
    console.log(select)
    select.forEach((checked, i) => {
      console.log(checked, i)
      if (checked) {
        handleDelete(i)
      }
    })
  }

  return (
    <Container maxWidth='xs' className={classes.root}>
      <Hinagata
        items={config}
        updateConfig={updateConfig}
        handleDelete={handleDelete}
        select={select}
        setSelect={setSelect}
      />
      {
        select.some(v => v)
          ? <Fab size='small' className={classes.fab} onClick={removeItems}>
            <DeleteForeverIcon/>
          </Fab>
          : <Fab size='small' className={classes.fab} onClick={addItem}>
            <AddIcon/>
          </Fab>
      }

    </Container>
  )
}

export { App }
