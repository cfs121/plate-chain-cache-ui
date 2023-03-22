import request from '@/utils/request'

// 查询部门列表
export function listDept(query) {
  return request({
    url: '/sys-dept/page',
    method: 'get',
    params: {
      pageNumber: 1,
      pageSize: 1000,
      Q_LIKE_deptName: query.deptName,
      Q_EQ_status: query.status
    }
  })
}

// 查询部门列表（排除节点）
export function listDeptExcludeChild(id) {
  return request({
    url: '/sys-dept/list/exclude/' + id,
    method: 'get'
  })
}

// 查询部门详细
export function getDept(id) {
  return request({
    url: '/sys-dept/' + id,
    method: 'get'
  })
}

// 新增部门
export function addDept(data) {
  return request({
    url: '/sys-dept',
    method: 'post',
    data: data
  })
}

// 修改部门
export function updateDept(data) {
  return request({
    url: '/sys-dept',
    method: 'put',
    data: data
  })
}

// 删除部门
export function delDept(id) {
  return request({
    url: '/sys-dept/' + id,
    method: 'delete'
  })
}
