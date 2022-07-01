import { apiPost, apiGet, apiDelete, apiPut } from '../../utils/axios'

export function getShareListAPI(data) {
  let payload = {
    limit: data && data.limit || '',
    page: data && data.page || '',
    term: data && data.term || '',
    start_date: data && data.startDate || '',
    end_date: data && data.endDate || '',
  }
  return apiGet(`/user`, payload)
}

export function deleteShareAPI(data) {
  return apiDelete(`/user/${data}`)
}

export function CreateShareAPI(data) {
  return apiPost(`/user`, data)
}

export function UpdateShareActiveAPI(data) {
  const updateData = {}
  updateData.is_active = data.is_active
  updateData.user_name = data.user_name
  return apiPut(`/user/${data.id}`, updateData)
}

export function updateShareAPI(data) {
  const updateData = {}
  updateData.user_name = data.user_name
  updateData.phone = data.phone
  updateData.email = data.email
  return apiPut(`/user/${data.id}`, updateData)
}

export function searchShareByFilterAPI(data) {
  let payload = {
    limit: data && data.limit || '',
    page: data && data.page || '',
    term: data && data.term || '',
    type: data && data.type || '',
    start_date: data && data.startDate || '',
    end_date: data && data.endDate || '',
  }
  return apiGet(`/user`, payload)
}

export function UserLiveUpdateAPI(data) {
  return apiPost('/user/live', data)
}