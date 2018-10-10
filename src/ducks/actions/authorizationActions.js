import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthHeader from '../../setAuthHeader';
const GET_ERRORS = 'GET_ERRORS'
const SET_USER_IN_REDUX = 'SET_USER_IN_REDUX'
const LOGOUT_USER_IN_REDUX = 'LOGOUT_USER_IN_REDUX'
const SET_USER_TYPE = 'SET_USER_TYPE'

export const registerUser = (userData, history) => dispatch => {
  console.log('hit registration button')
  axios.post('/api/users/register', userData).then(() => {
    history.push('/login');
  }).catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data
  }));
}

export const loginUser = (userData, push) => dispatch => {
  axios.post('/api/users/login', userData).then(res => {
    const { token } = res.data
    push('/dashboard');
    localStorage.setItem('jwtToken', token);

    setAuthHeader(token)

    const decoded = jwt_decode(token);
    dispatch( getUserType(decoded.id) )
    dispatch(setUserInRedux(decoded))
  }).catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data
  }));
}
export const getUserType = (userData) => dispatch => {
  axios.get('/api/users/details', userData).then(res => {
    dispatch(setUserType(res.data));
  }).catch(err => console.log(err))
}

export const setUserType = (type) => {
  return {
    type: SET_USER_TYPE,
    payload: type
  }
}

export const setUserInRedux = (decoded) => {
  return {
    type: SET_USER_IN_REDUX,
    payload: decoded
  }
}


const logoutUserInRedux = () => {
  return {
    type: LOGOUT_USER_IN_REDUX,
    payload: {
      isLoggedIn: false,
      user: {}
    }
  }
}

export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthHeader(false);
  dispatch(logoutUserInRedux())
}
