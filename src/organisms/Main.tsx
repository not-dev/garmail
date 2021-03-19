import type { AlertSnackbarProps } from '@atoms'
import { AlertSnackbar } from '@atoms'
import { AddFab } from '@molecules'
import type { Entry, HinagataProps } from '@organisms'
import { Content, Hinagata, Mailer } from '@organisms'
import React from 'react'
import LazyLoad from 'react-lazyload'
import { v4 as uuid4 } from 'uuid'

type MainProps = {
  initEntries: Entry[]
  onAdd?: (record: Record<Entry[0], Entry[1]>) => void
  onRemove?: (key: Entry[0]) => void
  hinagataProps: Pick<HinagataProps, 'configProps'>
}

const Main: React.FC<MainProps> = (props) => {
  console.log('# Render Main')

  const [entries, setEntries] = React.useState<Entry[]>([])

  React.useEffect(() => {
    console.log(['initEntries', props.initEntries])
    setEntries(props.initEntries)
  }, [props.initEntries])

  const [mail, setMail] = React.useState<Entry[1]['config']|null>(null)

  const onCloseMail = () => setMail(null)

  const [feedback, setFeedback] = React.useState<AlertSnackbarProps>({
    open: false
  })

  const handleAction = (entry: Entry) => {
    setMail(entry[1].config)
  }

  const handleClickAddButton = () => {
    const newEntry: Entry = [uuid4(), { config: { name: 'New Template' }, index: entries.length }]
    setEntries([...entries, newEntry])
  }

  const onRemove: typeof props.onRemove = (key) => {
    props.onRemove?.(key)
    setFeedback({
      severity: 'success',
      message: '削除しました',
      open: true,
      onClose: () => {
        setFeedback({
          severity: 'success',
          open: false
        })
      }
    })
  }

  const setEntry = (entry: Entry) => {
    const [key, { config, index }] = entry
    const newRecord = { [key]: { config, index } }
    if (Object.keys(config).length > 0) {
      const record = Object.fromEntries(entries)
      Object.entries(newRecord).forEach(([key, item]) => {
        record[key] = item
      })
      setEntries(Object.entries(record))
      props.onAdd?.(newRecord)
    } else {
      setEntries(entries.filter(e => e[0] !== key))
      onRemove(key)
    }
  }

  return (
    <React.Fragment>
      <Content
        entries={entries}
        setEntries={setEntries}
        onAdd={props.onAdd}
        onRemove={onRemove}
        >
          {
            entries.map((entry, i) => (
              <React.Fragment key={entry[0]}>
                <LazyLoad height={72} offset={100}>
                  <Hinagata
                    nth={i}
                    entry={entry}
                    setEntry={setEntry}
                    onClick={handleAction}
                    { ...props.hinagataProps }
                    />
                  </LazyLoad>
              </React.Fragment>
            ))
          }
      </Content>
      <Mailer
        config={mail || {}}
        open={!!mail}
        onClose={onCloseMail}
        />
      <AddFab
        onClick={handleClickAddButton}
      />
      <AlertSnackbar { ...feedback} />
    </React.Fragment>
  )
}

export { Main }
export type { MainProps }
