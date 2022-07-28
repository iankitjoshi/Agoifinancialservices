import {
    getOrderListAPI,
    deleteOrderAPI,
    updateOrderAPI,
    searchOrderByFilterAPI,
    getOrderByIDAPI
} from './apis'

export function getOrderList(data) {
    return dispatch => {
        dispatch({
            type: GET_ORDER_LIST_REQUEST,
        })
        return new Promise((resolve, rej) => {
            getOrderListAPI(data).then(res => {
                dispatch({
                    type: GET_ORDER_LIST_REQUEST_SUCCEEDED,
                    payload: res
                })
                return resolve(res)
            })
                .catch(err => {
                    dispatch({
                        type: GET_ORDER_LIST_REQUEST_FAILED,
                        payload: {},
                    })
                    return rej(err)
                })
        })
    }
}

export function getOrderByFilter(data) {
    return dispatch => {
        dispatch({
            type: GET_ORDER_LIST_REQUEST,
        })
        return new Promise((resolve, rej) => {
            searchOrderByFilterAPI(data).then(res => {
                dispatch({
                    type: GET_ORDER_LIST_REQUEST_SUCCEEDED,
                    payload: res
                })
                return resolve(res)
            })
                .catch(err => {
                    dispatch({
                        type: GET_ORDER_LIST_REQUEST_FAILED,
                        payload: {},
                    })
                    return rej(err)
                })
        })
    }
}

export const GET_ORDER_LIST_REQUEST = 'GET_ORDER_LIST_REQUEST'
export const GET_ORDER_LIST_REQUEST_SUCCEEDED = 'GET_ORDER_LIST_REQUEST_SUCCEEDED'
export const GET_ORDER_LIST_REQUEST_FAILED = 'GET_ORDER_LIST_REQUEST_FAILED'


export function DeleteOrder(data) {
    return dispatch => {
        dispatch({
            type: DELETE_ORDER
        })
        return new Promise((resolve, rej) => {
            deleteOrderAPI(data).then(res => {
                dispatch({
                    type: DELETE_ORDER_SUCCESS,
                })
                return resolve(res)
            })
                .catch(err => {
                    dispatch({
                        type: DELETE_ORDER_FAILED,
                    })
                    return rej(err)
                })
        })
    }
}

export const DELETE_ORDER = "DELETE_ORDER";
export const DELETE_ORDER_SUCCESS = "DELETE_ORDER_SUCCESS";
export const DELETE_ORDER_FAILED = "DELETE_ORDER_FAILED"

export function UpdateOrder(data) {
    return dispatch => {
        dispatch({
            type: UPDATE_ORDER
        })
        return new Promise((resolve, rej) => {
            updateOrderAPI(data).then(res => {
                dispatch({
                    type: UPDATE_ORDER_SUCCESS
                })
                return resolve(res)
            })
                .catch(err => {
                    dispatch({
                        type: UPDATE_ORDER_FAILED
                    })
                    return rej(err)
                })
        })
    }
}

export const UPDATE_ORDER = "UPDATE_ORDER"
export const UPDATE_ORDER_SUCCESS = "UPDATE_ORDER_SUCCESS"
export const UPDATE_ORDER_FAILED = "UPDATE_ORDER_FAILED"


export function getOrderID(data) {
    return dispatch => {
        dispatch({
            type: GET_ORDER_BY_ID_REQUEST,
        })
        return new Promise((resolve, rej) => {
            getOrderByIDAPI(data).then(res => {
                dispatch({
                    type: GET_ORDER_BY_ID_REQUEST_SUCCEEDED,
                    payload: res
                })
                return resolve(res)
            })
                .catch(err => {
                    dispatch({
                        type: GET_ORDER_BY_ID_REQUEST_FAILED,
                        payload: {},
                    })
                    return rej(err)
                })
        })
    }
}

export const GET_ORDER_BY_ID_REQUEST = 'GET_ORDER_BY_ID_REQUEST'
export const GET_ORDER_BY_ID_REQUEST_SUCCEEDED = 'GET_ORDER_BY_ID_REQUEST_SUCCEEDED'
export const GET_ORDER_BY_ID_REQUEST_FAILED = 'GET_ORDER_BY_ID_REQUEST_FAILED'

