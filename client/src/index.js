import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import client from './graphql/client'
import 'bootstrap/dist/css/bootstrap.css'
import 'react-select/dist/react-select.css'

const render = () => {
  ReactDOM.render(<App client={client} />, document.getElementById('root'))
}

if (module.hot) {
  module.hot.accept(['./components/App', './graphql/client'], () => {
    ReactDOM.unmountComponentAtNode(document.getElementById('root'))
    render()
  })
}

render()
