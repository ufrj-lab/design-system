import { css, CSSResult, variables } from '@ufrj/mnv-base'

const { fonts, colors, spaces, borders, shadows } = variables

export const stylesDefinitions: {
  [key: string]: CSSResult
} = {
  host: css`
    :host {
    }
  `,

  all: css`
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-family: var(--scope-titles-font, serif);
      color: var(--scope-text-color, ${colors.black});
    }
  `,

  h1: css`
    h1 {
      font-size: var(--scope-font-size-1, 4rem);
    }
  `,

  h2: css`
    h2 {
      font-size: var(--scope-font-size-2, 3rem);
    }
  `,

  h3: css`
    h3 {
      font-size: var(--scope-font-size-3, 2rem);
    }
  `,

  h4: css`
    h4 {
      font-size: var(--scope-font-size-4, 1rem);
    }
  `,

  h5: css`
    h5 {
      font-size: var(--scope-font-size-5, 1rem);
    }
  `,

  h6: css`
    h6 {
      font-size: var(--scope-font-size-6, 1rem);
    }
  `,
}

export const stylesComponent: CSSResult = css`
    ${stylesDefinitions.host}
    ${stylesDefinitions.all}
    ${stylesDefinitions.h1}
    ${stylesDefinitions.h2}
    ${stylesDefinitions.h3}
    ${stylesDefinitions.h4}
    ${stylesDefinitions.h5}
    ${stylesDefinitions.h6}
`

export default stylesComponent
