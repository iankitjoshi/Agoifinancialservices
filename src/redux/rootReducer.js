import { combineReducers } from 'redux'

import auth from '../containers/Auth/reducer'
import users from '../containers/User/reducer'

export default combineReducers({
  auth,
  users,
})