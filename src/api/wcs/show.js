import request from '@/utils/request'
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

