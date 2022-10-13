import { apiPost, apiGet, apiDelete, apiPut } from '../../utils/axios'

export function getOrderListAPI(data) {
  let payload = {
    limit: data && data.limit || '',
    page: data && data.page || '1',
    term: data && data.term || '',
    start_date: data && data.startDate || '',
    end_date: data && data.endDate || '',
  }
  return apiGet(`/user/order`, payload)
}

export function deleteOrderAPI(data) {
  return apiDelete(`/user/order/${data}`)
}

export function updateOrderAPI(data,id) {
  return apiPut(`/user/order/${id}`, data)
}

export function searchOrderByFilterAPI(data) {

  let payload = {
    limit: data && data.limit || '',
    page: data && data.page || '1',
    term: data && data.term || '',
    start_date: data && data.startDate || '',
    end_date: data && data.endDate || '',
  }

  const { tab = 0 } = data

  const orderStatus = tab => ({
    0: '/order',
    1: '/order/purchase',
    2: '/order/sell',
  }[tab] || '/sell')
  return apiGet(`/user${orderStatus(tab)}`, payload)
}

export function getOrderByIDAPI(data) {
  return apiGet(`/user/order/${data}`)
}
