import {
    getKYCListAPI,
    deleteKYCAPI,
    updateKYCAPI,
    searchKYCByFilterAPI,
    getKYCByIDAPI
} from './apis'

export function getKYCList(data) {
    return dispatch => {
        dispatch({
            type: GET_KYC_LIST_REQUEST,
        })
        return new Promise((resolve, rej) => {
            getKYCListAPI(data).then(res => {
                dispatch({
                    type: GET_KYC_LIST_REQUEST_SUCCEEDED,
                    payload: res
                })
                return resolve(res)
            })
                .catch(err => {
                    dispatch({
                        type: GET_KYC_LIST_REQUEST_FAILED,
                        payload: {},
                    })
                    return rej(err)
                })
        })
    }
}

export function getKYCByFilter(data) {
    return dispatch => {
        dispatch({
            type: GET_KYC_LIST_REQUEST,
        })
        return new Promise((resolve, rej) => {
            searchKYCByFilterAPI(data).then(res => {
                dispatch({
                    type: GET_KYC_LIST_REQUEST_SUCCEEDED,
                    payload: res
                })
                return resolve(res)
            })
                .catch(err => {
                    dispatch({
                        type: GET_KYC_LIST_REQUEST_FAILED,
                        payload: {},
                    })
                    return rej(err)
                })
        })
    }
}

export const GET_KYC_LIST_REQUEST = 'GET_KYC_LIST_REQUEST'
export const GET_KYC_LIST_REQUEST_SUCCEEDED = 'GET_KYC_LIST_REQUEST_SUCCEEDED'
export const GET_KYC_LIST_REQUEST_FAILED = 'GET_KYC_LIST_REQUEST_FAILED'


export function DeleteKYC(data) {
    return dispatch => {
        dispatch({
            type: DELETE_KYC
        })
        return new Promise((resolve, rej) => {
            deleteKYCAPI(data).then(res => {
                dispatch({
                    type: DELETE_KYC_SUCCESS,
                })
                return resolve(res)
            })
                .catch(err => {
                    dispatch({
                        type: DELETE_KYC_FAILED,
                    })
                    return rej(err)
                })
        })
    }
}

export const DELETE_KYC = "DELETE_KYC";
export const DELETE_KYC_SUCCESS = "DELETE_KYC_SUCCESS";
export const DELETE_KYC_FAILED = "DELETE_KYC_FAILED"

export function UpdateKYC(data, id) {
    return dispatch => {
        dispatch({
            type: UPDATE_KYC
        })
        return new Promise((resolve, rej) => {
            updateKYCAPI(data, id).then(res => {
                dispatch({
                    type: UPDATE_KYC_SUCCESS
                })
                return resolve(res)
            })
                .catch(err => {
                    dispatch({
                        type: UPDATE_KYC_FAILED
                    })
                    return rej(err)
                })
        })
    }
}

export const UPDATE_KYC = "UPDATE_KYC"
export const UPDATE_KYC_SUCCESS = "UPDATE_KYC_SUCCESS"
export const UPDATE_KYC_FAILED = "UPDATE_KYC_FAILED"


export function geyKYCByID(data) {
    return dispatch => {
        dispatch({
            type: GET_KYC_BY_ID_REQUEST,
        })
        return new Promise((resolve, rej) => {
            getKYCByIDAPI(data).then(res => {
                dispatch({
                    type: GET_KYC_BY_ID_REQUEST_SUCCEEDED,
                    payload: res
                })
                return resolve(res)
            })
                .catch(err => {
                    dispatch({
                        type: GET_KYC_BY_ID_REQUEST_FAILED,
                        payload: {},
                    })
                    return rej(err)
                })
        })
    }
}

export const GET_KYC_BY_ID_REQUEST = 'GET_KYC_BY_ID_REQUEST'
export const GET_KYC_BY_ID_REQUEST_SUCCEEDED = 'GET_KYC_BY_ID_REQUEST_SUCCEEDED'
export const GET_KYC_BY_ID_REQUEST_FAILED = 'GET_KYC_BY_ID_REQUEST_FAILED'
