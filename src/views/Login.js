import React, { Component } from 'react'

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
      <div>
        <input onChange={this.handleInputs} name="email" placeholder="Email Address"/>
        <input onChange={this.handleInputs} type="password" name="password" placeholder="Password"/>
        <button>Login</button>
      </div>
    )
  }
}
