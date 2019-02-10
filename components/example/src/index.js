import { html, uCss, LitElement } from '@ufrj/mnv-base'

import style from './style.scss'

export class MnvExample extends LitElement {
  static get styles() {
    return uCss(style)
  }
  render() {
    return html`
      <slot></slot>
    `
  }
}

customElements.define('mnv-example', MnvExample)

export default MnvExample
