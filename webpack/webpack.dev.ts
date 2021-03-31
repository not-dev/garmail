import HtmlWebpackPlugin from 'html-webpack-plugin'
import * as path from 'path'
import type { Configuration } from 'webpack'
import { merge } from 'webpack-merge'

import common from './webpack.common'
import wp from './webpack.path'

const config:Configuration = merge(common, {
  mode: 'development',
  entry: {
    index: path.join(wp.src, 'index.tsx')
  },
  output: {
    filename: path.posix.join('static', 'js', '[name]-[contenthash].js'),
    chunkFilename: path.posix.join('static', 'chunk', '[name]-[contenthash].js'),
    path: wp.build
  },
  devServer: {
    contentBase: wp.public,
    compress: true,
    port: 8080
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(wp.public, 'index.html')
    })
  ]
})

export default config
