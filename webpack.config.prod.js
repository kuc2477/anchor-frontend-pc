const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpackTargetElectronRenderer = require('webpack-target-electron-renderer')
const baseConfig = require('./webpack.config.base')


// extend base webpack configuration
const config = Object.create(baseConfig)

// configure entry point
config.devtool = 'source-map'
config.entry = './app/app.js'

// configure publicpath & module transformers
config.output.publicPath = './'
config.module.loaders.push({
  // module level css
  test: /^((?!\.module).)*\.css$/,
  loader: ExtractTextPlugin.extract(
    'style-loader',
    'css-loader'
  )
  // generic css
}, {
  test: /\.module\.css$/,
  loader: ExtractTextPlugin.extract(
    'style-loader',
    'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
  )
  // module level scss
}, {
  test: /^((?!\.module).)*\.scss$/,
  loader: ExtractTextPlugin.extract(
    'style-loader',
    'css-loader',
    'sass-loader'
  )
  // generic scss
}, {
  test: /\.module\.scss$/,
  loader: ExtractTextPlugin.extract(
    'style-loader',
    'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
    'sass-loader'
  )
})

// configure plugins
config.plugins.push(
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({
    __DEV__: false,
    'global.GENTLY': false,
  }),
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      screw_ie8: true,
      warnings: false
    }
  }),
  new ExtractTextPlugin('style.css', { allChunks: true })
)

// set electron as target
config.target = webpackTargetElectronRenderer(config)
module.exports = config
