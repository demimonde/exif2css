import CDP from 'chrome-remote-interface'
import { c, b } from 'erte'

// https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-captureScreenshot

export default class RemoteChrome {
  async _init() {
    let client
    client = await CDP({
      host: '127.0.0.1', // '172.31.12.175', //
      port: '9222',
    })
    const { Network, Page, Runtime } = client
    await Network.enable()
    await Page.enable()
    this.client = client
    this._Page = Page
    this._Runtime = Runtime
    this.Network = Network
    console.log('[%s]: %s', c('RemoteChrome', 'red'), b('Page enabled', 'green'))
  }
  static get _timeout() {
    return 10000
  }
  /**
   * The enabled page, write types for that
   */
  get Page() {
    return this._Page
  }
  /**
   * The runtime.
   */
  get Runtime() {
    return this._Runtime
  }
  async _destroy() {
    if (this.client) {
      await this.client.close()
    }
  }
  /**
   * Evaluates the expression and returns the result. Throws an error if it was present.
   */
  async evaluate(expression, json = true) {
    const e = json ? `JSON.stringify(${expression}, null, 2)` : expression
    const res = await this.Runtime.evaluate({ expression: e })
    const { exceptionDetails } = res
    if (exceptionDetails) {
      throw new Error(exceptionDetails.exception.description)
    }
    if (!json) {
      return res.result
    }
    const { value } = res.result
    const val = JSON.parse(value)
    return val
  }
  async takeScreenshot(selector) {
    let rect = {}
    if (selector) rect = await this.evaluate(`document.body.querySelector('${selector}').getBoundingClientRect()`)
    const { data } = await this.Page.captureScreenshot({
      clip: { ...rect, scale: 1 },
    })
    const screenshot = new Buffer(data, 'base64')
    return screenshot
  }
}