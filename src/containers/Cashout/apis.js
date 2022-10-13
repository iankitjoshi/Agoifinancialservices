import { apiGet, apiDelete, apiPost } from '../../utils/axios'

export function getCashoutAPI(data) {
  let payload = {
    limit: data && data.limit || '',
    page: data && data.page || '1',
    term: data && data.term || '',
    start_date: data && data.startDate || '',
    end_date: data && data.endDate || '',
  }
  return apiGet(`/user/cashout/all`, payload)
}

export function deleteCashoutAPI(data) {
  return apiDelete(`/cashout/${data}`)
}

export function updateCashoutAPI(data,id) {
  return apiPost(`/user/cashout/status/${id}`, data)
}

export function searchCashoutByFilterAPI(data) {
  let payload = {
    limit: data && data.limit || '',
    page: data && data.page || '1',
    term: data && data.term || '',
    
    start_date: data && data.startDate || '',
    end_date: data && data.endDate || '',
  }
  return apiGet(`/user/cashout/all`, payload)
}

export function getCashoutByIDAPI(data) {
  return apiGet(`/user/cashout/${data}`)
}