const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  resolve: {
    extensions: [".js", ".jsx"],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    historyApiFallback: true,
    compress: true,
    port: 9000,
  },
  devtool: "source-map",
  output: {
    filename: "bundle.js",
    path: path.resolve("dist"),
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.(png|svg|gif|jpg|jpeg|eot)$/,
        loader: "url-loader",
        options: {
          limit: 8192,
        },
      },
      {
        test: /\.(woff|woff2|ttf)$/,
        type: "asset/resource",
      },

      {
        test: /skin\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /content\.css$/i,
        use: ["css-loader"],
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "./",
            },
          },
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: "./public/index.html",
    }),
    new Dotenv(),
    // new webpack.DefinePlugin({
    //   "process.env.BASE_URL": JSON.stringify(process.env.BASE_URL),
    // }),

    new MiniCssExtractPlugin(),
  ],
};
