import request from 'axios'

export function fetchNews (params) {
  return request({
    url: '/user',
    method: 'get',
    params: params
  })
}
