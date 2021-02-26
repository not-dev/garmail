import * as path from 'path'
import type { Configuration } from 'webpack'

// import nodeExternals from 'webpack-node-externals'
import wp from './webpack.path'

const config:Configuration = {
  target: 'web',
  // externals: [nodeExternals()],
  context: wp.src,
  entry: {
    index: path.join(wp.src, 'index.tsx')
  },
  resolve: {
    extensions: [
      '.ts', '.js', '.tsx'
    ],
    alias: {
      '@assets': path.join(wp.src, 'assets'),
      '@utils': path.join(wp.src, 'utils')
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$|\.tsx$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          configFile: 'tsconfig.json'
        }
      },
      {
        test: /\.html$/,
        exclude: wp.public,
        loader: 'html-loader'
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack']
      }
    ]
  },
  output: {},
  plugins: []
}

export default config
