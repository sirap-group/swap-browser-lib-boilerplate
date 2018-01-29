const path = require('path')

module.exports = {
  entry: './src/tests/index.test.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.test.js'
  },
  devtool: 'source-map',
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
