import request from 'axios'

export function fetchUsers (params) {
  return request({
    url: '/user',
    method: 'get',
    params: params
  })
}

export function saveUser (params) {
  return request({
    url: '/user',
    method: 'post',
    data: params
  })
}

export function deleteUser (params) {
  return request({
    url: `/user/${encodeURIComponent(params)}`,
    method: 'delete'
  })
}

export function updateUser (params) {
  return request({
    url: '/user',
    method: 'put',
    data: params
  })
}
