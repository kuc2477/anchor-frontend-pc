'user strict'

const webpack = require('webpack')
const webpackTargetElectronRenderer = require('webpack-target-electron-renderer')
const baseConfig = require('./webpack.config.base')


// base webpack configuration
const config = Object.create(baseConfig)

config.debug = true
config.devtool = 'cheap-module-eval-source-map'
config.entry = [
  'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr',
  './app/app'
]

// publicpath & module transformers
config.output.publicPath = 'http://localhost:3000/dist/'
config.module.loaders.push({
  // component style modules
  test: /\.module\.css$/,
  loaders: [
    'style-loader',
    'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!'
  ]
}, {
  // generic stylesheets
  test: /^((?!\.module).)*\.css$/,
  loaders: [
    'style-loader',
    'css-loader'
  ]
})

// plugins
config.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    __DEV__: true,
    'process.env': {
      NODE_ENV: JSON.stringify('development')
    }
  })
)

config.target = webpackTargetElectronRenderer(config)

module.exports = config
