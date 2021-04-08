import type { Entry } from '@components/organisms'
import { DeleteDropzone } from '@components/organisms'
import { Box } from '@material-ui/core'
import type { Theme } from '@material-ui/core/styles'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { reorder } from '@util'
import React from 'react'
import type { OnBeforeCaptureResponder, OnDragEndResponder } from 'react-beautiful-dnd'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

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
}

const Content: React.FC<ContentProps> = (props) => {
  console.log('# Render Content')

  const classes = useStyles()

  const [dragging, setDragging] = React.useState(false)

  const onBeforeCapture: OnBeforeCaptureResponder = (): void => {
    setDragging(true)
  }

  const onDragEnd: OnDragEndResponder = (res): void => {
    setDragging(false)

    console.log(res)

    if (res.destination == null) return

    if ((res.source.droppableId === res.destination.droppableId) && (res.source.index === res.destination.index)) return

    if (res.source.droppableId === res.destination.droppableId) {
      const ordered: Entry[] = reorder(
        props.entries,
        res.source.index,
        res.destination.index
      ).map(([key, value], i) => [key, { ...value, index: i }])

      const add: Record<Entry[0], Entry[1]> = ordered.reduce((rec: Record<Entry[0], Entry[1]>, [key, value]) => {
        const preIndex = Object.fromEntries(props.entries)[key]?.index
        if (value.index !== preIndex) return ({ ...rec, [key]: value })
        return rec
      }, {})
      props.onAdd?.(add)
      props.setEntries(ordered)
    }

    if (res.destination.droppableId === 'bin') {
      const rmKey = props.entries[res.source.index]?.[0]
      const updated: Entry[] = props.entries.reduce((pre: Entry[], [key, value], i) => {
        if (key !== rmKey) return ([...pre, [key, { ...value, index: i }]])
        return pre
      }, [])
      rmKey && props.onRemove?.(rmKey)
      props.setEntries(updated)
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd} onBeforeCapture={onBeforeCapture}>
      <Box>
        <Droppable droppableId='hinagataList'>
          {(provided) => {
            const ref: typeof provided.innerRef = (e) => (provided.innerRef(e) as unknown)
            return (
              <div
                {...provided.droppableProps}
                ref={ref}
                >
                <Box className={classes.items}>
                  { props.children }
                </Box>
                {provided.placeholder}
              </div>
            )
          }}
        </Droppable>
    {
      dragging && <DeleteDropzone droppableId='bin'/>
    }
    </Box>
    </DragDropContext>
  )
}

export { Content }
export type { ContentProps }
