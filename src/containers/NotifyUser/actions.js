import {
    getNotificationListAPI,
    searchNotificationByFilterAPI,
    SendNotificationAPI,

    deleteUserAPI,
} from './apis'

export function getNotificationList(data) {
    return dispatch => {
        dispatch({
            type: GET_NOTIFICATION_LIST_REQUEST,
        })
        return new Promise((resolve, rej) => {
            getNotificationListAPI(data).then(res => {
                dispatch({
                    type: GET_NOTIFICATION_LIST_REQUEST_SUCCEEDED,
                    payload: res
                })
                return resolve(res)
            })
                .catch(err => {
                    dispatch({
                        type: GET_NOTIFICATION_LIST_REQUEST_FAILED,
                        payload: {},
                    })
                    return rej(err)
                })
        })
    }
}

export function getNotificationByFilter(data) {
    return dispatch => {
        dispatch({
            type: GET_NOTIFICATION_LIST_REQUEST,
        })
        return new Promise((resolve, rej) => {
            searchNotificationByFilterAPI(data).then(res => {
                dispatch({
                    type: GET_NOTIFICATION_LIST_REQUEST_SUCCEEDED,
                    payload: res
                })
                return resolve(res)
            })
                .catch(err => {
                    dispatch({
                        type: GET_NOTIFICATION_LIST_REQUEST_FAILED,
                        payload: {},
                    })
                    return rej(err)
                })
        })
    }
}

export const GET_NOTIFICATION_LIST_REQUEST = 'GET_NOTIFICATION_LIST_REQUEST'
export const GET_NOTIFICATION_LIST_REQUEST_SUCCEEDED = 'GET_NOTIFICATION_LIST_REQUEST_SUCCEEDED'
export const GET_NOTIFICATION_LIST_REQUEST_FAILED = 'GET_NOTIFICATION_LIST_REQUEST_FAILED'


export function DeleteNotification(data) {
    return dispatch => {
        dispatch({
            type: DELETE_NOTIFICATION
        })
        return new Promise((resolve, rej) => {
            deleteUserAPI(data).then(res => {
                dispatch({
                    type: DELETE_NOTIFICATION_SUCCESS,
                })
                return resolve(res)
            })
                .catch(err => {
                    dispatch({
                        type: DELETE_NOTIFICATION_FAILED,
                    })
                    return rej(err)
                })
        })
    }
}

export const DELETE_NOTIFICATION = "DELETE_NOTIFICATION";
export const DELETE_NOTIFICATION_SUCCESS = "DELETE_NOTIFICATION_SUCCESS";
export const DELETE_NOTIFICATION_FAILED = "DELETE_NOTIFICATION_FAILED"


export function CreateNotification(data) {
    return dispatch => {
        dispatch({
            type: CREATE_NOTIFICATIONS
        })
        return new Promise((resolve, rej) => {
            SendNotificationAPI(data).then(res => {
                dispatch({
                    type: CREATE_NOTIFICATIONS_SUCCESS
                })
                return resolve(res)
            })
                .catch(err => {
                    dispatch({
                        type: CREATE_NOTIFICATIONS_FAILED
                    })
                    return rej(err)
                })
        })
    }
}


export const CREATE_NOTIFICATIONS = 'CREATE_NOTIFICATIONS'
export const CREATE_NOTIFICATIONS_SUCCESS = "CREATE_NOTIFICATIONS_SUCCESS"
export const CREATE_NOTIFICATIONS_FAILED = "CREATE_NOTIFICATIONS_FAILED"
