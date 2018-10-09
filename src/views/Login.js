import React, { Component } from 'react'
import { connect } from 'react-redux';
import { loginUser } from '../ducks/actions/authorizationActions';
import {withRouter} from 'react-router-dom';
import classnames from 'classnames';
import Header from '../Header';
import Footer from '../Footer';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {},
    }
  }

  componentDidMount() {
    if(this.props.auth.isLoggedIn) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('hit')
    if(nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  handleInputs = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submit = (e) => {
    e.preventDefault();
    let userData = {
      email: this.state.email,
      password: this.state.password
    }
    this.props.loginUser(userData, this.props.history.push)
  }

  render() {
    console.log(this.state)
    const { errors } = this.state
    return (
      <div>
        <Header />
        <div>
        <div className="login-container">
          <h1 className="reg-log-header">Login</h1>
          <form className="form-container" onSubmit={this.submit}>
            <input 
              onChange={this.handleInputs} 
              name="email" 
              placeholder="Email Address"
              className={classnames("input", {'is-invalid': errors.email})}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            <input 
              onChange={this.handleInputs} 
              type="password" 
              name="password" 
              placeholder="Password"
              className={classnames("input", {'is-invalid': errors.password})}
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            <input type="submit" className="submit-button"/>
          </form>
        </div>
        </div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(withRouter(Login))
