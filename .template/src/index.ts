import {
  LitElement,
  html,
  css,
  property,
  CSSResult,
  throwError,
  logWarning,
  variables,
} from '@ufrj/mnv-base'

const { fonts, colors, spaces, borders, shadows } = variables

export const stylesDefinitions: {
  [key: string]: CSSResult
} = {
  host: css`
    :host {
    }
  `,
}

export const stylesComponent: CSSResult = css`
  ${stylesDefinitions.host}
`

export class __CLASS_NAME__ extends LitElement {
  @property({ type: Number }) level = 1

  static get styles() {
    return stylesComponent
  }
  render() {
    return html`
      <span></span>
    `
  }
}
