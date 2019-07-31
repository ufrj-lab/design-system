import config from '../../../rollup.config'
import { mnv, dependencies, name } from '../package.json'

const { input, outputDir, external } = mnv.rollup

export default config({ name, input, outputDir, dependencies, external })
