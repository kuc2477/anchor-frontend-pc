// Karma configuration
// Generated on Tue Jan 12 2016 15:49:24 GMT+0900 (대한민국 표준시)
module.exports = (config) => {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: ['tests.webpack.js'],


    // list of files to exclude
    exclude: [],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'tests.webpack.js': ['webpack', 'sourcemap'],
    },

    // test specific webpack configuration
    webpack: {
      module: Object.assign({}, require('./webpack.config.dev').module, {
        postLoaders: [
          {
            test: /\.jsx?$/,
            exclude: /(node_modules|dist)/,
            loader: 'istanbul-instrumenter'
          }
        ]
      }),
      devtool: 'inline-source-map'
    },
    webpackMiddleware: { noInfo: true },

    // plugins
    plugins: [
      'karma-chrome-launcher',
      'karma-webpack',
      'karma-sourcemap-loader',
      'karma-jasmine',
      'karma-jasmine-matchers',
      'karma-spec-reporter',
      'karma-coverage',
      'karma-coveralls',
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: [
      'spec',
      'coverage',
      'coveralls',
    ],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR ||
    // config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
