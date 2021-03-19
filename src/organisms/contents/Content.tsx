import { Box } from '@material-ui/core'
import type { Theme } from '@material-ui/core/styles'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import type { Entry, HinagataProps } from '@organisms'
import { DeleteDropzone, Hinagata } from '@organisms'
import { reorder } from '@utils'
import React from 'react'
import { DragDropContext, Droppable, OnBeforeCaptureResponder, OnDragEndResponder } from 'react-beautiful-dnd'
import LazyLoad from 'react-lazyload'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    items: {
      marginBottom: theme.spacing(1)
    }
  })
)

type ContentProps = {
  entries: Entry[]
  setEntries: (entries: Entry[]) => void
  onAdd?: (record: Record<Entry[0], Entry[1]>) => void
  onRemove?: (key: Entry[0]) => void
  hinagataProps: Pick<HinagataProps, 'onClick'|'configProps'>
}

const Content: React.FC<ContentProps> = (props) => {
  console.log('# Render Content')

  const classes = useStyles()

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
        props.entries,
        res.source.index,
        res.destination.index
      ).map(([key, { config }], i) => [key, { config, index: i }])

      const add: Record<Entry[0], Entry[1]> = ordered.reduce((rec: Record<Entry[0], Entry[1]>, [key, { config, index }]) => {
        const preIndex = Object.fromEntries(props.entries)[key]?.index
        if (index !== preIndex) return ({ ...rec, [key]: { config, index } })
        return rec
      }, {})
      props.onAdd?.(add)
      props.setEntries(ordered)
    }

    if (res.destination.droppableId === 'bin') {
      const rmKey = props.entries[res.source.index]?.[0]
      const updated: Entry[] = props.entries.reduce((pre: Entry[], [key, { config }], i) => {
        if (key !== rmKey) return ([...pre, [key, { config, index: i }]])
        return pre
      }, [])
      rmKey && props.onRemove?.(rmKey)
      props.setEntries(updated)
    }
  }

  const updateRecord = (newRecord: Record<Entry[0], Entry[1]>) => {
    const record = Object.fromEntries(props.entries)
    Object.entries(newRecord).forEach(([key, item]) => {
      record[key] = item
    })
    props.setEntries(Object.entries(record))
    props.onAdd?.(newRecord)
  }

  const removeRecord = (key: Entry[0]) => {
    props.setEntries(props.entries.filter(e => e[0] !== key))
    props.onRemove?.(key)
  }

  const setEntry = (entry: Entry) => {
    const [key, { config, index }] = entry
    const newRecord = { [key]: { config, index } }
    if (Object.keys(config).length > 0) {
      updateRecord(newRecord)
    } else {
      removeRecord(key)
    }
  }

  const setEntryMemo = React.useCallback(setEntry, [props.entries])

  return (
    <DragDropContext onDragEnd={onDragEnd} onBeforeCapture={onBeforeCapture}>
        <Droppable droppableId='hinagataList'>
          {(provided) => {
            const ref: typeof provided.innerRef = (e) => (provided.innerRef(e) as unknown)
            return (
              <div
                {...provided.droppableProps}
                ref={ref}
                >
                <Box className={classes.items}>
                  {
                    props.entries.map((entry, i) => {
                      return (
                        <React.Fragment key={entry[0]}>
                        <LazyLoad height={72} offset={100}>
                          <Hinagata
                            nth={i}
                            entry={entry}
                            setEntry={setEntryMemo}
                            { ...props.hinagataProps }
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
    { dragging && <DeleteDropzone droppableId='bin'/> }
    </DragDropContext>
  )
}

export { Content }
export type { ContentProps }
