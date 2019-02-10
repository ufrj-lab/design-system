import { LitElement, html, uCss } from '@ufrj/mnv-base'

import rootScope from './root.scss'
import host from './host.scss'
import fontFaces from './font-faces.scss'

class MnvScope extends LitElement {
  init() {
    window.mnv = window.mnv || {}

    const { fontFaces: haveFontFaces, root: haveRoot } = window.mnv

    let content = ''

    if (!haveFontFaces) {
      content += fontFaces
      window.mnv.fontFaces = true
    }

    if (this.root && !haveRoot) {
      content += rootScope
      window.mnv.root = true
      const bodyCL = document.querySelector('body').classList

      bodyCL.add('mnv')
      bodyCL.add(`mnv-schema-${this.schema}`)

      if (this['alt-cl']) bodyCL.add('mnv-alt-cl')
      else bodyCL.remove('mnv-alt-cl')

      if (this['ac-font']) bodyCL.add('mnv-ac-font')
      else bodyCL.remove('mnv-ac-font')

      if (this['ac-hc']) bodyCL.add('mnv-ac-hc')
      else bodyCL.remove('mnv-ac-hc')
    }

    if (content !== '') {
      const head = document.querySelector('head')
      const style = document.createElement('style')
      const text = document.createTextNode(content)
      style.appendChild(text)
      head.appendChild(style)
    }
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
