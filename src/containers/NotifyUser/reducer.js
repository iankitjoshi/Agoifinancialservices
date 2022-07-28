
import {
  GET_NOTIFICATION_LIST_REQUEST,
  GET_NOTIFICATION_LIST_REQUEST_SUCCEEDED,
  GET_NOTIFICATION_LIST_REQUEST_FAILED,

  DELETE_NOTIFICATION,
  DELETE_NOTIFICATION_SUCCESS,
  DELETE_NOTIFICATION_FAILED,

  CREATE_NOTIFICATIONS,
  CREATE_NOTIFICATIONS_SUCCESS,
  CREATE_NOTIFICATIONS_FAILED,

} from './actions'


const initState = {
  isLoading: false,
  notificationList: {},
}

export default function (state = { ...initState }, action) {
  switch (action.type) {

    case GET_NOTIFICATION_LIST_REQUEST:
      return { ...state, isLoading: true }

    case GET_NOTIFICATION_LIST_REQUEST_SUCCEEDED:
      return { ...state, isLoading: false, notificationList: action.payload }

    case GET_NOTIFICATION_LIST_REQUEST_FAILED:
      return { ...state, isLoading: false, notificationList: {} }


    case DELETE_NOTIFICATION : 
      return {...state , isLoading : true}
    

    case DELETE_NOTIFICATION_SUCCESS : 
      return {...state , isLoading : false}
    

    case DELETE_NOTIFICATION_FAILED : 
      return {...state , isLoading : false}
          

    case CREATE_NOTIFICATIONS : 
      return {...state , isLoading : true}

    case CREATE_NOTIFICATIONS_SUCCESS : 
      return {...state , isLoading : false}
    
    case CREATE_NOTIFICATIONS_FAILED : 
      return {...state, isLoading : false}

    default:
      return state
  }


}