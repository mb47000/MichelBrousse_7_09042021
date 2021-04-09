const path = require("path");

module.exports = {
  mode: "production",
  entry: {
    polyfill: "babel-polyfill",
    app: "./src/index.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    sourceMapFilename: "[name].js.map",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
    ],
  },
  devtool: "source-map",
  devServer: {
    writeToDisk: true,
    historyApiFallback: {
      index: 'index.html'
    }
  },
  experiments: {
    topLevelAwait: true,
  }
};
