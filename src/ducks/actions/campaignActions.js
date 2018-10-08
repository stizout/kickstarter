import axios from 'axios';
const GET_ERRORS = 'GET_ERRORS'

  export const addCampaign = (data, history) => dispatch => {
    axios.post('/api/campaigns', data).then(() => {
      history.push('/dashboard');
    }).catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
  }




