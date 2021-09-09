const path = require("path")

module.exports = {
  context: __dirname,
  entry: "./index.ts",
  target: "webworker",
  context: __dirname,
  output: {
    filename: "worker.js",
    path: path.join(__dirname, "dist"),
  },
  devtool: "cheap-module-source-map",
  mode: process.env.NODE_ENV || "development",
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          // transpileOnly is useful to skip typescript checks occasionally:
          // transpileOnly: true,
        },
      },
    ],
  },
  watchOptions: {
    ignored: /node_modules|dist|\.js/g,
  },
}
