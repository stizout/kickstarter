import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthHeader from '../../setAuthHeader';
const GET_ERRORS = 'GET_ERRORS'
const SET_USER_IN_REDUX = 'SET_USER_IN_REDUX'
const LOGOUT_USER_IN_REDUX = 'LOGOUT_USER_IN_REDUX'

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
    console.log(decoded)
    dispatch(setUserInRedux(decoded))
  }).catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data
  }));
}
export const getUserType = (userData) => {
  axios.get('/api/users/type', userData).then(res => {
    res.json(res.data)
  })
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
