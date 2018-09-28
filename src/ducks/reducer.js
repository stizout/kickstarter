import { combineReducers } from 'redux';
import authorizationReducer from './reducers/authorizationReducer';
import errorsReducer from './reducers/errorsReducer';


export default combineReducers({
  auth: authorizationReducer,
  errors: errorsReducer
})