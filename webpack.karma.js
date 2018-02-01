const path = require('path')
const webpackConfig = require('./webpack.common')

// Suppress warning from mocha: "Critical dependency: the request of a dependency is an expression"
// @see https://webpack.js.org/configuration/module/#module-contexts
webpackConfig.module.exprContextCritical = false

// add loader: istanbul-instrumenter
webpackConfig.module.rules.push({
  // instrument only testing sources with Istanbul
  test: /\.js$/,
  use: {
    loader: 'istanbul-instrumenter-loader',
    options: {
      esModules: true
    }
  },
  include: path.resolve('src'),
  exclude: /node_modules|\.spec\.js$|\.test\.js$/
})

module.exports = webpackConfig
