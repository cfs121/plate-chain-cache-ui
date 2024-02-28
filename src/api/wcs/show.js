import request from '@/utils/request'
//根据缓存库id查询入库口
export function inletByLibrariesId(librariesId) {
  return request({
    url: '/inlet/byLibrariesId',
    method: 'get',
    params: {librariesId}
  })
}
//任务生成
export function task() {
  return request({
    url: '/ga/task',
    method: 'get',
  })
}
//随机
export function random() {
  return request({
    url: '/ga/random',
    method: 'get',
  })
}
//入库分配算法
export function storage333() {
  return request({
    url: '/ga/storage',
    method: 'get',
  })
}
//根据缓存库id查询出库口
export function outletByLibrariesId(librariesId) {
  return request({
    url: '/outlet/byLibrariesId',
    method: 'get',
    params: {librariesId}
  })
}
//根据入库口查询入库任务
export function orderByInletId(inletId) {
  return request({
    url: '/orderIn/inletId',
    method: 'get',
    params: {inletId}
  })
}
//根据出库口查询入库任务
export function orderByOutletId(outletId) {
  return request({
    url: '/orderOut/outletId',
    method: 'get',
    params: {outletId}
  })
}
// 查询Goods列表
export function goodsAll() {
  return request({
    url: '/goods/all',
    method: 'get',
  })
}
//qrcode
export function qrcode111(params) {
  return request({
    url: '/erweima/generate/v3',
    method: 'post',
    params: params,
    responseType: 'blob'
  })
}

// 查询Libraries列表
export function page(params) {
    return request({
        url: '/libraries/page',
        method: 'get',
        params: params

    })
}
// 查询Libraries列表
export function pageLibraries(params) {
  return request({
    url: '/libraries/all',
    method: 'get',
    params: params
  })
}
export function storageByLibrariesId(librariesId) {
  return request({
    url: '/storage/byLibrariesId',
    method: 'get',
    params: {librariesId}
  })
}
// 查询Rgv列表
export function pageRgv(librariesId) {
  return request({
    url: '/rgv/byLibrariesId',
    method: 'get',
    params: {librariesId}
  })
}

// 查询PlateChain列表
export function plateChainByLibrariesId(librariesId) {
  return request({
    url: '/plateChain/byLibrariesId',
    method: 'get',
    params: {librariesId}
  })
}
// 查询Libraries详细
export function get(id) {
    return request({
        url: '/libraries/' + id,
        method: 'get'
    })
}

// 新增Libraries
export function add(data) {
    return request({
        url: '/libraries',
        method: 'post',
        data: data
    })
}

// 修改Libraries
export function update(data) {
    return request({
        url: '/libraries',
        method: 'put',
        data: data
    })
}

// 删除Libraries
export function del(ids) {
    return request({
        url: '/libraries',
        method: 'delete',
        data: ids
    })
}

