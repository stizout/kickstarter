import React from 'react'
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div>
        <ul className="header-container-left">
          <a href="/"><li>Brand</li></a>
          <a href="/dashboard"><li>Home</li></a>
          <li>Projects</li>
        </ul>
      </div>
      <div>
        <ul className="header-container-right">
          <a href="/login"><li>Login</li></a>
          <a href="/register"><li>Register</li></a>
          <li>Logout</li>
        </ul>
      </div>
    </header>
  )
}


export default Header;