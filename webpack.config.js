var path = require('path');
var webpack = require('webpack');
module.exports = {
  mode: 'development',
  entry: './front-end/app.js',
  output: {
    path: __dirname,
    filename: './src/main/resources/static/simple-todo-app.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader'
      }
    }]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
};
