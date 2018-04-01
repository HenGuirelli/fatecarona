import { combineReducers } from 'redux'

import user from './userReducer'
import map from './mapReducer'
import car from './carReducer'
import lift from './liftReducer'

export default combineReducers({
  user,
  map,
  car,
  lift,
})
