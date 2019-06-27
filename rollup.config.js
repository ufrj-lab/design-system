/* eslint-disable no-console */
import cpy from 'rollup-plugin-cpy'
import createDefaultConfig from '@open-wc/building-rollup/modern-config'
import replace from 'rollup-plugin-replace'
import { publicReplaceESModulesPackageNames } from './tools/utils'

export default ({
  input,
  outputDir,
  dependencies,
  external,
  watch = undefined,
  sourcemap = true,
  dependenciesPath = './',
  strategy = 'browser',
  copy = undefined,
}) => {
  const publicConfig = publicReplaceESModulesPackageNames(
    dependencies,
    external,
    strategy,
    dependenciesPath,
  )

  const config = createDefaultConfig({
    input,
    outputDir,
    extensions: ['.js', '.mjs', '.ts'],
  })
  const result = {
    ...config,
    output: {
      ...config.output,
      sourcemap,
    },
    watch: {
      ...config.watch,
      ...watch,
    },
    external: [...publicConfig.external],
    plugins: [
      ...config.plugins,
      publicConfig.replace && replace(publicConfig.replace),
      copy && cpy(copy),
    ],
  }
  return result
}
