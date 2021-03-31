import * as path from 'path'
import TerserPlugin from 'terser-webpack-plugin'
import type { Configuration } from 'webpack'
import { merge } from 'webpack-merge'

import common from './webpack.common'
import wp from './webpack.path'

const base: Configuration = merge(common, {
  mode: 'production',
  output: {
    filename: path.posix.join('static', 'js', '[name].js'),
    chunkFilename: path.posix.join('static', 'chunk', '[name]-[contenthash].js'),
    path: wp.build
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      terserOptions: {
        compress: { drop_console: true }
      }
    })]
  }
})

export default base
