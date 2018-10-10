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
      <Link to="/profile"><li>Profile</li></Link>
      <li onClick={this.logout}>Logout</li>
    </ul>
    )
    const notLoggedInLinks = (
      <ul className="header-container-right">
      <Link to="/login"><li>Login</li></Link>
      <Link to="/register"><li id="register-link">Register</li></Link>
    </ul>
    )

    const loggedInEntre = (
      <ul className="header-container-left">
        <Link to="/"><li>Brand</li></Link>
        <Link to="/dashboard"><li>Dashboard</li></Link>
        <Link to='/campaigns/add'><li>Add a Project</li></Link>
    </ul>
    )
    const loggedInBacker = (
      <ul className="header-container-left">
        <Link to="/"><li>Brand</li></Link>
        <Link to="/dashboard"><li>Dashboard</li></Link>
        <li>Backed Projects</li>
      </ul>
    )
    const notLoggedIn = (
      <ul className="header-container-left">
        <Link to="/"><li>Brand</li></Link>
        <Link to="/dashboard"><li>Dashboard</li></Link>
      </ul>
    )
    console.log(this.props.auth);
  return (
    <header>
      <div>
        {this.props.auth.isLoggedIn ?
          this.props.auth.type === "backer" ? loggedInBacker : loggedInEntre
        : notLoggedIn 
        }
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