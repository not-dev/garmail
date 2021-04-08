import * as path from 'path'
import type { Configuration } from 'webpack'
import { merge } from 'webpack-merge'

import wp from './webpack.path'
import base from './webpack.prod'

const override: Configuration = {
  resolve: {
    alias: {
      '@api/garoon': path.join(wp.src, 'api', 'chrome', 'garoon'),
      '@api/storage': path.join(wp.src, 'api', 'chrome', 'storage')
    }
  }
}

const config: Configuration = merge(override, base, {
  externals: {
    // '@api/garoon': 'GrnAPIWrapper'
    // '@api/storage': 'storageAPIWrapper'
  }
})

export default config
