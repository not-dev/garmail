
import { CssBaseline } from '@material-ui/core'
import { StylesProvider, ThemeProvider } from '@material-ui/core/styles'
import React from 'react'
import ReactDOM from 'react-dom'

import { Page } from './pages'
import { mainTheme as theme } from './theme'

ReactDOM.render(
  <React.StrictMode>
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Page />
      </ThemeProvider>
    </StylesProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
