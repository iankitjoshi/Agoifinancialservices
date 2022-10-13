import {
    LOGIN_REQUEST,
    LOGIN_REQUEST_SUCCESS,
    LOGIN_REQUEST_FAILED,
} from './actions';
import { saveObject } from '../../utils';


const initalState = {
    isLoading: false,
}


export default function (state = { ...initalState }, action) {
    switch (action.type) {

        case LOGIN_REQUEST:
            return { ...state, isLoading: true }

        case LOGIN_REQUEST_SUCCESS:
            saveObject("agoi-token", action?.payload && JSON.stringify(action?.payload?.message?.token))
            return { ...state, isLoading: false }

        case LOGIN_REQUEST_FAILED:
            return { ...state, isLoading: false }

        default:
            return state
    }
}