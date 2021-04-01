import Dotenv from 'dotenv-webpack'
import * as path from 'path'
import type { Configuration } from 'webpack'

// import nodeExternals from 'webpack-node-externals'
import wp from './webpack.path'

const common: Configuration = {
  target: 'web',
  // externals: [nodeExternals()],
  context: wp.src,
  resolve: {
    extensions: [
      '.ts', '.js', '.tsx'
    ],
    alias: {
      '@default': path.join(wp.src, '@default'),
      '@assets': path.join(wp.src, 'assets'),
      '@api': path.join(wp.src, 'api'),
      '@atoms': path.join(wp.src, 'atoms'),
      '@molecules': path.join(wp.src, 'molecules'),
      '@organisms': path.join(wp.src, 'organisms'),
      '@pages': path.join(wp.src, 'pages'),
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
      },
      {
        test: /\.css/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { url: false }
          }
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new Dotenv()
  ]
}

export default common
