import { updatePasswordAPI, GetAdminDetailsAPI } from './apis';

export function UpdateSetting(data) {
  return dispatch => {
    dispatch({
      type : 'SETTING_UPDATE'
    })
    return new Promise((resolve, rej) => {
      updatePasswordAPI(data).then(res => {
        dispatch({
          type : 'SETTING_UPDATE_SUCCESS'
        })
        return resolve(res)
      })
      .catch(err => {
        dispatch({
          type : 'SETTING_UPDATE_FAILED'
        })
        return rej(err)
      })
    })
  }
}

export const SETTING_UPDATE = "SETTING_UPDATE"
export const SETTING_UPDATE_SUCCESS = "SETTING_UPDATE_SUCCESS"
export const SETTING_UPDATE_FAILED = "SETTING_UPDATE_FAILED"

export function GetAdminDetails(data) {
  return dispatch => {
    dispatch({
      type : 'GET_ADMIN_DETAILS'
    })
    return new Promise((resolve , rej) => {
      GetAdminDetailsAPI(data).then(res => {
        dispatch({
          type : 'GET_ADMIN_DETAILS_SUCCESS',
          payload : res
        })
        return resolve(res)
      })
      .catch(err => {
        dispatch({
          type : 'GET_ADMIN_DETAILS_FAILED',
          payload : {}
        })
        return rej(err)
      })
    })
  }
}

export const GET_ADMIN_DETAILS = 'GET_ADMIN_DETAILS'
export const GET_ADMIN_DETAILS_SUCCESS = 'GET_ADMIN_DETAILS_SUCCESS'
export const GET_ADMIN_DETAILS_FAILED = 'GET_ADMIN_DETAILS_FAILED'