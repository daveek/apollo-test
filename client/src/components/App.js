import React from 'react'
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

export default App
