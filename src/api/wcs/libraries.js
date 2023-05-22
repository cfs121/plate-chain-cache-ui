import request from '@/utils/request'

// 查询Libraries列表
export function page(params) {
    return request({
        url: '/libraries/page',
        method: 'get',
        params: params
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

