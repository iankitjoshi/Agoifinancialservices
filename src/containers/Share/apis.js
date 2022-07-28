import { apiPost, apiGet, apiDelete, apiPut } from '../../utils/axios'

export function getShareListAPI(data) {
  let payload = {
    limit: data && data.limit || '',
    page: data && data.page || '',
    term: data && data.term || '',
    start_date: data && data.startDate || '',
    end_date: data && data.endDate || '',
  }
  return apiGet(`/stock/findAll`, payload)
}

export function deleteShareAPI(data) {
  return apiDelete(`/stock/${data}`)
}

export function CreateShareAPI(data) {
  return apiPost(`/stock/create`, data)
}

export function UpdateShareActiveAPI(data) {
  const updateData = {}
  return apiPut(`/user/${data.id}`, updateData)
}

export function updateShareAPI(data, id) {
  return apiPut(`/stock/profile/edit/${id}`, data)
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
  return apiGet(`/stock/findAll`, payload)
}

export function StockIconUpdateAPI(data, id) {
  const updateData = {}
  updateData.stock_icon = data.image
  return apiPost(`/stock/icon/edit/${id}`, updateData)
}

export function getShareByIDAPI(data) {
  return apiGet(`/stock/${data}`)
}