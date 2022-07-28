import { apiPost, apiGet, apiDelete, apiPut } from '../../utils/axios'

export function getKYCListAPI(data) {
  let payload = {
    limit: data && data.limit || '',
    page: data && data.page || '',
    term: data && data.term || '',
    start_date: data && data.startDate || '',
    end_date: data && data.endDate || '',
  }
  return apiGet(`/user/kyc/all`,payload)
}

export function deleteKYCAPI(data) {
  return apiDelete(`/user/${data}`)
}


export function updateKYCAPI(data,id) {
  return apiPost(`/user/kyc/${id}`, data)
}

export function searchKYCByFilterAPI(data) {
  let payload = {
    limit: data && data.limit || '',
    page: data && data.page || '',
    term: data && data.term || '',
    type: data && data.type || '',
    start_date: data && data.startDate || '',
    end_date: data && data.endDate || '',
  }
  return apiGet(`/user/kyc/all`,payload)
}

export function getKYCByIDAPI(data) {
  return apiGet(`/user/kyc/${data}`)
}