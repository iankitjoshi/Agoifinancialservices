
import {
  GET_SHARE_LIST_REQUEST,
  GET_SHARE_LIST_REQUEST_SUCCEEDED,
  GET_SHARE_LIST_REQUEST_FAILED,

  DELETE_SHARE,
  DELETE_SHARE_SUCCESS,
  DELETE_SHARE_FAILED,

  UPDATE_SHARE,
  UPDATE_SHARE_SUCCESS,
  UPDATE_SHARE_FAILED,

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

    case GET_SHARE_LIST_REQUEST:
      return { ...state, isLoading: true }

    case GET_SHARE_LIST_REQUEST_SUCCEEDED:
      return { ...state, isLoading: false, userList: action.payload }

    case GET_SHARE_LIST_REQUEST_FAILED:
      return { ...state, isLoading: false, userList: {} }


    case DELETE_SHARE : 
      return {...state , isLoading : true}
    

    case DELETE_SHARE_SUCCESS : 
      return {...state , isLoading : false}
    

    case DELETE_SHARE_FAILED : 
      return {...state , isLoading : false}
    

    case UPDATE_SHARE : 
      return {...state , isLoading : true}

    case UPDATE_SHARE_SUCCESS : 
      return {...state , isLoading : false}
    
    case UPDATE_SHARE_FAILED : 
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