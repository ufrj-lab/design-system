import { configure } from '@storybook/polymer'
import '@storybook/addon-console'

const req = require.context('../components/', true, /\.stories\.ts$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
