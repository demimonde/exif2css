function getOrientationTransform(orientation) {
    switch (orientation) {
    case 2:
        return 'rotateY(180deg)';
    case 3:
        return 'rotate(180deg)';
    case 4:
        return 'rotate(180deg) rotateY(180deg)';
    case 5:
        return 'rotate(270deg) rotateY(180deg)';
    case 6:
        return 'translateY(-100%) rotate(90deg)';
    case 7:
        return 'translateY(-100%) translateX(-100%) rotate(90deg) rotateY(180deg)'
    case 8:
        return 'translateX(-100%) rotate(270deg)';
    }
}
function getOrientationTransformOrigin(orientation) {
    switch (orientation) {
    case 5:
        return 'top left';
    case 6:
        return 'bottom left';
    case 7:
        return 'bottom right'
    case 8:
        return 'top right';
    }
}

function exif2css(orientation) {
    const transform = getOrientationTransform(orientation)
    const transformOrigin = getOrientationTransformOrigin(orientation)

    const css = {}
    if (transform) {
        css.transform = transform
    }
    if (transformOrigin) {
        css['transform-origin'] = transformOrigin
    }
    return css
}

module.exports = exif2css
