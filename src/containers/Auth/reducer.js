import {
    LOGIN_REQUEST,
    LOGIN_REQUEST_SUCCESS,
    LOGIN_REQUEST_FAILED,
} from './actions';
import { saveObject } from '../../utils';


const initalState = {
    isLoading: false,
    user: {}
}


export default function (state = { ...initalState }, action) {
    switch (action.type) {

        case LOGIN_REQUEST:
            return { ...state, isLoading: true }

        case LOGIN_REQUEST_SUCCESS:
            console.log(action?.payload?.message?.token,'action.payload')
            saveObject("agoi-token", JSON.stringify(action?.payload?.message?.token))
            return { ...state, isLoading: false }

        case LOGIN_REQUEST_FAILED:
            return { ...state, isLoading: false }
            
        default:
            return state
    }
}