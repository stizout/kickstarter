import axios from 'axios';

export const registerUser = (userData, history) => dispatch => {
  console.log('hit registration button')
  axios.post('/api/users/register', userData).then(() => {
    history.push('/login');
  })
}

// .catch(err => dispatch({
//   type: SET_ERRORS,
//   payload: err.response.data
// }));