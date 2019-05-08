import request from 'axios'

export function fetchUsers () {
  return request({
    url: '/user',
    method: 'get'
  })
}
