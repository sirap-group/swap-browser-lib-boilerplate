import debug from 'debug'

const d = debug('swap-browser-lib-boilerplate')

d('starting app')

export default class DemoClass {
  constructor (a, b) {
    this.propA = a
    this.propB = b
  }

  concatenate () {
    return this.propA + this.propB
  }
}

d('finished app')
