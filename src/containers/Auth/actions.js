import { loginAPI } from './apis.js';

export function login(data) {
    return dispatch => {
        dispatch({
            type: LOGIN_REQUEST
        })
        return new Promise((resolve, reject) => {
            loginAPI(data).then(res => {
                dispatch({
                    type: LOGIN_REQUEST_SUCCESS,
                    user: {},
                    payload: res
                })
                return resolve(res)
            }).catch(err => {
                dispatch({
                    type: LOGIN_REQUEST_FAILED
                })
                return reject(err)
            })
        })
    }
}

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_REQUEST_SUCCESS = 'LOGIN_REQUEST_SUCCESS';
export const LOGIN_REQUEST_FAILED = 'LOGIN_REQUEST_FAILED'
