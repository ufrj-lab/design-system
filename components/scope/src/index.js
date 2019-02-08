import { LitElement, html } from '@ufrj/mnv-base'

import scope from './scope.scss'
import fontFaces from './font-faces.scss'

export class MnvScope extends LitElement {
  static get properties() {
    return {
      schema: String,
      root: Boolean,
    }
  }
  constructor() {
    super()
    this.schema = 'default'
    this.root = false
  }
  init(render = false) {
    window.mnv = window.mnv || {}

    const { fontFaces: haveFontFaces, root: haveRoot } = window.mnv

    let content = ''

    let empty = false

    if (!haveFontFaces) {
      content += fontFaces
      window.mnv.fontFaces = true
    }

    if ((this.root || !render) && !haveRoot) {
      content += scope

      empty = true

      window.mnv.root = true
    }

    if (content !== '') {
      const head = document.querySelector('head')
      const style = document.createElement('style')
      const text = document.createTextNode(content)
      style.appendChild(text)
      head.appendChild(style)
    }

    if (empty) return ''

    return html`
      <style>
        ${scope}
      </style>
    `
  }

  render() {
    return html`
      ${this.init(true)}
      <slot></slot>
    `
  }
}

customElements.define('mnv-scope', MnvScope)

export default MnvScope
