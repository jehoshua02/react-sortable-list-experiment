var path = require('path');
var HtmlPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval',
  entry: "./src/index",
  output: {
    path: "./build/",
    filename: "app.js"
  },
  module: {
    loaders: [
      { test: /\.jsx$/, loader: 'babel-loader' }
    ]
  },
  resolve: {
    extensions: ["", ".js", ".jsx"],
    root: path.resolve(__dirname, './src')
  },
  plugins: [
    new HtmlPlugin({
      title: 'React Sortable List Experiment'
    })
  ]
};
