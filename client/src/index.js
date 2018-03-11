import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'

const render = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

if (module.hot) {
  module.hot.accept(['./components/App'], () => {
    ReactDOM.unmountComponentAtNode(document.getElementById('root'))
    render()
  })
}

render()
