import { Accordion, AccordionDetails, AccordionSummary, Box, IconButton, TextField, Typography } from '@material-ui/core'
import type { Theme } from '@material-ui/core/styles'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { DragHandle as DragHandleIcon, Edit as EditIcon, ExpandMore as ExpandMoreIcon } from '@material-ui/icons'
import type { CSSProperties } from '@material-ui/styles'
import { ContextMenu } from '@molecules'
import type { ConfigItem, ConfigProps } from '@organisms'
import { Config } from '@organisms'
import clsx from 'clsx'
import React from 'react'
import type { DraggableProvidedDraggableProps, DraggableStateSnapshot } from 'react-beautiful-dnd'
import { Draggable } from 'react-beautiful-dnd'
import LazyLoad, { forceCheck } from 'react-lazyload'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    accordionWrapper: {
      '&:first-child .MuiAccordion-root:before': {
        display: 'none'
      },
      '&.Mui-expanded': {
        '&:first-child': {
          marginTop: 0
        },
        '&:last-child': {
          marginBottom: 0
        }
      },
      '&.MuiAccordion-rounded': {
        '&:last-child': {
          borderBottomLeftRadius: 4,
          borderBottomRightRadius: 4

        },
        '&:first-child': {
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4
        }
      }
    },
    accordionWrapped: {
      '&:first-child:before': {
        /* display: 'none' */
        display: 'block'
      },
      '&.Mui-expanded': {
        '&:first-child': {
          /* marginTop: 0 */
          marginTop: theme.spacing(2)
        },
        '&:last-child': {
          /* marginBottom: 0 */
          marginBottom: theme.spacing(2)
        }
      },
      '&.MuiAccordion-rounded': {
        '&:last-child': {
          /*
            borderBottomLeftRadius: 4,
            borderBottomRightRadius: 4
          */
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0
        },
        '&:first-child': {
          /*
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4
          */
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0
        }
      }
    },
    summary: {
      padding: 0,
      '& .MuiAccordionSummary-content': {
        marginTop: 0,
        marginBottom: 0
      },
      transition: theme.transitions.create(['background'], {
        duration: theme.transitions.duration.standard,
        easing: theme.transitions.easing.easeOut
      })
    },
    hover: {
      '&:hover': {
        background: theme.palette.action.hover
      }
    },
    summaryContent: {
      display: 'flex',
      flex: 1,
      alignItems: 'center'
    },
    expandIcon: {
      padding: theme.spacing(1.5),
      transform: 'rotate(0deg)',
      transition: theme.transitions.create(['transform'], {
        duration: theme.transitions.duration.shortest,
        easing: theme.transitions.easing.easeOut
      })
    },
    rotate: {
      transform: 'rotate(180deg)'
    },
    dragHandle: {
      color: theme.palette.text.secondary,
      display: 'flex',
      padding: theme.spacing(3, 2)
    },
    titleInput: {
      '& .MuiOutlinedInput-input': {
        background: theme.palette.action.selected,
        transition: theme.transitions.create(['background'], {
          duration: theme.transitions.duration.shortest,
          easing: theme.transitions.easing.easeInOut
        })
      },
      '& .MuiOutlinedInput-input:focus': {
        background: theme.palette.background.paper
      }
    }
  })
)

const stopPropagation = (event: React.MouseEvent<HTMLElement>) => {
  event.stopPropagation()
  event.preventDefault()
}

/**
 * [key, config, index]
 */
type Entry = [string, { index: number, title: string, config: ConfigItem }]

type HinagataProps = {
  entry: Entry
  setEntry: (entry: Entry) => void
  onClick: (entry: Entry) => void
  handleDelete: (key: Entry[0]) => void
  nth: number
  text: {
    config: ConfigProps['text']
  }
  initExpanded?: boolean
}

const Hinagata: React.FC<HinagataProps> = (props) => {
  console.log(`# Render Hinagata ${props.entry[0]}`)

  const classes = useStyles()

  const [key, { config: item, index, title }] = props.entry

  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>): void => {
    props.setEntry([key, { ...props.entry[1], title: event.target.value }])
  }

  const [expanded, setExpanded] = React.useState(props.initExpanded || false)

  const toggleExpanded = (): void => setExpanded(!expanded)

  const handleAction = (event: React.MouseEvent<HTMLElement>): void => {
    stopPropagation(event)
    props.onClick?.(props.entry)
  }

  const handleDelete = (): void => props.handleDelete(key)
  const handleSave = (newItem: ConfigItem): void => props.setEntry([key, { index, title, config: newItem }])

  const getStyle = (style: DraggableProvidedDraggableProps['style'], snapshot: DraggableStateSnapshot): DraggableProvidedDraggableProps['style'] | CSSProperties => {
    if (!snapshot.isDropAnimating) {
      return style
    }
    if (snapshot.draggingOver === 'bin') {
      const { moveTo, curve, duration } = snapshot.dropAnimation || { moveTo: { x: 0, y: 0 }, curve: 'ease', duration: 0.3 }
      return ({
        ...style,
        transform: `translate(0px,${moveTo.y}px) rotateX(-20deg) scale(0.2)`,
        opacity: 0,
        transition: `transform ${curve} ${duration + 0.1}s, opacity ease-out ${duration}s`
      })
    }
    return style
  }

  React.useEffect(() => {
    forceCheck()
  }, [expanded])

  const [context, setContext] = React.useState(false)
  const [anchor, setAnchor] = React.useState({ x: 0, y: 0 })

  const handleCloseContextMenu = (): void => setContext(false)

  const onContextMenu = (event: React.MouseEvent<HTMLElement>): void => {
    stopPropagation(event)
    setAnchor({ x: event.clientX, y: event.clientY })
    setContext(true)
  }

  const onFocusText = (e: React.FocusEvent<HTMLInputElement|HTMLTextAreaElement>): void => e.target.select()

  return (
    <React.Fragment>
      <Draggable draggableId={key} index={props.nth}>
        {(provided, snapshot) => {
          const ref: typeof provided.innerRef = (e) => (provided.innerRef(e) as unknown)
          return (
            <div ref={ref}
              {...provided.draggableProps}
              style={getStyle(provided.draggableProps.style, snapshot)}
              className={classes.accordionWrapper}
            >
              <Accordion className={classes.accordionWrapped}
                expanded={expanded}
                onClick={stopPropagation}
              >
                <AccordionSummary
                  className={clsx(classes.summary, !expanded && classes.hover)}
                  onClick={stopPropagation}
                  onContextMenu={onContextMenu}
                >
                  <Box className={classes.summaryContent}
                    onClick={handleAction}
                  >
                    <Box className={classes.dragHandle}
                      onClick={stopPropagation}
                      {...provided.dragHandleProps}
                      >
                      <DragHandleIcon color='inherit' />
                    </Box>
                    {
                      expanded
                        ? <TextField variant='outlined' className={classes.titleInput}
                          value={title}
                          onClick={stopPropagation}
                          onChange={onChangeTitle}
                          onFocus={onFocusText}
                        />
                        : <Typography>{title}</Typography>
                    }
                  </Box>
                  <Box display='flex' justifyContent='center' alignItems='center' mr={2}>
                    <IconButton className={clsx(classes.expandIcon, expanded && classes.rotate)}
                      onClick={toggleExpanded}
                    >
                      {
                        expanded
                          ? <ExpandMoreIcon />
                          : <EditIcon fontSize='small' style={{ margin: '2px' }} />
                      }
                    </IconButton>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <LazyLoad style={{ flex: 1 }} height={400}
                    once
                    offset={expanded ? 0 : -window.innerHeight}
                  >
                    <Config
                      config={item}
                      setConfig={handleSave}
                      handleDelete={handleDelete}
                      text={props.text.config}
                    />
                  </LazyLoad>
                </AccordionDetails>
              </Accordion>
              <ContextMenu
                open={context}
                onClose={handleCloseContextMenu}
                handleDelete={handleDelete}
                anchorPosition={{ top: anchor.y - 8, left: anchor.x - 4 }}
              />
            </div>
          )
        }}
      </Draggable>
    </React.Fragment>
  )
}

export { Hinagata }
export type { HinagataProps, Entry }
