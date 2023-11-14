import request from '@/utils/request'

// 查询OrderIn列表
export function page(params) {
    return request({
        url: '/orderIn/page',
        method: 'get',
        params: params
    })
}

// 查询OrderIn详细
export function get(id) {
    return request({
        url: '/orderIn/' + id,
        method: 'get'
    })
}

// 新增OrderIn
export function add(data) {
    return request({
        url: '/orderIn',
        method: 'post',
        data: data
    })
}

// 修改OrderIn
export function update(data) {
    return request({
        url: '/orderIn',
        method: 'put',
        data: data
    })
}

// 删除OrderIn
export function del(ids) {
    return request({
        url: '/orderIn',
        method: 'delete',
        data: ids
    })
}

