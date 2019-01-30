/* eslint-env node */
const genConf = require('./helpers/genBsConfig')

module.exports = genConf('./components', false, [
  './.cypress',
  './.vscode',
  './docs',
  './helpers',
  './node_modules',
  './tools',
  './*.(js|md|json|map|scss|css)',
  './.*',
])
