import request from 'axios'

export function fetchTopics (params) {
  return request({
    url: '/topic',
    method: 'get',
    params: params
  })
}

export function fetchTopic (id) {
  return request({
    url: `/topic/${id}`,
    method: 'get'
  })
}

export function saveTopic (params) {
  return request({
    url: '/topic',
    method: 'post',
    data: params
  })
}

export function updateTopic (params) {
  return request({
    url: '/topic',
    method: 'put',
    data: params
  })
}

export function deleteTopic (params) {
  return request({
    url: `/topic/${encodeURIComponent(params)}`,
    method: 'delete'
  })
}
