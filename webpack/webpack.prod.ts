import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import * as path from 'path'
import type { Configuration } from 'webpack'
import { merge } from 'webpack-merge'

import _wc from './webpack.common'
import _wp, { prefix as _prefix } from './webpack.path'

const common = {
  config: _wc,
  path: _wp,
  prefix: _prefix
}

const prod:Configuration = merge(common.config, {
  mode: 'production',
  output: {
    filename: path.posix.join(common.prefix, 'bundle-[hash].js'),
    path: common.path.build
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          context: common.path.public,
          from: '**/*',
          to: common.path.build,
          globOptions: {
            ignore: [
              path.join(common.path.public, '**/*.html').split(path.sep).join(path.posix.sep),
              path.join(common.path.public, '**/*.ejs').split(path.sep).join(path.posix.sep)
            ]
          }
        }
      ]
    }),
    new HtmlWebpackPlugin({
      template: path.join(common.path.public, 'index.html'),
      minify: false,
      inject: 'body'
    })
  ]
})

export default prod
