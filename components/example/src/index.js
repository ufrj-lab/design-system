import { html, uCss } from '@ufrj/mnv-base'

import { MnvScope } from '@ufrj/mnv-scope'

import style from './style.scss'

export class MnvExample extends MnvScope {
  static get styles() {
    return [super.styles, uCss(style)]
  }
  render() {
    return html`
      <slot></slot>
    `
  }
}

customElements.define('mnv-example', MnvExample)

export default MnvExample
