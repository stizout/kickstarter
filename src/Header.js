import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import logo from './logo.png';
import { connect } from 'react-redux';
import { logoutUser } from './ducks/actions/authorizationActions';


class Header extends Component{
  constructor() {
    super();
    this.state = {
      display: 'none',
    }
  }
  logout = () => {
    this.props.logoutUser();
  }

  handleHamburger() {
    if(this.state.display === 'none') {
      this.setState({
        display: 'block'
      });
    } else {
      this.setState({
        display: 'none'
      });
    }
  }
  render() {
    const loggedInLinks = (
      <ul className="header-container-right mobile-header-off">
      <Link to="/profile"><li>Profile</li></Link>
      <Link to='/dashboard'><li onClick={this.logout}>Logout</li></Link>
    </ul>
    )
    const notLoggedInLinks = (
      <ul className="header-container-right mobile-header-off">
      <Link to="/login"><li>Login</li></Link>
      <Link to="/register"><li id="register-link">Register</li></Link>
    </ul>
    )
    const notLoggedIn = (
      <ul className="header-container-left">
        <Link to="/"><li><img src={logo} alt="brand"/></li></Link>
        <li className="mobile-header-off">KickStarter</li>
        <Link to="/dashboard"><li>Dashboard</li></Link>
      </ul>
    )
    const notLoggedInMobile = (
      <div className="mobile-menu">
        <h1 onClick={() => this.handleHamburger()}>Menu</h1>
      </div>
    )
    const LoggedInMobile = (
      <div className="mobile-menu">
        <h1 onClick={() => this.handleHamburger()}>Menu</h1>
      </div>
    )
    const display = {
      display: this.state.display
  }
  return (
    <header>
      <div>
        {notLoggedIn}
      </div>
      <div>
        {this.props.auth.isLoggedIn ?
          <div>
            {loggedInLinks}
            {LoggedInMobile}
            <ul style={display} className="header-menu">
              <Link to="/profile"><li>Profile</li></Link>
              <Link to='/dashboard'><li onClick={this.logout}>Logout</li></Link>
            </ul>
          </div> : 
          <div>
            {notLoggedInLinks}
            {notLoggedInMobile}
            <ul style={display} className="header-menu">
              <Link to="/login"><li>Login</li></Link>
              <Link to="/register"><li id="register-link">Register</li></Link>
            </ul>
          </div>}
      </div>
    </header>
  )
}
}

const mapStateToProps = state => ({
  auth: state.auth
})


export default connect(mapStateToProps, { logoutUser })(Header);