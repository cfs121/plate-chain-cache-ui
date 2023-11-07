import request from '@/utils/request'

// 查询Inlet列表
export function page(params) {
    return request({
        url: '/inlet/page',
        method: 'get',
        params: params
    })
}
export function inletPage(params) {
  return request({
    url: '/inlet/page',
    method: 'get',
    params: params
  })
}
// 查询Inlet详细
export function get(id) {
    return request({
        url: '/inlet/' + id,
        method: 'get'
    })
}

// 新增Inlet
export function add(data) {
    return request({
        url: '/inlet',
        method: 'post',
        data: data
    })
}

// 修改Inlet
export function update(data) {
    return request({
        url: '/inlet',
        method: 'put',
        data: data
    })
}

// 删除Inlet
export function del(ids) {
    return request({
        url: '/inlet',
        method: 'delete',
        data: ids
    })
}

