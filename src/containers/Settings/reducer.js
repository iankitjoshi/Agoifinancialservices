import {
  SETTING_UPDATE ,
  SETTING_UPDATE_SUCCESS,
  SETTING_UPDATE_FAILED,

 GET_ADMIN_DETAILS,
 GET_ADMIN_DETAILS_SUCCESS,
 GET_ADMIN_DETAILS_FAILED 
} from './actions'
import { saveObject } from '../../utils';


const initState = {
  isLoading: false,
  admin : {}
}


export default function (state = { ...initState }, action) {
  switch (action.type) {
    case GET_ADMIN_DETAILS : 
      return {...state , isLoading : true}
    
    case GET_ADMIN_DETAILS_SUCCESS :

      const {image = '' ,username = ""} = action.payload
      const adminData = {} 
      adminData.profileImage = image || ''
      adminData.userName = username || ''
      
      saveObject("top-challange-admin", JSON.stringify(adminData))
      
      return {...state , isLoading : false , admin : action.payload || {} }

    case GET_ADMIN_DETAILS_FAILED : 
      return {...state , isLoading : false , admin : {}}

    case SETTING_UPDATE:
      return { ...state, isLoading: true }

    case SETTING_UPDATE_SUCCESS:
      return {...state, isLoading: false }

    case SETTING_UPDATE_FAILED:
      return {...state, isLoading: false }

    default:
      return state
  }
}