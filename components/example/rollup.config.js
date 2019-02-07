/* eslint-env node */
import { genConf, genNames } from '../../helpers/genRollupConfig'
const { mnv, name, dependencies } = require('./package.json')

const { slug, script } = genNames(name)

const { targets, clear } = mnv

const conf = targets.map(target =>
  genConf(
    target.type,
    slug,
    script,
    clear,
    target.injectCss,
    __dirname,
    dependencies
  )
)

export default conf
