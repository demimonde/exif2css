import core from '@idio/core'
import render from '@depack/render'

export default class IdioContext {
  get path() {
    return process.env.ALAMODE_ENV == 'test-build' ? 'build' : 'src'
  }
  async _init() {
    const { app, url } = await core({
      frontend: { directory: ['src', 'build'] },
      static: {
        use: true,
        root: 'test/fixture/images',
      },
      serve: async (ctx) => {
        ctx.body = render(<html>
          <head>
            <title>exif2css test</title>
          </head>
          <body>
            <img src={`${ctx.path}.jpg`} />
            <script type="module" dangerouslySetInnerHTML={{
              __html: `import exif2css from '/${this.path}/'
const img = document.querySelector('img')
const css = exif2css(${ctx.path.replace('/', '')})

if (css.transform) {
  img.style['-webkit-transform'] = css.transform
}
if (css['transform-origin']) {
  img.style['-webkit-transform-origin'] = css['transform-origin']
}
window.result = css
`,
            }}>
            </script>
          </body>
        </html>, { addDoctype: true })
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