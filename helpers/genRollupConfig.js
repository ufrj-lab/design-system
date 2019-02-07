import filesize from 'rollup-plugin-filesize'
import { terser } from 'rollup-plugin-terser'
import resolve from 'rollup-plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import clear from 'rollup-plugin-clear'
import visualizer from 'rollup-plugin-visualizer'
import url from 'rollup-plugin-url'
import replace from 'rollup-plugin-replace'

const cleanPublic = name => [
  `../_public/${name}.js`,
  `../_public/${name}.js.map`,
]

const toCapitalizer = str => `${str[0].toUpperCase()}${str.slice(1)}`

export const genNames = name => {
  const slug = name.replace('@ufrj/', '')

  return {
    slug,
    script: slug
      .split('-')
      .map((val, i) => (i < 1 ? val : toCapitalizer(val)))
      .join(''),
  }
}

const noBundles = dependencies => {
  const keys = Object.keys(dependencies)
  let enabled = 0

  keys.forEach(str =>
    str.includes('@ufrj/') && !enabled ? (enabled = true) : (enabled = false)
  )

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
      enabled += 1
    }
  })

  if (enabled > 0) {
    replace['browser']['delimiters'] = ['', '']
  }

  return { external, replace }
}

const prod = !process.env.ROLLUP_WATCH

export const genConf = (
  target,
  slug,
  name,
  clearArr,
  inject,
  jail = '/',
  dependencies
) => {
  const { external, replace: replaceConf } = noBundles(dependencies)
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
      resolve({
        browser: target === 'browser',
        jail: target === 'browser' ? jail : '/',
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
}
