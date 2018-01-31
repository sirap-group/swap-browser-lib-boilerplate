const webpack = require('webpack')
const path = require('path')

const webpackConfig = require('./webpack.common')

module.exports = Object.assign({
  entry: {
    'demo-class': './src/lib/index.js',
    'demo-class.min': './src/lib/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true,
      sourceMap: true
    })
  ]
}, webpackConfig)
