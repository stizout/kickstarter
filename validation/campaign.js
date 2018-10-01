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
  data.title = !isEmpty(data.title) ? data.title : ''
  data.description = !isEmpty(data.description) ? data.description : ''
  data.fullyFunded = !isEmpty(data.fullyFunded) ? data.fullyFunded : ''
  data.endDate = !isEmpty(data.endDate) ? data.endDate : ''
  data.video = !isEmpty(data.video) ? data.video : ''
  data.category = !isEmpty(data.category) ? data.category : ''

  if(Validator.isEmpty(data.title)) errors.title = 'Title is required'
  if(Validator.isEmpty(data.description)) errors.description = 'Description is required'
  if(Validator.isEmpty(data.fullyFunded)) errors.fullyFunded = 'You must state what your goal is'
  if(Validator.isEmpty(data.endDate)) errors.endDate = 'Campaign end date is required'
  if(Validator.isEmpty(data.video)) errors.video = 'You must put a description video'
  if(Validator.isEmpty(data.category)) errors.category = 'Category is required'

  return {
    errors,
    isValid: isEmpty(errors)
  }
}