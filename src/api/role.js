import request from 'axios'

export function fetchRoles () {
  return request({
    url: '/role',
    method: 'get'
  })
}
