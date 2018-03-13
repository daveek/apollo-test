import React from 'react'
import PropTypes from 'prop-types'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import AppLayout from './AppLayout'
import Dashboard from '../views/Dashboard'

const App = ({ client }) => (
  <ApolloProvider client={client}>
    <Router>
      <AppLayout>
        <Route exact path="/" component={Dashboard} />
      </AppLayout>
    </Router>
  </ApolloProvider>
)
App.propTypes = {
  client: PropTypes.object.isRequired,
}

export default App
