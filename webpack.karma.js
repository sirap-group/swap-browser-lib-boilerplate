const webpackConfig = require('./webpack.common')

module.exports = Object.assign({
  module: Object.assign({
    // Suppress warning from mocha: "Critical dependency: the request of a dependency is an expression"
    // @see https://webpack.js.org/configuration/module/#module-contexts
    exprContextCritical: false
  }, webpackConfig.module)
}, webpackConfig)
