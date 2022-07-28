import { apiPost, apiGet, apiDelete, apiPut } from '../../utils/axios'

export function getOrderListAPI(data) {
  let payload = {
    limit: data && data.limit || '',
    page: data && data.page || '',
    term: data && data.term || '',
    start_date: data && data.startDate || '',
    end_date: data && data.endDate || '',
  }
  return apiGet(`/user/order`, payload)
}

export function deleteOrderAPI(data) {
  return apiDelete(`/user/order/${data}`)
}

export function updateOrderAPI(data) {
  const updateData = {}
  updateData.user_name = data.user_name
  updateData.phone = data.phone
  updateData.email = data.email
  return apiPut(`/user/order/${data.id}`, updateData)
}

export function searchOrderByFilterAPI(data) {
  let payload = {
    limit: data && data.limit || '',
    page: data && data.page || '',
    term: data && data.term || '',
    type: data && data.type || '',
    start_date: data && data.startDate || '',
    end_date: data && data.endDate || '',
  }
  return apiGet(`/user/order`, payload)
}

export function getOrderByIDAPI(data) {
  return apiGet(`/user/order/${data}`)
}
