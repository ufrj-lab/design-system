/* eslint-env node */

module.exports = ctx => {
	ctx
	return {
		syntax: 'postcss-scss',
		plugins: {
			'postcss-import': {},
			'postcss-preset-env': {},
			'css-mqpacker': {},
			cssnano: {},
		},
	}
}
