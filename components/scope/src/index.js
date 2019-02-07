import { LitElement, html } from '@ufrj/mnv-base'

import style from './style.scss'

export class MnvScope extends LitElement {
  render() {
    return html`
      <style>
        ${style}
      </style>
      <slot></slot>
    `
  }
}

customElements.define('mnv-scope', MnvScope)

export default MnvScope
