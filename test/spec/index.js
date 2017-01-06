const fs = require('fs')
const resemble = require('node-resemble-js')
const path = require('path')
const assert = require('assert')
const webdriver = require('selenium-webdriver')
const phantomjs = require('phantomjs-prebuilt').path
const browserify = require('browserify')
const index = require('../../src/index')

const customPhantom = webdriver.Capabilities.phantomjs()
customPhantom.set("phantomjs.binary.path", phantomjs)

let driver
let bundle

const expectedImagePath = path.join(__dirname, '../fixtures/expected.png')
const indexPath = path.join(__dirname, '../fixtures/index.html')
const srcPath = path.join(__dirname, '../../src/index.js')

function saveScreenshot(data, path) {
    return new Promise((resolve, reject) =>
        fs.writeFile(path, data, 'base64', err =>
            (err ? reject(err) : resolve(data))
        )
    )
}

function compare(image, screenshot) {
    return new Promise((resolve) => {
        const buffer = new Buffer(screenshot, 'base64')
        resemble(image)
            .compareTo(buffer)
            .onComplete(resolve)
    })
}

function getArtifactsPath(name) {
    return path.join(__dirname, '../artifacts', name)
}

function getScript(orientation) {
    return `
        var callback = arguments[arguments.length - 1]
        var img = document.querySelector('img')

        // reset styles
        img.style['-webkit-transform'] = ''
        img.style['-webkit-transform-origin'] = ''

        var css = exif2css(${orientation})

        if (css.transform) {
            img.style['-webkit-transform'] = css.transform
        }
        if (css['transform-origin']) {
            img.style['-webkit-transform-origin'] = css['transform-origin']
        }

        img.onload = callback

        img.src = 'images/${orientation}.jpg'
    `
}

function test(orientation, expectedMismatch) {
    return driver.executeAsyncScript(getScript(orientation))
        .then(() => driver.takeScreenshot())
        .then(res => saveScreenshot(res, getArtifactsPath(`${orientation}.png`)))
        .then(res => compare(expectedImagePath, res))
        .then(res => {
            console.log(res)
            res
                .getDiffImage()
                .pack()
                .pipe(fs.createWriteStream(getArtifactsPath(`${orientation}_diff.png`)))

            assert(res.misMatchPercentage <= expectedMismatch)
        })
}

module.exports = {
    before: {
        'create bundle': () => {
            return new Promise((resolve, reject) => {
                const b = browserify([ srcPath ], { standalone: 'exif2css' })
                const stream = b.bundle((err, buf) =>
                    err ? reject(err) : resolve(String(buf))
                )
            })
                .then(res => {
                    bundle = res
                })
        },
        'init webdriver': () => {
            driver = new webdriver.Builder()
                .withCapabilities(customPhantom)
                .build()
            return driver
        },
        'go to the index page': () => {
            return driver.get(`file://${indexPath}`)
        },
        'export source code to browser': () => {
            return driver.executeScript(bundle)
        },
    },
    spec: {
        'should transform 1 correctly': () => {
            return test(1, 0)
        },
        'should transform 2 correctly': () => {
            return test(2, 1)
        },
        'should transform 3 correctly': () => {
            return test(3, 2)
        },
        'should transform 4 correctly': () => {
            return test(4, 2)
        },
        'should transform 5 correctly': () => {
            return test(5, 1)
        },
        'should transform 6 correctly': () => {
            return test(6, 1)
        },
        'should transform 7 correctly': () => {
            return test(7, 1)
        },
        'should transform 8 correctly': () => {
            return test(8, 1)
        },
    },
}
