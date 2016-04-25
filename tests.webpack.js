'use strict'

// import all test specs
const testContext = require.context('./tests', true, /\.spec\.jsx?$/)
testContext.keys().forEach(testContext)

// import all sources to be tested
/*
const sourceContext = require.context('./app', true, /\.jsx?$/)
sourceContext.keys().forEach(sourceContext)
*/
