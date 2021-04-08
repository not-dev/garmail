import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import * as path from 'path'
import TerserPlugin from 'terser-webpack-plugin'
import type { Configuration } from 'webpack'
import { merge } from 'webpack-merge'

import common from './webpack.common'
import wp from './webpack.path'

const base: Configuration = merge(common, {
  mode: 'production',
  output: {
    filename: path.posix.join('api', '[name]/bundle.js'),
    path: wp.build
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      terserOptions: {
        compress: { drop_console: true }
      }
    })]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(wp.public, 'res', 'head.html'),
      filename: path.join('res', '[name].html'),
      minify: false,
      publicPath: ''
    })
  ]
})

const configs: Configuration[] = [
  merge(base, {
    entry: {
      garoon: path.posix.join(wp.src, 'api', 'garoon', 'index.ts')
    },
    output: {
      library: {
        type: 'var',
        name: 'GrnAPIWrapper'
      }
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ['api/garoon/**/*']
      })
    ]
  })
]

export default configs
