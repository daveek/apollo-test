import React from 'react'
import PropTypes from 'prop-types'
import Navbar from './Navbar'

const AppLayout = ({ children }) => (
  <div>
    <Navbar />
    <main className="mt-4">{children}</main>
  </div>
)
AppLayout.propTypes = {
  children: PropTypes.node,
}

export default AppLayout
