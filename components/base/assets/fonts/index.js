import alegreyaSansSC500Woff from './alegreya-sans-sc-v8-latin-500.woff'
import alegreyaSansSC500Woff2 from './alegreya-sans-sc-v8-latin-500.woff2'

import alegreyaSans500Woff from './alegreya-sans-v9-latin-500.woff'
import alegreyaSans500Woff2 from './alegreya-sans-v9-latin-500.woff2'

import alegreyaSansRegularWoff from './alegreya-sans-v9-latin-regular.woff'
import alegreyaSansRegularWoff2 from './alegreya-sans-v9-latin-regular.woff2'

import alegreyaSans700Woff from './alegreya-sans-v9-latin-700.woff'
import alegreyaSans700Woff2 from './alegreya-sans-v9-latin-700.woff2'

import firaCodeRegularWoff from './fira-code-v1-regular.woff'
import firaCodeRegularWoff2 from './fira-code-v1-regular.woff2'

import playfairDisplay700Woff from './playfair-display-v13-latin-700.woff'
import playfairDisplay700Woff2 from './playfair-display-v13-latin-700.woff2'

import playfairDisplayItalicWoff from './playfair-display-v13-latin-italic.woff'
import playfairDisplayItalicWoff2 from './playfair-display-v13-latin-italic.woff2'

import ptSerif700Woff from './pt-serif-v9-latin-700.woff'
import ptSerif700Woff2 from './pt-serif-v9-latin-700.woff2'

import ptSerif700ItalicWoff from './pt-serif-v9-latin-700italic.woff'
import ptSerif700ItalicWoff2 from './pt-serif-v9-latin-700italic.woff2'

import ptSerifItalicWoff from './pt-serif-v9-latin-italic.woff'
import ptSerifItalicWoff2 from './pt-serif-v9-latin-italic.woff2'

import ptSerifRegularWoff from './pt-serif-v9-latin-regular.woff'
import ptSerifRegularWoff2 from './pt-serif-v9-latin-regular.woff2'

// Woff2 support Chrome 26+, Opera 23+, Firefox 39+
// Woff Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+

const rootPath = '../public/'
const fontFaces = [
  {
    family: 'PT Serif',
    variation: [
      {
        style: 'normal',
        weight: 400,
        localNames: ['PT Serif', 'PTSerif-Regular'],
        urls: [
          { type: 'woff2', url: `${rootPath}${ptSerifRegularWoff2}` },
          { type: 'woff', url: `${rootPath}${ptSerifRegularWoff}` },
        ],
      },
      {
        style: 'italic',
        weight: 400,
        localNames: ['PT Serif Italic', 'PTSerif-Italic'],
        urls: [
          { type: 'woff2', url: `${rootPath}${ptSerifItalicWoff2}` },
          { type: 'woff', url: `${rootPath}${ptSerifItalicWoff}` },
        ],
      },
      {
        style: 'normal',
        weight: 700,
        localNames: ['PT Serif Bold', 'PTSerif-Bold'],
        urls: [
          { type: 'woff2', url: `${rootPath}${ptSerif700Woff2}` },
          { type: 'woff', url: `${rootPath}${ptSerif700Woff}` },
        ],
      },
      {
        style: 'italic',
        weight: 700,
        localNames: ['PT Serif Bold Italic', 'PTSerif-BoldItalic'],
        urls: [
          { type: 'woff2', url: `${rootPath}${ptSerif700ItalicWoff2}` },
          { type: 'woff', url: `${rootPath}${ptSerif700ItalicWoff}` },
        ],
      },
    ],
  },
  {
    family: 'Alegreya Sans SC',
    variation: [
      {
        style: 'normal',
        weight: 500,
        localNames: ['Alegreya Sans SC Medium', 'AlegreyaSansSC-Medium'],
        urls: [
          { type: 'woff2', url: `${rootPath}${alegreyaSansSC500Woff2}` },
          { type: 'woff', url: `${rootPath}${alegreyaSansSC500Woff}` },
        ],
      },
    ],
  },
  {
    family: 'Alegreya Sans',
    variation: [
      {
        style: 'normal',
        weight: 400,
        localNames: ['Alegreya Sans Regular', 'AlegreyaSans-Regular'],
        urls: [
          { type: 'woff2', url: `${rootPath}${alegreyaSansRegularWoff2}` },
          { type: 'woff', url: `${rootPath}${alegreyaSansRegularWoff}` },
        ],
      },
      {
        style: 'normal',
        weight: 500,
        localNames: ['Alegreya Sans Medium', 'AlegreyaSans-Medium'],
        urls: [
          { type: 'woff2', url: `${rootPath}${alegreyaSans500Woff2}` },
          { type: 'woff', url: `${rootPath}${alegreyaSans500Woff}` },
        ],
      },
      {
        style: 'normal',
        weight: 700,
        localNames: ['Alegreya Sans Bold', 'AlegreyaSans-Bold'],
        urls: [
          { type: 'woff2', url: `${rootPath}${alegreyaSans700Woff2}` },
          { type: 'woff', url: `${rootPath}${alegreyaSans700Woff}` },
        ],
      },
    ],
  },
  {
    family: 'Fira Code',
    variation: [
      {
        style: 'normal',
        weight: 400,
        localNames: ['Fira Code'],
        urls: [
          { type: 'woff2', url: `${rootPath}${firaCodeRegularWoff2}` },
          { type: 'woff', url: `${rootPath}${firaCodeRegularWoff}` },
        ],
      },
    ],
  },
  {
    family: 'Playfair Display',
    variation: [
      {
        style: 'italic',
        weight: 400,
        localNames: ['Playfair Display Italic', 'PlayfairDisplay-Italic'],
        urls: [
          { type: 'woff2', url: `${rootPath}${playfairDisplayItalicWoff2}` },
          { type: 'woff', url: `${rootPath}${playfairDisplayItalicWoff}` },
        ],
      },
      {
        style: 'normal',
        weight: 700,
        localNames: ['Playfair Display Bold', 'PlayfairDisplay-Bold'],
        urls: [
          { type: 'woff2', url: `${rootPath}${playfairDisplay700Woff2}` },
          { type: 'woff', url: `${rootPath}${playfairDisplay700Woff}` },
        ],
      },
    ],
  },
]

const genLocals = arr => arr.map(name => `local('${name}'),`).join('')
const genUrls = arr =>
  arr.map(obj => `url('${obj.url}')format('${obj.type}')`).join(',')

const genFontFace = (family, style, weight, localNames, urls) =>
  `@font-face{font-family:'${family}';font-style:${style};font-weight:${weight};src:${genLocals(
    localNames
  )}${genUrls(urls)};}`

const genAllFontFaces = mtx =>
  `@charset 'UTF-8';${mtx
    .map(fontFace => {
      const { family, variation } = fontFace

      return variation
        .map(data =>
          genFontFace(
            family,
            data.style,
            data.weight,
            data.localNames,
            data.urls
          )
        )
        .join('')
    })
    .join('')}`

const result = genAllFontFaces(fontFaces)

export const setFontFaces = () => {
  ;((docOrigin, tagName, id, type) => {
    const firstTag = docOrigin.querySelector(tagName)

    if (docOrigin.querySelector(`#${id}`)) return

    const content = docOrigin.createTextNode(result)

    let newTag = docOrigin.createElement(tagName)
    newTag.setAttribute('id', id)
    newTag.setAttribute('type', type)
    newTag.append(content)

    if (firstTag) {
      firstTag.parentNode.insertBefore(newTag, firstTag)
    } else {
      const head = docOrigin.querySelector('head')
      head.appendChild(newTag)
    }
  })(document, 'style', 'mnv-fonts', 'text/css')
}
