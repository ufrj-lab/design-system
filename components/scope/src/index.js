import { LitElement, html, uCss } from '@ufrj/mnv-base'

import rootScope from './root.scss'
import host from './host.scss'
import fontFaces from './font-faces.scss'

export class MnvScope extends LitElement {
  static get styles() {
    return uCss(host)
  }
  static get properties() {
    return {
      schema: String,
      root: Boolean,
    }
  }

  constructor() {
    super()
    this.schema = 'default'
    this.root = true
  }
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
    }

    if (content !== '') {
      const head = document.querySelector('head')
      const style = document.createElement('style')
      const text = document.createTextNode(content)
      style.appendChild(text)
      head.appendChild(style)
    }
  }

  render() {
    return html`
      <slot></slot>
    `
  }
}

customElements.define('mnv-scope', MnvScope)

export default MnvScope
