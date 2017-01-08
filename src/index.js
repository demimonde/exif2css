var propMap = {
    r: 'rotate',
    ry: 'rotateY',
    t: 'translateX',
    ty: 'translateY',
}

var transformsMap = {
    '2': {
        ry: 180,
    },
    '3': {
        r: 180,
    },
    '4': {
        r: 180,
        ry: 180,
    },
    '5': {
        r: 270,
        ry: 180,
    },
    '6': {
        ty: -1,
        r: 90,
    },
    '7': {
        ty: -1,
        t: -1,
        r: 90,
        ry: 180,
    },
    '8': {
        t: -1,
        r: 270,
    },
}

var transformOriginMap = {
    '5': 'top left',
    '6': 'bottom left',
    '7': 'bottom right',
    '8': 'top right',
}

function expandTransforms(transforms) {
    var o = {}
    var expanded = false
    for (var prop in transforms) {
        if (!expanded) expanded = true
        var ep = propMap[prop]
        o[ep] = transforms[prop]
    }
    return expanded ? o : null
}

function getValue(prop, value) {
    if (prop === 'r' || prop === 'ry') {
        return value + 'deg'
    }
    if (prop === 't' || prop === 'ty') {
        return value * 100 + '%'
    }
}

function expandTransform(transforms) {
    var a = []
    for (var prop in transforms) {
        var ep = propMap[prop]
        a.push(ep + '(' + getValue(prop, transforms[prop]) + ')')
    }
    return a.length ? a.join(' ') : null
}


function expandTransformStrings(transforms) {
    var o = {}
    var expanded = false
    for (var prop in transforms) {
        if (!expanded) expanded = true
        var ep = propMap[prop]
        o[ep] = ep + '(' + getValue(prop, transforms[prop]) + ')'
    }
    return expanded ? o : null
}

function exif2css(orientation) {
    var s = String(orientation)
    var transforms = transformsMap[s]

    var transform = expandTransform(transforms)
    var transformOrigin = transformOriginMap[s]
    var allTransforms = expandTransforms(transforms)
    var allTransformStrings = expandTransformStrings(transforms)

    var css = {}
    if (transform) {
        css.transform = transform
    }
    if (transformOrigin) {
        css['transform-origin'] = transformOrigin
    }
    if (allTransforms) {
        css.transforms = allTransforms
    }
    if (allTransformStrings) {
        css.transformStrings = allTransformStrings
    }
    return css
}

module.exports = exif2css
