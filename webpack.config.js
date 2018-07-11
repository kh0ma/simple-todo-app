var path = require('path');
var webpack = require('webpack');
module.exports = {
  mode: 'development',
  entry: './front-end/app.js',
  output: {
    path: __dirname,
    filename: './src/main/resources/static/js/simple-todo-app.js'
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
    compress: false,
    port: 5050
  },
  plugins: [
    new webpack.DefinePlugin({

        'URL': JSON.stringify("http://localhost:5555/greetings")

    })
  ]
};

// new webpack.DefinePlugin({
//   'api.config':{
//     'URL': JSON.stringify("LOCALHOST_TEST_URL")
//   }
// });
//
// webpackConfig.plugins.push(
//   new webpack.DefinePlugin({
//
//       'URL': JSON.stringify("LOCALHOST_TEST_URL")
//
//   })
// );
