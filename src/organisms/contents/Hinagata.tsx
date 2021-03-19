import { Accordion, AccordionDetails, AccordionSummary, Box, IconButton, Typography } from '@material-ui/core'
import type { Theme } from '@material-ui/core/styles'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { DragHandle as DragHandleIcon, Edit as EditIcon, ExpandMore as ExpandMoreIcon } from '@material-ui/icons'
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
      }),
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
type Entry = [string, { index: number, config: ConfigItem }]

type HinagataProps = {
  entry: Entry
  setEntry: (entry: Entry) => void
  onClick: (entry: Entry) => void
  nth: number
  configProps: Pick<ConfigProps, 'signatureList'>
}

const Hinagata: React.FC<HinagataProps> = (props) => {
  console.log(`# Render Hinagata ${props.entry[0]}`)

  const classes = useStyles()

  const [key, { config: item, index }] = props.entry

  const [expanded, setExpanded] = React.useState(false)

  const toggleExpanded = () => setExpanded(!expanded)

  const handleAction = (event: React.MouseEvent<HTMLElement>) => {
    stopPropagation(event)
    props.onClick?.(props.entry)
  }

  const handleDelete = () => props.setEntry([key, { index, config: {} }])
  const handleSave = (newItem: ConfigItem) => props.setEntry([key, { index, config: newItem }])

  const getStyle = (style: DraggableProvidedDraggableProps['style'], snapshot: DraggableStateSnapshot) => {
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

  const handleCloseContextMenu = () => setContext(false)

  const onContextMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor({ x: event.clientX, y: event.clientY })
    setContext(true)
  }

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
                  onContextMenu={onContextMenu}
                >
                  <AccordionSummary
                    className={classes.summary}
                    onClick={stopPropagation}
                  >
                    <Box className={classes.summaryContent}
                      onClick={handleAction}
                    >
                      <Box {...provided.dragHandleProps} onClick={stopPropagation} className={classes.dragHandle}>
                        <DragHandleIcon color='inherit' />
                      </Box>
                      <Typography>{item.name}</Typography>
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
                        { ...props.configProps }
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
