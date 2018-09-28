import { combineReducers } from 'redux';
import authorizationReducer from './reducers/authorizationReducer';


export default combineReducers({
  auth: authorizationReducer
})