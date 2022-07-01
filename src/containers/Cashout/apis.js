import { apiGet, apiDelete, apiPut } from '../../utils/axios'

export function getCashoutAPI(data) {
  let payload = {
    limit: data && data.limit || '',
    page: data && data.page || '',
    term: data && data.term || '',
    start_date: data && data.startDate || '',
    end_date: data && data.endDate || '',
  }
  return apiGet(`/user`, payload)
}

export function deleteCashoutAPI(data) {
  return apiDelete(`/user/${data}`)
}

export function updateCashoutAPI(data) {
  const updateData = {}
  updateData.user_name = data.user_name
  updateData.phone = data.phone
  updateData.email = data.email
  return apiPut(`/user/${data.id}`, updateData)
}

export function searchCashoutByFilterAPI(data) {
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
