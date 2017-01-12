const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const dev = process.argv.indexOf('--dev') !== -1;
const dist = path.resolve(__dirname, 'dist');
const components = path.resolve(__dirname, 'src/components');
const entry = [path.resolve(__dirname, 'src/index.js')].concat(
  fs.readdirSync(components).map(file => path.resolve(components, file))
);

module.exports = {

  entry,

  output: {
    libraryTarget: 'var',
    library: ['rey'],
    filename: dev ? 'uimmutable.dev.js' : 'uimmutable.js',
    path: dist,
    sourcePrefix: '  '
  },

  cache: false,
  debug: false,
  devtool: false,

  stats: {
    colors: true,
    reasons: true,
    warnings: false
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  ].slice(dev ? 2 : 0),

  resolveLoader: {
    modulesDirectories: [
      path.resolve(__dirname, 'node_modules')
    ]
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query: {
          compact: false,
          babelrc: true
        }
      }
    ]
  }
};
