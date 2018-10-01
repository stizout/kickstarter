import React from 'react'

const Header = () => {
  return (
    <header>
      <div>
        <ul className="header-container-left">
          <li>Brand</li>
          <li>Home</li>
          <li>Projects</li>
        </ul>
      </div>
      <div>
        <ul className="header-container-right">
          <li>Login</li>
          <li>Register</li>
          <li>Logout</li>
        </ul>
      </div>
    </header>
  )
}


export default Header;