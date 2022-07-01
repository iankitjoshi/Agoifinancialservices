
import {
  GET_KYC_LIST_REQUEST,
  GET_KYC_LIST_REQUEST_SUCCEEDED,
  GET_KYC_LIST_REQUEST_FAILED,

  DELETE_KYC,
  DELETE_KYC_SUCCESS,
  DELETE_KYC_FAILED,

  UPDATE_KYC,
  UPDATE_KYC_SUCCESS,
  UPDATE_KYC_FAILED,

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

    case GET_KYC_LIST_REQUEST:
      return { ...state, isLoading: true }

    case GET_KYC_LIST_REQUEST_SUCCEEDED:
      return { ...state, isLoading: false, userList: action.payload }

    case GET_KYC_LIST_REQUEST_FAILED:
      return { ...state, isLoading: false, userList: {} }


    case DELETE_KYC : 
      return {...state , isLoading : true}
    

    case DELETE_KYC_SUCCESS : 
      return {...state , isLoading : false}
    

    case DELETE_KYC_FAILED : 
      return {...state , isLoading : false}
    

    case UPDATE_KYC : 
      return {...state , isLoading : true}

    case UPDATE_KYC_SUCCESS : 
      return {...state , isLoading : false}
    
    case UPDATE_KYC_FAILED : 
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