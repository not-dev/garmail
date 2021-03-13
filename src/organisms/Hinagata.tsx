
import { Accordion, AccordionDetails, AccordionSummary, Box, IconButton, Typography } from '@material-ui/core'
import type { Theme } from '@material-ui/core/styles'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { Edit as EditIcon, ExpandMore as ExpandMoreIcon, MailOutline as MailOutlineIcon } from '@material-ui/icons'
import { ContextMenu } from '@molecules'
import type { ConfigItem } from '@organisms'
import { Config } from '@organisms'
import clsx from 'clsx'
import React from 'react'
import LazyLoad, { forceCheck } from 'react-lazyload'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '&.Mui-expanded': {
        '&:first-child': {
          marginTop: theme.spacing(2)
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
      padding: theme.spacing(3, 2),
      display: 'flex',
      flex: 1
    },
    labelIcon: {
      marginRight: theme.spacing(2),
      color: theme.palette.text.secondary
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
    }
  })
)

const stopPropagation = (event: React.MouseEvent<HTMLElement>) => {
  event.stopPropagation()
  event.preventDefault()
}

type Entry = [string, ConfigItem]

type HinagataProps = {
  entry: Entry
  onClick: (entry: Entry) => void
  addEntry: (entry: Entry) => void
  removeEntry: (key: Entry[0]) => void
}

const Hinagata: React.FC<HinagataProps> = (props) => {
  console.log(`# Render Hinagata ${props.entry[0]}`)

  const classes = useStyles()

  const [expanded, setExpanded] = React.useState(false)

  const toggleExpanded = () => setExpanded(!expanded)

  React.useEffect(() => {
    forceCheck()
  }, [expanded])

  const [key, item] = props.entry

  const handleAction = (event: React.MouseEvent<HTMLElement>) => {
    stopPropagation(event)
    props.onClick?.(props.entry)
  }

  const handleDelete = () => props.removeEntry(key)
  const handleSave = (newItem: ConfigItem) => props.addEntry([key, newItem])

  const [openContext, setOpenContext] = React.useState(false)
  const [anchor, setAnchor] = React.useState({ x: 0, y: 0 })

  const handleClickContextMenu = (event: React.MouseEvent<HTMLElement>) => {
    stopPropagation(event)
    setAnchor({
      x: event.clientX,
      y: event.clientY
    })
    setOpenContext(true)
  }
  const handleCloseContextMenu = () => { setOpenContext(false) }

  return (
    <React.Fragment>
      <Accordion className={classes.root}
        expanded={expanded}
        onContextMenu={handleClickContextMenu}
      >
        <AccordionSummary
          className={classes.summary}
          onClick={stopPropagation}
        >
          <Box className={classes.summaryContent}
            onClick={handleAction}
          >
            <MailOutlineIcon color='inherit' className={classes.labelIcon} />
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
            />
          </LazyLoad>
        </AccordionDetails>
      </Accordion>
      <ContextMenu
        open={openContext}
        onClose={handleCloseContextMenu}
        onClickDelete={handleDelete}
        anchorPosition={{ top: anchor.y - 8, left: anchor.x - 4 }}
        deletemsg={`テンプレート「${item.name}」を削除します`}
      />
    </React.Fragment>
  )
}

export { Hinagata }
export type { HinagataProps, Entry }
