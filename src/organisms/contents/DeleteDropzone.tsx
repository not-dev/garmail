import { Box } from '@material-ui/core'
import type { Theme } from '@material-ui/core/styles'
import { styled } from '@material-ui/core/styles'
import { Delete as DeleteIcon } from '@material-ui/icons'
import React from 'react'
import { Droppable } from 'react-beautiful-dnd'

const Inner = styled(Box)(() => ({
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}))

const Dropzone = styled('div')(({ theme }: { theme: Theme }) => ({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 72 + 8,
  width: 'calc(100% + 8px)',
  transform: 'translateX(-4px)',
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

type DeleteDropzoneProps = {
  droppableId: string
}

const DeleteDropzone: React.FC<DeleteDropzoneProps> = (props) => {
  console.log('# Render DeleteDropzone')

  return (
    <Droppable droppableId={props.droppableId}>
    {(provided) => {
      const ref: typeof provided.innerRef = (e) => (provided.innerRef(e) as unknown)
      return (
        <Dropzone
          {...provided.droppableProps}
          ref={ref}
          >
          <Inner>
            <DeleteIcon fontSize='large' color='inherit' />
          </Inner>
          {provided.placeholder}
        </Dropzone>
      )
    }}
    </Droppable>
  )
}

export { DeleteDropzone }
export type { DeleteDropzoneProps }
