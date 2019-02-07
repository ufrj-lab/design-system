/* eslint-env node */
import { genConf } from '../../helpers/genRollupConfig'
const { mnv, name, dependencies } = require('./package.json')

export default genConf(name, mnv, dependencies, '/')
