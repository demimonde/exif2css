import { deepEqual } from 'zoroaster/assert'
import exif2css from '../../src'

export default {
  'returns empty object for non-exif value'() {
    const res = exif2css('non-exif')
    deepEqual(res, {})
  },
  1() {
    const res = exif2css(1)
    deepEqual(res, {})
  },
  '2'() {
    return exif2css(2)
  },
  '3'() {
    return exif2css(3)
  },
  '4'() {
    return exif2css(4)
  },
  '5'() {
    return exif2css(5)
  },
  '6'() {
    return exif2css(6)
  },
  '7'() {
    return exif2css(7)
  },
  '8'() {
    return exif2css(8)
  },
}
