// 查询提升机列表
import request from '@/utils/request'

export function listLifter(params) {
  return request({
    url: '/lifter/page',
    method: 'get',
    params
  })
}

export function getLifter(id) {
  return request({
    url: '/lifter/' + id,
    method: 'get'
  })
}

export function addLifter(data) {
  return request({
    url: '/lifter',
    method: 'post',
    data: data
  })
}

export function updateLifter(data) {
  return request({
    url: '/lifter',
    method: 'put',
    data: data
  })
}

export function delLifter(ids) {
  return request({
    url: '/lifter',
    method: 'delete',
    data: ids
  })
}
