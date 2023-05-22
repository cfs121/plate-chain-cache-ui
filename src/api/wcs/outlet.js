import request from '@/utils/request'

// 查询Outlet列表
export function page(params) {
    return request({
        url: '/outlet/page',
        method: 'get',
        params: params
    })
}

// 查询Outlet详细
export function get(id) {
    return request({
        url: '/outlet/' + id,
        method: 'get'
    })
}

// 新增Outlet
export function add(data) {
    return request({
        url: '/outlet',
        method: 'post',
        data: data
    })
}

// 修改Outlet
export function update(data) {
    return request({
        url: '/outlet',
        method: 'put',
        data: data
    })
}

// 删除Outlet
export function del(ids) {
    return request({
        url: '/outlet',
        method: 'delete',
        data: ids
    })
}

