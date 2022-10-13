import {
    getUserListAPI,
    deleteUserAPI,
    updateUserAPI,
    searchUserByFilterAPI,
    CreateUserAPI,
    UserWalletUpdateAPI,
    getUserByIDAPI,
    totalInvestmentAPI
} from './apis'

export function getUserList(data) {
    return dispatch => {
        dispatch({
            type: GET_USER_LIST_REQUEST,
        })
        return new Promise((resolve, rej) => {
            getUserListAPI(data).then(res => {
                dispatch({
                    type: GET_USER_LIST_REQUEST_SUCCEEDED,
                    payload: res
                })
                return resolve(res)
            })
                .catch(err => {
                    dispatch({
                        type: GET_USER_LIST_REQUEST_FAILED,
                        payload: {},
                    })
                    return rej(err)
                })
        })
    }
}

export function getUserByFilter(data) {
    return dispatch => {
        dispatch({
            type: GET_USER_LIST_REQUEST,
        })
        return new Promise((resolve, rej) => {
            searchUserByFilterAPI(data).then(res => {
                dispatch({
                    type: GET_USER_LIST_REQUEST_SUCCEEDED,
                    payload: res
                })
                return resolve(res)
            })
                .catch(err => {
                    dispatch({
                        type: GET_USER_LIST_REQUEST_FAILED,
                        payload: {},
                    })
                    return rej(err)
                })
        })
    }
}

export const GET_USER_LIST_REQUEST = 'GET_USER_LIST_REQUEST'
export const GET_USER_LIST_REQUEST_SUCCEEDED = 'GET_USER_LIST_REQUEST_SUCCEEDED'
export const GET_USER_LIST_REQUEST_FAILED = 'GET_USER_LIST_REQUEST_FAILED'


export function DeleteUser(data) {
    return dispatch => {
        dispatch({
            type: DELETE_USER
        })
        return new Promise((resolve, rej) => {
            deleteUserAPI(data).then(res => {
                dispatch({
                    type: DELETE_USER_SUCCESS,
                })
                return resolve(res)
            })
                .catch(err => {
                    dispatch({
                        type: DELETE_USER_FAILED,
                    })
                    return rej(err)
                })
        })
    }
}

export const DELETE_USER = "DELETE_USER";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_FAILED = "DELETE_USER_FAILED"

export function UpdateUser(data) {
    return dispatch => {
        dispatch({
            type: UPDATE_USER
        })
        return new Promise((resolve, rej) => {
            updateUserAPI(data).then(res => {
                dispatch({
                    type: UPDATE_USER_SUCCESS
                })
                return resolve(res)
            })
                .catch(err => {
                    dispatch({
                        type: UPDATE_USER_FAILED
                    })
                    return rej(err)
                })
        })
    }
}


export const UPDATE_USER = "UPDATE_USER"
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS"
export const UPDATE_USER_FAILED = "UPDATE_USER_FAILED"

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

export function UserWalletUpdate(data, id) {
    return dispatch => {
        dispatch({
            type: CREATE_USERS
        })
        return new Promise((resolve, rej) => {
            UserWalletUpdateAPI(data, id).then(res => {
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

export function getUserByID(data) {
    return dispatch => {
        dispatch({
            type: GET_USER_BY_ID_REQUEST,
        })
        return new Promise((resolve, rej) => {
            getUserByIDAPI(data).then(res => {
                dispatch({
                    type: GET_USER_BY_ID_REQUEST_SUCCEEDED,
                    payload: res
                })
                return resolve(res)
            })
                .catch(err => {
                    dispatch({
                        type: GET_USER_BY_ID_REQUEST_FAILED,
                        payload: {},
                    })
                    return rej(err)
                })
        })
    }
}

export const GET_USER_BY_ID_REQUEST = 'GET_USER_BY_ID_REQUEST'
export const GET_USER_BY_ID_REQUEST_SUCCEEDED = 'GET_USER_BY_ID_REQUEST_SUCCEEDED'
export const GET_USER_BY_ID_REQUEST_FAILED = 'GET_USER_BY_ID_REQUEST_FAILED'

export function getUserTotalInvestment(data) {
    return dispatch => {
        dispatch({
            type: GET_USER_TOTAL_INVESTMENT,
        })
        return new Promise((resolve, rej) => {
            totalInvestmentAPI(data).then(res => {
                dispatch({
                    type: GET_USER_TOTAL_INVESTMENT_SUCCEEDED,
                    payload: res
                })
                return resolve(res)
            })
                .catch(err => {
                    dispatch({
                        type: GET_USER_TOTAL_INVESTMENT_FAILED,
                        payload: {},
                    })
                    return rej(err)
                })
        })
    }
}

export const GET_USER_TOTAL_INVESTMENT = 'GET_USER_TOTAL_INVESTMENT'
export const GET_USER_TOTAL_INVESTMENT_SUCCEEDED = 'GET_USER_TOTAL_INVESTMENT_SUCCEEDED'
export const GET_USER_TOTAL_INVESTMENT_FAILED = 'GET_USER_TOTAL_INVESTMENT_FAILED'
