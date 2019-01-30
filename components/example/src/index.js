import { LitElement, html } from 'lit-element'

window.dispatchEvent(new Event('highlighter'))

import style from './style.scss'

export class MnvExample extends LitElement {
  render() {
    return html`
      <style>
        ${style}
      </style>
      <slot></slot>
    `
  }
}

customElements.define('mnv-example', MnvExample)

export default MnvExample
