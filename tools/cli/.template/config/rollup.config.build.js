import config from '../../../rollup.config'
import { mnv, dependencies } from '../package.json'

const { input, outputDir, external } = mnv.rollup

export default config({ input, outputDir, dependencies, external })
