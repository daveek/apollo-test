import React from 'react'
import Navbar from './Navbar'

class AppLayout extends React.Component {
  render() {
    const { children } = this.props
    return (
      <div>
        <Navbar />
        <main className="mt-4">{children}</main>
      </div>
    )
  }
}

export default AppLayout
