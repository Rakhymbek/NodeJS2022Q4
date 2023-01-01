const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "./src/index.ts"),
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts$/i,
        use: "ts-loader",
        include: [path.resolve(__dirname, "src")],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
