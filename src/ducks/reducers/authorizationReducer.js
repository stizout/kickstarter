const InitialState = {
  isLoggedIn: false,
  user: {},
  errors: {},
}
const SET_USER_IN_REDUX = 'SET_USER_IN_REDUX'
const LOGOUT_USER_IN_REDUX = 'LOGOUT_USER_IN_REDUX'


export default function(state = InitialState, action) {
  switch(action.type) {
    case SET_USER_IN_REDUX:
    return {...state, isLoggedIn: true, user: action.payload}
    case LOGOUT_USER_IN_REDUX:
    return action.payload
    default: return state
  }
}