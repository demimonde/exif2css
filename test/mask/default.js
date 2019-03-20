import makeTestSuite from '@zoroaster/mask'
import { ok } from 'assert'
import resemble from 'node-resemble-js'
import { readBuffer } from '@wrote/read'
import write from '@wrote/write'
import { createWriteStream } from 'fs'
import RemoteChrome from '@contexts/chrome'
import Context from '../context'

const expectedPromise = readBuffer('test/fixture/expected.png')

function compare(image, screenshot) {
  return new Promise((resolve) => {
    resemble(image)
      .compareTo(screenshot)
      .onComplete(resolve)
  })
}

export default makeTestSuite('test/result', {
  /**
   * @param {string} input
   * @param {RemoteChrome} r
   * @param {Context} c
   */
  async getResults(input, { Page, navigate, evaluate, takeScreenshot }, { url }) {
    // console.log(url)
    // await new Promise(r => setTimeout(r, 1000000))
    await navigate(`${url}/${input}`)
    await Page.loadEventFired()
    const value = await evaluate('window.result')
    const screenshot = await takeScreenshot('img')
    return { value, screenshot }
  },
  mapActual({ value }) {
    return value
  },
  async assertResults({ screenshot }) {
    const expected = await expectedPromise
    const result = await compare(expected, screenshot)
    await write(`artifacts/${this.input}.png`, screenshot)
    ok(result.misMatchPercentage <= 1)
    result
      .getDiffImage()
      .pack()
      .pipe(createWriteStream((`artifacts/${this.input}_diff.png`)))
  },
  jsonProps: ['expected'],
  persistentContext: [RemoteChrome, Context],
})
