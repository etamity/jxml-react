// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const pkg = require('./package.json');

// import path from 'path';
// import pkg from './package.json';
const libraryName = pkg.name;

const modules = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('./src')],
    extensions: ['.json', '.js'],
  },
};

const configReact = {
  entry: path.resolve(__dirname, 'src/index.js'),
  devtool: 'source-map',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
    library: {
      name: libraryName,
      type: 'umd',
    },
    libraryTarget: 'umd',
    libraryExport: 'default',
    umdNamedDefine: true,
    globalObject: "typeof self !== 'undefined' ? self : this",
  },

  ...modules,
};
const configLoader = {
  entry: path.resolve(__dirname, 'src/loader'),
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'loader.js',
    libraryTarget: 'commonjs2',
  },
  ...modules,
};
module.exports = [configReact, configLoader];
