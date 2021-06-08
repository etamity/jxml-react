// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const { ModuleFederationPlugin } = webpack.container;
const CopyPlugin = require('copy-webpack-plugin');
const isProduction = process.env.NODE_ENV == 'production';
const images = require('remark-images');
const emoji = require('remark-emoji');
const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';
const deps = require('../package.json').dependencies;

const sharedReduce = Object.keys(deps).reduce((shared, pkg) => {
  Object.assign(shared, {
    [pkg]: {
      singleton: true,
      eager: true,
      requiredVersion: deps[pkg],
    },
  });
  return shared;
}, {});
const config = {
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devServer: {
    headers: {
      'Cache-Control': 'no-store',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
    contentBase: path.join(__dirname, 'dist'),
    open: false,
    host: 'localhost',
    port: 8000,
    hot: true,
    historyApiFallback: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'global.IS_CLIENT': JSON.stringify(true),
    }),
    new ModuleFederationPlugin({
      name: 'host',
      remotes: {
        aces: 'aces',
      },
      shared: sharedReduce,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
    }),
    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: 'babel-loader',
      },
      {
        test: /\.styl$/i,
        use: [stylesHandler, 'css-loader', 'postcss-loader', 'stylus-loader'],
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },
      {
        test: /\.ya?ml$/,
        exclude: /\.raw\.ya?ml$/,
        type: 'json',
        use: ['yaml-loader'],
      },
      {
        test: /\.jxml$/,
        use: ['babel-loader', path.resolve(__dirname, '../dist/loader')],
      },
      {
        test: /\.mdx?$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: '@mdx-js/loader',
            options: {
              remarkPlugins: [images, emoji],
            },
          },
        ],
      },
      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    alias: {
      'jxml-react': path.join(process.cwd(), 'src/index.js'),
    },
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';

    config.plugins.push(new MiniCssExtractPlugin());
  } else {
    config.mode = 'development';
  }
  return config;
};
