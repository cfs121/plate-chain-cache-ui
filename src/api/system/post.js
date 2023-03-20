import request from '@/utils/request'

// 查询岗位列表
export function listPost(query) {
  return request({
    url: '/sys-post/page',
    method: 'get',
    params: {
      Q_EQ_postCode: query.postCode,
      Q_EQ_postName: query.postName,
      Q_EQ_status: query.status
    }
  })
}

// 查询岗位详细
export function getPost(id) {
  return request({
    url: '/sys-post/' + id,
    method: 'get'
  })
}

// 新增岗位
export function addPost(data) {
  return request({
    url: '/sys-post',
    method: 'post',
    data: data
  })
}

// 修改岗位
export function updatePost(data) {
  return request({
    url: '/sys-post',
    method: 'put',
    data: data
  })
}

// 删除岗位
export function delPost(id) {
  return request({
    url: '/sys-post/' + id,
    method: 'delete'
  })
}
