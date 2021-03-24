
import { CssBaseline } from '@material-ui/core'
import { StylesProvider, ThemeProvider } from '@material-ui/core/styles'
import React from 'react'

import { mainTheme as theme } from './theme'

const Page = React.lazy(() => import(/* webpackChunkName: "main" */'@@default/Home'))

import(/* webpackChunkName: "react-dom" */'react-dom')
  .then(ReactDOM => {
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
  })
  .catch(e => { throw e })
