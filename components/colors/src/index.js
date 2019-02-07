import { LitElement, html } from '@ufrj/mnv-base'

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

        <div class="color primary-white">Primary White</div>
        <div class="color primary-gray">Primary Gray</div>
        <div class="color primary-black">Primary Black</div>

        <div class="color util-confirm">Util Confirm</div>
        <div class="color util-warning">Util Warning</div>
        <div class="color util-error">Util Error</div>

        <div class="color colors">
          <div class="color light">Light</div>
          <div class="color light-70">Light 70%</div>
        </div>

        <div class="color colors">
          <div class="color dark">Dark</div>
          <div class="color dark-70">Dark 70%</div>
        </div>
      </div>
    `
  }
}

customElements.define('mnv-colors', MnvColors)

export default MnvColors
