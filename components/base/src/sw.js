/* eslint-disable no-undef */
const mnvUrl = 'https://mnv.olimpo.tic.ufrj.br/'
const workboxFolder = 'workbox-v3.6.3'
const pathPrefix = `${mnvUrl}${workboxFolder}`

importScripts(`${pathPrefix}/workbox-sw.js`)
workbox.setConfig({
	modulePathPrefix: `${pathPrefix}`,
	debug: false,
})

workbox.core.setCacheNameDetails({ prefix: 'mnv-', suffix: 'v1' })

workbox.core.setLogLevel(workbox.core.LOG_LEVELS.warn)

workbox.routing.registerRoute(
	new RegExp(`^${mnvUrl}`),
	workbox.strategies.staleWhileRevalidate({
		cacheName: 'design-system-cache',
		plugins: [
			new workbox.cacheableResponse.Plugin({
				statuses: [200],
			}),
		],
	})
)

workbox.clientsClaim()
workbox.skipWaiting()

workbox.googleAnalytics.initialize()
