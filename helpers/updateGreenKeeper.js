const greenKeeper = require('../greenkeeper.json')

const { readdirSync } = require('fs')
const { resolve } = require('path')

greenKeeper.groups.default.packages = readdirSync(
  resolve(__dirname, '../components')
)
  .filter(item => item !== '_public' && item !== '_tools')
  .map(item => `components/${item}/package.json`)
  .concat(['package.json'])

console.log(JSON.stringify(greenKeeper))
