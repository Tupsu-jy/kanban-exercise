const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDevelopment = process.env.ENVIRONMENT !== 'production';

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  resolve: {
    extensions: [".js", ".jsx"],
  },
  mode: isDevelopment ? 'development' : 'production',
  devServer: isDevelopment ? {
    static: {
      directory: path.join(__dirname, "public"),
    },
    historyApiFallback: true,
    compress: true,
    host: "0.0.0.0",
    port: 9000,
    allowedHosts: ["kanban-exercise.onrender.com"],
  } : undefined,
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
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      'process.env.BASE_URL': JSON.stringify(process.env.BASE_URL)
    })
  ],
};
