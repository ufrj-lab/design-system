import { LitElement, html, uCss } from '@ufrj/mnv-base'

import { initRootScope } from '@ufrj/mnv-scope'

import style from './style.scss'

export class MnvExample extends LitElement {
  constructor() {
    super()
    this.root = true
  }
  static get properties() {
    return {
      root: Boolean,
    }
  }
  static get styles() {
    return uCss(style)
  }
  render() {
    initRootScope(this.root)
    return html`
      <slot></slot>
    `
  }
}

customElements.define('mnv-example', MnvExample)

export default MnvExample
