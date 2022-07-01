import {
    getOrderListAPI,
    deleteOrderAPI,
    updateOrderAPI,
    searchOrderByFilterAPI,
    CreateUserAPI,
    UpdateOrderActiveAPI,
    UserLiveUpdateAPI
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

export function UpdateActiveUser(data) {
    return dispatch => {
        dispatch({
            type: UPDATE_ORDER
        })
        return new Promise((resolve, rej) => {
            UpdateOrderActiveAPI(data).then(res => {
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

export function CreateUser(data) {
    return dispatch => {
        dispatch({
            type: CREATE_USERS
        })
        return new Promise((resolve, rej) => {
            CreateUserAPI(data).then(res => {
                dispatch({
                    type: CREATE_USERS_SUCCESS
                })
                return resolve(res)
            })
                .catch(err => {
                    dispatch({
                        type: CREATE_USERS_FAILED
                    })
                    return rej(err)
                })
        })
    }
}

export function UserLiveUpdate(data) {
    return dispatch => {
        dispatch({
            type: CREATE_USERS
        })
        return new Promise((resolve, rej) => {
            UserLiveUpdateAPI(data).then(res => {
                dispatch({
                    type: CREATE_USERS_SUCCESS
                })
                return resolve(res)
            })
                .catch(err => {
                    dispatch({
                        type: CREATE_USERS_FAILED
                    })
                    return rej(err)
                })
        })
    }
}

export const CREATE_USERS = 'CREATE_USERS'
export const CREATE_USERS_SUCCESS = "CREATE_USERS_SUCCESS"
export const CREATE_USERS_FAILED = "CREATE_USERS_FAILED"
