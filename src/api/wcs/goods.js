import request from '@/utils/request'

// 查询Goods列表
export function page(params) {
    return request({
        url: '/goods/page',
        method: 'get',
        params: params
    })
}

// 查询Goods详细
export function get(id) {
    return request({
        url: '/goods/' + id,
        method: 'get'
    })
}

// 新增Goods
export function add(data) {
    return request({
        url: '/goods',
        method: 'post',
        data: data
    })
}

// 修改Goods
export function update(data) {
    return request({
        url: '/goods',
        method: 'put',
        data: data
    })
}

// 删除Goods
export function del(ids) {
    return request({
        url: '/goods',
        method: 'delete',
        data: ids
    })
}

