import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../ducks/actions/authorizationActions';


class Registration extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {},
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) this.setState({
      errors: nextProps.errors
    });
  }

  handleInputs = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  submit = () => {
    const { name, email, password } = this.state
    let newUser = {
      name,
      email,
      password
    }
    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <h1>Register</h1>
        <div className="form-container">
          <input onChange={this.handleInputs} name="name" placeholder="Full Name"/>
          <input onChange={this.handleInputs} name="email" placeholder="Email Address"/>
          <input onChange={this.handleInputs} type="password" name="password" placeholder="Password"/>
          <input  onChange={this.handleInputs} type="password" name="password2" placeholder="Verify Password"/>
          <button onClick={this.submit}>Register</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})



export default connect(mapStateToProps, { registerUser })(withRouter(Registration));