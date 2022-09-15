// webpack.config.js
const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = !isProduction;

const publicPath = process.env.PUBLIC_URL || '/';

module.exports = {
  mode: isProduction ? 'production' : 'development',
  bail: isProduction,
  entry: {
    src: ['./src/index.jsx'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, 'src'),
        use: 'babel-loader',
      },
    ].filter(Boolean),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ].filter(Boolean),
  devServer: {
    historyApiFallback: true,
    hot: true,
    port: 3000,
  },
};
