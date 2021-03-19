
import { AddFab } from '@molecules'
import type { ContentProps, Entry, HinagataProps } from '@organisms'
import { Content, Mailer } from '@organisms'
import React from 'react'
import { v4 as uuid4 } from 'uuid'

type MainProps = {
  initEntries: Entry[]
  contentProps: Pick<ContentProps, 'onAdd'|'onRemove'>
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

  const handleAction = (entry: Entry) => {
    setMail(entry[1].config)
  }

  const handleClickAddButton = () => {
    const newEntry: Entry = [uuid4(), { config: { name: 'New Template' }, index: entries.length }]
    setEntries([...entries, newEntry])
  }

  return (
    <React.Fragment>
      <Content
        entries={entries}
        setEntries={setEntries}
        hinagataProps={{
          ...props.hinagataProps,
          onClick: handleAction
        }}
        { ...props.contentProps }
        >
      </Content>
      <Mailer
        config={mail || {}}
        open={!!mail}
        onClose={onCloseMail}
        />
      <AddFab
        onClick={handleClickAddButton}
      />
    </React.Fragment>
  )
}

export { Main }
export type { MainProps }
