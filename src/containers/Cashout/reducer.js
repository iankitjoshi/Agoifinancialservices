
import {
  GET_CASHOUT_LIST_REQUEST,
  GET_CASHOUT_LIST_REQUEST_SUCCEEDED,
  GET_CASHOUT_LIST_REQUEST_FAILED,

  DELETE_CASHOUT,
  DELETE_CASHOUT_SUCCESS,
  DELETE_CASHOUT_FAILED,

  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,

} from './actions'


const initState = {
  isLoading: false,
  userList: {},
}

export default function (state = { ...initState }, action) {
  switch (action.type) {

    case GET_CASHOUT_LIST_REQUEST:
      return { ...state, isLoading: true }

    case GET_CASHOUT_LIST_REQUEST_SUCCEEDED:
      return { ...state, isLoading: false, userList: action.payload }

    case GET_CASHOUT_LIST_REQUEST_FAILED:
      return { ...state, isLoading: false, userList: {} }


    case DELETE_CASHOUT : 
      return {...state , isLoading : true}
    

    case DELETE_CASHOUT_SUCCESS : 
      return {...state , isLoading : false}
    

    case DELETE_CASHOUT_FAILED : 
      return {...state , isLoading : false}
    

    case UPDATE_USER : 
      return {...state , isLoading : true}

    case UPDATE_USER_SUCCESS : 
      return {...state , isLoading : false}
    
    case UPDATE_USER_FAILED : 
      return {...state, isLoading : false}
      
    default:
      return state
  }


}