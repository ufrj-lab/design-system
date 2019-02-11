import { LitElement, html } from '@ufrj/mnv-base'

import rootScope from './root.scss'
import host from './host.scss'
import fontFaces from './font-faces.scss'

const setClass = (key, val, target) => {
  val ? target.add(`mnv-${key}`) : target.remove(`mnv-${key}`)
}

const setConfiguration = (name, value, target) => {
  if (name !== 'schema') {
    const isTrue = value === 'true' || value === true
    setClass(name, isTrue, target)
  } else {
    target.add(`mnv-schema-${value}`)
  }
}

const getMetaConfigurations = (origin, target) => {
  origin.querySelectorAll('meta[property^="mnv:"]').forEach(element => {
    const name = element
      .getAttribute('property')
      .split(':')
      .slice(-1)
      .pop()
    const value = element.getAttribute('content')
    setConfiguration(name, value, target)
  })
}

const getObjConfigurations = (conf, target) => {
  Object.keys(conf).forEach(key => {
    const name = key
    const value = conf[key]
    if (name !== 'inject') setConfiguration(name, value, target)
  })
}

const getConfigurations = (origin, target, conf) => {
  if (!conf) getMetaConfigurations(origin, target)
  else getObjConfigurations(conf, target)
}

const configureBody = (head, conf) => {
  const bodyCL = document.querySelector('body').classList
  bodyCL.add('mnv')
  getConfigurations(head, bodyCL, conf)
}

const appendStyle = (target, content) => {
  if (content !== '') {
    const style = document.createElement('style')
    const text = document.createTextNode(content)
    style.appendChild(text)
    target.appendChild(style)
  }
}
export const initRootScope = (inject, conf = false) => {
  const length = document.querySelectorAll('mnv-scope').length

  const testRun = conf !== false || length === 0

  const testInject = inject === 'true' || inject === true

  const rootInject = length > 1 ? true : testRun && testInject

  window.mnv = window.mnv || {}

  const { fontFaces: haveFontFaces, root: haveRoot } = window.mnv

  let content = ''

  if (!haveFontFaces) {
    content += fontFaces
    window.mnv.fontFaces = true
  }

  const head = document.querySelector('head')

  if (!haveRoot && rootInject) {
    content += rootScope
    window.mnv.root = true

    configureBody(head, conf)
  }

  appendStyle(head, content)

  return !window.mnv.root
}

class MnvScope extends LitElement {
  getMetaAttribute(key) {
    const meta = document.querySelector(`meta[property="mnv:${key}"]`)
    const content = meta ? meta.getAttribute('content') : false
    return content === 'true' ? true : content
  }

  init() {
    const conf = {}
    Object.keys(this)
      .filter(val => val.slice(0, 2) === '__')
      .forEach(key => {
        const attrib = this[key]
        const name = key.replace('__', '')
        if (attrib) {
          this.setAttribute(name, attrib)
          conf[name] = attrib
        }
      })

    return initRootScope(this.inject, conf)
  }

  static get properties() {
    return {
      schema: String,
      'alt-cl': Boolean,
      'ac-font': Boolean,
      'ac-hc': Boolean,
      inject: Boolean,
    }
  }

  constructor() {
    super()
    const { getMetaAttribute } = this

    const attribute = ['schema', 'alt-cl', 'ac-font', 'ac-hc', 'inject']

    attribute.forEach(key => {
      this[key] = getMetaAttribute(key)
    })
  }

  render() {
    return this.init()
      ? html`
          <style>
            ${host}
          </style>
          <slot></slot>
        `
      : ''
  }
}

customElements.define('mnv-scope', MnvScope)

export default initRootScope
