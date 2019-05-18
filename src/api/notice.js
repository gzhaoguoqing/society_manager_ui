import request from 'axios'

export function fetchNotices (params) {
  return request({
    url: '/notice',
    method: 'get',
    params: params
  })
}

export function fetchNotice (id) {
  return request({
    url: `/notice/${id}`,
    method: 'get'
  })
}

export function saveNotice (params) {
  return request({
    url: '/notice',
    method: 'post',
    data: params
  })
}

export function updateNotice (params) {
  return request({
    url: '/notice',
    method: 'put',
    data: params
  })
}

export function deleteNotice (params) {
  return request({
    url: `/notice/${encodeURIComponent(params)}`,
    method: 'delete'
  })
}
