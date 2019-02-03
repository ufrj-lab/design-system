/* eslint-env node */
import { genConf, genNames } from '../../helpers/genRollupConfig'
import copy from 'rollup-plugin-copy'
const { mnv, name } = require('./package.json')

const { slug, script } = genNames(name)

const { targets, clear, copy: cp } = mnv

const prod = !process.env.ROLLUP_WATCH

const conf = targets.map(target => {
  const result = genConf(target.type, slug, script, clear, target.injectCss)
  result.plugins.push(prod && copy({ ...cp }))
  return result
})

export default conf
