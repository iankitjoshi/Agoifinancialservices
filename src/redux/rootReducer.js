import { combineReducers } from 'redux'

import auth from '../containers/Auth/reducer'
import users from '../containers/User/reducer'
import share from '../containers/Share/reducer'
import KYC from '../containers/KYC/reducer'
import cashout from '../containers/Cashout/reducer'
import order from '../containers/Order/reducer'
import notifyUser from '../containers/NotifyUser/reducer'

export default combineReducers({
  auth,
  share,
  users,
  KYC,
  cashout,
  order,
  notifyUser
})