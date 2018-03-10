export default function reducer(state={
    user: {},
    userData: {},
    firebase: {},
    pending: true,
    error: null,
  }, action) {
    switch (action.type) {
      case 'SET_FIREBASE': {
        return {...state, firebase: action.payload}
      }
      case 'UPDATE_USER': {
        return {...state, user: action.payload, pending: false}
      }
      case 'SET_USER_DATA_FULFILLED': {
        return {...state, userData: action.payload.data}
      }
      case 'UNSET_USER': {
        return {...state, user: {}, pending: false}
      }
      case 'USER_LOGIN_PENDING': {
        return {...state, pending: true}
      }
      case 'USER_LOGIN_REJECTED': {
        return {...state, error: action.payload}
      }
      case 'LOAD_USER_FULFILLED': {
        return {...state, user: action.payload.data[0]}
      }
      default: {
        return state
      }
    }
}