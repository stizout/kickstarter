const Validator = require('validator');
const isEmpty = val => {
  return (
    val === undefined ||
    val === null ||
    typeof(val) === 'object' && Object.keys(val).length === 0 ||
    typeof(val) === 'string' && val.trim().length === 0
  )
}

module.exports = function validateLogin(data) {
  let errors = {};
  data.email = !isEmpty(data.email) ? data.email : ''
  data.password = !isEmpty(data.password) ? data.password : ''

  if(Validator.isEmpty(data.email)) errors.email = 'Email is required'
  if(Validator.isEmpty(data.password)) errors.password = 'Password is required'

  return {
    errors,
    isValid: isEmpty(errors)
  }
}