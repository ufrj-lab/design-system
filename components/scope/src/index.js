import { LitElement, html, uCss } from '@ufrj/mnv-base'

import rootScope from './root.scss'
import host from './host.scss'
import fontFaces from './font-faces.scss'

const setClass = (key, val, target) => {
  val ? target.add(`mnv-${key}`) : target.remove(`mnv-${key}`)
}

const getMetaConfigurations = (origin, target) => {
  origin.querySelectorAll('meta[property^="mnv:"]').forEach(element => {
    const name = element
      .getAttribute('property')
      .split(':')
      .slice(-1)
      .pop()
    let value = element.getAttribute('content')
    if (name !== 'schema') {
      setClass(name, value === 'true', target)
    } else {
      target.add(`mnv-schema-${value}`)
    }
  })
}

const configureBody = head => {
  const bodyCL = document.querySelector('body').classList
  bodyCL.add('mnv')
  getMetaConfigurations(head, bodyCL)
}

const appendStyle = (target, content) => {
  if (content !== '') {
    const style = document.createElement('style')
    const text = document.createTextNode(content)
    style.appendChild(text)
    target.appendChild(style)
  }
}
export const initRootScope = root => {
  window.mnv = window.mnv || {}

  const { fontFaces: haveFontFaces, root: haveRoot } = window.mnv

  let content = ''

  if (!haveFontFaces) {
    content += fontFaces
    window.mnv.fontFaces = true
  }

  const head = document.querySelector('head')

  if (!haveRoot && root) {
    content += rootScope
    window.mnv.root = true

    configureBody(head)
  }

  appendStyle(head, content)
}

class MnvScope extends LitElement {
  init() {
    Object.keys(this)
      .filter(val => val.slice(0, 2) === '__')
      .forEach(key => {
        const attrib = this[key]
        const name = key.replace('__', '')
        if (attrib) this.setAttribute(name, attrib)
      })

    if (this.root) initRootScope()
  }
  static get properties() {
    return {
      schema: String,
      'alt-cl': Boolean,
      'ac-font': Boolean,
      'ac-hc': Boolean,
      root: Boolean,
    }
  }
  constructor() {
    super()
    this.schema = 'ufrj'
    this['alt-cl'] = false
    this['ac-font'] = false
    this['ac-hc'] = false
    this.root = false
  }

  static get styles() {
    return uCss(host)
  }

  render() {
    this.init()
    return html`
      <slot></slot>
    `
  }
}

customElements.define('mnv-scope', MnvScope)

export default initRootScope
