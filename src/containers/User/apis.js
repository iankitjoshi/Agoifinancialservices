import { apiPost, apiGet, apiDelete, apiPut } from '../../utils/axios'

export function getUserListAPI(data) {
  let payload = {
    limit: data && data.limit || '',
    page: data && data.page || '',
    term: data && data.term || '',
    start_date: data && data.startDate || '',
    end_date: data && data.endDate || '',
  }
  return apiGet(`/user`, payload)
}

export function deleteUserAPI(data) {
  return apiDelete(`/user/${data}`)
}

export function CreateUserAPI(data) {
  return apiPost(`/user`, data)
}

export function updateUserAPI(data) {
  const updateData = {}
  updateData.user_name = data.user_name
  updateData.phone = data.phone
  updateData.email = data.email
  return apiPut(`/user/${data.id}`, updateData)
}

export function searchUserByFilterAPI(data) {
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

export function UserWalletUpdateAPI(data, id) {
  return apiPost(`/user/edit-wallet/${id}`, data)
}

export function getUserByIDAPI(data) {
  return apiGet(`/user/${data}`)
}

