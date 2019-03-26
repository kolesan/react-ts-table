const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const config = require('./config/config.dev.js');

module.exports = merge(common, {
    devServer: {
      contentBase: './dist'
    },
    mode: 'development',
    plugins: [
      new webpack.DefinePlugin({
        CONFIG: JSON.stringify(config)
      })
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "eslint-loader",
          options: {
            emitWarning: true,
            rules: {
              "no-console": "off"
            }
          }
        }
      ]
    }
});