/* eslint-disable no-console */
/* eslint-env node*/
import { existsSync } from 'fs'
import { resolve as resolvePath } from 'path'
import CleanCSS from 'clean-css'
import browserslist from 'browserslist'

import cpy from 'rollup-plugin-cpy'
import resolve from 'rollup-plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import babel from 'rollup-plugin-babel'
import indexHTML from 'rollup-plugin-index-html'
import replace from 'rollup-plugin-replace'

import { publicReplaceESModulesPackageNames } from './tools/utils.js'

const options = {
  targets: browserslist([
    'last 2 Chrome major versions',
    'last 2 ChromeAndroid major versions',
    'last 2 Firefox major versions',
    'last 2 Edge major versions',
    'last 2 Safari major versions',
    'last 2 iOS major versions',
  ]),
  production: !process.env.ROLLUP_WATCH,
  extensions: ['.ts', '.js'],
}

export function rollupConfig({
  name,
  input,
  outputDir,
  dependencies,
  external,
  watch = undefined,
  sourcemap = true,
  dependenciesPath = './',
  strategy = 'browser',
  copy = undefined,
}) {
  const srcPath = resolvePath(__dirname, '../src')
  const stylesPath = `${srcPath}/styles.ts`
  const haveStyles = existsSync(stylesPath)

  const { externals, replaces, fileName } = publicReplaceESModulesPackageNames(
    haveStyles,
    name,
    dependencies,
    external,
    strategy,
    dependenciesPath,
  )

  const wcPath = `${srcPath}/${fileName}.ts`

  const isDemo = strategy === 'demo'

  const { production, extensions, targets } = options
  const defaultConfig = {
    input: isDemo
      ? input
      : {
          [fileName]: wcPath,
        },
    watch,
    treeshake: !!production,
    output: {
      dir: outputDir,
      format: 'esm',
      sourcemap,
      dynamicImportFunction: 'importShim',
    },
    plugins: [
      resolve({
        extensions: extensions,
      }),

      babel({
        extensions: extensions,
        plugins: [
          '@babel/plugin-syntax-dynamic-import',
          '@babel/plugin-syntax-import-meta',
          'bundled-import-meta',
          production && [
            'template-html-minifier',
            {
              modules: {
                'lit-html': ['html'],
                'lit-element': [
                  'html',
                  { name: 'css', encapsulation: 'style' },
                ],
              },
              htmlMinifier: {
                collapseWhitespace: true,
                removeComments: true,
                caseSensitive: true,
                minifyCSS: customMinifyCSS,
              },
            },
          ],
        ].filter(plugin => !!plugin),

        presets: [
          '@babel/preset-typescript',
          [
            '@babel/preset-env',
            {
              targets,
              exclude: ['@babel/plugin-transform-template-literals'],
              useBuiltIns: false,
              modules: false,
            },
          ],
        ],
      }),
      production && terser(),
    ],
  }
  const result = [
    {
      ...defaultConfig,
      external: externals,
      plugins: [
        isDemo &&
          indexHTML({
            polyfills: {
              dynamicImport: true,
              webcomponents: true,
            },
          }),
        replaces && replace(replaces),
        ...defaultConfig.plugins,
        copy && cpy(copy),
      ].filter(plugin => !!plugin),
    },
  ]

  if (haveStyles && !isDemo) {
    result.push({
      ...defaultConfig,
      external: [...externals, `./${fileName}.js`, 'lit-element'],
      input: {
        [`${fileName}.styles`]: stylesPath,
      },
      plugins: [
        replaces &&
          replace({
            ...replaces,
            ["'.'"]: `'./${fileName}.js'`,
            'lit-element': './MnvBase.js',
          }),
        ...defaultConfig.plugins,
      ],
    })
  }

  return result
}

function customMinifyCSS(originalCSS) {
  const result = new CleanCSS(cleanCSSConfig).minify(originalCSS)

  if (result.warnings.length > 0 || result.errors.length > 0) {
    return originalCSS.trim()
  }

  return result.styles
}

const cleanCSSConfig = {
  rebase: false,
  inline: ['none'],
  level: {
    1: {
      all: false,
      optimizeBackground: true, // controls `background` property optimizations; defaults to `true`
      optimizeBorderRadius: true, // controls `border-radius` property optimizations; defaults to `true`
      optimizeFilter: true, // controls `filter` property optimizations; defaults to `true`
      optimizeFont: true, // controls `font` property optimizations; defaults to `true`
      optimizeFontWeight: true, // controls `font-weight` property optimizations; defaults to `true`
      optimizeOutline: true, // controls `outline` property optimizations; defaults to `true`
      removeEmpty: false, // controls removing empty rules and nested blocks; defaults to `true`
      removeNegativePaddings: false, // controls removing negative paddings; defaults to `true`
      removeQuotes: true, // controls removing quotes when unnecessary; defaults to `true`
      removeWhitespace: true, // controls removing unused whitespace; defaults to `true`
      replaceMultipleZeros: false, // contols removing redundant zeros; defaults to `true`
      replaceTimeUnits: true, // controls replacing time units with shorter values; defaults to `true`
      replaceZeroUnits: true, // controls replacing zero values with units; defaults to `true`
      roundingPrecision: false, // rounds pixel values to `N` decimal places; `false` disables rounding; defaults to `false`
      selectorsSortingMethod: false, // denotes selector sorting method; can be `'natural'` or `'standard'`, `'none'`, or false (the last two since 4.1.0); defaults to `'standard'`
      specialComments: 'all', // denotes a number of /*! ... */ comments preserved; defaults to `all`
      tidyAtRules: false, // controls at-rules (e.g. `@charset`, `@import`) optimizing; defaults to `true`
      tidyBlockScopes: false, // controls block scopes (e.g. `@media`) optimizing; defaults to `true`
      tidySelectors: false, // controls selectors optimizing; defaults to `true`,
      semicolonAfterLastProperty: false, // controls removing trailing semicolons in rule; defaults to `false` - means remove
    },
  },
}

export default rollupConfig
