## Usage

The module can be either required in _Node.JS_, or downloaded as the compiled file from the _dist_ folder and inserted on the webpage.

%~ width="15"%

### As Node Module

The package is published both as CommonJS module with the `main` field, and as a ES6 module with the `module` field. Node will automatically pick up the `main` version, whereas some bundles will be able to use the module.

```bash
yarn add -E exif2css
npm i exif2css
```

```js
import exif2css from 'exif2css' // or
const exif2css = require('exif2css')

const css = exif2css(6)
```

%~ width="15"%

### As Script

_Exif2Css_ has been compiled with [_Depack_](https://github.com/dpck/depack) using Google Closure Compiler. Download the [file](https://github.com/demimonde/exif2css/blob/master/dist/exif2css.js) manually and embed it on the webpage.

```html
<img src="some-image.jpg">
<script src="exif2css.js"></script>
<script>
  var img = document.querySelector('img')
  var orientation = 6
  var css = exif2css(orientation)

  if (css.transform) {
      img.style.transform = css.transform
  }
  if (css['transform-origin']) {
      img.style['transform-origin'] = css['transform-origin']
  }
</script>
```

%~%