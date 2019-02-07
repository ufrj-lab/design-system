const { readdirSync } = require('fs')
const { resolve } = require('path')

const ignoreComponents = [
  'src',
  'lib',
  '*.(json|md|js|css|scss)',
  '.*',
  '__tests__',
  'node_modules',
  'tmp',
  'assets',
]

const genIgnoreComponents = (ignore, server) => {
  const components = readdirSync(server).filter(
    item => item !== '_public' && item !== '_tools'
  )

  const result = [`${server}/_public/*.(map|woff|woff2)`]

  components.forEach(comp => {
    ignore.forEach(file => {
      result.push(`${server}/${comp}/${file}`)
    })
  })

  return result
}

const genConf = (server, open, ignore = []) => {
  const serverResolved = resolve(server)
  return {
    ui: {
      port: 3001,
    },
    files: true,
    watchEvents: ['change'],
    watch: true,
    server: serverResolved,
    ignore: ignore.concat(
      genIgnoreComponents(ignoreComponents, serverResolved)
    ),
    single: false,
    watchOptions: {
      ignoreInitial: false,
    },
    proxy: false,
    port: 3000,
    middleware: false,
    serveStatic: [],
    ghostMode: {
      clicks: true,
      scroll: true,
      location: true,
      forms: {
        submit: true,
        inputs: true,
        toggles: true,
      },
    },
    logLevel: 'info',
    logPrefix: 'Browsersync',
    logConnections: false,
    logFileChanges: true,
    logSnippet: true,
    rewriteRules: [],
    open,
    browser: 'default',
    cors: false,
    xip: false,
    hostnameSuffix: false,
    reloadOnRestart: false,
    notify: true,
    scrollProportionally: true,
    scrollThrottle: 0,
    scrollRestoreTechnique: 'window.name',
    scrollElements: [],
    scrollElementMapping: [],
    reloadDelay: 0,
    reloadDebounce: 0,
    reloadThrottle: 0,
    plugins: [],
    injectChanges: true,
    startPath: null,
    minify: true,
    host: null,
    localOnly: false,
    codeSync: true,
    timestamps: true,
    clientEvents: [
      'scroll',
      'scroll:element',
      'input:text',
      'input:toggles',
      'form:submit',
      'form:reset',
      'click',
    ],
    socket: {
      socketIoOptions: {
        log: false,
      },
      socketIoClientConfig: {
        reconnectionAttempts: 50,
      },
      path: '/browser-sync/socket.io',
      clientPath: '/browser-sync',
      namespace: '/browser-sync',
      clients: {
        heartbeatTimeout: 5000,
      },
    },
    tagNames: {
      less: 'link',
      scss: 'link',
      css: 'link',
      jpg: 'img',
      jpeg: 'img',
      png: 'img',
      svg: 'img',
      gif: 'img',
      js: 'script',
    },
    injectNotification: true,
  }
}

module.exports = genConf
