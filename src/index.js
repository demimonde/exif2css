var orientations = [
    undefined,
    undefined,
    'rotateY(180deg)',
    'rotate(180deg)',
    'rotate(180deg) rotateY(180deg)',
    'rotate(270deg) rotateY(180deg)',
    'translateY(-100%) rotate(90deg)',
    'translateY(-100%) translateX(-100%) rotate(90deg) rotateY(180deg)',
    'translateX(-100%) rotate(270deg)'
]

var origins = new Array(5)
origins.push('top left', 'bottom left', 'bottom right', 'top right')

function getOrientationTransform(orientation) {
    return orientations[orientation]
}

function getOrientationTransformOrigin(orientation) {
    return origins[orientation]
}

function exif2css(orientation) {
    var transform = getOrientationTransform(orientation)
    var transformOrigin = getOrientationTransformOrigin(orientation)

    var css = {}
    if (transform) {
        css.transform = transform
    }
    if (transformOrigin) {
        css['transform-origin'] = transformOrigin
    }
    return css
}

module.exports = exif2css
