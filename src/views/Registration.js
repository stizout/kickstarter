import React, { Component } from 'react'
import Header from '../Header';
import Footer from '../Footer';
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
      type: null,
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
  submit = (e) => {
    e.preventDefault();
    const { name, password, password2, type } = this.state
    let email = this.state.email.toLowerCase();
    let newUser = {
      type,
      name,
      email,
      password,
      password2
    }
    this.props.registerUser(newUser, this.props.history);
  }

  updateType = (e) => {
    this.setState({type: e.target.value})
  }

  render() {
    console.log(this.state)
    const { errors } = this.state
    return (
      <div>
        <Header />
        <div className="registration-container">
        <h1 className="reg-log-header">Register</h1>
        <form className="form-container" onSubmit={this.submit}>
          <span>
            <label>Why are you joining?</label>
              <label>Backer <input type='radio' value="backer" name="type" onClick={this.updateType}/></label>
              <label>Entrepreneur <input type='radio'value="entrepreneur" name="type" onClick={this.updateType}/></label>
          </span>
          {errors.type && (<div className="invalid-feedback">{errors.type}</div>)}
          <input 
            onChange={this.handleInputs} 
            name="name" 
            placeholder="Full Name"
            className={classnames("input",{'is-invalid': errors.name})}
          />
          {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
          <input 
            onChange={this.handleInputs} name="email" 
            placeholder="Email Address"
            className={classnames("input",{'is-invalid': errors.email})}
          />
          {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
          <input 
            onChange={this.handleInputs} type="password" 
            name="password" placeholder="Password"
            className={classnames("input", {'is-invalid': errors.email})}
          />
          {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
          <input 
            onChange={this.handleInputs} type="password"
            name="password2" placeholder="Verify Password"
            className={classnames("input", {'is-invalid': errors.password})}
          />
          {errors.password2 && (<div className="invalid-feedback">{errors.password2}</div>)}
          <input type="submit" className="submit-button"/>
        </form>
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



export default connect(mapStateToProps, { registerUser })(withRouter(Registration));