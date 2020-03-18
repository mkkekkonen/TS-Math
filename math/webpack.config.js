const path = require('path');

const webpack = require('webpack');

const entryPoints = require('./entryPoints');

module.exports = [
  // *** MULTIPLE FILES ***
  {
    name: 'multipleFiles',

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
  },
  // *** LIB ***
  {
    name: 'lib',

    entry: './src/index.ts',

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.js',
      library: 'tsMath',
      libraryTarget: 'umd',
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
  },
  // *** BROWSER ***
  {
    name: 'browser',

    entry: './src/index.ts',

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'maijaMath.js',
      library: 'jsMath',
      libraryTarget: 'var',
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
  },
];
