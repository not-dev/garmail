import { createMuiTheme } from '@material-ui/core'
import { amber, blue, grey } from '@material-ui/core/colors'

const baseTheme = createMuiTheme({
  palette: {
    type: 'light', // dark
    primary: {
      main: blue[500]
    },
    secondary: {
      main: amber[500]
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
  }
})

const mainTheme = createMuiTheme({
  ...baseTheme,
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '*': {
          '&::-webkit-scrollbar': {
            width: 6,
            height: 8
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

const grnTheme = createMuiTheme({
  ...baseTheme,
  palette: {
    ...baseTheme.palette,
    background: {
      ...baseTheme.palette.background,
      default: '#fcfcfc'
    }
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          fontSize: 16
        },
        ':where(#garmail-root),:where(.MuiDialog-root),:where(.MuiPopover-root)': {
          '& *': {
            '&::-webkit-scrollbar': {
              width: 6,
              height: 8
            },
            '&::-webkit-scrollbar-track': {
              background: 'rgba(0,0,0,0)'
            },
            '&::-webkit-scrollbar-thumb': {
              background: grey[400],
              borderRadius: 3
            }
          },
          '&:not(\\20)': {
            '& button': {
              height: 'unset',
              font: 'unset',
              '&:hover': {
                border: 'unset'
              },
              '&:focus': {
                outline: 'unset',
                transition: 'unset'
              }
            },
            '& input, input[type], textarea': {
              padding: 'unset',
              font: 'unset',
              height: 'unset',
              lineHeight: 'unset',
              boxSizing: 'content-box',
              borderRadius: 'unset',
              '-webkit-appearance': 'unset',
              '&:hover': {
                border: 'unset'
              },
              '&.MuiOutlinedInput-input': {
                padding: '18.5px 14px',
                '&.MuiOutlinedInput-inputMarginDense': {
                  padding: '10.5px 10.5px'
                }
              },
              '&.MuiOutlinedInput-inputMultiline': {
                padding: 0
              }
            },
            '& a': {
              '&:link, &:visited': {
                color: 'unset',
                textDecoration: 'none'
              },
              '&.MuiTypography-colorPrimary': {
                color: baseTheme.palette.primary.main
              },
              '&.MuiLink-underlineHover': {
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline'
                }
              }
            }
          }
        }
      }
    }
  }
})

export { mainTheme, grnTheme }
