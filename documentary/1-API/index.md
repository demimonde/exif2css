## API

The package is available by importing its default function:

```js
import exif2css from 'exif2css'
```

%~%

```## exif2css => { transform: string, transforms: Object }
[
  ["orientation", "number"]
]
```

Converts an integer representing EXIF orientation into required CSS with _transfrom_ and
optionally _transform-origin_ properties. It is your job to use them as needed, possibly prefixing
the rules with browser-specific tags (e.g., `-webkit-transform` and `-webkit-transform-origin`).

One known issue is that with orientations > 4, the transformed image will have different dimensions from
its box, so that whitespace might appear on the right and at the bottom of the image.

%EXAMPLE: example/example.js, ../src => exif2css%
%FORK example example/example%

%~%

## Usage

You can either require this module in Node.js, or download the compiled file from _dist_ folder
and insert it on your webpage.

### As a _Node_ module:

```bash
npm i exif2css --save
```

```js
const exif2css = require('exif2css')
const css = exif2css(6)
```

### As a script:

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