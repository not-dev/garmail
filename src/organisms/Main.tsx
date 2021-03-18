import { Box } from '@material-ui/core'
import type { Theme } from '@material-ui/core/styles'
import { createStyles, makeStyles, styled } from '@material-ui/core/styles'
import { Delete as DeleteIcon } from '@material-ui/icons'
import { AddFab } from '@molecules'
import { Signature } from '@molecules/Signature'
import type { ConfigItem, Entry } from '@organisms'
import { Hinagata, Mailer } from '@organisms'
import React from 'react'
import { DragDropContext, Droppable, OnBeforeCaptureResponder, OnDragEndResponder } from 'react-beautiful-dnd'
import LazyLoad from 'react-lazyload'
import { v4 as uuid4 } from 'uuid'

const FlexBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}))

const Dropzone = styled('div')(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'fixed',
  left: 0,
  bottom: 0,
  height: 80,
  width: '100vw',
  overflow: 'hidden',
  color: theme.palette.text.secondary,
  border: 'dashed',
  borderWidth: 2,
  borderColor: theme.palette.divider,
  transition: theme.transitions.create(['background', 'borderColor'], {
    duration: theme.transitions.duration.shortest,
    easing: theme.transitions.easing.easeOut
  }),
  '&:hover': {
    borderColor: theme.palette.error.main,
    background: theme.palette.action.hover
  }
}))

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
    },
    items: {
      marginBottom: theme.spacing(1)
    }
  })
)

type MainProps = {
  initEntries: Entry[]
  onAdd?: (record: Record<Entry[0], Entry[1]>) => void
  onRemove?: (key: Entry[0]) => void
  signatures: Signature[]
}

const Main: React.FC<MainProps> = (props) => {
  console.log('# Render Main')

  if (typeof props.onAdd === 'undefined') { console.warn('props.onAdd is undefined. No data will be saved.') }
  if (typeof props.onRemove === 'undefined') { console.warn('props.remove is undefined. No data will be saved.') }

  const classes = useStyles()

  const [entries, setEntries] = React.useState<Entry[]>([])

  React.useEffect(() => {
    console.log(['initEntries', props.initEntries])
    setEntries(props.initEntries)
  }, [props.initEntries])

  const [mail, setMail] = React.useState<ConfigItem | null>(null)

  const onCloseMail = () => { setMail(null) }

  const handleAction = (entry: Entry) => {
    setMail(entry[1].config)
  }

  const updateRecord = (newRecord: Record<Entry[0], Entry[1]>) => {
    const record = Object.fromEntries(entries)
    Object.entries(newRecord).forEach(([key, item]) => {
      record[key] = item
    })
    setEntries(Object.entries(record))
    props.onAdd?.(newRecord)
  }

  const removeRecord = (key: Entry[0]) => {
    setEntries(entries.filter(e => e[0] !== key))
    props.onRemove?.(key)
  }

  const handleClickAddButton = () => {
    const newRecord = {
      [uuid4()]: { config: { name: 'New Template' }, index: entries.length }
    }
    updateRecord(newRecord)
  }

  const setEntry = (entry: Entry) => {
    const [key, { config, index }] = entry
    const newRecord = {
      [key]: { config, index }
    }
    if (Object.keys(config).length > 0) {
      updateRecord(newRecord)
    } else {
      removeRecord(key)
    }
  }

  const reorder = <T, >(list: T[], start: number, end: number): T[] => {
    const res = Array.from(list)
    const removed = res.splice(start, 1)
    res.splice(end, 0, ...removed)

    return res
  }

  const [dragging, setDragging] = React.useState(false)

  const onBeforeCapture: OnBeforeCaptureResponder = () => {
    setDragging(true)
  }

  const onDragEnd: OnDragEndResponder = (res) => {
    setDragging(false)

    if (res.destination == null) return

    if ((res.source.droppableId === res.destination.droppableId) && (res.source.index === res.destination.index)) return

    if (res.source.droppableId === res.destination.droppableId) {
      const ordered: Entry[] = reorder(
        entries,
        res.source.index,
        res.destination.index
      ).map(([key, { config }], i) => [key, { config, index: i }])

      setEntries(ordered)
      props.onAdd?.(Object.fromEntries(ordered))
    }

    if (res.destination.droppableId === 'bin') {
      const rmKey = entries[res.source.index]?.[0]
      const updated: Entry[] = entries.reduce((pre: Entry[], [key, { config }], i) => {
        if (key !== rmKey) return ([...pre, [key, { config, index: i }]])
        return pre
      }, [])
      setEntries(updated)
      rmKey && props.onRemove?.(rmKey)
    }
  }

  return (
    <React.Fragment>
      <DragDropContext onDragEnd={onDragEnd} onBeforeCapture={onBeforeCapture}>
        <Droppable droppableId='hinagata'>
          {(provided) => {
            const ref: typeof provided.innerRef = (e) => (provided.innerRef(e) as unknown)
            return (
              <div
                {...provided.droppableProps}
                ref={ref}
                >
                <Box className={classes.items}>
                  {
                    entries.map((entry, i) => {
                      return (
                        <React.Fragment key={entry[0]}>
                        <LazyLoad height={72} offset={100}>
                          <Hinagata
                            entry={entry}
                            setEntry={setEntry}
                            onClick={handleAction}
                            signatures={props.signatures}
                            nth={i}
                            />
                          </LazyLoad>
                        </React.Fragment>
                      )
                    })
                  }
                </Box>
                {provided.placeholder}
              </div>
            )
          }}
        </Droppable>
      {
        dragging &&
        <Droppable droppableId='bin'>
        {(provided) => {
          const ref: typeof provided.innerRef = (e) => (provided.innerRef(e) as unknown)
          return (
            <Dropzone
              {...provided.droppableProps}
              ref={ref}
              >
              <FlexBox position='absolute'><DeleteIcon fontSize='large' color='inherit' /></FlexBox>
              {provided.placeholder}
            </Dropzone>
          )
        }}
        </Droppable>
      }
      </DragDropContext>
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
