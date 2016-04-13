var autoprefixer = require('autoprefixer');

module.exports = {
  entry: ['babel-polyfill', './js/app.js'],
  output: {
    filename: 'bundle.js',
    path: __dirname,
  },
  context: __dirname,
  devtool: 'eval',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel!eslint',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'style!css!postcss'
      }
    ],
  },
  postcss: function () {
    return [autoprefixer({ browsers: ['last 2 versions'] })];
  }
}
