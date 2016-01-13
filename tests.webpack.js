'use strict'
const context = require.context('./tests', true, /\.spec\.jsx?$/)
context.keys().forEach(context)
module.exports = context
