import { apiPost, apiGet, apiDelete, apiPut } from '../../utils/axios'

export function getNotificationListAPI(data) {
  let payload = {
    limit: data && data.limit || '',
    page: data && data.page || '',
    term: data && data.term || '',
    start_date: data && data.startDate || '',
    end_date: data && data.endDate || '',
  }
  return apiGet(`/user/notify/all`, payload)
}

export function deleteUserAPI(data) {
  return apiDelete(``)
}

export function SendNotificationAPI(data) {
  return apiPost(`/user/notify`, data)
}


export function searchNotificationByFilterAPI(data) {
  let payload = {
    limit: data && data.limit || '',
    page: data && data.page || '',
    term: data && data.term || '',
    type: data && data.type || '',
    start_date: data && data.startDate || '',
    end_date: data && data.endDate || '',
  }
  return apiGet(`/user/notify/all`, payload)
}

