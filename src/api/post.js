import request from 'axios'

export function fetchPosts (params) {
  return request({
    url: '/post',
    method: 'get',
    params: params
  })
}

export function fetchPost (id) {
  return request({
    url: `/post/${id}`,
    method: 'get'
  })
}

export function savePost (params) {
  return request({
    url: '/post',
    method: 'post',
    data: params
  })
}

export function updatePost (params) {
  return request({
    url: '/post',
    method: 'put',
    data: params
  })
}

export function deletePost (params) {
  return request({
    url: `/post/${encodeURIComponent(params)}`,
    method: 'delete'
  })
}

export function saveComment (params) {
  return request({
    url: '/post/comment',
    method: 'post',
    data: params
  })
}

export function saveUp (params) {
  return request({
    url: '/post/up',
    method: 'post',
    data: params
  })
}
