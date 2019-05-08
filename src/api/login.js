import request from 'axios'

export function login (params) {
  return request({
    url: '/login',
    method: 'post',
    params: params
  })
}

export function logout () {
  return request({
    url: '/logout',
    method: 'post'
  })
}

export function getLoginedUser () {
  return request({
    url: '/login/user',
    method: 'post'
  })
}
