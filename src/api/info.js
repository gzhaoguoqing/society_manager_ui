import request from 'axios'

export function fetchInfos (params) {
  return request({
    url: '/info',
    method: 'get',
    params: params
  })
}

export function saveInfo (params) {
  return request({
    url: '/info',
    method: 'post',
    data: params
  })
}

export function updateInfo (params) {
  return request({
    url: '/info',
    method: 'put',
    data: params
  })
}

export function deleteInfo (params) {
  return request({
    url: `/info/${encodeURIComponent(params)}`,
    method: 'delete'
  })
}
