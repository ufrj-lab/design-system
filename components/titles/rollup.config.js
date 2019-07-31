import config from '../../rollup.config'
import { mnv, dependencies, name } from './package.json'

const { input, external } = mnv.rollup

export default config({
  name,
  input,
  outputDir: './public',
  dependencies,
  external,
  watch: {
    include: 'src/**',
    exclude: 'src/*{.test.ts,.spec.ts,.stories.ts}',
  },
  sourcemap: false,
  strategy: 'demo',
  dependenciesPath: './../../',
})
