/* yarn example/ */
import exif2css from '../src'

(async () => {
  const res = await exif2css({
    text: 'example',
  })
  console.log(res)
})()