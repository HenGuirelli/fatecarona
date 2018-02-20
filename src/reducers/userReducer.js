export default function reducer(state={
    user: {},
    firebase: {},
    isLogged: false,
    pending: false,
    error: null,
  }, action) {
    switch (action.type) {
      case 'SET_FIREBASE': {
        return {...state, firebase: action.payload}
      }
      case 'UPDATE_USER': {
        return {...state, user: action.payload, isLogged: true, pending: false}
      }
      case 'UNSET_USER': {
        return {...state, user: {}, isLogged: false}
      }
      case 'USER_LOGIN_PENDING': {
        return {...state, pending: true}
      }
      case 'USER_LOGIN_REJECTED': {
        return {...state, error: action.payload}
      }
      default: {
        return state
      }
    }
}