/* eslint-env node */
const genConf = require('./helpers/genBsConfig')

module.exports = genConf(
  [
    './components/**/src',
    './components/**/lib',
    './components/**/*.(json|md|map|scss)',
    './components/**/__tests__',
    './components/**/node_modules',
    './components/**/tmp',
    './components/**/assets',
  ],
  './components',
  false
)
