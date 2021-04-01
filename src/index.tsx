
import { CssBaseline } from '@material-ui/core'
import { StylesProvider, ThemeProvider } from '@material-ui/core/styles'
import React from 'react'

import { grnTheme as theme } from './theme'

const Page = React.lazy(() => import(/* webpackChunkName: "home", webpackPrefetch: true */ '@default/Home'))

import('react-dom')
  .then(ReactDOM => {
    ReactDOM.render(
      <React.StrictMode>
        <StylesProvider injectFirst>
          <ThemeProvider theme={theme}>
          <CssBaseline />
            <React.Suspense fallback={<></>}>
              <Page />
            </React.Suspense>
          </ThemeProvider>
        </StylesProvider>
      </React.StrictMode>,
      document.getElementById('garmail-root')
    )
  })
  .catch(e => { throw e })
