import request from '@/utils/request'

// 查询Order列表
export function page(params) {
    return request({
        url: '/order/page',
        method: 'get',
        params: params
    })
}

// 查询Order详细
export function get(id) {
    return request({
        url: '/order/' + id,
        method: 'get'
    })
}

// 新增Order
export function add(data) {
    return request({
        url: '/order',
        method: 'post',
        data: data
    })
}

// 修改Order
export function update(data) {
    return request({
        url: '/order',
        method: 'put',
        data: data
    })
}

// 删除Order
export function del(ids) {
    return request({
        url: '/order',
        method: 'delete',
        data: ids
    })
}

