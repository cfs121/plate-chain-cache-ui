import request from '@/utils/request'

// 查询OrderOut列表
export function page(params) {
    return request({
        url: '/orderOut/page',
        method: 'get',
        params: params
    })
}

// 查询OrderOut详细
export function get(id) {
    return request({
        url: '/orderOut/' + id,
        method: 'get'
    })
}

// 新增OrderOut
export function add(data) {
    return request({
        url: '/orderOut',
        method: 'post',
        data: data
    })
}

// 修改OrderOut
export function update(data) {
    return request({
        url: '/orderOut',
        method: 'put',
        data: data
    })
}

// 删除OrderOut
export function del(ids) {
    return request({
        url: '/orderOut',
        method: 'delete',
        data: ids
    })
}

