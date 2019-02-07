/* eslint-env node */
import { genConf, genNames } from '../../helpers/genRollupConfig'
import copy from 'rollup-plugin-copy'
const { mnv, name, dependencies } = require('./package.json')

const { slug, script } = genNames(name)

const { targets, clear, copy: cp } = mnv

const prod = !process.env.ROLLUP_WATCH

const external = {
  node: Object.keys(dependencies),
  browser: [],
}

const replace = {
  node: {},
  browser: { delimiters: ['', ''] },
}

external.node.forEach(name => {
  const newName = `${name
    .replace('@ufrj/', './')
    .split('-')
    .map((val, i) => (i > 0 ? `${val[0].toUpperCase()}${val.slice(1)}` : val))
    .join('')}.js`
  replace['browser'][name] = newName
  external['browser'].push(newName)
})

const conf = targets.map(target => {
  const result = genConf(
    target.type,
    slug,
    script,
    clear,
    target.injectCss,
    __dirname,
    replace[target.type],
    external[target.type]
  )
  result.plugins.push(prod && copy({ ...cp[target.type] }))
  return result
})

export default conf
