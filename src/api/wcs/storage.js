import request from '@/utils/request'

// 查询Storage列表
export function page(params) {
    return request({
        url: '/storage/page',
        method: 'get',
        params: params
    })
}

// 查询Storage详细
export function get(id) {
    return request({
        url: '/storage/' + id,
        method: 'get'
    })
}

// 新增Storage
export function add(data) {
    return request({
        url: '/storage',
        method: 'post',
        data: data
    })
}

// 修改Storage
export function update(data) {
    return request({
        url: '/storage',
        method: 'put',
        data: data
    })
}

// 删除Storage
export function del(ids) {
    return request({
        url: '/storage',
        method: 'delete',
        data: ids
    })
}

