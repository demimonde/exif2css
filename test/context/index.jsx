import core from '@idio/core'
import render from '@depack/render'
import { c } from 'erte'

const testBuild = process.env.ALAMODE_ENV == 'test-build'
if (testBuild) console.log(c('Testing Depack build...', 'yellow'))

export default class IdioContext {
  async _init() {
    const { app, url } = await core({
      frontend: { directory: ['src'] },
      compress: { use: true, config: {
        threshold: 0,
      } },
      static: {
        use: true,
        root: ['test/fixture/images', 'dist'],
      },
      serve: async (ctx) => {
        ctx.body = render(<html>
          <head>
            <title>exif2css test</title>
          </head>
          <body>
            <img src={`${ctx.path}.jpg`} />
            {!testBuild && <script type="module" dangerouslySetInnerHTML={{
              __html: `import exif2css from '/src/'
window.exif2css = exif2css`,
            }}>
            </script>}
            {testBuild && <script src="exif2css.js"></script>}
            <script type={testBuild ? '' : 'module'} dangerouslySetInnerHTML={{
              __html: `const img = document.querySelector('img')
const css = exif2css(${ctx.path.replace('/', '')})

if (css.transform) {
  img.style['-webkit-transform'] = css.transform
}
if (css['transform-origin']) {
  img.style['-webkit-transform-origin'] = css['transform-origin']
}
window.result = css`,
            }}></script>
          </body>
        </html>, { addDoctype: true, pretty: true })
      },
    }, { port: null })
    this.app = app
    this.url = url
  }
  async _destroy() {
    if (this.app)
      await this.app.destroy()
  }
}