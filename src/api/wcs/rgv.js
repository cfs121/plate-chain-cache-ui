import request from '@/utils/request'

// 查询Rgv列表
export function page(params) {
    return request({
        url: '/rgv/page',
        method: 'get',
        params: params
    })
}

// 查询Rgv详细
export function get(id) {
    return request({
        url: '/rgv/' + id,
        method: 'get'
    })
}

// 新增Rgv
export function add(data) {
    return request({
        url: '/rgv',
        method: 'post',
        data: data
    })
}

// 修改Rgv
export function update(data) {
    return request({
        url: '/rgv',
        method: 'put',
        data: data
    })
}

// 删除Rgv
export function del(ids) {
    return request({
        url: '/rgv',
        method: 'delete',
        data: ids
    })
}

