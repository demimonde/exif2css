(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.exif2css = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

function exif2css(orientation) {
    var s = String(orientation)
    var transforms = transformsMap[s]

    var transform = expandTransform(transforms)
    var transformOrigin = transformOriginMap[s]
    var allTransforms = expandTransforms(transforms)

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
    return css
}

module.exports = exif2css

},{}]},{},[1])(1)
});