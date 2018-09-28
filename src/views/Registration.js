import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../ducks/actions/authorizationActions';
import classnames from 'classnames'


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

    const { name, email, password, password2 } = this.state
    let newUser = {
      name,
      email,
      password,
      password2
    }
    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    console.log(this.state)
    const { errors } = this.state
    return (
      <div>
        <h1>Register</h1>
        <div className="form-container">
          <input 
            onChange={this.handleInputs} 
            name="name" 
            placeholder="Full Name"
            className={classnames({'is-invalid': errors.name})}
          />
          {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
          <input 
            onChange={this.handleInputs} name="email" 
            placeholder="Email Address"
            className={classnames({'is-invalid': errors.email})}
          />
          {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
          <input 
            onChange={this.handleInputs} type="text" 
            name="password" placeholder="Password"
            className={classnames({'is-invalid': errors.email})}
          />
          {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
          <input 
            onChange={this.handleInputs} type="text"
            name="password2" placeholder="Verify Password"
            className={classnames({'is-invalid': errors.password})}
          />
          {errors.password2 && (<div className="invalid-feedback">{errors.password2}</div>)}
          <button onClick={this.submit}>Register</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})



export default connect(mapStateToProps, { registerUser })(withRouter(Registration));