import request from 'axios'

export function fetchActivitys (params) {
  return request({
    url: '/activity',
    method: 'get',
    params: params
  })
}

export function fetchActivity (id) {
  return request({
    url: `/activity/${id}`,
    method: 'get'
  })
}

export function saveActivity (params) {
  return request({
    url: '/activity',
    method: 'post',
    data: params
  })
}

export function updateActivity (params) {
  return request({
    url: '/activity',
    method: 'put',
    data: params
  })
}

export function deleteActivity (params) {
  return request({
    url: `/activity/${encodeURIComponent(params)}`,
    method: 'delete'
  })
}

export function apply (params) {
  return request({
    url: '/activity/applicant',
    method: 'post',
    data: params
  })
}

export function fetchApplicant (activityId) {
  return request({
    url: `/activity/applicant/${activityId}`,
    method: 'get'
  })
}

export function deleteApplicant (activityId, ids) {
  return request({
    url: `/activity/applicant/${encodeURIComponent(ids)}`,
    method: 'delete',
    params: { activityId: activityId }
  })
}

export function updateApplicant (params) {
  return request({
    url: '/activity/applicant',
    method: 'put',
    data: params
  })
}
