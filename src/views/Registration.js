import React, { Component } from 'react'

export default class Registration extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',

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
        <input onChange={this.handleInputs} name="name" placeholder="Full Name"/>
        <input onChange={this.handleInputs} name="email" placeholder="Email Address"/>
        <input onChange={this.handleInputs} type="password" name="password" placeholder="Password"/>
        <input  onChange={this.handleInputs} type="password" name="password2" placeholder="Verify Password"/>
        <button>Register</button>
      </div>
    )
  }
}
