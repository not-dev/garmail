
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@material-ui/core'
import type { Theme } from '@material-ui/core/styles'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { Edit as EditIcon, ExpandMore as ExpandMoreIcon, MailOutline as MailOutlineIcon } from '@material-ui/icons'
import type { ConfigItem } from '@organisms'
import { Config } from '@organisms'
import React from 'react'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    summary: {
      padding: 0,
      '& .MuiAccordionSummary-content': {
        marginTop: 0,
        marginBottom: 0
      },
      '& .MuiAccordionSummary-expandIcon': {
        marginRight: theme.spacing(2),
        '&:hover': {
          background: theme.palette.action.hover
        },
        transition: theme.transitions.create(['background'], {
          duration: theme.transitions.duration.standard,
          easing: theme.transitions.easing.easeOut
        })
      },
      '& .MuiAccordionSummary-expandIcon.Mui-expanded': {
        '& $expanded': {
          display: 'block'
        },
        '& $closed': {
          display: 'none'
        }
      }
    },
    summaryContent: {
      padding: theme.spacing(3, 2),
      display: 'flex',
      flex: 1,
      '&:hover $labelIcon': {
        color: theme.palette.primary.main
      }
    },
    labelIcon: {
      marginRight: theme.spacing(2),
      color: theme.palette.text.secondary,
      transition: theme.transitions.create(['color'], {
        duration: theme.transitions.duration.standard,
        easing: theme.transitions.easing.easeOut
      })
    },
    closed: {
      display: 'block'
    },
    expanded: {
      display: 'none'
    }
  })
)

type Entry = [string, ConfigItem]

type HinagataProps = {
  entry: Entry
  onClick: (entry:Entry) => void
  addEntry: (entry: Entry) => void
  removeEntry: (key: Entry[0]) => void
}

const Hinagata:React.FC<HinagataProps> = (props) => {
  console.log(`# Render Hinagata ${props.entry[0]}`)

  const classes = useStyles()

  const stopPropagation = (event:React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    event.preventDefault()
  }

  const [key, item] = props.entry

  const handleAction = (event:React.MouseEvent<HTMLElement>) => {
    stopPropagation(event)
    props.onClick?.(props.entry)
  }

  const handleDelete = () => props.removeEntry(key)
  const handleSave = (newItem: ConfigItem) => props.addEntry([key, newItem])

  return (
    <Accordion key={key}>
      <AccordionSummary
        className={classes.summary}
        expandIcon={
          <React.Fragment>
            <ExpandMoreIcon className={classes.expanded}/>
            <EditIcon fontSize='small' className={classes.closed}/>
          </React.Fragment>
        }
        onClick={stopPropagation}
        >
        <Box className={classes.summaryContent}
          onClick={handleAction}
          >
          <MailOutlineIcon color='inherit' className={classes.labelIcon}/>
          <Typography>{item.name}</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Config
          config={item}
          setConfig={handleSave}
          handleDelete={handleDelete}
        />
      </AccordionDetails>
    </Accordion>
  )
}

export { Hinagata }
export type { HinagataProps, Entry }
