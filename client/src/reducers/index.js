import { combineReducers } from 'redux'

import user from './userReducer'
import map from './mapReducer'
import car from './carReducer'
import lift from './liftReducer'
import navigation from './navigationReducer'
import flow from './flowReducer'
import flows from './flowsReducer'
import carpool from './carpoolReducer'

export default combineReducers({
    user,
    navigation,
    car,
    flow,
    flows,
    carpool
})
