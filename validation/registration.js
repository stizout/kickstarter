const Validator = require('validator');
const isEmpty = val => {
  return (
    val === undefined ||
    val === null ||
    typeof(val) === 'object' && Object.keys(val).length === 0 ||
    typeof(val) === 'string' && val.trim().length === 0
  )
}

module.exports = function validateRegistration(data) {
  let errors = {};
  data.name = isEmpty(data.name) ? '' : data.name
  data.email = isEmpty(data.email) ? '' : data.email
  data.password = isEmpty(data.password) ? '' : data.password
  data.password2 = isEmpty(data.password2) ? '' : data.password2
  console.log(data.password, data.password2)

  if(!Validator.isLength(data.name, {min: 2, max: 30})) {
    errors.name = 'Name must be between 2 and 30 characters'
  }
  if(!Validator.isLength(data.password, {min: 8})) {
    errors.password = 'Password must be at least 8 characters'
  }
  if(!Validator.isEmail(data.email)) errors.email = "Must be a valid email"
  if(Validator.isEmpty(data.name)) errors.name = 'Name is required'
  if(Validator.isEmpty(data.password)) errors.password = 'Password is required'
  if(Validator.isEmpty(data.password2)) errors.password2 = 'Must confirm password'
  if(!Validator.equals(data.password, data.password2)) errors.password2 = "Your passwords don't match, please check them"

  return {
    errors,
    isValid: isEmpty(errors)
  }
}