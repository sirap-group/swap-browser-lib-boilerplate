// const path = require('path')

module.exports = {
  // entry: './src/lib/index.js',
  // output: {
  //   path: path.resolve(__dirname, 'dist'),
  //   filename: 'demo-class.js'
  // },

  target: 'web',

  node: {
    fs: 'empty'
  },

  module: {
    // Suppress warning from mocha: "Critical dependency: the request of a dependency is an expression"
    // @see https://webpack.js.org/configuration/module/#module-contexts
    exprContextCritical: false,

    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,

        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  }
}
