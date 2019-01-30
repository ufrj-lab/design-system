/* eslint-env node */
const genConf = require('../../helpers/genBsConfig')

module.exports = genConf(
  [
    '../**/src',
    '../**/*.(json|md|js|map|scss)',
    '../**/__tests__',
    '../**/node_modules',
    '../**/tmp',
    '../**/assets',
  ],
  '../',
  'local'
)
