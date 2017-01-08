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

var transformsMap = {
    '2': {
        rotateY: 180,
    },
    '3': {
        rotate: 180,
    },
    '4': {
        rotate: 180,
        rotateY: 180,
    },
    '5': {
        rotate: 270,
        rotateY: 180,
    },
    '6': {
        translateY: -1,
        rotate: 90,
    },
    '7': {
        translateY: -1,
        translateX: -1,
        rotate: 90,
        rotateY: 180,
    },
    '8': {
        translateX: -1,
        rotate: 270,
    },
}

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
    var transforms = transformsMap[String(orientation)]

    var css = {}
    if (transform) {
        css.transform = transform
    }
    if (transformOrigin) {
        css['transform-origin'] = transformOrigin
    }
    if (transforms) {
        css.transforms = transforms
    }
    return css
}

module.exports = exif2css
