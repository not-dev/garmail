import { Box } from '@material-ui/core'
import type { Theme } from '@material-ui/core/styles'
import { styled } from '@material-ui/core/styles'
import { Delete as DeleteIcon } from '@material-ui/icons'
import React from 'react'
import { Droppable } from 'react-beautiful-dnd'

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
          <FlexBox position='absolute'>
            <DeleteIcon fontSize='large' color='inherit' />
          </FlexBox>
          {provided.placeholder}
        </Dropzone>
      )
    }}
    </Droppable>
  )
}

export { DeleteDropzone }
export type { DeleteDropzoneProps }
