const path = require('path')

const gulp = require('gulp')
const watch = require('gulp-watch')
const shell = require('shelljs')
const chalk = require('chalk')

process.env.NODE_ENV = 'development'
process.env.TESTING = 'bdd'

// Change working dir to come back to the project root
const workingDir = path.resolve(path.join(__dirname, '../../'))
process.chdir(workingDir)

/**
 * Watch all js files in src and run `pipeline:tests` on any change
 * @todo split it to several tasks for each kind of source files (src/lib, src/tests, src/docs, scripts, package.json)
 */

gulp.task('watch:bdd', function (done) {
  const files = [
    // 'package.json',
    // 'webpack.config.js',
    // 'karma.config.js',

    'src/lib/**/*.js',
    'src/tests/**/*.js',
    'src/assets/**/*.*'

    // 'scripts/**/*.js'
  ]

  const options = {
    ignoreInitial: true, // default
    events: ['add', 'change', 'unlink'], // default
    // events: ['add', 'change', 'unlink', 'addDir', 'unlinkDir', 'error', 'ready', 'raw'] // all
    base: workingDir,
    name: 'watcher-all-src',
    verbose: true,
    readDelay: 10, // default
    read: false
  }

  const build = done => shell.exec('yarn karma start', err => {
    if (err) {
      console.error(chalk.red('Karma BDD testing FAILED !'))
    } else {
      console.log(chalk.green('Karma BDD testing SUCEED !'))
    }
    if (done) {
      done()
    }
  })

  const onChange = done => vinyl => build(done)

  build(done => watch(files, options, onChange(done)))
})

gulp.task('default', ['watch:bdd'])
