
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

  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_REQUEST_SUCCEEDED,
  GET_ORDER_BY_ID_REQUEST_FAILED,
 

} from './actions'


const initState = {
  isLoading: false,
  orderList: {},
  singleOrder : {}
}

export default function (state = { ...initState }, action) {
  switch (action.type) {

    case GET_ORDER_LIST_REQUEST:
      return { ...state, isLoading: true }

    case GET_ORDER_LIST_REQUEST_SUCCEEDED:
      return { ...state, isLoading: false, orderList: action.payload }

    case GET_ORDER_LIST_REQUEST_FAILED:
      return { ...state, isLoading: false, orderList: {} }


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
      

    case GET_ORDER_BY_ID_REQUEST:
      return { ...state, isLoading: true }

    case GET_ORDER_BY_ID_REQUEST_SUCCEEDED:
      return { ...state, isLoading: false, singleOrder: action.payload }

    case GET_ORDER_BY_ID_REQUEST_FAILED:
      return { ...state, isLoading: false, singleOrder: {} }

    default:
      return state
  }


}