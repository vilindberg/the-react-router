import { createElement } from 'react'
import ReactDOM from 'react-dom'
import { App } from './app'

const renderElement = document.createElement('div')
renderElement.id = 'root'
document.body.appendChild(renderElement)

ReactDOM.render(createElement(App), document.getElementById('root'))
