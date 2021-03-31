import * as path from 'path'
import type { Configuration } from 'webpack'
import { merge } from 'webpack-merge'

import wp from './webpack.path'
import prodbase from './webpack.prod.base'

const configs: Configuration[] = [
  merge(prodbase, {
    entry: {
      'garoon-api': path.join(wp.src, 'api', 'garoon', 'index.ts')
    },
    output: {
      library: {
        type: 'var',
        name: 'GrnAPIWrapper'
      }
    }
  }),
  merge(prodbase, {
    entry: {
      'indexeddb-api': path.join(wp.src, 'api', 'indexedDB', 'index.ts')
    },
    output: {
      library: {
        type: 'var',
        name: 'IndexedDBAPIWrapper'
      }
    }
  })
]

export default configs
