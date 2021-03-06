/*
    ./webpack.config.js
*/
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: "./client/src/index.html",
  filename: "index.html",
  inject: "body"
});

var TypedocWebpackPlugin = require("typedoc-webpack-plugin");

const TypedocWebpackPluginConfig = new TypedocWebpackPlugin({
  name: "plastic",
  mode: "file",
  theme: "./typedoc-theme/",
  includeDeclarations: false,
  ignoreCompilerErrors: true
});

module.exports = {
  entry: "./client/src/index.js",
  output: {
    path: path.resolve("dist"),
    filename: "index_bundle.js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "babel-loader"
          },
          {
            loader: "react-svg-loader",
            options: {
              jsx: true // true outputs JSX tags
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [HtmlWebpackPluginConfig, TypedocWebpackPluginConfig]
};
