import request from 'axios'

export function fetchNews (params) {
  return request({
    url: '/news',
    method: 'get',
    params: params
  })
}

export function saveNews (params) {
  return request({
    url: '/news',
    method: 'post',
    data: params
  })
}

export function updateNews (params) {
  return request({
    url: '/news',
    method: 'put',
    data: params
  })
}

export function deleteNews (params) {
  return request({
    url: `/news/${encodeURIComponent(params)}`,
    method: 'delete'
  })
}
