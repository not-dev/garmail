import { AddFab } from '@molecules'
import type { Entry, HinagataProps, MailerProps } from '@organisms'
import { Content, Hinagata, Mailer } from '@organisms'
import React from 'react'
import LazyLoad from 'react-lazyload'
import { v4 as uuid4 } from 'uuid'

type MainProps = {
  initEntries: Entry[]
  onAdd?: (record: Record<Entry[0], Entry[1]>) => void
  onRemove?: (key: Entry[0]) => void
  text: {
    hinagata: HinagataProps['text']
    mailer: MailerProps['text']
  }
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

  const handleAction = (entry: Entry) => {
    setMail(entry[1].config)
  }

  const handleClickAddButton = () => {
    const newEntry: Entry = [uuid4(), { config: {}, index: entries.length, title: 'New Template' }]
    setEntries([...entries, newEntry])
  }

  const setEntry = (entry: Entry) => {
    const [key, { config, index, title }] = entry
    const newRecord = { [key]: { config, index, title } }
    if (Object.keys(config).length > 0) {
      const record = Object.fromEntries(entries)
      Object.entries(newRecord).forEach(([key, item]) => {
        record[key] = item
      })
      setEntries(Object.entries(record))
      props.onAdd?.(newRecord)
    } else {
      setEntries(entries.filter(e => e[0] !== key))
      props.onRemove?.(key)
    }
  }

  return (
    <React.Fragment>
      <Content
        entries={entries}
        setEntries={setEntries}
        onAdd={props.onAdd}
        onRemove={props.onRemove}
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
                    text={props.text.hinagata}
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
        text={props.text.mailer}
        />
      <AddFab
        onClick={handleClickAddButton}
      />
    </React.Fragment>
  )
}

export { Main }
export type { MainProps }
