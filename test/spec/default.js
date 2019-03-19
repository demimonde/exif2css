import { equal, ok } from 'zoroaster/assert'
import Context from '../context'
import exif2css from '../../src'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  'is a function'() {
    equal(typeof exif2css, 'function')
  },
  async 'calls package without error'() {
    await exif2css()
  },
  async 'gets a link to the fixture'({ FIXTURE }) {
    const res = await exif2css({
      text: FIXTURE,
    })
    ok(res, FIXTURE)
  },
}

export default T