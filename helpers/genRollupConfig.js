import filesize from 'rollup-plugin-filesize'
import { terser } from 'rollup-plugin-terser'
import resolve from 'rollup-plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import clear from 'rollup-plugin-clear'
import visualizer from 'rollup-plugin-visualizer'
import url from 'rollup-plugin-url'

const cleanPublic = name => [`../public/${name}.js`, `../public${name}.js.map`]

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

export const genConf = (target, slug, name, clearArr, inject) => ({
	input: 'src/index.js',
	output: {
		file: `${target === 'node' ? 'lib' : '../public'}/${name}.js`,
		format: 'esm',
		sourcemap: true,
	},
	external: target === 'node' ? ['lit-element'] : [],
	onwarn(warning) {
		if (warning.code !== 'CIRCULAR_DEPENDENCY') {
			console.error(`(!) ${warning.message}`)
		}
	},
	plugins: [
		clear({
			targets: clearArr.concat(cleanPublic(name)),
		}),
		resolve(),
		postcss({
			inject: inject ? true : false,
			config: {
				path: `../../postcss.config.js`,
				ctx: {},
			},
		}),
		url({
			limit: 10 * 1024, // inline files < 10k, copy files > 10k
			include: ['**/*.svg', '**/*.woff', '**/*.woff2'],
			emitFiles: true,
		}),
		terser({
			warnings: true,
			mangle: {
				module: true,
			},
			compress: true,
		}),
		filesize({
			showBrotliSize: true,
		}),
		visualizer({
			filename: `tmp/${slug}.${target}.html`,
			title: `${slug} | ${target}`,
		}),
	],
})
