/* eslint-disable import/no-extraneous-dependencies */

const merge = require('webpack-merge')
const bsSettings = require('@open-wc/testing-karma-bs/bs-settings.js')
const createBaseConfig = require('./karma.conf.js')
const { name: project } = require('./package.json')

module.exports = config => {
  config.set(
    merge(bsSettings(config), createBaseConfig(config), {
      browserStack: {
        project,
      },
    }),
  )

  return config
}
