/* eslint no-console:0 */
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const config = require('./webpack.config.dev')

// configure express server and webpack compiler
const PORT = process.env.HOT_SERVER_PORT
const app = express()
const compiler = webpack(config)


// apply webpack dev / hot middlewares to express app
app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  }
}))
app.use(require('webpack-hot-middleware')(compiler))

// listen to every routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'app', 'app.dev.html'))
})

// run server
app.listen(PORT, 'localhost', err => {
  if (err) {
    console.log(err)
    return
  }
  console.log(`Listening at http://localhost:${PORT}`)
})
