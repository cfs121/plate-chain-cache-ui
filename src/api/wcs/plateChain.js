import request from '@/utils/request'

// 查询PlateChain列表
export function page(params) {
    return request({
        url: '/plateChain/page',
        method: 'get',
        params: params
    })
}

// 查询PlateChain详细
export function get(id) {
    return request({
        url: '/plateChain/' + id,
        method: 'get'
    })
}

// 新增PlateChain
export function add(data) {
    return request({
        url: '/plateChain',
        method: 'post',
        data: data
    })
}

// 修改PlateChain
export function update(data) {
    return request({
        url: '/plateChain',
        method: 'put',
        data: data
    })
}

// 删除PlateChain
export function del(ids) {
    return request({
        url: '/plateChain',
        method: 'delete',
        data: ids
    })
}

