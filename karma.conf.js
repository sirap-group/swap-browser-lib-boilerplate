/**
 * See:
 * - https://github.com/xdissent/karma-chai
 * - https://github.com/kmees/karma-sinon-chai
 * - https://github.com/karma-runner/karma-chrome-launcher
 * - https://github.com/karma-runner/karma-mocha
 * - https://github.com/litixsoft/karma-mocha-reporter
 * - https://github.com/webpack-contrib/karma-webpack
 * - (https://github.com/aaronjensen/karma-webpack => fast sourcemaps)
 * - https://github.com/demerzel3/karma-sourcemap-loader
 * - https://github.com/karma-runner/karma-coverage
 * - (https://github.com/mattlewis92/karma-coverage-istanbul-reporter)
 */

// const karmaWebpack = require('karma-webpack-with-fast-source-maps')
const karmaWebpack = require('karma-webpack')
const karmaMocha = require('karma-mocha')
const karmaChai = require('karma-chai')
const karmaSinonChai = require('karma-sinon-chai')
const karmaChromeLauncher = require('karma-chrome-launcher')
const karmaFirefoxLauncher = require('karma-firefox-launcher')
const karmaPhantomLauncher = require('karma-phantomjs-launcher')
const karmaMochaReporter = require('karma-mocha-reporter')
const karmaSourceMapLoader = require('karma-sourcemap-loader')
const karmaCoverage = require('karma-coverage')
const karmaCoverageIstanbulReporter = require('karma-coverage-istanbul-reporter')

const webpackConfig = require('./webpack.karma')

module.exports = function (config) {
  config.set({
    // base path used to resolve all patterns
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai', 'sinon-chai'],

    // list of files/patterns to load in the browser
    files: [
      { pattern: 'src/lib/**/*.js', watched: false },
      { pattern: 'src/tests/**/*.js', watched: false }
      // { pattern: 'src/**/*.js', watched: true }
    ],

    // files to exclude
    // exclude: [],

    reporters: ['progress', 'mocha', 'coverage', 'coverage-istanbul'],

    plugins: [
      karmaWebpack,
      karmaMocha,
      karmaChai,
      karmaSinonChai,
      karmaChromeLauncher,
      karmaFirefoxLauncher,
      karmaPhantomLauncher,
      karmaSourceMapLoader,
      karmaCoverage,
      karmaMochaReporter,
      karmaCoverageIstanbulReporter
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: { 'src/**/*.js': ['webpack', 'sourcemap'] },

    webpack: webpackConfig,

    // prevent console spamming when running in Karma!
    webpackServer: {
      noInfo: true // prevent console spamming when running in Karma!
      // noInfo: false
    },

    // web server port
    port: 9876,

    // enable colors in the output
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // toggle whether to watch files and rerun tests upon incurring changes
    autoWatch: false,
    // autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    // see also for IE for linux on VMs: https://stackoverflow.com/questions/3701484/how-to-test-in-ie-with-linux
    // browsers: ['Chrome', 'ChromeCanary', 'ChromeHeadless', 'Firefox', 'Safari', 'PhantomJS', 'Opera', 'IE'],
    browsers: process.env.TESTING === 'bdd'
      ? ['Chrome', 'Firefox']
      : ['ChromeHeadlessDocker', 'PhantomJS'],
      // : ['ChromeHeadless', 'ChromeHeadlessDocker', 'PhantomJS'],

    // if true, Karma runs tests once and exits
    singleRun: true,
    // singleRun: false,

    customLaunchers: {
      ChromeHeadlessDocker: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox' // needed to run test cases in docker
        ]
      }
    },

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i. e.
      stats: 'errors-only'
    }
  })
}
