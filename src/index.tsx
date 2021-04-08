
import { grnTheme as theme } from '@components/theme'
import { CssBaseline } from '@material-ui/core'
import { StylesProvider, ThemeProvider } from '@material-ui/core/styles'
import React from 'react'

const Page = React.lazy(() => import(/* webpackChunkName: "home", webpackPrefetch: true */ '@default/Home'))

const rootDOM = document.getElementById('garmail-root')
rootDOM?.setAttribute('data-version', '1.3.0')

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
      rootDOM
    )
  })
  .catch(e => { throw e })
