// 查询AGV列表
import request from '@/utils/request'

export function listAgv(params) {
  return request({
    url: '/agv/page',
    method: 'get',
    params
  })
}

export function getAgv(agvId) {
  return request({
    url: '/agv/' + agvId,
    method: 'get'
  })
}

export function addAgv(data) {
  return request({
    url: '/agv',
    method: 'post',
    data: data
  })
}

export function updateAgv(data) {
  return request({
    url: '/agv',
    method: 'put',
    data: data
  })
}
