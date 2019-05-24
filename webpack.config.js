var path = require('path');
var webpack = require('webpack');
module.exports = {
  mode: 'development',
  entry: './front-end/app.js',
  output: {
    path: path.join(__dirname, './src/main/resources/static'),
    filename: './js/simple-todo-app.js'
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
  devServer: {
    contentBase: path.join(__dirname, './src/main/resources/static'),
    open: true,
    compress: false,
    port: 5050
  },
  plugins: [
    new webpack.DefinePlugin({
        //FIX ME UNCOMMENT ME if locally
        // 'URL': JSON.stringify("http://localhost:5555")
    })
  ]
};
