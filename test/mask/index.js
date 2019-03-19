import { makeTestSuite } from 'zoroaster'
import Context from '../context'
import exif2css from '../../src'

const ts = makeTestSuite('test/result', {
  async getResults(input) {
    const res = await exif2css({
      text: input,
    })
    return res
  },
  context: Context,
})

// export default ts
