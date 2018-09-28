const InitialState = {}

const GET_ERRORS = 'GET_ERRORS'

export default function(state = InitialState, action) {
  switch(action.type) {
    case GET_ERRORS:
      return action.payload
    default: return state
  }
}