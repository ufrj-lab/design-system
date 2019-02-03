import { LitElement, html } from 'lit-element'

import style from './style.scss'

export class MnvColors extends LitElement {
  render() {
    return html`
      <style>
        ${style}
      </style>
      <div class="colors">
        <div class="color primary-dark">Primary Dark</div>
        <div class="color primary">Primary</div>
        <div class="color primary-light">Primary Light</div>

        <div class="color secundary-dark">Secundary Dark</div>
        <div class="color secundary">Secundary</div>
        <div class="color secundary-light">Secundary Light</div>

        <div class="color gray-dark">Gray Dark</div>
        <div class="color gray">Gray</div>
        <div class="color gray-light">Gray Light</div>

        <div class="color confirm">Confirm</div>
        <div class="color warning">Warning</div>
        <div class="color error">Error</div>

        <div class="color light">Light</div>
        <div class="color dark">Dark</div>
        <slot></slot>
      </div>
    `
  }
}

customElements.define('mnv-colors', MnvColors)

export default MnvColors
