var path = require('path');
var HtmlPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'sourcemap',
  entry: "./src/index",
  output: {
    path: "./build/",
    filename: "app.js"
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, include: path.resolve(__dirname, './src'), loader: 'babel-loader' }
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
