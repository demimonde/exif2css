import exif2css from '../src'

['not-an-exif-orientation', 1,2,3,4,5,6,7,8]
  .forEach((i) => {
    console.log('Orientation: %s', i)
    const result = exif2css(i)
    console.log(result)
    console.log()
  })