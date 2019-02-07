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

export const genNames = name => {
  const slug = name.replace('@ufrj/', '')

  return {
    slug,
    script: slug
      .split('-')
      .map((val, i) => (i < 1 ? val : `${val[0].toUpperCase()}${val.slice(1)}`))
      .join(''),
  }
}

const prod = !process.env.ROLLUP_WATCH

export const genConf = (
  target,
  slug,
  name,
  clearArr,
  inject,
  jail = '/',
  replaceConf = {},
  external = ['lit-element']
) => ({
  input: 'src/index.js',
  output: {
    file: `${target === 'node' ? 'lib' : '../_public'}/${name}.js`,
    format: 'esm',
    sourcemap: true,
  },
  external,
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
    Object.keys(replaceConf).length > 0 && replace(replaceConf),
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
})
