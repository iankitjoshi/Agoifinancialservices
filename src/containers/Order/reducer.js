
import {
  GET_ORDER_LIST_REQUEST,
  GET_ORDER_LIST_REQUEST_SUCCEEDED,
  GET_ORDER_LIST_REQUEST_FAILED,

  DELETE_ORDER,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAILED,

  UPDATE_ORDER,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAILED,

  CREATE_USERS,
  CREATE_USERS_SUCCESS,
  CREATE_USERS_FAILED,

} from './actions'


const initState = {
  isLoading: false,
  userList: {},
}

export default function (state = { ...initState }, action) {
  switch (action.type) {

    case GET_ORDER_LIST_REQUEST:
      return { ...state, isLoading: true }

    case GET_ORDER_LIST_REQUEST_SUCCEEDED:
      return { ...state, isLoading: false, userList: action.payload }

    case GET_ORDER_LIST_REQUEST_FAILED:
      return { ...state, isLoading: false, userList: {} }


    case DELETE_ORDER : 
      return {...state , isLoading : true}
    

    case DELETE_ORDER_SUCCESS : 
      return {...state , isLoading : false}
    

    case DELETE_ORDER_FAILED : 
      return {...state , isLoading : false}
    

    case UPDATE_ORDER : 
      return {...state , isLoading : true}

    case UPDATE_ORDER_SUCCESS : 
      return {...state , isLoading : false}
    
    case UPDATE_ORDER_FAILED : 
      return {...state, isLoading : false}
      

    case CREATE_USERS : 
      return {...state , isLoading : true}

    case CREATE_USERS_SUCCESS : 
      return {...state , isLoading : false}
    
    case CREATE_USERS_FAILED : 
      return {...state, isLoading : false}

    default:
      return state
  }


}