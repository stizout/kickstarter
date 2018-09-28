import axios from 'axios';
const GET_ERRORS = 'GET_ERRORS'

export const registerUser = (userData, history) => dispatch => {
  console.log('hit registration button')
  axios.post('/api/users/register', userData).then(() => {
    history.push('/login');
  }).catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data
  }));
}

