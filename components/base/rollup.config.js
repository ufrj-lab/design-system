/* eslint-env node */
import { genConf, genNames } from '../../helpers/genRollupConfig'
import copy from 'rollup-plugin-copy'
const { mnv, name } = require('./package.json')

const { slug, script } = genNames(name)

const { targets, clear, copy: cp } = mnv

const conf = targets.map(target => {
  const result = genConf(target.type, slug, script, clear, target.injectCss)
  result.plugins.push(copy({ ...cp }))
  return result
})

export default conf
