import { combineReducers } from 'redux'

import user from './userReducer'
import map from './mapReducer'
import car from './carReducer'

export default combineReducers({
  user,
  map,
  car,
})
