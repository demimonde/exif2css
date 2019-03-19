const propMap = {
  r: 'rotate',
  ry: 'rotateY',
  t: 'translateX',
  ty: 'translateY',
}

const transformsMap = {
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

export default exif2css