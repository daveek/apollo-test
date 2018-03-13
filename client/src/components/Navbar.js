import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark">
    <Link className="navbar-brand" to="/">
      Book Tracker
    </Link>
  </nav>
)

export default Navbar
