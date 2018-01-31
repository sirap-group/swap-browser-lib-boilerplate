// const webpack = require('webpack')

module.exports = {
  target: 'web',

  node: {
    fs: 'empty'
  },

  module: {
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
