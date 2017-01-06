(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.exif2css = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}]},{},[1])(1)
});