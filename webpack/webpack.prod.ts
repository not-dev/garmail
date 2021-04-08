import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import * as path from 'path'
import TerserPlugin from 'terser-webpack-plugin'
import type { Configuration } from 'webpack'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import { merge } from 'webpack-merge'

import common from './webpack.common'
import wp from './webpack.path'

const base: Configuration = merge(common, {
  mode: 'production',
  entry: {
    index: path.join(wp.src, 'index.tsx')
  },
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
    })],
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
              path.join(wp.public, '**/*.html').split(path.sep).join(path.posix.sep),
              path.join(wp.public, '**/*.ejs').split(path.sep).join(path.posix.sep)
            ]
          }
        }
      ]
    }),
    new HtmlWebpackPlugin({
      template: path.join(wp.public, 'index.html'),
      minify: false,
      inject: 'body'
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: 'bundle-analyzer.html',
      openAnalyzer: false
    })
  ]
})

export default base
