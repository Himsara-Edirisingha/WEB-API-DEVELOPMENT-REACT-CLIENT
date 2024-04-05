const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");
const history = require('connect-history-api-fallback'); 

module.exports = {
  entry: "./src/App.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"], 
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"], 
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: ["file-loader"], 
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
    modules: [path.resolve(__dirname, "src"), "node_modules"],
  },
  plugins: [
    new HtmlWebPackPlugin({ template: "./public/index.html" }),
  ],
  devServer: {
    historyApiFallback: true, 
  },
};