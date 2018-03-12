import React from 'react'
import { Link } from 'react-router-dom'

class Navbar extends React.Component {
  render() {
    return (
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{
          background:
            'linear-gradient(to right bottom, rgb(97, 33, 169), rgb(67, 46, 119))',
        }}
      >
        <Link className="navbar-brand" to="/">
          Book Tracker
        </Link>
      </nav>
    )
  }
}

export default Navbar
