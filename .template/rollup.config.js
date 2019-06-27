import config from '../../rollup.config'
import { mnv, dependencies } from './package.json'

const { input, external } = mnv.rollup

export default config({
  input,
  outputDir: './demo',
  dependencies,
  external,
  strategy: 'demo',
  dependenciesPath: './../../',
})
