const exif2css = require('../../src/index')
const assert = require('assert')

module.exports = {
    'should return empty object for non-exif value': () => {
        const res = exif2css('non-exif')
        assert(JSON.stringify(res) === JSON.stringify({}))
    },
    '1': {
        'empty object': () => {
            const res = exif2css(1)
            assert(JSON.stringify(res) === JSON.stringify({}))
        },
    },
    '2': {
        'transform: rotateY(180deg)': () => {
            const res = exif2css(2)
            assert(res.transform === 'rotateY(180deg)')
        },
        transforms: {
            'rotateY === 180': () => {
                const res = exif2css(2)
                assert(res.transforms !== undefined)
                assert('rotateY' in res.transforms)
                assert(res.transforms.rotateY === 180)
            },
        },
    },
    '3': {
        'transform: rotate(180deg)': () => {
            const res = exif2css(3)
            assert(res.transform === 'rotate(180deg)')
        },
        transforms: {
            'rotate === 180': () => {
                const res = exif2css(3)
                assert(res.transforms !== undefined)
                assert('rotate' in res.transforms)
                assert(res.transforms.rotate === 180)
            },
        },
    },
    '4': {
        'transform: rotate(180deg) rotateY(180deg)': () => {
            const res = exif2css(4)
            assert(res.transform === 'rotate(180deg) rotateY(180deg)')
        },
        transforms: {
            'rotate === 180': () => {
                const res = exif2css(4)
                assert(res.transforms !== undefined)
                assert('rotate' in res.transforms)
                assert(res.transforms.rotate === 180)
            },
            'rotateY === 180': () => {
                const res = exif2css(4)
                assert(res.transforms !== undefined)
                assert('rotateY' in res.transforms)
                assert(res.transforms.rotateY === 180)
            },
        },
    },
    '5': {
        'transform: rotate(270deg) rotateY(180deg)': () => {
            const res = exif2css(5)
            assert(res.transform === 'rotate(270deg) rotateY(180deg)')
        },
        'transform-origin: top left': () => {
            const res = exif2css(5)
            assert(res['transform-origin'] === 'top left')
        },
        transforms: {
            'rotate === 270': () => {
                const res = exif2css(5)
                assert(res.transforms !== undefined)
                assert('rotate' in res.transforms)
                assert(res.transforms.rotate === 270)
            },
            'rotateY === 180': () => {
                const res = exif2css(5)
                assert(res.transforms !== undefined)
                assert('rotateY' in res.transforms)
                assert(res.transforms.rotateY === 180)
            },
        },
    },
    '6': {
        'transform: translateY(-100%) rotate(90deg)': () => {
            const res = exif2css(6)
            assert(res.transform === 'translateY(-100%) rotate(90deg)')
        },
        'transform-origin: bottom left': () => {
            const res = exif2css(6)
            assert(res['transform-origin'] === 'bottom left')
        },
        transforms: {
            'translateY === -1': () => {
                const res = exif2css(6)
                assert(res.transforms !== undefined)
                assert('translateY' in res.transforms)
                assert(res.transforms.translateY === -1)
            },
            'rotate === 90': () => {
                const res = exif2css(6)
                assert(res.transforms !== undefined)
                assert('rotate' in res.transforms)
                assert(res.transforms.rotate === 90)
            },
        },
    },
    '7': {
        'transform: translateY(-100%) translateX(-100%) rotate(90deg) rotateY(180deg)': () => {
            const res = exif2css(7)
            assert(res.transform === 'translateY(-100%) translateX(-100%) rotate(90deg) rotateY(180deg)')
        },
        'transform-origin: bottom right': () => {
            const res = exif2css(7)
            assert(res['transform-origin'] === 'bottom right')
        },
        transforms: {
            'translateY === -1': () => {
                const res = exif2css(7)
                assert(res.transforms !== undefined)
                assert('translateY' in res.transforms)
                assert(res.transforms.translateY === -1)
            },
            'translateX === -1': () => {
                const res = exif2css(7)
                assert(res.transforms !== undefined)
                assert('translateX' in res.transforms)
                assert(res.transforms.translateX === -1)
            },
            'rotate === 90': () => {
                const res = exif2css(7)
                assert(res.transforms !== undefined)
                assert('rotate' in res.transforms)
                assert(res.transforms.rotate === 90)
            },
            'rotateY === 180': () => {
                const res = exif2css(7)
                assert(res.transforms !== undefined)
                assert('rotateY' in res.transforms)
                assert(res.transforms.rotateY === 180)
            },
        },
    },
    '8': {
        'transform: translateX(-100%) rotate(270deg)': () => {
            const res = exif2css(8)
            assert(res.transform === 'translateX(-100%) rotate(270deg)')
        },
        'transform-origin: top right': () => {
            const res = exif2css(8)
            assert(res['transform-origin'] === 'top right')
        },
        transforms: {
            'translateX === -1': () => {
                const res = exif2css(8)
                assert(res.transforms !== undefined)
                assert('translateX' in res.transforms)
                assert(res.transforms.translateX === -1)
            },
            'rotate === 270': () => {
                const res = exif2css(8)
                assert(res.transforms !== undefined)
                assert('rotate' in res.transforms)
                assert(res.transforms.rotate === 270)
            },
        },
    },
}
