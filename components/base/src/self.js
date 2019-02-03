;((win, doc) => {
  win.WebComponents = win.WebComponents || {}
  win.WebComponents.root = 'https://mnv.olimpo.tic.ufrj.br/public/polyfills/'

  const metaSchema = doc.querySelector('meta[name="mnv:schema"]')
  const bodyCL = doc.querySelector('body').classList
  bodyCL.add('mnv')
  if (metaSchema) {
    const schema = metaSchema.getAttribute('content')
    bodyCL.add(`mnv-schema-${schema}`)
  } else {
    bodyCL.add(`mnv-schema-default`)
  }
})(window, document)
