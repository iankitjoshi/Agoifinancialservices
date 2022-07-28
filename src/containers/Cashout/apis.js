import { apiGet, apiDelete, apiPut } from '../../utils/axios'

export function getCashoutAPI(data) {
  let payload = {
    limit: data && data.limit || '',
    page: data && data.page || '',
    term: data && data.term || '',
    start_date: data && data.startDate || '',
    end_date: data && data.endDate || '',
  }
  return apiGet(`/cashout`, payload)
}

export function deleteCashoutAPI(data) {
  return apiDelete(`/cashout/${data}`)
}

export function updateCashoutAPI(data) {
  return apiPut(`/cashout/${data.id}`, data)
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
  return apiGet(`/cashout`, payload)
}

export function getCashoutByIDAPI(data) {
  return apiGet(`/cashout/${data}`)
}