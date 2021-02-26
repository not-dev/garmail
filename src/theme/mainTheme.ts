import { createMuiTheme } from '@material-ui/core'
import { grey, orange, red, teal } from '@material-ui/core/colors'

const mainTheme = createMuiTheme({
  palette: {
    type: 'light', // dark
    primary: {
      main: teal[500]
    },
    secondary: {
      main: orange[600]
    },
    error: {
      main: red.A400
    },
    text: {
      primary: grey.A400, // 300
      secondary: grey[700] // 500
    },
    background: {
      paper: 'white', // 800
      default: grey[50] // A400
    },
    common: {
      black: grey.A400,
      white: 'white'
    },
    action: {
      hoverOpacity: 0.08
    }
  },
  typography: {
    fontFamily: '"Roboto","BIZ UPDGothic",sans-serif',
    fontWeightLight: 400,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 500,
    h1: {
      fontFamily: '"Roboto","BIZ UPDGothic",sans-serif'
    },
    h2: {
      fontFamily: '"Roboto","BIZ UPDGothic",sans-serif'
    },
    h3: {
      fontFamily: '"Roboto","BIZ UPDGothic",sans-serif'
    },
    h4: {
      fontFamily: '"Roboto","BIZ UPDGothic",sans-serif'
    },
    h5: {
      fontFamily: '"Roboto","BIZ UPDGothic",sans-serif'
    },
    h6: {
      fontFamily: '"Roboto","BIZ UPDGothic",sans-serif'
    },
    subtitle1: {
      fontFamily: '"Roboto","BIZ UPDGothic",sans-serif'
    },
    subtitle2: {
      fontFamily: '"Roboto","BIZ UPDGothic",sans-serif'
    },
    body1: {
      fontFamily: '"Roboto","BIZ UPDGothic",sans-serif'
    },
    body2: {
      fontFamily: '"Roboto","BIZ UPDGothic",sans-serif'
    },
    button: {
      fontFamily: '"Roboto","BIZ UPDGothic",sans-serif',
      textTransform: 'none'
    },
    caption: {
      fontFamily: '"Roboto","BIZ UPDGothic",sans-serif'
    },
    overline: {
      fontFamily: '"Roboto","BIZ UPDGothic",sans-serif'
    }
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '*': {
          '&::-webkit-scrollbar': {
            width: 6
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(0,0,0,0)'
          },
          '&::-webkit-scrollbar-thumb': {
            background: grey[400],
            borderRadius: 3
          }
        },
        html: {
          fontSize: 16,
          overflowX: 'hidden',
          width: '100%'
        },
        body: {
          textRendering: 'optimizeLegibility'
        }
      }
    }
  }
})

export { mainTheme }
