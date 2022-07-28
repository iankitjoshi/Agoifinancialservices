
import {
  GET_CASHOUT_LIST_REQUEST,
  GET_CASHOUT_LIST_REQUEST_SUCCEEDED,
  GET_CASHOUT_LIST_REQUEST_FAILED,

  DELETE_CASHOUT,
  DELETE_CASHOUT_SUCCESS,
  DELETE_CASHOUT_FAILED,

  UPDATE_CASHOUT,
  UPDATE_CASHOUT_SUCCESS,
  UPDATE_CASHOUT_FAILED,

  GET_CASHOUT_BY_ID_REQUEST,
  GET_CASHOUT_BY_ID_REQUEST_SUCCEEDED,
  GET_CASHOUT_BY_ID_REQUEST_FAILED,

} from './actions'


const initState = {
  isLoading: false,
  cashoutList: {},
  singleCashout: {}
}

export default function (state = { ...initState }, action) {
  switch (action.type) {

    case GET_CASHOUT_LIST_REQUEST:
      return { ...state, isLoading: true }

    case GET_CASHOUT_LIST_REQUEST_SUCCEEDED:
      return { ...state, isLoading: false, cashoutList: action.payload }

    case GET_CASHOUT_LIST_REQUEST_FAILED:
      return { ...state, isLoading: false, cashoutList: {} }


    case DELETE_CASHOUT:
      return { ...state, isLoading: true }

    case DELETE_CASHOUT_SUCCESS:
      return { ...state, isLoading: false }

    case DELETE_CASHOUT_FAILED:
      return { ...state, isLoading: false }

    case UPDATE_CASHOUT:
      return { ...state, isLoading: true }

    case UPDATE_CASHOUT_SUCCESS:
      return { ...state, isLoading: false }

    case UPDATE_CASHOUT_FAILED:
      return { ...state, isLoading: false }


    case GET_CASHOUT_BY_ID_REQUEST:
      return { ...state, isLoading: true }

    case GET_CASHOUT_BY_ID_REQUEST_SUCCEEDED:
      return { ...state, isLoading: false, singleCashout: action.payload }

    case GET_CASHOUT_BY_ID_REQUEST_FAILED:
      return { ...state, isLoading: false, singleCashout: {} }

    default:
      return state
  }


}