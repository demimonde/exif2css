# exif2css
Convert exif orientation to CSS transform.

![exif2css](exif2css.jpg)

## Outputs

The module will convert an integer representing EXIF orientation into required CSS with _transfrom_ and
optionally _transform-origin_ properties. It is your job to use them as needed, possibly prefixing
the rules with browser-specific tags (e.g., `-webkit-transform` and `-webkit-transform-origin`).

One known issue is that with orientations > 4, the transformed image will have different dimensions from
its box, so that whitespace might appear on the right and at the bottom of the image.

```js
// exif2css('not-an-exif-orientation')
{}

// exif2css(1)
{}

// exif2css(2)
{
    transform: 'rotateY(180deg)',

    transforms: {
        rotateY: 180,
    },
}

// exif2css(3)
{
    transform: 'rotate(180deg)',

    transforms: {
        rotate: 180,
    },
}

// exif2css(4)
{
    transform: 'rotate(180deg) rotateY(180deg)',

    transforms: {
        rotate: 180,
        rotateY: 180,
    },
}

// exif2css(5)
{
    transform: 'rotate(270deg) rotateY(180deg)',
    'transform-origin': 'top left',

    transforms: {
        rotate: 270,
        rotateY: 180,
    },
}

// exif2css(6)
{
    transform: 'translateY(-100%) rotate(90deg)',
    'transform-origin': 'bottom left',

    transforms: {
        translateY: -1,
        rotate: 90,
    },
}

// exif2css(7)
{
    transform: 'translateY(-100%) translateX(-100%) rotate(90deg) rotateY(180deg)',
    'transform-origin': 'bottom right',

    transforms: {
        translateY: -1,
        translateX: -1,
        rotate: 90,
        rotateY: 180,
    },
}

// exif2css(8)
{
    transform: 'translateX(-100%) rotate(270deg)',
    'transform-origin': 'top right',

    transforms: {
        translateX: -1,
        rotate: 270,
    },
}
```

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

## Testing

The module has been tested with _selenium-webdriver_ and _PhantomJS_ by inserting images with
specified orientation, applying generated styles from `exif2css`, taking screenshots and comparing
them against the expected image, therefore everything seems to be working properly.
