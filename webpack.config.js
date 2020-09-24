const path = require('path')
const webpack = require('webpack')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd
const filename = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`
const jsLoaders = () => {
  const loaders = ['babel-loader']
  if (isDev) {
  }
  return loaders
}
module.exports = {
  entry: './index.js',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@core': path.resolve(__dirname, 'src/core'),
      '@scss': path.resolve(__dirname, 'src/scss')
    }
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  devtool: isDev && 'source-map',
  devServer: {
    port: 3000,
    hot: isDev,
    clientLogLevel: 'error',
    open: true
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: 'index.html',
      minify: {
        removeComments: isProd,
        collapseWhitespace: isProd
      }
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/favicon.ico'),
          to: path.resolve(__dirname, 'dist')
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: filename('css')
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(s[ac]ss|css)$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true
            }
          },
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoaders(),
      }
    ]
  }
}