import request from '@/utils/request'

// 获取地图
export function getMap() {
  return request({
    url: 'four-way-car/map',
    method: 'get'
  })
}
// 获取地图
export function findPath(params, data) {
  return request({
    url: 'four-way-car/path',
    method: 'put',
    params: params,
    data: data
  })
}

