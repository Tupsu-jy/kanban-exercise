const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: './src/index.js',
  mode: 'production', // Tuotantomoodi
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[id].[contenthash].js',
    path: path.resolve('dist'),
    publicPath: '/',
  },
  optimization: {
    minimize: true, // Käyttää TerserPlugin oletuksena minifikaatiota varten
    splitChunks: {
      chunks: 'all', // Jakaa koodin chunkeiksi (hyvä latausnopeuden optimointiin)
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(png|svg|gif|jpg|jpeg|eot)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
        },
      },
      {
        test: /\.(woff|woff2|ttf)$/,
        type: 'asset/resource',
      },
      {
        test: /skin\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /content\.css$/i,
        use: ['css-loader'],
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: './',
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html',
      minify: {
        collapseWhitespace: true, // Minifoi HTML-tiedosto
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }),
    new webpack.DefinePlugin({
      'process.env.BASE_URL': JSON.stringify(process.env.BASE_URL),
      'process.env.NODE_ENV': JSON.stringify('production'), // Aseta NODE_ENV arvo tuotantoon
    }),
  ],
  performance: {
    hints: 'warning', // Varoittaa, jos tuotetut tiedostot ovat liian suuria
  },
}
