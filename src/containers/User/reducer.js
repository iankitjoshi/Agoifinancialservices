
import {
  GET_USER_LIST_REQUEST,
  GET_USER_LIST_REQUEST_SUCCEEDED,
  GET_USER_LIST_REQUEST_FAILED,

  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILED,

  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,

  CREATE_USERS,
  CREATE_USERS_SUCCESS,
  CREATE_USERS_FAILED,

  GET_USER_BY_ID_REQUEST,
  GET_USER_BY_ID_REQUEST_SUCCEEDED,
  GET_USER_BY_ID_REQUEST_FAILED,

  GET_USER_TOTAL_INVESTMENT,
  GET_USER_TOTAL_INVESTMENT_SUCCEEDED,
  GET_USER_TOTAL_INVESTMENT_FAILED

} from './actions'


const initState = {
  isLoading: false,
  userList: {},
  singleUser: {},
  totalInvestment: {}
}

export default function (state = { ...initState }, action) {
  switch (action.type) {

    case GET_USER_LIST_REQUEST:
      return { ...state, isLoading: true }

    case GET_USER_LIST_REQUEST_SUCCEEDED:
      return { ...state, isLoading: false, userList: action.payload }

    case GET_USER_LIST_REQUEST_FAILED:
      return { ...state, isLoading: false, userList: {} }


    case DELETE_USER:
      return { ...state, isLoading: true }


    case DELETE_USER_SUCCESS:
      return { ...state, isLoading: false }


    case DELETE_USER_FAILED:
      return { ...state, isLoading: false }


    case UPDATE_USER:
      return { ...state, isLoading: true }

    case UPDATE_USER_SUCCESS:
      return { ...state, isLoading: false }

    case UPDATE_USER_FAILED:
      return { ...state, isLoading: false }


    case CREATE_USERS:
      return { ...state, isLoading: true }

    case CREATE_USERS_SUCCESS:
      return { ...state, isLoading: false }

    case CREATE_USERS_FAILED:
      return { ...state, isLoading: false }

    case GET_USER_BY_ID_REQUEST:
      return { ...state, isLoading: true }

    case GET_USER_BY_ID_REQUEST_SUCCEEDED:
      return { ...state, isLoading: false, singleUser: action.payload }

    case GET_USER_BY_ID_REQUEST_FAILED:
      return { ...state, isLoading: false, singleUser: {} }


    case GET_USER_TOTAL_INVESTMENT:
      return { ...state, isLoading: true }

    case GET_USER_TOTAL_INVESTMENT_SUCCEEDED:
      return { ...state, isLoading: false, totalInvestment: action.payload }

    case GET_USER_TOTAL_INVESTMENT_FAILED:
      return { ...state, isLoading: false, totalInvestment: {} }


    default:
      return state
  }


}