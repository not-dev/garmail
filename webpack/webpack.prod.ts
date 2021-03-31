import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import * as path from 'path'
import type { Configuration } from 'webpack'
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import { merge } from 'webpack-merge'

import wp from './webpack.path'
import base from './webpack.prod.base'

const config: Configuration = merge(base, {
  entry: {
    index: path.join(wp.src, 'index.tsx')
  },
  externals: {
    '@api/garoon': 'GrnAPIWrapper',
    '@api/indexedDB': 'IndexedDBAPIWrapper'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        react: {
          test: /[\\/]node_modules[\\/](react-dom)/,
          name: 'react-dom'
        },
        mui: {
          test: /[\\/]node_modules[\\/](@material-ui)/,
          name: 'mui'
        },
        vendor: {
          test: /[\\/]node_modules[\\/](?!(@material-ui)|(react-dom))/,
          name: 'vendor'
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          context: wp.public,
          from: '**/*',
          to: wp.build,
          globOptions: {
            ignore: [
              path.join(wp.public, '**/index.html').split(path.sep).join(path.posix.sep),
              path.join(wp.public, '**/*.ejs').split(path.sep).join(path.posix.sep)
            ]
          }
        }
      ]
    }),
    new HtmlWebpackPlugin({
      template: path.join(wp.public, 'index.html')
    })
    // new BundleAnalyzerPlugin()
  ]
})

export default config
