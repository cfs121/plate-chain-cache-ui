import request from '@/utils/request'

// 查询公告列表
export function listNotice(query) {
  return request({
    url: '/sys-notice/page',
    method: 'get',
    params: {
      pageNumber: query.pageNumber,
      pageSize: query.pageSize,
      Q_EQ_noticeTitle: query.noticeTitle,
      Q_EQ_createdBy: query.createdBy,
      Q_EQ_noticeType: query.noticeType
    }
  })
}

// 查询公告详细
export function getNotice(id) {
  return request({
    url: '/sys-notice/' + id,
    method: 'get'
  })
}

// 新增公告
export function addNotice(data) {
  return request({
    url: '/sys-notice',
    method: 'post',
    data: data
  })
}

// 修改公告
export function updateNotice(data) {
  return request({
    url: '/sys-notice',
    method: 'put',
    data: data
  })
}

// 删除公告
export function delNotice(id) {
  return request({
    url: '/sys-notice/' + id,
    method: 'delete'
  })
}
