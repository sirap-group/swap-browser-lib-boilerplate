const path = require('path')

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

    reporters: ['progress', 'mocha', 'coverage-istanbul'],
    coverageIstanbulReporter: {
      // see valid options: https://github.com/istanbuljs/istanbuljs/blob/aae256fb8b9a3d19414dcf069c592e88712c32c6/packages/istanbul-api/lib/config.js#L33-L39
      reports: [ 'html', 'lcovonly', 'text-summary' ],
      // base output directory. If you include %browser% in the path it will be replaced with the karma browser name
      dir: path.join(__dirname, 'coverage'),
      // if using webpack and pre-loaders, work around webpack breaking the source path
      fixWebpackSourcePaths: true,
      // Combines coverage information from multiple browsers into one report rather than outputting a report
      // for each browser.
      combineBrowserReports: true,
      // stop istanbul outputting messages like `File [${filename}] ignored, nothing could be mapped`
      // skipFilesWithNoCoverage: true,
      skipFilesWithNoCoverage: false,
       // Most reporters accept additional config options. You can pass these through the `report-config` option
      'report-config': {
        // see valid options: https://github.com/istanbuljs/istanbuljs/blob/aae256fb8b9a3d19414dcf069c592e88712c32c6/packages/istanbul-reports/lib/html/index.js#L135-L137
        html: {
          // outputs the report in ./coverage/html
          subdir: 'html'
        }

      },
       // enforce percentage thresholds
       // anything under these percentages will cause karma to fail with an exit code of 1 if not running in watch mode
      thresholds: {
        emitWarning: false, // set to `true` to not fail the test command when thresholds are not met
        global: { // thresholds for all files
          statements: 100,
          lines: 100,
          branches: 100,
          functions: 100
        },
        each: { // thresholds per file
          statements: 100,
          lines: 100,
          branches: 100,
          functions: 100
          // overrides: {
          //   'baz/component/**/*.js': {
          //     statements: 98
          //   }
          // }
        }
      }
    },

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
