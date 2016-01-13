'use strict'

const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpackTargetElectronRenderer = require('webpack-target-electron-renderer')
const baseConfig = require('./webpack.config.base')


// base webpack configuration
const config = Object.create(baseConfig)

config.devtool = 'source-map'
config.entry = './app/app'

// publicpath & module transformers
config.output.publicPath = '/dist/'
config.module.loaders.push({
  // component style modules
  test: /^((?!\.module).)*\.css$/,
  loader: ExtractTextPlugin.extract(
    'style-loader',
    'css-loader'
  )
  // generic stylesheets
}, {
  test: /\.module\.css$/,
  loader: ExtractTextPlugin.extract(
    'style-loader',
    'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
  )
})

config.plugins.push(
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({
    __DEV__: true,
    'process.env': {
      NODE_ENV: JSON.stringify('development')
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      screw_ie8: true,
      warnings: false
    }
  }),
  new ExtractTextPlugin('style.css', { allChunks: true })
)

config.target = webpackTargetElectronRenderer(config)

module.exports = config
