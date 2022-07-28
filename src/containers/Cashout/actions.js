import {
    getCashoutAPI,
    deleteCashoutAPI,
    updateCashoutAPI,
    searchCashoutByFilterAPI,
    getCashoutByIDAPI
} from './apis'

export function getCashoutList(data) {
    return dispatch => {
        dispatch({
            type: GET_CASHOUT_LIST_REQUEST,
        })
        return new Promise((resolve, rej) => {
            getCashoutAPI(data).then(res => {
                dispatch({
                    type: GET_CASHOUT_LIST_REQUEST_SUCCEEDED,
                    payload: res
                })
                return resolve(res)
            })
                .catch(err => {
                    dispatch({
                        type: GET_CASHOUT_LIST_REQUEST_FAILED,
                        payload: {},
                    })
                    return rej(err)
                })
        })
    }
}

export function getCashoutByFilter(data) {
    return dispatch => {
        dispatch({
            type: GET_CASHOUT_LIST_REQUEST,
        })
        return new Promise((resolve, rej) => {
            searchCashoutByFilterAPI(data).then(res => {
                dispatch({
                    type: GET_CASHOUT_LIST_REQUEST_SUCCEEDED,
                    payload: res
                })
                return resolve(res)
            })
                .catch(err => {
                    dispatch({
                        type: GET_CASHOUT_LIST_REQUEST_FAILED,
                        payload: {},
                    })
                    return rej(err)
                })
        })
    }
}

export const GET_CASHOUT_LIST_REQUEST = 'GET_CASHOUT_LIST_REQUEST'
export const GET_CASHOUT_LIST_REQUEST_SUCCEEDED = 'GET_CASHOUT_LIST_REQUEST_SUCCEEDED'
export const GET_CASHOUT_LIST_REQUEST_FAILED = 'GET_CASHOUT_LIST_REQUEST_FAILED'


export function DeleteUser(data) {
    return dispatch => {
        dispatch({
            type: DELETE_CASHOUT
        })
        return new Promise((resolve, rej) => {
            deleteCashoutAPI(data).then(res => {
                dispatch({
                    type: DELETE_CASHOUT_SUCCESS,
                })
                return resolve(res)
            })
                .catch(err => {
                    dispatch({
                        type: DELETE_CASHOUT_FAILED,
                    })
                    return rej(err)
                })
        })
    }
}

export const DELETE_CASHOUT = "DELETE_CASHOUT";
export const DELETE_CASHOUT_SUCCESS = "DELETE_CASHOUT_SUCCESS";
export const DELETE_CASHOUT_FAILED = "DELETE_CASHOUT_FAILED"

export function UpdateCashOut(data) {
    return dispatch => {
        dispatch({
            type: UPDATE_CASHOUT
        })
        return new Promise((resolve, rej) => {
            updateCashoutAPI(data).then(res => {
                dispatch({
                    type: UPDATE_CASHOUT_SUCCESS
                })
                return resolve(res)
            })
                .catch(err => {
                    dispatch({
                        type: UPDATE_CASHOUT_FAILED
                    })
                    return rej(err)
                })
        })
    }
}

export const UPDATE_CASHOUT = "UPDATE_CASHOUT"
export const UPDATE_CASHOUT_SUCCESS = "UPDATE_CASHOUT_SUCCESS"
export const UPDATE_CASHOUT_FAILED = "UPDATE_CASHOUT_FAILED"


export function geyCashoutByID(data) {
    return dispatch => {
        dispatch({
            type: GET_CASHOUT_BY_ID_REQUEST,
        })
        return new Promise((resolve, rej) => {
            getCashoutByIDAPI(data).then(res => {
                dispatch({
                    type: GET_CASHOUT_BY_ID_REQUEST_SUCCEEDED,
                    payload: res
                })
                return resolve(res)
            })
                .catch(err => {
                    dispatch({
                        type: GET_CASHOUT_BY_ID_REQUEST_FAILED,
                        payload: {},
                    })
                    return rej(err)
                })
        })
    }
}

export const GET_CASHOUT_BY_ID_REQUEST = 'GET_CASHOUT_BY_ID_REQUEST'
export const GET_CASHOUT_BY_ID_REQUEST_SUCCEEDED = 'GET_CASHOUT_BY_ID_REQUEST_SUCCEEDED'
export const GET_CASHOUT_BY_ID_REQUEST_FAILED = 'GET_CASHOUT_BY_ID_REQUEST_FAILED'
