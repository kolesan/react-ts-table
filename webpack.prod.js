const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const config = require('./config/config.prod.js');

module.exports = merge(common, {
    mode: 'production',
    plugins: [
      new webpack.DefinePlugin({
        CONFIG: JSON.stringify(config),
        'process.env.NODE_ENV': JSON.stringify('production')
      })
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "eslint-loader"
        }
      ]
    }
  }
);