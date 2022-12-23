const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = ({
  entry: './src/index.tsx',
  output: {
    filename: "bundle.js",
    path: __dirname + (process.env.HEROKU ? '/build-heroku' : '/build')
  },

  devtool: "inline-source-map",

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },

      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
        },
      },

      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      
      {
        test: /\.md$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'md/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]',
            },
          },
        ],
      },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),

    new webpack.DefinePlugin({
      'process.env.MOBILE': JSON.stringify(process.env.mobile),
      'process.env.HEROKU': JSON.stringify(process.env.HEROKU),
    }),
  ],
});
