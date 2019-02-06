;((win, doc) => {
  win.WebComponents = win.WebComponents || {}
  win.WebComponents.root = 'https://mnv.olimpo.tic.ufrj.br/public/polyfills/'

  const metaSchema = doc.querySelector('meta[name="mnv:schema"]')
  const metaSchemaMode = doc.querySelector('meta[name="mnv:schema:mode"]')
  const bodyCL = doc.querySelector('body').classList
  bodyCL.add('mnv')
  if (metaSchema) {
    const schema = metaSchema.getAttribute('content')
    bodyCL.add(`mnv-schema-${schema}`)
  }
  if (metaSchemaMode) {
    const mode = metaSchemaMode.getAttribute('content')
    console.log(mode)
    if (mode === 'false' || mode === '') {
      bodyCL.remove('--alt-cl')
    } else if (mode === 'true') {
      bodyCL.add('--alt-cl')
    }
  }
})(window, document)
