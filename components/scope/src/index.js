import { LitElement, html, uCss } from '@ufrj/mnv-base'

import rootScope from './root.scss'
import host from './host.scss'
import fontFaces from './font-faces.scss'

export const initRootScope = root => {
  window.mnv = window.mnv || {}

  const { fontFaces: haveFontFaces, root: haveRoot } = window.mnv

  let content = ''

  if (!haveFontFaces) {
    content += fontFaces
    window.mnv.fontFaces = true
  }

  const head = document.querySelector('head')

  if (!haveRoot && root) {
    const body = document.querySelector('body')
    const genConf = () => {
      const newThat = {}
      head.querySelectorAll('meta[property^="mnv:"]').forEach(element => {
        const name = element
          .getAttribute('property')
          .split(':')
          .slice(-1)
          .pop()
        let value = element.getAttribute('content')
        if (name !== 'schema') {
          if (value === 'true') value = true
          else value = false
        }
        newThat[name] = value
      })
      return newThat
    }

    const that = genConf()

    content += rootScope
    window.mnv.root = true
    const bodyCL = body.classList

    bodyCL.add('mnv')
    bodyCL.add(`mnv-schema-${that.schema}`)

    if (that['alt-cl']) bodyCL.add('mnv-alt-cl')
    else bodyCL.remove('mnv-alt-cl')

    if (that['ac-font']) bodyCL.add('mnv-ac-font')
    else bodyCL.remove('mnv-ac-font')

    if (that['ac-hc']) bodyCL.add('mnv-ac-hc')
    else bodyCL.remove('mnv-ac-hc')
  }

  if (content !== '') {
    const style = document.createElement('style')
    const text = document.createTextNode(content)
    style.appendChild(text)
    head.appendChild(style)
  }
}

class MnvScope extends LitElement {
  init() {
    Object.keys(this)
      .filter(val => val.slice(0, 2) === '__')
      .forEach(key => {
        const attrib = this[key]
        const name = key.replace('__', '')
        if (attrib) this.setAttribute(name, attrib)
      })

    if (this.root) initRootScope()
  }
  static get properties() {
    return {
      schema: String,
      'alt-cl': Boolean,
      'ac-font': Boolean,
      'ac-hc': Boolean,
      root: Boolean,
    }
  }
  constructor() {
    super()
    this.schema = 'ufrj'
    this['alt-cl'] = false
    this['ac-font'] = false
    this['ac-hc'] = false
    this.root = false
  }

  static get styles() {
    return uCss(host)
  }

  render() {
    this.init()
    return html`
      <slot></slot>
    `
  }
}

customElements.define('mnv-scope', MnvScope)

export default initRootScope
