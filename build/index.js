const propMap = {
  'r': 'rotate',
  'ry': 'rotateY',
  't': 'translateX',
  'ty': 'translateY',
}

const transformsMap = {
  '2': {
    'ry': 180,
  },
  '3': {
    'r': 180,
  },
  '4': {
    'r': 180,
    'ry': 180,
  },
  '5': {
    'r': 270,
    'ry': 180,
  },
  '6': {
    'ty': -1,
    'r': 90,
  },
  '7': {
    'ty': -1,
    't': -1,
    'r': 90,
    'ry': 180,
  },
  '8': {
    't': -1,
    'r': 270,
  },
}

const transformOriginMap = {
  '5': 'top left',
  '6': 'bottom left',
  '7': 'bottom right',
  '8': 'top right',
}

function expandTransforms(transforms) {
  const o = {}
  let expanded = false
  for (let prop in transforms) {
    if (!expanded) expanded = true
    var ep = propMap[prop]
    o[ep] = transforms[prop]
  }
  return expanded ? o : null
}

function getValue(prop, value) {
  if (prop === 'r' || prop === 'ry') {
    return `${value}deg`
  }
  if (prop === 't' || prop === 'ty') {
    return `${value * 100}%`
  }
}

function expandTransform(transforms) {
  const a = []
  for (let prop in transforms) {
    const ep = propMap[prop]
    a.push(ep + '(' + getValue(prop, transforms[prop]) + ')')
  }
  return a.length ? a.join(' ') : null
}

function expandTransformStrings(transforms) {
  const o = {}
  let expanded = false
  for (let prop in transforms) {
    if (!expanded) expanded = true
    const ep = propMap[prop]
    o[ep] = ep + '(' + getValue(prop, transforms[prop]) + ')'
  }
  return expanded ? o : null
}

/**
 * Takes the input EXIF orientation and returns the CSS rules needed to display the image correctly in the browser.
 * @param {(number|string)} orientation The EXIF orientation.
 * @returns {Exif2CssReturn} An object with `transform`, `transform-origin` (not shown in JSDoc because of hyphen), `transforms` and `transformStrings` properties.
 */
function exif2css(orientation) {
  const s = `${orientation}`
  const transforms = transformsMap[s]

  const transform = expandTransform(transforms)
  const transformOrigin = transformOriginMap[s]
  const allTransforms = expandTransforms(transforms)
  const allTransformStrings = expandTransformStrings(transforms)

  const css = {}
  if (transform) {
    css['transform'] = transform
  }
  if (transformOrigin) {
    css['transform-origin'] = transformOrigin
  }
  if (allTransforms) {
    css['transforms'] = allTransforms
  }
  if (allTransformStrings) {
    css['transformStrings'] = allTransformStrings
  }
  return css
}

/* documentary types/index.xml */
/**
 * @typedef {Object} Exif2CssReturn The return type of the function.
 * @prop {string} [transform] The complete CSS `transform` rule that contains all transforms.
 * @prop {('top left'|'top right'|'bottom left'|'bottom right')} [transform-origin] The transform origin CSS rule for orientations >= 5.
 * @prop {{translateY: number, translateX: number, rotate: number, rotateY: number}} [transforms] The raw transforms as numbers, where translates are either `-1` or `1` and rotations are either `90`, `180` and `270`.
 * @prop {{translateY: string, translateX: string, rotate: string, rotateY: string}} [transformStrings] The transforms split by individual rules that can be applied in the browser.
 */

module.exports=exif2css