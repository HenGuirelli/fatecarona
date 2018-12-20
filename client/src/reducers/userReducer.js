export default function reducer(state={
    user: {},
    userData: {},
    firebase: {},
    notifications: [],
    pending: true,
    error: null,
    updating: false,
    needReload: false,
  }, action) {
    switch (action.type) {
      case 'SET_FIREBASE': {
        return {...state, firebase: action.payload}
      }
      case 'UPDATE_USER': {
        return {...state, user: action.payload, pending: false}
      }
      case 'GET_NOTIFICATIONS_FULFILLED': {
        return {...state, notifications: action.payload.data}
      }
      case 'SET_USER_DATA_FULFILLED': {
        return {...state, userData: action.payload.data, needReload: false}
      }
      case 'UPDATE_USER_DATA_PENDING': {
        return {...state, updating: true}
      }
      case 'UPDATE_USER_DATA_FULFILLED': {
        return {...state, updating: false, needReload: true}
      }
      case 'UPDATE_USER_DATA_REJECTED': {
        return {...state, error: action.payload, updating: false}
      }
      case 'UNSET_USER': {
        return {...state, user: {}, userData: {}, pending: false}
      }
      case 'USER_LOGIN_PENDING': {
        return {...state, pending: true}
      }
      case 'USER_LOGIN_REJECTED': {
        return {...state, error: action.payload, pending: false}
      }
      case 'LOAD_USER_FULFILLED': {
        return {...state, user: action.payload.data[0]}
      }
      case 'INSERT_USER_FULFILLED': {
        window.displayDialog({title: 'Aviso', msg: 'Cadastro realizado!'}, '/')
        return state
      }
      case 'INSERT_USER': {
        state.payload()
        return state
      }
      default: {
        return state
      }
    }
}
