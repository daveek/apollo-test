import React from 'react'

class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="/">
          Book Tracker
        </a>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {['Authors', 'Book Shelves'].map(label => (
              <li key={label} className="nav-item">
                <a
                  className="nav-link"
                  href={label.replace(/\s+/g, '-').toLowerCase()}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input
              type="search"
              className="form-control mr-sm-2"
              placeholder="Find a book"
            />
          </form>
        </div>
      </nav>
    )
  }
}

export default Navbar
