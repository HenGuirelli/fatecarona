import { combineReducers } from 'redux'

import user from './userReducer'
import map from './mapReducer'

export default combineReducers({
  user,
  map,
})