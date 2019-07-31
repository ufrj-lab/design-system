import { html, LitElement, logWarning, throwError } from '@ufrj/mnv-base'

import stylesComponent from './styles'

export * from './styles'

export class MnvTitles extends LitElement {
  level: number

  static get properties() {
    return {
      level: { type: Number },
    }
  }

  constructor() {
    super()
    this.level = 1
  }

  static get styles() {
    return stylesComponent
  }

  render() {
    throwError(this.level < 1, 'mnv-titles: Level 0 is not allowed', this)
    if (
      logWarning(
        this.level > 6,
        'mnv-titles: Level N > 6, generates a h6 tag but also adds the attribute data-level="N"',
        this,
      )
    ) {
      return html`
        <h6 data-level=${this.level}><slot></slot></h6>
      `
    }

    if (this.level === 1) {
      return html`
        <h1><slot></slot></h1>
      `
    }
    if (this.level === 2) {
      return html`
        <h2><slot></slot></h2>
      `
    }
    if (this.level === 3) {
      return html`
        <h3><slot></slot></h3>
      `
    }
    if (this.level === 4) {
      return html`
        <h4><slot></slot></h4>
      `
    }
    if (this.level === 5) {
      return html`
        <h5><slot></slot></h5>
      `
    }
    if (this.level === 6) {
      return html`
        <h6><slot></slot></h6>
      `
    }
  }
}
export default MnvTitles
