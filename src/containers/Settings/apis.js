import { apiGet, apiPost, apiPut } from '../../utils/axios'
import {  getObject, formatString } from "../../utils"

let object = getObject("top-challenge-token");
let { id = "" } = object && JSON.parse(object) || '';

console.log(id,'id')

export function updatePasswordAPI(data) {
  // const data = {}
  // data.oldPassword = payload.password
  // data.newPassword = payload.newPassword
  return apiPost(`/admin/edit`, data)
}

export function GetAdminDetailsAPI() {
  return apiGet(`/admin/${id}`)
}