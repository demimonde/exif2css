## API

The package is available by importing its default function:

```js
import exif2css from 'exif2css'
```

%~%

```## exif2css => { transform: string, transform-origin?: string, transforms: Object }
[
  ["orientation", "number"]
]
```

Converts an integer representing EXIF orientation into required CSS with _transfrom_ and optionally _transform-origin_ properties. They can then be used as needed, possibly prefixing the rules with browser-specific tags (e.g., `-webkit-transform` and `-webkit-transform-origin`).

One known issue is that with orientations > 4, the transformed image will have different dimensions from its box, so that whitespace might appear on the right and at the bottom of the image.

%EXAMPLE: example/example.js, ../src => exif2css%
%FORK-js example example/example%

%TYPEDEF types/index.xml%

%~%

## Usage

The module can be either required in _Node.JS_, or downloaded as the compiled file from the _dist_ folder and inserted on the webpage.

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