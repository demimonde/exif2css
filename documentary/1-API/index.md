## API

The package is available by importing its default function:

```js
import exif2css from 'exif2css'
```

%~%

```## exif2css => Exif2CssReturn
[
  ["orientation", "(number|string)"]
]
```

Converts an integer or a string representing EXIF orientation into required CSS with _transfrom_ and optionally _transform-origin_ properties. They can then be used as needed, possibly prefixing the rules with browser-specific tags (e.g., `-webkit-transform` and `-webkit-transform-origin`).

One known issue is that with orientations > 4, the transformed image will have different dimensions from its box, so that whitespace might appear on the right and at the bottom of the image.

%EXAMPLE: example/example.js, ../src => exif2css%
%FORK-js example example/example%

%TYPEDEF types/index.xml%

%~%