import filesize from 'rollup-plugin-filesize'
import { terser } from 'rollup-plugin-terser'
import resolve from 'rollup-plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import clear from 'rollup-plugin-clear'
import visualizer from 'rollup-plugin-visualizer'
import url from 'rollup-plugin-url'
import replace from 'rollup-plugin-replace'
import copy from 'rollup-plugin-copy'

const cleanPublic = name => [
  `../_public/${name}.js`,
  `../_public/${name}.js.map`,
]

const toCapitalizer = str => `${str[0].toUpperCase()}${str.slice(1)}`

const genNames = name => {
  const slug = name.replace('@ufrj/', '')

  return {
    slug,
    name: slug
      .split('-')
      .map((val, i) => (i < 1 ? val : toCapitalizer(val)))
      .join(''),
  }
}

const noBundles = dependencies => {
  const keys = Object.keys(dependencies)
  let enabled = false

  const external = {
    node: keys,
    browser: [],
  }

  const replace = {
    node: {},
    browser: {},
  }

  external.node.forEach(name => {
    if (name.includes('@ufrj/')) {
      const newName = `${name
        .replace('@ufrj/', './')
        .split('-')
        .map((val, i) => (i > 0 ? toCapitalizer(val) : val))
        .join('')}.js`
      replace['browser'][name] = newName
      external['browser'].push(newName)
      if (!enabled) enabled = true
    }
  })

  if (enabled) {
    replace['browser']['delimiters'] = ['', '']
  }

  return { external, replace }
}

const prod = !process.env.ROLLUP_WATCH

export const genConf = (pkgName, mnv, dependencies, jail = '/') => {
  const { external, replace: replaceConf } = noBundles(dependencies)
  const { slug, name } = genNames(pkgName)
  const { targets, clear: clearArr, copy: cp } = mnv
  return targets.map(tar => {
    const { type: target, injectCss: inject } = tar
    return {
      input: 'src/index.js',
      output: {
        file: `${target === 'node' ? 'lib' : '../_public'}/${name}.js`,
        format: 'esm',
        sourcemap: true,
      },
      external: external[target],
      onwarn(warning) {
        if (warning.code !== 'CIRCULAR_DEPENDENCY') {
          console.error(`(!) ${warning.message}`)
        }
      },
      plugins: [
        prod &&
          clear({
            targets: clearArr.concat(cleanPublic(name)),
          }),
        prod && cp && copy(cp[target]),
        resolve({
          browser: target === 'browser',
          jail: prod && target === 'browser' ? jail : '/',
        }),
        postcss({
          inject: inject ? true : false,
          config: {
            path: `../../postcss.config.js`,
            ctx: {},
          },
        }),
        url({
          limit: 10 * 1024,
          include: ['**/*.svg', '**/*.woff', '**/*.woff2'],
          emitFiles: true,
        }),
        prod &&
          Object.keys(replaceConf[target]).length > 0 &&
          replace(replaceConf[target]),
        prod &&
          terser({
            warnings: true,
            mangle: {
              module: true,
            },
            compress: true,
          }),
        prod &&
          filesize({
            showBrotliSize: true,
          }),
        prod &&
          visualizer({
            filename: `tmp/${slug}.${target}.html`,
            title: `${slug} | ${target}`,
          }),
      ],
    }
  })
}
