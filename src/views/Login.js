import React, { Component } from 'react'
import Header from '../Header';
import Footer from '../Footer';

export default class Registration extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    }
  }

  handleInputs = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    console.log(this.state)
    return (
      <div className="login-container">
        <Header />
        <h1 className="reg-log-header">Login</h1>
        <div>
          <form className="form-container">
            <input onChange={this.handleInputs} name="email" placeholder="Email Address"/>
            <input onChange={this.handleInputs} type="password" name="password" placeholder="Password"/>
            <input type="submit" className="submit-button"/>
          </form>
        </div>
        <Footer />
      </div>
    )
  }
}
