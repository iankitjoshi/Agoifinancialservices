import axios from "axios";
import { apiUrl } from "../constant";
import qs from "querystring";
import { getObject, logOut } from '../utils'

export function generateUrl(path) {
  if (path.includes("http")) {
    return path;
  }
  return apiUrl + path;
}

export function apiReq(
  endPoint,
  data,
  method,
  headers,
  requestOptions = {},
  config = {}
) {
  return new Promise((res, rej) => {
    headers = {
      ...getHeaders(),
      ...headers,
    };
    if (method == "get" || method == "delete") {
      data = {
        ...requestOptions,
        params: { ...data },
        paramsSerializer: function (params) {
          return qs.stringify(params);
        },
        headers,
      };
    }

    let updatedData = data instanceof FormData ? data : { ...data };

    axios.defaults.timeout = 60000;
    axios[method](endPoint, updatedData, { headers, ...config })
      .then((result) => {
        let { data, status } = result;
        if (status === 200) {
          return res(data);
        }
        return rej(data);
      })
      .catch((err) => {
        if (err.response && err.response.status === 401 && !endPoint.includes('/login')) {
          logOut('top-challenge-token')
          window.location.href = '/login'
        }
        if (
          err
          && err.response
          && err.response.data
          && err.response.data.message == 'Authorization token expired!'
        ) {
          logOut('top-challenge-token')
          window.location.href = '/login'
        }
        const errData = err && err.response && err.response.data || {};
        return rej(errData)
      });
  });
}

export function apiPost(endPoint, data, headers = {}, config = {}) {
  return apiReq(generateUrl(endPoint), data, "post", headers, {}, config);
}

export function apiDelete(endPoint, data, headers = {}) {
  return apiReq(generateUrl(endPoint), data, "delete", headers);
}

export function apiGet(endPoint, data, headers = {}, requestOptions) {
  return apiReq(generateUrl(endPoint), data, "get", headers, requestOptions);
}

export function apiPut(endPoint, data, headers = {}) {
  return apiReq(generateUrl(endPoint), data, "put", headers);
}

export function apiPatch(endPoint, data, headers = {}) {
  return apiReq(generateUrl(endPoint), data, "patch", headers);
}



export function getHeaders() {
  let user = getObject('top-challenge-token') || {};
  let token = user && Object.keys(user).length && JSON.parse(user).access_token
  return {
    Authorization: `Bearer ${token || null}`,
  };
}