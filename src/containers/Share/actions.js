import {
    getShareListAPI,
    deleteShareAPI,
    updateShareAPI,
    searchShareByFilterAPI,
    CreateShareAPI,
    UpdateShareActiveAPI,
    getShareByIDAPI,
    StockIconUpdateAPI
} from './apis'

export function getShareList(data) {
    return dispatch => {
        dispatch({
            type: GET_SHARE_LIST_REQUEST,
        })
        return new Promise((resolve, rej) => {
            getShareListAPI(data).then(res => {
                dispatch({
                    type: GET_SHARE_LIST_REQUEST_SUCCEEDED,
                    payload: res
                })
                return resolve(res)
            })
                .catch(err => {
                    dispatch({
                        type: GET_SHARE_LIST_REQUEST_FAILED,
                        payload: {},
                    })
                    return rej(err)
                })
        })
    }
}

export function getShareByFilter(data) {
    return dispatch => {
        dispatch({
            type: GET_SHARE_LIST_REQUEST,
        })
        return new Promise((resolve, rej) => {
            searchShareByFilterAPI(data).then(res => {
                dispatch({
                    type: GET_SHARE_LIST_REQUEST_SUCCEEDED,
                    payload: res
                })
                return resolve(res)
            })
                .catch(err => {
                    dispatch({
                        type: GET_SHARE_LIST_REQUEST_FAILED,
                        payload: {},
                    })
                    return rej(err)
                })
        })
    }
}

export const GET_SHARE_LIST_REQUEST = 'GET_SHARE_LIST_REQUEST'
export const GET_SHARE_LIST_REQUEST_SUCCEEDED = 'GET_SHARE_LIST_REQUEST_SUCCEEDED'
export const GET_SHARE_LIST_REQUEST_FAILED = 'GET_SHARE_LIST_REQUEST_FAILED'


export function DeleteShare(data) {
    return dispatch => {
        dispatch({
            type: DELETE_SHARE
        })
        return new Promise((resolve, rej) => {
            deleteShareAPI(data).then(res => {
                dispatch({
                    type: DELETE_SHARE_SUCCESS,
                })
                return resolve(res)
            })
                .catch(err => {
                    dispatch({
                        type: DELETE_SHARE_FAILED,
                    })
                    return rej(err)
                })
        })
    }
}

export const DELETE_SHARE = "DELETE_SHARE";
export const DELETE_SHARE_SUCCESS = "DELETE_SHARE_SUCCESS";
export const DELETE_SHARE_FAILED = "DELETE_SHARE_FAILED"

export function UpdateShare(data, id) {
    return dispatch => {
        dispatch({
            type: UPDATE_SHARE
        })
        return new Promise((resolve, rej) => {
            updateShareAPI(data, id).then(res => {
                dispatch({
                    type: UPDATE_SHARE_SUCCESS
                })
                return resolve(res)
            })
                .catch(err => {
                    dispatch({
                        type: UPDATE_SHARE_FAILED
                    })
                    return rej(err)
                })
        })
    }
}

export function UpdateActiveUser(data) {
    return dispatch => {
        dispatch({
            type: UPDATE_SHARE
        })
        return new Promise((resolve, rej) => {
            UpdateShareActiveAPI(data).then(res => {
                dispatch({
                    type: UPDATE_SHARE_SUCCESS
                })
                return resolve(res)
            })
                .catch(err => {
                    dispatch({
                        type: UPDATE_SHARE_FAILED
                    })
                    return rej(err)
                })
        })
    }
}


export const UPDATE_SHARE = "UPDATE_SHARE"
export const UPDATE_SHARE_SUCCESS = "UPDATE_SHARE_SUCCESS"
export const UPDATE_SHARE_FAILED = "UPDATE_SHARE_FAILED"

export function CreateShare(data) {
    return dispatch => {
        dispatch({
            type: CREATE_USERS
        })
        return new Promise((resolve, rej) => {
            CreateShareAPI(data).then(res => {
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

export function StockIconUpdate(data, id) {
    return dispatch => {
        dispatch({
            type: CREATE_USERS
        })
        return new Promise((resolve, rej) => {
            StockIconUpdateAPI(data, id).then(res => {
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

export function getShareByID(data) {
    return dispatch => {
        dispatch({
            type: GET_SHARE_BY_ID_REQUEST,
        })
        return new Promise((resolve, rej) => {
            getShareByIDAPI(data).then(res => {
                dispatch({
                    type: GET_SHARE_BY_ID_REQUEST_SUCCEEDED,
                    payload: res
                })
                return resolve(res)
            })
                .catch(err => {
                    dispatch({
                        type: GET_SHARE_BY_ID_REQUEST_FAILED,
                        payload: {},
                    })
                    return rej(err)
                })
        })
    }
}

export const GET_SHARE_BY_ID_REQUEST = 'GET_SHARE_BY_ID_REQUEST'
export const GET_SHARE_BY_ID_REQUEST_SUCCEEDED = 'GET_SHARE_BY_ID_REQUEST_SUCCEEDED'
export const GET_SHARE_BY_ID_REQUEST_FAILED = 'GET_SHARE_BY_ID_REQUEST_FAILED'
