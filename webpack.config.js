const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 8080,
    liveReload: true,
    hot: false,
    open: true,
    overlay: {
      warnings: true,
      errors: true
    },
    writeToDisk: true,
    watchContentBase: true
  },
  mode: "production",
  entry: {
    index: "./src/index/index.js",
    about: "./src/about/index.js"
  },
  output: {
    filename: "[chunkhash].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin([{ from: "./src/assets", to: "./assets" }]),
    new HtmlWebpackPlugin({
      title: "Index",
      template: "src/index/index.html",
      filename: "index.html",
      chunks: ["index"],
      inject: true,
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    }),
    new HtmlWebpackPlugin({
      title: "About",
      filename: "about/index.html",
      template: "src/about/index.html",
      chunks: ["about"],
      inject: true,
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: "[contenthash].css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.(s*)css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
          "postcss-loader"
        ]
      },

      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
};
