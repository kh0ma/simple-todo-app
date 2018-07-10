var path = require('path');
var webpack = require('webpack');
module.exports = {
  entry: './front-end/app.js',
  output: {
    path: __dirname,
    filename: './src/main/resources/static/simple-todo-app.js'
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ['babel-loader']
    }]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
};
