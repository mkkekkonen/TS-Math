const path = require('path');

const webpack = require('webpack');

const entryPoints = require('./entryPoints');

module.exports = {
  entry: entryPoints,

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },

  resolve: {
    extensions: ['.js', '.ts', '.json'],
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'source-map-loader',
      },
    ],
  },

  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[name].js.map',
    }),
  ],

  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'vendors',
    },
  },
};
