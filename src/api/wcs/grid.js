import request from '@/utils/request'

// 查询Grid列表
export function page(params) {
    return request({
        url: '/grid/page',
        method: 'get',
        params: params
    })
}

// 查询Grid详细
export function get(id) {
    return request({
        url: '/grid/' + id,
        method: 'get'
    })
}

// 新增Grid
export function add(data) {
    return request({
        url: '/grid',
        method: 'post',
        data: data
    })
}

// 修改Grid
export function update(data) {
    return request({
        url: '/grid',
        method: 'put',
        data: data
    })
}

// 删除Grid
export function del(ids) {
    return request({
        url: '/grid',
        method: 'delete',
        data: ids
    })
}

