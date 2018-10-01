import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from './ducks/actions/authorizationActions';


class Header extends Component{
  logout = () => {
    this.props.logoutUser();
  }
  render() {
    const loggedInLinks = (
      <ul className="header-container-right">
      <li onClick={this.logout}>Logout</li>
    </ul>
    )
    const notLoggedInLinks = (
      <ul className="header-container-right">
      <Link to="/login"><li>Login</li></Link>
      <Link to="/register"><li id="register-link">Register</li></Link>
    </ul>
    )
  return (
    <header>
      <div>
        <ul className="header-container-left">
          <Link to="/"><li>Brand</li></Link>
          <Link to="/dashboard"><li>Dashboad</li></Link>
          <li>Projects</li>
        </ul>
      </div>
      <div>
        {this.props.auth.isLoggedIn ? loggedInLinks : notLoggedInLinks}
      </div>
    </header>
  )
}
}

const mapStateToProps = state => ({
  auth: state.auth
})


export default connect(mapStateToProps, { logoutUser })(Header);