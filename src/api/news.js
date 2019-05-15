import request from 'axios'

export function fetchNewses (params) {
  return request({
    url: '/news',
    method: 'get',
    params: params
  })
}

export function fetchImportNewses (params) {
  return request({
    url: '/news/important',
    method: 'get',
    params: params
  })
}

export function fetchNews (id) {
  return request({
    url: `/news/${id}`,
    method: 'get'
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
