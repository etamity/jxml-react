// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { ModuleFederationPlugin } = require('webpack').container;
const isProduction = process.env.NODE_ENV == 'production';
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

const modules = {
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
      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
};

const configMaterial = {
  entry: [path.resolve(__dirname, './modules/material-entry.js')],
  output: {
    path: path.resolve(__dirname, 'dist/material'),
  },
  devServer: {
    open: false,
    host: 'localhost',
    hot: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'material', // this name needs to match with the entry name
      filename: 'remoteEntry.js',
      exposes: {
        './default': path.resolve(__dirname, './modules/material/index.js'),
      },
      shared: sharedReduce,
    }),
    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  ...modules,
};

const configAntd = {
  entry: [path.resolve(__dirname, './modules/antd-entry.js')],
  output: {
    path: path.resolve(__dirname, 'dist/antd'),
  },
  devServer: {
    open: false,
    host: 'localhost',
    hot: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'antd', // this name needs to match with the entry name
      filename: 'remoteEntry.js',
      exposes: {
        './default': path.resolve(__dirname, './modules/antd/index.js'),
      },
      shared: sharedReduce,
    }),
    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  ...modules,
};

module.exports = () => {
  const allConfigs = [configMaterial, configAntd].map((config) => {
    if (isProduction) {
      config.mode = 'production';

      config.plugins.push(new MiniCssExtractPlugin());
    } else {
      config.mode = 'development';
    }
    return config;
  });
  return allConfigs;
};
