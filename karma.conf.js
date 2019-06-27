/* eslint-disable import/no-extraneous-dependencies */
const createDefaultConfig = require('@open-wc/testing-karma/default-config')
const merge = require('webpack-merge')

const { compilerOptions, exclude, include } = require('./tsconfig.json')

module.exports = config => {
  const defaultConfig = createDefaultConfig(config)
  const mergedConfig = merge(defaultConfig, {
    frameworks: ['karma-typescript', 'esm'],
    karmaTypescriptConfig: {
      bundlerOptions: {
        resolve: {
          alias: {
            '@open-wc/testing': ['./node_modules/@open-wc/testing'],
          },
        },
      },
      compilerOptions: {
        ...compilerOptions,
        noEmit: false,
        inlineSources: true,
        sourceMap: true,
      },
      exclude,
      include,
    },
    preprocessors: {
      '**/*.test.ts': ['karma-typescript', 'esm'],
      '**/*.spec.ts': ['karma-typescript', 'esm'],
    },
    files: [
      {
        pattern: config.grep
          ? config.grep
          : 'components/**/*.spec.ts',
        type: 'module',
      },
    ],
  })
  config.set(mergedConfig)
  return config
}
